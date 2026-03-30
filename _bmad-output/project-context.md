---
project_name: 'opticasuarez'
user_name: 'Mira Ben'
date: '2026-03-30'
sections_completed:
  ['technology_stack', 'language_rules', 'framework_rules', 'testing_rules', 'quality_rules', 'workflow_rules', 'anti_patterns']
status: 'complete'
rule_count: 47
optimized_for_llm: true
---

# Project Context for AI Agents

_Este archivo contiene reglas críticas y patrones que los agentes IA deben seguir al implementar código en este proyecto. Se centra en detalles no obvios que los LLMs necesitan recordar._

---

## Technology Stack & Versions

- **Runtime:** Node.js 22
- **Package Manager:** pnpm 10.5.0 (monorepo workspaces)
- **Monorepo Orchestrator:** Turborepo 2.5.6
- **Meta-framework:** TanStack Start ^1.121.0 (SSR + prerendering)
- **Router:** TanStack React Router ^1.121.0 (file-based routing)
- **UI Library:** React ^18.3.1
- **Server:** Nitro 3.0.260311-beta (server routes, prerendering)
- **Build:** Vite ^7.0.0
- **CSS:** Tailwind CSS ^4.1.11 (PostCSS plugin)
- **Language:** TypeScript ^5.9.2 (strictNullChecks enabled)
- **CMS:** Sanity ^3.75.0 (Project ID: 2a24wmex, Dataset: production)
- **Email:** Resend ^6.0.1
- **Linter/Formatter:** Biome 2.2.7 (via Ultracite 5.6.4)
- **Testing E2E:** Playwright ^1.54.2
- **Testing Unit:** Vitest 4.0.1
- **Git Hooks:** Lefthook 2.0.0
- **UI Primitives:** CVA ^0.7.1, clsx ^2.1.1, tailwind-merge ^3.3.1, Radix UI Slot, Lucide icons, Embla Carousel
- **Rich Content:** @portabletext/react 6.0.3

---

## Critical Implementation Rules

### Data Fetching — SIEMPRE Server Functions

- TODO el data fetching DEBE usar `createServerFn` de `@tanstack/react-start`
- NUNCA llamar a la API de Sanity directamente desde componentes de cliente
- Las server functions se definen en `src/lib/server-fns.ts`
- Los server actions (mutations) van en `src/actions/`
- Patrón GET: `createServerFn({ method: "GET" }).handler(async () => { ... })`
- Patrón POST con input: `createServerFn({ method: "POST" }).inputValidator(...).handler(...)`
- Usar `isPreviewMode()` internamente en cada server function para detectar preview

### Sanity CMS — Queries y Resolución de Imágenes

- Usar `sanityFetch()` de `src/lib/sanity.ts` para todas las queries GROQ
- Producción usa CDN (`apicdn.sanity.io`), preview usa API directa (`api.sanity.io`)
- Preview mode se detecta via cookie `__sanity_preview` === "1"
- Resolver imágenes SIEMPRE con `resolveImage()` — maneja objetos Sanity, refs y URLs string
- En GROQ queries, usar la proyección de imagen: `"image": image { asset->{url, _ref} }`
- Reutilizar `locationProjection` y `imageProjection` existentes para queries relacionadas

### Page Builder Pattern

- Las páginas de Sanity usan secciones composables (14 tipos)
- Añadir nueva sección requiere 4 pasos:
  1. Schema en Sanity: `schemas/sections/section-nueva.ts`
  2. Componente React: `components/sections/section-nueva.tsx` con interfaz `({ section }: { section: any })`
  3. Registrar en `sectionComponents` de `section-renderer.tsx`
  4. Añadir tipo al array `of` en `schemas/documents/page.ts`
- El `_type` de Sanity debe coincidir EXACTAMENTE con la key en `sectionComponents`

### Route Pattern (TanStack Router)

- Cada ruta exporta `Route` via `createFileRoute("/<path>")`
- Patrón obligatorio: `head()` con `buildHeadFromSanitySeo()` + `fallback` con title/description en español
- Loader llama a una server function, NUNCA hace fetch directo
- La ruta `$.tsx` es catch-all para páginas dinámicas de Sanity — NO crear rutas estáticas para contenido de Sanity
- Rutas con query params DEBEN usar `validateSearch` para tipar y validar parámetros
- Layout routes (ej. `/cita.tsx`) usan `<Outlet />` para anidar subrutas

### Feature Flags

- La tienda (`/tienda/*`) está protegida por `settings.featureFlags.shopEnabled`
- Nuevas rutas de tienda DEBEN verificar este flag en el loader: `if (!settings?.featureFlags?.shopEnabled) throw new Error("Page not found")`
- Feature flags se obtienen de Sanity via `fetchSiteSettings()`

### Input Validation en Server Actions

- Toda mutation DEBE usar `.inputValidator()` con validación explícita
- Sanitizar inputs: `.trim().slice(0, maxLength)` para prevenir abuse
- Validar campos obligatorios antes de procesar
- Validar formato de email con regex cuando aplique

### Portable Text — Contenido Enriquecido

- Contenido enriquecido de Sanity (body de blog, descriptions de producto) usa `@portabletext/react`
- Renderizar `body` o `description` de Sanity con `<PortableText value={...} />`
- NUNCA usar `.toString()` ni acceso directo a `.children[0].text` para renderizar Portable Text (excepto para extraer texto plano en meta descriptions)

---

### Naming & File Conventions

- Archivos y carpetas: **kebab-case** siempre (`book-appointment.tsx`, NO `BookAppointment.tsx`)
- Componentes React: **PascalCase** dentro de archivos kebab-case
- Imports usan alias `~/` que resuelve a `./src/`
- Exportación: `export default` para componentes de página/sección, named exports para utilities
- JSON imports estáticos usan syntax ESM: `import data from "~/content/file.json" with { type: "json" }`

