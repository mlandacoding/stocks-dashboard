<?php

namespace App\Console\Commands;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Symfony\Component\Process\Process;

class populateOptionChains extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'python:populateOptionChain';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Pulls all option chains for all the active assets';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Running Python populateOptionChain.py - Started at - '. Carbon::now()->toDateTimeString());

        $scriptPath = base_path('python/populateOptionChains.py');

        if (strtoupper(substr(PHP_OS, 0, 3)) === 'WIN') {
            $pythonPath = base_path('venv/Scripts/python.exe');
        } else {
            $pythonPath = base_path('venv/bin/python');
        }

        $process = new Process([$pythonPath, $scriptPath]);
        $process->setTimeout(10800);
        $process->setIdleTimeout(300);
        $process->run();

        echo $process->getOutput();

        if ($process->isSuccessful()) {
            $this->info('Script finished successfully');
            $this->line($process->getOutput());
        } else {
            $this->error('Script failed:');
            $this->line($process->getErrorOutput());
        }
        $this->info('Running Python populateOptionsChain.py - Finished at - '. Carbon::now()->toDateTimeString());

    }
}
