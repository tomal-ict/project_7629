<?php

use Illuminate\Foundation\Application;
use Illuminate\Http\Request;

define('LARAVEL_START', microtime(true));

// Determine if the application is in maintenance mode...
if (file_exists($maintenance = __DIR__.'/../storage/framework/maintenance.php')) {
    require $maintenance;
}

// Register the Composer autoloader...
require __DIR__.'/../vendor/autoload.php';

// Bootstrap Laravel and handle the request...
/** @var Application $app */
$app = require_once __DIR__.'/../bootstrap/app.php';

// Some hosts run this file through a rewrite (e.g. /AGM_Web_site/ -> public/).
// Then SCRIPT_NAME points inside /public while REQUEST_URI keeps the original
// path, which breaks Laravel's route matching. Normalize both so the project
// folder itself acts as the base URL, no matter where it is deployed.
if (PHP_SAPI !== 'cli'
    && str_ends_with($_SERVER['SCRIPT_NAME'] ?? '', '/public/index.php')
    && ! str_contains($_SERVER['REQUEST_URI'] ?? '', '/public/')) {

    $projectBase = substr($_SERVER['SCRIPT_NAME'], 0, -strlen('/public/index.php'));
    $path = explode('?', $_SERVER['REQUEST_URI'], 2)[0];

    if ($projectBase === '' || str_starts_with($path, $projectBase)) {
        $tail = $projectBase === '' ? $path : substr($path, strlen($projectBase));

        $_SERVER['REQUEST_URI'] = $projectBase.($tail === '' || $tail === '/' ? '/' : $tail);
        $_SERVER['SCRIPT_NAME'] = ($projectBase === '' ? '' : $projectBase).'/index.php';

        if (isset($_SERVER['PHP_SELF'])) {
            $_SERVER['PHP_SELF'] = ($projectBase === '' ? '' : $projectBase)
                .'/index.php'
                .($tail === '' || $tail === '/' ? '' : $tail);
        }
    }
}

$app->handleRequest(Request::capture());
