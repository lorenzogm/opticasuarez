# Issue #373 — Rebuild app with TanStack Start

## Original Request (from GitHub Issue)

Create a new application at `apps/web/` using TanStack Start (React meta-framework built on TanStack Router + Vite). This app must reproduce the exact same content and UI as the existing site, using TanStack Start's file-based routing, SSR capabilities and type-safe patterns.

## Corrected Context

The issue description references `apps/opticasuarez-github/` which no longer exists. After issue #371, the source app is at `apps/opticasuarez-react-router/`.

The issue mentions only 4 pages (home, about, services, contact) but the actual app has 22+ routes including:
- 7 service detail pages
- 5-step booking flow
- Blog with dynamic routes
- Server routes (robots.txt, sitemap.xml, og-image.jpg)
- Email server action via Resend

**Source:** `apps/opticasuarez-react-router/`
**Target:** `apps/web/`
**Priority:** High
**Labels:** priority:high, feature
