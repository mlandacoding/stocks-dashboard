<?php

namespace App\Console\Commands;
use Symfony\Component\Process\Process;
use Illuminate\Console\Command;

class UpdateCalendars extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'python:update-calendars';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Updates the calendars from the Polygon API';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        //
        $this->info('Running Python getCalendars.py...');

        $scriptPath = base_path('python/getCalendars.py');
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
