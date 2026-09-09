@extends('layouts.admin')

@section('title', 'Products')

@section('content')
<div class="a-card">
    <div class="a-card-head">
        <h2>Products ({{ $items->count() }})</h2>
        <a href="{{ route('admin.products.create') }}" class="a-btn primary">+ New Product</a>
    </div>
    <div class="a-table-wrap">
        <table class="a-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Tag</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th>Order</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                @forelse ($items as $item)
                    <tr>
                        <td><strong>{{ $item->name }}</strong></td>
                        <td class="a-muted">{{ $item->tag }}</td>
                        <td>
                            @if ($item->is_flagship)
                                <span class="a-pill blue">Flagship</span>
                            @else
                                <span class="a-pill slate">More</span>
                            @endif
                        </td>
                        <td>
                            @if ($item->is_active)
                                <span class="a-pill green">Active</span>
                            @else
                                <span class="a-pill red">Hidden</span>
                            @endif
                        </td>
                        <td class="a-muted">{{ $item->sort_order }}</td>
                        <td>
                            <div class="a-actions">
                                <a href="{{ route('admin.products.edit', $item) }}" class="a-btn sm">Edit</a>
                                <form method="POST" action="{{ route('admin.products.destroy', $item) }}" onsubmit="return confirm('Delete this product?');">
                                    @csrf @method('DELETE')
                                    <button class="a-btn sm danger">Delete</button>
                                </form>
                            </div>
                        </td>
                    </tr>
                @empty
                    <tr><td colspan="6"><p class="a-empty">No products yet.</p></td></tr>
                @endforelse
            </tbody>
        </table>
    </div>
</div>
@endsection