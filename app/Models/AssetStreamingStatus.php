<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AssetStreamingStatus extends Model
{
    //
    protected $primaryKey = 'symbol';
    public $incrementing = false;
    protected $keyType = 'string';

    public $timestamps = false; // because we only use updated_at manually

    protected $fillable = [
        'symbol',
        'is_streaming',
    ];

    public function asset()
    {
        return $this->belongsTo(Asset::class, 'symbol', 'symbol');
    }
}
