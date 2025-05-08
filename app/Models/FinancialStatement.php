<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FinancialStatement extends Model
{
    public function filing()
    {
        return $this->belongsTo(Filing::class, 'cik', 'cik')
                    ->where('symbol', $this->symbol);
    }

    public function metrics()
    {
        return $this->hasMany(FinancialMetric::class, [
            'cik', 'symbol', 'filing_date'
        ]);
    }
}
