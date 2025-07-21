<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Helpers\LatestPriceHelper;

class PortfolioOptimizer extends Controller
{
    //
    public function index(){
        return Inertia::render('SelectStocksForPortfolioOptimizer');
    }

    public function optimizePortfolio(Request $request){
        $symbols = $request->input('symbols', []);
        $prices = [];
        foreach ($symbols as $symbol) {
            $prices[$symbol] = LatestPriceHelper::getLatestPriceFromJson($symbol);
        }
        return response()->json(['prices' => $prices]);
    }
}
