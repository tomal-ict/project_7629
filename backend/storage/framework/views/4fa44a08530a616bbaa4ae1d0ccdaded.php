<?php $__env->startSection('title', $service->title); ?>

<?php $__env->startSection('body_class', 'service-detail'); ?>

<?php $__env->startSection('content'); ?>

    <section class="service-hero" style="background-image: url('<?php echo e($service->hero_image ?? asset('images/brain.svg')); ?>');">
        <div class="service-hero-content">
            <div class="service-breadcrumb">
                <a href="<?php echo e(route('home')); ?>">Home</a> <span style="opacity:.6;">•</span> Services <span style="opacity:.6;">•</span> <?php echo e($service->title); ?>

            </div>
            <span class="sh-badge"><?php echo e($service->icon); ?> <?php echo e($service->title); ?></span>
            <h1><?php echo e($service->title); ?></h1>
            <p class="sh-sub"><?php echo e($service->subtitle); ?></p>
            <div class="service-hero-actions">
                <a href="<?php echo e(route('home')); ?>#contact" class="btn btn-white">Get Started</a>
                <a href="<?php echo e(route('home')); ?>#products" class="btn-outline" style="border-color:#fff; color:#fff; background:rgba(255,255,255,.08);">Explore Products</a>
            </div>
        </div>
    </section>

    <?php if($service->stats): ?>
        <div class="service-stats">
            <?php $__currentLoopData = array_slice($service->stats, 0, 4); $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $stat): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                <div>
                    <div class="sv"><?php echo e($stat['value'] ?? ''); ?></div>
                    <div class="sl"><?php echo e($stat['label'] ?? ''); ?></div>
                </div>
            <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
        </div>
    <?php endif; ?>

    <?php if($service->intro): ?>
        <section class="service-section">
            <div class="service-overview">
                <div class="reveal">
                    <span class="section-tag">Overview</span>
                    <h2 class="section-title" style="font-size: clamp(24px, 3vw, 36px); margin-bottom: 6px;"><?php echo e($service->title); ?></h2>
                    <p class="section-desc" style="max-width: none; margin-top: 14px;"><?php echo e($service->intro); ?></p>
                    <?php if($service->why_us): ?>
                        <p class="section-desc" style="max-width: none; margin-top: 14px; color: #0891b2; font-weight: 600;"><?php echo e($service->why_us); ?></p>
                    <?php endif; ?>
                </div>
                <?php if($service->gallery_images): ?>
                    <div class="service-gallery reveal reveal-delay-1">
                        <?php $__currentLoopData = array_slice($service->gallery_images, 0, 3); $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $img): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                            <div>
                                <img src="<?php echo e($img); ?>" alt="<?php echo e($service->title); ?> — <?php echo e($loop->iteration); ?>" loading="lazy">
                            </div>
                        <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
                    </div>
                <?php endif; ?>
            </div>
        </section>
    <?php endif; ?>

    <?php if($service->features || $service->benefits || $service->usecases): ?>
        <section class="service-section" style="padding-top: 0;">
            <div class="service-grid-2">
                <?php if($service->features): ?>
                    <div class="svc-list-card reveal">
                        <h4>Features</h4>
                        <ul>
                            <?php $__currentLoopData = $service->features; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $feature): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                                <li>
                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>
                                    <?php echo e($feature); ?>

                                </li>
                            <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
                        </ul>
                    </div>
                <?php endif; ?>
                <?php if($service->benefits): ?>
                    <div class="svc-list-card reveal reveal-delay-1">
                        <h4>Benefits</h4>
                        <ul>
                            <?php $__currentLoopData = $service->benefits; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $benefit): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                                <li>
                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>
                                    <?php echo e($benefit); ?>

                                </li>
                            <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
                        </ul>
                    </div>
                <?php endif; ?>
            </div>

            <?php if($service->usecases): ?>
                <div style="max-width: 1200px; margin: 48px auto 0;">
                    <div class="section-head" style="margin-bottom: 24px;">
                        <span class="section-tag">Use Cases</span>
                        <h2 class="section-title" style="font-size: clamp(22px, 3vw, 32px);">Where It Works</h2>
                    </div>
                    <div class="service-grid-3">
                        <?php $__currentLoopData = $service->usecases; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $usecase): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                            <div class="svc-list-card reveal">
                                <ul>
                                    <li>
                                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
                                        <?php echo e($usecase); ?>

                                    </li>
                                </ul>
                            </div>
                        <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
                    </div>
                </div>
            <?php endif; ?>
        </section>
    <?php endif; ?>

    <?php if($service->steps): ?>
        <section class="service-section" style="padding-top: 0;">
            <div class="section-head reveal">
                <span class="section-tag">Our Approach</span>
                <h2 class="section-title" style="font-size: clamp(22px, 3vw, 32px);">From Idea to Impact</h2>
            </div>
            <div class="service-steps">
                <?php $__currentLoopData = $service->steps; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $step): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                    <div class="service-step reveal">
                        <div class="ss-num"><?php echo e(str_pad($loop->iteration, 2, '0', STR_PAD_LEFT)); ?></div>
                        <h4><?php echo e($step['title'] ?? ''); ?></h4>
                        <p><?php echo e($step['desc'] ?? ''); ?></p>
                    </div>
                <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
            </div>
        </section>
    <?php endif; ?>

    <section class="service-section" style="padding-top: 0;">
        <div class="service-cta reveal">
            <h3>Ready to <?php echo e($service->title); ?>?</h3>
            <p>Let's discuss how our proprietary AI model can be deployed for your business — securely, privately, and fast.</p>
            <div class="cta-actions">
                <a href="<?php echo e(route('home')); ?>#contact" class="btn btn-white">
                    Book a Free Consultation
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </a>
                <a href="<?php echo e(route('home')); ?>#products" class="btn btn-outline">Explore Our Products</a>
            </div>
        </div>
    </section>

    <section class="service-section" style="padding-top: 0;">
        <div class="section-head reveal">
            <span class="section-tag">More Services</span>
            <h2 class="section-title" style="font-size: clamp(22px, 3vw, 32px);">Explore Other Services</h2>
        </div>
        <div class="more-services">
            <?php $__currentLoopData = $moreServices; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $s): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                <div class="ms-card reveal">
                    <div class="ms-ic"><?php echo e($s->icon); ?></div>
                    <h4><?php echo e($s->title); ?></h4>
                    <p><?php echo e($s->description); ?></p>
                    <a href="<?php echo e(route('services.show', $s)); ?>">
                        Explore Service
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                    </a>
                </div>
            <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
        </div>
    </section>

<?php $__env->stopSection(); ?>
<?php echo $__env->make('layouts.site', array_diff_key(get_defined_vars(), ['__data' => 1, '__path' => 1]))->render(); ?><?php /**PATH F:\xampp\htdocs\AGM_Web_site\resources\views/services/show.blade.php ENDPATH**/ ?>