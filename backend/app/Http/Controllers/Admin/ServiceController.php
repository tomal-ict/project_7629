<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    use ParsesJsonFields;

    public function index()
    {
        return view('admin.services.index', ['items' => Service::orderBy('sort_order')->get()]);
    }

    public function create()
    {
        return view('admin.services.create');
    }

    public function store(Request $request)
    {
        Service::create($this->validated($request));

        return redirect()->route('admin.services.index')->with('status', 'Service created.');
    }

    public function edit(Service $service)
    {
        return view('admin.services.edit', ['item' => $service]);
    }

    public function update(Request $request, Service $service)
    {
        $service->update($this->validated($request));

        return redirect()->route('admin.services.index')->with('status', 'Service updated.');
    }

    public function destroy(Service $service)
    {
        $service->delete();

        return redirect()->route('admin.services.index')->with('status', 'Service deleted.');
    }

    public function toListText($value): string
    {
        return implode("\n", $value ?? []);
    }

    public function toKeyValueText($value): string
    {
        if (! $value) {
            return '';
        }

        return collect($value)->map(fn ($row) => ($row['title'] ?? $row['key'] ?? '').' | '.($row['desc'] ?? $row['value'] ?? ''))->implode("\n");
    }

    private function validated(Request $request): array
    {
        $validated = $request->validate([
            'slug' => ['required', 'string', 'max:255'],
            'title' => ['required', 'string', 'max:255'],
            'subtitle' => ['nullable', 'string', 'max:255'],
            'icon' => ['nullable', 'string', 'max:32'],
            'color' => ['nullable', 'string', 'max:32'],
            'color_light' => ['nullable', 'string', 'max:32'],
            'description' => ['required', 'string'],
            'intro' => ['nullable', 'string'],
            'features' => ['nullable', 'string'],
            'benefits' => ['nullable', 'string'],
            'usecases' => ['nullable', 'string'],
            'gallery_images' => ['nullable', 'string'],
            'stats' => ['nullable', 'string'],
            'steps' => ['nullable', 'string'],
            'why_us' => ['nullable', 'string'],
            'featured_on_home' => ['nullable', 'boolean'],
            'sort_order' => ['nullable', 'integer'],
        ], ['slug.unique' => 'The slug is already in use.']);

        $validated['features'] = $this->listToArray($validated['features'] ?? null);
        $validated['benefits'] = $this->listToArray($validated['benefits'] ?? null);
        $validated['usecases'] = $this->listToArray($validated['usecases'] ?? null);
        $validated['gallery_images'] = $this->listToArray($validated['gallery_images'] ?? null);
        $validated['stats'] = array_map(fn ($row) => ['value' => $row['key'], 'label' => $row['value']], $this->keyValueToArray($validated['stats'] ?? null));
        $validated['steps'] = array_map(fn ($row) => ['title' => $row['key'], 'desc' => $row['value']], $this->keyValueToArray($validated['steps'] ?? null));
        $validated['featured_on_home'] = $request->boolean('featured_on_home');

        return $validated;
    }
}