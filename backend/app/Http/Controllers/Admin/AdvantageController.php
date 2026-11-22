<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Advantage;
use Illuminate\Http\Request;

class AdvantageController extends Controller
{
    public function index()
    {
        return view('admin.advantages.index', ['items' => Advantage::orderBy('sort_order')->get()]);
    }

    public function create()
    {
        return view('admin.advantages.create');
    }

    public function store(Request $request)
    {
        Advantage::create($this->validated($request));

        return redirect()->route('admin.advantages.index')->with('status', 'Advantage created.');
    }

    public function edit(Advantage $advantage)
    {
        return view('admin.advantages.edit', ['item' => $advantage]);
    }

    public function update(Request $request, Advantage $advantage)
    {
        $advantage->update($this->validated($request));

        return redirect()->route('admin.advantages.index')->with('status', 'Advantage updated.');
    }

    public function destroy(Advantage $advantage)
    {
        $advantage->delete();

        return redirect()->route('admin.advantages.index')->with('status', 'Advantage deleted.');
    }

    private function validated(Request $request): array
    {
        return $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'subtitle' => ['nullable', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'icon' => ['nullable', 'string', 'max:32'],
            'sort_order' => ['nullable', 'integer'],
        ]);
    }
}