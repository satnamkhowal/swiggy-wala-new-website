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

## Migrated in second batch

- `about.html` using the existing Swiggy Wala positioning: real-person travel planning, sensible routing, clear choices and local Rajasthan focus.
- `contact.html` using the verified phone, WhatsApp number, support email and Jaipur office location.
- Static contact form converted into a functional WhatsApp enquiry composer instead of showing a fake form-success state without a backend.
- `destinations.html` with all six source destinations and suggested stay durations.
- `packages.html` with all four existing package concepts and `Price on request` retained.
- Shared `assets/css/pages.css` for inner-page hero, content, cards, forms and responsive layouts.
- Cross-page links added across the new second-batch pages for About, Destinations, Packages, Services, Locations and Contact.

## Files

- `index.html` — first migrated homepage.
- `about.html` — migrated About page.
- `contact.html` — migrated Contact page with WhatsApp enquiry flow.
- `destinations.html` — migrated Rajasthan destination index.
- `packages.html` — migrated Rajasthan package index.
- `services.html` — first migrated services catalogue page.
- `locations.html` — first migrated Jaipur branch directory.
- `assets/css/swiggy-wala.css` — Swiggy Wala visual layer on top of the existing AtlasTrip theme assets.
- `assets/css/pages.css` — shared inner-page visual layer.
- `assets/data/site-content.json` — centralized migrated content for future pages.

## Next migration batch

1. Individual destination detail pages.
2. Tour package detail templates/pages.
3. High-intent Jaipur taxi/route service pages.
4. Blog and travel-guide migration.
5. Individual Jaipur branch pages with local SEO/schema.
6. Copy the production Swiggy Wala logo and selected source imagery into the new theme asset tree when binary asset transfer is available.
7. Replace temporary theme imagery with source-specific optimized images and verify alt text.
8. Final header/footer consolidation, homepage links, internal links, sitemap, robots, canonical URLs and broken-link sweep.

## Migration rule

Do not invent prices, ratings, reviews, certifications or claims. Preserve verified source content and use `Price on request` where that is the existing source value.
