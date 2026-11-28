<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    protected $fillable = ['key', 'value', 'group'];

    public $timestamps = true;

    public static function get(string $key, mixed $default = null): mixed
    {
        return static::where('key', $key)->value('value') ?? $default;
    }

    public static function set(string $key, mixed $value, string $group = 'general'): self
    {
        return static::updateOrCreate(
            ['key' => $key],
            [
                'value' => is_array($value) ? json_encode($value, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) : $value,
                'group' => $group,
            ]
        );
    }

    public static function allAsArray(): array
    {
        return static::pluck('value', 'key')->toArray();
    }

    public static function allGrouped(): array
    {
        return static::orderBy('group')
            ->orderBy('key')
            ->get()
            ->groupBy('group')
            ->toArray();
    }
}
