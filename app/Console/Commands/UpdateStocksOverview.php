<?php

namespace App\Console\Commands;
use Symfony\Component\Process\Process;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

class UpdateStocksOverview extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'python:update-stocks-overview';
    protected $description = 'Update stock overview from Polygon via Python script';

    /**
     * The console command description.
     *
     * @var string
     */
    /**
     * Execute the console command.
     */
    public function handle(){

        $this->info('Running Python updateStocksOverview.py - Started at : ' . Carbon::now()->toDateTimeString());

        $scriptPath = base_path('python/updateStocksOverview.py');

        // Detect the platform and set the correct Python path
        if (strtoupper(substr(PHP_OS, 0, 3)) === 'WIN') {
            // Windows
            $pythonPath = base_path('venv/Scripts/python.exe');
        } else {
            // Linux or other Unix-like OS
            $pythonPath = base_path('venv/bin/python');
        }

        $process = new Process([$pythonPath, $scriptPath]);
        $process->run();

        if ($process->isSuccessful()) {
            $this->info('Script finished successfully');
            $this->line($process->getOutput());
        } else {
            $this->error('Script failed:');
            $this->line($process->getErrorOutput());
        }

        $this->info('Python updateStocksOverview.py - Finished at : ' . Carbon::now()->toDateTimeString());
    }
}
