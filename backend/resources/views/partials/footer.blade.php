<footer class="site-footer">
    <div class="footer-gradient-bar"></div>
    <div class="footer-top">
        <div class="footer-brand">
            <a href="{{ route('home') }}" class="nav-logo">
                <img src="{{ asset('images/logo.svg') }}" alt="{{ $settings['company_name'] ?? 'ABC AI System' }}" style="filter: brightness(0) invert(1); opacity:.95;">
            </a>
            <p class="footer-tagline">{{ $settings['footer_tagline'] ?? 'Democratizing Artificial Intelligence with proprietary, privacy-first solutions for enterprises.' }}</p>
            <div class="footer-member-chips">
                <a href="{{ $settings['basis_url'] ?? 'https://basis.org.bd' }}" target="_blank" rel="noopener" class="member-chip">
                    <span class="chip-ic">🏛</span> BASIS Member
                </a>
                <a href="{{ $settings['dcci_url'] ?? 'https://www.dhakachamber.com' }}" target="_blank" rel="noopener" class="member-chip">
                    <span class="chip-ic">🏢</span> DCCI Member
                </a>
            </div>
            <ul class="footer-contact-list">
                <li>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                    <span>{{ $settings['address'] ?? '' }}</span>
                </li>
                <li>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                    <a href="mailto:{{ $settings['email'] ?? '' }}">{{ $settings['email'] ?? '' }}</a>
                </li>
                <li>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                    <a href="{{ $settings['website'] ?? '#' }}" target="_blank" rel="noopener">{{ $settings['website'] ?? '' }}</a>
                </li>
            </ul>
        </div>

        <div class="footer-col">
            <h4>Products</h4>
            <div class="footer-links">
                @php($footerProducts = collect(($products ?? collect()))->merge($moreProducts ?? collect())->pluck('name')->take(6))
                @foreach ($footerProducts as $name)
                    <a href="{{ route('home') }}#products">{{ $name }}</a>
                @endforeach
            </div>
        </div>

        <div class="footer-col">
            <h4>Services</h4>
            <div class="footer-links">
                @foreach (collect($services ?? collect())->take(6) as $s)
                    <a href="{{ route('services.show', $s) }}">{{ $s->title }}</a>
                @endforeach
            </div>
        </div>

        <div class="footer-col">
            <h4>Company</h4>
            <div class="footer-links">
                <a href="{{ route('home') }}#about">{{ $settings['footer_about_label'] ?? 'About Us' }}</a>
                <a href="{{ route('home') }}#leadership">{{ $settings['footer_leadership_label'] ?? 'Leadership' }}</a>
                <a href="{{ route('home') }}#technology">{{ $settings['footer_technology_label'] ?? 'Technology' }}</a>
                <a href="{{ route('home') }}#industries">{{ $settings['footer_industries_label'] ?? 'Industries' }}</a>
                <a href="{{ route('home') }}#companies">{{ $settings['footer_why_label'] ?? 'Why Us' }}</a>
                <a href="{{ route('home') }}#contact">{{ $settings['footer_contact_label'] ?? 'Contact' }}</a>
            </div>
        </div>
    </div>

    <div class="footer-bottom">
        <div class="footer-bottom-inner">
            <span>{{ $settings['copyright_year'] ?? '© 2025 ABC AI System Limited. All Rights Reserved.' }}</span>
            <div class="footer-legal">
                <a href="#">Privacy Policy</a>
                <a href="#">Terms of Service</a>
                <a href="#">Cookie Policy</a>
                <a href="{{ route('login') }}">Admin Panel</a>
            </div>
        </div>
    </div>
</footer>