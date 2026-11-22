@extends('layouts.admin')

@section('title', 'Dashboard')

@section('content')

    <div class="a-grid">
        <div class="a-stat">
            <div class="v">{{ $servicesCount }}</div>
            <div class="l">Services</div>
        </div>
        <div class="a-stat">
            <div class="v">{{ $productsCount }}</div>
            <div class="l">Products</div>
        </div>
        <div class="a-stat">
            <div class="v">{{ $teamCount }}</div>
            <div class="l">Team Members</div>
        </div>
        <div class="a-stat">
            <div class="v">{{ $clientsCount }}</div>
            <div class="l">Clients & Pilots</div>
        </div>
        <div class="a-stat">
            <div class="v">{{ $unreadMessages }}</div>
            <div class="l">Unread Messages</div>
        </div>
        <div class="a-stat">
            <div class="v">{{ $settingsCount }}</div>
            <div class="l">Site Settings</div>
        </div>
        <div class="a-stat">
            <div class="v">{{ \App\Models\Statistic::count() }}</div>
            <div class="l">Statistics</div>
        </div>
        <div class="a-stat">
            <div class="v">{{ \App\Models\Industry::count() }}</div>
            <div class="l">Industries</div>
        </div>
    </div>

    <div class="a-card">
        <div class="a-card-head">
            <h2>Recent Messages</h2>
            <a href="{{ route('admin.messages.index') }}" class="a-btn sm">View All</a>
        </div>
        <div class="a-card-body">
            @forelse ($recentMessages as $msg)
                <div class="a-msg @if (! $msg->is_read) unread @endif">
                    <div class="a-msg-head">
                        <span class="who">{{ $msg->name }}</span>
                        <span class="mail">{{ $msg->email }}</span>
                        @if (! $msg->is_read) <span class="a-pill blue">New</span> @endif
                        <span class="time">{{ $msg->created_at->diffForHumans() }}</span>
                    </div>
                    <p class="a-msg-body">{{ $msg->message }}</p>
                </div>
            @empty
                <p class="a-empty">No messages yet.</p>
            @endforelse
        </div>
    </div>

@endsection