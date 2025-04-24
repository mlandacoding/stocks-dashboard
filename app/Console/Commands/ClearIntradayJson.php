<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;

class ClearIntradayJson extends Command
{
    protected $signature = 'intraday:clear';
    protected $description = 'Delete all intraday .json files from public storage';

    public function handle()
    {
        $files = Storage::disk('public')->files('intraday');

        $deletedCount = 0;
        foreach ($files as $file) {
            if (str_ends_with($file, '.json')) {
                Storage::disk('public')->delete($file);
                $deletedCount++;
            }
        }

        $this->info("Deleted $deletedCount intraday JSON file(s).");
    }
}
