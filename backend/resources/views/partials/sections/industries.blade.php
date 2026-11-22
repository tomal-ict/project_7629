<section id="industries" class="section">
    <div class="industries-wrap">
        <div class="section-head center reveal">
            <span class="section-tag">{{ $settings['industries_tag'] ?? 'COVERAGE' }}</span>
            <h2 class="section-title">{{ $settings['industries_title'] ?? 'Transforming Every Sector' }}</h2>
            <p class="section-desc">{{ $settings['industries_sub'] ?? '' }}</p>
        </div>

        <div class="industries-grid">
            @foreach ($industries as $industry)
                <div class="industry-card reveal">
                    <div class="ind-ic">{{ $industry->icon }}</div>
                    <h4>{{ $industry->name }}</h4>
                </div>
            @endforeach
        </div>
    </div>
</section>