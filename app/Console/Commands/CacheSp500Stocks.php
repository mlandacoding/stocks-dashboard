<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;
use App\Models\Asset;

class CacheSp500Stocks extends Command
{
    protected $signature = 'cache:sp500';
    protected $description = 'Cache all S&P 500 stock assets to a local JSON file';

    public function handle(): void
    {
        $this->info('Fetching S&P 500 stocks...');

        $stocks = Asset::where('type', 'stock')
            ->whereHas('memberships', function ($query) {
                $query->where('parent_symbol', 'S&P 500');
            })->get(['symbol','company_name']);

        $filePath = 'cache/snp500_stocks.json';

        Storage::disk('local')->put($filePath, $stocks->toJson());

        $this->info("Cached " . $stocks->count() . " stocks to: storage/app/{$filePath}");
    }
}
