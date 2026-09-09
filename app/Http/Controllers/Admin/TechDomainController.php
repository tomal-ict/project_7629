<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\TechDomain;
use Illuminate\Http\Request;

class TechDomainController extends Controller
{
    public function index()
    {
        return view('admin.tech-domains.index', ['items' => TechDomain::orderBy('sort_order')->get()]);
    }

    public function create()
    {
        return view('admin.tech-domains.create');
    }

    public function store(Request $request)
    {
        TechDomain::create($this->validated($request));

        return redirect()->route('admin.tech-domains.index')->with('status', 'Tech domain created.');
    }

    public function edit(TechDomain $techDomain)
    {
        return view('admin.tech-domains.edit', ['item' => $techDomain]);
    }

    public function update(Request $request, TechDomain $techDomain)
    {
        $techDomain->update($this->validated($request));

        return redirect()->route('admin.tech-domains.index')->with('status', 'Tech domain updated.');
    }

    public function destroy(TechDomain $techDomain)
    {
        $techDomain->delete();

        return redirect()->route('admin.tech-domains.index')->with('status', 'Tech domain deleted.');
    }

    private function validated(Request $request): array
    {
        return $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'icon' => ['nullable', 'string', 'max:32'],
            'sort_order' => ['nullable', 'integer'],
        ]);
    }
}