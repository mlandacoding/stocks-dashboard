<?php

namespace App\Console\Commands;
use Symfony\Component\Process\Process;

use Illuminate\Console\Command;

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
    public function handle()
    {
        //
        $this->info('Running Python updateStocksOverview.py...');

        $scriptPath = base_path('python/updateStocksOverview.py');
        $pythonPath = base_path('venv/Scripts/python.exe');
        $process = new Process([$pythonPath, $scriptPath]);
        $process->run();

        if ($process->isSuccessful()) {
            $this->info('Script finished successfully');
            $this->line($process->getOutput());
        } else {
            $this->error('Script failed:');
            $this->line($process->getErrorOutput());
        }
    }
}
