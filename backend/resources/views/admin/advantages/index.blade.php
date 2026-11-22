@extends('layouts.admin')

@section('title', 'Advantages')

@section('content')
<div class="a-card">
    <div class="a-card-head">
        <h2>Advantages ({{ $items->count() }})</h2>
        <a href="{{ route('admin.advantages.create') }}" class="a-btn primary">+ New Advantage</a>
    </div>
    <div class="a-table-wrap">
        <table class="a-table">
            <thead>
                <tr>
                    <th>Icon</th>
                    <th>Title</th>
                    <th>Subtitle</th>
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
                        <td><span class="a-pill amber">{{ $item->subtitle }}</span></td>
                        <td class="a-muted">{{ \Illuminate\Support\Str::limit($item->description, 50) }}</td>
                        <td class="a-muted">{{ $item->sort_order }}</td>
                        <td>
                            <div class="a-actions">
                                <a href="{{ route('admin.advantages.edit', $item) }}" class="a-btn sm">Edit</a>
                                <form method="POST" action="{{ route('admin.advantages.destroy', $item) }}" onsubmit="return confirm('Delete this advantage?');">
                                    @csrf @method('DELETE')
                                    <button class="a-btn sm danger">Delete</button>
                                </form>
                            </div>
                        </td>
                    </tr>
                @empty
                    <tr><td colspan="6"><p class="a-empty">No advantages yet.</p></td></tr>
                @endforelse
            </tbody>
        </table>
    </div>
</div>
@endsection