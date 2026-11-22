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

class SiteApiController extends Controller
{
    /**
     * Get all aggregated site data for the homepage in a single encrypted API payload.
     */
    public function homeData(): JsonResponse
    {
        $settings = Setting::allAsArray();

        $data = [
            'success' => true,
            'settings' => $settings,
            'stats' => Statistic::orderBy('sort_order')->get(),
            'services' => Service::where('featured_on_home', true)->orderBy('sort_order')->get(),
            'allServices' => Service::orderBy('sort_order')->get(),
            'products' => Product::where('is_active', true)->where('is_flagship', true)->orderBy('sort_order')->get(),
            'moreProducts' => Product::where('is_active', true)->where('is_flagship', false)->orderBy('sort_order')->get(),
            'advisors' => TeamMember::where('category', 'advisor')->orderBy('sort_order')->get(),
            'coreTeam' => TeamMember::where('category', 'core')->orderBy('sort_order')->get(),
            'clients' => Client::where('group', 'clients')->orderBy('sort_order')->get(),
            'pilots' => Client::where('group', 'pilots')->orderBy('sort_order')->get(),
            'industries' => Industry::orderBy('sort_order')->get(),
            'techDomains' => TechDomain::orderBy('sort_order')->get(),
            'coreValues' => CoreValue::orderBy('sort_order')->get(),
            'advantages' => Advantage::orderBy('sort_order')->get(),
            'methodologies' => Methodology::orderBy('sort_order')->get(),
            'comparisons' => Comparison::orderBy('sort_order')->get(),
            'founderQuotes' => json_decode($settings['founder_quotes'] ?? '[]', true),
        ];

        return response()->json($data);
    }

    /**
     * Get single service detail by slug.
     */
    public function serviceDetail(string $slug): JsonResponse
    {
        $service = Service::where('slug', $slug)->first();

        if (!$service) {
            return response()->json([
                'success' => false,
                'message' => 'Service not found.',
            ], 404);
        }

        $moreServices = Service::where('slug', '!=', $service->slug)
            ->orderBy('sort_order')
            ->inRandomOrder()
            ->take(3)
            ->get();

        return response()->json([
            'success' => true,
            'service' => $service,
            'moreServices' => $moreServices,
            'settings' => Setting::allAsArray(),
        ]);
    }

    /**
     * Store new contact message.
     */
    public function sendContact(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name'    => ['required', 'string', 'max:255'],
            'email'   => ['required', 'email', 'max:255'],
            'phone'   => ['nullable', 'string', 'max:32'],
            'company' => ['nullable', 'string', 'max:255'],
            'message' => ['required', 'string', 'max:5000'],
        ]);

        $message = ContactMessage::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Thank you! Your message has been received. We will get back to you shortly.',
            'id' => $message->id,
        ], 201);
    }
}
