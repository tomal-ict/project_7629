<?php

namespace App\Http\Controllers;

use App\Models\Service;
use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\File;

class SeoController extends Controller
{
    private const PAGE_SLUGS = [
        'about',
        'services',
        'products',
        'technology',
        'industries',
        'leadership',
        'methodology',
        'contact',
    ];

    /**
     * Serve dynamic XML sitemap including homepage, pages, and all service detail URLs.
     */
    public function sitemap(Request $request): Response
    {
        $settings = $this->safeSettings();
        $baseUrl = $this->resolveBaseUrl($request, $settings);
        $today = now()->toDateString();

        $urls = [
            ['loc' => $baseUrl . '/', 'lastmod' => $today, 'changefreq' => 'weekly', 'priority' => '1.0'],
        ];

        foreach (self::PAGE_SLUGS as $slug) {
            $robots = $settings["seo_{$slug}_robots"] ?? ($settings['seo_robots'] ?? 'index, follow');
            if (str_contains(strtolower($robots), 'noindex')) {
                continue;
            }
            $urls[] = [
                'loc' => $baseUrl . '/' . $slug,
                'lastmod' => $today,
                'changefreq' => 'weekly',
                'priority' => '0.8',
            ];
        }

        try {
            $services = Service::orderBy('sort_order')->get();
            foreach ($services as $svc) {
                $urls[] = [
                    'loc' => $baseUrl . '/services/' . $svc->slug,
                    'lastmod' => optional($svc->updated_at)->toDateString() ?: $today,
                    'changefreq' => 'weekly',
                    'priority' => '0.9',
                ];
            }
        } catch (\Throwable) {
            // Keep static URLs if database is unavailable
        }

        $xml = ['<?xml version="1.0" encoding="UTF-8"?>'];
        $xml[] = '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
        foreach ($urls as $u) {
            $xml[] = '  <url>';
            $xml[] = '    <loc>' . e($u['loc']) . '</loc>';
            $xml[] = '    <lastmod>' . e($u['lastmod']) . '</lastmod>';
            $xml[] = '    <changefreq>' . e($u['changefreq']) . '</changefreq>';
            $xml[] = '    <priority>' . e($u['priority']) . '</priority>';
            $xml[] = '  </url>';
        }
        $xml[] = '</urlset>';

        return response(implode("\n", $xml) . "\n", 200, [
            'Content-Type' => 'application/xml; charset=UTF-8',
        ]);
    }

    /**
     * Serve dynamic robots.txt with sitemap pointer.
     */
    public function robots(Request $request): Response
    {
        $settings = $this->safeSettings();
        $baseUrl = $this->resolveBaseUrl($request, $settings);
        $custom = trim((string) ($settings['seo_robots_txt'] ?? ''));

        if ($custom !== '') {
            $body = $custom;
        } else {
            $body = implode("\n", [
                'User-agent: *',
                'Allow: /',
                'Disallow: /api/admin/',
                'Disallow: /backend/',
                '',
                'Sitemap: ' . $baseUrl . '/sitemap.xml',
            ]);
        }

        return response($body . "\n", 200, [
            'Content-Type' => 'text/plain; charset=UTF-8',
        ]);
    }

