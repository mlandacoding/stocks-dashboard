<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Sector extends Model
{
    protected $fillable = ['sector_name', 'symbol'];

    public function assets()
    {
        return $this->hasMany(Asset::class);
    }
}
