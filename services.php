<?php
$pageTitle='Jaipur Taxi, Cab, Tours & Rajasthan Travel Services | Swiggy Wala';
$pageDescription='Explore Jaipur taxi services, airport and railway transfers, one-way cabs, sightseeing, guides and Rajasthan tour planning from Swiggy Wala.';
include 'includes/header.php';
$groups=require 'data/services.php';
$seoServices=require 'data/seo-service-pages.php';
?>
<main>
<section class="page-hero services-hero page-hero-illustrated"><div class="container page-hero-layout"><div class="page-hero-copy"><div class="breadcrumb"><a href="/">Home</a> / Services</div><span class="eyebrow">Jaipur taxi, tours & transfers</span><h1>Travel services from Jaipur, planned around the real trip.</h1><p>Browse local Jaipur taxis, airport and station transfers, sightseeing cabs, travel guides, one-way routes and Rajasthan tour services. Share your date and route for a current quotation.</p><div class="hero-actions"><a class="btn" href="<?= e(wa_link('Hello Swiggy Wala, I want a quote for a Jaipur taxi or Rajasthan trip.')) ?>" target="_blank" rel="noopener"><?= wa_icon() ?>Get Current Quote</a><a class="btn btn-outline" href="#popular-jaipur-services">Popular Services</a></div></div><div class="page-hero-art"><img src="/assets/images/graphics/rajasthan-journey.svg" alt="Jaipur and Rajasthan taxi tour planning illustration" width="900" height="650"></div></div></section>

<section class="section section-soft" id="popular-jaipur-services"><div class="container">
<div class="section-head"><div><span class="eyebrow">High-intent travel services</span><h2>Popular Jaipur taxi and route pages.</h2></div><p>These pages are built around specific travel intent so visitors can reach the right service without searching through a generic package list.</p></div>
<div class="service-list"><?php foreach($seoServices as $slug=>$item):?>
<a class="service-tile" href="/services/<?= e($slug) ?>/"><span class="service-icon"><?= strtoupper(substr($item['name'],0,1)) ?></span><span><strong><?= e($item['name']) ?></strong><small><?= e($item['summary']) ?></small></span><b>→</b></a>
<?php endforeach;?></div>
</div></section>

<section class="section" id="all-services"><div class="container">
<?php foreach($groups as $groupSlug=>$group):?><section class="service-group" id="<?= e($groupSlug) ?>"><div class="section-head"><div><span class="eyebrow"><?= e($groupSlug==='travel-services'?'Travel support':'Tours & packages') ?></span><h2><?= e($group['label']) ?></h2></div><p><?= e($group['intro']) ?></p></div><div class="service-list"><?php foreach($group['items'] as $item):?><a class="service-tile<?= $item[0]==='self-drive-car-rental'?' service-secondary':'' ?>" href="/services/<?= e($item[0]) ?>/"><span class="service-icon"><?= strtoupper(substr($item[1],0,1)) ?></span><span><strong><?= e($item[1]) ?></strong><small><?= e($item[3]) ?></small></span><b>→</b></a><?php endforeach;?></div></section><?php endforeach;?>
</div></section>
</main>
<?php include 'includes/footer.php';?>
