<?php
require_once __DIR__.'/../config.php';
$seoServices = require __DIR__.'/../data/seo-service-pages.php';
if (!isset($serviceSlug, $seoServices[$serviceSlug])) {
    http_response_code(404);
    require __DIR__.'/../404.php';
    exit;
}
$service = $seoServices[$serviceSlug];
$name = $service['name'];
$category = $service['category'];
$summary = $service['summary'];
$route = $service['route'];
$pageTitle = $name . ' | Swiggy Wala Jaipur';
$pageDescription = $summary . ' Contact Swiggy Wala for current availability and quotation.';
$canonical = SITE_URL . '/services/' . $serviceSlug . '/';

$imageDirFs = __DIR__ . '/../assets/images/services/' . $serviceSlug;
$imageDirWeb = '/assets/images/services/' . $serviceSlug;
$heroImageFs = $imageDirFs . '/' . $serviceSlug . '-hero.webp';
$cardImageFs = $imageDirFs . '/' . $serviceSlug . '-card.webp';
$heroImageWeb = $imageDirWeb . '/' . $serviceSlug . '-hero.webp';
$cardImageWeb = $imageDirWeb . '/' . $serviceSlug . '-card.webp';
$hasHeroImage = is_file($heroImageFs);
$hasCardImage = is_file($cardImageFs);
if ($hasHeroImage) {
    $ogImage = SITE_URL . $heroImageWeb;
} elseif ($hasCardImage) {
    $ogImage = SITE_URL . $cardImageWeb;
}

$pageSchema = [
    '@context' => 'https://schema.org',
    '@type' => 'Service',
    'name' => $name,
    'description' => $pageDescription,
    'provider' => [
        '@type' => 'TravelAgency',
        'name' => SITE_NAME,
        'url' => SITE_URL,
        'telephone' => PHONE_DISPLAY,
    ],
    'areaServed' => [
        ['@type' => 'City', 'name' => 'Jaipur'],
        ['@type' => 'State', 'name' => 'Rajasthan'],
        ['@type' => 'Country', 'name' => 'India'],
    ],
    'url' => $canonical,
    'serviceType' => $category,
];
include __DIR__.'/header.php';
?>
<main>
<section class="page-hero service-detail-hero<?= $hasHeroImage ? ' page-hero-illustrated' : '' ?>">
  <div class="container<?= $hasHeroImage ? ' page-hero-layout' : '' ?>">
    <div class="page-hero-copy">
      <div class="breadcrumb"><a href="/">Home</a> / <a href="/services.php">Services</a> / <?= e($name) ?></div>
      <span class="eyebrow"><?= e($category) ?></span>
      <h1><?= e($name) ?></h1>
      <p><?= e($summary) ?></p>
      <div class="hero-actions">
        <a class="btn" href="<?= e(wa_link('Hello Swiggy Wala, I need details about '.$name.'.')) ?>" target="_blank" rel="noopener"><?= wa_icon() ?>Get Current Quote</a>
        <a class="btn btn-outline" href="tel:<?= PHONE_TEL ?>">Call <?= PHONE_DISPLAY ?></a>
      </div>
    </div>
    <?php if ($hasHeroImage): ?>
      <div class="page-hero-art"><img src="<?= e($heroImageWeb) ?>" alt="<?= e($name . ' by Swiggy Wala') ?>" width="1200" height="900" loading="eager"></div>
    <?php endif; ?>
  </div>
</section>

<section class="section">
  <div class="container service-intro-grid">
    <article>
      <span class="eyebrow">Trip planning</span>
      <h2 class="content-title"><?= e($route) ?> travel made easier to plan.</h2>
      <p><?= e($service['intro']) ?></p>
      <p><?= e($service['notes']) ?></p>
      <p>Share the travel date, pickup point, destination, traveller count, luggage needs and preferred timing. We will confirm the available vehicle option, trip scope and current quotation before payment.</p>
    </article>
    <aside class="service-summary">
      <h3>Service highlights</h3>
      <ul class="check-list">
        <?php foreach ($service['highlights'] as $highlight): ?><li><?= e($highlight) ?></li><?php endforeach; ?>
      </ul>
      <a class="btn" href="<?= e(wa_link('Hello Swiggy Wala, please quote '.$name.' for my travel date.')) ?>" target="_blank" rel="noopener"><?= wa_icon() ?>Request Quote</a>
    </aside>
  </div>
</section>

<section class="section section-soft">
  <div class="container">
    <div class="section-head">
      <div><span class="eyebrow">Who it suits</span><h2>Useful for these travel needs.</h2></div>
      <p>Choose the trip format that matches your actual journey instead of paying for an unsuitable package.</p>
    </div>
    <div class="process">
      <?php foreach ($service['best_for'] as $i => $item): ?>
        <div class="step"><b><?= str_pad((string)($i+1), 2, '0', STR_PAD_LEFT) ?></b><h3><?= e($item) ?></h3><p>Share this requirement when requesting your quotation.</p></div>
      <?php endforeach; ?>
    </div>
  </div>
</section>

<section class="section">
  <div class="container faq-wrap">
    <span class="eyebrow">Before you book</span>
    <h2 class="content-title"><?= e($name) ?> FAQs</h2>
    <details open><summary>How do I get the current price?</summary><p>Send your travel date, exact pickup and drop locations, traveller count, luggage requirement and any requested stops. We will provide the current quotation based on the actual trip.</p></details>
    <details><summary>What should I check in the quotation?</summary><p>Check the route, vehicle category, included distance or trip scope, waiting terms, tolls, parking, driver allowance if applicable, cancellation terms and any exclusions.</p></details>
    <details><summary>Can I change the pickup point or add stops?</summary><p>Usually yes, subject to route feasibility and availability. Tell us before final confirmation because changes can affect timing and price.</p></details>
    <details><summary>Are attraction tickets or guide fees included?</summary><p>Only when they are specifically written into the quotation. Do not assume monument tickets, guide fees, safari permits or other third-party charges are included.</p></details>
  </div>
</section>

<section class="section section-soft">
  <div class="container split compact-split">
    <div>
      <span class="eyebrow">More travel options</span>
      <h2 class="content-title">Continue planning from Jaipur.</h2>
      <p>Explore other Jaipur taxi services, Rajasthan tour packages, destinations and custom itinerary support.</p>
    </div>
    <div class="related-links">
      <a href="/services.php">All services <b>→</b></a>
      <a href="/packages.php">Tour packages <b>→</b></a>
      <a href="/destinations.php">Destinations <b>→</b></a>
      <a href="/blogs/">Travel guides <b>→</b></a>
    </div>
  </div>
</section>
</main>
<?php include __DIR__.'/footer.php'; ?>
