<?php

namespace App\Http\Controllers;

use App\Models\SymbolNews;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class SymbolNewsController extends Controller
{
    //
    public static function getNewsPerSymbol($symbol){
        return SymbolNews::where('symbol', $symbol)
            ->with(['news.insights' => function ($query) use ($symbol) {
                $query->where('symbol', $symbol);
            }])
            ->whereHas('news')
            ->get()
            ->pluck('news')
            ->sortByDesc('published_utc')
            ->take(5)
            ->values()
            ->map(function ($news) {
                return [
                    'Publisher_name'     => $news->publisher_name,
                    'Publisher_logo_url' => $news->publisher_logo_url,
                    'Title'              => $news->title,
                    'published_utc'      => $news->published_utc,
                    'Article_url'        => $news->article_url,
                    'Description'        => $news->description,
                    'Insights'           => $news->insights,
                ];
            });
    }
}
