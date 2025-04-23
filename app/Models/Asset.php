<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Asset extends Model
{
    protected $primaryKey = 'symbol';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'symbol',
        'company_name',
        'type',
    ];

    public function symbolHistory()
    {
        return $this->hasMany(AssetSymbolHistory::class, 'symbol', 'symbol');
    }

    public function overview()
    {
        return $this->hasMany(AssetOverview::class, 'symbol', 'symbol');
    }

    public function memberships()
    {
        return $this->hasMany(AssetMembership::class, 'member_symbol', 'symbol');
    }

    public function streamingStatus()
    {
        return $this->hasOne(AssetStreamingStatus::class, 'symbol', 'symbol');
    }

    public function isStreaming()
    {
        return optional($this->streamingStatus)->is_streaming ?? false;
    }

    public function detail()
    {
        return $this->hasOne(AssetDetail::class, 'symbol', 'symbol');
    }

    public function etfs()
    {
        return $this->belongsToMany(
            Asset::class,
            AssetMembership::class,
            'member_symbol',
            'parent_symbol',
            'symbol',
            'symbol'
        );
    }
}
