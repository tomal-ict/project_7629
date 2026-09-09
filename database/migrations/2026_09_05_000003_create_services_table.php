<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('services', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('title');
            $table->string('subtitle')->nullable();
            $table->string('icon')->default('🧩');
            $table->string('color')->default('#2563eb');
            $table->string('color_light')->default('#eff6ff');
            $table->text('intro')->nullable();
            $table->text('description');
            $table->json('features')->nullable();
            $table->json('benefits')->nullable();
            $table->json('usecases')->nullable();
            $table->string('hero_image')->nullable();
            $table->json('gallery_images')->nullable();
            $table->json('stats')->nullable();
            $table->json('steps')->nullable();
            $table->text('why_us')->nullable();
            $table->boolean('featured_on_home')->default(true);
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('services');
    }
};