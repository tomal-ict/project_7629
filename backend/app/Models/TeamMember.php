<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TeamMember extends Model
{
    protected $fillable = [
        'name', 'role', 'category', 'bio', 'tags', 'links', 'photo', 'sort_order',
    ];

    protected $casts = [
        'tags' => 'array',
        'links' => 'array',
    ];
}