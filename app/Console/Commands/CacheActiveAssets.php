<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;
use App\Models\Asset;

class CacheActiveAssets extends Command
{
    protected $signature = 'cache:active-assets';
    protected $description = 'Cache all active streaming assets to a local JSON file';

    public function handle(): void
    {
        $this->info('Fetching active streaming assets...');

        $assets = Asset::whereHas('streamingStatus', function ($query) {
            $query->where('is_streaming', true);
        })->get(['symbol', 'company_name', 'type']);

        $filePath = 'cache/active_assets.json';

        Storage::disk('local')->put($filePath, $assets->toJson());

        $this->info("Cached " . $assets->count() . " active assets to: storage/app/{$filePath}");
    }
}
