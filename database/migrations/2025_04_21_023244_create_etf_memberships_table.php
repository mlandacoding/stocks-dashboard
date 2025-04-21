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
        Schema::create('etf_memberships', function (Blueprint $table) {
            $table->id();
            $table->string('etf_symbol', 50);
            $table->string('member_symbol', 50);
            $table->decimal('weight', 8, 4)->nullable();
            $table->timestamps();

            $table->foreign('etf_symbol')->references('symbol')->on('assets')->onDelete('cascade');
            $table->foreign('member_symbol')->references('symbol')->on('assets')->onDelete('cascade');
            $table->index(['etf_symbol', 'member_symbol']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('etf_memberships');
    }
};
