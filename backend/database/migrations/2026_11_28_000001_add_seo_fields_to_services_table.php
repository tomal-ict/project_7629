<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('services', function (Blueprint $table) {
            if (!Schema::hasColumn('services', 'seo_title')) {
                $table->string('seo_title')->nullable()->after('why_us');
            }
            if (!Schema::hasColumn('services', 'seo_description')) {
                $table->text('seo_description')->nullable()->after('seo_title');
            }
            if (!Schema::hasColumn('services', 'seo_keywords')) {
                $table->text('seo_keywords')->nullable()->after('seo_description');
            }
            if (!Schema::hasColumn('services', 'seo_og_image')) {
                $table->string('seo_og_image')->nullable()->after('seo_keywords');
            }
        });
    }

    public function down(): void
    {
        Schema::table('services', function (Blueprint $table) {
            $cols = array_filter(
                ['seo_title', 'seo_description', 'seo_keywords', 'seo_og_image'],
                fn ($col) => Schema::hasColumn('services', $col)
            );
            if (!empty($cols)) {
                $table->dropColumn($cols);
            }
        });
    }
};
