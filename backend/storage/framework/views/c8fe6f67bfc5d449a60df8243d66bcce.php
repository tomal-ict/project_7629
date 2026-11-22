<section id="products" class="section products-section">
    <div class="products-head">
        <div class="section-head center reveal">
            <span class="section-tag"><?php echo e($settings['products_tag'] ?? 'PRODUCT PORTFOLIO'); ?></span>
            <h2 class="section-title"><?php echo e($settings['products_title'] ?? 'Our Flagship AI Products'); ?></h2>
            <p class="section-desc"><?php echo e($settings['products_sub'] ?? ''); ?></p>
        </div>
    </div>

    <div class="product-slider reveal" data-slider data-auto="8000">
        <?php $__currentLoopData = $products; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $product): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
            <div class="product-slide <?php if($loop->first): ?> active <?php endif; ?>">
                <div class="product-slide-grid">
                    <div class="product-copy">
                        <span class="pc-tag"><?php echo e($product->tag); ?></span>
                        <h3><?php echo e($product->name); ?></h3>
                        <?php if($product->metric): ?>
                            <div class="pc-metric"><?php echo e($product->metric); ?></div>
                        <?php endif; ?>
                        <p><?php echo e($product->description); ?></p>
                        <?php if($product->features): ?>
                            <ul class="product-features">
                                <?php $__currentLoopData = array_slice($product->features, 0, 4); $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $feature): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                                    <li>
                                        <svg class="pf-ic" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                                        <?php echo e($feature); ?>

                                    </li>
                                <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
                            </ul>
                        <?php endif; ?>
                    </div>

                    <div class="product-demo">
                        <?php echo $__env->make('partials.sections.product-demo', ['demo' => $product->demo, 'productName' => $product->name], array_diff_key(get_defined_vars(), ['__data' => 1, '__path' => 1]))->render(); ?>
                    </div>
                </div>
            </div>
        <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>

        <div class="slide-controls">
            <button class="slide-btn slide-prev" aria-label="Previous product">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>
            </button>
            <div class="slide-dots">
                <?php $__currentLoopData = $products; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $product): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                    <button class="slide-dot <?php if($loop->first): ?> active <?php endif; ?>" aria-label="Go to product <?php echo e($loop->iteration); ?>"></button>
                <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
            </div>
            <span class="product-counter"></span>
            <button class="slide-btn slide-next" aria-label="Next product">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </button>
        </div>
    </div>

    <?php
    $mpIcons = [
        'Blens' => '🎙️', 'Sohojogi' => '🗣️', 'Booking Model' => '🧾',
        'Proxy Eye' => '👁️', 'Validex AI' => '📜', 'AgroRx' => '🌾',
    ];
?>
<?php if($moreProducts->count()): ?>
<div class="more-products-wrap" style="margin-top: 56px;">
        <div class="more-products-inner reveal">
            <div class="section-head center" style="margin-bottom: 0;">
                <span class="section-tag"><?php echo e($settings['more_products_tag'] ?? 'MORE PRODUCTS'); ?></span>
                <h2 class="section-title" style="font-size: clamp(24px, 3vw, 34px);"><?php echo e($settings['more_products_title'] ?? '6 More Powerful Solutions'); ?></h2>
            </div>
            <div class="more-products-grid">
                <?php $__currentLoopData = $moreProducts; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $product): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                    <div class="mp-card">
                        <div class="mp-logo"><?php echo e($mpIcons[$product->name] ?? '🧩'); ?></div>
                        <h4><?php echo e($product->name); ?></h4>
                        <?php if($product->tag): ?>
                            <span class="mp-tag"><?php echo e($product->tag); ?></span>
                        <?php endif; ?>
                        <p><?php echo e($product->description); ?></p>
                        <a href="<?php echo e(route('home')); ?>#contact">
                            Learn More
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                        </a>
                    </div>
                <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
            </div>
        </div>
    </div>
<?php endif; ?>
</section><?php /**PATH F:\xampp\htdocs\AGM_Web_site\resources\views/partials/sections/products.blade.php ENDPATH**/ ?>