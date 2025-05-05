<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Sector;
use App\Helpers\LatestPriceHelper;
use App\Http\Controllers\StockOverviewController;

class SectorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $sectors = Sector::all(['sector_name', 'symbol']);
        $sectorInfos = [];

        // Loop through sectors and pass only the symbol to get the latest price
        foreach ($sectors as $sector) {
            // Get the latest price and previous close
            $latestPrice = LatestPriceHelper::getLatestPriceFromJson($sector->symbol);
            $previousClose = StockOverviewController::previousClose($sector->symbol);

            // If data exists
            if ($latestPrice && $previousClose) {
                // Calculate percentage change
                $percentageChange = (($latestPrice['price'] - $previousClose->prev_day_close) / $previousClose->prev_day_close) * 100;

                // Add data to the array
                $sectorInfos[] = [
                    'symbol' => $sector->symbol,
                    'sector_name' => $sector->sector_name,
                    'percentage_change' => round($percentageChange ,2)
                ];
            }
        }

        // Return the sector info array as a JSON response
        return response()->json($sectorInfos);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
