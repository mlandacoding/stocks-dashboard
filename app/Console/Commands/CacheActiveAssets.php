<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;
use App\Models\Asset;
use Carbon\Carbon;


class CacheActiveAssets extends Command
{
    protected $signature = 'cache:active-assets';
    protected $description = 'Cache all active streaming assets to a local JSON file';

    public function handle(): void
    {
        $current_date_time = Carbon::now()->toDateTimeString();
        $this->info('Fetching active streaming assets - Started at ' . $current_date_time);

        $assets = Asset::whereHas('streamingStatus', function ($query) {
            $query->where('is_streaming', true);
        })->get(['symbol', 'company_name', 'type']);

        $filePath = 'cache/active_assets.json';


        Storage::disk('public')->put($filePath, $assets->toJson());

        $current_date_time = Carbon::now()->toDateTimeString();
        $this->info("Cached " . $assets->count() . " active assets to: storage/app/{$filePath}" . " - Done at - " . $current_date_time);
    }
}
