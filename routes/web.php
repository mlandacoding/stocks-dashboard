<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\StockOverviewController;
use Illuminate\Support\Facades\DB;

// Route::get('/', function () {
//     return Inertia::render('Welcome');
// })->name('home');

Route::get('/', function () {
    return Inertia::render('Welcome');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';


// Route::get('/', [TaskController::class, 'index']);
Route::get('/tasks/all', [TaskController::class, 'all']);
Route::post('/tasks', [TaskController::class, 'store']);
Route::put('/tasks/{task}', [TaskController::class, 'update']);
Route::delete('/tasks/{task}', [TaskController::class, 'destroy']);
Route::get('/stocks/{symbol}', [StockOverviewController::class, 'show']);

Route::get('/stocks_overview/company_name/{symbol}', function ($symbol) {
    $companyName = DB::table('stocks_overview')
        ->where('symbol', $symbol)
        ->value('company_name');

    return response()->json([
        'name' => $companyName ?? 'Unknown Company',
    ]);
});
