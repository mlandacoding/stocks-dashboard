<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Broadcast;
use Illuminate\Support\Facades\Event;
use App\Events\StockPriceUpdated;

class StreamFakeStockData extends Command
{
    protected $signature = 'stream:fake-stocks';
    protected $description = 'Stream fake stock data to simulate market updates';

    protected $symbols = ['META', 'MSFT', 'AMZN', 'CRM', 'TSLA', 'NVDA'];

    public function handle()
    {
        $this->info('Starting fake stock data stream... Press Ctrl+C to stop.');

        while (true) {
            $payload = [];

            $symbolsToUpdate = collect($this->symbols)->random(rand(1, 5));

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

            // Broadcast using your existing event (adjust class if needed)
            broadcast(new StockPriceUpdated($payload));

            $this->info('Broadcasted fake stock data at ' . now());

            sleep(1); // wait a second before next update
        }

        return 0;
    }

    private function randomFloat($min, $max)
    {
        return round($min + mt_rand() / mt_getrandmax() * ($max - $min), 4);
    }
}
