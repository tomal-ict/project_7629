<div class="a-card">
    <div class="a-card-head">
        <h2>{{ $item ? 'Edit Client' : 'New Client' }}</h2>
        <a href="{{ route('admin.clients.index') }}" class="a-btn">← Back</a>
    </div>
    <div class="a-card-body">
        <form method="POST" class="a-form" action="{{ $item ? route('admin.clients.update', $item) : route('admin.clients.store') }}">
            @csrf
            @if ($item) @method('PATCH') @endif

            <div class="a-form-grid">
                <div class="a-field">
                    <label>Name <span class="req">*</span></label>
                    <input type="text" name="name" value="{{ old('name', $item->name ?? '') }}" required>
                    @error('name') <div class="a-err">{{ $message }}</div> @enderror
                </div>
                <div class="a-field">
                    <label>Group <span class="req">*</span></label>
                    <select name="group" required>
                        <option value="clients" @selected(old('group', $item->group ?? '') === 'clients')>Clients</option>
                        <option value="pilots" @selected(old('group', $item->group ?? '') === 'pilots')>Pilots</option>
                    </select>
                    @error('group') <div class="a-err">{{ $message }}</div> @enderror
                </div>
                <div class="a-field">
                    <label>Logo filename</label>
                    <input type="text" name="logo" value="{{ old('logo', $item->logo ?? '') }}" placeholder="e.g. finlays.png">
                </div>
                <div class="a-field">
                    <label>Accent color</label>
                    <input type="text" name="accent" value="{{ old('accent', $item->accent ?? '#0ea5e9') }}" placeholder="#0ea5e9">
                </div>
                <div class="a-field">
                    <label>Sort Order</label>
                    <input type="number" name="sort_order" value="{{ old('sort_order', $item->sort_order ?? 0) }}">
                </div>
            </div>

            <div>
                <button class="a-btn primary">{{ $item ? 'Update' : 'Create' }} Client</button>
            </div>
        </form>
    </div>
</div>