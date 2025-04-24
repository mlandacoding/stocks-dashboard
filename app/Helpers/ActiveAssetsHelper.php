<?php

namespace App\Helpers;

use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Storage;

class ActiveAssetsHelper
{
    protected static array $cache = [];

    /**
     * Get the full collection of active asset records.
     */
    public static function all(): Collection
    {
        return collect(self::getRaw());
    }

    /**
     * Get a collection of just the active asset symbols.
     */
    public static function symbols(): Collection
    {
        return self::all()->pluck('symbol');
    }

    /**
     * Get a symbol => company_name map for active assets.
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
                Storage::disk('public')->get('cache/active_assets.json'),
                true
            );
        }

        return self::$cache['raw'];
    }

    public static function polygonFormatSeconds(): string
    {
        return self::symbols()
            ->map(fn($symbol) => 'A.' . $symbol)
            ->implode(',');
    }
}
