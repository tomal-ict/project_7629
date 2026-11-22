@extends('layouts.admin')

@section('title', 'Team Members')

@section('content')
<div class="a-card">
    <div class="a-card-head">
        <h2>Team Members ({{ $items->count() }})</h2>
        <a href="{{ route('admin.team-members.create') }}" class="a-btn primary">+ New Member</a>
    </div>
    <div class="a-table-wrap">
        <table class="a-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Role</th>
                    <th>Category</th>
                    <th>Order</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                @forelse ($items as $item)
                    <tr>
                        <td><strong>{{ $item->name }}</strong></td>
                        <td class="a-muted">{{ $item->role }}</td>
                        <td>
                            @if ($item->category === 'advisor')
                                <span class="a-pill amber">Advisor</span>
                            @else
                                <span class="a-pill blue">Core</span>
                            @endif
                        </td>
                        <td class="a-muted">{{ $item->sort_order }}</td>
                        <td>
                            <div class="a-actions">
                                <a href="{{ route('admin.team-members.edit', $item) }}" class="a-btn sm">Edit</a>
                                <form method="POST" action="{{ route('admin.team-members.destroy', $item) }}" onsubmit="return confirm('Delete this member?');">
                                    @csrf @method('DELETE')
                                    <button class="a-btn sm danger">Delete</button>
                                </form>
                            </div>
                        </td>
                    </tr>
                @empty
                    <tr><td colspan="5"><p class="a-empty">No team members yet.</p></td></tr>
                @endforelse
            </tbody>
        </table>
    </div>
</div>
@endsection