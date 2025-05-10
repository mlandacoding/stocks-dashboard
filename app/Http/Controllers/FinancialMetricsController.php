<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Controllers\FinancialStatementsController;
use App\Models\FinancialMetric;

class FinancialMetricsController extends Controller
{
    // Unforunately with the data we have, ite either 4 quarters or 4 years
    // Data may not be available for the last 4 quarters so we have to aggregate by year
    public static function getMetricsForLastFive($symbol, Request $request){
        $statements = FinancialStatementsController::getLastContiguousFiveStatementsBySymbolQuarterly($symbol);
        if(!$statements){
            $statements = FinancialStatementsController::getContiguousAnnualFilings($symbol);
        }


        $responseContent = $statements->getContent();
        $statements = json_decode($responseContent, true);
        $statements = $statements['filing_dates'];

        $metric_keys = explode(',', $request->query('metrics', ''));

        $metrics = FinancialMetricsController::getMetricUsingFilings($symbol, $statements, $metric_keys);

        return $metrics;
    }

    public static function getMetricUsingFilings($symbol, $filings, $metric_keys){
        $metrics = FinancialMetric::where('symbol', $symbol)->whereIn('metric_key',$metric_keys)
        ->whereIn('filing_date', $filings)
        ->orderBy('filing_date')
        ->get(['label','value','filing_date']);

        return $metrics->groupBy('label');
    }

}
