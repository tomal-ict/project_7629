<section id="about" class="section">
    <div class="about-row">
        <div class="about-copy reveal">
            <span class="section-tag">{{ $settings['about_tag'] ?? 'WHO WE ARE' }}</span>
            <h2 class="section-title" style="margin-bottom: 6px;">{{ $settings['about_title'] ?? __('Building AI That Businesses Trust') }}</h2>

            <p class="section-desc" style="margin-top: 14px;">{{ $settings['about_body'] ?? '' }}</p>

            <ul class="about-bullets">
                <li>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>
                    <span>{{ $settings['about_point_1'] ?? __('Flagship AI products built on our own Proprietary Model — no pre-trained models, ever.') }}</span>
                </li>
                <li>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>
                    <span>{{ $settings['about_point_2'] ?? __('Zero hallucinations and absolute data privacy — your data never leaves your environment.') }}</span>
                </li>
                <li>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>
                    <span>{{ $settings['about_point_3'] ?? __('An end-to-end AI partner: products, custom development, R&D, training, audit, IoT, data and ERP.') }}</span>
                </li>
            </ul>
        </div>

        <div class="about-visual reveal reveal-delay-1">
            <div class="about-visual-img">
                <img src="{{ asset('images/brain.svg') }}" alt="{{ $settings['about_image_caption'] ?? 'Proprietary AI Model' }}" style="object-fit: contain; padding: 22px; background: linear-gradient(135deg,#eff6ff,#ecfeff);">
            </div>
            <div class="about-overlay">
                <span class="ai-badge">🧠</span>
                <div>
                    <strong>{{ $settings['about_image_caption'] ?? 'Proprietary AI Model' }}</strong>
                    <span>{{ $settings['about_image_sub'] ?? 'Built in Bangladesh · Serving the World' }}</span>
                </div>
            </div>
            <div class="about-float-card fc1">
                <span class="fc-ic">🔒</span>
                <div>100% Data Privacy<small>No third-party access</small></div>
            </div>
            <div class="about-float-card fc2">
                <span class="fc-ic">🎯</span>
                <div>0% Hallucinations<small>Deterministic outputs</small></div>
            </div>
        </div>
    </div>

    <div class="vm-grid">
        <div class="vm-card card reveal reveal-delay-1">
            <div class="vm-ic">🔭</div>
            <h3>{{ $settings['vision_title'] ?? 'OUR VISION' }}</h3>
            <p>{{ $settings['vision_text'] ?? '' }}</p>
        </div>
        <div class="vm-card card reveal reveal-delay-2">
            <div class="vm-ic">🚀</div>
            <h3>{{ $settings['mission_title'] ?? 'OUR MISSION' }}</h3>
            <p>{{ $settings['mission_text'] ?? '' }}</p>
        </div>
    </div>

    <div style="margin-top: 76px;">
        <div class="section-head center reveal">
            <span class="section-tag">{{ $settings['values_tag'] ?? 'WHAT DEFINES US' }}</span>
            <h2 class="section-title">{{ $settings['values_title'] ?? 'Core Values' }}</h2>
        </div>
        <div class="values-grid">
            @foreach ($coreValues as $value)
                <div class="value-card reveal">
                    <div class="value-ic">{{ $value->icon }}</div>
                    <h3>{{ $value->title }}</h3>
                    <p>{{ $value->description }}</p>
                </div>
            @endforeach
        </div>
    </div>

    <div class="client-showcase" style="margin-top: 84px;">
        <div class="section-head center reveal">
            <span class="section-tag">{{ $settings['clients_tag'] ?? 'TRUSTED BY' }}</span>
            <h2 class="section-title">{{ $settings['clients_title'] ?? 'Our Clients' }}</h2>
        </div>

        <div class="client-logo-group reveal">
            <div class="client-logo-row-title">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                Clients
            </div>
            <div class="client-logo-row client-logo-row--clients">
                @foreach ($clients as $client)
                    <div class="client-logo-card" style="--logo-accent: {{ $client->accent ?? '#0ea5e9' }}">
                        <span class="client-logo-accent"></span>
                        <div class="client-logo-image-wrap">
                            <span class="cl-init">{{ collect(explode(' ', trim($client->name)))->map(fn($w) => mb_substr($w, 0, 1))->take(2)->implode('') }}</span>
                        </div>
                        <span class="client-logo-divider"></span>
                        <span>{{ $client->name }}</span>
                    </div>
                @endforeach
            </div>
        </div>

        @if ($pilots->count())
            <div class="client-logo-group client-logo-group--pilot reveal">
                <div class="client-logo-row-title client-logo-row-title--pilot">
                    <span class="pilot-status-dot"></span>
                    {{ $settings['pilots_title'] ?? 'Pilot Running' }}
                </div>
                <div class="client-logo-row client-logo-row--pilots">
                    @foreach ($pilots as $client)
                        <div class="client-logo-card" style="--logo-accent: {{ $client->accent ?? '#0ea5e9' }}">
                            <span class="client-logo-accent"></span>
                            <div class="client-logo-image-wrap">
                                <span class="cl-init">{{ collect(explode(' ', trim($client->name)))->map(fn($w) => mb_substr($w, 0, 1))->take(2)->implode('') }}</span>
                            </div>
                            <span class="client-logo-divider"></span>
                            <span>{{ $client->name }}</span>
                        </div>
                    @endforeach
                </div>
            </div>
        @endif
    </div>
</section>