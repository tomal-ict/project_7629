<?php $__env->startSection('title', 'Dashboard'); ?>

<?php $__env->startSection('content'); ?>

    <div class="a-grid">
        <div class="a-stat">
            <div class="v"><?php echo e($servicesCount); ?></div>
            <div class="l">Services</div>
        </div>
        <div class="a-stat">
            <div class="v"><?php echo e($productsCount); ?></div>
            <div class="l">Products</div>
        </div>
        <div class="a-stat">
            <div class="v"><?php echo e($teamCount); ?></div>
            <div class="l">Team Members</div>
        </div>
        <div class="a-stat">
            <div class="v"><?php echo e($clientsCount); ?></div>
            <div class="l">Clients & Pilots</div>
        </div>
        <div class="a-stat">
            <div class="v"><?php echo e($unreadMessages); ?></div>
            <div class="l">Unread Messages</div>
        </div>
        <div class="a-stat">
            <div class="v"><?php echo e($settingsCount); ?></div>
            <div class="l">Site Settings</div>
        </div>
        <div class="a-stat">
            <div class="v"><?php echo e(\App\Models\Statistic::count()); ?></div>
            <div class="l">Statistics</div>
        </div>
        <div class="a-stat">
            <div class="v"><?php echo e(\App\Models\Industry::count()); ?></div>
            <div class="l">Industries</div>
        </div>
    </div>

    <div class="a-card">
        <div class="a-card-head">
            <h2>Recent Messages</h2>
            <a href="<?php echo e(route('admin.messages.index')); ?>" class="a-btn sm">View All</a>
        </div>
        <div class="a-card-body">
            <?php $__empty_1 = true; $__currentLoopData = $recentMessages; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $msg): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); $__empty_1 = false; ?>
                <div class="a-msg <?php if(! $msg->is_read): ?> unread <?php endif; ?>">
                    <div class="a-msg-head">
                        <span class="who"><?php echo e($msg->name); ?></span>
                        <span class="mail"><?php echo e($msg->email); ?></span>
                        <?php if(! $msg->is_read): ?> <span class="a-pill blue">New</span> <?php endif; ?>
                        <span class="time"><?php echo e($msg->created_at->diffForHumans()); ?></span>
                    </div>
                    <p class="a-msg-body"><?php echo e($msg->message); ?></p>
                </div>
            <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); if ($__empty_1): ?>
                <p class="a-empty">No messages yet.</p>
            <?php endif; ?>
        </div>
    </div>

<?php $__env->stopSection(); ?>
<?php echo $__env->make('layouts.admin', array_diff_key(get_defined_vars(), ['__data' => 1, '__path' => 1]))->render(); ?><?php /**PATH F:\xampp\htdocs\AGM_Web_site\resources\views/admin/dashboard.blade.php ENDPATH**/ ?>