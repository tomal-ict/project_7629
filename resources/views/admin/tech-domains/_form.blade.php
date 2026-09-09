<div class="a-card">
    <div class="a-card-head">
        <h2>{{ $item ? 'Edit Tech Domain' : 'New Tech Domain' }}</h2>
        <a href="{{ route('admin.tech-domains.index') }}" class="a-btn">← Back</a>
    </div>
    <div class="a-card-body">
        <form method="POST" class="a-form" action="{{ $item ? route('admin.tech-domains.update', $item) : route('admin.tech-domains.store') }}">
            @csrf
            @if ($item) @method('PATCH') @endif

            <div class="a-form-grid">
                <div class="a-field">
                    <label>Title <span class="req">*</span></label>
                    <input type="text" name="title" value="{{ old('title', $item->title ?? '') }}" required>
                    @error('title') <div class="a-err">{{ $message }}</div> @enderror
                </div>
                <div class="a-field">
                    <label>Icon (emoji)</label>
                    <input type="text" name="icon" value="{{ old('icon', $item->icon ?? '') }}" placeholder="🤖">
                </div>
                <div class="a-field full">
                    <label>Description</label>
                    <textarea name="description">{{ old('description', $item->description ?? '') }}</textarea>
                </div>
                <div class="a-field">
                    <label>Sort Order</label>
                    <input type="number" name="sort_order" value="{{ old('sort_order', $item->sort_order ?? 0) }}">
                </div>
            </div>

            <div>
                <button class="a-btn primary">{{ $item ? 'Update' : 'Create' }} Tech Domain</button>
            </div>
        </form>
    </div>
</div>