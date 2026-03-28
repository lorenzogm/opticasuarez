# Implementation Plan: Sanity CMS Integration (#380)

## Architecture

```
apps/
├── sanity-studio/        # NEW — Sanity Studio v3
│   ├── sanity.config.ts  # Studio config
│   ├── sanity.cli.ts     # CLI config
│   ├── schemas/          # All document + object schemas
│   │   ├── documents/    # Document type schemas
│   │   └── objects/      # Reusable object schemas
│   ├── lib/
│   │   └── client.ts     # Sanity client (shared with web app)
│   └── package.json
├── web/
│   ├── src/
│   │   ├── lib/
│   │   │   ├── sanity.ts      # NEW — Sanity client + GROQ helpers
│   │   │   └── blog.ts        # REMOVE after migration
│   │   ├── routes/            # UPDATE — loader() fetches from Sanity
│   │   └── content/           # REMOVE after migration (backed up to /content)
│   └── package.json           # ADD @sanity/client; REMOVE gray-matter
└── ...

content/                  # NEW — backup of all original content
├── json/                 # All 14 JSON files
├── blog/                 # All 12 Markdown posts
└── images/               # All public/images/ files
```

## Technical Approach

### Sanity Client
- Single `@sanity/client` instance configured with project ID, dataset, API version
- GROQ queries in `apps/web/src/lib/sanity.ts` — one query function per page/route
- Preview mode: second client with `useCdn: false` + token + `perspective: "previewDrafts"`

### Data Fetching Pattern
```typescript
// apps/web/src/lib/sanity.ts
import { createClient } from "@sanity/client";

export const sanityClient = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: "production",
  apiVersion: "2026-03-23",
  useCdn: true,
});

export async function getHomepage() {
  return sanityClient.fetch(`*[_type == "homepage"][0]{ ... }`);
}
```

### Route Update Pattern
```typescript
// routes/index.tsx — before
import Homepage from "~/pages/homepage/homepage";
function RouteComponent() { return <Homepage />; }

// routes/index.tsx — after
import { createServerFn } from "@tanstack/react-start";
import { getHomepage } from "~/lib/sanity";
const loader = createServerFn({ method: "GET" }).handler(async () => getHomepage());
// Route uses loader() in createFileRoute config
```

### Content Migration
- Node.js script reads each JSON file, uploads images via Sanity asset API, creates documents
- Blog posts: parse Markdown frontmatter, convert body to Portable Text blocks
- Images: upload to Sanity CDN, store asset references in documents

## Task Breakdown (9 tasks)

| # | Task | Files | Depends On |
|---|------|-------|-----------|
| 01 | Bootstrap Sanity Studio + all schemas | `apps/sanity-studio/**` | — |
| 02 | Sanity client + query helpers in web app | `apps/web/src/lib/sanity.ts`, `.env` | 01 |
| 03 | Content backup + migration script | `/content/**`, `scripts/migrate-to-sanity.ts` | 01 |
| 04 | Homepage route → Sanity | `routes/index.tsx`, `pages/homepage/` | 02, 03 |
| 05 | All 8 service pages → Sanity | `routes/*.tsx`, `pages/*/` | 02, 03 |
| 06 | About + Contact + Services overview → Sanity | `routes/*.tsx`, `pages/*/` | 02, 03 |
| 07 | Blog listing + detail → Sanity (Portable Text) | `routes/blog/**`, `pages/blog/` | 02, 03 |
| 08 | SEO fields, preview mode, sitemap update | `routes/**`, `scripts/generate-sitemap.ts` | 04–07 |
| 09 | Cleanup: remove old imports, deps, deploy studio | `package.json`, old content files | 08 |
