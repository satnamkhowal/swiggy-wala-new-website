<?php
require_once __DIR__.'/../config.php';
$locations=require __DIR__.'/../data/locations.php';
$location=$locations['gopalpura-bypass'];
$pageTitle='Swiggy Wala Gopalpura Bypass Jaipur | Rajasthan Tour Planning Office';
$pageDescription='Visit Swiggy Wala at A-41 Colony, Gopalpura Bypass Road, Triveni Nagar, Jaipur for Rajasthan holidays, custom itineraries, Jaipur tours and travel coordination.';
$canonical=SITE_URL.'/locations/gopalpura-bypass.php';
$pageSchema=['@context'=>'https://schema.org','@type'=>'TravelAgency','name'=>$location['name'],'url'=>$canonical,'telephone'=>PHONE_DISPLAY,'email'=>SUPPORT_EMAIL,'hasMap'=>$location['maps_url'],'address'=>['@type'=>'PostalAddress','streetAddress'=>'A-41 colony, Gopalpura Bypass Rd, Ashok Vihar Extension, Vishveshvariya Nagar, Triveni Nagar','addressLocality'=>'Jaipur','addressRegion'=>'Rajasthan','postalCode'=>'302018','addressCountry'=>'IN'],'parentOrganization'=>['@type'=>'Organization','name'=>SITE_NAME,'url'=>SITE_URL],'areaServed'=>['Jaipur','Rajasthan']];
include __DIR__.'/../includes/header.php';
include __DIR__.'/../includes/location-detail.php';
include __DIR__.'/../includes/footer.php';
