<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AssetOverview extends Model
{
    protected $fillable = [
        'symbol',
        'volume',
        'day_close',
        'prev_day_open',
        'prev_day_close',
        'latest_price',
        'percentage_change',
    ];

    public function asset()
    {
        return $this->belongsTo(Asset::class, 'symbol', 'symbol');
    }
}
