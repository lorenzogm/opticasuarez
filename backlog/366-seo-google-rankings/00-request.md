# SEO Audit & Fixes — Issue #366

**Date**: 2025-07-13
**Issue**: Comprobar porque no está en las primeras posiciones de las búsquedas de Google

## Changes Implemented

### CRITICAL: Block dev deployment crawling
- **File**: `apps/web/server/routes/robots.txt.ts`
- Non-production deployments (e.g., opticasuarez-web-dev.vercel.app) now return `Disallow: /` to prevent duplicate content indexing
- Production domain returns normal `Allow: /` with booking flow blocked

### CRITICAL: Enhanced LocalBusiness structured data
- **File**: `apps/web/src/routes/__root.tsx`
- Replaced generic Organization schema with proper `Optician` type
- Added two separate department entries (Centro and Bulevar) each with:
  - Full `PostalAddress`
  - `GeoCoordinates` (lat/lng)
  - `openingHoursSpecification`
  - `hasMap` Google Maps link
  - `telephone` and `email`
- Added `serviceArea` (Jaén, Andalucía)
- Added `hasOfferCatalog` with all services
- Added `foundingDate`, `priceRange`, `inLanguage`

### HIGH: Homepage title optimization
- **File**: `apps/web/src/routes/index.tsx`
- Changed from: "Óptica Suárez, tu óptica en Jaén. Desde 1940 mirando por ti"
- Changed to: "Óptica en Jaén | Óptica Suárez - Desde 1940 cuidando tu visión"
- Primary keyword "Óptica en Jaén" now leads the title tag

### HIGH: hreflang tags added
- **File**: `apps/web/src/routes/__root.tsx`
- Added `<link rel="alternate" hreflang="es">` and `<link rel="alternate" hreflang="x-default">`

### MEDIUM: Booking flow noindex
- **File**: `apps/web/src/routes/cita.tsx`
- Added `<meta name="robots" content="noindex, nofollow">` to prevent thin booking pages from being indexed
- Also blocked `/cita` in robots.txt

## Remaining Recommendations (not implemented — require content work)

1. **FAQ schema on all service pages** — Add FAQPage structured data with relevant Q&A for each service
2. **Related services cross-linking** — Each service page should link to 2-3 related services
3. **Google Search Console** — Verify site ownership and submit sitemap
4. **Unique OG images** per page (design task)
5. **Core Web Vitals** — Run Lighthouse audit and optimize LCP/CLS
