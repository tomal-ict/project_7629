<?php

use Illuminate\Foundation\Application;
use Illuminate\Http\Request;

define('LARAVEL_START', microtime(true));
@ini_set('expose_php', '0');
if (!headers_sent()) {
    header_remove('X-Powered-By');
}

// 1. Ensure all critical storage & cache directories exist and are writable
// This prevents 99% of cPanel / aaPanel permission 500 errors on fresh deployments
$storageDirs = [
    __DIR__ . '/../storage/app',
    __DIR__ . '/../storage/app/public',
    __DIR__ . '/../storage/framework/cache/data',
    __DIR__ . '/../storage/framework/sessions',
    __DIR__ . '/../storage/framework/views',
    __DIR__ . '/../storage/logs',
    __DIR__ . '/../bootstrap/cache',
];
foreach ($storageDirs as $sDir) {
    if (!is_dir($sDir)) {
        @mkdir($sDir, 0775, true);
    }
    @chmod($sDir, 0775);
}

// 2. Synchronize .env between project root and backend folder
// So if user edits .env in either cPanel public_html root OR backend folder, both work identically!
$rootEnv = dirname(__DIR__, 2) . '/.env';
$backendEnv = dirname(__DIR__) . '/.env';

if (file_exists($rootEnv) && !file_exists($backendEnv)) {
    @copy($rootEnv, $backendEnv);
} elseif (file_exists($backendEnv) && !file_exists($rootEnv)) {
    @copy($backendEnv, $rootEnv);
}

// Determine if the application is in maintenance mode...
if (file_exists($maintenance = __DIR__.'/../storage/framework/maintenance.php')) {
    require $maintenance;
}

// Register the Composer autoloader...
require __DIR__.'/../vendor/autoload.php';

// Bootstrap Laravel and handle the request...
/** @var Application $app */
$app = require_once __DIR__.'/../bootstrap/app.php';

// If root .env exists, prioritize loading from root directory
if (file_exists($rootEnv)) {
    $app->useEnvironmentPath(dirname(__DIR__, 2));
}

// 3. Multi-Host URL & Routing Normalizer
// Fixes route matching on cPanel Apache, aaPanel Nginx, FastCGI, and subdirectories
if (PHP_SAPI !== 'cli') {
    $scriptName = $_SERVER['SCRIPT_NAME'] ?? '';
    $suffix = '';

    if (str_ends_with($scriptName, '/backend/public/index.php')) {
        $suffix = '/backend/public/index.php';
    } elseif (str_ends_with($scriptName, '/public/index.php')) {
        $suffix = '/public/index.php';
    }

    if ($suffix !== '' && !str_contains($_SERVER['REQUEST_URI'] ?? '', $suffix)) {
        $projectBase = substr($scriptName, 0, -strlen($suffix));
        $path = explode('?', $_SERVER['REQUEST_URI'] ?? '', 2)[0];

        if ($projectBase === '' || str_starts_with($path, $projectBase)) {
            $tail = $projectBase === '' ? $path : substr($path, strlen($projectBase));

            $_SERVER['REQUEST_URI'] = $projectBase . ($tail === '' || $tail === '/' ? '/' : $tail);
            $_SERVER['SCRIPT_NAME'] = ($projectBase === '' ? '' : $projectBase) . '/index.php';

            if (isset($_SERVER['PHP_SELF'])) {
                $_SERVER['PHP_SELF'] = ($projectBase === '' ? '' : $projectBase)
                    . '/index.php'
                    . ($tail === '' || $tail === '/' ? '' : $tail);
            }
        }
    }
}

$app->handleRequest(Request::capture());
