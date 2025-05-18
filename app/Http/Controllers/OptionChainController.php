<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\OptionChain;

class OptionChainController extends Controller
{
    //
    public static function getChainByUnderlyingAsset($symbol){
        return OptionChain::where('underlying_asset_symbol', $symbol)->get(
            [
                'option_symbol',
                'underlying_asset_symbol',
                'option_type',
                'strike_price',
                'implied_volatility',
                'last_price',
                'last_price_updated_at',
                'model',
                'moneyness',
                'delta',
                'gamma',
                'theta',
                'rho',
                'vega',
            ]
        );
    }
}
