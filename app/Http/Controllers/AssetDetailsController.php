<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\AssetDetail;

class AssetDetailsController extends Controller
{
    public function index()
    {
        return response()->json(AssetDetail::all());
    }

    // Show a specific asset detail
    public static function show($symbol)
    {
        $asset = AssetDetail::where('symbol', $symbol)->firstOrFail();

        if (!$asset) {
            return response()->json(['message' => 'Asset not found'], 404);
        }

        return $asset;
    }
}
