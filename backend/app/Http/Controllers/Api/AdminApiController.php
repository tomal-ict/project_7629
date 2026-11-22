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
        return response()->json([
            'success' => true,
            'counts' => [
                'services' => Service::count(),
                'products' => Product::count(),
                'team_members' => TeamMember::count(),
                'clients' => Client::count(),
                'messages' => ContactMessage::count(),
                'unread_messages' => ContactMessage::where('is_read', false)->count(),
                'industries' => Industry::count(),
                'tech_domains' => TechDomain::count(),
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
            'value' => ['nullable'],
        ]);

        $setting->update($validated);

        return response()->json(['success' => true, 'message' => 'Setting updated successfully.', 'setting' => $setting]);
    }

    public function bulkUpdateSettings(Request $request): JsonResponse
    {
        $settings = $request->input('settings', []);
        foreach ($settings as $key => $val) {
            Setting::set($key, is_array($val) ? json_encode($val) : (string)$val);
        }

        return response()->json([
            'success' => true,
            'message' => 'Settings updated successfully.',
            'settings' => Setting::allAsArray(),
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
            'why_us' => ['nullable', 'string'],
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
            'why_us' => ['nullable', 'string'],
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
            'website' => ['nullable', 'string'],
            'description' => ['nullable', 'string'],
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
            'website' => ['nullable', 'string'],
            'description' => ['nullable', 'string'],
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
            'description' => ['nullable', 'string'],
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
            'description' => ['nullable', 'string'],
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
            'name' => ['required', 'string', 'max:255'],
            'icon' => ['nullable', 'string'],
            'description' => ['nullable', 'string'],
            'features' => ['nullable'],
            'sort_order' => ['nullable', 'integer'],
        ]);
        $item = TechDomain::create($data);
        return response()->json(['success' => true, 'message' => 'Tech Domain created.', 'tech_domain' => $item], 201);
    }

    public function updateTechDomain(Request $request, int $id): JsonResponse
    {
        $item = TechDomain::findOrFail($id);
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'icon' => ['nullable', 'string'],
            'description' => ['nullable', 'string'],
            'features' => ['nullable'],
            'sort_order' => ['nullable', 'integer'],
        ]);
        $item->update($data);
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
            'phase' => ['required', 'string', 'max:255'],
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'activities' => ['nullable'],
            'deliverables' => ['nullable'],
            'sort_order' => ['nullable', 'integer'],
        ]);
        $item = Methodology::create($data);
        return response()->json(['success' => true, 'message' => 'Methodology created.', 'methodology' => $item], 201);
    }

    public function updateMethodology(Request $request, int $id): JsonResponse
    {
        $item = Methodology::findOrFail($id);
        $data = $request->validate([
            'phase' => ['required', 'string', 'max:255'],
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'activities' => ['nullable'],
            'deliverables' => ['nullable'],
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
            'suffix' => ['nullable', 'string'],
            'icon' => ['nullable', 'string'],
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
            'suffix' => ['nullable', 'string'],
            'icon' => ['nullable', 'string'],
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
