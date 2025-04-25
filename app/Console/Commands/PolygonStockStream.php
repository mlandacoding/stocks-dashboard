<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;
use React\EventLoop\Loop;
use React\Socket\Connector as SocketConnector;
use Ratchet\Client\Connector as WebSocketConnector;
use App\Helpers\ActiveAssetsHelper;
use Illuminate\Support\Facades\DB;

class PolygonStockStream extends Command
{
    protected $signature = 'polygon:stream';
    protected $description = 'Connects to Polygon.io and broadcasts stock updates.';

    protected $retryDelay = 5;
    protected $metrics = [
        'successfulConnections' => 0,
        'reconnectAttempts' => 0,
        'lastConnectedAt' => null,
        'lastDisconnectedAt' => null,
        'currentStatus' => 'disconnected',
    ];

    protected $symbols;

    public function handle()
    {
        while (true) {
            // $now = Carbon::now('America/New_York');

            // // Exit if outside market hours
            // $marketOpen = Carbon::createFromTime(9, 30, 0, 'America/New_York');
            // $marketClose = Carbon::createFromTime(20, 0, 0, 'America/New_York');

            // if (
            //     $now->lt($marketOpen) ||
            //     $now->gt($marketClose) ||
            //     !in_array($now->dayOfWeek, [Carbon::MONDAY, Carbon::TUESDAY, Carbon::WEDNESDAY, Carbon::THURSDAY, Carbon::FRIDAY]) ||
            //     !DB::table('calendars')
            //     ->whereDate('date', $now)
            //     ->where('status', '=', 'closed')
            //     ->exists()
            // ) {
            //     $this->info("Market closed — exiting stream.");
            //     break;
            // }

            $this->connect();
            Loop::get()->run();

            usleep(500000); // small sleep to avoid tight CPU loop (500ms)
        }


    }

    protected function connect()
    {
        $loop = Loop::get();
        $reactConnector = new SocketConnector($loop);
        $connector = new WebSocketConnector($loop, $reactConnector);

        $this->symbols = ActiveAssetsHelper::symbols()->map(function ($symbol) {
            return 'A.' . $symbol;
        });

        $aggregatesBuffer = [];

        $url = 'wss://delayed.polygon.io/stocks';
        $apiKey = env('POLYGON_API_KEY');

        $connector($url)->then(function ($conn) use ($apiKey) {
            $this->retryDelay = 5;
            $this->metrics['successfulConnections']++;
            $this->metrics['lastConnectedAt'] = Carbon::now()->toDateTimeString();
            $this->metrics['currentStatus'] = 'connected';
            $this->logMetrics();

            $conn->send(json_encode([
                'action' => 'auth',
                'params' => $apiKey,
            ]));

            $conn->on('message', function ($msg) use (&$aggregatesBuffer, $conn) {
                $data = json_decode($msg, true);

                if (isset($data[0]['ev']) && $data[0]['ev'] === 'status' && $data[0]['status'] === 'auth_success') {
                    $conn->send(json_encode([
                        'action' => 'subscribe',
                        'params' => $this->symbols->implode(','),
                    ]));
                    return;
                }

                $aggregates = array_filter($data, fn($entry) => $entry['ev'] === 'A');

                foreach ($aggregates as $entry) {
                    $aggregatesBuffer[$entry['sym']] = $entry;
                }

                gc_collect_cycles();
            });

            Loop::get()->addPeriodicTimer(1, function () use (&$aggregatesBuffer) {
                if (empty($aggregatesBuffer)) return;

                $now = now();

                $payload = $aggregatesBuffer;
                $payloadSize = strlen(json_encode($payload)); // size in bytes
                $maxPayloadSize = 70000;

                if ($payloadSize > $maxPayloadSize) {
                    Log::warning('Reverb broadcast payload too large', [
                        'size_bytes' => $payloadSize,
                        'symbol_count' => count($payload),
                        'first_symbols' => array_slice(array_column($payload, 'sym'), 0, 5),
                    ]);

                    // Optional: skip or chunk
                    return;
                }

                broadcast(new \App\Events\StockPriceUpdated(array_values($aggregatesBuffer)))->toOthers();

                static $lastCacheTimestamps = [];

                foreach ($aggregatesBuffer as $entry) {
                    $symbol = $entry['sym'];
                    $path = storage_path("app/public/intraday/$symbol.json");

                    $data = [
                        'timestamp' => $now->toISOString(),
                        'price' => $entry['vw'],
                        'volume' => $entry['v'],
                    ];

                    $tempArray = file_exists($path)
                        ? json_decode(file_get_contents($path), true) ?? []
                        : [];

                    $tempArray[] = $data;
                    file_put_contents($path, json_encode($tempArray, JSON_PRETTY_PRINT));

                    $last = $lastCacheTimestamps[$symbol] ?? null;
                    if (!$last || $now->diffInMinutes($last) >= 2) {
                        $path5m = storage_path("app/public/intraday/5m/$symbol.json");

                        $fiveMinArray = file_exists($path5m)
                            ? json_decode(file_get_contents($path5m), true) ?? []
                            : [];

                        $fiveMinArray[] = $data;
                        file_put_contents($path5m, json_encode($fiveMinArray, JSON_PRETTY_PRINT));

                        $lastCacheTimestamps[$symbol] = $now;
                    }

                    Cache::put("last_saved_timestamp:$symbol", $now->toISOString(), now()->addMinutes(10));
                }

                $aggregatesBuffer = []; // Clear buffer
            });

            $conn->on('close', function ($code = null, $reason = null) {
                echo "Connection closed: [$code] $reason\n";
                $this->metrics['lastDisconnectedAt'] = Carbon::now()->toDateTimeString();
                $this->metrics['currentStatus'] = 'disconnected';
                $this->logMetrics();
                $this->scheduleReconnect();
            });

        }, function ($e) {
            echo "Connection failed: {$e->getMessage()}\n";
            $this->metrics['lastDisconnectedAt'] = Carbon::now()->toDateTimeString();
            $this->metrics['currentStatus'] = 'disconnected';
            $this->metrics['reconnectAttempts']++;
            $this->logMetrics();
            $this->scheduleReconnect();
        });
    }

    protected function scheduleReconnect()
    {
        Log::warning("Attempting to reconnect in {$this->retryDelay} seconds...");
        Loop::get()->addTimer($this->retryDelay, function () {
            $this->retryDelay = min($this->retryDelay * 2, 60);
            $this->connect();
        });
    }

    protected function logMetrics()
    {
        Log::info('Polygon Stream Metrics:', $this->metrics);
    }
}
