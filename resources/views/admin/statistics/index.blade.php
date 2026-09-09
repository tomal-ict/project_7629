@extends('layouts.admin')

@section('title', 'Statistics')

@section('content')
<div class="a-card">
    <div class="a-card-head">
        <h2>Statistics ({{ $items->count() }})</h2>
        <a href="{{ route('admin.statistics.create') }}" class="a-btn primary">+ New Statistic</a>
    </div>
    <div class="a-table-wrap">
        <table class="a-table">
            <thead>
                <tr>
                    <th>Value</th>
                    <th>Label</th>
                    <th>Sub</th>
                    <th>Order</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                @forelse ($items as $item)
                    <tr>
                        <td><span class="a-pill blue">{{ $item->value }}</span></td>
                        <td><strong>{{ $item->label }}</strong></td>
                        <td class="a-muted">{{ $item->sub }}</td>
                        <td class="a-muted">{{ $item->sort_order }}</td>
                        <td>
                            <div class="a-actions">
                                <a href="{{ route('admin.statistics.edit', $item) }}" class="a-btn sm">Edit</a>
                                <form method="POST" action="{{ route('admin.statistics.destroy', $item) }}" onsubmit="return confirm('Delete this statistic?');">
                                    @csrf @method('DELETE')
                                    <button class="a-btn sm danger">Delete</button>
                                </form>
                            </div>
                        </td>
                    </tr>
                @empty
                    <tr><td colspan="5"><p class="a-empty">No statistics yet.</p></td></tr>
                @endforelse
            </tbody>
        </table>
    </div>
</div>
@endsection