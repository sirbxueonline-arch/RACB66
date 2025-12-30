# Rent A Car Baku 66 (Static)

Premium, static, multi-language car rental website built with Next.js, Tailwind CSS, next-intl, and Framer Motion.

## Setup

```bash
npm install
npm run dev
```

The site runs at `http://localhost:3000/`.

## Build (Static Export)

```bash
npm run build
```

The static export will be generated in the `out/` directory.

## i18n

- Locales: `az` (default), `en`, `ru`
- Messages live in `src/messages/*.json`
- Language switching is client-side (no locale segments in the URL)

To add a new locale:
1. Update `src/i18n/routing.ts`
2. Add a new message file in `src/messages`
3. Provide translations for all keys

## Data

Static data is stored as JSON in `src/data`:
- `cars.json`
- `promos.json`
- `faqs.json`
- `destinations.json`
- `reviews.json`
- `services.json`
- `delivery-fees.json`

Update those files to change the content and pricing inputs.

## Blog (MDX)

Blog posts are stored in `src/content/blog`:

```
slug.locale.mdx
```

Example: `baku-night-drive.az.mdx`

Frontmatter:
```
title
excerpt
date
author
categories
cover
```

## Images

All placeholders live in `public/images`. Replace with real assets and keep the same paths:
- Hero: `public/images/hero-baku.jpg`, `public/images/hero-car.jpg`
- Cars: `public/images/cars/*`
- Destinations: `public/images/destinations/*`
- Blog: `public/images/blog/*`

## Pricing Engine

The pricing engine is in `src/lib/pricing.ts` and powers:
- Car cards
- Car detail pricing
- Booking review totals

## Optional Comments

Enable comments on blog posts:

```
NEXT_PUBLIC_COMMENTS_ENABLED=true
```

See `.env.example`.

## Lighthouse & Accessibility

1. Build the project: `npm run build`
2. Serve the export: `npx serve out`
3. Run Lighthouse against:
   - `http://localhost:3000/`
   - Switch languages via the header and re-run for each locale

Recommended thresholds:
- Performance 90+
- Accessibility 95+
- SEO 90+
- Best Practices 90+
