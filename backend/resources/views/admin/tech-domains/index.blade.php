@extends('layouts.admin')

@section('title', 'Tech Domains')

@section('content')
<div class="a-card">
    <div class="a-card-head">
        <h2>Tech Domains ({{ $items->count() }})</h2>
        <a href="{{ route('admin.tech-domains.create') }}" class="a-btn primary">+ New Domain</a>
    </div>
    <div class="a-table-wrap">
        <table class="a-table">
            <thead>
                <tr>
                    <th>Icon</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Order</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                @forelse ($items as $item)
                    <tr>
                        <td style="font-size:20px;">{{ $item->icon }}</td>
                        <td><strong>{{ $item->title }}</strong></td>
                        <td class="a-muted">{{ \Illuminate\Support\Str::limit($item->description, 60) }}</td>
                        <td class="a-muted">{{ $item->sort_order }}</td>
                        <td>
                            <div class="a-actions">
                                <a href="{{ route('admin.tech-domains.edit', $item) }}" class="a-btn sm">Edit</a>
                                <form method="POST" action="{{ route('admin.tech-domains.destroy', $item) }}" onsubmit="return confirm('Delete this tech domain?');">
                                    @csrf @method('DELETE')
                                    <button class="a-btn sm danger">Delete</button>
                                </form>
                            </div>
                        </td>
                    </tr>
                @empty
                    <tr><td colspan="5"><p class="a-empty">No tech domains yet.</p></td></tr>
                @endforelse
            </tbody>
        </table>
    </div>
</div>
@endsection