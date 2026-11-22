<section id="methodology" class="section-warm">
    <div class="methodology-wrap">
        <div class="section-head center reveal">
            <span class="section-tag">{{ $settings['method_tag'] ?? 'HOW WE WORK' }}</span>
            <h2 class="section-title">{{ $settings['method_title'] ?? 'Research-Driven Approach' }}</h2>
            <p class="section-desc">{{ $settings['method_sub'] ?? '' }}</p>
        </div>

        <div class="methodology-steps">
            @foreach ($methodologies as $i => $method)
                <div class="methodology-card reveal">
                    <div class="step-num">{{ str_pad($loop->iteration, 2, '0', STR_PAD_LEFT) }}</div>
                    <div class="step-ic">{{ $method->icon }}</div>
                    <h4>{{ $method->title }}</h4>
                    <p>{{ $method->description }}</p>
                </div>
            @endforeach
        </div>
    </div>
</section>