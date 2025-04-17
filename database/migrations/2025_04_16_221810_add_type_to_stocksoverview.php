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
        Schema::table('stocks_overview', function (Blueprint $table) {
            $table->string('type')->nullable()->after('id'); // Adjust 'after' to fit your schema
        });
    }

    public function down(): void
    {
        Schema::table('stocks_overview', function (Blueprint $table) {
            $table->dropColumn('type');
        });
    }
};
