<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\StockOverviewController;
use App\Http\Controllers\CalendarController;
use App\Http\Controllers\PolygonController;
use App\Http\Controllers\AssetDetailsController;
use Illuminate\Support\Facades\DB;
use App\Helpers\ActiveAssetsHelper;
use App\Http\Controllers\SectorController;
use App\Helpers\LatestPriceHelper;
use App\Http\Controllers\FinancialStatements;
use App\Http\Controllers\WinnersAndLosersController;
use App\Http\Controllers\FinancialStatementsController;
use App\Http\Controllers\FinancialMetricsController;
use App\Http\Controllers\SymbolNewsController;
use App\Http\Controllers\OptionChainController;

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

Route::get('/active-assets-with_companyname', function () {
    return response()->json([
        'symbols' => ActiveAssetsHelper::map(),
    ]);
});

Route::get('/stocks_overview/prev_close', function () {
    return \App\Models\StockOverview::pluck('prev_day_close', 'symbol');
});

Route::get('/company_profile/{symbol}', function ($symbol) {
    return Inertia::render('CompanyProfilePage', [
        'symbol' => $symbol,
        'asset_details' => AssetDetailsController::show($symbol)
    ]);
});

Route::get('/optionsChain/{symbol}', function ($symbol) {
    return Inertia::render('OptionsChain', [
        'symbol' => $symbol,
    ]);
});

Route::get('/prev_close/{symbol}', [StockOverviewController::class, 'previousClose']);
Route::get('/latest_price/{symbol}', [LatestPriceHelper::class, 'getLatestPriceFromJson']);
Route::get('/winners_and_losers', [WinnersAndLosersController::class, 'winnersAndLosers']);

Route::get('/get_sectors', [SectorController::class, 'index']);

Route::get('/financial_statements/{symbol}/{statement_type}',[FinancialStatementsController::class, 'getStatementBySymbol'] );
Route::get('/financial_statements_and_filings/{symbol}/{statement_type}',[FinancialStatementsController::class, 'getStatementBySymbolWithFiling'] );

Route::get('/getMetricsForLastFive/{symbol}', [FinancialMetricsController::class, 'getMetricsForLastFive']);

Route::get('/getNewsPerSymbol/{symbol}', [SymbolNewsController::class, 'getNewsPerSymbol']);

Route::get('/getOptionsChainByUnderlyingAsset/{symbol}', [OptionChainController::class, 'getChainByUnderlyingAsset']);
Route::get('/getChainCallsByUnderlyingAsset/{symbol}', [OptionChainController::class, 'getChainCallsByUnderlyingAsset']);
Route::get('/getChainPutsByUnderlyingAsset/{symbol}', [OptionChainController::class, 'getChainPutsByUnderlyingAsset']);



