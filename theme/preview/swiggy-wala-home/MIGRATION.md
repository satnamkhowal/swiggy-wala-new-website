# Swiggy Wala content migration

Source repository: `satnamkhowal/swiggy-wala-website`
Target repository: `satnamkhowal/swiggy-wala-new-website`
Theme base: `theme/preview/main-home/` (AtlasTrip static HTML assets)
Working variant: `theme/preview/swiggy-wala-home/`

## Migrated in first batch

- Production brand/contact constants from the existing website.
- Existing homepage SEO title and description.
- Existing homepage hero positioning and trip-planning message.
- Rajasthan destinations: Udaipur, Jaipur, Jaisalmer, Jodhpur, Mount Abu and Pushkar.
- Existing package set: Udaipur Heritage Escape, Royal Rajasthan Circuit, Desert & Fort Adventure and Rajasthan Honeymoon.
- Full service catalogue grouped into Tour Operator Services, Jaipur & Rajasthan Packages, Travel & Transport Services and Specialized Tours.
- Eight Jaipur location addresses and Google Maps links.
- Existing four-step trip-planning flow.
- WhatsApp and phone conversion actions.
- TravelAgency structured data on the new homepage.

## Files

- `index.html` — first migrated homepage.
- `services.html` — first migrated services catalogue page.
- `locations.html` — first migrated Jaipur branch directory.
- `assets/css/swiggy-wala.css` — Swiggy Wala visual layer on top of the existing AtlasTrip theme assets.
- `assets/data/site-content.json` — centralized migrated content for future pages.

## Next migration batch

1. About and contact pages.
2. Destination index and individual destination pages.
3. Package index and tour package detail templates.
4. High-intent Jaipur taxi/route service pages.
5. Blog and travel-guide migration.
6. Individual Jaipur branch pages with local SEO/schema.
7. Copy the production Swiggy Wala logo and selected source imagery into the new theme asset tree.
8. Replace temporary theme imagery with source-specific optimized images and verify alt text.
9. Final header/footer consolidation, internal links, sitemap, robots, canonical URLs and broken-link sweep.

## Migration rule

Do not invent prices, ratings, reviews, certifications or claims. Preserve verified source content and use `Price on request` where that is the existing source value.
