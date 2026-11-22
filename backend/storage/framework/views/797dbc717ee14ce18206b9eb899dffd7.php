<section id="industries" class="section">
    <div class="industries-wrap">
        <div class="section-head center reveal">
            <span class="section-tag"><?php echo e($settings['industries_tag'] ?? 'COVERAGE'); ?></span>
            <h2 class="section-title"><?php echo e($settings['industries_title'] ?? 'Transforming Every Sector'); ?></h2>
            <p class="section-desc"><?php echo e($settings['industries_sub'] ?? ''); ?></p>
        </div>

        <div class="industries-grid">
            <?php $__currentLoopData = $industries; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $industry): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                <div class="industry-card reveal">
                    <div class="ind-ic"><?php echo e($industry->icon); ?></div>
                    <h4><?php echo e($industry->name); ?></h4>
                </div>
            <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
        </div>
    </div>
</section><?php /**PATH F:\xampp\htdocs\AGM_Web_site\resources\views/partials/sections/industries.blade.php ENDPATH**/ ?>