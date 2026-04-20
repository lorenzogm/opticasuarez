---
story_key: 2-1-seo-critical-fixes-nap-faq-breadcrumbs
epic: 2
story: 1
status: review
date: '2026-04-20'
context:
  - _bmad-output/planning-artifacts/research/technical-seo-opticasuarezjaen-es-research-2026-04-20.md
  - _bmad-output/project-context.md
  - docs/architecture-web-tanstack.md
  - docs/architecture-sanity-studio.md
  - docs/integration-architecture.md
---

# Story 2.1: Correcciones SEO críticas restantes

## Historia de Usuario

Como propietario del negocio,
quiero corregir los bloqueos SEO críticos que siguen abiertos tras los PRs ya en curso,
para que Google rastree solo URLs sanas, entienda correctamente nuestras señales locales y no encuentre errores 500 o markup inválido en páginas indexables.

---

## Alcance y Motivación

La auditoría SEO del 20-04-2026 detectó varios problemas técnicos y semánticos. Parte de ellos ya tienen issue y PR propios. Esta historia se actualiza para cubrir solo el trabajo restante y para no duplicar cambios ya abiertos en GitHub.

### Ya cubierto por issues y PRs abiertos: no duplicar

| Issue | PR | Estado | Qué cubre |
|------|----|--------|-----------|
| #417 | #420 | Open | Normalización de rutas del sitemap con slash inicial |
| #419 | #421 | Open | Redirects 301 de URLs legacy de servicios |
| #415 | #422 | Open | Rutas canónicas `/servicios/*` en el sitemap generado en build |
| #416 | #424 | Open | Página `/blog` en blanco al entrar por URL directa |
| #418 | #427 | Open | BlogPosting/Article SEO, `twitter:image`, mejoras SEO generales y cambios en sitemap/blog |

### Esta historia sí cubre

1. NAP incorrecto en el JSON-LD global del negocio.
2. FAQPage ausente en páginas de servicio con FAQs visibles.
3. BreadcrumbList ausente en páginas dinámicas de Sanity y en posts de blog.
4. `hreflang` global incorrecto en sitio monolingüe.
5. `robots.txt` insuficiente para rutas no indexables.
6. `SearchAction` inválido en el schema `WebSite`.
7. Respuesta 500 de `/tienda` y `/tienda/*` cuando `shopEnabled` está desactivado.
8. Presencia de URLs de tienda en `sitemap.xml` cuando la tienda no debería ser indexable.

### Explícitamente fuera de scope en esta historia

- Reabrir el fix de `/blog` blank page.
- Volver a tocar redirects legacy de servicios.
- Repetir cambios de article metadata, `og:type` para blog, `twitter:image` o `lastmod` ya cubiertos en PR #427.
- Rehacer el fix del sitemap ya cubierto por PRs #420 y #422.

---

## Criterios de Aceptación

### AC1 — NAP corregido en structured data global

**Given** que `apps/web/src/routes/__root.tsx` emite el schema JSON-LD `Optician` con dos departamentos  
**When** se despliega la corrección  
**Then** los datos de ambas sedes coinciden exactamente con la información visible de la web y del contenido estático actual:

**Óptica Bulevar**
- `telephone`: `+34-953-09-30-62`
- `streetAddress`: `C. de Canarias, 6`
- `postalCode`: `23009`
- `addressLocality`: `Jaén`
- `email`: `bulevar@opticasuarezjaen.es`
- `hasMap`: URL de Google Maps hacia `C. de Canarias, 6, 23009 Jaén`

**Óptica Centro**
- `telephone`: `+34-953-22-31-80`
- `streetAddress`: `P.º de la Estación, 12`
- `postalCode`: `23003`
- `addressLocality`: `Jaén`
- `email`: `centro@opticasuarezjaen.es`
- `hasMap`: URL de Google Maps hacia `P.º de la Estación, 12, 23003 Jaén`

**And** las coordenadas geográficas se revisan contra la dirección real antes del merge  
**And** el schema valida sin errores en validator.schema.org

### AC2 — FAQPage solo donde realmente hay FAQ de servicio

