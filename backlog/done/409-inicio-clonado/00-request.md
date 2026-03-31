# Issue #409 — No sé ha clonado bien la página de inicio

GitHub: https://github.com/lorenzogm/opticasuarez/issues/409

## Description

La sección "Dónde Estamos" de la página de inicio (/) solo muestra el título pero no renderiza la información de las dos ópticas (Centro y Bulevar). En el sitio original (https://opticasuarez-old.vercel.app/) esta sección muestra ambas ópticas con imagen, dirección, horario, teléfono, email y enlace a Google Maps.

El componente `Locations` en homepage está completamente implementado y soporta todos los campos necesarios. El problema es que los datos de las ubicaciones no llegan al componente — probablemente el documento `homepage` en Sanity no tiene el campo `locations.items` correctamente poblado con referencias a los documentos `location`.

## Acceptance Criteria

- [ ] La sección "Dónde Estamos" de la homepage muestra las dos ópticas (Centro y Bulevar)
- [ ] Cada ubicación muestra: imagen, nombre, dirección, horario (entre semana + sábado), teléfono, email y enlace a Google Maps
- [ ] El layout alterna la posición de la imagen (izquierda/derecha) como en el sitio original
- [ ] Los datos coinciden con el sitio original: https://opticasuarez-old.vercel.app/

## Technical Context

### Relevant Existing Code
- `apps/web/src/components/homepage/sections/locations.tsx` — Componente completamente implementado con soporte para imagen, dirección, horario, teléfono, email, enlace a mapa. Layout alternado responsive
- `apps/web/src/components/homepage/homepage.tsx` — Componente principal que renderiza las secciones de homepage
- `apps/web/src/lib/server-fns.ts` — `fetchHomepageData()` obtiene datos de Sanity vía `getHomepage()`
- `apps/web/src/lib/sanity.ts` — Query `getHomepage()` que incluye `locations.items[]` con resolución de referencias
- `apps/sanity-studio/schemas/documents/location.ts` — Schema de ubicación con todos los campos necesarios
- `apps/sanity-studio/schemas/documents/homepage.ts` — Schema de homepage con campo `locations.items[]`

### Patterns to Follow
- Los documentos `location` en Sanity deben estar creados con todos los campos (name, image, address, schedule, phone, email, mapUrl)
- El documento `homepage` debe tener `locations.items` con referencias a los dos documentos de ubicación
- Las imágenes de ubicaciones existen en `/public/images/quienes-somos/locations/`

### Data
- Óptica Centro: P.º de la Estación, 12, 23003 Jaén
- Óptica Bulevar: Av. de Andalucía, 3, 23006 Jaén

### Reference
- Sitio original: https://opticasuarez-old.vercel.app/

## Scope

### In Scope
- Verificar y/o crear los documentos `location` en Sanity para ambas ópticas
- Verificar y/o enlazar las referencias en el documento `homepage` → `locations.items`

### Out of Scope
- Cambios en el componente `Locations` (ya está completo)
- Otras secciones de la homepage

## Priority

High — Sección importante de contacto en la página principal.

## Type

bug
