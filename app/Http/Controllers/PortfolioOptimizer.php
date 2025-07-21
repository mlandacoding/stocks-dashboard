<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use App\Helpers\LatestPriceHelper;
use Symfony\Component\Process\Process;
use Symfony\Component\Process\Exception\ProcessFailedException;
use Illuminate\Support\Facades\Log;

class PortfolioOptimizer extends Controller
{
    //
    public function index(){
        return Inertia::render('SelectStocksForPortfolioOptimizer');
    }

    public function optimizePortfolio(Request $request){
        $symbols = $request->input('symbols', []);

        if (empty($symbols)) {
            return response()->json(['error' => 'No symbols provided'], 400);
        }

        $candles = PortfolioOptimizer::getCandlesForSymbols($request);

        $prices = [];
        foreach ($symbols as $symbol) {
            $prices[$symbol] = LatestPriceHelper::getLatestPriceFromJson($symbol);
        }

        $scriptPath = base_path('python/optimizer.py');

        $pythonPath = (strtoupper(substr(PHP_OS, 0, 3)) === 'WIN')
            ? base_path('venv/Scripts/python.exe')
            : base_path('venv/bin/python');

        $inputData = [
            'symbols' => $symbols,
            'prices' => $prices,
            'candles' => $candles,
        ];

        // Log::debug('Sending to optimizer.py:', $inputData);

        $process = new Process([$pythonPath, $scriptPath]);
        $process->setInput(json_encode($inputData));
        $process->run();

        if (!$process->isSuccessful()) {
            throw new ProcessFailedException($process);
        }

        $outputRaw = $process->getOutput();
        $errorRaw = $process->getErrorOutput();

        Log::debug('Process output raw: ' . $outputRaw);
        Log::debug('Process error output: ' . $errorRaw);

        $output = json_decode($process->getOutput(), true);
        if ($output === null) {
            Log::error('JSON decode failed for output: ' . $outputRaw);
        }

        return response()->json($output);
    }

    public function getCandlesForSymbols(Request $request){
        $apiKey = config('services.polygon.key');
        $certificatePath = (PHP_OS_FAMILY === 'Windows')
            ? 'C:\wamp64\bin\php\php8.2.0\extras\ssl\cacert.pem'
            : '/etc/ssl/certs/ca-certificates.crt';

        // $symbolsParam = $request->input('symbols', '');

        // if (empty($symbolsParam)) {
        //     return response()->json(['error' => 'No symbols provided'], 400);
        // }

        // Convert comma-separated string into array and trim spaces
        $symbols = $request->input('symbols', []);

        $endDate = now()->format('Y-m-d');
        $startDate = now()->subDays(60)->format('Y-m-d');

        $allCandles = [];

        foreach ($symbols as $symbol) {
            $url = "https://api.polygon.io/v2/aggs/ticker/{$symbol}/range/1/day/{$startDate}/{$endDate}";

            $response = Http::withOptions([
                'verify' => $certificatePath,
                'timeout' => 10,
            ])->get($url, [
                'adjusted' => 'true',
                'sort' => 'asc',
                'limit' => 60,
                'apiKey' => $apiKey,
            ]);

            if ($response->successful() && isset($response['results'])) {
                $candles = array_map(function($agg) {
                    return [
                        't' => $agg['t'],
                        'o' => $agg['o'],
                        'h' => $agg['h'],
                        'l' => $agg['l'],
                        'c' => $agg['c'],
                        'v' => $agg['v'],
                    ];
                }, $response['results']);

                $allCandles[$symbol] = $candles;
            } else {
                $allCandles[$symbol] = null;
            }
        }

        return $allCandles;
    }

}
