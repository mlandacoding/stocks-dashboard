<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Symfony\Component\Process\Process;

class UpdateFinancials extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'python:populate-financials';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Updates company financials using Polygon API';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Running Python populateFinancials.py...');

        $scriptPath = base_path('python/populateFinancials.py');

        if (strtoupper(substr(PHP_OS, 0, 3)) === 'WIN') {
            $pythonPath = base_path('venv/Scripts/python.exe');
        } else {
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
    }
}
