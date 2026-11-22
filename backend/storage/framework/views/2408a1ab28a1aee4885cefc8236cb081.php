<header class="nav">
    <div class="nav-inner">
        <a href="<?php echo e(route('home')); ?>" class="nav-logo">
            <img src="<?php echo e(asset('images/logo.svg')); ?>" alt="<?php echo e($settings['company_name'] ?? 'ABC AI System'); ?>">
        </a>
        <span class="nav-divider"></span>
        <nav class="nav-links-wrapper">
            <a href="<?php echo e(route('home')); ?>#about">About</a>
            <a href="<?php echo e(route('home')); ?>#products">Products</a>
            <a href="<?php echo e(route('home')); ?>#services">Services</a>
            <a href="<?php echo e(route('home')); ?>#technology">Technology</a>
            <a href="<?php echo e(route('home')); ?>#leadership">Leadership</a>
            <a href="<?php echo e(route('home')); ?>#contact">Contact</a>
        </nav>
        <a href="tel:<?php echo e($settings['phone_tel'] ?? '+8801799920150'); ?>" class="nav-cta">
            <span class="btn">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                Call Us
            </span>
        </a>
        <button class="nav-hamburger" aria-label="Open menu">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
        </button>
    </div>
</header><?php /**PATH D:\xampp\htdocs\1_AGM\project_7629\resources\views/partials/header.blade.php ENDPATH**/ ?>