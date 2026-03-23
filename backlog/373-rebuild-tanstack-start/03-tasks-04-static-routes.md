# Task 04 — Migrate static page routes

## Objective
Create all static page route files using TanStack Start conventions: `createFileRoute`, `head()`, `component`, and `loader()` where needed.

## Page Components to Copy First
Source: `apps/opticasuarez-react-router/app/ui/pages/`
Target: `apps/web/src/pages/`

Copy all page directories and their section subdirectories:
- homepage/ (homepage.tsx + sections/)
- servicios/
- quienes-somos/
- contacto/ (contacto.tsx + sections/)
- examen-visual/
- contactologia/ (contactologia.tsx + sections/)
- control-de-miopia/
- ortoqueratologia/
- plan-veo/
- terapia-visual/
- vision-deportiva/
- vision-pediatrica/

Update import paths: `~/ui/components/` → `~/components/`, `~/ui/sections/` → `~/sections/`, `~/ui/lib/` → `~/lib/`

## Route Files to Create (13)
Target: `apps/web/src/routes/`

For each route, convert from React Router v7 pattern:
```tsx
// Old: export function meta() { return [...] }
// Old: export default function Page() { return <PageComponent /> }

// New:
export const Route = createFileRoute('/path')({
  head: () => ({
    meta: [...],
    links: [{ rel: 'canonical', href: '...' }],
  }),
  component: PageComponent,
})
```

Routes:
1. `index.tsx` → `/` (home)
2. `servicios.tsx` → `/servicios`
3. `quienes-somos.tsx` → `/quienes-somos`
4. `contacto.tsx` → `/contacto`
5. `examen-visual.tsx` → `/examen-visual`
6. `contactologia.tsx` → `/contactologia`
7. `terapia-visual.tsx` → `/terapia-visual`
8. `vision-deportiva.tsx` → `/vision-deportiva`
9. `vision-pediatrica.tsx` → `/vision-pediatrica`
10. `control-de-miopia.tsx` → `/control-de-miopia`
11. `ortoqueratologia.tsx` → `/ortoqueratologia`
12. `planveo.tsx` → `/planveo`
13. `cita.tsx` → `/cita`

## Key Changes per Route
- `export function meta()` → `head: () => ({ meta: [...] })`
- `export function links()` → `head: () => ({ links: [...] })`
- `export default function` → `component: function`
- Import generatePageKeywords from `~/lib/seo-keywords`
- Import page component from `~/pages/...`

## Acceptance Criteria
- [ ] All 13 route files created
- [ ] All page component directories copied with updated imports
- [ ] Meta tags (title, description, OG, Twitter) match source
- [ ] Canonical URLs preserved
- [ ] `npm run dev` renders all static pages
