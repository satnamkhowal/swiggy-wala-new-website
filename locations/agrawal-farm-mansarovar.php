<?php
require_once __DIR__.'/../config.php';
$locations=require __DIR__.'/../data/locations.php';
$location=$locations['agrawal-farm-mansarovar'];
$pageTitle='Swiggy Wala Agrawal Farm Mansarovar Jaipur | Tour Planning Office';
$pageDescription='Visit Swiggy Wala at Agrawal Farm, CBC 05, Vikramaditya Marg, Mansarovar Sector 11, Jaipur for Rajasthan tour packages, Jaipur sightseeing and travel planning.';
$canonical=SITE_URL.'/locations/agrawal-farm-mansarovar.php';
$pageSchema=['@context'=>'https://schema.org','@type'=>'TravelAgency','name'=>$location['name'],'url'=>$canonical,'telephone'=>PHONE_DISPLAY,'email'=>SUPPORT_EMAIL,'hasMap'=>$location['maps_url'],'address'=>['@type'=>'PostalAddress','streetAddress'=>'Agrawal Farm, CBC 05, Vikramaditya Marg, Mansarovar Sector 11, Mansarovar','addressLocality'=>'Jaipur','addressRegion'=>'Rajasthan','postalCode'=>'302020','addressCountry'=>'IN'],'parentOrganization'=>['@type'=>'Organization','name'=>SITE_NAME,'url'=>SITE_URL],'areaServed'=>['Jaipur','Rajasthan']];
include __DIR__.'/../includes/header.php';
include __DIR__.'/../includes/location-detail.php';
include __DIR__.'/../includes/footer.php';
