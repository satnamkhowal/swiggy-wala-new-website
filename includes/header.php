<?php
require_once __DIR__ . '/../config.php';
$pageTitle = $pageTitle ?? SITE_NAME . ' | Rajasthan Tours & Jaipur Travel Planning';
$pageDescription = $pageDescription ?? 'Plan personalised Rajasthan tours, Jaipur travel, cabs, transfers and custom itineraries with Swiggy Wala.';
$requestPath = strtok($_SERVER['REQUEST_URI'] ?? '/', '?');
$canonicalUrl = SITE_URL . ($requestPath ?: '/');
?><!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title><?= e($pageTitle) ?></title>
<meta name="description" content="<?= e($pageDescription) ?>">
<meta name="theme-color" content="#0067EE">
<link rel="canonical" href="<?= e($canonicalUrl) ?>">
<link rel="stylesheet" href="/main-home/assets/css/bootstrap.min.css">
<link rel="stylesheet" href="/main-home/assets/css/bootstrap-icons.css">
<link rel="stylesheet" href="/main-home/assets/css/boxicons.min.css">
<link rel="stylesheet" href="/main-home/assets/css/style.css">
<link rel="stylesheet" href="/assets/css/source-migrated.css">
<link rel="stylesheet" href="/assets/css/swiggy-wala.css">
<link rel="stylesheet" href="/assets/css/pages.css">
<link rel="stylesheet" href="/assets/css/php-migration.css">
<?php if (defined('GA_MEASUREMENT_ID') && GA_MEASUREMENT_ID): ?>
<script async src="https://www.googletagmanager.com/gtag/js?id=<?= e(GA_MEASUREMENT_ID) ?>"></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','<?= e(GA_MEASUREMENT_ID) ?>');</script>
<?php endif; ?>
</head>
<body>
<header class="sw-header">
<nav class="navbar navbar-expand-lg navbar-light"><div class="container">
<a class="sw-brand sw-brand-local" href="/" aria-label="Swiggy Wala home"></a>
<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#swNav" aria-controls="swNav" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
<div class="collapse navbar-collapse" id="swNav">
<ul class="navbar-nav ms-auto align-items-lg-center sw-nav">
<li class="nav-item"><a class="nav-link" href="/destinations.php">Destinations</a></li>
<li class="nav-item"><a class="nav-link" href="/packages.php">Packages</a></li>
<li class="nav-item"><a class="nav-link" href="/services.php">Services</a></li>
<li class="nav-item"><a class="nav-link" href="/locations.php">Locations</a></li>
<li class="nav-item"><a class="nav-link" href="/blog.php">Travel Guides</a></li>
<li class="nav-item"><a class="nav-link" href="/about.php">About</a></li>
</ul>
<div class="d-flex gap-2 ms-lg-3 mt-3 mt-lg-0"><a class="sw-btn-outline" href="tel:<?= PHONE_TEL ?>"><i class="bi bi-telephone"></i> Call</a><a class="sw-btn" href="<?= e(wa_link()) ?>" target="_blank" rel="noopener"><i class="bi bi-whatsapp"></i> Plan on WhatsApp</a></div>
</div></div></nav>
</header>
