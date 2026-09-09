<div class="a-card">
    <div class="a-card-head">
        <h2><?php echo e($item ? 'Edit Setting' : 'New Setting'); ?></h2>
        <a href="<?php echo e(route('admin.settings.index')); ?>" class="a-btn">← Back</a>
    </div>
    <div class="a-card-body">
        <form method="POST" class="a-form" action="<?php echo e($item ? route('admin.settings.update', $item) : route('admin.settings.store')); ?>">
            <?php echo csrf_field(); ?>
            <?php if($item): ?> <?php echo method_field('PATCH'); ?> <?php endif; ?>

            <div class="a-form-grid">
                <?php if($item): ?>
                    <div class="a-field">
                        <label>Key</label>
                        <input type="text" value="<?php echo e($item->key); ?>" disabled>
                    </div>
                    <div class="a-field">
                        <label>Group</label>
                        <input type="text" value="<?php echo e($item->group); ?>" disabled>
                    </div>
                <?php else: ?>
                    <div class="a-field">
                        <label>Key <span class="req">*</span></label>
                        <input type="text" name="key" value="<?php echo e(old('key')); ?>" placeholder="hero_badge" required>
                        <?php $__errorArgs = ['key'];
$__bag = $errors->getBag($__errorArgs[1] ?? 'default');
if ($__bag->has($__errorArgs[0])) :
if (isset($message)) { $__messageOriginal = $message; }
$message = $__bag->first($__errorArgs[0]); ?> <div class="a-err"><?php echo e($message); ?></div> <?php unset($message);
if (isset($__messageOriginal)) { $message = $__messageOriginal; }
endif;
unset($__errorArgs, $__bag); ?>
                    </div>
                    <div class="a-field">
                        <label>Group <span class="req">*</span></label>
                        <input type="text" name="group" value="<?php echo e(old('group', 'general')); ?>" placeholder="general" required>
                        <?php $__errorArgs = ['group'];
$__bag = $errors->getBag($__errorArgs[1] ?? 'default');
if ($__bag->has($__errorArgs[0])) :
if (isset($message)) { $__messageOriginal = $message; }
$message = $__bag->first($__errorArgs[0]); ?> <div class="a-err"><?php echo e($message); ?></div> <?php unset($message);
if (isset($__messageOriginal)) { $message = $__messageOriginal; }
endif;
unset($__errorArgs, $__bag); ?>
                    </div>
                <?php endif; ?>
                <div class="a-field full">
                    <label>Value</label>
                    <textarea name="value"><?php echo e(old('value', $item->value ?? '')); ?></textarea>
                    <div class="a-hint">Plain text, or JSON if the setting stores structured data.</div>
                </div>
            </div>

            <div>
                <button class="a-btn primary"><?php echo e($item ? 'Update' : 'Create'); ?> Setting</button>
            </div>
        </form>
    </div>
</div><?php /**PATH F:\xampp\htdocs\AGM_Web_site\resources\views/admin/settings/_form.blade.php ENDPATH**/ ?>