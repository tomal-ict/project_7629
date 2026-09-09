<?php

namespace App\Http\Controllers\Admin;

trait ParsesJsonFields
{
    protected function listToArray(?string $value): array
    {
        if (empty(trim((string) $value))) {
            return [];
        }

        return array_values(array_filter(array_map('trim', preg_split('/\r\n|\r|\n/', $value))));
    }

    protected function keyValueToArray(?string $value): array
    {
        if (empty(trim((string) $value))) {
            return [];
        }

        $result = [];
        foreach (preg_split('/\r\n|\r|\n/', $value) as $line) {
            $line = trim($line);
            if ($line === '') {
                continue;
            }
            if (str_contains($line, '|')) {
                [$key, $val] = array_map('trim', explode('|', $line, 2));
                $result[] = ['key' => $key, 'value' => $val];
            } else {
                $result[] = ['key' => $line, 'value' => ''];
            }
        }

        return $result;
    }
}