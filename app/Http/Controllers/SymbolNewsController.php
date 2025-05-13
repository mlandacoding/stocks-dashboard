<?php

namespace App\Http\Controllers;

use App\Models\SymbolNews;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class SymbolNewsController extends Controller
{
    //
    public static function getNewsPerSymbol($symbol){
        return SymbolNews::where('symbol', $symbol)
        ->with('news')
        ->with('news.insights')
        ->latest('created_at')
        ->take(5)
        ->get()
        ->pluck('news');
    }
}
