<section id="services" class="section-alt">
    <div class="services-wrap">
        <div class="section-head center reveal">
            <span class="section-tag">{{ $settings['services_tag'] ?? 'SERVICES' }}</span>
            <h2 class="section-title">{{ $settings['services_title'] ?? 'What We Do For You' }}</h2>
            <p class="section-desc">{{ $settings['services_sub'] ?? '' }}</p>
        </div>

        <div class="services-panel reveal" data-services-panel>
            <div class="services-tabs">
                @foreach ($services as $i => $service)
                    <button type="button" class="service-tab @if ($loop->first) active @endif" data-tab="{{ $loop->index }}">
                        <span class="st-num">{{ str_pad($loop->iteration, 2, '0', STR_PAD_LEFT) }}</span>
                        <span class="st-ic">{{ $service->icon }}</span>
                        <span class="st-title">{{ $service->title }}</span>
                    </button>
                @endforeach
            </div>

            <div class="service-content">
                @foreach ($services as $service)
                    <div class="service-content-pane" data-pane="{{ $loop->index }}" @if (! $loop->first) style="display:none;" @endif>
                        <div class="service-content-inner">
                            <div class="service-content-kicker">{{ $service->subtitle }}</div>
                            <h3>{{ $service->title }}</h3>
                            <p class="sc-desc">{{ $service->description }}</p>

                            <div class="what-you-get-title">What You Get</div>
                            <ul class="wyg-list">
                                @foreach (array_slice($service->features ?? [], 0, 4) as $feature)
                                    <li>
                                        <span class="ck">
                                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                                        </span>
                                        {{ $feature }}
                                    </li>
                                @endforeach
                            </ul>

                            <div class="services-more">
                                <a href="{{ route('services.show', $service) }}" class="btn">
                                    Learn More
                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                                </a>
                                <a href="{{ route('home') }}#contact" class="go-link">
                                    {{ $settings['services_cta'] ?? 'Get a Free Consultation' }}
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                                </a>
                            </div>
                        </div>
                    </div>
                @endforeach
            </div>
        </div>
    </div>
</section>