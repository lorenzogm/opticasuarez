# Arquitectura — Web (TanStack Start)

> Generado: 2026-03-30 | Parte: web-tanstack | Tipo: web

## Resumen

Aplicación web principal de Óptica Suárez construida con **TanStack Start** (meta-framework de React) sobre **Nitro** como servidor de aplicación. Utiliza **Sanity** como CMS headless y **Tailwind CSS** para estilos.

## Stack Tecnológico

| Capa | Tecnología | Versión |
|------|-----------|---------|
| Meta-framework | TanStack Start | ^1.121.0 |
| UI | React | ^18.3.1 |
| Routing | TanStack React Router | ^1.121.0 (file-based) |
| Server | Nitro | 3.0.260311-beta |
| Build | Vite | ^7.0.0 |
| CSS | Tailwind CSS 4 | ^4.1.11 |
| CMS | Sanity (API CDN) | Proyecto: 2a24wmex |
| Email | Resend | ^6.0.1 |
| SEO | @forge42/seo-tools | ^1.4.5 |
| Lenguaje | TypeScript | ^5.9.2 |

## Patrón Arquitectónico

**Jamstack con SSR híbrido:**

1. **Pre-rendering estático** en build time para rutas conocidas (homepage, blog, páginas de Sanity)
2. **SSR dinámico** para rutas de citas (`/cita/*`) y tienda (`/tienda/*`)
3. **Server Functions** (`createServerFn`) para todo data fetching — garantiza que las llamadas a Sanity siempre ocurren en el servidor
4. **Page Builder** composable — Sanity define secciones que se renderizan dinámicamente via `SectionRenderer`

```
┌─────────────────────────────────────────────┐
│              Vercel Edge / CDN               │
├─────────────────────────────────────────────┤
│            Nitro Server Runtime              │
│  ┌──────────┐  ┌────────────┐  ┌─────────┐ │
│  │ Server   │  │ API Routes │  │Prerender│ │
│  │ Functions│  │ /api/*     │  │ Static  │ │
│  └────┬─────┘  └─────┬──────┘  └─────────┘ │
│       │              │                       │
├───────┼──────────────┼───────────────────────┤
│       ▼              ▼                       │
│  ┌──────────┐  ┌──────────┐                 │
│  │ Sanity   │  │ Resend   │                 │
│  │ CDN API  │  │ Email    │                 │
│  └──────────┘  └──────────┘                 │
└─────────────────────────────────────────────┘
```

## Estructura de Carpetas

