# Contratos API / Server Functions — Web (TanStack Start)

> Generado: 2026-03-30 | Parte: web-tanstack

## Arquitectura de Data Fetching

La app utiliza **TanStack Start Server Functions** (`createServerFn`) como capa de abstracción entre el frontend y Sanity CMS. No hay API REST pública expuesta — las server functions se ejecutan siempre en el servidor.

### Client Sanity (`src/lib/sanity.ts`)

Funciones de bajo nivel que ejecutan queries GROQ contra la API de Sanity:

| Función | Retorno | Descripción |
|---------|---------|-------------|
| `getHomepage(preview?)` | Homepage data | Datos completos de la homepage |
| `getBlogPosts(preview?)` | BlogPost[] | Lista de artículos del blog |
| `getBlogPost(slug, preview?)` | BlogPost | Artículo individual |
| `getPage(path, preview?)` | Page | Página dinámica por ruta |
| `getSiteSettings(preview?)` | SiteSettings | Configuración global |
| `getBrands(preview?)` | Brand[] | Lista de marcas |
| `getProducts(preview?)` | Product[] | Catálogo de productos |
| `getProduct(slug, preview?)` | Product | Producto por slug |
| `getProductCategories(preview?)` | ProductCategory[] | Categorías de productos |

**Helpers de imagen:**
- `sanityImageUrl(ref)` — Convierte referencia Sanity a URL CDN
- `resolveImage(image)` — Resuelve campo de imagen (objeto o string)

### Server Functions (`src/lib/server-fns.ts`)

Wrappers de las funciones Sanity para garantizar ejecución server-side:

| Server Function | Método | Input | Descripción |
|----------------|--------|-------|-------------|
| `fetchHomepageData` | GET | — | Homepage + preview flag |
| `fetchBlogPosts` | GET | — | Lista de artículos |
| `fetchBlogPost` | GET | `slug: string` | Artículo individual |
| `fetchPage` | GET | `path: string` | Página dinámica de Sanity |
| `fetchSiteSettings` | GET | — | Configuración global |
| `fetchBrands` | GET | — | Lista de marcas |
| `fetchProducts` | GET | — | Catálogo de productos |
| `fetchProduct` | GET | `slug: string` | Producto individual |
| `fetchProductCategories` | GET | — | Categorías de productos |
| `submitBooking` | POST | `BookingDetails` | Reserva de cita |
| `submitProductInquiry` | POST | Inquiry data | Consulta de producto |

### Server Actions (`src/actions/`)

| Action | Archivo | Descripción |
|--------|---------|-------------|
| `sendBookingEmails` | `send-booking-emails.ts` | Envía emails de confirmación (Resend) |
| `submitBooking` | `submit-booking.ts` | Procesa reserva de cita |
| `submitProductInquiry` | `submit-product-inquiry.ts` | Procesa consulta de producto |

## Nitro Server Routes (`server/routes/`)

| Ruta | Método | Descripción |
|------|--------|-------------|
| `/api/preview/enable` | GET | Activa preview mode (cookie) |
| `/api/revalidate` | POST | Revalidación de caché |
| `/robots.txt` | GET | Generación dinámica de robots.txt |
| `/sitemap.xml` | GET | Generación dinámica de sitemap XML |

## Configuración de Sanity

- **Project ID:** 2a24wmex
- **Dataset:** production
- **API Version:** 2026-03-23
- **CDN URL (producción):** `https://2a24wmex.apicdn.sanity.io/v2026-03-23/data/query/production`
- **API URL (preview):** `https://2a24wmex.api.sanity.io/v2026-03-23/data/query/production`

## Preview Mode

1. Cookie `__sanity_preview` = "1" activa modo preview
2. En preview, se usa la API directa (no CDN) con token de autenticación
3. Activado desde Sanity Studio via Presentation Tool → `/api/preview/enable`

## Email (Resend)

Para el flujo de reserva de citas:
- **Tipos de cita:** Telefónica, Refracción, Evaluación visual, Infantil, Contactología, Visión deportiva
- **Ubicaciones:** Centro (Paseo de la Estación 12), Bulevar (Calle Canarias 6)
- **Emails enviados:** Confirmación al cliente + notificación a la óptica
- **API Key:** Variable de entorno `RESEND_API_KEY`
