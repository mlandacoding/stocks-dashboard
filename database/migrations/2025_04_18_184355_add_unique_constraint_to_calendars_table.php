<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('calendars', function (Blueprint $table) {
            $table->string('exchange', 100)->change();
            $table->unique(['date', 'exchange'], 'unique_date_exchange');
        });
    }

    public function down(): void
    {
        Schema::table('calendars', function (Blueprint $table) {
            $table->dropUnique('unique_date_exchange');
        });
    }
};
