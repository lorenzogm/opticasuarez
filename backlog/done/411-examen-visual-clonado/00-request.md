# Issue #411 — No se ha clonado bien la pagina de servicio "examen Visual"

GitHub: https://github.com/lorenzogm/opticasuarez/issues/411

## Description

La página de servicio /examen-visual tiene dos problemas respecto al sitio original (https://opticasuarez-old.vercel.app/examen-visual). Falta el texto descriptivo en la sección "¿Qué es un examen visual?" y falta la sección de ubicaciones con fotos de las ópticas y enlaces a Google Maps al final de la página (después de la sección de reserva).

La página se sirve vía page builder (ruta catch-all `$`). Los componentes `sectionText` y `sectionLocations` existen y funcionan. El problema es de contenido en Sanity.

## Acceptance Criteria

- [ ] La sección "¿QUÉ ES UN EXAMEN VISUAL?" incluye el texto: "Un examen visual completo es mucho más que una simple revisión de la vista. En Óptica Suárez realizamos una evaluación integral de tu sistema visual para detectar posibles problemas y garantizar tu máximo confort visual."
- [ ] Al final de la página, después de la sección de reserva, aparece una sección de ubicaciones con la foto de cada óptica (Centro y Bulevar) y un enlace a Google Maps para cada una
- [ ] El contenido coincide con: https://opticasuarez-old.vercel.app/examen-visual

## Technical Context

### Relevant Existing Code
- `apps/web/src/routes/$.tsx` — Ruta catch-all del page builder
- `apps/web/src/components/sections/section-text.tsx` — Componente de texto con imagen lateral opcional. Funciona correctamente
- `apps/web/src/components/sections/section-locations.tsx` — Renderiza ubicaciones con imagen + nombre + botón de mapa
- `apps/web/src/lib/sanity.ts` — Query `getPage()` resuelve todos los tipos de sección
- `apps/web/public/images/quienes-somos/locations/` — Fotos de ambas ópticas disponibles (optica-centro.webp, optica-bulevar.webp)
- `apps/sanity-studio/schemas/documents/location.ts` — Schema de ubicación

### Patterns to Follow
- Añadir el texto descriptivo al bloque `sectionText` correspondiente en el documento Sanity de /examen-visual
- Añadir un bloque `sectionLocations` al final de las secciones en el documento Sanity de /examen-visual, referenciando los documentos de ubicación

### Reference
- Sitio original: https://opticasuarez-old.vercel.app/examen-visual

## Scope

### In Scope
- Añadir texto descriptivo a la sección "¿Qué es un examen visual?" en Sanity
- Añadir sección de ubicaciones al final de la página en Sanity

### Out of Scope
- Cambios en componentes del page builder
- Otras páginas de servicio

## Priority

High — Página pública con contenido incompleto visible a usuarios.

## Type

bug
