<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\StockOverviewController;
use App\Http\Controllers\CalendarController;
use App\Http\Controllers\PolygonController;
use Illuminate\Support\Facades\DB;
use App\Helpers\ActiveAssetsHelper;
use App\Http\Controllers\SectorController;
use App\Helpers\LatestPriceHelper;
use App\Http\Controllers\WinnersAndLosersController;

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';

Route::get('/', function () {
    return Inertia::render('Welcome');
});

Route::get('/stocks/{symbol}', [StockOverviewController::class, 'show']);
Route::get('/isHoliday', [CalendarController::class, 'isHoliday']);
Route::get('/market-status', [PolygonController::class, 'getMarketStatus']);

Route::get('/stocks_overview/company_name/{symbol}', function ($symbol) {
    $stockData = DB::table('stocks_overview')
        ->where('symbol', $symbol)
        ->select('company_name', 'prev_day_close')
        ->first();

    return response()->json([
        'name' => $stockData->company_name ?? 'Unknown Company',
        'prev_day_close' => $stockData->prev_day_close,
    ]);
});

Route::get('/active-assets', function () {
    return response()->json([
        'symbols' => ActiveAssetsHelper::symbols(),
    ]);
});

Route::get('/stocks_overview/prev_close', function () {
    return \App\Models\StockOverview::pluck('prev_day_close', 'symbol');
});

Route::get('/prev_close/{symbol}', [StockOverviewController::class, 'previousClose']);
Route::get('/latest_price/{symbol}', [LatestPriceHelper::class, 'getLatestPriceFromJson']);
Route::get('/winners_and_losers', [WinnersAndLosersController::class, 'winnersAndLosers']);

Route::get('/get_sectors', [SectorController::class, 'index']);
