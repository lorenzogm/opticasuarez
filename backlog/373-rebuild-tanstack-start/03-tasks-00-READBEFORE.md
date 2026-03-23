# Task 00 — READ BEFORE Starting Any Task

## Issue Summary
Migrate `apps/opticasuarez-react-router/` (React Router v7) → `apps/web/` (TanStack Start).

## Source Reference
All source code is at `apps/opticasuarez-react-router/app/`. Do NOT modify the source app.

## Key Differences: React Router v7 → TanStack Start

### Route definition
```tsx
// React Router v7 (old)
export function meta() { return [{ title: "..." }] }
export default function Page() { ... }

// TanStack Start (new)
export const Route = createFileRoute('/path')({
  head: () => ({ meta: [{ title: '...' }] }),
  component: PageComponent,
})
function PageComponent() { ... }
```

### Root layout
```tsx
// React Router v7: root.tsx with Links, Meta, Scripts, ScrollRestoration
// TanStack Start: __root.tsx with HeadContent, Scripts, createRootRoute
```

### Links
```tsx
// React Router: import { Link } from 'react-router'
// TanStack Start: import { Link } from '@tanstack/react-router'
```

### Server routes
```tsx
// React Router v7: export async function loader() { return new Response(...) }
// TanStack Start:
export const Route = createFileRoute('/robots.txt')({
  server: {
    handlers: {
      GET: async () => new Response('...')
    }
  }
})
```

### Server functions (for email)
```tsx
// React Router v7: plain async function (called from action)
// TanStack Start: createServerFn({ method: 'POST' }).handler(...)
```

## File Naming Conventions (TanStack Router)
- `index.tsx` → `/` (root)
- `about.tsx` → `/about`
- `blog.$slug.tsx` → `/blog/:slug`
- `cita_.centro.tsx` → `/cita/centro` (flat nested route with `_` separator)
- `robots[.]txt.ts` → `/robots.txt` (escaped dot for server routes)

## Path Alias
Use `~/*` → `./src/*` (configured in tsconfig.json)

## Preflight Command
```bash
cd apps/web && npm run lint && npm run build
```
Both must pass before marking any task complete.
