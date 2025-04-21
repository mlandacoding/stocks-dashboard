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
        Schema::create('asset_streaming_statuses', function (Blueprint $table) {
            $table->string('symbol', 50)->primary();
            $table->boolean('is_streaming')->default(false);
            $table->timestamp('updated_at')->useCurrent();

            $table->foreign('symbol')->references('symbol')->on('assets')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('asset_streaming_statuses');
    }
};
