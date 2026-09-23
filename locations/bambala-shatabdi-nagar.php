<?php
require_once __DIR__.'/../config.php';
$locations=require __DIR__.'/../data/locations.php';
$location=$locations['bambala-shatabdi-nagar'];
$pageTitle='Swiggy Wala Bambala Jaipur | Tour & Travel Branch';
$pageDescription='Visit Swiggy Wala in Bambala, Shatabdi Nagar for Jaipur travel, Rajasthan tours, outstation cabs, group travel and trip planning.';
$canonical=SITE_URL.'/locations/bambala-shatabdi-nagar.php';
$pageSchema=['@context'=>'https://schema.org','@type'=>'TravelAgency','name'=>$location['name'],'url'=>$canonical,'telephone'=>PHONE_DISPLAY,'email'=>SUPPORT_EMAIL,'hasMap'=>$location['maps_url'],'address'=>['@type'=>'PostalAddress','streetAddress'=>$location['address'],'addressLocality'=>$location['city'],'addressRegion'=>$location['state'],'postalCode'=>$location['postal_code'],'addressCountry'=>'IN'],'parentOrganization'=>['@type'=>'Organization','name'=>SITE_NAME,'url'=>SITE_URL],'areaServed'=>['Jaipur','Rajasthan']];
include __DIR__.'/../includes/header.php';
include __DIR__.'/../includes/location-detail.php';
include __DIR__.'/../includes/footer.php';
