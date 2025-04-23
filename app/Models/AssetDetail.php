<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AssetDetail extends Model
{
    //
    public function asset()
    {
        return $this->belongsTo(Asset::class, 'symbol', 'symbol');
    }
}
