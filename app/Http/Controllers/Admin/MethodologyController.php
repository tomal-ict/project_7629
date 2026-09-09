<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Methodology;
use Illuminate\Http\Request;

class MethodologyController extends Controller
{
    public function index()
    {
        return view('admin.methodologies.index', ['items' => Methodology::orderBy('sort_order')->get()]);
    }

    public function create()
    {
        return view('admin.methodologies.create');
    }

    public function store(Request $request)
    {
        Methodology::create($this->validated($request));

        return redirect()->route('admin.methodologies.index')->with('status', 'Methodology created.');
    }

    public function edit(Methodology $methodology)
    {
        return view('admin.methodologies.edit', ['item' => $methodology]);
    }

    public function update(Request $request, Methodology $methodology)
    {
        $methodology->update($this->validated($request));

        return redirect()->route('admin.methodologies.index')->with('status', 'Methodology updated.');
    }

    public function destroy(Methodology $methodology)
    {
        $methodology->delete();

        return redirect()->route('admin.methodologies.index')->with('status', 'Methodology deleted.');
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