### Tailwind CSS & Styling

- Usar `cn()` de `src/lib/utils.ts` para merge condicional de clases (clsx + tailwind-merge)
- Componentes con variantes usan CVA (`class-variance-authority`)
- NO usar CSS modules ni styled-components en la app web
- Tailwind CSS 4 usa PostCSS plugin, NO la configuración legacy
- Estilos globales mínimos en `global.css` — preferir clases de utilidad

### Component Patterns

- Componentes base (`Button`, `Text`) usan `React.forwardRef` + CVA + `cn()` + `displayName`
- Section components reciben exactamente `({ section }: { section: any })` como props
- `Button` soporta `href` (Link interno/externo), variantes `primary`/`secondary`/`outline`
- `Text` tiene variantes de heading (1-5) y body (sm/md/lg)
- `Image` custom con soporte WebP y responsive sources
- `YouTubeFacade` para carga lazy de videos
- `StructuredData` para JSON-LD (Schema.org)

### Biome/Linter

- Linter: Biome via Ultracite — ejecutar `pnpm fix` para auto-corregir
- Para Sanity data: usar `// biome-ignore lint/suspicious/noExplicitAny: Sanity data` como patrón de supresión
- Muchas reglas de a11y desactivadas — no fallarán en CI pero seguir buenas prácticas
- Pre-commit hook (Lefthook) ejecuta `ultracite fix` automáticamente

### Monorepo Rules

- TODOS los comandos desde la raíz del monorepo, nunca desde subdirectorio
- Ejecutar `pnpm check` antes de cada PR (types + lint + build + tests)
- `apps/opticasuarez-react-router/` está **DEPRECATED** — NO modificar, NO referenciar, NO usar como ejemplo
- La app principal es `apps/web/` (TanStack Start)
- Workspace package `@opticasuarez/configs` provee TypeScript base configs

---

### SEO — Obligatorio en Cada Ruta

- Toda ruta DEBE tener `head()` con `buildHeadFromSanitySeo()` + fallback en español
- Rutas transaccionales/formularios (ej. `/cita/*`) DEBEN tener `noindex, nofollow`
- Canonical URLs se generan automáticamente
- Sitemap y robots.txt se generan dinámicamente via Nitro server routes
- Root layout incluye JSON-LD `WebSite` + `Optician` — nuevas páginas pueden añadir JSON-LD adicional

### Prerendering

- Homepage, blog y páginas de Sanity se pre-renderizan en build
- Rutas `/cita/*` y `/tienda/*` NO se pre-renderizan (SSR dinámico)
- Rutas de servicios legacy excluidas del prerender (filter en `vite.config.ts`)
- Nitro pre-renderiza `/sitemap.xml` y `/robots.txt`
- Al añadir nuevas rutas estáticas, considerar si necesitan añadirse al filter de prerender

---

### Git & PR Workflow

- Branch naming: `copilot/<issue>-<slug>` para Copilot agent
- PR title: referenciar issue (`feat: ... — closes #42`)
- Reviewers obligatorios: **juanpeich** y **lorenzogm**
- NO merge sin aprobación — solo reviewers mergen
- CI: `pr-checks.yml` ejecuta `pnpm check` en cada PR

### Deploy

- Push a `main` → deploy automático a Vercel (`web-vercel-deploy.yml`)
- Sanity Studio se deploya por separado (`deploy-sanity-studio.yml`)
- Variables de entorno: `SANITY_PROJECT_ID`, `SANITY_DATASET`, `SANITY_API_TOKEN`, `RESEND_API_KEY`

### Testing

- E2E: Playwright en `apps/web-e2e/` — target `localhost:3000` o URL de Vercel
- Unitarios: Vitest a nivel de monorepo
- Para tests contra Vercel, usar header `x-vercel-protection-bypass`

---

### Critical Don't-Miss Rules

- ❌ NUNCA hacer fetch a Sanity desde el cliente — siempre server functions
- ❌ NUNCA crear rutas estáticas para páginas que existen como `page` en Sanity (causa conflicto con catch-all `$.tsx`)
- ❌ NUNCA modificar `apps/opticasuarez-react-router/` — está deprecated
- ❌ NUNCA usar `require()` para JSON — usar ESM `import ... with { type: "json" }`
- ❌ NUNCA renderizar Portable Text con `.toString()` — usar `<PortableText />`
- ❌ NUNCA olvidar `buildHeadFromSanitySeo()` con fallback en nuevas rutas
- ❌ NUNCA añadir rutas de tienda sin verificar `featureFlags.shopEnabled`
- ❌ NUNCA ejecutar comandos desde subdirectorio — siempre desde raíz del monorepo
- ✅ SIEMPRE sanitizar inputs en server actions (`.trim().slice(0, max)`)
- ✅ SIEMPRE usar `resolveImage()` para imágenes de Sanity
- ✅ SIEMPRE mantener interfaz `({ section }: { section: any })` en section components
- ✅ SIEMPRE seguir los 4 pasos para nueva sección de page builder

---

## Usage Guidelines

**Para agentes IA:**

- Leer este archivo ANTES de implementar cualquier código
- Seguir TODAS las reglas exactamente como están documentadas
- Ante duda, preferir la opción más restrictiva
- Actualizar este archivo si emergen nuevos patrones

**Para humanos:**

- Mantener este archivo lean y enfocado en necesidades de agentes
- Actualizar cuando cambie el stack tecnológico
- Revisar periódicamente para eliminar reglas obsoletas
- Eliminar reglas que se vuelvan obvias con el tiempo

Última actualización: 2026-03-30