**Given** que `sectionAccordion` es una sección genérica del page builder y no todo acordeón es una FAQ indexable  
**When** se renderiza una página dinámica bajo `/servicios/*` con una sección de preguntas frecuentes visible  
**Then** se inyecta un bloque JSON-LD `FAQPage` a nivel de página  
**And** cada ítem usa `Question.name` desde `title` y `Answer.text` desde `content`  
**And** no se emite `FAQPage` automáticamente para cualquier acordeón de cualquier otra página sin validar su semántica  
**And** el markup pasa Rich Results Test

### AC3 — BreadcrumbList en páginas internas que hoy no lo tienen

**Given** que `BreadcrumbSchema` ya se usa en `/blog`, `/tienda` y `/tienda/$slug`  
**When** se renderiza una página dinámica gestionada por `apps/web/src/routes/$.tsx`  
**Then** se emite `BreadcrumbList` con jerarquía correcta según `page.path`:
- `Inicio → Servicios → {Título}` para `/servicios/*`
- `Inicio → {Título}` para páginas de primer nivel como `/contacto`, `/quienes-somos` o `/planveo`

**And** cuando se renderiza `/blog/{slug}` se emite `Inicio → Blog → {Título del post}`  
**And** no se duplican breadcrumbs ya existentes en rutas que ya los tienen

### AC4 — Robots.txt bloquea rutas no indexables

**Given** que existen rutas operativas o transaccionales que no deben indexarse  
**When** se solicita `/robots.txt` en producción  
**Then** además de `/cita` se bloquean explícitamente:

```txt
Disallow: /carrito
Disallow: /checkout
Disallow: /api/
```

### AC5 — Hreflang corregido para sitio monolingüe

**Given** que el sitio solo publica contenido en español y no mantiene versiones equivalentes por idioma  
**When** se renderiza cualquier página  
**Then** no se emiten `hreflang` globales apuntando siempre a la home  
**And** la solución elegida es una de estas dos, pero no una mezcla ambigua:
- eliminar `hreflang` por completo
- o generarlo por página equivalente real

### AC6 — SearchAction válido o eliminado

**Given** que el schema `WebSite` actual anuncia una búsqueda en `/blog?search={search_term_string}`  
**When** la ruta del blog no soporta realmente el parámetro `search`  
**Then** ese `SearchAction` se elimina del JSON-LD global  
**Or** se sustituye por una implementación real y soportada, con ruta y parámetro funcionales

### AC7 — La tienda no devuelve 500 cuando está deshabilitada

**Given** que `/tienda` y `/tienda/$slug` dependen de `settings.featureFlags.shopEnabled`  
**When** la tienda está desactivada  
**Then** esas rutas no responden con error 500 por lanzar `new Error("Page not found")`  
**And** devuelven comportamiento de `notFound` / 404 coherente para usuarios y crawlers  
**And** si `shopEnabled` está activo, el comportamiento actual de catálogo y detalle no se rompe

### AC8 — El sitemap no anuncia URLs de tienda cuando la tienda está desactivada

**Given** que `apps/web/server/routes/sitemap.xml.ts` genera el sitemap público en producción  
**When** `shopEnabled` está desactivado  
**Then** el sitemap no incluye `/tienda` ni `/tienda/*`  
**And** no publica URLs que hoy devolverían 404 o 500  
**And** cuando `shopEnabled` esté activo, el sitemap sigue pudiendo incluir esas URLs correctamente

---

## Tasks / Subtasks

- [x] **Task 1: Corregir señales globales en `__root.tsx` y `robots.txt`** (AC: 1, 4, 5, 6)
  - [x] 1.1 Corregir NAP de `department` en el JSON-LD `Optician`
  - [x] 1.2 Verificar y ajustar `geo` y `hasMap` con las direcciones reales antes del merge
  - [x] 1.3 Eliminar o corregir los `hreflang` globales que hoy apuntan siempre a la home
  - [x] 1.4 Eliminar el `SearchAction` inválido mientras no exista búsqueda real en `/blog`
  - [x] 1.5 Añadir `Disallow: /carrito`, `Disallow: /checkout` y `Disallow: /api/` en `apps/web/server/routes/robots.txt.ts`

