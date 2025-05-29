<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OptionStrategyBuilderController extends Controller
{
    //
    public static function index($strategy = null){
        return Inertia::render('OptionsStrategyBuilder');
    }
}
