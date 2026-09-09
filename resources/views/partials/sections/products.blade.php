<section id="products" class="section products-section">
    <div class="products-head">
        <div class="section-head center reveal">
            <span class="section-tag">{{ $settings['products_tag'] ?? 'PRODUCT PORTFOLIO' }}</span>
            <h2 class="section-title">{{ $settings['products_title'] ?? 'Our Flagship AI Products' }}</h2>
            <p class="section-desc">{{ $settings['products_sub'] ?? '' }}</p>
        </div>
    </div>

    <div class="product-slider reveal" data-slider data-auto="8000">
        @foreach ($products as $product)
            <div class="product-slide @if ($loop->first) active @endif">
                <div class="product-slide-grid">
                    <div class="product-copy">
                        <span class="pc-tag">{{ $product->tag }}</span>
                        <h3>{{ $product->name }}</h3>
                        @if ($product->metric)
                            <div class="pc-metric">{{ $product->metric }}</div>
                        @endif
                        <p>{{ $product->description }}</p>
                        @if ($product->features)
                            <ul class="product-features">
                                @foreach (array_slice($product->features, 0, 4) as $feature)
                                    <li>
                                        <svg class="pf-ic" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                                        {{ $feature }}
                                    </li>
                                @endforeach
                            </ul>
                        @endif
                    </div>

                    <div class="product-demo">
                        @include('partials.sections.product-demo', ['demo' => $product->demo, 'productName' => $product->name])
                    </div>
                </div>
            </div>
        @endforeach

        <div class="slide-controls">
            <button class="slide-btn slide-prev" aria-label="Previous product">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>
            </button>
            <div class="slide-dots">
                @foreach ($products as $product)
                    <button class="slide-dot @if ($loop->first) active @endif" aria-label="Go to product {{ $loop->iteration }}"></button>
                @endforeach
            </div>
            <span class="product-counter"></span>
            <button class="slide-btn slide-next" aria-label="Next product">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </button>
        </div>
    </div>

    @php
    $mpIcons = [
        'Blens' => '🎙️', 'Sohojogi' => '🗣️', 'Booking Model' => '🧾',
        'Proxy Eye' => '👁️', 'Validex AI' => '📜', 'AgroRx' => '🌾',
    ];
@endphp
@if ($moreProducts->count())
<div class="more-products-wrap" style="margin-top: 56px;">
        <div class="more-products-inner reveal">
            <div class="section-head center" style="margin-bottom: 0;">
                <span class="section-tag">{{ $settings['more_products_tag'] ?? 'MORE PRODUCTS' }}</span>
                <h2 class="section-title" style="font-size: clamp(24px, 3vw, 34px);">{{ $settings['more_products_title'] ?? '6 More Powerful Solutions' }}</h2>
            </div>
            <div class="more-products-grid">
                @foreach ($moreProducts as $product)
                    <div class="mp-card">
                        <div class="mp-logo">{{ $mpIcons[$product->name] ?? '🧩' }}</div>
                        <h4>{{ $product->name }}</h4>
                        @if ($product->tag)
                            <span class="mp-tag">{{ $product->tag }}</span>
                        @endif
                        <p>{{ $product->description }}</p>
                        <a href="{{ route('home') }}#contact">
                            Learn More
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                        </a>
                    </div>
                @endforeach
            </div>
        </div>
    </div>
@endif
</section>