- [x] **Task 2: Añadir schemas de página donde faltan de verdad** (AC: 2, 3)
  - [x] 2.1 Añadir un helper `FaqSchema` reutilizable en el módulo actual de schemas estructurados
  - [x] 2.2 Integrar `FaqSchema` en `apps/web/src/routes/$.tsx`, derivando datos desde `page.sections` solo para páginas `/servicios/*`
  - [x] 2.3 Integrar `BreadcrumbSchema` en `apps/web/src/routes/$.tsx` usando `page.path` y `page.title`
  - [x] 2.4 Integrar `BreadcrumbSchema` en `apps/web/src/routes/blog/$slug.tsx` sin sobrescribir cambios de article/blog SEO ya cubiertos por PR #427
  - [x] 2.5 Confirmar que no se duplica breadcrumb en rutas que ya lo emiten (`/blog`, `/tienda`, `/tienda/$slug`)

- [x] **Task 3: Corregir comportamiento SEO de `/tienda` cuando la feature flag está off** (AC: 7, 8)
  - [x] 3.1 Sustituir los `throw new Error("Page not found")` de `apps/web/src/routes/tienda/index.tsx` y `apps/web/src/routes/tienda/$slug.tsx` por `notFound()` o la variante idiomática de TanStack Router
  - [x] 3.2 Actualizar `apps/web/server/routes/sitemap.xml.ts` para no emitir `/tienda` ni productos cuando `shopEnabled` esté desactivado
  - [x] 3.3 Revalidar que la solución no pisa ni reabre los cambios de PR #420, #422 o #427 sobre ese mismo archivo

---

## Dev Notes

### Inteligencia de issues y PRs en vuelo

- **PR #420** toca `apps/web/server/routes/sitemap.xml.ts` y `apps/web/scripts/generate-sitemap.ts`.
- **PR #421** toca redirects legacy en `apps/web/vite.config.ts` y soporte relacionado.
- **PR #422** vuelve a tocar `apps/web/scripts/generate-sitemap.ts` para rutas estáticas canónicas.
- **PR #424** corrige `/blog` en blanco con timeout de fetch en `apps/web/src/lib/sanity.ts` y `apps/web/vite.config.ts`.
- **PR #427** toca `apps/web/server/routes/sitemap.xml.ts`, `apps/web/src/components/structured-data.tsx`, `apps/web/src/lib/seo.ts`, `apps/web/src/routes/blog/$slug.tsx` y `apps/web/src/components/blog/blog-post.tsx`.

**Guardrail crítico:** esta historia debe implementarse rebasando sobre el estado más reciente de esos PRs si se fusionan antes, especialmente #427. No sobrescribir cambios de article/blog SEO ni reintroducir componentes que ese PR haya eliminado o simplificado.

### Estado real del código hoy

- `BreadcrumbSchema` **sí existe y ya se usa** en:
  - `apps/web/src/routes/blog/index.tsx`
  - `apps/web/src/routes/tienda/index.tsx`
  - `apps/web/src/routes/tienda/$slug.tsx`
- Lo que falta es su uso en:
  - `apps/web/src/routes/$.tsx`
  - `apps/web/src/routes/blog/$slug.tsx`

- `sectionAccordion` es una sección genérica del page builder. No asumir que todo acordeón es FAQ válida para Google.

- El `SearchAction` inválido está en el JSON-LD inline de `apps/web/src/routes/__root.tsx`, no en una ruta dedicada.

- La causa técnica del 500 de tienda es el uso de `throw new Error("Page not found")` en:
  - `apps/web/src/routes/tienda/index.tsx`
  - `apps/web/src/routes/tienda/$slug.tsx`

- El sitemap dinámico público sale de `apps/web/server/routes/sitemap.xml.ts`. Ahí es donde debe decidirse si la tienda aparece o no cuando la feature flag está desactivada.

### Guardrails de arquitectura

- Mantener el patrón de rutas de TanStack Router: `createFileRoute(...)` + `head()` + loader con server functions.
- No crear rutas estáticas nuevas para páginas de Sanity; reutilizar `apps/web/src/routes/$.tsx`.
- No hacer fetch de Sanity desde cliente. Si hace falta estado global para el sitemap, resolverlo desde servidor.
- Los archivos SEO públicos se generan en Nitro bajo `apps/web/server/routes/`.
- Reutilizar `StructuredData` y los helpers existentes; no reinventar otra capa de JSON-LD.

### Datos NAP validados contra la web visible

**Óptica Bulevar**
- Dirección: `C. de Canarias, 6, 23009 Jaén`
- Teléfono visible: `953-093-062`
- Email: `bulevar@opticasuarezjaen.es`