    /**
     * Serve the SPA HTML enriched with server-side SEO meta tags, GA4/GTM, and JSON-LD schema.
     */
    public function spa(Request $request): Response
    {
        $spaPath = base_path('../index.html');
        if (!File::exists($spaPath)) {
            $spaPath = public_path('index.html');
        }
        if (!File::exists($spaPath)) {
            $spaPath = base_path('../frontend/dist/index.html');
        }

        if (!File::exists($spaPath)) {
            return response('Frontend build not found.', 404);
        }

        $html = File::get($spaPath);
        $settings = $this->safeSettings();

        $appBasePath = rtrim($request->getBaseUrl(), '/');
        $baseHref = ($appBasePath === '' ? '' : $appBasePath) . '/';
        $originBase = $this->resolveBaseUrl($request, $settings);

        $pathInfo = trim($request->getPathInfo(), '/');
        $meta = $this->buildMetaForPath($pathInfo, $settings, $originBase);

        // Inject <base> so relative ./assets, ./css, ./images work on nested /services/{slug} routes
        $headInject = "\n    <base href=\"" . e($baseHref) . "\">";
        $headInject .= "\n    <meta name=\"keywords\" content=\"" . e($meta['keywords']) . "\">";
        $headInject .= "\n    <meta name=\"author\" content=\"" . e($meta['author']) . "\">";
        $headInject .= "\n    <meta name=\"robots\" content=\"" . e($meta['robots']) . "\">";
        $headInject .= "\n    <link rel=\"canonical\" href=\"" . e($meta['canonical']) . "\">";

        // Open Graph & Twitter Cards
        $headInject .= "\n    <meta property=\"og:type\" content=\"" . e($meta['og_type']) . "\">";
        $headInject .= "\n    <meta property=\"og:site_name\" content=\"" . e($meta['site_name']) . "\">";
        $headInject .= "\n    <meta property=\"og:title\" content=\"" . e($meta['title']) . "\">";
        $headInject .= "\n    <meta property=\"og:description\" content=\"" . e($meta['description']) . "\">";
        $headInject .= "\n    <meta property=\"og:url\" content=\"" . e($meta['canonical']) . "\">";
        if ($meta['og_image'] !== '') {
            $headInject .= "\n    <meta property=\"og:image\" content=\"" . e($meta['og_image']) . "\">";
        }
        $headInject .= "\n    <meta name=\"twitter:card\" content=\"" . e($meta['twitter_card']) . "\">";
        $headInject .= "\n    <meta name=\"twitter:title\" content=\"" . e($meta['title']) . "\">";
        $headInject .= "\n    <meta name=\"twitter:description\" content=\"" . e($meta['description']) . "\">";
        if ($meta['og_image'] !== '') {
            $headInject .= "\n    <meta name=\"twitter:image\" content=\"" . e($meta['og_image']) . "\">";
        }
        if (!empty($settings['seo_twitter_handle'])) {
            $headInject .= "\n    <meta name=\"twitter:site\" content=\"" . e($settings['seo_twitter_handle']) . "\">";
        }

        // Webmaster Verification Tags
        if (!empty($settings['google_site_verification'])) {
            $headInject .= "\n    <meta name=\"google-site-verification\" content=\"" . e($settings['google_site_verification']) . "\">";
        }
        if (!empty($settings['bing_site_verification'])) {
            $headInject .= "\n    <meta name=\"msvalidate.01\" content=\"" . e($settings['bing_site_verification']) . "\">";
        }

        // JSON-LD Structured Data
        $jsonLd = json_encode($meta['schema'], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        $headInject .= "\n    <script type=\"application/ld+json\" id=\"abc-ssr-jsonld\">" . $jsonLd . '</script>';

        // Google Analytics 4 (GA4)
        $ga4 = trim((string) ($settings['ga4_measurement_id'] ?? ''));
        if ($ga4 !== '' && preg_match('/^G-[A-Z0-9]+$/i', $ga4)) {
            $safeGa4 = e($ga4);
            $headInject .= "\n    <script async src=\"https://www.googletagmanager.com/gtag/js?id={$safeGa4}\"></script>";
            $headInject .= "\n    <script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','{$safeGa4}');</script>";
        }

        // Google Tag Manager (GTM)
        $gtm = trim((string) ($settings['gtm_container_id'] ?? ''));
        if ($gtm !== '' && preg_match('/^GTM-[A-Z0-9]+$/i', $gtm)) {
            $safeGtm = e($gtm);
            $headInject .= "\n    <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','{$safeGtm}');</script>";
        }

        // Replace default <title> and <meta name="description"> cleanly
        $html = preg_replace('/<title>.*?<\/title>/is', '<title>' . e($meta['title']) . '</title>', $html, 1) ?? $html;
        $html = preg_replace(
            '/<meta\s+name=["\']description["\'][^>]*>/i',
            '<meta name="description" content="' . e($meta['description']) . '">',
            $html,
            1
        ) ?? $html;

        $html = preg_replace('/<head([^>]*)>/i', "<head$1>" . $headInject, $html, 1) ?? $html;

        return response($html, 200, [
            'Content-Type' => 'text/html; charset=UTF-8',
            'X-Frame-Options' => 'SAMEORIGIN',
            'X-Content-Type-Options' => 'nosniff',
        ]);
    }

    private function safeSettings(): array
    {
        try {
            return Setting::allAsArray();
        } catch (\Throwable) {
            return [];
        }
    }

    private function resolveBaseUrl(Request $request, array $settings): string
    {
        $configured = trim((string) ($settings['seo_canonical_base'] ?? ''));
        if ($configured !== '' && preg_match('/^https?:\/\//i', $configured)) {
            return rtrim($configured, '/');
        }
        return rtrim($request->getSchemeAndHttpHost() . $request->getBaseUrl(), '/');
    }

    private function resolveAbsoluteAsset(string $path, string $baseUrl): string
    {
        $path = trim($path);
        if ($path === '') {
            return '';
        }
        if (preg_match('/^https?:\/\//i', $path)) {
            return $path;
        }
        $clean = ltrim(preg_replace('/^\.\//', '', $path), '/');
        return $baseUrl . '/' . $clean;
    }

    private function buildMetaForPath(string $pathInfo, array $settings, string $baseUrl): array
    {
        $siteName = $settings['company_name'] ?? 'ABC AI System Limited';
        $defaultTitle = $settings['seo_site_title'] ?? 'Architecting Sovereign Enterprise Intelligence — ABC AI System Limited';
        $defaultDesc = $settings['seo_meta_description'] ?? 'Pioneering sovereign artificial intelligence for mission-critical enterprise infrastructure — zero hallucinations, absolute on-premise containment, and deterministic operational precision.';
        $defaultKeywords = $settings['seo_meta_keywords'] ?? 'Sovereign AI, Enterprise LLM, On-Premise AI, Cyber-Robotics, AI Bangladesh, ABC AI System';
        $defaultRobots = $settings['seo_robots'] ?? 'index, follow';
        $defaultImage = $this->resolveAbsoluteAsset($settings['seo_og_image'] ?? './images/logo.svg', $baseUrl);

        $title = $defaultTitle;
        $desc = $defaultDesc;
        $keywords = $defaultKeywords;
        $robots = $defaultRobots;
        $ogImage = $defaultImage;
        $ogType = $settings['seo_og_type'] ?? 'website';
        $canonical = $pathInfo === '' ? $baseUrl . '/' : $baseUrl . '/' . $pathInfo;

        $orgSchema = [
            '@context' => 'https://schema.org',
            '@type' => $settings['seo_schema_org_type'] ?? 'Organization',
            'name' => $siteName,
            'url' => $baseUrl,
            'logo' => $this->resolveAbsoluteAsset($settings['site_logo'] ?? './images/logo.svg', $baseUrl),
            'email' => $settings['email'] ?? 'contact@abcaisystemltd.com',
            'telephone' => $settings['phone'] ?? '',
            'sameAs' => array_values(array_filter([
                $settings['linkedin'] ?? null,
                $settings['basis_url'] ?? null,
                $settings['dcci_url'] ?? null,
            ])),
        ];

        $schemas = [$orgSchema];

        if (str_starts_with($pathInfo, 'services/')) {
            $slug = substr($pathInfo, strlen('services/'));
            try {
                $service = Service::where('slug', $slug)->first();
                if ($service) {
                    $title = ($service->seo_title ?: $service->title) . ' | ' . $siteName;
                    $desc = $service->seo_description ?: ($service->description ?: $defaultDesc);
                    $keywords = $service->seo_keywords ?: $defaultKeywords;
                    $ogImage = $this->resolveAbsoluteAsset($service->seo_og_image ?: ($service->hero_image ?: ($settings['seo_og_image'] ?? '')), $baseUrl) ?: $defaultImage;
                    $schemas[] = [
                        '@context' => 'https://schema.org',
                        '@type' => 'Service',
                        'name' => $service->title,
                        'description' => $desc,
                        'provider' => ['@type' => 'Organization', 'name' => $siteName, 'url' => $baseUrl],
                        'url' => $canonical,
                    ];
                }
            } catch (\Throwable) {
            }
        } elseif ($pathInfo === '' || $pathInfo === 'home') {
            $title = $settings['seo_home_title'] ?? $defaultTitle;
            $desc = $settings['seo_home_description'] ?? $defaultDesc;
            $keywords = $settings['seo_home_keywords'] ?? $defaultKeywords;
            $robots = $settings['seo_home_robots'] ?? $defaultRobots;
            if (!empty($settings['seo_home_og_image'])) {
                $ogImage = $this->resolveAbsoluteAsset($settings['seo_home_og_image'], $baseUrl);
            }
        } elseif (in_array($pathInfo, self::PAGE_SLUGS, true)) {
            $pageKey = $pathInfo;
            $title = $settings["seo_{$pageKey}_title"] ?? (ucfirst($pageKey) . ' | ' . $siteName);
            $desc = $settings["seo_{$pageKey}_description"] ?? $defaultDesc;
            $keywords = $settings["seo_{$pageKey}_keywords"] ?? $defaultKeywords;
            $robots = $settings["seo_{$pageKey}_robots"] ?? $defaultRobots;
            if (!empty($settings["seo_{$pageKey}_og_image"])) {
                $ogImage = $this->resolveAbsoluteAsset($settings["seo_{$pageKey}_og_image"], $baseUrl);
            }
        }

        return [
            'site_name' => $siteName,
            'title' => $title,
            'description' => $desc,
            'keywords' => $keywords,
            'robots' => $robots,
            'author' => $settings['seo_author'] ?? $siteName,
            'canonical' => $canonical,
            'og_type' => $ogType,
            'og_image' => $ogImage,
            'twitter_card' => $settings['seo_twitter_card'] ?? 'summary_large_image',
            'schema' => $schemas,
        ];
    }
}
