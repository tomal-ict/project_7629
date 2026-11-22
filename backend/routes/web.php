<?php

use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes - Serves React Frontend SPA
|--------------------------------------------------------------------------
| Any web route (excluding /api/*) serves the production-ready React SPA.
| This enables seamless cPanel and localhost deployment without Node daemons.
*/

Route::get('/{any?}', function () {
    $spaPath = public_path('index.html');
    if (! File::exists($spaPath)) {
        $spaPath = base_path('../frontend/dist/index.html');
    }

    if (File::exists($spaPath)) {
        return Response::file($spaPath, [
            'Content-Type' => 'text/html; charset=UTF-8',
            'X-Frame-Options' => 'SAMEORIGIN',
            'X-Content-Type-Options' => 'nosniff',
        ]);
    }

    return response()->json([
        'status' => 'ABC AI System API Operational',
        'message' => 'Backend is running. Frontend build files not found at ' . $spaPath,
        'api_documentation' => '/api/crypto/info',
    ]);
})->where('any', '.*');
