<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="<?php echo e($settings['hero_sub'] ?? 'Pioneering Proprietary AI from Bangladesh. Empowering businesses with proprietary AI solutions — no third-party LLMs, zero hallucinations, and absolute data privacy.'); ?>">
    <meta name="csrf-token" content="<?php echo e(csrf_token()); ?>">
    <title><?php echo $__env->yieldContent('title', $settings['company_tagline'] ?? 'ABC AI System Limited'); ?> — <?php echo e($settings['company_name'] ?? 'ABC AI System Limited'); ?></title>
    <link rel="icon" href="<?php echo e(asset('images/logo.svg')); ?>" type="image/svg+xml">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="<?php echo e(asset('css/site-base.css')); ?>">
    <link rel="stylesheet" href="<?php echo e(asset('css/site-nav-hero.css')); ?>?v=4">
    <link rel="stylesheet" href="<?php echo e(asset('css/site-sections.css')); ?>">
    <link rel="stylesheet" href="<?php echo e(asset('css/site-extra.css')); ?>">
</head>
<body class="<?php echo $__env->yieldContent('body_class', 'home'); ?>">

    <?php echo $__env->make('partials.header', array_diff_key(get_defined_vars(), ['__data' => 1, '__path' => 1]))->render(); ?>

    <main>
        <?php echo $__env->yieldContent('content'); ?>
    </main>

    <?php echo $__env->make('partials.footer', array_diff_key(get_defined_vars(), ['__data' => 1, '__path' => 1]))->render(); ?>

    <button class="back-to-top" aria-label="Back to top">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5"/><path d="m5 12 7-7 7 7"/></svg>
    </button>

    <script src="<?php echo e(asset('js/site.js')); ?>"></script>
    <script src="<?php echo e(asset('js/hero-neural.js')); ?>?v=4"></script>
</body>
</html><?php /**PATH F:\xampp\htdocs\AGM_Web_site\resources\views/layouts/site.blade.php ENDPATH**/ ?>