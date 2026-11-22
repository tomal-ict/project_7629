<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schema;
use Throwable;

class AutoInstall
{
    public function handle(Request $request, Closure $next)
    {
        $marker = storage_path('app/.installed');

        if (! file_exists($marker)) {
            try {
                $this->generateAppKey();

                // If user imported database (e.g. demo.sql), verify and mark installed immediately
                if (Schema::hasTable('settings') && \App\Models\Setting::query()->exists()) {
                    @file_put_contents($marker, date('c'));
                    return $next($request);
                }

                $this->ensureDatabaseExists();

                if (! Schema::hasTable('settings')) {
                    Artisan::call('view:clear');
                    Artisan::call('migrate', ['--force' => true]);
                }

                if (\App\Models\Setting::query()->exists()) {
                    @file_put_contents($marker, date('c'));
                } else {
                    Artisan::call('db:seed', ['--force' => true]);

                    if (\App\Models\Setting::query()->exists()) {
                        @file_put_contents($marker, date('c'));
                    }
                }
            } catch (Throwable $e) {
                // Not ready yet (DB still missing/misconfigured) - retry on next request.
            }
        }

        return $next($request);
    }

    private function generateAppKey(): void
    {
        if (! config('app.key')) {
            Artisan::call('key:generate', ['--force' => true]);
        }
    }

    private function ensureDatabaseExists(): void
    {
        $connection = config('database.connections.'.config('database.default'));
        $database = $connection['database'] ?? '';

        if ($database === '') {
            return;
        }

        try {
            $dsn = 'mysql:host='.($connection['host'] ?? '127.0.0.1')
                .';port='.($connection['port'] ?? '3306')
                .';charset=utf8mb4';

            $pdo = new \PDO(
                $dsn,
                $connection['username'] ?? '',
                $connection['password'] ?? '',
            );

            $pdo->exec('CREATE DATABASE IF NOT EXISTS `'.str_replace('`', '', $database)
                .'` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci');
            $pdo = null;
        } catch (Throwable $e) {
            // Fall through - a later request will retry once the DB is reachable.
        }
    }
}