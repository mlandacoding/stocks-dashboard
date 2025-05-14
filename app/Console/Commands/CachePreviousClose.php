<?php

namespace App\Console\Commands;
use App\Models\StockOverview;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;

class CachePreviousClose extends Command
{
    protected $signature = 'cache:previous-close';
    protected $description = 'Cache the previous close for all active assets to a JSON file';

    public function handle(): void
    {
        $this->info('Fetching active streaming assets - Started at - ' . Carbon::now()->toDateTimeString());

        $assets = StockOverview::select('symbol', 'prev_day_close')->get();

        $filePath = 'cache/previous_close.json';

        Storage::disk('public')->put($filePath, $assets->toJson());

        $this->info("Cached " . $assets->count() . " active assets to: storage/app/{$filePath} - Finished at - " . Carbon::now()->toDateTimeString());
    }
}
