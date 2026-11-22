<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="{{ $settings['hero_sub'] ?? 'Pioneering Proprietary AI from Bangladesh. Empowering businesses with proprietary AI solutions — no third-party LLMs, zero hallucinations, and absolute data privacy.' }}">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>@yield('title', $settings['company_tagline'] ?? 'ABC AI System Limited') — {{ $settings['company_name'] ?? 'ABC AI System Limited' }}</title>
    <link rel="icon" href="{{ asset('images/logo.svg') }}" type="image/svg+xml">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="{{ asset('css/site-base.css') }}">
    <link rel="stylesheet" href="{{ asset('css/site-nav-hero.css') }}?v=4">
    <link rel="stylesheet" href="{{ asset('css/site-sections.css') }}">
    <link rel="stylesheet" href="{{ asset('css/site-extra.css') }}">
</head>
<body class="@yield('body_class', 'home')">

    @include('partials.header')

    <main>
        @yield('content')
    </main>

    @include('partials.footer')

    <button class="back-to-top" aria-label="Back to top">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5"/><path d="m5 12 7-7 7 7"/></svg>
    </button>

    <script src="{{ asset('js/site.js') }}"></script>
    <script src="{{ asset('js/hero-neural.js') }}?v=4"></script>
</body>
</html>