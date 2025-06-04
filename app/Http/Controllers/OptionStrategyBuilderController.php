<?php

namespace App\Http\Controllers;
use App\Models\OptionChain;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OptionStrategyBuilderController extends Controller
{
    //
    public static function index($strategy = null){
        return Inertia::render('OptionsStrategyBuilderIndex');
    }

    public function show($strategy, $symbol){

        $in_the_money_calls = OptionChain::where('underlying_asset_symbol', $symbol)
        ->where('option_type', 'call')
        ->where('model', 'Polygon API')
        ->where('moneyness', 1)
        ->whereDate('expiration_date', '>=', now())
        ->orderBy('expiration_date')
        ->orderBy('strike_price')
        ->get()
        ->groupBy('expiration_date');

        $out_of_the_money_calls = OptionChain::where('underlying_asset_symbol', $symbol)
            ->where('option_type', 'call')
            ->where('model', 'Polygon API')
            ->where('moneyness', 0)
            ->whereDate('expiration_date', '>=', now())
            ->orderBy('expiration_date')
            ->orderBy('strike_price')
            ->get()
            ->groupBy('expiration_date');

        $callsByExpiration = OptionChain::where('underlying_asset_symbol', $symbol)
            ->where('option_type', 'call')
            ->where('model', 'Polygon API')
            ->whereDate('expiration_date', '>=', now())
            ->orderBy('expiration_date')
            ->orderBy('strike_price')
            ->get()
            ->groupBy('expiration_date');

        return Inertia::render('OptionsStrategyBuilder', [
            'strategy' => $strategy,
            'symbol' => $symbol,
            'out_of_the_money_calls' => $out_of_the_money_calls,
            'in_the_money_calls' => $in_the_money_calls,
            'callsByExpiration' => $callsByExpiration,
        ]);
    }
}
