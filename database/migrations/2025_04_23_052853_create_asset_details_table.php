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
        Schema::create('asset_details', function (Blueprint $table) {
            $table->id();
            $table->string('symbol', 50)->unique(); // unique to enforce one-to-one with assets
            $table->decimal('marketcap', 20, 2)->nullable(); // you can adjust precision/scale if needed
            $table->unsignedBigInteger('share_class_shares_outstanding')->nullable();
            $table->unsignedBigInteger('weighted_shares_outstanding')->nullable();
            // Foreign key constraint to the assets table
            $table->foreign('symbol')
                  ->references('symbol')
                  ->on('assets')
                  ->onDelete('cascade');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('asset_details');
    }
};
