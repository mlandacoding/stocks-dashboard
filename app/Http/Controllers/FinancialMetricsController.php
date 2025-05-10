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
        $timeframe = 'quarterly';
        if(!$statements){
            $statements = FinancialStatementsController::getContiguousAnnualFilings($symbol);
            $timeframe = 'yearly';
        }

        $responseContent = $statements->getContent();
        $statements = json_decode($responseContent, true);

        $filingInfo = array_map(function ($item) {
            return [
                'filing_date' => $item['filing_date'],
                'timeframe' => $item['timeframe'],
            ];
        }, $statements);



        $metric_keys = explode(',', $request->query('metrics', ''));

        $metrics = FinancialMetricsController::getMetricUsingFilings(
            $symbol,
            array_column($filingInfo, 'filing_date'),
            $metric_keys,
            $filingInfo,
            $timeframe
        );

        if($timeframe == 'yearly'){
            return response()->json(['metrics' => $metrics, 'timeframe' => $timeframe]);
        }

        return response()->json([
            'metrics' => $metrics->mapWithKeys(function ($collection, $label) {
                return [$label => $collection->values()->toArray()];
            }),
            'timeframe' => $timeframe
        ]);

        // return response()->json(['metrics' => $metrics, 'timeframe' => $timeframe]);

    }

    public static function getMetricUsingFilings($symbol, $filings, $metric_keys, $filingInfo, $timeframe){
        $metrics = FinancialMetric::where('symbol', $symbol)
        ->whereIn('metric_key', $metric_keys)
        ->whereIn('filing_date', $filings)
        ->orderBy('filing_date')
        ->get(['label', 'value', 'filing_date']);

        if($timeframe == 'annual'){
            return $metrics->groupBy('label');
        }

        $filingDateToTimeframe = collect($filingInfo)->pluck('timeframe', 'filing_date');


        $groupedMetrics = $metrics->groupBy('label');

        foreach ($groupedMetrics as $label => $metricCollection) {
            $metricCollection = $metricCollection->values();

            for ($i = 0; $i < $metricCollection->count(); $i++) {
                $metric = $metricCollection[$i];
                $filingDate = $metric->filing_date;
                $timeframe = $filingDateToTimeframe[$filingDate] ?? null;

                if ($timeframe === 'annual') {
                    $previousQuarterlies = [];
                    $j = $i - 1;

                    while (count($previousQuarterlies) < 3 && $j >= 0) {
                        $prevMetric = $metricCollection[$j];
                        $prevDate = $prevMetric->filing_date;
                        if (($filingDateToTimeframe[$prevDate] ?? null) === 'quarterly') {
                            $previousQuarterlies[] = $prevMetric;
                        }
                        $j--;
                    }

                    if (count($previousQuarterlies) === 3) {
                        $sumPrevious = collect($previousQuarterlies)->sum(function ($m) {
                            return (float) $m->value;
                        });

                        $normalizedQ4 = number_format((float)$metric->value - $sumPrevious, 2, '.', '');


                        $metric->value = $normalizedQ4;
                    }
                }
            }


            $groupedMetrics[$label] = $metricCollection;
        }

        foreach ($groupedMetrics as $label => $collection) {
            $groupedMetrics[$label] = $collection->sortBy('filing_date')->values()->take(-5);
        }
        // dd($groupedMetrics);

        return $groupedMetrics;
    }

}
