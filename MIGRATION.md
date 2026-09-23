# Swiggy Wala content migration

Source repository: `satnamkhowal/swiggy-wala-website`
Target repository: `satnamkhowal/swiggy-wala-new-website`
Theme base: AtlasTrip / existing new-repo visual system

## Status

**SOURCE CONTENT MIGRATION COMPLETE — 23 September 2026**

The old repository remains the historical source, but the written content and source-specific assets required for the Swiggy Wala site have now been copied into the new repository. The automatic full-content migration workflow has been removed after completion so it cannot keep re-running or overwrite later theme work.

From this point onward, work should happen in `satnamkhowal/swiggy-wala-new-website`. Do not restart bulk migration unless a deliberate comparison finds content that is genuinely missing.

## Complete source content now preserved in the new repo

- Central content/data files under `data/`, including blogs, locations, SEO service pages, services and destination/package data.
- Service pages and service route files under `services/`.
- Jaipur branch/local SEO pages under `locations/`.
- Travel guides and articles under `blog/` and `blogs/`.
- Story content under `stories/`.
- Gallery content under `gallery/`.
- Root PHP content pages from the previous website.
- Shared PHP includes/templates required by the migrated data-driven pages.
- Production Swiggy Wala images and brand assets under `assets/images/`.
- Production SEO/support files such as `.htaccess`, `robots.txt`, sitemaps and web manifest where available in the source.
- Source CSS retained where required, with the migrated PHP layer adapted to the selected new-repo theme system.

## Static-theme migration already completed

- Homepage.
- About page.
- Contact page and WhatsApp enquiry flow.
- Destinations index.
- Packages index.
- Services catalogue.
- Locations directory.
- Destination detail pages for Jaipur, Udaipur, Jaisalmer, Jodhpur, Mount Abu and Pushkar.
- Initial high-intent static service pages including Jaipur local taxi, full-day Jaipur sightseeing, Jaipur Airport taxi and Jaipur Railway Station taxi.
- Privacy Policy and Terms & Conditions static pages.

## Source snapshot

A second safety copy of central written content is retained under `migration-source/data/` in the new repository. This is an archive/reference layer and should not be treated as a second production content system.

## Production routing

The migrated PHP site content is preserved for completeness and data-driven routes. The repository also contains enhanced static HTML pages from the new theme. `.htaccess` / `DirectoryIndex` should remain the authority for the production entry point on PHP hosting.

Do not delete legacy PHP/data files until the corresponding live URL has been checked against the static replacement and redirects/canonicals have been decided.

## Migration automation

The temporary GitHub Actions workflow used to perform the full source migration was deleted after the successful migration commit. `tools/migrate_full_content.py` may remain only as a manual historical/recovery utility; it is not scheduled or automatic.

## What remains

These are **post-migration QA/theme-integration tasks**, not source-content migration:

1. Decide final preferred URL for duplicate HTML/PHP equivalents and add redirects/canonicals.
2. Finish converting any desired PHP route/service/blog pages to the enhanced static-theme presentation where useful.
3. Consolidate header/footer so all live pages use the same production logo, navigation and CTA style.
4. Replace any remaining temporary theme imagery with migrated Swiggy Wala imagery and verify alt text.
5. Rebuild/verify sitemap entries against the final preferred URLs.
6. Run a broken-link, image-path, canonical, metadata, mobile and form/WhatsApp sweep before deployment.
7. Verify the deployed domain responds correctly for the selected production entry point and all important migrated URLs.

## Migration rule

Do not invent prices, ratings, reviews, certifications or claims. Preserve verified source content and use `Price on request` where that is the existing source value.
