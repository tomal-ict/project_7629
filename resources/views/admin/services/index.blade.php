@extends('layouts.admin')

@section('title', 'Services')

@section('content')
<div class="a-card">
    <div class="a-card-head">
        <h2>Services ({{ $items->count() }})</h2>
        <a href="{{ route('admin.services.create') }}" class="a-btn primary">+ New Service</a>
    </div>
    <div class="a-table-wrap">
        <table class="a-table">
            <thead>
                <tr>
                    <th>Icon</th>
                    <th>Title</th>
                    <th>Subtitle</th>
                    <th>Featured</th>
                    <th>Order</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                @forelse ($items as $item)
                    <tr>
                        <td style="font-size:20px;">{{ $item->icon }}</td>
                        <td><strong>{{ $item->title }}</strong><div class="a-muted" style="font-size:11.5px;">/services/{{ $item->slug }}</div></td>
                        <td class="a-muted">{{ $item->subtitle }}</td>
                        <td>
                            @if ($item->featured_on_home)
                                <span class="a-pill green">On Home</span>
                            @else
                                <span class="a-pill slate">Hidden</span>
                            @endif
                        </td>
                        <td class="a-muted">{{ $item->sort_order }}</td>
                        <td>
                            <div class="a-actions">
                                <a href="{{ route('services.show', $item) }}" target="_blank" class="a-btn sm">View</a>
                                <a href="{{ route('admin.services.edit', $item) }}" class="a-btn sm">Edit</a>
                                <form method="POST" action="{{ route('admin.services.destroy', $item) }}" onsubmit="return confirm('Delete this service?');">
                                    @csrf @method('DELETE')
                                    <button class="a-btn sm danger">Delete</button>
                                </form>
                            </div>
                        </td>
                    </tr>
                @empty
                    <tr><td colspan="6"><p class="a-empty">No services yet.</p></td></tr>
                @endforelse
            </tbody>
        </table>
    </div>
</div>
@endsection