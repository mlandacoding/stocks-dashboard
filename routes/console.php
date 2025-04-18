<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');



Schedule::command('python:update-stocks-overview')
    ->dailyAt('03:45')
    ->timezone('America/New_York')
    ->sendOutputTo(storage_path('logs/update-stocks.log'));