```
apps/web/
├── server/
│   └── routes/
│       ├── api/
│       │   ├── preview/          # Endpoints de preview de Sanity
│       │   └── revalidate.post.ts # Revalidación de caché
│       ├── robots.txt.ts         # Generación dinámica de robots.txt
│       └── sitemap.xml.ts        # Generación dinámica de sitemap
├── src/
│   ├── actions/                  # Server actions (booking emails, etc.)
│   │   ├── send-booking-emails.ts
│   │   ├── submit-booking.ts
│   │   └── submit-product-inquiry.ts
│   ├── components/               # Componentes React
│   │   ├── blog/                 # Componentes de blog
│   │   ├── book/                 # Flujo de reserva de citas
│   │   ├── homepage/             # Componentes de página principal
│   │   ├── sections/             # Page builder sections (14 tipos)
│   │   ├── tienda/               # Componentes de tienda
│   │   ├── global-navigation.tsx # Navegación global
│   │   ├── button.tsx            # Componentes UI base
│   │   ├── carousel.tsx
│   │   ├── image.tsx
│   │   └── ...
│   ├── content/                  # Contenido estático JSON
│   │   ├── homepage.json
│   │   ├── quienes-somos.json
│   │   └── ...
│   ├── lib/                      # Utilidades y servicios
│   │   ├── sanity.ts             # Cliente Sanity + queries GROQ
│   │   ├── server-fns.ts         # Server functions (data loaders)
│   │   ├── seo.ts                # Utilidades SEO
│   │   ├── services.ts           # Definición de páginas de servicio
│   │   └── utils.ts              # Helpers generales
│   ├── routes/                   # File-based routing
│   │   ├── __root.tsx            # Layout raíz + site settings
│   │   ├── index.tsx             # Homepage
│   │   ├── $.tsx                 # Catch-all → páginas dinámicas de Sanity
│   │   ├── blog/                 # Rutas de blog
│   │   ├── cita/                 # Flujo de citas (5 pasos)
│   │   └── tienda/               # Catálogo de productos
│   ├── router.tsx                # Configuración del router
│   ├── routeTree.gen.ts          # Auto-generado por TanStack Router
│   └── global.css                # Estilos globales Tailwind
├── vite.config.ts                # Configuración Vite + Nitro + prerender
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

## Data Fetching

Todo el data fetching se realiza a través de **server functions** (`createServerFn`) definidas en `src/lib/server-fns.ts`. Esto garantiza que:

- Las llamadas a Sanity nunca se ejecutan en el navegador
- El preview mode se gestiona vía cookies del lado del servidor
- No hay problemas de CORS ni exposición de tokens API

**Server functions disponibles:**

| Function | Método | Descripción |
|----------|--------|-------------|
| `fetchHomepageData` | GET | Datos de la página principal |
| `fetchBlogPosts` | GET | Lista de artículos del blog |
| `fetchBlogPost` | GET | Artículo individual por slug |
| `fetchPage` | GET | Página dinámica por path (Sanity) |
| `fetchSiteSettings` | GET | Configuración global del sitio |
| `fetchBrands` | GET | Listado de marcas |
| `fetchProducts` | GET | Catálogo de productos |
| `fetchProduct` | GET | Producto individual por slug |
| `fetchProductCategories` | GET | Categorías de producto |
| `submitBooking` | POST | Enviar reserva de cita |
| `submitProductInquiry` | POST | Consulta de producto |

## Routing

File-based routing de TanStack Router:

| Ruta | Archivo | Descripción |
|------|---------|-------------|
| `/` | `routes/index.tsx` | Homepage |
| `/$` (catch-all) | `routes/$.tsx` | Páginas dinámicas de Sanity |
| `/blog` | `routes/blog/index.tsx` | Listado de blog |
| `/blog/$slug` | `routes/blog/$slug.tsx` | Artículo de blog |
| `/cita` | `routes/cita.tsx` | Layout de reserva |
| `/cita/` | `routes/cita/index.tsx` | Paso 1: tipo de cita |
| `/cita/centro` | `routes/cita/centro.tsx` | Paso 2: selección de centro |
| `/cita/horario` | `routes/cita/horario.tsx` | Paso 3: horario |
| `/cita/contacto` | `routes/cita/contacto.tsx` | Paso 4: datos de contacto |
| `/cita/confirmacion` | `routes/cita/confirmacion.tsx` | Paso 5: confirmación |
| `/tienda` | `routes/tienda/index.tsx` | Catálogo de productos |
| `/tienda/$slug` | `routes/tienda/$slug.tsx` | Detalle de producto |

## Pre-rendering

Configurado en `vite.config.ts`:
- **Pre-renderizadas:** Homepage, blog posts, páginas de Sanity
- **Excluidas del prerender:** `/cita/*`, `/tienda/*`, rutas de servicios legacy
- **Crawl links:** Habilitado para descubrir rutas automáticamente
- **Rutas pre-renderizadas por Nitro:** `/sitemap.xml`, `/robots.txt`

## SEO

- Meta tags dinámicos desde Sanity (`seo` object en cada documento)
- Fallbacks hardcodeados por ruta
- Open Graph + Twitter Cards
- Canonical URLs automáticas
- Sitemap XML dinámico
- Robots.txt dinámico
- Datos estructurados (JSON-LD) via componente `StructuredData`

## Autenticación / Preview

- **Preview mode:** Cookie `__sanity_preview` = "1" activa Sanity API directa (con token)
- **Sanity Presentation tool:** Preview en tiempo real desde el Studio
- **No hay autenticación de usuarios finales** — sitio público
