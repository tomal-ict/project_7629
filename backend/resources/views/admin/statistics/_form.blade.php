<div class="a-card">
    <div class="a-card-head">
        <h2>{{ $item ? 'Edit Statistic' : 'New Statistic' }}</h2>
        <a href="{{ route('admin.statistics.index') }}" class="a-btn">← Back</a>
    </div>
    <div class="a-card-body">
        <form method="POST" class="a-form" action="{{ $item ? route('admin.statistics.update', $item) : route('admin.statistics.store') }}">
            @csrf
            @if ($item) @method('PATCH') @endif

            <div class="a-form-grid">
                <div class="a-field">
                    <label>Value <span class="req">*</span> <span class="a-hint">e.g. 15+, 100%, 0</span></label>
                    <input type="text" name="value" value="{{ old('value', $item->value ?? '') }}" required>
                    @error('value') <div class="a-err">{{ $message }}</div> @enderror
                </div>
                <div class="a-field">
                    <label>Label <span class="req">*</span></label>
                    <input type="text" name="label" value="{{ old('label', $item->label ?? '') }}" required>
                    @error('label') <div class="a-err">{{ $message }}</div> @enderror
                </div>
                <div class="a-field">
                    <label>Sub</label>
                    <input type="text" name="sub" value="{{ old('sub', $item->sub ?? '') }}" placeholder="e.g. Zero third-party access">
                </div>
                <div class="a-field">
                    <label>Sort Order</label>
                    <input type="number" name="sort_order" value="{{ old('sort_order', $item->sort_order ?? 0) }}">
                </div>
            </div>

            <div>
                <button class="a-btn primary">{{ $item ? 'Update' : 'Create' }} Statistic</button>
            </div>
        </form>
    </div>
</div>