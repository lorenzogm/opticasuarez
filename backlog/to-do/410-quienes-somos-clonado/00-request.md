# Issue #410 — No sé ha clonado bien la página Quienes Somos

GitHub: https://github.com/lorenzogm/opticasuarez/issues/410

## Description

La página /quienes-somos tiene varios problemas respecto al sitio original (https://opticasuarez-old.vercel.app/quienes-somos). Hay 4 áreas afectadas: la sección de historia (timeline) no tiene imágenes circulares ni animaciones al hacer scroll, la sección del equipo solo muestra nombres sin fotos ni detalles profesionales, falta la sección de ubicaciones después de testimonios, y faltan los iconos de redes sociales.

La página se sirve vía page builder (ruta catch-all `$`). Hay contenido fallback en `quienes-somos.json` con datos del equipo, historia y testimonios. El server-fn inyecta el fallback del timeline pero NO del equipo ni testimonios.

## Acceptance Criteria

- [ ] La sección "Nuestra Historia" muestra las imágenes con máscara circular (border-radius 50%)
- [ ] La sección "Nuestro Equipo" muestra cada miembro con: foto, nombre, cargo, número de colegiado y detalles profesionales (replicando el sitio original)
- [ ] Después de la sección de testimonios aparece la sección de ubicaciones con foto de cada óptica y enlace a Google Maps
- [ ] La sección de redes sociales muestra los iconos de Instagram y Facebook (no solo texto)
- [ ] Los colores del equipo varían según el cargo/descripción como en el sitio original
- [ ] El contenido coincide con: https://opticasuarez-old.vercel.app/quienes-somos

## Technical Context

### Relevant Existing Code
- `apps/web/src/routes/$.tsx` — Ruta catch-all del page builder
- `apps/web/src/lib/server-fns.ts` — Lógica de fallback para /quienes-somos. Actualmente solo inyecta `sectionTimeline` desde JSON, NO inyecta equipo ni testimonios
- `apps/web/src/content/quienes-somos.json` — Datos fallback con timeline (6 entradas), team (4 miembros con foto/cargo/detalles), testimonios (3), ubicaciones (2, solo name/image/mapLink), redes sociales
- `apps/web/src/components/sections/section-timeline.tsx` — Renderiza timeline con layout alternado. NO aplica máscara circular a imágenes
- `apps/web/src/components/sections/section-cards.tsx` — Variante `profile` muestra imagen + nombre + rol + detalles. Funciona correctamente si recibe los datos
- `apps/web/src/components/sections/section-social-media.tsx` — Tiene iconos SVG para Instagram, Facebook, YouTube, Twitter, LinkedIn. Funciona correctamente con matching por campo `platform`
- `apps/web/src/components/sections/section-locations.tsx` — Renderiza ubicaciones pero actualmente solo muestra imagen + nombre + botón de mapa (sin dirección/teléfono/email)
- `apps/sanity-studio/schemas/documents/team-member.ts` — Schema: name, role, image, details[]
- `apps/web/public/images/quienes-somos/team/` — Fotos del equipo disponibles (juan-miguel, juan-pedro, clara-santiago, vanessa-cantero en múltiples tamaños)
- `apps/web/public/images/quienes-somos/locations/` — Fotos de ambas ópticas disponibles

### Patterns to Follow
- El contenido del equipo puede gestionarse en Sanity (sección `sectionCards` con `variant="profile"` referenciando documentos `teamMember`) o mejorando la lógica de fallback en server-fns
- Las imágenes circulares del timeline requieren un cambio en el componente `section-timeline.tsx` (añadir `rounded-full` + `object-cover` a las imágenes)
- La sección de ubicaciones necesita estar presente en el documento de Sanity de la página /quienes-somos

### Reference
- Sitio original: https://opticasuarez-old.vercel.app/quienes-somos

## Scope

### In Scope
- Corregir el componente timeline para mostrar imágenes circulares
- Asegurar que la sección de equipo muestra todos los datos (vía Sanity o fallback)
- Añadir sección de ubicaciones a la página /quienes-somos en Sanity
- Verificar que los iconos de redes sociales se renderizan correctamente

### Out of Scope
- Animaciones de scroll (se pueden implementar en un ticket futuro)
- Cambios en la variante de color por cargo del equipo si requiere cambios de diseño complejos

## Priority

High — Página pública con contenido incompleto visible a usuarios.

## Type

bug
