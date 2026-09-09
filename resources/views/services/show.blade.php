@extends('layouts.site')

@section('title', $service->title)

@section('body_class', 'service-detail')

@section('content')

    <section class="service-hero" style="background-image: url('{{ $service->hero_image ?? asset('images/brain.svg') }}');">
        <div class="service-hero-content">
            <div class="service-breadcrumb">
                <a href="{{ route('home') }}">Home</a> <span style="opacity:.6;">•</span> Services <span style="opacity:.6;">•</span> {{ $service->title }}
            </div>
            <span class="sh-badge">{{ $service->icon }} {{ $service->title }}</span>
            <h1>{{ $service->title }}</h1>
            <p class="sh-sub">{{ $service->subtitle }}</p>
            <div class="service-hero-actions">
                <a href="{{ route('home') }}#contact" class="btn btn-white">Get Started</a>
                <a href="{{ route('home') }}#products" class="btn-outline" style="border-color:#fff; color:#fff; background:rgba(255,255,255,.08);">Explore Products</a>
            </div>
        </div>
    </section>

    @if ($service->stats)
        <div class="service-stats">
            @foreach (array_slice($service->stats, 0, 4) as $stat)
                <div>
                    <div class="sv">{{ $stat['value'] ?? '' }}</div>
                    <div class="sl">{{ $stat['label'] ?? '' }}</div>
                </div>
            @endforeach
        </div>
    @endif

    @if ($service->intro)
        <section class="service-section">
            <div class="service-overview">
                <div class="reveal">
                    <span class="section-tag">Overview</span>
                    <h2 class="section-title" style="font-size: clamp(24px, 3vw, 36px); margin-bottom: 6px;">{{ $service->title }}</h2>
                    <p class="section-desc" style="max-width: none; margin-top: 14px;">{{ $service->intro }}</p>
                    @if ($service->why_us)
                        <p class="section-desc" style="max-width: none; margin-top: 14px; color: #0891b2; font-weight: 600;">{{ $service->why_us }}</p>
                    @endif
                </div>
                @if ($service->gallery_images)
                    <div class="service-gallery reveal reveal-delay-1">
                        @foreach (array_slice($service->gallery_images, 0, 3) as $img)
                            <div>
                                <img src="{{ $img }}" alt="{{ $service->title }} — {{ $loop->iteration }}" loading="lazy">
                            </div>
                        @endforeach
                    </div>
                @endif
            </div>
        </section>
    @endif

    @if ($service->features || $service->benefits || $service->usecases)
        <section class="service-section" style="padding-top: 0;">
            <div class="service-grid-2">
                @if ($service->features)
                    <div class="svc-list-card reveal">
                        <h4>Features</h4>
                        <ul>
                            @foreach ($service->features as $feature)
                                <li>
                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>
                                    {{ $feature }}
                                </li>
                            @endforeach
                        </ul>
                    </div>
                @endif
                @if ($service->benefits)
                    <div class="svc-list-card reveal reveal-delay-1">
                        <h4>Benefits</h4>
                        <ul>
                            @foreach ($service->benefits as $benefit)
                                <li>
                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>
                                    {{ $benefit }}
                                </li>
                            @endforeach
                        </ul>
                    </div>
                @endif
            </div>

            @if ($service->usecases)
                <div style="max-width: 1200px; margin: 48px auto 0;">
                    <div class="section-head" style="margin-bottom: 24px;">
                        <span class="section-tag">Use Cases</span>
                        <h2 class="section-title" style="font-size: clamp(22px, 3vw, 32px);">Where It Works</h2>
                    </div>
                    <div class="service-grid-3">
                        @foreach ($service->usecases as $usecase)
                            <div class="svc-list-card reveal">
                                <ul>
                                    <li>
                                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
                                        {{ $usecase }}
                                    </li>
                                </ul>
                            </div>
                        @endforeach
                    </div>
                </div>
            @endif
        </section>
    @endif

    @if ($service->steps)
        <section class="service-section" style="padding-top: 0;">
            <div class="section-head reveal">
                <span class="section-tag">Our Approach</span>
                <h2 class="section-title" style="font-size: clamp(22px, 3vw, 32px);">From Idea to Impact</h2>
            </div>
            <div class="service-steps">
                @foreach ($service->steps as $step)
                    <div class="service-step reveal">
                        <div class="ss-num">{{ str_pad($loop->iteration, 2, '0', STR_PAD_LEFT) }}</div>
                        <h4>{{ $step['title'] ?? '' }}</h4>
                        <p>{{ $step['desc'] ?? '' }}</p>
                    </div>
                @endforeach
            </div>
        </section>
    @endif

    <section class="service-section" style="padding-top: 0;">
        <div class="service-cta reveal">
            <h3>Ready to {{ $service->title }}?</h3>
            <p>Let's discuss how our proprietary AI model can be deployed for your business — securely, privately, and fast.</p>
            <div class="cta-actions">
                <a href="{{ route('home') }}#contact" class="btn btn-white">
                    Book a Free Consultation
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </a>
                <a href="{{ route('home') }}#products" class="btn btn-outline">Explore Our Products</a>
            </div>
        </div>
    </section>

    <section class="service-section" style="padding-top: 0;">
        <div class="section-head reveal">
            <span class="section-tag">More Services</span>
            <h2 class="section-title" style="font-size: clamp(22px, 3vw, 32px);">Explore Other Services</h2>
        </div>
        <div class="more-services">
            @foreach ($moreServices as $s)
                <div class="ms-card reveal">
                    <div class="ms-ic">{{ $s->icon }}</div>
                    <h4>{{ $s->title }}</h4>
                    <p>{{ $s->description }}</p>
                    <a href="{{ route('services.show', $s) }}">
                        Explore Service
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                    </a>
                </div>
            @endforeach
        </div>
    </section>

@endsection