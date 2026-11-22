<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\TeamMember;
use Illuminate\Http\Request;

class TeamMemberController extends Controller
{
    use ParsesJsonFields;

    public function index()
    {
        return view('admin.team-members.index', ['items' => TeamMember::orderBy('category')->orderBy('sort_order')->get()]);
    }

    public function create()
    {
        return view('admin.team-members.create');
    }

    public function store(Request $request)
    {
        TeamMember::create($this->validated($request));

        return redirect()->route('admin.team-members.index')->with('status', 'Team member created.');
    }

    public function edit(TeamMember $teamMember)
    {
        return view('admin.team-members.edit', ['item' => $teamMember]);
    }

    public function update(Request $request, TeamMember $teamMember)
    {
        $teamMember->update($this->validated($request));

        return redirect()->route('admin.team-members.index')->with('status', 'Team member updated.');
    }

    public function destroy(TeamMember $teamMember)
    {
        $teamMember->delete();

        return redirect()->route('admin.team-members.index')->with('status', 'Team member deleted.');
    }

    public function toListText($value): string
    {
        return implode("\n", $value ?? []);
    }

    private function validated(Request $request): array
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'role' => ['required', 'string', 'max:255'],
            'category' => ['required', 'in:advisor,core'],
            'bio' => ['nullable', 'string'],
            'tags' => ['nullable', 'string'],
            'links' => ['nullable', 'string'],
            'photo' => ['nullable', 'string', 'max:255'],
            'sort_order' => ['nullable', 'integer'],
        ]);

        $validated['tags'] = $this->listToArray($validated['tags'] ?? null);
        $validated['links'] = $this->listToArray($validated['links'] ?? null);

        return $validated;
    }
}