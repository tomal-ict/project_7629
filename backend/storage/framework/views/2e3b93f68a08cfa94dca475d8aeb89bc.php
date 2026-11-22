<?php
    $kind = $demo['kind'] ?? 'generic';
    $sidebar = $demo['sidebar'] ?? [];
?>

<div class="demo-window">
    <div class="demo-titlebar">
        <span class="d-dot r"></span>
        <span class="d-dot y"></span>
        <span class="d-dot g"></span>
        <span><?php echo e($demo['title'] ?? $productName); ?></span>
    </div>

    <div class="demo-body">
        <?php if($sidebar): ?>
            <div class="demo-sidebar">
                <?php $__currentLoopData = $sidebar; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $i => $item): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                    <span <?php if($i === 0): ?> class="on" <?php endif; ?>><?php echo e($item); ?></span>
                <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
            </div>
        <?php endif; ?>

        <div class="demo-main">
            <?php if($kind === 'pulse'): ?>
                <?php if(! empty($demo['chartLabel'])): ?>
                    <div class="demo-label"><?php echo e($demo['chartLabel']); ?></div>
                    <div class="demo-hbars">
                        <div class="demo-hbar" style="height: 62%"></div>
                        <div class="demo-hbar" style="height: 84%"></div>
                        <div class="demo-hbar" style="height: 48%"></div>
                        <div class="demo-hbar" style="height: 96%"></div>
                        <div class="demo-hbar" style="height: 70%"></div>
                    </div>
                <?php endif; ?>
                <?php if(! empty($demo['topItems'])): ?>
                    <div class="demo-label" style="margin-top: 4px;"><?php echo e($demo['topLabel']); ?></div>
                    <div class="demo-rows">
                        <?php $__currentLoopData = array_slice($demo['topItems'], 0, 4); $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $item): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                            <div class="demo-row">
                                <span><?php echo e($item[0]); ?></span>
                                <span class="dr-set"><?php echo e($item[1]); ?></span>
                            </div>
                        <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
                    </div>
                <?php endif; ?>
            <?php elseif($kind === 'clerk' && ! empty($demo['files'])): ?>
                <div class="demo-label">Documents</div>
                <div class="demo-rows">
                    <?php $__currentLoopData = array_slice($demo['files'], 0, 4); $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $file): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                        <div class="demo-row">
                            <span class="dr-file">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/></svg>
                                <span><?php echo e($file); ?></span>
                            </span>
                            <span class="dr-set">Extracted</span>
                        </div>
                    <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
                </div>
                <?php if(! empty($demo['steps'])): ?>
                    <div class="demo-chips">
                        <?php $__currentLoopData = $demo['steps']; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $step): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                            <span class="demo-chip"><?php echo e($step); ?></span>
                        <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
                    </div>
                <?php endif; ?>
            <?php elseif($kind === 'dotlog' && ! empty($demo['entries'])): ?>
                <div class="demo-label"><?php echo e($demo['subtitle'] ?? 'Real-time logs'); ?></div>
                <table class="demo-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Time</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php $__currentLoopData = array_slice($demo['entries'], 0, 4); $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $entry): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                            <tr>
                                <td><?php echo e($entry[0]); ?></td>
                                <td><?php echo e($entry[1]); ?></td>
                                <td><?php echo e($entry[2]); ?></td>
                                <td><span class="demo-status"><?php echo e($entry[3]); ?></span></td>
                            </tr>
                        <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
                    </tbody>
                </table>
            <?php elseif($kind === 'lightocr' && ! empty($demo['docs'])): ?>
                <div class="demo-label">Processed documents</div>
                <div class="demo-rows">
                    <?php $__currentLoopData = array_slice($demo['docs'], 0, 4); $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $doc): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                        <div class="demo-row">
                            <span class="dr-file">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/></svg>
                                <span><?php echo e($doc); ?></span>
                            </span>
                            <span class="dr-set">Posted</span>
                        </div>
                    <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
                </div>
            <?php elseif($kind === 'moina' && ! empty($demo['messages'])): ?>
                <div class="demo-voices">
                    <?php $__currentLoopData = array_slice($demo['messages'], 0, 3); $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $msg): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                        <div class="demo-msg user"><?php echo e($msg); ?></div>
                    <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
                </div>
                <?php if(! empty($demo['items'])): ?>
                    <div class="demo-bubbles" style="margin-top: 6px;">
                        <?php $__currentLoopData = $demo['items']; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $item): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                            <div class="demo-bubble">
                                <span class="db-dot" style="background: <?php echo e(str_contains($item[1], 'active') ? '#34d399' : (str_contains($item[1], 'generated') ? '#fbbf24' : '#38bdf8')); ?>;"></span>
                                <?php echo e($item[0]); ?>

                                <span class="db-val"><?php echo e($item[1]); ?></span>
                            </div>
                        <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
                    </div>
                <?php endif; ?>
            <?php elseif($kind === 'bms' && ! empty($demo['protocols'])): ?>
                <div class="demo-label"><?php echo e($demo['subtitle'] ?? 'Open protocols'); ?></div>
                <div class="demo-chips">
                    <?php $__currentLoopData = $demo['protocols']; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $proto): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                        <span class="demo-chip"><?php echo e($proto); ?></span>
                    <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
                </div>
                <div class="demo-tags" style="margin-top: 6px;">
                    <div class="demo-tag"><span>Ethernet backbone</span><span class="dt-v">Online</span></div>
                    <div class="demo-tag"><span>Energy metering</span><span class="dt-v">Live</span></div>
                    <div class="demo-tag"><span>Lighting zones</span><span class="dt-v">8</span></div>
                </div>
            <?php else: ?>
                <div class="demo-label">Powered by Proprietary AI</div>
                <div class="demo-rows">
                    <div class="demo-row"><span>Model</span><span class="dr-set">Own · 0% hallucinations</span></div>
                    <div class="demo-row"><span>Deployment</span><span class="dr-set">On-premise</span></div>
                    <div class="demo-row"><span>Privacy</span><span class="dr-set">100% sovereign</span></div>
                </div>
            <?php endif; ?>
        </div>
    </div>
</div><?php /**PATH D:\xampp\htdocs\1_AGM\project_7629\resources\views/partials/sections/product-demo.blade.php ENDPATH**/ ?>