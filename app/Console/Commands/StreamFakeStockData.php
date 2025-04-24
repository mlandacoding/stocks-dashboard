<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;
use App\Events\StockPriceUpdated;
use App\Helpers\ActiveAssetsHelper;

class StreamFakeStockData extends Command
{
    protected $signature = 'stream:fake-stocks';
    protected $description = 'Stream fake stock data to simulate market updates';
    protected $symbols;

    public function handle()
    {
        $this->info('Starting fake stock data stream... Press Ctrl+C to stop.');
        $this->symbols = ['META', 'MSFT', 'AMZN', 'CRM', 'TSLA', 'NVDA', 'SPY', 'IWM', 'DIA'];

        while (true) {
            $payload = [];

            $symbolsToUpdate = collect($this->symbols)->random(rand(1, 9));

            foreach ($symbolsToUpdate as $symbol) {
                $price = $this->randomFloat(250, 255);
                $entry = [
                    'ev' => 'A',
                    'sym' => $symbol,
                    'v' => rand(100, 1000),
                    'av' => rand(1000000, 5000000),
                    'op' => $this->randomFloat(250, 500),
                    'vw' => $price,
                    'o' => $this->randomFloat($price - 1, $price + 1),
                    'c' => $this->randomFloat($price - 1, $price + 1),
                    'h' => $this->randomFloat($price, $price + 2),
                    'l' => $this->randomFloat($price - 2, $price),
                    'a' => $this->randomFloat($price - 2, $price + 2),
                    'z' => rand(1, 100),
                    's' => now()->timestamp * 1000,
                    'e' => (now()->timestamp + 1) * 1000,
                ];

                $payload[] = $entry;

                // 🟡 Write to file storage
                $dataToCache = [
                    'timestamp' => now()->toISOString(),
                    'price' => $price,
                    'volume' => $entry['v']
                ];

                $filePath = "intraday/{$symbol}_f.json";

                $existing = [];
                if (Storage::exists($filePath)) {
                    $existing = json_decode(Storage::get($filePath), true);
                }

                $existing[] = $dataToCache;
                Storage::put($filePath, json_encode($existing));
            }

            collect($payload)->chunk(10)->each(function ($chunk) {
                broadcast(new StockPriceUpdated($chunk->toArray()));
            });

            unset($payload);
            gc_collect_cycles();

            $this->info('Broadcasted fake stock data at ' . now());

            sleep(1); // Simulate real-time updates
        }

        return 0;
    }

    private function randomFloat($min, $max)
    {
        return round($min + mt_rand() / mt_getrandmax() * ($max - $min), 4);
    }
}
