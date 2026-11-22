<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;

class SettingController extends Controller
{
    public function index()
    {
        $settings = Setting::orderBy('group')->orderBy('key')->get();

        return view('admin.settings.index', ['settings' => $settings->groupBy('group')]);
    }

    public function edit(Setting $setting)
    {
        return view('admin.settings.edit', ['item' => $setting]);
    }

    public function update(Request $request, Setting $setting)
    {
        $validated = $request->validate([
            'value' => ['nullable', 'string', 'max:5000'],
        ]);

        $setting->update($validated);

        return redirect()->route('admin.settings.index')->with('status', 'Setting updated.');
    }

    public function create()
    {
        return view('admin.settings.create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'key' => ['required', 'string', 'max:255', 'unique:settings,key'],
            'value' => ['nullable', 'string', 'max:5000'],
            'group' => ['required', 'string', 'max:255'],
        ]);

        Setting::create($validated);

        return redirect()->route('admin.settings.index')->with('status', 'Setting created.');
    }

    public function destroy(Setting $setting)
    {
        $setting->delete();

        return redirect()->route('admin.settings.index')->with('status', 'Setting deleted.');
    }
}