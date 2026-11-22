<section class="hero" id="top">
    <div class="hero-grid">
        <div class="hero-copy">
            <div class="hero-badge">
                <span class="hero-badge-dot"></span>
                <span><?php echo e($settings['hero_badge'] ?? 'Pioneering Proprietary AI from Bangladesh'); ?></span>
            </div>

            <h1 class="hero-title">
                <span class="hero-title-word"><?php echo e($settings['hero_title_1'] ?? 'Democratizing'); ?></span>
                <span class="hero-title-word"><?php echo e($settings['hero_title_2'] ?? 'Artificial'); ?></span>
                <span class="hero-title-word hero-rainbow"><?php echo e($settings['hero_title_3'] ?? 'Intelligence'); ?></span>
            </h1>

            <p class="hero-sub"><?php echo e($settings['hero_sub'] ?? ''); ?></p>

            <div class="hero-actions">
                <a href="<?php echo e(route('home')); ?>#products" class="btn">
                    <?php echo e($settings['hero_cta_primary'] ?? 'See Our Products'); ?>

                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </a>
                <a href="<?php echo e(route('home')); ?>#contact" class="btn-outline"><?php echo e($settings['hero_cta_secondary'] ?? 'Book a Demo'); ?></a>
            </div>
        </div>

        <div class="hero-brain-wrap">
            <div class="hero-brain">
                <span class="hero-ring r1"></span>
                <span class="hero-ring r2"></span>
                <span class="hero-ring r3"></span>
                <span class="hero-scan"></span>
                <span class="hero-orb o1"></span>
                <span class="hero-orb o2"></span>
                <span class="hero-orb o3"></span>
                <span class="hero-orb o4"></span>

                <div class="hero-brain-core">
                    <canvas
                        class="hero-neural-canvas"
                        id="ai-core-canvas"
                        aria-hidden="true"
                    ></canvas>
                    <span class="ai-core-label">AI&nbsp;CORE</span>
                    <span class="ai-core-status"><span class="ai-dot"></span> ONLINE</span>
                    <span class="ai-metric m1"><b class="ai-metric-key">NODES</b><i class="ai-metric-val" data-nodes>0</i></span>
                    <span class="ai-metric m2"><b class="ai-metric-key">LOAD</b><i class="ai-metric-val" data-load>0%</i></span>
                    <span class="ai-metric m3"><b class="ai-metric-key">SYNC</b><i class="ai-metric-val" data-sync>0<span>ms</span></i></span>
                </div>

                <span class="hero-float-badge b1"><span class="dot"></span> 0% Hallucinations</span>
                <span class="hero-float-badge b2"><span class="dot"></span> 100% Data Privacy</span>
                <span class="hero-float-badge b3"><span class="dot"></span> Built in Bangladesh</span>
                <span class="hero-float-badge b4"><span class="dot"></span> No Pre-trained Models</span>
                <span class="hero-float-badge b5"><span class="dot"></span> 15+ AI Products</span>
            </div>
        </div>
    </div>

    <div class="hero-scroll">
        Scroll
        <span class="hero-scroll-arrow"></span>
    </div>
</section><?php /**PATH F:\xampp\htdocs\AGM_Web_site\resources\views/partials/sections/hero.blade.php ENDPATH**/ ?>