<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    protected $fillable = [
        'slug', 'title', 'subtitle', 'icon', 'color', 'color_light', 'intro', 'description',
        'features', 'benefits', 'usecases', 'hero_image', 'gallery_images', 'stats', 'steps',
        'why_us', 'seo_title', 'seo_description', 'seo_keywords', 'seo_og_image',
        'featured_on_home', 'sort_order',
    ];

    protected $casts = [
        'features' => 'array',
        'benefits' => 'array',
        'usecases' => 'array',
        'gallery_images' => 'array',
        'stats' => 'array',
        'steps' => 'array',
        'featured_on_home' => 'boolean',
    ];

    public function getRouteKeyName(): string
    {
        return 'slug';
    }
}