<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Advantage;
use App\Models\Client;
use App\Models\Comparison;
use App\Models\ContactMessage;
use App\Models\CoreValue;
use App\Models\Industry;
use App\Models\Methodology;
use App\Models\Product;
use App\Models\Service;
use App\Models\Setting;
use App\Models\Statistic;
use App\Models\TeamMember;
use App\Models\TechDomain;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class AdminApiController extends Controller
{
    /**
     * Dashboard analytics and overview metrics
     */
    public function dashboard(): JsonResponse
    {
        $servicesCount = Service::count();
        $featuredServices = Service::where('featured_on_home', true)->count();
        $productsCount = Product::count();
        $flagshipProducts = Product::where('is_flagship', true)->count();
        $teamCount = TeamMember::count();
        $advisorsCount = TeamMember::where('category', 'advisor')->count();
        $clientsCount = Client::count();
        $officialClients = Client::where('group', 'clients')->count();
        $messagesCount = ContactMessage::count();
        $unreadMessages = ContactMessage::where('is_read', false)->count();
        $industriesCount = Industry::count();
        $techDomainsCount = TechDomain::count();
        $advantagesCount = Advantage::count();
        $methodologiesCount = Methodology::count();
        $statisticsCount = Statistic::count();
        $coreValuesCount = CoreValue::count();
        $comparisonsCount = Comparison::count();
        $settingsCount = Setting::count();

        // Monthly inquiry activity (last 6 months including current)
        $inquiriesTrend = [];
        for ($i = 5; $i >= 0; $i--) {
            $monthStart = now()->subMonths($i)->startOfMonth();
            $monthEnd = (clone $monthStart)->endOfMonth();
            $total = ContactMessage::whereBetween('created_at', [$monthStart, $monthEnd])->count();
            $unread = ContactMessage::whereBetween('created_at', [$monthStart, $monthEnd])
                ->where('is_read', false)
                ->count();

            $inquiriesTrend[] = [
                'label' => $monthStart->format('M Y'),
                'short' => $monthStart->format('M'),
                'total' => $total,
                'unread' => $unread,
            ];
        }

        // SEO readiness summary
        $allSettings = Setting::allAsArray();
        $seoTitleOk = mb_strlen(trim((string) ($allSettings['seo_site_title'] ?? ''))) >= 20;
        $seoDescOk = mb_strlen(trim((string) ($allSettings['seo_meta_description'] ?? ''))) >= 60;
        $seoOgOk = trim((string) ($allSettings['seo_og_image'] ?? '')) !== '';
        $ga4Connected = trim((string) ($allSettings['ga4_measurement_id'] ?? '')) !== '';
        $gtmConnected = trim((string) ($allSettings['gtm_container_id'] ?? '')) !== '';
        $gscConnected = trim((string) ($allSettings['google_site_verification'] ?? '')) !== '';
        $servicesWithSeo = Service::whereNotNull('seo_title')
            ->where('seo_title', '!=', '')
            ->count();

        $seoChecksPassed = 2 // Sitemap + JSON-LD always active
            + ($seoTitleOk ? 1 : 0)
            + ($seoDescOk ? 1 : 0)
            + ($seoOgOk ? 1 : 0)
            + (($ga4Connected || $gtmConnected) ? 1 : 0)
            + ($gscConnected ? 1 : 0);
        $seoScore = (int) round(($seoChecksPassed / 7) * 100);

        return response()->json([
            'success' => true,
            'counts' => [
                'services' => $servicesCount,
                'featured_services' => $featuredServices,
                'products' => $productsCount,
                'flagship_products' => $flagshipProducts,
                'ecosystem_products' => max(0, $productsCount - $flagshipProducts),
                'team_members' => $teamCount,
                'advisors' => $advisorsCount,
                'core_team' => max(0, $teamCount - $advisorsCount),
                'clients' => $clientsCount,
                'official_clients' => $officialClients,
                'pilot_clients' => max(0, $clientsCount - $officialClients),
                'messages' => $messagesCount,
                'unread_messages' => $unreadMessages,
                'read_messages' => max(0, $messagesCount - $unreadMessages),
                'industries' => $industriesCount,
                'tech_domains' => $techDomainsCount,
                'advantages' => $advantagesCount,
                'methodologies' => $methodologiesCount,
                'statistics' => $statisticsCount,
                'core_values' => $coreValuesCount,
                'comparisons' => $comparisonsCount,
                'settings' => $settingsCount,
                'total_pages' => 10,
                'total_indexable' => 10 + $servicesCount,
            ],
            'inquiries_trend' => $inquiriesTrend,
            'seo_summary' => [
                'score' => $seoScore,
                'ga4_connected' => $ga4Connected,
                'gtm_connected' => $gtmConnected,
                'gsc_connected' => $gscConnected,
                'services_with_seo' => $servicesWithSeo,
                'total_services' => $servicesCount,
            ],
            'recent_messages' => ContactMessage::latest()->take(5)->get(),
        ]);
    }

    // ==========================================
    // SETTINGS
    // ==========================================
    public function getSettings(): JsonResponse
    {
        return response()->json([
            'success' => true,
            'settings' => Setting::orderBy('group')->orderBy('key')->get(),
            'grouped' => Setting::allGrouped(),
            'asArray' => Setting::allAsArray(),
        ]);
    }

    public function updateSetting(Request $request, int $id): JsonResponse
    {
        $setting = Setting::findOrFail($id);
        $validated = $request->validate([
            'group' => ['nullable', 'string', 'max:100'],
            'key' => ['nullable', 'string', 'max:150'],
            'value' => ['nullable'],
        ]);

        $setting->update(array_filter($validated, fn ($v) => $v !== null || $v === ''));

        return response()->json(['success' => true, 'message' => 'Setting updated successfully.', 'setting' => $setting]);
    }

    public function storeSetting(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'group' => ['required', 'string', 'max:100'],
            'key' => ['required', 'string', 'max:150'],
            'value' => ['nullable'],
        ]);

        $setting = Setting::set($validated['key'], $validated['value'] ?? '', $validated['group']);

        return response()->json(['success' => true, 'message' => 'Setting saved successfully.', 'setting' => $setting], 201);
    }

    public function deleteSetting(int $id): JsonResponse
    {
        Setting::findOrFail($id)->delete();
        return response()->json(['success' => true, 'message' => 'Setting deleted successfully.']);
    }

    public function bulkUpdateSettings(Request $request): JsonResponse
    {
        $settings = $request->input('settings', []);
        $groups = $request->input('groups', []);

        foreach ($settings as $key => $val) {
            $existing = Setting::where('key', $key)->first();
            $group = $groups[$key] ?? ($existing ? $existing->group : 'general');
            $formatted = is_array($val)
                ? json_encode($val, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES)
                : (string)($val ?? '');

            Setting::set($key, $formatted, $group);
        }

        return response()->json([
            'success' => true,
            'message' => 'Settings updated successfully.',
            'settings' => Setting::allAsArray(),
        ]);
    }

    /**
     * Upload an image to public/images/uploads and return its relative web path.
     */
    public function uploadImage(Request $request): JsonResponse
    {
        $request->validate([
            'image' => ['required', 'file', 'mimes:jpg,jpeg,png,webp,gif,svg', 'max:5120'],
        ]);

        $file = $request->file('image');
        $ext = strtolower($file->getClientOriginalExtension() ?: 'png');
        $baseName = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
        $safeBase = Str::slug($baseName) ?: 'image';
        $filename = time() . '_' . Str::random(6) . '_' . $safeBase . '.' . $ext;

        $uploadDir = public_path('images/uploads');
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0755, true);
        }

        $file->move($uploadDir, $filename);

        return response()->json([
            'success' => true,
            'message' => 'Image uploaded successfully.',
            'filename' => $filename,
            'url' => './images/uploads/' . $filename,
        ]);
    }

    // ==========================================
    // SERVICES
    // ==========================================
    public function getServices(): JsonResponse
    {
        return response()->json([
            'success' => true,
            'services' => Service::orderBy('sort_order')->get(),
        ]);
    }

    public function storeService(Request $request): JsonResponse
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255'],
            'subtitle' => ['nullable', 'string'],
            'icon' => ['nullable', 'string'],
            'color' => ['nullable', 'string'],
            'color_light' => ['nullable', 'string'],
            'intro' => ['nullable', 'string'],
            'description' => ['nullable', 'string'],
            'features' => ['nullable'],
            'benefits' => ['nullable'],
            'usecases' => ['nullable'],
            'stats' => ['nullable'],
            'steps' => ['nullable'],
            'hero_image' => ['nullable', 'string'],
            'gallery_images' => ['nullable'],
            'why_us' => ['nullable', 'string'],
            'seo_title' => ['nullable', 'string', 'max:255'],
            'seo_description' => ['nullable', 'string'],
            'seo_keywords' => ['nullable', 'string'],
            'seo_og_image' => ['nullable', 'string'],
            'featured_on_home' => ['nullable', 'boolean'],
            'sort_order' => ['nullable', 'integer'],
        ]);

        if (empty($data['slug'])) {
            $data['slug'] = Str::slug($data['title']);
        }
        $data['featured_on_home'] = !empty($data['featured_on_home']);
        $data['sort_order'] = $data['sort_order'] ?? 0;

        $service = Service::create($data);

        return response()->json(['success' => true, 'message' => 'Service created successfully.', 'service' => $service], 201);
    }

    public function updateService(Request $request, int $id): JsonResponse
    {
        $service = Service::findOrFail($id);
        $data = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255'],
            'subtitle' => ['nullable', 'string'],
            'icon' => ['nullable', 'string'],
            'color' => ['nullable', 'string'],
            'color_light' => ['nullable', 'string'],
            'intro' => ['nullable', 'string'],
            'description' => ['nullable', 'string'],
            'features' => ['nullable'],
            'benefits' => ['nullable'],
            'usecases' => ['nullable'],
            'stats' => ['nullable'],
            'steps' => ['nullable'],
            'hero_image' => ['nullable', 'string'],
            'gallery_images' => ['nullable'],
            'why_us' => ['nullable', 'string'],
            'seo_title' => ['nullable', 'string', 'max:255'],
            'seo_description' => ['nullable', 'string'],
            'seo_keywords' => ['nullable', 'string'],
            'seo_og_image' => ['nullable', 'string'],
            'featured_on_home' => ['nullable', 'boolean'],
            'sort_order' => ['nullable', 'integer'],
        ]);

        if (empty($data['slug'])) {
            $data['slug'] = Str::slug($data['title']);
        }
        $data['featured_on_home'] = !empty($data['featured_on_home']);

        $service->update($data);

        return response()->json(['success' => true, 'message' => 'Service updated successfully.', 'service' => $service]);
    }

    public function deleteService(int $id): JsonResponse
    {
        Service::findOrFail($id)->delete();
        return response()->json(['success' => true, 'message' => 'Service deleted successfully.']);
    }

    // ==========================================
    // PRODUCTS
    // ==========================================
    public function getProducts(): JsonResponse
    {
        return response()->json([
            'success' => true,
            'products' => Product::orderBy('sort_order')->get(),
        ]);
    }

    public function storeProduct(Request $request): JsonResponse
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'tag' => ['nullable', 'string'],
            'metric' => ['nullable', 'string'],
            'description' => ['nullable', 'string'],
            'features' => ['nullable'],
            'logo' => ['nullable', 'string'],
            'demo' => ['nullable'],
            'is_flagship' => ['nullable', 'boolean'],
            'is_active' => ['nullable', 'boolean'],
            'sort_order' => ['nullable', 'integer'],
        ]);

        $data['is_flagship'] = !empty($data['is_flagship']);
        $data['is_active'] = $data['is_active'] ?? true;
        $data['sort_order'] = $data['sort_order'] ?? 0;

        $product = Product::create($data);

        return response()->json(['success' => true, 'message' => 'Product created successfully.', 'product' => $product], 201);
    }

    public function updateProduct(Request $request, int $id): JsonResponse
    {
        $product = Product::findOrFail($id);
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'tag' => ['nullable', 'string'],
            'metric' => ['nullable', 'string'],
            'description' => ['nullable', 'string'],
            'features' => ['nullable'],
            'logo' => ['nullable', 'string'],
            'demo' => ['nullable'],
            'is_flagship' => ['nullable', 'boolean'],
            'is_active' => ['nullable', 'boolean'],
            'sort_order' => ['nullable', 'integer'],
        ]);

        $data['is_flagship'] = !empty($data['is_flagship']);
        $data['is_active'] = !empty($data['is_active']);

        $product->update($data);

        return response()->json(['success' => true, 'message' => 'Product updated successfully.', 'product' => $product]);
    }

    public function deleteProduct(int $id): JsonResponse
    {
        Product::findOrFail($id)->delete();
        return response()->json(['success' => true, 'message' => 'Product deleted successfully.']);
    }

    // ==========================================
    // TEAM MEMBERS
    // ==========================================
    public function getTeamMembers(): JsonResponse
    {
        return response()->json([
            'success' => true,
            'team_members' => TeamMember::orderBy('sort_order')->get(),
        ]);
    }

    public function storeTeamMember(Request $request): JsonResponse
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'role' => ['required', 'string', 'max:255'],
            'category' => ['required', 'in:core,advisor'],
            'bio' => ['nullable', 'string'],
            'tags' => ['nullable'],
            'links' => ['nullable'],
            'photo' => ['nullable', 'string'],
            'sort_order' => ['nullable', 'integer'],
        ]);

        $teamMember = TeamMember::create($data);
        return response()->json(['success' => true, 'message' => 'Team member created.', 'team_member' => $teamMember], 201);
    }

    public function updateTeamMember(Request $request, int $id): JsonResponse
    {
        $member = TeamMember::findOrFail($id);
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'role' => ['required', 'string', 'max:255'],
            'category' => ['required', 'in:core,advisor'],
            'bio' => ['nullable', 'string'],
            'tags' => ['nullable'],
            'links' => ['nullable'],
            'photo' => ['nullable', 'string'],
            'sort_order' => ['nullable', 'integer'],
        ]);

        $member->update($data);
        return response()->json(['success' => true, 'message' => 'Team member updated.', 'team_member' => $member]);
    }

    public function deleteTeamMember(int $id): JsonResponse
    {
        TeamMember::findOrFail($id)->delete();
        return response()->json(['success' => true, 'message' => 'Team member deleted.']);
    }

    // ==========================================
    // CLIENTS
    // ==========================================
    public function getClients(): JsonResponse
    {
        return response()->json([
            'success' => true,
            'clients' => Client::orderBy('sort_order')->get(),
        ]);
    }

    public function storeClient(Request $request): JsonResponse
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'group' => ['required', 'in:clients,pilots'],
            'logo' => ['nullable', 'string'],
            'accent' => ['nullable', 'string', 'max:32'],
            'sort_order' => ['nullable', 'integer'],
        ]);

        $client = Client::create($data);
        return response()->json(['success' => true, 'message' => 'Client created.', 'client' => $client], 201);
    }

    public function updateClient(Request $request, int $id): JsonResponse
    {
        $client = Client::findOrFail($id);
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'group' => ['required', 'in:clients,pilots'],
            'logo' => ['nullable', 'string'],
            'accent' => ['nullable', 'string', 'max:32'],
            'sort_order' => ['nullable', 'integer'],
        ]);

        $client->update($data);
        return response()->json(['success' => true, 'message' => 'Client updated.', 'client' => $client]);
    }

    public function deleteClient(int $id): JsonResponse
    {
        Client::findOrFail($id)->delete();
        return response()->json(['success' => true, 'message' => 'Client deleted.']);
    }

    // ==========================================
    // INDUSTRIES
    // ==========================================
    public function getIndustries(): JsonResponse
    {
        return response()->json(['success' => true, 'industries' => Industry::orderBy('sort_order')->get()]);
    }

    public function storeIndustry(Request $request): JsonResponse
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'icon' => ['nullable', 'string'],
            'sort_order' => ['nullable', 'integer'],
        ]);
        $item = Industry::create($data);
        return response()->json(['success' => true, 'message' => 'Industry created.', 'industry' => $item], 201);
    }

    public function updateIndustry(Request $request, int $id): JsonResponse
    {
        $item = Industry::findOrFail($id);
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'icon' => ['nullable', 'string'],
            'sort_order' => ['nullable', 'integer'],
        ]);
        $item->update($data);
        return response()->json(['success' => true, 'message' => 'Industry updated.', 'industry' => $item]);
    }

    public function deleteIndustry(int $id): JsonResponse
    {
        Industry::findOrFail($id)->delete();
        return response()->json(['success' => true, 'message' => 'Industry deleted.']);
    }

    // ==========================================
    // TECH DOMAINS
    // ==========================================
    public function getTechDomains(): JsonResponse
    {
        return response()->json(['success' => true, 'tech_domains' => TechDomain::orderBy('sort_order')->get()]);
    }

    public function storeTechDomain(Request $request): JsonResponse
    {
        $data = $request->validate([
            'title' => ['nullable', 'string', 'max:255'],
            'name' => ['nullable', 'string', 'max:255'],
            'icon' => ['nullable', 'string'],
            'description' => ['nullable', 'string'],
            'sort_order' => ['nullable', 'integer'],
        ]);
        $payload = [
            'title' => $data['title'] ?? $data['name'] ?? 'Untitled Domain',
            'icon' => $data['icon'] ?? '🤖',
            'description' => $data['description'] ?? '',
            'sort_order' => $data['sort_order'] ?? 0,
        ];
        $item = TechDomain::create($payload);
        return response()->json(['success' => true, 'message' => 'Tech Domain created.', 'tech_domain' => $item], 201);
    }

    public function updateTechDomain(Request $request, int $id): JsonResponse
    {
        $item = TechDomain::findOrFail($id);
        $data = $request->validate([
            'title' => ['nullable', 'string', 'max:255'],
            'name' => ['nullable', 'string', 'max:255'],
            'icon' => ['nullable', 'string'],
            'description' => ['nullable', 'string'],
            'sort_order' => ['nullable', 'integer'],
        ]);
        $item->update([
            'title' => $data['title'] ?? $data['name'] ?? $item->title,
            'icon' => $data['icon'] ?? $item->icon,
            'description' => $data['description'] ?? $item->description,
            'sort_order' => $data['sort_order'] ?? $item->sort_order,
        ]);
        return response()->json(['success' => true, 'message' => 'Tech Domain updated.', 'tech_domain' => $item]);
    }

    public function deleteTechDomain(int $id): JsonResponse
    {
        TechDomain::findOrFail($id)->delete();
        return response()->json(['success' => true, 'message' => 'Tech Domain deleted.']);
    }

    // ==========================================
    // ADVANTAGES
    // ==========================================
    public function getAdvantages(): JsonResponse
    {
        return response()->json(['success' => true, 'advantages' => Advantage::orderBy('sort_order')->get()]);
    }

    public function storeAdvantage(Request $request): JsonResponse
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'subtitle' => ['nullable', 'string'],
            'description' => ['nullable', 'string'],
            'icon' => ['nullable', 'string'],
            'sort_order' => ['nullable', 'integer'],
        ]);
        $item = Advantage::create($data);
        return response()->json(['success' => true, 'message' => 'Advantage created.', 'advantage' => $item], 201);
    }

    public function updateAdvantage(Request $request, int $id): JsonResponse
    {
        $item = Advantage::findOrFail($id);
        $data = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'subtitle' => ['nullable', 'string'],
            'description' => ['nullable', 'string'],
            'icon' => ['nullable', 'string'],
            'sort_order' => ['nullable', 'integer'],
        ]);
        $item->update($data);
        return response()->json(['success' => true, 'message' => 'Advantage updated.', 'advantage' => $item]);
    }

    public function deleteAdvantage(int $id): JsonResponse
    {
        Advantage::findOrFail($id)->delete();
        return response()->json(['success' => true, 'message' => 'Advantage deleted.']);
    }

    // ==========================================
    // METHODOLOGIES
    // ==========================================
    public function getMethodologies(): JsonResponse
    {
        return response()->json(['success' => true, 'methodologies' => Methodology::orderBy('sort_order')->get()]);
    }

    public function storeMethodology(Request $request): JsonResponse
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'icon' => ['nullable', 'string'],
            'sort_order' => ['nullable', 'integer'],
        ]);
        $item = Methodology::create($data);
        return response()->json(['success' => true, 'message' => 'Methodology created.', 'methodology' => $item], 201);
    }

    public function updateMethodology(Request $request, int $id): JsonResponse
    {
        $item = Methodology::findOrFail($id);
        $data = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'icon' => ['nullable', 'string'],
            'sort_order' => ['nullable', 'integer'],
        ]);
        $item->update($data);
        return response()->json(['success' => true, 'message' => 'Methodology updated.', 'methodology' => $item]);
    }

    public function deleteMethodology(int $id): JsonResponse
    {
        Methodology::findOrFail($id)->delete();
        return response()->json(['success' => true, 'message' => 'Methodology deleted.']);
    }

    // ==========================================
    // STATISTICS
    // ==========================================
    public function getStatistics(): JsonResponse
    {
        return response()->json(['success' => true, 'statistics' => Statistic::orderBy('sort_order')->get()]);
    }

    public function storeStatistic(Request $request): JsonResponse
    {
        $data = $request->validate([
            'label' => ['required', 'string', 'max:255'],
            'value' => ['required', 'string', 'max:255'],
            'sub' => ['nullable', 'string'],
            'sort_order' => ['nullable', 'integer'],
        ]);
        $item = Statistic::create($data);
        return response()->json(['success' => true, 'message' => 'Statistic created.', 'statistic' => $item], 201);
    }

    public function updateStatistic(Request $request, int $id): JsonResponse
    {
        $item = Statistic::findOrFail($id);
        $data = $request->validate([
            'label' => ['required', 'string', 'max:255'],
            'value' => ['required', 'string', 'max:255'],
            'sub' => ['nullable', 'string'],
            'sort_order' => ['nullable', 'integer'],
        ]);
        $item->update($data);
        return response()->json(['success' => true, 'message' => 'Statistic updated.', 'statistic' => $item]);
    }

    public function deleteStatistic(int $id): JsonResponse
    {
        Statistic::findOrFail($id)->delete();
        return response()->json(['success' => true, 'message' => 'Statistic deleted.']);
    }

    // ==========================================
    // CORE VALUES
    // ==========================================
    public function getCoreValues(): JsonResponse
    {
        return response()->json(['success' => true, 'core_values' => CoreValue::orderBy('sort_order')->get()]);
    }

    public function storeCoreValue(Request $request): JsonResponse
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'icon' => ['nullable', 'string'],
            'sort_order' => ['nullable', 'integer'],
        ]);
        $item = CoreValue::create($data);
        return response()->json(['success' => true, 'message' => 'Core value created.', 'core_value' => $item], 201);
    }

    public function updateCoreValue(Request $request, int $id): JsonResponse
    {
        $item = CoreValue::findOrFail($id);
        $data = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'icon' => ['nullable', 'string'],
            'sort_order' => ['nullable', 'integer'],
        ]);
        $item->update($data);
        return response()->json(['success' => true, 'message' => 'Core value updated.', 'core_value' => $item]);
    }

    public function deleteCoreValue(int $id): JsonResponse
    {
        CoreValue::findOrFail($id)->delete();
        return response()->json(['success' => true, 'message' => 'Core value deleted.']);
    }

    // ==========================================
    // COMPARISONS
    // ==========================================
    public function getComparisons(): JsonResponse
    {
        return response()->json(['success' => true, 'comparisons' => Comparison::orderBy('sort_order')->get()]);
    }

    public function storeComparison(Request $request): JsonResponse
    {
        $data = $request->validate([
            'feature' => ['required', 'string', 'max:255'],
            'us_value' => ['required', 'string', 'max:255'],
            'them_value' => ['required', 'string', 'max:255'],
            'sort_order' => ['nullable', 'integer'],
        ]);
        $item = Comparison::create($data);
        return response()->json(['success' => true, 'message' => 'Comparison created.', 'comparison' => $item], 201);
    }

    public function updateComparison(Request $request, int $id): JsonResponse
    {
        $item = Comparison::findOrFail($id);
        $data = $request->validate([
            'feature' => ['required', 'string', 'max:255'],
            'us_value' => ['required', 'string', 'max:255'],
            'them_value' => ['required', 'string', 'max:255'],
            'sort_order' => ['nullable', 'integer'],
        ]);
        $item->update($data);
        return response()->json(['success' => true, 'message' => 'Comparison updated.', 'comparison' => $item]);
    }

    public function deleteComparison(int $id): JsonResponse
    {
        Comparison::findOrFail($id)->delete();
        return response()->json(['success' => true, 'message' => 'Comparison deleted.']);
    }

    // ==========================================
    // MESSAGES
    // ==========================================
    public function getMessages(): JsonResponse
    {
        return response()->json([
            'success' => true,
            'messages' => ContactMessage::latest()->get(),
        ]);
    }

    public function markMessageRead(int $id): JsonResponse
    {
        $message = ContactMessage::findOrFail($id);
        $message->update(['is_read' => true]);
        return response()->json(['success' => true, 'message' => 'Marked as read.', 'contact_message' => $message]);
    }

    public function deleteMessage(int $id): JsonResponse
    {
        ContactMessage::findOrFail($id)->delete();
        return response()->json(['success' => true, 'message' => 'Message deleted.']);
    }
}
