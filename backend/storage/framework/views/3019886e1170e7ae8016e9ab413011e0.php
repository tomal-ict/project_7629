<section id="services" class="section-alt">
    <div class="services-wrap">
        <div class="section-head center reveal">
            <span class="section-tag"><?php echo e($settings['services_tag'] ?? 'SERVICES'); ?></span>
            <h2 class="section-title"><?php echo e($settings['services_title'] ?? 'What We Do For You'); ?></h2>
            <p class="section-desc"><?php echo e($settings['services_sub'] ?? ''); ?></p>
        </div>

        <div class="services-panel reveal" data-services-panel>
            <div class="services-tabs">
                <?php $__currentLoopData = $services; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $i => $service): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                    <button type="button" class="service-tab <?php if($loop->first): ?> active <?php endif; ?>" data-tab="<?php echo e($loop->index); ?>">
                        <span class="st-num"><?php echo e(str_pad($loop->iteration, 2, '0', STR_PAD_LEFT)); ?></span>
                        <span class="st-ic"><?php echo e($service->icon); ?></span>
                        <span class="st-title"><?php echo e($service->title); ?></span>
                    </button>
                <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
            </div>

            <div class="service-content">
                <?php $__currentLoopData = $services; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $service): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                    <div class="service-content-pane" data-pane="<?php echo e($loop->index); ?>" <?php if(! $loop->first): ?> style="display:none;" <?php endif; ?>>
                        <div class="service-content-inner">
                            <div class="service-content-kicker"><?php echo e($service->subtitle); ?></div>
                            <h3><?php echo e($service->title); ?></h3>
                            <p class="sc-desc"><?php echo e($service->description); ?></p>

                            <div class="what-you-get-title">What You Get</div>
                            <ul class="wyg-list">
                                <?php $__currentLoopData = array_slice($service->features ?? [], 0, 4); $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $feature): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                                    <li>
                                        <span class="ck">
                                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                                        </span>
                                        <?php echo e($feature); ?>

                                    </li>
                                <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
                            </ul>

                            <div class="services-more">
                                <a href="<?php echo e(route('services.show', $service)); ?>" class="btn">
                                    Learn More
                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                                </a>
                                <a href="<?php echo e(route('home')); ?>#contact" class="go-link">
                                    <?php echo e($settings['services_cta'] ?? 'Get a Free Consultation'); ?>

                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                                </a>
                            </div>
                        </div>
                    </div>
                <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
            </div>
        </div>
    </div>
</section><?php /**PATH D:\xampp\htdocs\1_AGM\project_7629\resources\views/partials/sections/services.blade.php ENDPATH**/ ?>