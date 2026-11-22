<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    use ParsesJsonFields;

    public function index()
    {
        return view('admin.products.index', ['items' => Product::orderBy('is_flagship', 'desc')->orderBy('sort_order')->get()]);
    }

    public function create()
    {
        return view('admin.products.create');
    }

    public function store(Request $request)
    {
        Product::create($this->validated($request));

        return redirect()->route('admin.products.index')->with('status', 'Product created.');
    }

    public function edit(Product $product)
    {
        return view('admin.products.edit', ['item' => $product]);
    }

    public function update(Request $request, Product $product)
    {
        $product->update($this->validated($request));

        return redirect()->route('admin.products.index')->with('status', 'Product updated.');
    }

    public function destroy(Product $product)
    {
        $product->delete();

        return redirect()->route('admin.products.index')->with('status', 'Product deleted.');
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
            'name' => ['required', 'string', 'max:255'],
            'tag' => ['nullable', 'string', 'max:255'],
            'metric' => ['nullable', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'features' => ['nullable', 'string'],
            'logo' => ['nullable', 'string', 'max:255'],
            'demo' => ['nullable', 'string'],
            'is_flagship' => ['nullable', 'boolean'],
            'is_active' => ['nullable', 'boolean'],
            'sort_order' => ['nullable', 'integer'],
        ]);

        $validated['features'] = $this->listToArray($validated['features'] ?? null);

        $rawDemo = trim((string) ($validated['demo'] ?? ''));
        if (str_starts_with($rawDemo, '{') || str_starts_with($rawDemo, '[')) {
            $decoded = json_decode($rawDemo, true);
            $validated['demo'] = is_array($decoded) ? $decoded : [];
        } else {
            $validated['demo'] = $this->keyValueToArray($validated['demo'] ?? null);
        }

        $validated['is_flagship'] = $request->boolean('is_flagship');
        $validated['is_active'] = $request->boolean('is_active');

        return $validated;
    }
}