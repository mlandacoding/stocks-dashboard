<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('sectors', function (Blueprint $table) {
            $table->id();
            $table->string('sector_name', 50)->unique();
            $table->string('symbol', 5)->nullable();
            $table->timestamps();
        });

        Schema::table('assets', function (Blueprint $table) {
            $table->foreignId('sector_id')->nullable()->constrained()->nullOnDelete();
        });
    }

    public function down()
    {
        Schema::table('assets', function (Blueprint $table) {
            $table->dropForeign(['sector_id']);
            $table->dropColumn('sector_id');
        });

        Schema::dropIfExists('sectors');
    }
};
