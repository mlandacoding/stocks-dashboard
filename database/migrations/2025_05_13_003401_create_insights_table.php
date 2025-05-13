<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(){
        Schema::create('insights', function (Blueprint $table) {
            $table->id();
            $table->uuid('news_id');
            $table->string('symbol');
            $table->string('sentiment');
            $table->text('sentiment_reasoning')->nullable();
            $table->foreign('news_id')->references('id')->on('news')->onDelete('cascade');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('insights');
    }
};
