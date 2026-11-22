<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Build every generated URL from the actual request (scheme + host + sub-folder),
        // so the app works on any Apache docroot without editing APP_URL or hardcoded ports.
        if (! $this->app->runningInConsole()) {
            $request = $this->app['request'];
            $base = $request->getBaseUrl();

            if ($base !== '' && $base !== '/') {
                $this->app['url']->forceRootUrl($request->getSchemeAndHttpHost().$base);
            }
        }
    }
}
