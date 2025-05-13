<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(){
        Schema::create('insights', function (Blueprint $table) {
            $table->id();
            $table->string('symbol');
            $table->string('sentiment');
            $table->text('sentiment_reasoning')->nullable();
            $table->foreignId('news_id')->constrained()->onDelete('cascade');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('insights');
    }
};
