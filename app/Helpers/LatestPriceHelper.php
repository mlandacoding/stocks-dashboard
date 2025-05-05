<?php

namespace App\Helpers;

use Illuminate\Support\Facades\Storage;

class LatestPriceHelper
{
    public static function getLatestPriceFromJson($symbol)
    {

        $path = "intraday/{$symbol}.json";

        if (!Storage::disk('public')->exists($path)) {
            return null;
        }

        $json = Storage::disk('public')->get($path);
        $data = json_decode($json, true);

        if (empty($data)) {
            return null;
        }

        $lastEntry = end($data);

        return [
            'timestamp' => $lastEntry[0],
            'price' => $lastEntry[1],
        ];
    }
}
