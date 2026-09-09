@php
    $featuresText = $item ? implode("\n", $item->features ?? []) : '';
    $demoJson = $item && $item->demo ? json_encode($item->demo, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT) : '';
@endphp

<div class="a-card">
    <div class="a-card-head">
        <h2>{{ $item ? 'Edit Product' : 'New Product' }}</h2>
        <a href="{{ route('admin.products.index') }}" class="a-btn">← Back</a>
    </div>
    <div class="a-card-body">
        <form method="POST" class="a-form" action="{{ $item ? route('admin.products.update', $item) : route('admin.products.store') }}">
            @csrf
            @if ($item) @method('PATCH') @endif

            <div class="a-form-grid">
                <div class="a-field">
                    <label>Name <span class="req">*</span></label>
                    <input type="text" name="name" value="{{ old('name', $item->name ?? '') }}" required>
                    @error('name') <div class="a-err">{{ $message }}</div> @enderror
                </div>
                <div class="a-field">
                    <label>Tag</label>
                    <input type="text" name="tag" value="{{ old('tag', $item->tag ?? '') }}" placeholder="Analytics">
                </div>
                <div class="a-field">
                    <label>Metric</label>
                    <input type="text" name="metric" value="{{ old('metric', $item->metric ?? '') }}" placeholder="< 1 sec Query Response">
                </div>
                <div class="a-field">
                    <label>Logo filename</label>
                    <input type="text" name="logo" value="{{ old('logo', $item->logo ?? '') }}" placeholder="pulse-logo.png">
                </div>
                <div class="a-field">
                    <label>Flagship</label>
                    <input type="hidden" name="is_flagship" value="0">
                    <label class="a-radio">
                        <input type="checkbox" name="is_flagship" value="1" @checked(old('is_flagship', $item->is_flagship ?? true))>
                        Flagship product (homepage slider)
                    </label>
                </div>
                <div class="a-field">
                    <label>Active</label>
                    <input type="hidden" name="is_active" value="0">
                    <label class="a-radio">
                        <input type="checkbox" name="is_active" value="1" @checked(old('is_active', $item->is_active ?? true))>
                        Visible on website
                    </label>
                </div>
                <div class="a-field">
                    <label>Sort Order</label>
                    <input type="number" name="sort_order" value="{{ old('sort_order', $item->sort_order ?? 0) }}">
                </div>
                <div class="a-field full">
                    <label>Description <span class="req">*</span></label>
                    <textarea name="description" required>{{ old('description', $item->description ?? '') }}</textarea>
                </div>
                <div class="a-field">
                    <label>Features <span class="a-hint">One per line</span></label>
                    <textarea name="features" style="min-height:140px;">{{ old('features', $featuresText) }}</textarea>
                </div>
                <div class="a-field">
                    <label>Demo data (JSON) <span class="a-hint">Advanced. See existing products. Leave blank to clear.</span></label>
                    <textarea name="demo" style="min-height:140px; font-family: ui-monospace, monospace; font-size:12px;">{{ old('demo', $demoJson) }}</textarea>
                </div>
            </div>

            <div>
                <button class="a-btn primary">{{ $item ? 'Update' : 'Create' }} Product</button>
            </div>
        </form>
    </div>
</div>