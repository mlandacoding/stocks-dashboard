<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FinancialStatement extends Model
{
    public function filing()
    {
        return $this->hasMany(Filing::class, 'filing_date', 'filing_date')->where('filing.symbol', 'financial_statements.symbol')->get();
    }

    public function metrics()
    {
        return $this->hasMany(FinancialMetric::class, 'cik', 'cik');
    }
}
