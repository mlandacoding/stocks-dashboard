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
