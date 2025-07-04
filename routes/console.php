<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

Schedule::command('python:update-calendars')
    ->cron('0 3 1 1,7 *')
    ->timezone('America/New_York')
    ->appendOutputTo(storage_path('logs/update-calendars.log'));


Schedule::command('cache:active-assets')
    ->timezone('America/New_York')
    ->dailyAt('04:20')
    ->appendOutputTo(storage_path('logs/active-assets.log'));

Schedule::command('python:update-stocks-overview')
    ->dailyAt('05:35')
    ->weekdays()
    ->timezone('America/New_York')
    ->when(function () {
        $today = Carbon::now('America/New_York')->toDateString();

        return !DB::table('calendars')
            ->whereDate('date', $today)
            ->where('status', '=', 'closed')
            ->exists();
    })
    ->appendOutputTo(storage_path('logs/update-stocks.log'));

Schedule::command('python:populateOptionChain')
    ->dailyAt('00:01')
    ->weekdays()
    ->timezone('America/New_York')
    ->when(function () {
        $today = Carbon::now('America/New_York')->toDateString();

        return !DB::table('calendars')
            ->whereDate('date', $today)
            ->where('status', '=', 'closed')
            ->exists();
    })
    ->appendOutputTo(storage_path('logs/populateOptionChain.log'));

Schedule::command('cache:previous-close')
    ->dailyAt('05:55')
    ->weekdays()
    ->timezone('America/New_York')
    ->when(function () {
        $today = Carbon::now('America/New_York')->toDateString();

        return !DB::table('calendars')
            ->whereDate('date', $today)
            ->where('status', '=', 'closed')
            ->exists();
    })
    ->appendOutputTo(storage_path('logs/previous-close.log'));


Schedule::command('intraday:clear')
    ->dailyAt('08:15')
    ->weekdays()
    ->timezone('America/New_York')
    ->when(function () {
        $today = Carbon::now('America/New_York')->toDateString();

        return !DB::table('calendars')
            ->whereDate('date', $today)
            ->where('status', '=', 'closed')
            ->exists();
    })
    ->appendOutputTo(storage_path('logs/intraday-clear.log'));

Schedule::command('python:update-news')
    ->dailyAt('07:35')
    ->weekdays()
    ->timezone('America/New_York')
    ->appendOutputTo(storage_path('logs/update-news.log'));


