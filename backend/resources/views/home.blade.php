@extends('layouts.site')

@section('title', $settings['company_tagline'] ?? 'Democratizing Artificial Intelligence')

@section('content')

    @include('partials.sections.hero')
    @include('partials.sections.stats', ['stats' => $stats])
    @include('partials.sections.about', [
        'settings' => $settings,
        'coreValues' => $coreValues,
        'clients' => $clients,
        'pilots' => $pilots,
    ])
    @include('partials.sections.services', [
        'settings' => $settings,
        'services' => $services,
    ])
    @include('partials.sections.products', [
        'settings' => $settings,
        'products' => $products,
        'moreProducts' => $moreProducts,
    ])
    @include('partials.sections.technology', [
        'settings' => $settings,
        'techDomains' => $techDomains,
        'comparisons' => $comparisons,
        'advantages' => $advantages,
    ])
    @include('partials.sections.industries', [
        'settings' => $settings,
        'industries' => $industries,
    ])
    @include('partials.sections.leadership', [
        'settings' => $settings,
        'advisors' => $advisors,
        'coreTeam' => $coreTeam,
        'founderQuotes' => $founderQuotes,
    ])
    @include('partials.sections.methodology', [
        'settings' => $settings,
        'methodologies' => $methodologies,
    ])
    @include('partials.sections.contact', ['settings' => $settings])

@endsection