@php
    $tagsText = $item ? implode("\n", $item->tags ?? []) : '';
    $linksText = $item ? implode("\n", $item->links ?? []) : '';
@endphp

<div class="a-card">
    <div class="a-card-head">
        <h2>{{ $item ? 'Edit Team Member' : 'New Team Member' }}</h2>
        <a href="{{ route('admin.team-members.index') }}" class="a-btn">← Back</a>
    </div>
    <div class="a-card-body">
        <form method="POST" class="a-form" action="{{ $item ? route('admin.team-members.update', $item) : route('admin.team-members.store') }}">
            @csrf
            @if ($item) @method('PATCH') @endif

            <div class="a-form-grid">
                <div class="a-field">
                    <label>Name <span class="req">*</span></label>
                    <input type="text" name="name" value="{{ old('name', $item->name ?? '') }}" required>
                    @error('name') <div class="a-err">{{ $message }}</div> @enderror
                </div>
                <div class="a-field">
                    <label>Role <span class="req">*</span></label>
                    <input type="text" name="role" value="{{ old('role', $item->role ?? '') }}" placeholder="Managing Director" required>
                    @error('role') <div class="a-err">{{ $message }}</div> @enderror
                </div>
                <div class="a-field">
                    <label>Category <span class="req">*</span></label>
                    <select name="category" required>
                        <option value="advisor" @selected(old('category', $item->category ?? '') === 'advisor')>Advisor</option>
                        <option value="core" @selected(old('category', $item->category ?? '') === 'core')>Core Team</option>
                    </select>
                    @error('category') <div class="a-err">{{ $message }}</div> @enderror
                </div>
                <div class="a-field">
                    <label>Photo filename</label>
                    <input type="text" name="photo" value="{{ old('photo', $item->photo ?? '') }}" placeholder="shakhawat.jpg">
                </div>
                <div class="a-field">
                    <label>Tags <span class="a-hint">One per line</span></label>
                    <textarea name="tags" style="min-height:90px;">{{ old('tags', $tagsText) }}</textarea>
                </div>
                <div class="a-field">
                    <label>Links <span class="a-hint">One URL per line</span></label>
                    <textarea name="links" style="min-height:90px;">{{ old('links', $linksText) }}</textarea>
                </div>
                <div class="a-field">
                    <label>Sort Order</label>
                    <input type="number" name="sort_order" value="{{ old('sort_order', $item->sort_order ?? 0) }}">
                </div>
                <div class="a-field full">
                    <label>Bio</label>
                    <textarea name="bio">{{ old('bio', $item->bio ?? '') }}</textarea>
                </div>
            </div>

            <div>
                <button class="a-btn primary">{{ $item ? 'Update' : 'Create' }} Member</button>
            </div>
        </form>
    </div>
</div>