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
        Schema::create('filings', function (Blueprint $table) {
            $table->id();
            $table->string('cik', 20)->index();
            $table->string('symbol', 10)->index();
            $table->date('start_date');
            $table->date('end_date');
            $table->date('filing_date');
            $table->dateTime('acceptance_datetime')->nullable();
            $table->string('timeframe', 20)->nullable();
            $table->string('fiscal_period', 10)->nullable();
            $table->year('fiscal_year')->nullable();
            $table->text('source_filing_url')->nullable();
            $table->text('source_filing_file_url')->nullable();
            $table->timestamps();

            $table->unique(['cik', 'symbol', 'filing_date']);
        });

        Schema::create('financial_statements', function (Blueprint $table) {
            $table->id();
            $table->string('cik', 20)->index();
            $table->string('symbol', 10)->index();
            $table->date('filing_date')->index();
            $table->string('fiscal_period', 20)->nullable();
            $table->string('fiscal_year')->nullable();
            $table->string('timeframe', 10)->nullable();
            $table->enum('statement_type', ['income_statement', 'balance_sheet', 'cash_flow', 'comprehensive_income']);
            $table->timestamps();
        });

        Schema::create('financial_metrics', function (Blueprint $table) {
            $table->id();
            $table->string('cik', 20)->index();
            $table->string('symbol', 10)->index();
            $table->date('filing_date')->index();
            $table->string('metric_key');
            $table->string('label')->nullable();
            $table->decimal('value', 20, 2)->nullable();
            $table->string('unit', 32)->nullable();
            $table->integer('metric_order')->nullable();
            $table->string('source')->nullable();
            $table->string('derived_from')->nullable();
            $table->text('xpath')->nullable()->change();
            $table->string('formula', 32)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('financial_metrics');
        Schema::dropIfExists('financial_statements');
        Schema::dropIfExists('filings');
    }
};
