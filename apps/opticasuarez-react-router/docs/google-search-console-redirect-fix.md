# Google Search Console Redirect Fix

## Problem

Google Search Console was not indexing several pages due to "page with redirect" issues:

- http://www.opticasuarezjaen.es/
- https://www.opticasuarezjaen.es/  
- http://opticasuarezjaen.es/
- https://opticasuarezjaen.es/quienes-somos
- https://opticasuarezjaen.es/blog/terapia-visual-rehabilitacion-funcion-visual

## Root Cause

The issue was redirect chains for www versions:
- `http://www.opticasuarezjaen.es/` → `https://www.opticasuarezjaen.es/` → `https://opticasuarezjaen.es/` (2 redirects)

Google Search Console penalizes redirect chains and won't index pages that require multiple redirects to reach the final destination.

## Solution

Added direct redirects in `vercel.json` to redirect all www versions directly to the canonical HTTPS non-www version in a single step:

```json
{
  "redirects": [
    {
      "source": "/(.*)",
      "has": [
        {
          "type": "host",
          "value": "www.opticasuarezjaen.es"
        }
      ],
      "destination": "https://opticasuarezjaen.es/$1",
      "permanent": true
    }
  ],
  "headers": [
    {
      "source": "/((?!.*\\.).*)$",
      "headers": [
        {
          "key": "Content-Type",
          "value": "text/html; charset=utf-8"
        }
      ]
    }
  ]
}
```

This configuration:
1. Redirects any www version directly to the non-www version
2. Uses a 301 permanent redirect
3. Preserves the path with the `$1` parameter
4. Eliminates the redirect chain

## Result

After deployment, the redirect behavior should be:
- `http://www.opticasuarezjaen.es/` → `https://opticasuarezjaen.es/` (single 301 redirect)
- `https://www.opticasuarezjaen.es/` → `https://opticasuarezjaen.es/` (single 301 redirect)
- `http://opticasuarezjaen.es/` → `https://opticasuarezjaen.es/` (single 308 redirect, handled by Vercel)
- `https://opticasuarezjaen.es/` → 200 OK (no redirect needed)

## Canonical URLs

All pages already had consistent canonical URLs pointing to `https://opticasuarezjaen.es`, which is maintained.

## Testing

Added comprehensive tests in `tests/e2e/redirect-config.spec.ts` to verify:
1. Vercel.json redirect configuration is correct
2. Canonical URLs are consistent across pages
3. Sitemap uses only the canonical domain