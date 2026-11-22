<?php

namespace App\Http\Controllers;

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
use Illuminate\Http\Request;

class SiteController extends Controller
{
    public function home()
    {
        $settings = Setting::allAsArray();

        $data = [
            'settings' => $settings,
            'stats' => Statistic::orderBy('sort_order')->get(),
            'services' => Service::where('featured_on_home', true)->orderBy('sort_order')->get(),
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

        return view('home', $data);
    }

    public function service(Service $service)
    {
        $settings = Setting::allAsArray();

        return view('services.show', [
            'settings' => $settings,
            'service' => $service,
            'moreServices' => Service::where('slug', '!=', $service->slug)->orderBy('sort_order')->inRandomOrder()->take(3)->get(),
        ]);
    }

    public function sendContact(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'phone' => ['nullable', 'string', 'max:32'],
            'company' => ['nullable', 'string', 'max:255'],
            'message' => ['required', 'string', 'max:5000'],
        ]);

        ContactMessage::create($validated);

        return back()->with('status', 'Thank you! Your message has been received. We will get back to you shortly.');
    }
}