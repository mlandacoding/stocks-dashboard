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

        // Determine OS and set certificate path accordingly
        $certificatePath = (PHP_OS_FAMILY === 'Windows')
            ? 'C:\wamp64\bin\php\php8.2.0\extras\ssl\cacert.pem' // Windows path
            : '/etc/ssl/certs/ca-certificates.crt'; // Default Linux path

        // Send the request with appropriate SSL verification
        $response = Http::withOptions([
            'verify' => $certificatePath,
        ])->get('https://api.polygon.io/v1/marketstatus/now', [
            'apiKey' => $apiKey,
        ]);

        return response()->json($response->json());
    }
}
