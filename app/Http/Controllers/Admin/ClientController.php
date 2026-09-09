<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Client;
use Illuminate\Http\Request;

class ClientController extends Controller
{
    public function index()
    {
        return view('admin.clients.index', ['items' => Client::orderBy('group')->orderBy('sort_order')->get()]);
    }

    public function create()
    {
        return view('admin.clients.create');
    }

    public function store(Request $request)
    {
        Client::create($this->validated($request));

        return redirect()->route('admin.clients.index')->with('status', 'Client created.');
    }

    public function edit(Client $client)
    {
        return view('admin.clients.edit', ['item' => $client]);
    }

    public function update(Request $request, Client $client)
    {
        $client->update($this->validated($request));

        return redirect()->route('admin.clients.index')->with('status', 'Client updated.');
    }

    public function destroy(Client $client)
    {
        $client->delete();

        return redirect()->route('admin.clients.index')->with('status', 'Client deleted.');
    }

    private function validated(Request $request): array
    {
        return $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'logo' => ['nullable', 'string', 'max:255'],
            'accent' => ['nullable', 'string', 'max:32'],
            'group' => ['required', 'in:clients,pilots'],
            'sort_order' => ['nullable', 'integer'],
        ]);
    }
}