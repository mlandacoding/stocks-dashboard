<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Illuminate\Http\Request;

class PortfolioOptimizer extends Controller
{
    //
    public function index(){
        return Inertia::render('SelectStocksForPortfolioOptimizer');
    }
}
