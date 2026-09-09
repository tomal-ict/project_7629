<section id="technology" class="section-warm">
    <div class="tech-wrap">
        <div class="section-head center reveal">
            <span class="section-tag">{{ $settings['tech_tag'] ?? 'OUR TECHNOLOGY' }}</span>
            <h2 class="section-title">{{ $settings['tech_title'] ?? 'Built on Our Own AI Model' }}</h2>
            <p class="section-desc">{{ $settings['tech_sub'] ?? '' }}</p>
        </div>

        <div class="tech-domains">
            @foreach ($techDomains as $domain)
                <div class="tech-card reveal">
                    <div class="td-ic">{{ $domain->icon }}</div>
                    <h4>{{ $domain->title }}</h4>
                    <p>{{ $domain->description }}</p>
                </div>
            @endforeach
        </div>

        <div class="tech-table-wrap reveal">
            <div class="section-head center" style="margin-bottom: 28px; margin-top: 20px;">
                <span class="section-tag">{{ $settings['tech_cmp_tag'] ?? 'WHY ABC AI SYSTEM' }}</span>
                <h2 class="section-title" style="font-size: clamp(24px, 3vw, 36px);">{{ $settings['tech_cmp_title'] ?? 'ABC AI System vs Generic AI' }}</h2>
            </div>
            <table class="tech-comparison" style="margin: 0 auto;">
                <thead>
                    <tr>
                        <th>Feature</th>
                        <th>ABC AI System</th>
                        <th>Generic AI</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($comparisons as $cmp)
                        <tr>
                            <td>{{ $cmp->feature }}</td>
                            <td class="us-cell">{{ $cmp->us_value }}</td>
                            <td class="them-cell">{{ $cmp->them_value }}</td>
                        </tr>
                    @endforeach
                </tbody>
                <tfoot>
                    <tr>
                        <td>Verdict</td>
                        <td class="us-cell">Deterministic, private & fully yours</td>
                        <td class="them-cell">Black-box, cloud-bound & shared</td>
                    </tr>
                </tfoot>
            </table>
        </div>

        <div class="tech-advantages">
            @foreach ($advantages as $adv)
                <div class="adv-card reveal">
                    <div class="adv-ic">{{ $adv->icon }}</div>
                    <h4>{{ $adv->title }}</h4>
                    <span class="adv-sub">{{ $adv->subtitle }}</span>
                    <p>{{ $adv->description }}</p>
                </div>
            @endforeach
        </div>
    </div>
</section>