@extends('layouts.admin')

@section('title', 'Methodology')

@section('content')
<div class="a-card">
    <div class="a-card-head">
        <h2>Methodology Steps ({{ $items->count() }})</h2>
        <a href="{{ route('admin.methodologies.create') }}" class="a-btn primary">+ New Step</a>
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
                        <td class="a-muted">{{ \Illuminate\Support\Str::limit($item->description, 50) }}</td>
                        <td class="a-muted">{{ $item->sort_order }}</td>
                        <td>
                            <div class="a-actions">
                                <a href="{{ route('admin.methodologies.edit', $item) }}" class="a-btn sm">Edit</a>
                                <form method="POST" action="{{ route('admin.methodologies.destroy', $item) }}" onsubmit="return confirm('Delete this step?');">
                                    @csrf @method('DELETE')
                                    <button class="a-btn sm danger">Delete</button>
                                </form>
                            </div>
                        </td>
                    </tr>
                @empty
                    <tr><td colspan="5"><p class="a-empty">No steps yet.</p></td></tr>
                @endforelse
            </tbody>
        </table>
    </div>
</div>
@endsection