<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Statistic extends Model
{
    protected $fillable = ['label', 'value', 'sub', 'sort_order'];

    public $timestamps = true;
}