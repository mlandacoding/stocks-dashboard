<?php

namespace App\Http\Controllers;

use App\Models\StockOverview;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class StockOverviewController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
    public function show($symbol)
    {
        //
        return StockOverview::where('symbol', $symbol)->firstOrFail();
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(StockOverview $stockOverview)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, StockOverview $stockOverview)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(StockOverview $stockOverview)
    {
        //
    }
}
