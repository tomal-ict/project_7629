<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Industry;
use Illuminate\Http\Request;

class IndustryController extends Controller
{
    public function index()
    {
        return view('admin.industries.index', ['items' => Industry::orderBy('sort_order')->get()]);
    }

    public function create()
    {
        return view('admin.industries.create');
    }

    public function store(Request $request)
    {
        Industry::create($this->validated($request));

        return redirect()->route('admin.industries.index')->with('status', 'Industry created.');
    }

    public function edit(Industry $industry)
    {
        return view('admin.industries.edit', ['item' => $industry]);
    }

    public function update(Request $request, Industry $industry)
    {
        $industry->update($this->validated($request));

        return redirect()->route('admin.industries.index')->with('status', 'Industry updated.');
    }

    public function destroy(Industry $industry)
    {
        $industry->delete();

        return redirect()->route('admin.industries.index')->with('status', 'Industry deleted.');
    }

    private function validated(Request $request): array
    {
        return $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'icon' => ['nullable', 'string', 'max:32'],
            'sort_order' => ['nullable', 'integer'],
        ]);
    }
}