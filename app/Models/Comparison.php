<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Comparison extends Model
{
    protected $fillable = ['feature', 'us_value', 'them_value', 'sort_order'];
}