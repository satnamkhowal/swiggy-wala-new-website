<?php
declare(strict_types=1);

$runtimeConfig = [];
$runtimeConfigFile = __DIR__ . '/app/config.php';
if (is_file($runtimeConfigFile)) {
    $loadedRuntimeConfig = require $runtimeConfigFile;
    if (is_array($loadedRuntimeConfig)) {
        $runtimeConfig = $loadedRuntimeConfig;
    }
}
$runtimeBusiness = is_array($runtimeConfig['business'] ?? null) ? $runtimeConfig['business'] : [];

$siteName = trim((string)($runtimeBusiness['name'] ?? 'Swiggy Wala')) ?: 'Swiggy Wala';
$siteUrl = rtrim(trim((string)($runtimeConfig['site_url'] ?? 'https://swiggywala.com')), '/');
$phoneDisplay = trim((string)($runtimeBusiness['phone'] ?? '+91 99297 97091')) ?: '+91 99297 97091';
$phoneDigits = preg_replace('/\D+/', '', $phoneDisplay) ?: '919929797091';
$supportEmail = trim((string)($runtimeBusiness['email'] ?? 'info@swiggywala.com')) ?: 'info@swiggywala.com';
$officeAddress = trim((string)($runtimeBusiness['address'] ?? 'Jaipur, Rajasthan, India')) ?: 'Jaipur, Rajasthan, India';

define('SITE_NAME', $siteName);
define('SITE_URL', $siteUrl ?: 'https://swiggywala.com');
define('SITE_TAGLINE', 'A Destination For The New Millennium.');
define('PHONE_DISPLAY', $phoneDisplay);
define('PHONE_TEL', '+' . $phoneDigits);
define('WHATSAPP_NUMBER', $phoneDigits);
define('SUPPORT_EMAIL', $supportEmail);
define('OFFICE_ADDRESS', $officeAddress);
define('GA_MEASUREMENT_ID', 'G-4R66GSPDXP');
define('GTM_CONTAINER_ID', 'GTM-5WWMDQMZ');

function e(string $value): string { return htmlspecialchars($value, ENT_QUOTES, 'UTF-8'); }
function wa_link(string $message = 'Hello Swiggy Wala, I want to book a taxi.'): string {
    return 'https://wa.me/' . WHATSAPP_NUMBER . '?text=' . rawurlencode($message);
}
function wa_icon(): string {
    return '<svg class="wa-icon" viewBox="0 0 32 32" aria-hidden="true"><path fill="currentColor" d="M16.04 3A12.87 12.87 0 0 0 5.13 22.7L3 29l6.5-2.08A12.9 12.9 0 1 0 16.04 3Zm0 23.55c-2.2 0-4.24-.65-5.96-1.76l-.43-.27-3.85 1.23 1.26-3.75-.28-.44a10.47 10.47 0 1 1 9.26 4.99Zm5.75-7.84c-.31-.16-1.86-.92-2.15-1.02-.29-.1-.5-.16-.71.16-.21.31-.81 1.02-.99 1.23-.18.21-.37.24-.68.08-.32-.16-1.33-.49-2.54-1.57a9.5 9.5 0 0 1-1.76-2.19c-.18-.31-.02-.48.14-.64.14-.14.31-.37.47-.55.16-.18.21-.31.31-.52.11-.21.06-.39-.02-.55-.08-.16-.71-1.71-.97-2.34-.26-.62-.52-.54-.71-.55h-.61c-.21 0-.55.08-.84.39-.29.32-1.1 1.08-1.1 2.63 0 1.55 1.13 3.05 1.29 3.26.16.21 2.22 3.39 5.38 4.75.75.32 1.34.52 1.8.67.76.24 1.44.21 1.98.13.61-.09 1.86-.76 2.12-1.5.26-.73.26-1.36.18-1.5-.08-.13-.29-.21-.61-.37Z"/></svg>';
}
