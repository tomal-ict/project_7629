<section id="technology" class="section-warm">
    <div class="tech-wrap">
        <div class="section-head center reveal">
            <span class="section-tag"><?php echo e($settings['tech_tag'] ?? 'OUR TECHNOLOGY'); ?></span>
            <h2 class="section-title"><?php echo e($settings['tech_title'] ?? 'Built on Our Own AI Model'); ?></h2>
            <p class="section-desc"><?php echo e($settings['tech_sub'] ?? ''); ?></p>
        </div>

        <div class="tech-domains">
            <?php $__currentLoopData = $techDomains; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $domain): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                <div class="tech-card reveal">
                    <div class="td-ic"><?php echo e($domain->icon); ?></div>
                    <h4><?php echo e($domain->title); ?></h4>
                    <p><?php echo e($domain->description); ?></p>
                </div>
            <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
        </div>

        <div class="tech-table-wrap reveal">
            <div class="section-head center" style="margin-bottom: 28px; margin-top: 20px;">
                <span class="section-tag"><?php echo e($settings['tech_cmp_tag'] ?? 'WHY ABC AI SYSTEM'); ?></span>
                <h2 class="section-title" style="font-size: clamp(24px, 3vw, 36px);"><?php echo e($settings['tech_cmp_title'] ?? 'ABC AI System vs Generic AI'); ?></h2>
            </div>
            <table class="tech-comparison" style="margin: 0 auto;">
                <thead>
                    <tr>
                        <th>Feature</th>
                        <th>ABC AI System</th>
                        <th>Generic AI</th>
                    </tr>
                </thead>
                <tbody>
                    <?php $__currentLoopData = $comparisons; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $cmp): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                        <tr>
                            <td><?php echo e($cmp->feature); ?></td>
                            <td class="us-cell"><?php echo e($cmp->us_value); ?></td>
                            <td class="them-cell"><?php echo e($cmp->them_value); ?></td>
                        </tr>
                    <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
                </tbody>
                <tfoot>
                    <tr>
                        <td>Verdict</td>
                        <td class="us-cell">Deterministic, private & fully yours</td>
                        <td class="them-cell">Black-box, cloud-bound & shared</td>
                    </tr>
                </tfoot>
            </table>
        </div>

        <div class="tech-advantages">
            <?php $__currentLoopData = $advantages; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $adv): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                <div class="adv-card reveal">
                    <div class="adv-ic"><?php echo e($adv->icon); ?></div>
                    <h4><?php echo e($adv->title); ?></h4>
                    <span class="adv-sub"><?php echo e($adv->subtitle); ?></span>
                    <p><?php echo e($adv->description); ?></p>
                </div>
            <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
        </div>
    </div>
</section><?php /**PATH F:\xampp\htdocs\AGM_Web_site\resources\views/partials/sections/technology.blade.php ENDPATH**/ ?>