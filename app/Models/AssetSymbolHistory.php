<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AssetSymbolHistory extends Model
{
    protected $fillable = [
        'symbol',
        'old_symbol',
        'old_company_name',
        'changed_at',
    ];

    public $timestamps = false;

    public function asset()
    {
        return $this->belongsTo(Asset::class, 'symbol', 'symbol');
    }
}
