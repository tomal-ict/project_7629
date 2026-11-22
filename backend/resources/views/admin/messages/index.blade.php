@extends('layouts.admin')

@section('title', 'Messages')

@section('content')
<div class="a-card">
    <div class="a-card-head">
        <h2>Contact Messages ({{ $items->count() }})</h2>
    </div>
    <div class="a-card-body">
        @forelse ($items as $item)
            <div class="a-msg @if (! $item->is_read) unread @endif">
                <div class="a-msg-head">
                    <span class="a-avatar" style="width:34px;height:34px;font-size:13px;">{{ mb_substr($item->name, 0, 1) }}</span>
                    <div>
                        <span class="who">{{ $item->name }}</span>
                        <div><a class="mail" href="mailto:{{ $item->email }}">{{ $item->email }}</a></div>
                    </div>
                    @if (! $item->is_read) <span class="a-pill blue">New</span> @endif
                    <span class="time">{{ $item->created_at->format('M d, Y h:i A') }}</span>
                    <div class="a-actions" style="margin-left:auto;">
                        @if (! $item->is_read)
                            <form method="POST" action="{{ route('admin.messages.read', $item) }}">
                                @csrf @method('PATCH')
                                <button class="a-btn sm">Mark Read</button>
                            </form>
                        @endif
                        <form method="POST" action="{{ route('admin.messages.destroy', $item) }}" onsubmit="return confirm('Delete this message?');">
                            @csrf @method('DELETE')
                            <button class="a-btn sm danger">Delete</button>
                        </form>
                    </div>
                </div>
                <p class="a-msg-body">{{ $item->message }}</p>
                <div class="a-msg-meta">
                    @if ($item->phone) Phone: {{ $item->phone }} · @endif
                    @if ($item->company) Company: {{ $item->company }} · @endif
                    Received {{ $item->created_at->diffForHumans() }}
                </div>
            </div>
        @empty
            <p class="a-empty">No messages yet.</p>
        @endforelse
    </div>
</div>
@endsection