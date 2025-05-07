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
        Schema::table('asset_details', function (Blueprint $table) {
            $table->string('name')->nullable()->before('created_at');
            $table->string('cik', 20)->nullable()->after('name');
            $table->string('composite_figi', 20)->nullable()->after('cik');
            $table->string('share_class_figi', 20)->nullable()->after('composite_figi');
            $table->text('description')->nullable()->after('share_class_figi');
            $table->string('sic_code', 10)->nullable()->after('description');
            $table->string('sic_description')->nullable()->after('sic_code');
            $table->string('ticker_root', 10)->nullable()->after('sic_description');
            $table->integer('total_employees')->nullable()->after('ticker_root');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('asset_details', function (Blueprint $table) {
            $table->dropColumn([
                'name',
                'cik',
                'composite_figi',
                'share_class_figi',
                'description',
                'sic_code',
                'sic_description',
                'ticker_root',
                'total_employees',
            ]);
        });
    }
};
