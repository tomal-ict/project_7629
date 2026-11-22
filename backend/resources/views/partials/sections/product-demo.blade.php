@php
    $kind = $demo['kind'] ?? 'generic';
    $sidebar = $demo['sidebar'] ?? [];
@endphp

<div class="demo-window">
    <div class="demo-titlebar">
        <span class="d-dot r"></span>
        <span class="d-dot y"></span>
        <span class="d-dot g"></span>
        <span>{{ $demo['title'] ?? $productName }}</span>
    </div>

    <div class="demo-body">
        @if ($sidebar)
            <div class="demo-sidebar">
                @foreach ($sidebar as $i => $item)
                    <span @if ($i === 0) class="on" @endif>{{ $item }}</span>
                @endforeach
            </div>
        @endif

        <div class="demo-main">
            @if ($kind === 'pulse')
                @if (! empty($demo['chartLabel']))
                    <div class="demo-label">{{ $demo['chartLabel'] }}</div>
                    <div class="demo-hbars">
                        <div class="demo-hbar" style="height: 62%"></div>
                        <div class="demo-hbar" style="height: 84%"></div>
                        <div class="demo-hbar" style="height: 48%"></div>
                        <div class="demo-hbar" style="height: 96%"></div>
                        <div class="demo-hbar" style="height: 70%"></div>
                    </div>
                @endif
                @if (! empty($demo['topItems']))
                    <div class="demo-label" style="margin-top: 4px;">{{ $demo['topLabel'] }}</div>
                    <div class="demo-rows">
                        @foreach (array_slice($demo['topItems'], 0, 4) as $item)
                            <div class="demo-row">
                                <span>{{ $item[0] }}</span>
                                <span class="dr-set">{{ $item[1] }}</span>
                            </div>
                        @endforeach
                    </div>
                @endif
            @elseif ($kind === 'clerk' && ! empty($demo['files']))
                <div class="demo-label">Documents</div>
                <div class="demo-rows">
                    @foreach (array_slice($demo['files'], 0, 4) as $file)
                        <div class="demo-row">
                            <span class="dr-file">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/></svg>
                                <span>{{ $file }}</span>
                            </span>
                            <span class="dr-set">Extracted</span>
                        </div>
                    @endforeach
                </div>
                @if (! empty($demo['steps']))
                    <div class="demo-chips">
                        @foreach ($demo['steps'] as $step)
                            <span class="demo-chip">{{ $step }}</span>
                        @endforeach
                    </div>
                @endif
            @elseif ($kind === 'dotlog' && ! empty($demo['entries']))
                <div class="demo-label">{{ $demo['subtitle'] ?? 'Real-time logs' }}</div>
                <table class="demo-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Time</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach (array_slice($demo['entries'], 0, 4) as $entry)
                            <tr>
                                <td>{{ $entry[0] }}</td>
                                <td>{{ $entry[1] }}</td>
                                <td>{{ $entry[2] }}</td>
                                <td><span class="demo-status">{{ $entry[3] }}</span></td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            @elseif ($kind === 'lightocr' && ! empty($demo['docs']))
                <div class="demo-label">Processed documents</div>
                <div class="demo-rows">
                    @foreach (array_slice($demo['docs'], 0, 4) as $doc)
                        <div class="demo-row">
                            <span class="dr-file">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/></svg>
                                <span>{{ $doc }}</span>
                            </span>
                            <span class="dr-set">Posted</span>
                        </div>
                    @endforeach
                </div>
            @elseif ($kind === 'moina' && ! empty($demo['messages']))
                <div class="demo-voices">
                    @foreach (array_slice($demo['messages'], 0, 3) as $msg)
                        <div class="demo-msg user">{{ $msg }}</div>
                    @endforeach
                </div>
                @if (! empty($demo['items']))
                    <div class="demo-bubbles" style="margin-top: 6px;">
                        @foreach ($demo['items'] as $item)
                            <div class="demo-bubble">
                                <span class="db-dot" style="background: {{ str_contains($item[1], 'active') ? '#34d399' : (str_contains($item[1], 'generated') ? '#fbbf24' : '#38bdf8') }};"></span>
                                {{ $item[0] }}
                                <span class="db-val">{{ $item[1] }}</span>
                            </div>
                        @endforeach
                    </div>
                @endif
            @elseif ($kind === 'bms' && ! empty($demo['protocols']))
                <div class="demo-label">{{ $demo['subtitle'] ?? 'Open protocols' }}</div>
                <div class="demo-chips">
                    @foreach ($demo['protocols'] as $proto)
                        <span class="demo-chip">{{ $proto }}</span>
                    @endforeach
                </div>
                <div class="demo-tags" style="margin-top: 6px;">
                    <div class="demo-tag"><span>Ethernet backbone</span><span class="dt-v">Online</span></div>
                    <div class="demo-tag"><span>Energy metering</span><span class="dt-v">Live</span></div>
                    <div class="demo-tag"><span>Lighting zones</span><span class="dt-v">8</span></div>
                </div>
            @else
                <div class="demo-label">Powered by Proprietary AI</div>
                <div class="demo-rows">
                    <div class="demo-row"><span>Model</span><span class="dr-set">Own · 0% hallucinations</span></div>
                    <div class="demo-row"><span>Deployment</span><span class="dr-set">On-premise</span></div>
                    <div class="demo-row"><span>Privacy</span><span class="dr-set">100% sovereign</span></div>
                </div>
            @endif
        </div>
    </div>
</div>