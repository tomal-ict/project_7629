<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Statistic;
use Illuminate\Http\Request;

class StatisticController extends Controller
{
    public function index()
    {
        return view('admin.statistics.index', ['items' => Statistic::orderBy('sort_order')->get()]);
    }

    public function create()
    {
        return view('admin.statistics.create');
    }

    public function store(Request $request)
    {
        Statistic::create($this->validated($request));

        return redirect()->route('admin.statistics.index')->with('status', 'Statistic created.');
    }

    public function edit(Statistic $statistic)
    {
        return view('admin.statistics.edit', ['item' => $statistic]);
    }

    public function update(Request $request, Statistic $statistic)
    {
        $statistic->update($this->validated($request));

        return redirect()->route('admin.statistics.index')->with('status', 'Statistic updated.');
    }

    public function destroy(Statistic $statistic)
    {
        $statistic->delete();

        return redirect()->route('admin.statistics.index')->with('status', 'Statistic deleted.');
    }

    private function validated(Request $request): array
    {
        return $request->validate([
            'label' => ['required', 'string', 'max:255'],
            'value' => ['required', 'string', 'max:255'],
            'sub' => ['nullable', 'string', 'max:255'],
            'sort_order' => ['nullable', 'integer'],
        ]);
    }
}