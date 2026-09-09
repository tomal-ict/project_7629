<div class="stats-band">
    @foreach ($stats as $stat)
        <div class="stat-card reveal">
            <div class="stat-value"
                 data-target="{{ preg_replace('/[^\d.]/', '', $stat->value) }}"
                 data-prefix=""
                 data-suffix="{{ preg_replace('/[\d.]/', '', $stat->value) }}">
                {{ $stat->value }}
            </div>
            <div class="stat-label">{{ $stat->label }}</div>
            @if ($stat->sub)
                <div class="stat-sub">{{ $stat->sub }}</div>
            @endif
        </div>
    @endforeach
</div>