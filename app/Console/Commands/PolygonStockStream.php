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
        $this->connect();
        Loop::get()->run();
    }

    protected function connect()
    {
        $loop = Loop::get();
        $reactConnector = new SocketConnector($loop);
        $connector = new WebSocketConnector($loop, $reactConnector);

        $this->symbols = ActiveAssetsHelper::symbols()->map(function ($symbol) {
            return 'A.' . $symbol;
        });

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

            $conn->on('message', function ($msg) use ($conn) {
                $data = json_decode($msg, true);
                if (isset($data[0]['ev']) && $data[0]['ev'] === 'status' && $data[0]['status'] === 'auth_success') {
                    $conn->send(json_encode([
                        'action' => 'subscribe',
                        'params' => $this->symbols->implode(','),
                    ]));
                }

                $aggregates = array_filter($data, fn($entry) => $entry['ev'] === 'A');

                if (!empty($aggregates)) {
                    broadcast(new \App\Events\StockPriceUpdated($aggregates))->toOthers();

                    foreach ($aggregates as $entry) {
                        $symbol = $entry['sym'];
                        $path = storage_path("app/public/intraday/$symbol.json");


                        $data = [
                            'timestamp' => now()->toISOString(),
                            'price' => $entry['vw'],
                            'volume' => $entry['v'],
                        ];

                        if (file_exists($path)) {

                            $inp = file_get_contents($path);
                            $tempArray = json_decode($inp, true);

                            if (!is_array($tempArray)) {
                                $tempArray = [];
                            }

                            array_push($tempArray, $data);

                            $jsonData = json_encode($tempArray, JSON_PRETTY_PRINT);
                            file_put_contents($path, $jsonData);
                        } else {
                            $jsonData = json_encode([$data], JSON_PRETTY_PRINT);
                            file_put_contents($path, $jsonData);
                        }
                        Cache::put("last_saved_timestamp:$symbol", now()->toISOString(), now()->addMinutes(10));
                    }
                }

                unset($aggregates);
                gc_collect_cycles();
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
