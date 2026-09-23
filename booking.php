<?php
declare(strict_types=1);
require_once __DIR__ . '/app/bootstrap.php';
$pageTitle='Book a Taxi in Jaipur | Swiggy Wala';
$pageDescription='Request Jaipur airport transfer, local taxi, one-way outstation, round-trip or multi-city cab service from Swiggy Wala.';
include 'includes/header.php';
$source='booking-page';
$compact=false;
?>
<main><section class="sw-inner-hero py-5"><div class="container py-4"><span class="eyebrow">Taxi booking</span><h1>Request your cab</h1><p>Enter your route, travel date and contact details. The request is stored directly in the lead panel for follow-up.</p></div></section><section class="section pt-4"><div class="container"><div class="row g-5"><div class="col-lg-8"><div class="sw-booking-card">
<?php if (isset($_GET['success'])): ?><div class="alert alert-success"><strong>Request received.</strong><?php if (!empty($_GET['ref'])): ?> Reference: <strong><?= sw_e($_GET['ref']) ?></strong>.<?php endif; ?> Our team can contact you to confirm availability, fare and trip details.</div><?php endif; ?>
<?php if (!empty($_GET['error'])): ?><div class="alert alert-danger"><?= sw_e($_GET['error']) ?></div><?php endif; ?>
<div class="sw-booking-card-head"><span>Taxi request</span><h2>Trip details</h2><p>No online payment is taken on this form.</p></div><?php require __DIR__ . '/partials/booking-form.php'; ?></div></div><div class="col-lg-4"><div class="sw-side-card"><h2 class="h4">Need direct help?</h2><p>Call or WhatsApp for booking assistance.</p><a class="sw-btn w-100 mb-2" href="tel:<?= e(PHONE_TEL) ?>"><i class="bi bi-telephone"></i> <?= e(PHONE_DISPLAY) ?></a><a class="sw-btn-outline w-100" href="<?= e(wa_link('Hello Swiggy Wala, I want to book a taxi.')) ?>" target="_blank" rel="noopener"><i class="bi bi-whatsapp"></i> WhatsApp</a><hr><h3 class="h5">Common requests</h3><ul class="sw-clean-list"><li>Jaipur Airport transfer</li><li>Jaipur local taxi</li><li>One-way outstation cab</li><li>Round-trip outstation cab</li><li>Multi-city travel</li></ul></div></div></div></div></section></main>
<?php include 'includes/footer.php';?>
