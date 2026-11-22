<?php

use Illuminate\Foundation\Application;
use Illuminate\Http\Request;

define('LARAVEL_START', microtime(true));
@ini_set('expose_php', '0');
if (!headers_sent()) {
    header_remove('X-Powered-By');
}

// 1. Ensure all critical storage & cache directories exist and are writable
// This prevents 99% of cPanel permission 500 errors on fresh deployments
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

// Determine if the application is in maintenance mode...
if (file_exists($maintenance = __DIR__.'/../storage/framework/maintenance.php')) {
    require $maintenance;
}

// Register the Composer autoloader...
require __DIR__.'/../vendor/autoload.php';

// Bootstrap Laravel and handle the request...
/** @var Application $app */
$app = require_once __DIR__.'/../bootstrap/app.php';

// 2. Universal cPanel & Apache Routing Normalizer
// Fixes route matching on cPanel Apache, FastCGI, PHP-FPM, and subdirectories
// Guarantees that /api/... requests map cleanly to Laravel's api routes
if (PHP_SAPI !== 'cli') {
    $rawUri = $_SERVER['REQUEST_URI'] ?? '/';
    $parsedPath = parse_url($rawUri, PHP_URL_PATH) ?? '/';

    // Locate where '/api' appears in the URI path (supports root domain and subfolder deploys)
    $apiPos = strpos($parsedPath, '/api');
    if ($apiPos !== false) {
        $base = substr($parsedPath, 0, $apiPos); // e.g. "" for root domain, or "/subfolder"
        $_SERVER['SCRIPT_NAME'] = ($base === '' ? '' : $base) . '/index.php';
        $_SERVER['PHP_SELF'] = $_SERVER['SCRIPT_NAME'];
    } else {
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
}

$app->handleRequest(Request::capture());
