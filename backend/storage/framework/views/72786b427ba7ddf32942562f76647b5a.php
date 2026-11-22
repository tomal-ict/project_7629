<div class="stats-band">
    <?php $__currentLoopData = $stats; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $stat): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
        <div class="stat-card reveal">
            <div class="stat-value"
                 data-target="<?php echo e(preg_replace('/[^\d.]/', '', $stat->value)); ?>"
                 data-prefix=""
                 data-suffix="<?php echo e(preg_replace('/[\d.]/', '', $stat->value)); ?>">
                <?php echo e($stat->value); ?>

            </div>
            <div class="stat-label"><?php echo e($stat->label); ?></div>
            <?php if($stat->sub): ?>
                <div class="stat-sub"><?php echo e($stat->sub); ?></div>
            <?php endif; ?>
        </div>
    <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
</div><?php /**PATH F:\xampp\htdocs\AGM_Web_site\resources\views/partials/sections/stats.blade.php ENDPATH**/ ?>