**Óptica Centro**
- Dirección: `P.º de la Estación, 12, 23003 Jaén`
- Teléfono visible: `953-223-180`
- Email: `centro@opticasuarezjaen.es`

**Nota:** revisar las coordenadas exactas antes del merge. La historia no debe fijar lat/lng inventados sin verificar.

### Estrategia recomendada para FAQPage

Implementar el schema a nivel de ruta en `$.tsx`, no dentro de `section-accordion.tsx`, porque:

1. La ruta conoce `page.path` y puede restringir a `/servicios/*`.
2. Evita emitir FAQPage para cualquier acordeón genérico del page builder.
3. Permite combinar `FaqSchema` + `BreadcrumbSchema` en el mismo punto de composición de página.

### Estrategia recomendada para `/tienda`

- Mantener el guard de `shopEnabled`, pero devolviendo `notFound()` en vez de error genérico.
- El sitemap debe consultar si la tienda está activa antes de añadir `/tienda` y slugs de producto.
- No tocar `apps/web/scripts/generate-sitemap.ts` salvo que el rebase con #422 lo haga estrictamente necesario. El bug SEO en vivo está en la ruta pública `sitemap.xml.ts`.

### Testing y validación

- Ejecutar `pnpm check` desde la raíz del monorepo.
- Validar `Optician` y `FAQPage` en validator.schema.org y Rich Results Test.
- Verificar manualmente en preview:
  - `/servicios/examen-visual`
  - `/servicios/terapia-visual`
  - `/blog/<slug-real>`
  - `/contacto`
  - `/tienda` con feature flag desactivada
- Verificar por HTTP:
  - `/robots.txt`
  - `/sitemap.xml`
  - muestra de `/tienda/<slug>`
- Confirmar que `/sitemap.xml` no publica URLs de tienda cuando `shopEnabled` es false.

---

## Referencias

- `_bmad-output/planning-artifacts/research/technical-seo-opticasuarezjaen-es-research-2026-04-20.md` — auditoría base con hallazgos y prioridades
- `_bmad-output/project-context.md` — reglas del proyecto para rutas, feature flags, server functions y SEO
- `docs/architecture-web-tanstack.md` — prerender, Nitro server routes, routing y StructuredData
- `docs/architecture-sanity-studio.md` — `seo` object, `sectionAccordion` y page builder
- `docs/integration-architecture.md` — integración con Sanity CDN y revalidación
- `apps/web/src/routes/__root.tsx` — JSON-LD global, hreflang y SearchAction actuales
- `apps/web/server/routes/robots.txt.ts` — robots actual
- `apps/web/server/routes/sitemap.xml.ts` — sitemap dinámico público
- `apps/web/src/routes/$.tsx` — composición de páginas dinámicas de Sanity
- `apps/web/src/routes/blog/$slug.tsx` — post de blog sin breadcrumb actual
- `apps/web/src/routes/tienda/index.tsx` — guard actual de tienda
- `apps/web/src/routes/tienda/$slug.tsx` — guard actual de detalle de producto

---

## Dev Agent Record

### Agent Model Used

GPT-5.4

### Implementation Plan

- Extraer la generación de schemas SEO a helpers puros para poder validar NAP, FAQ, breadcrumbs y sitemap con tests unitarios.
- Integrar `FaqSchema` y `BreadcrumbSchema` en las rutas dinámicas sin mover la responsabilidad semántica al `sectionAccordion` genérico.
- Mantener la tienda intacta cuando `shopEnabled` está activo y devolver `404` idiomático cuando está desactivado.
- Resolver la decisión del sitemap en servidor usando `featureFlags` de `siteSettings` y dejando fuera cookies de override para el archivo público.

### Completion Notes List

