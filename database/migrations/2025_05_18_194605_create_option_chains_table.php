<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('option_chains', function (Blueprint $table) {
            $table->id();
            $table->string('option_symbol');
            $table->string('underlying_asset_symbol');
            $table->date('expiration_date');
            $table->string('option_type');
            $table->decimal('strike_price', 15, 2)->nullable();
            $table->decimal('implied_volatility', 17, 15)->nullable();
            $table->decimal('last_price', 15, 2)->nullable();
            $table->timestamp('last_price_updated_at');
            $table->string('model');
            $table->boolean('moneyness');
            $table->decimal('delta', 17, 15)->nullable();
            $table->decimal('gamma', 17, 15)->nullable();
            $table->decimal('theta', 17, 15)->nullable();
            $table->decimal('rho', 30, 30)->nullable();
            $table->decimal('vega', 17, 15)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('option_chains');
    }
};
