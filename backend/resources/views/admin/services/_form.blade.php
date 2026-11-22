@php
    $featuresText = $item ? implode("\n", $item->features ?? []) : '';
    $benefitsText = $item ? implode("\n", $item->benefits ?? []) : '';
    $usecasesText = $item ? implode("\n", $item->usecases ?? []) : '';
    $galleryText = $item ? implode("\n", $item->gallery_images ?? []) : '';
    $statsText = $item && $item->stats
        ? collect($item->stats)->map(fn ($s) => ($s['value'] ?? '').' | '.($s['label'] ?? ''))->implode("\n")
        : '';
    $stepsText = $item && $item->steps
        ? collect($item->steps)->map(fn ($s) => ($s['title'] ?? '').' | '.($s['desc'] ?? ''))->implode("\n")
        : '';
@endphp

<div class="a-card">
    <div class="a-card-head">
        <h2>{{ $item ? 'Edit Service' : 'New Service' }}</h2>
        <a href="{{ route('admin.services.index') }}" class="a-btn">← Back</a>
    </div>
    <div class="a-card-body">
        <form method="POST" class="a-form" action="{{ $item ? route('admin.services.update', $item) : route('admin.services.store') }}">
            @csrf
            @if ($item) @method('PATCH') @endif

            <div class="a-form-grid">
                <div class="a-field">
                    <label>Slug <span class="req">*</span></label>
                    <input type="text" name="slug" value="{{ old('slug', $item->slug ?? '') }}" placeholder="custom-ai-development" required>
                    @error('slug') <div class="a-err">{{ $message }}</div> @enderror
                </div>
                <div class="a-field">
                    <label>Title <span class="req">*</span></label>
                    <input type="text" name="title" value="{{ old('title', $item->title ?? '') }}" required>
                    @error('title') <div class="a-err">{{ $message }}</div> @enderror
                </div>
                <div class="a-field">
                    <label>Subtitle</label>
                    <input type="text" name="subtitle" value="{{ old('subtitle', $item->subtitle ?? '') }}" placeholder="Built From Scratch on Our Proprietary Model">
                </div>
                <div class="a-field">
                    <label>Icon (emoji)</label>
                    <input type="text" name="icon" value="{{ old('icon', $item->icon ?? '🧩') }}" placeholder="🧩">
                </div>
                <div class="a-field">
                    <label>Color (hex)</label>
                    <input type="text" name="color" value="{{ old('color', $item->color ?? '#2563eb') }}" placeholder="#2563eb">
                </div>
                <div class="a-field">
                    <label>Color light (hex)</label>
                    <input type="text" name="color_light" value="{{ old('color_light', $item->color_light ?? '#eff6ff') }}" placeholder="#eff6ff">
                </div>
                <div class="a-field">
                    <label>Featured on Home</label>
                    <input type="hidden" name="featured_on_home" value="0">
                    <label class="a-radio">
                        <input type="checkbox" name="featured_on_home" value="1" @checked(old('featured_on_home', $item->featured_on_home ?? true))>
                        Show in homepage services tabs
                    </label>
                </div>
                <div class="a-field">
                    <label>Sort Order</label>
                    <input type="number" name="sort_order" value="{{ old('sort_order', $item->sort_order ?? 0) }}">
                </div>
                <div class="a-field full">
                    <label>Description (short, shown in tabs) <span class="req">*</span></label>
                    <textarea name="description" required>{{ old('description', $item->description ?? '') }}</textarea>
                </div>
                <div class="a-field full">
                    <label>Intro (long, shown on detail page)</label>
                    <textarea name="intro">{{ old('intro', $item->intro ?? '') }}</textarea>
                </div>
                <div class="a-field full">
                    <label>Why us</label>
                    <textarea name="why_us">{{ old('why_us', $item->why_us ?? '') }}</textarea>
                </div>
                <div class="a-field">
                    <label>Features <span class="a-hint">One per line</span></label>
                    <textarea name="features" style="min-height:120px;">{{ old('features', $featuresText) }}</textarea>
                </div>
                <div class="a-field">
                    <label>Benefits <span class="a-hint">One per line</span></label>
                    <textarea name="benefits" style="min-height:120px;">{{ old('benefits', $benefitsText) }}</textarea>
                </div>
                <div class="a-field">
                    <label>Use cases <span class="a-hint">One per line</span></label>
                    <textarea name="usecases" style="min-height:120px;">{{ old('usecases', $usecasesText) }}</textarea>
                </div>
                <div class="a-field">
                    <label>Gallery images <span class="a-hint">One full URL per line</span></label>
                    <textarea name="gallery_images" style="min-height:120px;">{{ old('gallery_images', $galleryText) }}</textarea>
                </div>
                <div class="a-field">
                    <label>Stats <span class="a-hint">One per line: value | label</span></label>
                    <textarea name="stats" style="min-height:120px;" placeholder="15+ | Ready Products">{{ old('stats', $statsText) }}</textarea>
                </div>
                <div class="a-field">
                    <label>Steps <span class="a-hint">One per line: title | description</span></label>
                    <textarea name="steps" style="min-height:120px;" placeholder="Discovery | Understand your environment">{{ old('steps', $stepsText) }}</textarea>
                </div>
            </div>

            <div>
                <button class="a-btn primary">{{ $item ? 'Update' : 'Create' }} Service</button>
            </div>
        </form>
    </div>
</div>