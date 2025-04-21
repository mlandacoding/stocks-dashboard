<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Events\StockPriceUpdated;
use App\Helpers\SNP500Helper;

class StreamFakeStockData extends Command
{
    protected $signature = 'stream:fake-stocks';
    protected $description = 'Stream fake stock data to simulate market updates';
    protected $symbols;

    public function handle()
    {
        $this->info('Starting fake stock data stream... Press Ctrl+C to stop.');
        $this->symbols = SNP500Helper::symbols();

        while (true) {
            $payload = [];

            $symbolsToUpdate = collect($this->symbols)->random(rand(1, 100));

            foreach ($symbolsToUpdate as $symbol) {
                $price = $this->randomFloat(250, 500);
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
            }

            collect($payload)->chunk(10)->each(function ($chunk) {
                broadcast(new StockPriceUpdated($chunk->toArray()));
            });

            unset($payload);
            gc_collect_cycles();

            $this->info('Broadcasted fake stock data at ' . now());

            sleep(1); // Slow down the loop to simulate a delay
        }

        return 0;
    }

    private function randomFloat($min, $max)
    {
        return round($min + mt_rand() / mt_getrandmax() * ($max - $min), 4);
    }
}
