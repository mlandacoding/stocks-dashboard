<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AssetMembership extends Model
{
    protected $fillable = [
        'parent_symbol',
        'member_symbol',
        'weight',
    ];

    public function member()
    {
        return $this->belongsTo(Asset::class, 'member_symbol', 'symbol');
    }

    public function etf()
    {
        return $this->belongsTo(Asset::class, 'parent_symbol', 'symbol');
    }
}
