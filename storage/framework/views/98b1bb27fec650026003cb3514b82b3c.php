<!DOCTYPE html>
<html lang="<?php echo e(str_replace('_', '-', app()->getLocale())); ?>">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="<?php echo e(csrf_token()); ?>">

        <title><?php echo $__env->yieldContent('title', 'Dashboard'); ?> — <?php echo e(config('app.name', 'Admin')); ?></title>

        <link rel="icon" href="<?php echo e(asset('images/logo.svg')); ?>" type="image/svg+xml">
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600,700,800&display=swap" rel="stylesheet" />
        <?php echo app('Illuminate\Foundation\Vite')(['resources/css/app.css', 'resources/js/app.js']); ?>
        <link rel="stylesheet" href="<?php echo e(asset('css/admin.css')); ?>">
    </head>
    <body class="font-sans antialiased" style="font-family: 'Figtree', sans-serif;">
        <div class="a-layout">
            <aside class="a-sidebar">
                <div class="a-brand">
                    <img src="<?php echo e(asset('images/logo.svg')); ?>" alt="Brain System Limited">
                    <div class="ab-txt">Brain System<small>ADMIN PANEL</small></div>
                </div>

                <nav class="a-nav">
                    <div class="a-label">Overview</div>
                    <a href="<?php echo e(route('admin.dashboard')); ?>" <?php if(request()->routeIs('admin.dashboard')): ?> class="active" <?php endif; ?>>
                        <svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>
                        Dashboard
                    </a>

                    <div class="a-label">Inbox</div>
                    <a href="<?php echo e(route('admin.messages.index')); ?>" <?php if(request()->routeIs('admin.messages.*')): ?> class="active" <?php endif; ?>>
                        <svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                        Messages
                        <?php ($sidebarUnread = $unreadCount ?? \App\Models\ContactMessage::where('is_read', false)->count()); ?>
                        <?php if($sidebarUnread > 0): ?>
                            <span class="a-badge"><?php echo e($sidebarUnread); ?></span>
                        <?php endif; ?>
                    </a>

                    <div class="a-label">Content</div>
                    <a href="<?php echo e(route('admin.services.index')); ?>" <?php if(request()->routeIs('admin.services.*')): ?> class="active" <?php endif; ?>>
                        <svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10 12 5 2 10l10 5 10-5z"/><path d="M6 12v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5"/></svg>
                        Services
                    </a>
                    <a href="<?php echo e(route('admin.products.index')); ?>" <?php if(request()->routeIs('admin.products.*')): ?> class="active" <?php endif; ?>>
                        <svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>
                        Products
                    </a>
                    <a href="<?php echo e(route('admin.team-members.index')); ?>" <?php if(request()->routeIs('admin.team-members.*')): ?> class="active" <?php endif; ?>>
                        <svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                        Team Members
                    </a>
                    <a href="<?php echo e(route('admin.clients.index')); ?>" <?php if(request()->routeIs('admin.clients.*')): ?> class="active" <?php endif; ?>>
                        <svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                        Clients & Pilots
                    </a>
                    <a href="<?php echo e(route('admin.statistics.index')); ?>" <?php if(request()->routeIs('admin.statistics.*')): ?> class="active" <?php endif; ?>>
                        <svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" x2="18" y1="20" y2="10"/><line x1="12" x2="12" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="14"/></svg>
                        Statistics
                    </a>
                    <a href="<?php echo e(route('admin.industries.index')); ?>" <?php if(request()->routeIs('admin.industries.*')): ?> class="active" <?php endif; ?>>
                        <svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9a9 9 0 0 1 12 0"/><path d="M3 6a13 13 0 0 1 18 0"/><path d="M9 12a5 5 0 0 1 6 0"/><path d="M12 21h.01"/></svg>
                        Industries
                    </a>
                    <a href="<?php echo e(route('admin.tech-domains.index')); ?>" <?php if(request()->routeIs('admin.tech-domains.*')): ?> class="active" <?php endif; ?>>
                        <svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>
                        Tech Domains
                    </a>
                    <a href="<?php echo e(route('admin.advantages.index')); ?>" <?php if(request()->routeIs('admin.advantages.*')): ?> class="active" <?php endif; ?>>
                        <svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/></svg>
                        Advantages
                    </a>
                    <a href="<?php echo e(route('admin.methodologies.index')); ?>" <?php if(request()->routeIs('admin.methodologies.*')): ?> class="active" <?php endif; ?>>
                        <svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 16h5v5"/></svg>
                        Methodology
                    </a>

                    <div class="a-label">System</div>
                    <a href="<?php echo e(route('admin.settings.index')); ?>" <?php if(request()->routeIs('admin.settings.*')): ?> class="active" <?php endif; ?>>
                        <svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
                        Site Settings
                    </a>

                    <div class="a-label a-foot">Account</div>
                    <a href="<?php echo e(route('home')); ?>" target="_blank">
                        <svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" x2="21" y1="14" y2="3"/></svg>
                        View Website
                    </a>
                    <form method="POST" action="<?php echo e(route('logout')); ?>">
                        <?php echo csrf_field(); ?>
                        <a href="#" class="logout-link" style="border:none;background:none;width:100%;text-align:left;" onclick="event.preventDefault(); this.closest('form').submit();">
                            <svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
                            Log Out
                        </a>
                    </form>
                </nav>
            </aside>

            <div class="a-main">
                <header class="a-topbar">
                    <h1><?php echo $__env->yieldContent('title', 'Dashboard'); ?></h1>
                    <div class="a-topbar-actions">
                        <a class="a-btn" href="<?php echo e(route('home')); ?>" target="_blank">View Site</a>
                        <div class="a-user">
                            <span class="a-avatar"><?php echo e(mb_substr(Auth::user()->name ?? 'A', 0, 1)); ?></span>
                            <div>
                                <div><?php echo e(Auth::user()->name ?? ''); ?></div>
                                <div class="a-muted" style="font-size:11.5px; font-weight:600;"><?php echo e(Auth::user()->email ?? ''); ?></div>
                            </div>
                        </div>
                    </div>
                </header>

                <main class="a-content">
                    <?php if(session('status')): ?>
                        <div class="a-flash"><?php echo e(session('status')); ?></div>
                    <?php endif; ?>
                    <?php echo $__env->yieldContent('content'); ?>
                </main>
            </div>
        </div>
    </body>
</html><?php /**PATH F:\xampp\htdocs\AGM_Web_site\resources\views/layouts/admin.blade.php ENDPATH**/ ?>