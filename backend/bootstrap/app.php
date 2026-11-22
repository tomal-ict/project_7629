<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

$rootEnv = dirname(__DIR__, 2) . '/.env';

$app = Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->alias([
            'auth.api_token' => \App\Http\Middleware\ApiTokenAuthMiddleware::class,
        ]);

        $middleware->web(prepend: [
            \App\Http\Middleware\AutoInstall::class,
            \App\Http\Middleware\SecurityHeadersMiddleware::class,
        ]);

        $middleware->api(prepend: [
            \App\Http\Middleware\AutoInstall::class,
            \App\Http\Middleware\SecurityHeadersMiddleware::class,
            \App\Http\Middleware\SanitizeInputMiddleware::class,
            \App\Http\Middleware\CryptoPayloadMiddleware::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        //
    })->create();

if (file_exists($rootEnv)) {
    $app->useEnvironmentPath(dirname(__DIR__, 2));
}

return $app;
