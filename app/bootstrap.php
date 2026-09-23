<?php
declare(strict_types=1);

date_default_timezone_set('Asia/Kolkata');
ini_set('session.use_strict_mode', '1');
if (session_status() !== PHP_SESSION_ACTIVE) {
    session_set_cookie_params([
        'lifetime' => 0,
        'path' => '/',
        'secure' => !empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off',
        'httponly' => true,
        'samesite' => 'Lax',
    ]);
    session_start();
}

$configFile = __DIR__ . '/config.php';
$GLOBALS['sw_config'] = is_file($configFile) ? require $configFile : [];

function sw_installed(): bool
{
    $config = $GLOBALS['sw_config'] ?? [];
    return !empty($config['database']['name']) && !empty($config['app_key']);
}

function sw_config(?string $key = null, mixed $default = null): mixed
{
    $config = $GLOBALS['sw_config'] ?? [];
    if ($key === null) {
        return $config;
    }
    $value = $config;
    foreach (explode('.', $key) as $segment) {
        if (!is_array($value) || !array_key_exists($segment, $value)) {
            return $default;
        }
        $value = $value[$segment];
    }
    return $value;
}

function sw_db(): PDO
{
    static $pdo = null;
    if ($pdo instanceof PDO) {
        return $pdo;
    }
    if (!sw_installed()) {
        throw new RuntimeException('Website is not installed.');
    }
    $db = sw_config('database', []);
    $dsn = sprintf('mysql:host=%s;port=%d;dbname=%s;charset=utf8mb4', $db['host'], (int)($db['port'] ?? 3306), $db['name']);
    $pdo = new PDO($dsn, $db['user'], $db['password'], [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ]);
    return $pdo;
}

function sw_e(mixed $value): string
{
    return htmlspecialchars((string)$value, ENT_QUOTES, 'UTF-8');
}

function sw_csrf_token(): string
{
    if (empty($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['csrf_token'];
}

function sw_verify_csrf(?string $token): bool
{
    return is_string($token) && !empty($_SESSION['csrf_token']) && hash_equals($_SESSION['csrf_token'], $token);
}

function sw_admin_id(): ?int
{
    return isset($_SESSION['admin_id']) ? (int)$_SESSION['admin_id'] : null;
}

function sw_require_admin(): void
{
    if (!sw_installed()) {
        header('Location: /install/');
        exit;
    }
    if (!sw_admin_id()) {
        header('Location: /admin/login.php');
        exit;
    }
}

function sw_site(string $key, string $fallback = ''): string
{
    static $settings = null;
    if ($settings === null && sw_installed()) {
        $settings = [];
        try {
            foreach (sw_db()->query('SELECT setting_key, setting_value FROM settings') as $row) {
                $settings[$row['setting_key']] = $row['setting_value'];
            }
        } catch (Throwable $e) {
            $settings = [];
        }
    }
    if (is_array($settings) && array_key_exists($key, $settings)) {
        return (string)$settings[$key];
    }
    return (string)sw_config('business.' . $key, $fallback);
}

function sw_ip_hash(): string
{
    $ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
    return hash_hmac('sha256', $ip, (string)sw_config('app_key', 'swiggy-wala'));
}
