<?php

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\AdvantageController;
use App\Http\Controllers\Admin\ClientController;
use App\Http\Controllers\Admin\ContactMessageController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\IndustryController;
use App\Http\Controllers\Admin\MethodologyController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Admin\ServiceController;
use App\Http\Controllers\Admin\SettingController;
use App\Http\Controllers\Admin\StatisticController;
use App\Http\Controllers\Admin\TeamMemberController;
use App\Http\Controllers\Admin\TechDomainController;
use App\Http\Controllers\SiteController;
use Illuminate\Support\Facades\Route;

Route::get('/', [SiteController::class, 'home'])->name('home');
Route::get('/services/{service:slug}', [SiteController::class, 'service'])->name('services.show');
Route::post('/contact', [SiteController::class, 'sendContact'])->name('contact.send');

Route::middleware(['auth', 'verified'])->get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

Route::middleware(['auth', 'verified'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');
    Route::resource('settings', SettingController::class)->except(['show']);
    Route::resource('statistics', StatisticController::class)->except(['show']);
    Route::resource('services', ServiceController::class)->except(['show']);
    Route::resource('products', ProductController::class)->except(['show']);
    Route::resource('team-members', TeamMemberController::class)->except(['show']);
    Route::resource('clients', ClientController::class)->except(['show']);
    Route::resource('industries', IndustryController::class)->except(['show']);
    Route::resource('tech-domains', TechDomainController::class)->except(['show']);
    Route::resource('advantages', AdvantageController::class)->except(['show']);
    Route::resource('methodologies', MethodologyController::class)->except(['show']);
    Route::get('messages', [ContactMessageController::class, 'index'])->name('messages.index');
    Route::patch('messages/{message}/read', [ContactMessageController::class, 'markRead'])->name('messages.read');
    Route::delete('messages/{message}', [ContactMessageController::class, 'destroy'])->name('messages.destroy');
});

require __DIR__.'/auth.php';