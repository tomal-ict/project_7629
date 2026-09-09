<footer class="site-footer">
    <div class="footer-gradient-bar"></div>
    <div class="footer-top">
        <div class="footer-brand">
            <a href="<?php echo e(route('home')); ?>" class="nav-logo">
                <img src="<?php echo e(asset('images/logo.svg')); ?>" alt="<?php echo e($settings['company_name'] ?? 'ABC AI System'); ?>" style="filter: brightness(0) invert(1); opacity:.95;">
            </a>
            <p class="footer-tagline"><?php echo e($settings['footer_tagline'] ?? 'Democratizing Artificial Intelligence with proprietary, privacy-first solutions for enterprises.'); ?></p>
            <div class="footer-member-chips">
                <a href="<?php echo e($settings['basis_url'] ?? 'https://basis.org.bd'); ?>" target="_blank" rel="noopener" class="member-chip">
                    <span class="chip-ic">🏛</span> BASIS Member
                </a>
                <a href="<?php echo e($settings['dcci_url'] ?? 'https://www.dhakachamber.com'); ?>" target="_blank" rel="noopener" class="member-chip">
                    <span class="chip-ic">🏢</span> DCCI Member
                </a>
            </div>
            <ul class="footer-contact-list">
                <li>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                    <span><?php echo e($settings['address'] ?? ''); ?></span>
                </li>
                <li>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                    <a href="mailto:<?php echo e($settings['email'] ?? ''); ?>"><?php echo e($settings['email'] ?? ''); ?></a>
                </li>
                <li>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                    <a href="<?php echo e($settings['website'] ?? '#'); ?>" target="_blank" rel="noopener"><?php echo e($settings['website'] ?? ''); ?></a>
                </li>
            </ul>
        </div>

        <div class="footer-col">
            <h4>Products</h4>
            <div class="footer-links">
                <?php ($footerProducts = collect(($products ?? collect()))->merge($moreProducts ?? collect())->pluck('name')->take(6)); ?>
                <?php $__currentLoopData = $footerProducts; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $name): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                    <a href="<?php echo e(route('home')); ?>#products"><?php echo e($name); ?></a>
                <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
            </div>
        </div>

        <div class="footer-col">
            <h4>Services</h4>
            <div class="footer-links">
                <?php $__currentLoopData = collect($services ?? collect())->take(6); $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $s): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                    <a href="<?php echo e(route('services.show', $s)); ?>"><?php echo e($s->title); ?></a>
                <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
            </div>
        </div>

        <div class="footer-col">
            <h4>Company</h4>
            <div class="footer-links">
                <a href="<?php echo e(route('home')); ?>#about"><?php echo e($settings['footer_about_label'] ?? 'About Us'); ?></a>
                <a href="<?php echo e(route('home')); ?>#leadership"><?php echo e($settings['footer_leadership_label'] ?? 'Leadership'); ?></a>
                <a href="<?php echo e(route('home')); ?>#technology"><?php echo e($settings['footer_technology_label'] ?? 'Technology'); ?></a>
                <a href="<?php echo e(route('home')); ?>#industries"><?php echo e($settings['footer_industries_label'] ?? 'Industries'); ?></a>
                <a href="<?php echo e(route('home')); ?>#companies"><?php echo e($settings['footer_why_label'] ?? 'Why Us'); ?></a>
                <a href="<?php echo e(route('home')); ?>#contact"><?php echo e($settings['footer_contact_label'] ?? 'Contact'); ?></a>
            </div>
        </div>
    </div>

    <div class="footer-bottom">
        <div class="footer-bottom-inner">
            <span><?php echo e($settings['copyright_year'] ?? '© 2025 ABC AI System Limited. All Rights Reserved.'); ?></span>
            <div class="footer-legal">
                <a href="#">Privacy Policy</a>
                <a href="#">Terms of Service</a>
                <a href="#">Cookie Policy</a>
                <a href="<?php echo e(route('login')); ?>">Admin Panel</a>
            </div>
        </div>
    </div>
</footer><?php /**PATH F:\xampp\htdocs\AGM_Web_site\resources\views/partials/footer.blade.php ENDPATH**/ ?>