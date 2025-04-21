<?php

namespace App\Helpers;

use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Storage;

class SNP500Helper
{
    protected static array $cache = [];

    /**
     * Get the full collection of S&P 500 stock records.
     */
    public static function all(): Collection
    {
        return collect(self::getRaw());
    }

    /**
     * Get a collection of just the stock symbols.
     */
    public static function symbols(): Collection
    {
        return self::all()->pluck('symbol');
    }

    /**
     * Get a symbol => company_name map.
     */
    public static function map(): Collection
    {
        return self::all()->pluck('company_name', 'symbol');
    }

    /**
     * Load and cache the raw JSON array from local storage.
     */
    protected static function getRaw(): array
    {
        if (!isset(self::$cache['raw'])) {
            self::$cache['raw'] = json_decode(
                Storage::disk('local')->get('cache/snp500_stocks.json'),
                true
            );
        }

        return self::$cache['raw'];
    }
}
