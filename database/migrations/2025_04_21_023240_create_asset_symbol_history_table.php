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
        Schema::create('asset_symbol_history', function (Blueprint $table) {
            $table->id();
            $table->string('symbol', 50);
            $table->string('old_symbol', 50);
            $table->string('old_company_name', 50)->nullable();
            $table->timestamp('changed_at')->useCurrent();
            $table->foreign('symbol')->references('symbol')->on('assets')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('asset_symbol_history');
    }
};
