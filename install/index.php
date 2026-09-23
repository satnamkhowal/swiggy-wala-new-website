<?php
declare(strict_types=1);

date_default_timezone_set('Asia/Kolkata');
if (session_status() !== PHP_SESSION_ACTIVE) {
    session_start();
}
$configPath = dirname(__DIR__) . '/app/config.php';
$alreadyInstalled = is_file($configPath);
$errors = [];
$success = false;

if (empty($_SESSION['install_csrf'])) {
    $_SESSION['install_csrf'] = bin2hex(random_bytes(32));
}

$defaults = [
    'db_host' => 'localhost', 'db_port' => '3306', 'db_name' => '', 'db_user' => '', 'db_pass' => '',
    'site_url' => ((!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https' : 'http') . '://' . ($_SERVER['HTTP_HOST'] ?? 'swiggywala.com'),
    'business_name' => 'Swiggy Wala Tours and Travel Company', 'business_phone' => '+91 99297 97091',
    'business_email' => 'info@swiggywala.com', 'admin_name' => '', 'admin_email' => '',
];
$data = array_merge($defaults, array_map(static fn($v) => is_string($v) ? trim($v) : $v, $_POST));

if ($_SERVER['REQUEST_METHOD'] === 'POST' && !$alreadyInstalled) {
    if (!hash_equals($_SESSION['install_csrf'], (string)($_POST['csrf_token'] ?? ''))) {
        $errors[] = 'Installer session expired. Refresh the page and try again.';
    }
    foreach (['db_host','db_name','db_user','site_url','business_name','business_phone','admin_name','admin_email','admin_password'] as $required) {
        if (trim((string)($_POST[$required] ?? '')) === '') {
            $errors[] = 'Please complete all required fields.';
            break;
        }
    }
    if (!filter_var($data['admin_email'], FILTER_VALIDATE_EMAIL)) {
        $errors[] = 'Admin email is not valid.';
    }
    if (strlen((string)($_POST['admin_password'] ?? '')) < 10) {
        $errors[] = 'Admin password must be at least 10 characters.';
    }
    if (!filter_var($data['site_url'], FILTER_VALIDATE_URL)) {
        $errors[] = 'Site URL is not valid.';
    }
    if (!is_writable(dirname($configPath))) {
        $errors[] = 'The /app directory is not writable. Temporarily allow PHP to write there, then retry.';
    }

    if (!$errors) {
        try {
            $dsn = sprintf('mysql:host=%s;port=%d;dbname=%s;charset=utf8mb4', $data['db_host'], (int)$data['db_port'], $data['db_name']);
            $pdo = new PDO($dsn, $data['db_user'], (string)($_POST['db_pass'] ?? ''), [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES => false,
            ]);
            $pdo->exec("CREATE TABLE IF NOT EXISTS admins (
                id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(120) NOT NULL,
                email VARCHAR(190) NOT NULL UNIQUE,
                password_hash VARCHAR(255) NOT NULL,
                last_login_at DATETIME NULL,
                created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci");
            $pdo->exec("CREATE TABLE IF NOT EXISTS leads (
                id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                reference VARCHAR(24) NOT NULL UNIQUE,
                name VARCHAR(120) NOT NULL,
                phone VARCHAR(20) NOT NULL,
                email VARCHAR(190) NULL,
                trip_type VARCHAR(60) NOT NULL,
                pickup VARCHAR(180) NOT NULL,
                dropoff VARCHAR(180) NOT NULL,
                pickup_date DATE NOT NULL,
                pickup_time TIME NULL,
                return_date DATE NULL,
                vehicle VARCHAR(80) NULL,
                passengers SMALLINT UNSIGNED NOT NULL DEFAULT 1,
                notes TEXT NULL,
                source VARCHAR(80) NOT NULL DEFAULT 'website',
                status VARCHAR(30) NOT NULL DEFAULT 'new',
                ip_hash CHAR(64) NOT NULL,
                user_agent VARCHAR(255) NULL,
                created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                INDEX idx_leads_status_created (status, created_at),
                INDEX idx_leads_phone (phone),
                INDEX idx_leads_pickup_date (pickup_date),
                INDEX idx_leads_ip_created (ip_hash, created_at)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci");
            $pdo->exec("CREATE TABLE IF NOT EXISTS settings (
                setting_key VARCHAR(120) PRIMARY KEY,
                setting_value TEXT NULL,
                updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci");

            $admin = $pdo->prepare('INSERT INTO admins (name, email, password_hash) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE name=VALUES(name), password_hash=VALUES(password_hash)');
            $admin->execute([$data['admin_name'], strtolower($data['admin_email']), password_hash((string)$_POST['admin_password'], PASSWORD_DEFAULT)]);

            $settings = [
                'name' => $data['business_name'],
                'phone' => $data['business_phone'],
                'email' => $data['business_email'],
                'site_url' => rtrim($data['site_url'], '/'),
            ];
            $upsert = $pdo->prepare('INSERT INTO settings (setting_key, setting_value) VALUES (?, ?) ON DUPLICATE KEY UPDATE setting_value=VALUES(setting_value)');
            foreach ($settings as $key => $value) {
                $upsert->execute([$key, $value]);
            }

            $config = [
                'app_key' => bin2hex(random_bytes(32)),
                'site_url' => rtrim($data['site_url'], '/'),
                'database' => [
                    'host' => $data['db_host'], 'port' => (int)$data['db_port'], 'name' => $data['db_name'],
                    'user' => $data['db_user'], 'password' => (string)($_POST['db_pass'] ?? ''),
                ],
                'business' => ['name' => $data['business_name'], 'phone' => $data['business_phone'], 'email' => $data['business_email']],
            ];
            $written = file_put_contents($configPath, "<?php\nreturn " . var_export($config, true) . ";\n", LOCK_EX);
            if ($written === false) {
                throw new RuntimeException('Could not write app/config.php.');
            }
            @chmod($configPath, 0640);
            $success = true;
            $alreadyInstalled = true;
        } catch (Throwable $e) {
            $errors[] = 'Setup failed: ' . $e->getMessage();
        }
    }
}
?>
<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Install Swiggy Wala Website</title>
<link rel="stylesheet" href="/main-home/assets/css/bootstrap.min.css"><link rel="stylesheet" href="/assets/css/swiggy-wala.css"><link rel="stylesheet" href="/assets/css/app.css"></head>
<body class="sw-system-page"><main class="container py-5"><div class="sw-system-card mx-auto">
<span class="sw-eyebrow">Website setup</span><h1>Swiggy Wala Installer</h1><p class="text-muted">Connect MySQL, configure business details and create the first lead-panel administrator.</p>
<?php if ($success): ?><div class="alert alert-success">Installation completed. Your booking form and lead panel are ready.</div><div class="d-flex gap-2 flex-wrap"><a class="sw-btn" href="/admin/">Open Lead Panel</a><a class="sw-btn-outline" href="/">Open Website</a></div>
<?php elseif ($alreadyInstalled): ?><div class="alert alert-info">This website is already installed. The installer is locked while <code>app/config.php</code> exists.</div><div class="d-flex gap-2 flex-wrap"><a class="sw-btn" href="/admin/">Open Lead Panel</a><a class="sw-btn-outline" href="/">Open Website</a></div>
<?php else: ?>
<?php foreach ($errors as $error): ?><div class="alert alert-danger"><?= htmlspecialchars($error, ENT_QUOTES, 'UTF-8') ?></div><?php endforeach; ?>
<form method="post" class="mt-4"><input type="hidden" name="csrf_token" value="<?= htmlspecialchars($_SESSION['install_csrf'], ENT_QUOTES, 'UTF-8') ?>">
<h2 class="h4 mt-2">1. Database</h2><p class="text-muted small">Create an empty MySQL database/user in Hostinger first, then enter the credentials here.</p><div class="row g-3">
<div class="col-md-8"><label class="form-label">DB Host *</label><input class="form-control" name="db_host" value="<?= htmlspecialchars($data['db_host']) ?>" required></div><div class="col-md-4"><label class="form-label">Port *</label><input class="form-control" name="db_port" value="<?= htmlspecialchars($data['db_port']) ?>" required></div>
<div class="col-md-6"><label class="form-label">Database name *</label><input class="form-control" name="db_name" value="<?= htmlspecialchars($data['db_name']) ?>" required></div><div class="col-md-6"><label class="form-label">Database user *</label><input class="form-control" name="db_user" value="<?= htmlspecialchars($data['db_user']) ?>" required></div><div class="col-12"><label class="form-label">Database password</label><input class="form-control" type="password" name="db_pass"></div></div>
<h2 class="h4 mt-4">2. Website</h2><div class="row g-3"><div class="col-12"><label class="form-label">Site URL *</label><input class="form-control" name="site_url" value="<?= htmlspecialchars($data['site_url']) ?>" required></div><div class="col-md-6"><label class="form-label">Business name *</label><input class="form-control" name="business_name" value="<?= htmlspecialchars($data['business_name']) ?>" required></div><div class="col-md-3"><label class="form-label">Phone *</label><input class="form-control" name="business_phone" value="<?= htmlspecialchars($data['business_phone']) ?>" required></div><div class="col-md-3"><label class="form-label">Email</label><input class="form-control" type="email" name="business_email" value="<?= htmlspecialchars($data['business_email']) ?>"></div></div>
<h2 class="h4 mt-4">3. Lead panel admin</h2><div class="row g-3"><div class="col-md-4"><label class="form-label">Admin name *</label><input class="form-control" name="admin_name" value="<?= htmlspecialchars($data['admin_name']) ?>" required></div><div class="col-md-4"><label class="form-label">Admin email *</label><input class="form-control" type="email" name="admin_email" value="<?= htmlspecialchars($data['admin_email']) ?>" required></div><div class="col-md-4"><label class="form-label">Admin password *</label><input class="form-control" type="password" name="admin_password" minlength="10" required><div class="form-text">Minimum 10 characters.</div></div></div>
<div class="d-grid mt-4"><button class="sw-btn border-0" type="submit">Install & Configure</button></div></form><?php endif; ?>
</div></main></body></html>
