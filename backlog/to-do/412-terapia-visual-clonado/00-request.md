# Issue #412 — No se ha clonado bien la pagina de servicio "Terapia Visual"

GitHub: https://github.com/lorenzogm/opticasuarez/issues/412

## Description

La página de servicio /terapia-visual tiene tres problemas respecto al sitio original (https://opticasuarez-old.vercel.app/terapia-visual). El hero muestra texto descriptivo que debería estar en la siguiente sección ("¿Qué es la terapia visual?"), las tarjetas de "Condiciones que tratamos" muestran una palabra en inglés en lugar de un icono acorde, y se necesita añadir una sección de especialista con los datos de Juan Pedro Toledano.

La página se sirve vía page builder (ruta catch-all `$`). Los componentes necesarios existen (`sectionHero`, `sectionCards`/`sectionFeatures`, `sectionCards variant="profile"`).

## Acceptance Criteria

- [ ] El hero de la página muestra solo la imagen, sin el texto descriptivo "La terapia visual es un programa de entrenamiento personalizado..."
- [ ] El texto descriptivo se mueve a la sección "¿QUÉ ES LA TERAPIA VISUAL?" como contenido de esa sección
- [ ] Las tarjetas de "Condiciones que tratamos" muestran un icono (emoji o SVG) apropiado al contexto de cada condición, no una palabra en inglés
- [ ] Se añade una sección "Nuestros Especialistas" con una tarjeta de perfil de Juan Pedro Toledano que incluye: foto, nombre, cargo (Óptico-Optometrista), nº colegiado (19351), máster, y descripción profesional
- [ ] El contenido coincide con: https://opticasuarez-old.vercel.app/terapia-visual (más la sección de especialista nueva)

## Technical Context

### Relevant Existing Code
- `apps/web/src/routes/$.tsx` — Ruta catch-all del page builder
- `apps/web/src/components/sections/section-hero.tsx` — Hero con imagen de fondo, título, subtítulo, descripción, CTA. El campo `description` debe quedar vacío
- `apps/web/src/components/sections/section-features.tsx` — Soporta icono (emoji) + título + descripción por tarjeta. Ideal para "Condiciones que tratamos"
- `apps/web/src/components/sections/section-cards.tsx` — Variante `profile` renderiza imagen circular + nombre + rol + detalles. Ideal para la tarjeta de especialista
- `apps/web/src/components/sections/section-text.tsx` — Para la sección descriptiva "¿Qué es la terapia visual?"
- `apps/sanity-studio/schemas/documents/team-member.ts` — Schema: name, role, image, details[]
- `apps/sanity-studio/schemas/objects/feature-item.ts` — Schema: icon, title, description, image, link
- `apps/web/public/images/quienes-somos/team/juan-pedro-640.webp` — Foto de Juan Pedro disponible en múltiples tamaños

### Datos del especialista
- Nombre: Juan Pedro Toledano
- Cargo: Óptico-Optometrista
- Nº colegiado: 19351
- Formación: Máster en Optometría Clínica y Terapia Visual
- Bio: "Profesional de la optometría especializado en terapia visual, apasionado por ayudar a niños y adultos a desarrollar todo su potencial visual. Su trabajo se centra en enseñar a cada paciente a utilizar correctamente su sistema visual, contribuyendo de forma activa a su neurodesarrollo y mejorando su calidad de vida a través de un enfoque cercano y personalizado."
- Imagen: ya existe como teamMember en Sanity y en `/public/images/quienes-somos/team/juan-pedro-*.webp`

### Patterns to Follow
- Editar el documento Sanity de /terapia-visual: vaciar `description` del hero, mover texto a `sectionText`
- Para los iconos de condiciones: usar el campo `icon` de `featureItem` con emoji apropiados (👁️, 🧠, etc.) — el componente `sectionFeatures` ya soporta esto
- Para el especialista: añadir un bloque `sectionCards` con `variant="profile"` referenciando el teamMember de Juan Pedro

### Reference
- Sitio original: https://opticasuarez-old.vercel.app/terapia-visual

## Scope

### In Scope
- Mover texto del hero a la sección descriptiva en Sanity
- Corregir los iconos de "Condiciones que tratamos" en Sanity
- Añadir sección de especialista con datos de Juan Pedro Toledano en Sanity

### Out of Scope
- Cambios en componentes del page builder
- Otras páginas de servicio

## Priority

High — Página pública con contenido incorrecto visible a usuarios.

## Type

bug
