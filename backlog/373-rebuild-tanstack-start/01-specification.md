# Specification: Rebuild app with TanStack Start

## Overview

Migrate the existing React Router v7 application (`apps/opticasuarez-react-router/`) to a new TanStack Start application (`apps/web/`). The new app must reproduce 100% of the existing functionality and visual output while leveraging TanStack Start's type-safe routing, SSR, server routes, and server functions.

## Functional Requirements

### Routes to Migrate (22 total)

**Static content pages (13):**
- `/` — Homepage
- `/servicios` — Services overview
- `/quienes-somos` — About page
- `/contacto` — Contact page
- `/examen-visual` — Eye exam service
- `/contactologia` — Contact lens service
- `/terapia-visual` — Visual therapy service
- `/vision-deportiva` — Sports vision service
- `/vision-pediatrica` — Pediatric vision service
- `/control-de-miopia` — Myopia control service
- `/ortoqueratologia` — Orthokeratology service
- `/planveo` — PlanVEO subsidy info
- `/cita` — Booking entry point

**Dynamic routes (2):**
- `/blog` — Blog listing
- `/blog/$slug` — Dynamic blog posts (12 markdown-based posts)

**Booking flow (4):**
- `/cita/centro` — Select location
- `/cita/horario` — Select date/time
- `/cita/contacto` — Enter contact info
- `/cita/confirmacion` — Confirmation page

**Server routes (3):**
- `/robots.txt` — Dynamic robots.txt
- `/sitemap.xml` — Dynamic XML sitemap
- `/og-image.jpg` — Dynamic OpenGraph image generation

### Components to Migrate

**UI Components (13):** button, carousel, faq-accordion, global-navigation, google-tag-manager, hero-carousel, hero-slider, image, progress-indicator, social-share, structured-data, text, youtube-facade

**Sections (7):** about, book-appointment, brands, contact, customer-testimonials, locations-info, services-grid

**Page Components (14 directories):** Each page has its own component directory under `ui/pages/` with per-page sections.

### Server-Side Features

- **Email sending** via Resend (booking confirmation emails)
- **Blog content** from Markdown files with gray-matter frontmatter parsing
- **Dynamic sitemap** including all static routes + blog posts
- **Dynamic robots.txt**
- **OG image generation**

## Non-Functional Requirements

- **Visual parity**: Output must be indistinguishable from current site
- **SEO parity**: All meta tags, canonical URLs, structured data, OG tags preserved
- **Performance**: SSR enabled, static prerendering for content pages
- **TypeScript**: Strict mode, no `any` types
- **Tailwind CSS 4**: Same styling system as current app

## Technical Architecture

### React Router v7 → TanStack Start Mapping

| React Router v7 | TanStack Start |
|---|---|
| `routes.ts` (explicit config) | File-based routing in `src/routes/` |
| `meta()` export | `head()` property on route |
| `loader()` | `loader()` (same concept) |
| `action()` / server functions | `createServerFn()` |
| `root.tsx` (Links, Meta, Scripts) | `__root.tsx` (HeadContent, Scripts) |
| `<Link>` from react-router | `<Link>` from @tanstack/react-router |
| `<Outlet>` | `<Outlet>` (same) |
| `ScrollRestoration` | `scrollRestoration: true` in router |
| `react-router.config.ts` prerender | `tanstackStart({ prerender: {...} })` in vite.config.ts |
| Server routes (.ts extension) | Server routes with `server.handlers` |

### Project Structure

```
apps/web/
├── src/
│   ├── routes/
│   │   ├── __root.tsx             # Root layout (html/head/body)
│   │   ├── index.tsx              # Home page (/)
│   │   ├── servicios.tsx          # /servicios
│   │   ├── quienes-somos.tsx      # /quienes-somos
│   │   ├── contacto.tsx           # /contacto
│   │   ├── examen-visual.tsx      # /examen-visual
│   │   ├── contactologia.tsx      # /contactologia
│   │   ├── terapia-visual.tsx     # /terapia-visual
│   │   ├── vision-deportiva.tsx   # /vision-deportiva
│   │   ├── vision-pediatrica.tsx  # /vision-pediatrica
│   │   ├── control-de-miopia.tsx  # /control-de-miopia
│   │   ├── ortoqueratologia.tsx   # /ortoqueratologia
│   │   ├── planveo.tsx            # /planveo
│   │   ├── blog.tsx               # /blog
│   │   ├── blog.$slug.tsx         # /blog/$slug
│   │   ├── cita.tsx               # /cita
│   │   ├── cita_.centro.tsx       # /cita/centro
│   │   ├── cita_.horario.tsx      # /cita/horario
│   │   ├── cita_.contacto.tsx     # /cita/contacto
│   │   ├── cita_.confirmacion.tsx # /cita/confirmacion
│   │   ├── robots[.]txt.ts       # /robots.txt server route
│   │   ├── sitemap[.]xml.ts      # /sitemap.xml server route
│   │   └── og-image[.]jpg.ts     # /og-image.jpg server route
│   ├── components/                # All shared UI components
│   ├── sections/                  # Shared section components
│   ├── pages/                     # Page-level components and page sections
│   ├── content/                   # JSON + Markdown content files
│   ├── lib/                       # Utility functions
│   ├── actions/                   # Server actions
│   ├── router.tsx                 # Router configuration
│   └── routeTree.gen.ts           # Auto-generated route tree
├── public/                        # Static assets (images, favicon, etc.)
├── vite.config.ts
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── eslint.config.js
```

### Key Dependencies

**Production:**
- `@tanstack/react-start` (RC)
- `@tanstack/react-router`
- `react`, `react-dom` (18.x)
- `@tailwindcss/postcss` (4.x)
- `embla-carousel-react` (8.x)
- `resend` (6.x)
- `lucide-react`
- `gray-matter`
- `class-variance-authority`, `tailwind-merge`, `clsx`
- `@forge42/seo-tools`

**Development:**
- `vite`
- `@vitejs/plugin-react`
- `typescript`, `@types/react`, `@types/react-dom`, `@types/node`
- `eslint` + config

## Success Criteria

- [ ] `npm run dev` starts TanStack Start dev server
- [ ] `npm run build` completes without errors
- [ ] All 22 routes render correctly
- [ ] Visual output matches current React Router app
- [ ] SEO metadata (meta tags, OG, canonical, structured data) matches
- [ ] Blog posts load from Markdown
- [ ] Booking flow works end-to-end (including email via Resend)
- [ ] Server routes (robots.txt, sitemap.xml) return correct content
- [ ] TypeScript strict mode, no errors
- [ ] Tailwind CSS styling works identically
