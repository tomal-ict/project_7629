<?php $__env->startSection('title', 'Site Settings'); ?>

<?php $__env->startSection('content'); ?>
<div class="a-card">
    <div class="a-card-head">
        <h2>Site Settings</h2>
        <a href="<?php echo e(route('admin.settings.create')); ?>" class="a-btn primary">+ New Setting</a>
    </div>
    <div class="a-card-body" style="display:grid; gap:24px;">
        <?php $__empty_1 = true; $__currentLoopData = $settings; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $group => $items): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); $__empty_1 = false; ?>
            <div>
                <h3 style="font-size:12px; font-weight:800; letter-spacing:1.5px; text-transform:uppercase; color:#0891b2; margin-bottom:10px;"><?php echo e($group); ?></h3>
                <div class="a-table-wrap" style="border:1px solid var(--line); border-radius:12px; overflow:hidden;">
                    <table class="a-table">
                        <tbody>
                            <?php $__currentLoopData = $items; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $setting): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                                <tr>
                                    <td style="width:32%;" class="a-muted"><strong style="color:#334155;"><?php echo e($setting->key); ?></strong></td>
                                    <td style="word-break:break-word;"><?php echo e(\Illuminate\Support\Str::limit($setting->value, 90)); ?></td>
                                    <td style="white-space:nowrap; width:150px;">
                                        <div class="a-actions">
                                            <a href="<?php echo e(route('admin.settings.edit', $setting)); ?>" class="a-btn sm">Edit</a>
                                            <form method="POST" action="<?php echo e(route('admin.settings.destroy', $setting)); ?>" onsubmit="return confirm('Delete this setting?');">
                                                <?php echo csrf_field(); ?> <?php echo method_field('DELETE'); ?>
                                                <button class="a-btn sm danger">Delete</button>
                                            </form>
                                        </div>
                                    </td>
                                </tr>
                            <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
                        </tbody>
                    </table>
                </div>
            </div>
        <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); if ($__empty_1): ?>
            <p class="a-empty">No settings yet.</p>
        <?php endif; ?>
    </div>
</div>
<?php $__env->stopSection(); ?>
<?php echo $__env->make('layouts.admin', array_diff_key(get_defined_vars(), ['__data' => 1, '__path' => 1]))->render(); ?><?php /**PATH F:\xampp\htdocs\AGM_Web_site\resources\views/admin/settings/index.blade.php ENDPATH**/ ?>