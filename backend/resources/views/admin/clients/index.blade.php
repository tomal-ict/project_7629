@extends('layouts.admin')

@section('title', 'Clients & Pilots')

@section('content')
<div class="a-card">
    <div class="a-card-head">
        <h2>Clients & Pilots ({{ $items->count() }})</h2>
        <a href="{{ route('admin.clients.create') }}" class="a-btn primary">+ New Client</a>
    </div>
    <div class="a-table-wrap">
        <table class="a-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Group</th>
                    <th>Accent</th>
                    <th>Order</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                @forelse ($items as $item)
                    <tr>
                        <td><strong>{{ $item->name }}</strong></td>
                        <td><span class="a-pill {{ $item->group === 'pilots' ? 'green' : 'blue' }}">{{ ucfirst($item->group) }}</span></td>
                        <td><span style="display:inline-block;width:14px;height:14px;border-radius:4px;background:{{ $item->accent ?? '#ccc' }};vertical-align:middle;"></span> {{ $item->accent }}</td>
                        <td class="a-muted">{{ $item->sort_order }}</td>
                        <td>
                            <div class="a-actions">
                                <a href="{{ route('admin.clients.edit', $item) }}" class="a-btn sm">Edit</a>
                                <form method="POST" action="{{ route('admin.clients.destroy', $item) }}" onsubmit="return confirm('Delete this client?');">
                                    @csrf @method('DELETE')
                                    <button class="a-btn sm danger">Delete</button>
                                </form>
                            </div>
                        </td>
                    </tr>
                @empty
                    <tr><td colspan="5"><p class="a-empty">No clients yet.</p></td></tr>
                @endforelse
            </tbody>
        </table>
    </div>
</div>
@endsection