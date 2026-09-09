@php
    $initials = fn ($name) => collect(explode(' ', trim($name)))
        ->map(fn ($w) => mb_substr($w, 0, 1))
        ->take(2)->implode('');
@endphp

<section id="leadership" class="section-alt">
    <div class="leadership-wrap">
        <div class="section-head center reveal">
            <span class="section-tag">{{ $settings['leadership_tag'] ?? 'LEADERSHIP' }}</span>
            <h2 class="section-title">{{ $settings['leadership_title'] ?? 'The Minds Behind ABC AI System' }}</h2>
            <p class="section-desc">{{ $settings['leadership_sub'] ?? '6 leaders — Advisors & Core Team' }}</p>
        </div>

        <div class="reveal">
            <h3 class="leadership-group-title">{{ $settings['advisor_title'] ?? 'Advisory Panel' }}</h3>
            <div class="member-grid-3">
                @foreach ($advisors as $member)
                    <div class="member-card reveal">
                        <div class="member-photo">
                            <span class="avatar-init">{{ $initials($member->name) }}</span>
                        </div>
                        <div class="member-body">
                            <h4>{{ $member->name }}</h4>
                            <div class="member-role">{{ $member->role }}</div>
                            <p class="member-bio">{{ $member->bio }}</p>
                            @if ($member->tags)
                                <div class="member-tags">
                                    @foreach (array_slice($member->tags, 0, 3) as $tag)
                                        <span>{{ $tag }}</span>
                                    @endforeach
                                </div>
                            @endif
                        </div>
                    </div>
                @endforeach
            </div>

            <h3 class="leadership-group-title">{{ $settings['core_title'] ?? 'Core Team' }}</h3>
            <div class="member-grid-3">
                @foreach ($coreTeam as $member)
                    <div class="member-card reveal">
                        <div class="member-photo">
                            <span class="avatar-init">{{ $initials($member->name) }}</span>
                        </div>
                        <div class="member-body">
                            <h4>{{ $member->name }}</h4>
                            <div class="member-role">{{ $member->role }}</div>
                            <p class="member-bio">{{ $member->bio }}</p>
                            @if ($member->tags)
                                <div class="member-tags">
                                    @foreach (array_slice($member->tags, 0, 3) as $tag)
                                        <span>{{ $tag }}</span>
                                    @endforeach
                                </div>
                            @endif
                            @if ($member->links)
                                <div class="member-links">
                                    @foreach ($member->links as $link)
                                        <a href="{{ $link }}" target="_blank" rel="noopener">{{ parse_url($link, PHP_URL_HOST) ?: $link }}</a>
                                    @endforeach
                                </div>
                            @endif
                        </div>
                    </div>
                @endforeach
            </div>
        </div>

        @if (! empty($founderQuotes))
            <div class="founder-box reveal">
                <span class="fb-quote-mark">"</span>
                <div class="section-head" style="margin-bottom: 18px;">
                    <span class="section-tag">{{ $settings['founder_title'] ?? 'From the Founder' }}</span>
                </div>
                <blockquote>
                    @foreach (array_slice($founderQuotes, 0, 2) as $quote)
                        <p>{{ $quote }}</p>
                    @endforeach
                </blockquote>
                <div class="fb-by">
                    <span class="fb-avatar">{{ $initials($settings['founder_quote_by'] ?? 'Shakhawat Hossain') }}</span>
                    <div>
                        <strong>{{ $settings['founder_quote_by'] ?? 'Shakhawat Hossain, Managing Director' }}</strong>
                        <span>Founder & Managing Director, ABC AI System Limited</span>
                    </div>
                </div>
            </div>
        @endif
    </div>
</section>