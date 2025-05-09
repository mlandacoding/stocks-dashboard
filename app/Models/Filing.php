<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Filing extends Model
{
    public function financialStatements()
    {
        return $this->hasMany(FinancialStatement::class, 'cik', 'cik');
    }
}
