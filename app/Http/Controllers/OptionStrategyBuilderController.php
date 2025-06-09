<?php

namespace App\Http\Controllers;

use App\Helpers\LatestPriceHelper;
use App\Models\OptionChain;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use PDO;

class OptionStrategyBuilderController extends Controller
{
    //
    public static function index($strategy = null){
        return Inertia::render('OptionsStrategyBuilderIndex');
    }

    public static function bullCallData($symbol){
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

        return [$in_the_money_calls, $out_of_the_money_calls];
    }

    public static function bearSpreadData($symbol){
        $in_the_money_puts = OptionChain::where('underlying_asset_symbol', $symbol)
            ->where('option_type', 'put')
            ->where('model', 'Polygon API')
            ->where('moneyness', 1)
            ->whereDate('expiration_date', '>=', now())
            ->orderBy('expiration_date')
            ->orderBy('strike_price')
            ->get()
            ->groupBy('expiration_date');

        $out_of_the_money_puts = OptionChain::where('underlying_asset_symbol', $symbol)
            ->where('option_type', 'put')
            ->where('model', 'Polygon API')
            ->where('moneyness', 0)
            ->whereDate('expiration_date', '>=', now())
            ->orderBy('expiration_date')
            ->orderBy('strike_price')
            ->get()
            ->groupBy('expiration_date');

        return [$in_the_money_puts, $out_of_the_money_puts];
    }

    public static function longStraddleData($symbol){
        $in_the_money_calls = OptionChain::where('underlying_asset_symbol', $symbol)
            ->where('option_type', 'call')
            ->where('model', 'Polygon API')
            ->whereDate('expiration_date', '>=', now())
            ->orderBy('expiration_date')
            ->orderBy('strike_price')
            ->get();

        $in_of_the_money_puts = OptionChain::where('underlying_asset_symbol', $symbol)
            ->where('option_type', 'put')
            ->where('model', 'Polygon API')
            ->whereDate('expiration_date', '>=', now())
            ->orderBy('expiration_date')
            ->orderBy('strike_price')
            ->get();

        return [$in_the_money_calls, $in_of_the_money_puts];
    }

    public function show($strategy, $symbol){
        if($strategy == 'bullSpread'){
           $data =  OptionStrategyBuilderController::bullCallData($symbol);
           $in_the_money_calls = $data[0];
           $out_of_the_money_calls = $data[1];

            // this is wasted since we only need the unique expiration dates and we can get that from the queries above
            // need to fix this
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
        } else if ($strategy == 'bearSpread'){
            $data =  OptionStrategyBuilderController::bearSpreadData($symbol);
            $in_the_money_puts = $data[0];
            $out_of_the_money_puts = $data[1];

            $putsByExpiration = OptionChain::where('underlying_asset_symbol', $symbol)
            ->where('option_type', 'put')
            ->where('model', 'Polygon API')
            ->whereDate('expiration_date', '>=', now())
            ->orderBy('expiration_date')
            ->orderBy('strike_price')
            ->get()
            ->groupBy('expiration_date');

            return Inertia::render('OptionsStrategyBuilder', [
                'strategy' => $strategy,
                'symbol' => $symbol,
                'out_of_the_money_puts' => $out_of_the_money_puts,
                'in_the_money_puts' => $in_the_money_puts,
                'putsByExpiration' => $putsByExpiration,
            ]);
        } else if ($strategy == 'longStraddle'){
            $data =  OptionStrategyBuilderController::longStraddleData($symbol);
            $rawCalls = $data[0];
            $rawPuts = $data[1];

            $latestPriceData = LatestPriceHelper::getLatestPriceFromJson($symbol)['price'];
            $underlying_asset_price = $latestPriceData ? (float) $latestPriceData : null;
            $tolerance = 0.05 * $underlying_asset_price;

            $in_the_money_calls = $rawCalls->filter(function ($option) use ($underlying_asset_price, $tolerance) {
                return $underlying_asset_price >= $option->strike_price - $tolerance;
            });

            $in_the_money_calls = $in_the_money_calls->groupBy('expiration_date');

            $in_the_money_puts = $rawPuts->filter(function ($option) use ($underlying_asset_price, $tolerance) {
                return $option->strike_price + $tolerance >= $underlying_asset_price;
            });

            $in_the_money_puts = $in_the_money_puts->groupBy('expiration_date');

            $expirationDates = OptionChain::where('underlying_asset_symbol', $symbol)
            ->where('model', 'Polygon API')
            ->whereDate('expiration_date', '>=', now())
            ->orderBy('expiration_date')
            ->distinct()
            ->pluck('expiration_date');

            return Inertia::render('OptionsStrategyBuilder', [
                'strategy' => $strategy,
                'symbol' => $symbol,
                'in_the_money_puts' => $in_the_money_puts,
                'in_the_money_calls' => $in_the_money_calls,
                'expirationDates' => $expirationDates,
            ]);
        }  else{
            return 0;
        }
    }
}