- Historia 2.1 revisada y actualizada contra el estado real del repositorio y GitHub.
- Se eliminaron supuestos incorrectos de la versión anterior: `BreadcrumbSchema` no estaba sin uso; ya existe en blog y tienda.
- Se excluyeron explícitamente los cambios ya cubiertos por PRs #420, #421, #422, #424 y #427.
- Se añadieron blockers SEO sin owner claro en GitHub: `SearchAction` inválido y comportamiento 500 de `/tienda` + sitemap de tienda.
- Se cambió la estrategia de FAQPage a integración por ruta (`$.tsx`) para evitar markup semánticamente incorrecto en cualquier acordeón genérico.
- Se centralizó la generación de `WebSite`, `Optician`, `FAQPage` y `BreadcrumbList` en helpers reutilizables con tests unitarios dedicados.
- Se verificó en la build local que `/servicios/examen-visual` emite `WebSite`, `Optician`, `BreadcrumbList` y `FAQPage`, y que `/blog/control-miopia-ninos-adolescentes` emite `BreadcrumbList`.
- Se verificó en la build local que `SearchAction` ya no aparece, que no quedan enlaces `hreflang` globales y que `/tienda` y `/tienda/ray-ban-aviator-classic` devuelven `404` con `__ff_shopEnabled=0`.
- Se verificó que con la configuración actual del CMS el sitemap sigue publicando rutas de tienda cuando `shopEnabled` está activo; la rama de exclusión con `shopEnabled=false` queda cubierta por `structured-data-helpers.test.ts`.
- `pnpm check`, `pnpm build` y la suite unitaria nueva `structured-data-helpers.test.ts` pasan en local.
- Validación manual externa completada en `validator.schema.org` con snippets generados desde la build local: `/servicios/examen-visual` validó `WebSite`, `FAQPage` y `BreadcrumbList` con `0` errores y `0` warnings; el bloque `Optician` se validó aparte con `0` errores y `0` warnings; `/blog/control-miopia-ninos-adolescentes` validó `WebSite` y `BreadcrumbList` con `0` errores y `0` warnings.
- Validación manual externa completada en Google Rich Results Test con snippets generados desde la build local: `/servicios/examen-visual` devolvió `8 valid items detected` (`Breadcrumbs`, `FAQ`, `Local businesses`, `Organization`) y `/blog/control-miopia-ninos-adolescentes` devolvió `7 valid items detected` (`Breadcrumbs`, `Local businesses`, `Organization`).
- Seguimiento incremental completado tras la validación externa: se añadieron `telephone`, `email` y `address` al `Optician` principal, y `image` + `priceRange` a cada `department` para eliminar los warnings opcionales restantes de Google.
- Validación final en Google Rich Results Test, usando HTML mínimo equivalente al DOM servido con bloques `<script type="application/ld+json">`, devolvió `8 valid items detected`; `Local businesses` quedó en `3 valid items detected` y las tres entidades (`Óptica Suárez`, `Óptica Suárez Bulevar`, `Óptica Suárez Centro`) aparecen válidas sin incidencias.
- Nota de validación: pegar JSON-LD plano en el modo `code` de Google puede producir un falso negativo porque interpreta `mainEntity` del `WebSite` como un `LocalBusiness` incompleto; para replicar fielmente la build hay que validar HTML con scripts JSON-LD o el HTML completo de la página.
- Seguimiento final completado: `openingHoursSpecification` ya se deriva del contenido visible de `contacto.json`, queda alineado con los horarios publicados (`09:30-13:30`, `17:00-20:30`, `10:00-13:00`) y se añadió cobertura unitaria específica, incluyendo casos con horarios distintos por sede y fallo explícito ante formatos no parseables.

### File List

- `apps/web/src/routes/__root.tsx`
- `apps/web/server/routes/robots.txt.ts`
- `apps/web/src/components/structured-data.tsx`
- `apps/web/src/lib/structured-data-helpers.ts`
- `apps/web/src/lib/structured-data-helpers.test.ts`
- `apps/web/src/routes/$.tsx`
- `apps/web/src/routes/blog/$slug.tsx`
- `apps/web/src/routes/tienda/index.tsx`
- `apps/web/src/routes/tienda/$slug.tsx`
- `apps/web/server/routes/sitemap.xml.ts`

## Change Log

- 2026-04-21: Corregidos NAP, `hreflang`, `SearchAction`, `robots.txt`, breadcrumbs y FAQ schemas; añadidos tests unitarios para helpers SEO; ajustado `404` de tienda y exclusión condicional de rutas de tienda en sitemap.
- 2026-04-21: Seguimiento incremental para eliminar warnings opcionales de Google Rich Results en `LocalBusiness`; añadidos datos de contacto al negocio principal e `image`/`priceRange` a las sedes, con validación final verde.
- 2026-04-21: Alineado `openingHoursSpecification` con el horario visible publicado en contenido, eliminando el desfase histórico del schema y endureciendo la cobertura de tests.
