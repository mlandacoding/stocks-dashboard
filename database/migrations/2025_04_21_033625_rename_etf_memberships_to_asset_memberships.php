<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::rename('etf_memberships', 'asset_memberships');

        Schema::table('asset_memberships', function (Blueprint $table) {
            $table->renameColumn('etf_symbol', 'parent_symbol');
        });
    }

    public function down(): void
    {
        Schema::table('asset_memberships', function (Blueprint $table) {
            $table->renameColumn('parent_symbol', 'etf_symbol');
        });

        Schema::rename('asset_memberships', 'etf_memberships');
    }
};
