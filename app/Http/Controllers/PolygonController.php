<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Http;

class PolygonController extends Controller
{
    public function getMarketStatus()
    {
        $apiKey = config('services.polygon.key');

        $response = Http::withOptions([
            'verify' => 'C:\wamp64\bin\php\php8.2.0\extras\ssl\cacert.pem'
        ])->get('https://api.polygon.io/v1/marketstatus/now', [
            'apiKey' => $apiKey
        ]);

        return response()->json($response->json());
    }
}
