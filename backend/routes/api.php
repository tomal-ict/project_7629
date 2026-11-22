<?php

use App\Http\Controllers\Api\AdminApiController;
use App\Http\Controllers\Api\AuthApiController;
use App\Http\Controllers\Api\SiteApiController;
use App\Services\CryptoService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Crypto handshake & health check
Route::get('/crypto/info', function (CryptoService $crypto) {
    return response()->json([
        'success' => true,
        'crypto' => $crypto->getCryptoInfo(),
        'timestamp' => now()->toIso8601String(),
    ]);
});

// Public Site API
Route::prefix('site')->group(function () {
    Route::get('/data', [SiteApiController::class, 'homeData']);
    Route::get('/services/{slug}', [SiteApiController::class, 'serviceDetail']);
    Route::post('/contact', [SiteApiController::class, 'sendContact'])->middleware('throttle:10,1');
});

// Authentication API
Route::prefix('auth')->group(function () {
    Route::post('/login', [AuthApiController::class, 'login']);
    Route::middleware('auth.api_token')->group(function () {
        Route::get('/me', [AuthApiController::class, 'me']);
        Route::post('/logout', [AuthApiController::class, 'logout']);
    });
});

// Admin Protected API
Route::middleware('auth.api_token')->prefix('admin')->group(function () {
    Route::get('/dashboard', [AdminApiController::class, 'dashboard']);

    // Settings
    Route::get('/settings', [AdminApiController::class, 'getSettings']);
    Route::put('/settings/{id}', [AdminApiController::class, 'updateSetting']);
    Route::post('/settings/bulk', [AdminApiController::class, 'bulkUpdateSettings']);

    // Services
    Route::get('/services', [AdminApiController::class, 'getServices']);
    Route::post('/services', [AdminApiController::class, 'storeService']);
    Route::put('/services/{id}', [AdminApiController::class, 'updateService']);
    Route::delete('/services/{id}', [AdminApiController::class, 'deleteService']);

    // Products
    Route::get('/products', [AdminApiController::class, 'getProducts']);
    Route::post('/products', [AdminApiController::class, 'storeProduct']);
    Route::put('/products/{id}', [AdminApiController::class, 'updateProduct']);
    Route::delete('/products/{id}', [AdminApiController::class, 'deleteProduct']);

    // Team Members
    Route::get('/team-members', [AdminApiController::class, 'getTeamMembers']);
    Route::post('/team-members', [AdminApiController::class, 'storeTeamMember']);
    Route::put('/team-members/{id}', [AdminApiController::class, 'updateTeamMember']);
    Route::delete('/team-members/{id}', [AdminApiController::class, 'deleteTeamMember']);

    // Clients
    Route::get('/clients', [AdminApiController::class, 'getClients']);
    Route::post('/clients', [AdminApiController::class, 'storeClient']);
    Route::put('/clients/{id}', [AdminApiController::class, 'updateClient']);
    Route::delete('/clients/{id}', [AdminApiController::class, 'deleteClient']);

    // Industries
    Route::get('/industries', [AdminApiController::class, 'getIndustries']);
    Route::post('/industries', [AdminApiController::class, 'storeIndustry']);
    Route::put('/industries/{id}', [AdminApiController::class, 'updateIndustry']);
    Route::delete('/industries/{id}', [AdminApiController::class, 'deleteIndustry']);

    // Tech Domains
    Route::get('/tech-domains', [AdminApiController::class, 'getTechDomains']);
    Route::post('/tech-domains', [AdminApiController::class, 'storeTechDomain']);
    Route::put('/tech-domains/{id}', [AdminApiController::class, 'updateTechDomain']);
    Route::delete('/tech-domains/{id}', [AdminApiController::class, 'deleteTechDomain']);

    // Advantages
    Route::get('/advantages', [AdminApiController::class, 'getAdvantages']);
    Route::post('/advantages', [AdminApiController::class, 'storeAdvantage']);
    Route::put('/advantages/{id}', [AdminApiController::class, 'updateAdvantage']);
    Route::delete('/advantages/{id}', [AdminApiController::class, 'deleteAdvantage']);

    // Methodologies
    Route::get('/methodologies', [AdminApiController::class, 'getMethodologies']);
    Route::post('/methodologies', [AdminApiController::class, 'storeMethodology']);
    Route::put('/methodologies/{id}', [AdminApiController::class, 'updateMethodology']);
    Route::delete('/methodologies/{id}', [AdminApiController::class, 'deleteMethodology']);

    // Statistics
    Route::get('/statistics', [AdminApiController::class, 'getStatistics']);
    Route::post('/statistics', [AdminApiController::class, 'storeStatistic']);
    Route::put('/statistics/{id}', [AdminApiController::class, 'updateStatistic']);
    Route::delete('/statistics/{id}', [AdminApiController::class, 'deleteStatistic']);

    // Messages
    Route::get('/messages', [AdminApiController::class, 'getMessages']);
    Route::patch('/messages/{id}/read', [AdminApiController::class, 'markMessageRead']);
    Route::delete('/messages/{id}', [AdminApiController::class, 'deleteMessage']);
});
