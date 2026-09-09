<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'name', 'tag', 'metric', 'description', 'features', 'logo', 'demo',
        'is_flagship', 'sort_order', 'is_active',
    ];

    protected $casts = [
        'features' => 'array',
        'demo' => 'array',
        'is_flagship' => 'boolean',
        'is_active' => 'boolean',
    ];
}