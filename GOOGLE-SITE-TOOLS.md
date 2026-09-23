# Google site tools setup (static HTML)

Google Site Kit is a WordPress plugin, so this repository uses direct Google integrations instead.

## Current code setup

A central loader is available at:

`assets/js/google-site-tools.js`

It supports either:

- Google Tag Manager (`GTM-XXXXXXX`) — preferred when available
- Google Analytics 4 (`G-XXXXXXXXXX`) — used when GTM is blank

Do not fill both unless GTM is intentionally managing the GA4 tag. The loader prefers GTM when both values exist, which prevents duplicate direct GA4 page-view tracking.

## Conversion events prepared

The loader automatically prepares these events:

- `phone_click` for `tel:` links
- `whatsapp_click` for WhatsApp links
- `lead_submit` for HTML form submits
- Custom link events via `data-track-event="event_name"`

A global helper is also available:

```js
swTrack('book_taxi', { route: 'jaipur-to-udaipur' });
```

## Google Search Console

Search Console verification must be completed separately because the verification token is issued by the Google account that owns the property.

Preferred HTML-tag method:

```html
<meta name="google-site-verification" content="GOOGLE_VERIFICATION_TOKEN">
```

Add the real token inside the `<head>` of the home page, then verify the `https://swiggywala.com/` property in Google Search Console.

DNS verification can be used instead if the domain-level property is preferred.

## Activation checklist

1. Provide or create a GTM container ID or GA4 measurement ID.
2. Add the central loader to the current public HTML pages.
3. Add the Search Console verification token to the home page.
4. Verify live page views in GA4 Realtime or GTM Preview.
5. Test phone, WhatsApp and lead-form events.
6. Mark business-critical events such as `lead_submit` / `book_taxi` as key events in GA4.

## IDs still required

- GTM container ID: pending
- GA4 measurement ID: pending
- Search Console HTML verification token: pending
