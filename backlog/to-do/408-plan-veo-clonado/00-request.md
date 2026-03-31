# Issue #408 — No sé ha clonado bien página plan VEO

GitHub: https://github.com/lorenzogm/opticasuarez/issues/408

## Description

La página /plan-veo no reproduce fielmente el contenido de la página original (https://opticasuarez-old.vercel.app/plan-veo). Hay tres problemas: las imágenes de las tarjetas muestran texto en inglés en lugar de la imagen real, la sección de preguntas frecuentes (FAQ) está vacía, y el esquema de colores de fondo de las secciones no coincide con el original.

La página se sirve a través del page builder (ruta catch-all `$`) y el contenido viene de Sanity. Los componentes necesarios ya existen (`sectionCards`, `sectionAccordion`, `sectionHero`), así que el problema es exclusivamente de contenido en Sanity.

## Acceptance Criteria

- [ ] Las tarjetas de beneficios (gafas graduadas, lentillas, solución de lentillas) muestran sus imágenes correctamente, no texto placeholder en inglés
- [ ] La sección de preguntas frecuentes (FAQ) muestra las preguntas y respuestas expandibles, replicando el contenido del sitio original
- [ ] Los colores de fondo de cada sección coinciden con el esquema del sitio original (verificar contra https://opticasuarez-old.vercel.app/plan-veo)
- [ ] La estructura general de secciones coincide con la página original

## Technical Context

### Relevant Existing Code
- `apps/web/src/routes/$.tsx` — Ruta catch-all del page builder que renderiza esta página
- `apps/web/src/components/sections/section-renderer.tsx` — Despacha secciones por `_type`
- `apps/web/src/components/sections/section-cards.tsx` — Componente de tarjetas (funciona correctamente)
- `apps/web/src/components/sections/section-accordion.tsx` — Componente FAQ (funciona correctamente)
- `apps/web/src/lib/sanity.ts` — Query `getPage()` con `sectionProjection` que resuelve todos los tipos de sección
- `apps/web/public/images/plan-veo/` — Imágenes ya disponibles (hero, gafas-graduadas, lentillas, solucion-lentillas)

### Patterns to Follow
- El contenido se gestiona en Sanity Studio. Verificar y/o corregir el documento de la página `/plan-veo` en Sanity
- Las imágenes de las tarjetas pueden apuntar a imágenes subidas a Sanity o a las existentes en `/public/images/plan-veo/`
- Los colores de fondo de sección se controlan por Sanity o por clases CSS en el componente — verificar cómo el sitio original los definía

### Reference
- Sitio original: https://opticasuarez-old.vercel.app/plan-veo

## Scope

### In Scope
- Corregir el contenido de la página /plan-veo en Sanity (imágenes, FAQ, colores)

### Out of Scope
- Cambios en los componentes del page builder (funcionan correctamente)
- Otras páginas de servicio

## Priority

High — Página pública con contenido incorrecto visible a usuarios.

## Type

bug
