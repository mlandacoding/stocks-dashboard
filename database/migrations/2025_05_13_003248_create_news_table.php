<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(){
        Schema::create('news', function (Blueprint $table) {
            $table->id()->primary();
            $table->string('publisher_name');
            $table->string('publisher_homepage_url')->nullable();
            $table->string('publisher_logo_url')->nullable();
            $table->string('publisher_favicon_url')->nullable();
            $table->string('title',1000);
            $table->string('author')->nullable();
            $table->timestamp('published_utc');
            $table->string('article_url',1000);
            $table->string('image_url')->nullable();
            $table->text('description')->nullable();
            $table->json('keywords')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('news');
    }
};
