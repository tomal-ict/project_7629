@extends('layouts.admin')

@section('title', 'Site Settings')

@section('content')
<div class="a-card">
    <div class="a-card-head">
        <h2>Site Settings</h2>
        <a href="{{ route('admin.settings.create') }}" class="a-btn primary">+ New Setting</a>
    </div>
    <div class="a-card-body" style="display:grid; gap:24px;">
        @forelse ($settings as $group => $items)
            <div>
                <h3 style="font-size:12px; font-weight:800; letter-spacing:1.5px; text-transform:uppercase; color:#0891b2; margin-bottom:10px;">{{ $group }}</h3>
                <div class="a-table-wrap" style="border:1px solid var(--line); border-radius:12px; overflow:hidden;">
                    <table class="a-table">
                        <tbody>
                            @foreach ($items as $setting)
                                <tr>
                                    <td style="width:32%;" class="a-muted"><strong style="color:#334155;">{{ $setting->key }}</strong></td>
                                    <td style="word-break:break-word;">{{ \Illuminate\Support\Str::limit($setting->value, 90) }}</td>
                                    <td style="white-space:nowrap; width:150px;">
                                        <div class="a-actions">
                                            <a href="{{ route('admin.settings.edit', $setting) }}" class="a-btn sm">Edit</a>
                                            <form method="POST" action="{{ route('admin.settings.destroy', $setting) }}" onsubmit="return confirm('Delete this setting?');">
                                                @csrf @method('DELETE')
                                                <button class="a-btn sm danger">Delete</button>
                                            </form>
                                        </div>
                                    </td>
                                </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>
            </div>
        @empty
            <p class="a-empty">No settings yet.</p>
        @endforelse
    </div>
</div>
@endsection