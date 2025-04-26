<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('stocks_overview', function (Blueprint $table) {
            $table->id();
            $table->string('type')->nullable();
            $table->char('symbol', 50);
            $table->char('company_name', 100);
            $table->unsignedBigInteger('volume');
            $table->decimal('day_close', 15, 4);
            $table->decimal('prev_day_open', 15, 4);
            $table->decimal('prev_day_close', 15, 4);
            $table->decimal('latest_price', 15, 4);
            $table->decimal('percentage_change', 3, 2);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('stocks_overview');
    }
};
