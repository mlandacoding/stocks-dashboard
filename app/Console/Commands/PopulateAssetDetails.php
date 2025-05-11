<?php

namespace App\Console\Commands;
use Symfony\Component\Process\Process;
use Illuminate\Console\Command;

class PopulateAssetDetails extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'python:populate-asset-details';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Populates the details for all active assets';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        //
        $this->info('Running Python populate asset details.py...');



        $scriptPath = base_path('python/populateAssetDetails.py');
        if (strtoupper(substr(PHP_OS, 0, 3)) === 'WIN') {
            // Windows
            $pythonPath = base_path('venv/Scripts/python.exe');
        } else {
            // Linux or other Unix-like OS
            $pythonPath = base_path('venv/bin/python');
        }
        $process = new Process([$pythonPath, $scriptPath]);
        $process->run();
        echo $process->getOutput();

        if ($process->isSuccessful()) {
            $this->info('Script finished successfully');
            $this->line($process->getOutput());
        } else {
            $this->error('Script failed:');
            $this->line($process->getErrorOutput());
        }
    }
}
