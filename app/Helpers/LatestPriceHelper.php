<?php

namespace App\Helpers;

use Illuminate\Support\Facades\Storage;

class LatestPriceHelper
{
    public static function getLatestPriceFromJson($symbol)
    {
        // Correct path using the 'public' disk
        $path = "intraday/{$symbol}.json";  // No need to include 'app/public' here, it's handled by Storage

        if (!Storage::disk('public')->exists($path)) {
            return null;
        }

        $json = Storage::disk('public')->get($path);
        $data = json_decode($json, true);

        if (empty($data)) {
            return null;
        }

        $lastEntry = end($data);  // Get the last entry (latest price)

        return [
            'timestamp' => $lastEntry[0],
            'price' => $lastEntry[1],
        ];
    }
}
