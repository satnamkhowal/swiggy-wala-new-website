<?php
declare(strict_types=1);
require_once __DIR__.'/../config.php'; require_once __DIR__.'/catalog.php';
header('Content-Type: application/xml; charset=utf-8');
echo '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
<url><loc><?=SITE_URL?>/blogs/</loc><lastmod>2026-09-16</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>
<?php foreach(all_programmatic_blogs() as $b):?><url><loc><?=SITE_URL?>/blogs/<?=e($b['slug'])?>/</loc><lastmod><?=e($b['date']??'2026-09-12')?></lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>
<?php endforeach;?></urlset>
