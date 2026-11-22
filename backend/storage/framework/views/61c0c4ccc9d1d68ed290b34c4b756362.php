<?php
    $initials = fn ($name) => collect(explode(' ', trim($name)))
        ->map(fn ($w) => mb_substr($w, 0, 1))
        ->take(2)->implode('');
?>

<section id="leadership" class="section-alt">
    <div class="leadership-wrap">
        <div class="section-head center reveal">
            <span class="section-tag"><?php echo e($settings['leadership_tag'] ?? 'LEADERSHIP'); ?></span>
            <h2 class="section-title"><?php echo e($settings['leadership_title'] ?? 'The Minds Behind ABC AI System'); ?></h2>
            <p class="section-desc"><?php echo e($settings['leadership_sub'] ?? '6 leaders — Advisors & Core Team'); ?></p>
        </div>

        <div class="reveal">
            <h3 class="leadership-group-title"><?php echo e($settings['advisor_title'] ?? 'Advisory Panel'); ?></h3>
            <div class="member-grid-3">
                <?php $__currentLoopData = $advisors; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $member): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                    <div class="member-card reveal">
                        <div class="member-photo">
                            <span class="avatar-init"><?php echo e($initials($member->name)); ?></span>
                        </div>
                        <div class="member-body">
                            <h4><?php echo e($member->name); ?></h4>
                            <div class="member-role"><?php echo e($member->role); ?></div>
                            <p class="member-bio"><?php echo e($member->bio); ?></p>
                            <?php if($member->tags): ?>
                                <div class="member-tags">
                                    <?php $__currentLoopData = array_slice($member->tags, 0, 3); $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $tag): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                                        <span><?php echo e($tag); ?></span>
                                    <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
                                </div>
                            <?php endif; ?>
                        </div>
                    </div>
                <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
            </div>

            <h3 class="leadership-group-title"><?php echo e($settings['core_title'] ?? 'Core Team'); ?></h3>
            <div class="member-grid-3">
                <?php $__currentLoopData = $coreTeam; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $member): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                    <div class="member-card reveal">
                        <div class="member-photo">
                            <span class="avatar-init"><?php echo e($initials($member->name)); ?></span>
                        </div>
                        <div class="member-body">
                            <h4><?php echo e($member->name); ?></h4>
                            <div class="member-role"><?php echo e($member->role); ?></div>
                            <p class="member-bio"><?php echo e($member->bio); ?></p>
                            <?php if($member->tags): ?>
                                <div class="member-tags">
                                    <?php $__currentLoopData = array_slice($member->tags, 0, 3); $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $tag): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                                        <span><?php echo e($tag); ?></span>
                                    <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
                                </div>
                            <?php endif; ?>
                            <?php if($member->links): ?>
                                <div class="member-links">
                                    <?php $__currentLoopData = $member->links; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $link): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                                        <a href="<?php echo e($link); ?>" target="_blank" rel="noopener"><?php echo e(parse_url($link, PHP_URL_HOST) ?: $link); ?></a>
                                    <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
                                </div>
                            <?php endif; ?>
                        </div>
                    </div>
                <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
            </div>
        </div>

        <?php if(! empty($founderQuotes)): ?>
            <div class="founder-box reveal">
                <span class="fb-quote-mark">"</span>
                <div class="section-head" style="margin-bottom: 18px;">
                    <span class="section-tag"><?php echo e($settings['founder_title'] ?? 'From the Founder'); ?></span>
                </div>
                <blockquote>
                    <?php $__currentLoopData = array_slice($founderQuotes, 0, 2); $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $quote): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                        <p><?php echo e($quote); ?></p>
                    <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
                </blockquote>
                <div class="fb-by">
                    <span class="fb-avatar"><?php echo e($initials($settings['founder_quote_by'] ?? 'Shakhawat Hossain')); ?></span>
                    <div>
                        <strong><?php echo e($settings['founder_quote_by'] ?? 'Shakhawat Hossain, Managing Director'); ?></strong>
                        <span>Founder & Managing Director, ABC AI System Limited</span>
                    </div>
                </div>
            </div>
        <?php endif; ?>
    </div>
</section><?php /**PATH F:\xampp\htdocs\AGM_Web_site\resources\views/partials/sections/leadership.blade.php ENDPATH**/ ?>