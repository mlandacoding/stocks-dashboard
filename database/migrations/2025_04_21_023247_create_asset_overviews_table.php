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
        Schema::create('asset_overviews', function (Blueprint $table) {
            $table->id();
            $table->string('symbol', 50);
            $table->bigInteger('volume')->nullable();
            $table->decimal('day_close', 12, 4)->nullable();
            $table->decimal('prev_day_open', 12, 4)->nullable();
            $table->decimal('prev_day_close', 12, 4)->nullable();
            $table->decimal('latest_price', 12, 4)->nullable();
            $table->decimal('percentage_change', 6, 2)->nullable();
            $table->timestamps();

            $table->foreign('symbol')->references('symbol')->on('assets')->onDelete('cascade');
            $table->index(['symbol']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('asset_overviews');
    }
};
