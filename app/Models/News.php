<?php

namespace App\Models;
use App\Models\Symbol;
use Illuminate\Database\Eloquent\Model;

class News extends Model
{
    public function insights()
    {
        return $this->hasMany(Insight::class);
    }
}
