<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SymbolNews extends Model
{
    protected $table = 'symbols_news';

    public function news(){
        return $this->belongsTo(News::class, 'news_id');
    }
}
