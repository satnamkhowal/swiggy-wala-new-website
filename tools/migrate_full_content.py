#!/usr/bin/env python3
from __future__ import annotations

import io
import re
import shutil
import tempfile
import urllib.request
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SOURCE_ZIP = "https://github.com/satnamkhowal/swiggy-wala-website/archive/refs/heads/main.zip"


def copytree(src: Path, dst: Path) -> None:
    if src.exists():
        shutil.copytree(src, dst, dirs_exist_ok=True)


def write(path: str, content: str) -> None:
    p = ROOT / path
    p.parent.mkdir(parents=True, exist_ok=True)
    p.write_text(content, encoding="utf-8")


def main() -> None:
    print("Downloading canonical Swiggy Wala source repository...")
    req = urllib.request.Request(SOURCE_ZIP, headers={"User-Agent": "SwiggyWala-Migration/1.0"})
    with urllib.request.urlopen(req, timeout=60) as response:
        archive = response.read()

    with tempfile.TemporaryDirectory() as td:
        temp = Path(td)
        with zipfile.ZipFile(io.BytesIO(archive)) as zf:
            zf.extractall(temp)
        src = next(temp.glob("swiggy-wala-website-*"))

        # Copy the complete source content/data model that powers indexed pages.
        for folder in ("data", "services", "locations", "blog", "blogs", "gallery", "stories"):
            copytree(src / folder, ROOT / folder)

        # Copy every root PHP content page so no source content is silently dropped.
        for php in src.glob("*.php"):
            shutil.copy2(php, ROOT / php.name)

        # Copy shared PHP templates first; header/footer are replaced below with AtlasTrip wrappers.
        copytree(src / "includes", ROOT / "includes")

        # Bring the real Swiggy Wala logo and all source-specific imagery into the new repository.
        copytree(src / "assets" / "images", ROOT / "assets" / "images")

        # Preserve SEO/support files from the production source.
        for name in ("robots.txt", "sitemap.xml", "sitemap-experiences.xml", "sitemap-locations.xml", "site.webmanifest", ".htaccess"):
            if (src / name).exists():
                shutil.copy2(src / name, ROOT / name)

        # Keep the source layout rules for PHP content, but remap known legacy orange accents
        # to AtlasTrip's original blue so the migrated pages stay within the selected theme palette.
        legacy_css = ""
        for candidate in (src / "assets" / "css" / "style.css", src / "assets" / "css" / "main.css"):
            if candidate.exists():
                legacy_css = candidate.read_text(encoding="utf-8", errors="ignore")
                break
        replacements = {
            "#f47c20": "#0067EE", "#F47C20": "#0067EE",
            "#f97316": "#0067EE", "#F97316": "#0067EE",
            "#ea580c": "#0058CC", "#EA580C": "#0058CC",
            "#ff7a00": "#0067EE", "#FF7A00": "#0067EE",
            "#ff6b00": "#0067EE", "#FF6B00": "#0067EE",
            "#e85d04": "#0058CC", "#E85D04": "#0058CC",
        }
        for old, new in replacements.items():
            legacy_css = legacy_css.replace(old, new)
        write("assets/css/source-migrated.css", legacy_css)

    # Shared AtlasTrip-styled PHP header. All original data-driven pages now use this one header.
    write("includes/header.php", r'''<?php
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
''')

    write("includes/footer.php", r'''<footer class="sw-footer"><div class="container"><div class="row g-4">
<div class="col-lg-4"><div class="sw-footer-logo" aria-label="Swiggy Wala"></div><p>Personalised Rajasthan tours, Jaipur sightseeing, taxi support, transfers and travel planning.</p></div>
<div class="col-6 col-lg-2"><h4>Explore</h4><p><a href="/destinations.php">Destinations</a></p><p><a href="/packages.php">Packages</a></p><p><a href="/services.php">Services</a></p><p><a href="/gallery/">Gallery</a></p></div>
<div class="col-6 col-lg-2"><h4>Company</h4><p><a href="/about.php">About</a></p><p><a href="/locations.php">Locations</a></p><p><a href="/blog.php">Travel Guides</a></p><p><a href="/contact.php">Contact</a></p></div>
<div class="col-lg-2"><h4>Policies</h4><p><a href="/privacy-policy.php">Privacy Policy</a></p><p><a href="/terms.php">Terms & Conditions</a></p></div>
<div class="col-lg-2"><h4>Contact</h4><p><a href="tel:<?= PHONE_TEL ?>"><?= PHONE_DISPLAY ?></a></p><p><a href="mailto:<?= SUPPORT_EMAIL ?>"><?= SUPPORT_EMAIL ?></a></p><p><?= OFFICE_ADDRESS ?></p></div>
</div><div class="footer-bottom">© <?= date('Y') ?> Swiggy Wala. Travel information and availability should be reconfirmed before booking.</div></div></footer>
<a class="sw-wa-float" href="<?= e(wa_link()) ?>" target="_blank" rel="noopener"><i class="bi bi-whatsapp"></i><span>WhatsApp</span></a>
<script src="/main-home/assets/js/bootstrap.min.js"></script>
</body></html>
''')

    # Compatibility layer: retains all source content structures while adopting AtlasTrip typography and blue accent.
    write("assets/css/php-migration.css", r''':root{--sw-primary:#0067EE;--sw-primary-dark:#0058CC;--sw-soft:#f3f8ff;--sw-border:#e8e8e8}.sw-brand-local{background-image:url('/assets/images/swiggywala-logo.png')!important}.sw-footer-logo{width:210px;height:52px;margin-bottom:18px;background:url('/assets/images/swiggywala-logo.png') left center/contain no-repeat}.page-hero{padding:78px 0 62px;background:radial-gradient(circle at 90% 10%,rgba(0,103,238,.15),transparent 28%),linear-gradient(135deg,#fff 0%,#f3f8ff 100%)}.page-hero h1,.hero h1{font-family:var(--font-plusJakartaSans);font-weight:800;letter-spacing:-2px}.page-hero h1{font-size:clamp(38px,5vw,64px);line-height:1.06}.page-hero p{max-width:760px;color:#404040;font-size:18px;line-height:1.7}.breadcrumb{margin-bottom:18px;color:#777;font-size:14px}.breadcrumb a,.text-link,.service-link,.location-card a{color:#0067EE;font-weight:700}.eyebrow{display:inline-flex;align-items:center;gap:8px;margin-bottom:18px;padding:7px 12px;border-radius:999px;background:rgba(0,103,238,.09);color:#0067EE;font-size:13px;font-weight:800;text-transform:uppercase;letter-spacing:.7px}.eyebrow.light{background:rgba(255,255,255,.12);color:#fff}.section{padding:82px 0}.section-soft,.section.alt{background:#fafafa}.section-head{max-width:760px;margin-bottom:36px}.section-head h2,.content-title{font-family:var(--font-plusJakartaSans);font-weight:750;letter-spacing:-1.2px}.content-title{font-size:clamp(30px,4vw,46px);line-height:1.14}.split,.contact-grid,.hero-grid,.page-hero-layout{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:48px;align-items:center}.card-grid,.destination-grid,.service-grid,.locations-grid,.blog-grid,.stats-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:24px}.stats-grid{grid-template-columns:repeat(4,minmax(0,1fr))}.card,.destination-card,.service-card,.location-card,.blog-card,.stat-card,.package-card{height:100%;overflow:hidden;border:1px solid #e8e8e8;border-radius:20px;background:#fff;box-shadow:none}.card,.service-card,.location-card,.blog-card,.stat-card,.package-card{padding:24px}.destination-card img,.blog-card img,.package-card img{width:100%;height:240px;object-fit:cover;border-radius:16px}.btn{display:inline-flex!important;align-items:center;justify-content:center;gap:8px;min-height:48px;padding:0 20px!important;border:1px solid #0067EE!important;border-radius:12px!important;background:#0067EE!important;color:#fff!important;font-weight:700!important;text-decoration:none!important}.btn:hover{background:#0058CC!important;border-color:#0058CC!important}.btn-outline{background:#fff!important;color:#0067EE!important}.btn-white{background:#fff!important;color:#0067EE!important;border-color:#fff!important}.hero-actions,.page-hero-actions{display:flex;flex-wrap:wrap;gap:12px;margin-top:28px}.check-list{list-style:none;padding:0;margin:26px 0}.check-list li{position:relative;padding:10px 0 10px 32px;border-bottom:1px solid #e8e8e8}.check-list li:before{content:'✓';position:absolute;left:0;color:#0067EE;font-weight:900}.story-image{min-height:480px;border-radius:28px 8px 28px 28px;background:url('/assets/images/destinations/udaipur-city-palace.webp') center/cover no-repeat}.contact-panel{height:100%;padding:34px;border-radius:24px;background:#111;color:#fff}.contact-panel h2,.contact-panel a{color:#fff}.contact-panel p{color:rgba(255,255,255,.72)}.form{display:grid;grid-template-columns:1fr 1fr;gap:18px}.form label{display:grid;gap:8px;font-weight:700}.form .full{grid-column:1/-1}.form input,.form textarea,.form select{width:100%;border:1px solid #e8e8e8;border-radius:12px;padding:13px 14px;background:#fff}.form textarea{min-height:150px}.notice,.rate-note,.info-note{padding:18px 20px;border:1px solid rgba(0,103,238,.2);border-radius:14px;background:#f3f8ff}.legal{max-width:900px}.legal h2{margin-top:34px}.article-shell,.blog-detail,.service-detail,.location-detail{max-width:950px;margin:auto}.article-shell h2,.blog-detail h2,.service-detail h2,.location-detail h2{margin-top:34px}.article-shell p,.blog-detail p,.service-detail p,.location-detail p{line-height:1.8;color:#404040}.article-shell img,.blog-detail img{max-width:100%;border-radius:20px}.faq-item{padding:20px 0;border-bottom:1px solid #e8e8e8}.faq-item h3{font-size:19px}.hero{padding:92px 0 72px;background:radial-gradient(circle at 8% 20%,rgba(0,103,238,.12),transparent 30%),linear-gradient(135deg,#fff 0%,#f5f9ff 55%,#fff 100%)}.hero h1{font-size:clamp(42px,5.2vw,76px);line-height:1.04}.hero p{max-width:720px;font-size:18px;line-height:1.7}.hero-visual img,.page-hero-art img{max-width:100%;height:auto}.trust-row{display:flex;flex-wrap:wrap;gap:10px;margin-top:24px}.trust-pill,.trust-chip{padding:8px 12px;border:1px solid #e8e8e8;border-radius:999px;background:#fff;font-size:13px;font-weight:600}@media(max-width:991px){.split,.contact-grid,.hero-grid,.page-hero-layout{grid-template-columns:1fr}.card-grid,.destination-grid,.service-grid,.locations-grid,.blog-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.stats-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.section{padding:64px 0}}@media(max-width:575px){.card-grid,.destination-grid,.service-grid,.locations-grid,.blog-grid,.stats-grid,.form{grid-template-columns:1fr}.form .full{grid-column:auto}.page-hero{padding:58px 0 46px}.hero{padding:62px 0 56px}.section{padding:56px 0}.sw-footer-logo{width:180px}}
''')

    # Ensure PHP wins as the production entry point while keeping current HTML files as fallback/reference.
    htaccess = (ROOT / ".htaccess").read_text(encoding="utf-8", errors="ignore") if (ROOT / ".htaccess").exists() else ""
    htaccess = re.sub(r"DirectoryIndex\s+[^\n]+", "DirectoryIndex index.php index.html", htaccess) if "DirectoryIndex" in htaccess else "DirectoryIndex index.php index.html\n" + htaccess
    write(".htaccess", htaccess)

    # Switch the shared static theme logo to the locally migrated asset too.
    sw_css = ROOT / "assets" / "css" / "swiggy-wala.css"
    if sw_css.exists():
        text = sw_css.read_text(encoding="utf-8", errors="ignore")
        text = re.sub(r"https://raw\.githubusercontent\.com/satnamkhowal/swiggy-wala-website/main/assets/images/swiggywala-logo\.png", "/assets/images/swiggywala-logo.png", text)
        sw_css.write_text(text, encoding="utf-8")

    print("Full Swiggy Wala content migration prepared.")


if __name__ == "__main__":
    main()
