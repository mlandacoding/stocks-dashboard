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


        foreach ($sectors as $sector) {

            $latestPrice = LatestPriceHelper::getLatestPriceFromJson($sector->symbol);
            $previousClose = StockOverviewController::previousClose($sector->symbol);


            if ($latestPrice && $previousClose) {

                $percentageChange = (($latestPrice['price'] - $previousClose->prev_day_close) / $previousClose->prev_day_close) * 100;


                $sectorInfos[] = [
                    'symbol' => $sector->symbol,
                    'sector_name' => $sector->sector_name,
                    'percentage_change' => round($percentageChange ,2)
                ];
            }
        }

        usort($sectorInfos, function ($a, $b) {
            return $b['percentage_change'] <=> $a['percentage_change'];
        });

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
