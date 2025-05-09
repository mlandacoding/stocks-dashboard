<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\FinancialStatement;
use App\Models\Filing;

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
}
