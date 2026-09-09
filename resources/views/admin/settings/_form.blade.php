<div class="a-card">
    <div class="a-card-head">
        <h2>{{ $item ? 'Edit Setting' : 'New Setting' }}</h2>
        <a href="{{ route('admin.settings.index') }}" class="a-btn">← Back</a>
    </div>
    <div class="a-card-body">
        <form method="POST" class="a-form" action="{{ $item ? route('admin.settings.update', $item) : route('admin.settings.store') }}">
            @csrf
            @if ($item) @method('PATCH') @endif

            <div class="a-form-grid">
                @if ($item)
                    <div class="a-field">
                        <label>Key</label>
                        <input type="text" value="{{ $item->key }}" disabled>
                    </div>
                    <div class="a-field">
                        <label>Group</label>
                        <input type="text" value="{{ $item->group }}" disabled>
                    </div>
                @else
                    <div class="a-field">
                        <label>Key <span class="req">*</span></label>
                        <input type="text" name="key" value="{{ old('key') }}" placeholder="hero_badge" required>
                        @error('key') <div class="a-err">{{ $message }}</div> @enderror
                    </div>
                    <div class="a-field">
                        <label>Group <span class="req">*</span></label>
                        <input type="text" name="group" value="{{ old('group', 'general') }}" placeholder="general" required>
                        @error('group') <div class="a-err">{{ $message }}</div> @enderror
                    </div>
                @endif
                <div class="a-field full">
                    <label>Value</label>
                    <textarea name="value">{{ old('value', $item->value ?? '') }}</textarea>
                    <div class="a-hint">Plain text, or JSON if the setting stores structured data.</div>
                </div>
            </div>

            <div>
                <button class="a-btn primary">{{ $item ? 'Update' : 'Create' }} Setting</button>
            </div>
        </form>
    </div>
</div>