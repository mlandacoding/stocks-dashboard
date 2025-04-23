<?php

namespace App\Console\Commands;
use App\Models\StockOverview;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;

class CachePreviousClose extends Command
{
    protected $signature = 'cache:previous-close';
    protected $description = 'Cache the previous close for all active assets to a JSON file';

    public function handle(): void
    {
        $this->info('Fetching active streaming assets...');

        $assets = StockOverview::select('symbol', 'prev_day_close')->get();

        $filePath = 'cache/previous_close.json';

        Storage::disk('local')->put($filePath, $assets->toJson());

        $this->info("Cached " . $assets->count() . " active assets to: storage/app/{$filePath}");
    }
}
