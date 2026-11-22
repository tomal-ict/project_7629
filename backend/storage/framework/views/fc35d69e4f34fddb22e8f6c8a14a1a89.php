

<?php $__env->startSection('title', $settings['company_tagline'] ?? 'Democratizing Artificial Intelligence'); ?>

<?php $__env->startSection('content'); ?>

    <?php echo $__env->make('partials.sections.hero', array_diff_key(get_defined_vars(), ['__data' => 1, '__path' => 1]))->render(); ?>
    <?php echo $__env->make('partials.sections.stats', ['stats' => $stats], array_diff_key(get_defined_vars(), ['__data' => 1, '__path' => 1]))->render(); ?>
    <?php echo $__env->make('partials.sections.about', [
        'settings' => $settings,
        'coreValues' => $coreValues,
        'clients' => $clients,
        'pilots' => $pilots,
    ], array_diff_key(get_defined_vars(), ['__data' => 1, '__path' => 1]))->render(); ?>
    <?php echo $__env->make('partials.sections.services', [
        'settings' => $settings,
        'services' => $services,
    ], array_diff_key(get_defined_vars(), ['__data' => 1, '__path' => 1]))->render(); ?>
    <?php echo $__env->make('partials.sections.products', [
        'settings' => $settings,
        'products' => $products,
        'moreProducts' => $moreProducts,
    ], array_diff_key(get_defined_vars(), ['__data' => 1, '__path' => 1]))->render(); ?>
    <?php echo $__env->make('partials.sections.technology', [
        'settings' => $settings,
        'techDomains' => $techDomains,
        'comparisons' => $comparisons,
        'advantages' => $advantages,
    ], array_diff_key(get_defined_vars(), ['__data' => 1, '__path' => 1]))->render(); ?>
    <?php echo $__env->make('partials.sections.industries', [
        'settings' => $settings,
        'industries' => $industries,
    ], array_diff_key(get_defined_vars(), ['__data' => 1, '__path' => 1]))->render(); ?>
    <?php echo $__env->make('partials.sections.leadership', [
        'settings' => $settings,
        'advisors' => $advisors,
        'coreTeam' => $coreTeam,
        'founderQuotes' => $founderQuotes,
    ], array_diff_key(get_defined_vars(), ['__data' => 1, '__path' => 1]))->render(); ?>
    <?php echo $__env->make('partials.sections.methodology', [
        'settings' => $settings,
        'methodologies' => $methodologies,
    ], array_diff_key(get_defined_vars(), ['__data' => 1, '__path' => 1]))->render(); ?>
    <?php echo $__env->make('partials.sections.contact', ['settings' => $settings], array_diff_key(get_defined_vars(), ['__data' => 1, '__path' => 1]))->render(); ?>

<?php $__env->stopSection(); ?>
<?php echo $__env->make('layouts.site', array_diff_key(get_defined_vars(), ['__data' => 1, '__path' => 1]))->render(); ?><?php /**PATH D:\xampp\htdocs\1_AGM\project_7629\resources\views/home.blade.php ENDPATH**/ ?>