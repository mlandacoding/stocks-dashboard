<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Ratchet\Client\connect;
use App\Events\StockPriceUpdated;
use React\EventLoop\Factory as LoopFactory;
use Ratchet\Client\Connector;
use React\Socket\Connector as ReactConnector;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\Cache;
use Carbon\Carbon;

class PolygonStockStream extends Command
{
    protected $signature = 'polygon:stream';
    protected $description = 'Connects to Polygon.io and broadcasts stock updates.';

    protected function simulateMessage(array $data)
{
    event(new \App\Events\StockPriceUpdated($data));
}

    public function handle()
    {
        $loop = \React\EventLoop\Factory::create();
        $reactConnector = new \React\Socket\Connector($loop);
        $connector = new \Ratchet\Client\Connector($loop, $reactConnector);

        $url = 'wss://delayed.polygon.io/stocks';
        $apiKey = env('POLYGON_API_KEY');

        $connector($url)->then(function ($conn) use ($apiKey) {
            // Authenticate
            $conn->send(json_encode([
                'action' => 'auth',
                'params' => $apiKey,
            ]));

            $conn->on('message', function ($msg) use ($conn) {
                $data = json_decode($msg, true);
                Log::info('polygon connection succeeded', $data);
                if (isset($data[0]['ev']) && $data[0]['ev'] === 'status' && $data[0]['status'] === 'auth_success') {
                    $conn->send(json_encode([
                        'action' => 'subscribe',
                        'params' => 'A.META, A.MSFT, A.AMZN, A.CRM, A.TSLA, A.NVDA',
                    ]));
                }

                $aggregates = array_filter($data, fn ($entry) => $entry['ev'] === 'A');
                if (!empty($aggregates)) {
                    Log::info('Broadcasting multiple stock updates: ' . json_encode($aggregates));
                    broadcast(new \App\Events\StockPriceUpdated($aggregates))->toOthers();

                    foreach ($aggregates as $entry) {
                        $symbol = $entry['sym'];
                        Cache::put("vwap_buffer:$symbol", $entry, now()->addMinutes(30));
                    }
                }

            });


            $conn->on('close', function ($code = null, $reason = null) {
                echo "Connection closed: [$code] $reason\n";
            });
        }, function ($e) {
            echo "Could not connect: {$e->getMessage()}\n";
        });

        $loop->run();
    }


}

