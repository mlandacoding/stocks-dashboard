<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Insight extends Model
{
    //
    public function news(){
        return $this->belongsTo(News::class, 'news_id');
    }
}
