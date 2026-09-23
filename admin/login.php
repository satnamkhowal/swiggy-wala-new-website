<?php
declare(strict_types=1);
require_once __DIR__ . '/../app/bootstrap.php';
if (!sw_installed()) { header('Location: /install/'); exit; }
if (sw_admin_id()) { header('Location: /admin/'); exit; }
$error = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!sw_verify_csrf($_POST['csrf_token'] ?? null)) {
        $error = 'Session expired. Please try again.';
    } else {
        $email = strtolower(trim((string)($_POST['email'] ?? '')));
        $password = (string)($_POST['password'] ?? '');
        $stmt = sw_db()->prepare('SELECT id, password_hash FROM admins WHERE email = ? LIMIT 1');
        $stmt->execute([$email]);
        $admin = $stmt->fetch();
        if ($admin && password_verify($password, $admin['password_hash'])) {
            session_regenerate_id(true);
            $_SESSION['admin_id'] = (int)$admin['id'];
            $update = sw_db()->prepare('UPDATE admins SET last_login_at = NOW() WHERE id = ?');
            $update->execute([(int)$admin['id']]);
            header('Location: /admin/'); exit;
        }
        usleep(350000);
        $error = 'Invalid email or password.';
    }
}
?>
<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Lead Panel Login | Swiggy Wala</title><link rel="stylesheet" href="/main-home/assets/css/bootstrap.min.css"><link rel="stylesheet" href="/assets/css/swiggy-wala.css"><link rel="stylesheet" href="/assets/css/app.css"></head><body class="sw-system-page"><main class="container py-5"><div class="sw-login-card mx-auto"><span class="sw-eyebrow">Secure admin</span><h1 class="h2">Lead Panel Login</h1><p class="text-muted">Manage taxi booking requests from the website.</p><?php if ($error): ?><div class="alert alert-danger"><?= sw_e($error) ?></div><?php endif; ?><form method="post"><input type="hidden" name="csrf_token" value="<?= sw_e(sw_csrf_token()) ?>"><div class="mb-3"><label class="form-label">Email</label><input class="form-control" type="email" name="email" autocomplete="username" required></div><div class="mb-3"><label class="form-label">Password</label><input class="form-control" type="password" name="password" autocomplete="current-password" required></div><div class="d-grid"><button class="sw-btn border-0" type="submit">Sign In</button></div></form><p class="small mt-3 mb-0"><a href="/">← Back to website</a></p></div></main></body></html>
