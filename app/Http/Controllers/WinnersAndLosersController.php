<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Helpers\ActiveAssetsHelper;
use App\Helpers\LatestPriceHelper;
use App\Models\Sector;
use Illuminate\Support\Facades\Log;


class WinnersAndLosersController extends Controller
{
    //
    public function winnersAndLosers(){
        $sectors = Sector::all(['sector_name', 'symbol']);
        $sectors = $sectors->pluck('symbol')->all();
        $symbols = ActiveAssetsHelper::symbols();
        $winnersAndLosers = [];

        foreach ($symbols as $symbol) {
            // Check if symbol contains a colon (e.g., LON: SWR)
            if (strpos($symbol, ':') !== false) {
                // Split symbol into exchange and ticker
                list($exchange, $ticker) = explode(':', $symbol);
                // You can now use $ticker (e.g., SWR) for your logic
                $symbol = $ticker; // Replace symbol with the ticker part for processing
            }

            if (in_array($symbol, $sectors)) {
                continue;
            }

            try{
                $latestPrice = LatestPriceHelper::getLatestPriceFromJson($symbol);
                $previousClose = StockOverviewController::previousClose($symbol);
            } catch (\Exception $e) {
                continue;
            }


            if ($latestPrice && $previousClose) {
                $percentageChange = (($latestPrice['price'] - $previousClose->prev_day_close) / $previousClose->prev_day_close) * 100;

                $winnersAndLosers[] = [
                    'symbol' => $symbol,
                    'percentage_change' => round($percentageChange, 2)
                ];
            }
        }



        usort($winnersAndLosers, function ($a, $b) {
            return $b['percentage_change'] <=> $a['percentage_change'];
        });

        $finalResult['winners'] = array_slice($winnersAndLosers, 0, 10);

        $losers = array_slice($winnersAndLosers, -10);
        $finalResult['losers'] = $losers;

        return $finalResult;


    }
}
