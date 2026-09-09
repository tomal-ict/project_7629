<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Advantage extends Model
{
    protected $fillable = ['title', 'subtitle', 'description', 'icon', 'sort_order'];
}