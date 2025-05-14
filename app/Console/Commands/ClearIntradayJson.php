<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;

class ClearIntradayJson extends Command
{
    protected $signature = 'intraday:clear';
    protected $description = 'Delete all intraday .json files from public storage';

    public function handle()
    {
        $this->info("Started intraday clear at - " . Carbon::now()->toDateTimeString());
        $files = Storage::disk('public')->files('intraday');

        $deletedCount = 0;
        foreach ($files as $file) {
            if (str_ends_with($file, '.json')) {
                Storage::disk('public')->delete($file);
                $deletedCount++;
            }
        }

        $this->info("Deleted $deletedCount intraday JSON file(s). Finished at - ". Carbon::now()->toDateTimeString());
    }
}
