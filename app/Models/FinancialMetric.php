<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FinancialMetric extends Model
{
    public function statement()
    {
        return $this->belongsTo(FinancialStatement::class, [
            'cik', 'symbol', 'filing_date'
        ]);
    }
}
