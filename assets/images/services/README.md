# Swiggy Wala service image folders

Every SEO service page should keep its generated images inside its own folder:

`/assets/images/services/{service-slug}/`

Recommended filenames:

- `{service-slug}-hero.webp` — page hero / Open Graph image, recommended 1200 × 900.
- `{service-slug}-card.webp` — website service card and Google Business Profile reusable creative, recommended 1200 × 900.
- Optional JPG exports can use the same basename if another publishing workflow requires JPG.

The SEO page template checks whether the image exists before rendering it, so pages stay live without broken images until generation is complete.

Brand rules:
- Use the official Swiggy Wala logo unchanged.
- Do not distort, redraw or recolor the logo.
- Keep text minimal on creatives.
- Do not add fake prices, fake ratings or unsupported claims.
