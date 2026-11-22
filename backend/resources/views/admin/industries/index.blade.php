@extends('layouts.admin')

@section('title', 'Industries')

@section('content')
<div class="a-card">
    <div class="a-card-head">
        <h2>Industries ({{ $items->count() }})</h2>
        <a href="{{ route('admin.industries.create') }}" class="a-btn primary">+ New Industry</a>
    </div>
    <div class="a-table-wrap">
        <table class="a-table">
            <thead>
                <tr>
                    <th>Icon</th>
                    <th>Name</th>
                    <th>Order</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                @forelse ($items as $item)
                    <tr>
                        <td style="font-size:20px;">{{ $item->icon }}</td>
                        <td><strong>{{ $item->name }}</strong></td>
                        <td class="a-muted">{{ $item->sort_order }}</td>
                        <td>
                            <div class="a-actions">
                                <a href="{{ route('admin.industries.edit', $item) }}" class="a-btn sm">Edit</a>
                                <form method="POST" action="{{ route('admin.industries.destroy', $item) }}" onsubmit="return confirm('Delete this industry?');">
                                    @csrf @method('DELETE')
                                    <button class="a-btn sm danger">Delete</button>
                                </form>
                            </div>
                        </td>
                    </tr>
                @empty
                    <tr><td colspan="4"><p class="a-empty">No industries yet.</p></td></tr>
                @endforelse
            </tbody>
        </table>
    </div>
</div>
@endsection