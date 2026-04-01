## Description

Menú flotante en el navegador que permite a desarrolladores y product owners activar o desactivar feature flags de forma individual. El menú solo es visible cuando el usuario accede a cualquier página con `?preview=true`, lo cual activa el modo feature-flag-preview y se persiste en localStorage para que el menú siga visible en navegaciones posteriores sin repetir el query param.

Cada toggle del menú escribe una cookie accesible por el servidor, de modo que al recargar la página los loaders respetan el override. El menú muestra todos los feature flags definidos en Sanity con su estado actual (default de Sanity + override local) y ofrece un botón de reset para restaurar todos los flags a sus valores por defecto.

## Acceptance Criteria

- [ ] Acceder a cualquier URL con `?preview=true` activa el modo feature-flag-preview, guardando `__ff_preview_enabled=true` en localStorage. El query param se puede eliminar de la URL tras activarse
- [ ] Mientras `__ff_preview_enabled` esté en localStorage, se muestra un botón flotante (e.g. ⚙️) en la esquina inferior derecha de la pantalla, por encima de todo el contenido (z-index alto)
- [ ] Hacer clic en el botón flotante abre un panel flotante (overlay, no empuja el contenido) que lista todos los feature flags con toggles on/off
- [ ] Activar/desactivar un toggle escribe la cookie correspondiente (`__ff_{flagName}` con valor `"1"` o `"0"`) y recarga la página para que los loaders del servidor apliquen el nuevo valor
- [ ] El panel incluye un botón "Reset" que elimina todas las cookies `__ff_*` y recarga la página
- [ ] El panel incluye un botón "Salir" que elimina `__ff_preview_enabled` de localStorage, elimina todas las cookies `__ff_*`, y oculta el menú (recarga la página)
- [ ] El menú funciona en todos los entornos (desarrollo, staging, producción)
- [ ] El menú NO aparece si `__ff_preview_enabled` no está en localStorage (aunque existan cookies de override)

## Technical Context

### Relevant Existing Code
- `apps/web/src/routes/__root.tsx` — Root layout donde inyectar el componente del menú. Ya existe un banner condicional para Sanity preview (líneas ~360-370). El menú se renderiza aquí, después de `<Scripts />`
- `apps/web/src/routes/__root.tsx` — Patrón `RootDocument` recibe props y renderiza children. El componente del menú sería un hijo adicional del body
- `apps/web/src/components/global-navigation.tsx` — Ejemplo de componente con estado para dropdowns (useRef, useState, event listeners)
- `apps/web/src/components/faq-accordion.tsx` — Patrón de disclosure/toggle con aria attributes
- `apps/web/src/routes/tienda/index.tsx` — Ejemplo de `validateSearch` para leer query params en TanStack Router

### Patterns to Follow
- Componente client-only: el menú depende de `localStorage` y `document.cookie`, así que debe ejecutarse exclusivamente en el cliente (usar guards como `typeof window !== 'undefined'`)
- El menú es un componente de React standalone sin dependencias externas (no necesita shadcn, radix, etc.) — HTML/CSS/Tailwind puro
- Convención de archivos: kebab-case → `apps/web/src/components/feature-flag-menu.tsx`
- Cookies no-httpOnly para que sean legibles/escribibles desde JS del navegador y desde server functions con `getCookie()`
- Nombres de cookie: `__ff_{flagName}` (e.g. `__ff_shopEnabled`, `__ff_ecommerce`)

### Datos necesarios del servidor
- El componente necesita recibir los feature flags de Sanity (valores por defecto) para mostrar la lista de flags disponibles. Estos ya llegan via `loaderData.settings.featureFlags` en el root loader
- La función `resolveFeatureFlags()` del story #419 proporciona los valores efectivos (Sanity + overrides)

## Scope

### In Scope
- Componente React `FeatureFlagMenu` con botón flotante y panel
- Detección de `?preview=true` y persistencia en localStorage
- Lectura/escritura de cookies `__ff_*` desde el cliente
- Botón Reset y botón Salir
- Integración en el root layout

### Out of Scope
- La función `resolveFeatureFlags()` del servidor (story #419)
- El schema de Sanity y los nuevos flags (story #419)
- Cualquier funcionalidad de ecommerce (#389)
- Relación con el Sanity preview mode existente (`__sanity_preview`) — son sistemas independientes

## Priority

High — prerequisito para poder testear features detrás de flags en cualquier entorno

## Type

feature

## Notes

- El mecanismo `?preview=true` para feature flags es completamente independiente del Sanity preview mode existente (que usa cookie `__sanity_preview` y se activa via `/api/preview/enable?secret=...`). No deben interferir entre sí
- Al activar el flag `ecommerce` desde el menú, la lógica de dependencia (`ecommerce` → `shopEnabled`) ya se maneja en `resolveFeatureFlags()` del story #419

## Related Stories

- #419 Feature flag override system — backend/infraestructura que este story consume (dependencia directa, debe completarse primero)
- #389 Ecommerce — se beneficiará de este menú para testear funcionalidades de carrito/checkout
