<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\FinancialStatement;
use App\Models\Filing;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;

class FinancialStatementsController extends Controller
{
    public static function getStatementBySymbol($symbol,$statement_type){
        $financial_statements = FinancialStatement::where('symbol', $symbol)->where('statement_type', $statement_type)
            ->get(['symbol','filing_date','fiscal_period','fiscal_year','timeframe','statement_type']);

        return response()->json($financial_statements);
    }

    public static function getStatementBySymbolWithFiling($symbol,$statement_type){
        $financial_statements = FinancialStatement::where('symbol', $symbol)->where('statement_type', $statement_type)
            ->get(['symbol','filing_date','fiscal_period','fiscal_year','timeframe','statement_type'])
            ->map(function ($fs) {
                $fs->filing = Filing::where('filing_date', $fs->filing_date)
                                    ->where('symbol', $fs->symbol)
                                    ->first(['id']);
                return $fs;
            });

        return response()->json($financial_statements);
    }

    public static function getLastContiguousFiveStatementsBySymbolQuarterly($symbol){
        $filings = DB::table('filings')
        ->where('symbol', strtoupper($symbol))
        ->orderByDesc('filing_date')
        ->limit(10)
        ->get(['symbol','start_date','end_date','filing_date','timeframe','fiscal_period','fiscal_year']);


        $filings = $filings->map(function ($filing) {
            if ($filing->timeframe === 'annual' && $filing->fiscal_period === 'FY') {
                $filing->fiscal_period = 'Q4';
            }
            return $filing;
        });


        $order = ['Q1' => 1, 'Q2' => 2, 'Q3' => 3, 'Q4' => 4];
        $filings = $filings->sort(function ($a, $b) use ($order) {
            return [$a->fiscal_year, $order[$a->fiscal_period]]
                <=> [$b->fiscal_year, $order[$b->fiscal_period]];
        })->values();



        $seen = [];
        $filtered = collect();
        foreach ($filings as $filing) {
            $key = $filing->fiscal_year . '-' . $filing->fiscal_period;
            if (!isset($seen[$key])) {
                $seen[$key] = true;
                $filtered->push($filing);
            }
        }

        // Check for contiguous periods
        function getNext($year, $period) {
            switch ($period) {
                case 'Q1': return ['year' => $year, 'period' => 'Q2'];
                case 'Q2': return ['year' => $year, 'period' => 'Q3'];
                case 'Q3': return ['year' => $year, 'period' => 'Q4'];
                case 'Q4': return ['year' => $year + 1, 'period' => 'Q1'];
                default: return null;
            }
        }

        for ($i = 0; $i < $filtered->count() - 1; $i++) {
            $current = $filtered[$i];
            $next = $filtered[$i + 1];
            $expected = getNext($current->fiscal_year, $current->fiscal_period);

            if (
                $next->fiscal_year != $expected['year'] ||
                $next->fiscal_period != $expected['period']
            ) {
                return False;
            }
        }

        return response()->json($filings);
    }

    function nextQuarter($year, $quarter)
    {
        switch ($quarter) {
            case 'Q1': return ['year' => $year,     'period' => 'Q2'];
            case 'Q2': return ['year' => $year,     'period' => 'Q3'];
            case 'Q3': return ['year' => $year,     'period' => 'Q4'];
            case 'Q4': return ['year' => $year + 1, 'period' => 'Q1'];
            default:   return ['year' => null,      'period' => null];
        }
    }

    public static function getContiguousAnnualFilings($symbol){
        $filings = DB::table('filings')
            ->where('symbol', strtoupper($symbol))
            ->where('timeframe', 'annual')
            ->orderByDesc('filing_date')
            ->limit(5)
            ->get();

        if ($filings->count() < 5) {
            return False;
        }

        $sorted = $filings->sortBy('fiscal_year')->values();

        for ($i = 0; $i < $sorted->count() - 1; $i++) {
            $currentYear = (int) $sorted[$i]->fiscal_year;
            $nextYear = (int) $sorted[$i + 1]->fiscal_year;

            if ($nextYear !== $currentYear + 1) {
                return False;
            }
        }

        return response()->json($filings);
    }
}
