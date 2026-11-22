<section id="methodology" class="section-warm">
    <div class="methodology-wrap">
        <div class="section-head center reveal">
            <span class="section-tag"><?php echo e($settings['method_tag'] ?? 'HOW WE WORK'); ?></span>
            <h2 class="section-title"><?php echo e($settings['method_title'] ?? 'Research-Driven Approach'); ?></h2>
            <p class="section-desc"><?php echo e($settings['method_sub'] ?? ''); ?></p>
        </div>

        <div class="methodology-steps">
            <?php $__currentLoopData = $methodologies; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $i => $method): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                <div class="methodology-card reveal">
                    <div class="step-num"><?php echo e(str_pad($loop->iteration, 2, '0', STR_PAD_LEFT)); ?></div>
                    <div class="step-ic"><?php echo e($method->icon); ?></div>
                    <h4><?php echo e($method->title); ?></h4>
                    <p><?php echo e($method->description); ?></p>
                </div>
            <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
        </div>
    </div>
</section><?php /**PATH F:\xampp\htdocs\AGM_Web_site\resources\views/partials/sections/methodology.blade.php ENDPATH**/ ?>