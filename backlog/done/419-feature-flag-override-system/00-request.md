## Description

Sistema genérico de resolución de feature flags que combina los valores por defecto de Sanity con overrides almacenados en cookies del navegador. Esto permite que desarrolladores y product owners puedan activar o desactivar funcionalidades del sitio de forma individual sin modificar datos en Sanity, tanto en producción como en cualquier otro entorno.

Actualmente los feature flags se leen directamente desde Sanity en los server loaders y se usan tal cual. Este story introduce una capa intermedia que: (1) lee el valor de Sanity como default, (2) comprueba si existe una cookie de override para ese flag, y (3) devuelve el valor efectivo. También añade el nuevo flag `ecommerce` al schema de Sanity y establece la dependencia `ecommerce` → `shopEnabled` (activar ecommerce fuerza la activación de shopEnabled).

## Acceptance Criteria

- [ ] El schema de Sanity `siteSettings.featureFlags` incluye un nuevo campo `ecommerce` (boolean, default `false`) con descripción "Habilitar carrito, checkout y pagos"
- [ ] Existe una función genérica de resolución de flags (e.g. `resolveFeatureFlags()`) en el servidor que: lee `featureFlags` de Sanity, comprueba cookies con prefijo `__ff_` (e.g. `__ff_shopEnabled`, `__ff_ecommerce`), y devuelve un objeto con el valor efectivo de cada flag
- [ ] Si la cookie `__ff_shopEnabled` tiene valor `"1"`, el flag `shopEnabled` se resuelve como `true` independientemente del valor en Sanity. Si tiene valor `"0"`, se resuelve como `false`. Si no existe la cookie, se usa el valor de Sanity
- [ ] La dependencia `ecommerce` → `shopEnabled` se aplica: si `ecommerce` se resuelve como `true`, `shopEnabled` también se fuerza a `true`
- [ ] Los loaders existentes de `/tienda` y `/tienda/$slug` usan la nueva función en vez de leer `settings.featureFlags` directamente
- [ ] La query GROQ de `getSiteSettings` en `sanity.ts` incluye el nuevo campo `ecommerce` dentro de `featureFlags`

## Technical Context

### Relevant Existing Code
- `apps/sanity-studio/schemas/documents/site-settings.ts` — Schema de Sanity con el objeto `featureFlags` que contiene `shopEnabled` (líneas 60-75)
- `apps/web/src/lib/server-fns.ts` — Server functions que leen `isPreviewMode()` con `getCookie()` de `@tanstack/react-start/server`. Patrón a reutilizar para leer cookies de override
- `apps/web/src/lib/sanity.ts` — Query GROQ de `getSiteSettings` (línea ~142) que proyecta `featureFlags`
- `apps/web/src/routes/__root.tsx` — Root loader que consume `settings.featureFlags.shopEnabled` (línea ~314)
- `apps/web/src/routes/tienda/index.tsx` — Loader que lanza 404 si `shopEnabled` es `false` (línea ~43)
- `apps/web/src/routes/tienda/$slug.tsx` — Mismo patrón de check en loader (línea ~37)
- `apps/web/src/components/global-navigation.tsx` — Consume `shopEnabled` como prop para mostrar/ocultar dropdown de tienda

### Patterns to Follow
- Cookies accesibles desde JS (no httpOnly) para que el menú del navegador (story #420) pueda leerlas y escribirlas
- Las cookies se leen en el servidor con `getCookie()` de `@tanstack/react-start/server` (mismo patrón que `__sanity_preview`)
- Convención de nombre de cookie: `__ff_{flagName}` con valores `"1"` (true) o `"0"` (false)
- La función `resolveFeatureFlags()` debe ser genérica: al añadir un nuevo flag solo hay que añadir el campo en Sanity y opcionalmente definir dependencias

### Data & API
- Sanity document `siteSettings` (singleton) — campo `featureFlags` (object)
- Cookies del navegador con prefijo `__ff_`

## Scope

### In Scope
- Nuevo campo `ecommerce` en el schema de Sanity
- Función genérica `resolveFeatureFlags()` en server-fns o lib
- Refactor de los loaders existentes para usar la nueva función
- Lógica de dependencia entre flags (`ecommerce` → `shopEnabled`)

### Out of Scope
- UI del menú de preview (ver #420)
- Activación del modo preview con `?preview=true` (ver #420)
- Lógica de negocio del ecommerce (carrito, checkout, pagos) — ver #389

## Priority

High — prerequisito para #420 (menú de preview) y bloqueante para #389 (ecommerce)

## Type

feature

## Related Stories

- #420 Feature flag preview menu — UI del menú flotante que permite activar/desactivar flags en el navegador
- #389 Ecommerce — consumirá el flag `ecommerce` para habilitar carrito, checkout y pagos
