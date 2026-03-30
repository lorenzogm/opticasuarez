# Modelo de Datos — Sanity CMS

> Generado: 2026-03-30 | Fuente: apps/sanity-studio/schemas/

## Visión General

El modelo de datos está completamente definido en Sanity CMS. No hay base de datos relacional — todo el contenido se gestiona como documentos JSON en Sanity.

## Tipos de Documento

### `homepage` (Singleton)

Página de inicio con estructura fija:
- `hero` — Título, subtítulo, descripción, CTA
- `servicesGrid` — Cuadrícula de servicios (array de `serviceGridItem`)
- `videoAbout` — Sección de vídeo (YouTube ID)
- `socialMedia` — Redes sociales
- `seo` — Metadatos SEO

### `page` (Composable)

Páginas dinámicas construidas con el page builder:
- `title` — Título interno
- `path` — Slug/ruta URL
- `sections` — Array de 14 tipos de sección (page builder)
- `seo` — Metadatos SEO

### `blogPost`

Artículos del blog:
- `title`, `slug`, `excerpt`
- `mainImage` — Imagen principal
- `body` — Contenido (Portable Text)
- `categories`, `author`
- `publishedAt` — Fecha de publicación
- `seo` — Metadatos SEO

### `service`

Servicios de optometría:
- `title`, `slug`, `description`
- `icon`, `image`
- Contenido detallado del servicio

### `product`

Productos de la tienda:
- `title`, `slug`, `description`
- `price`, `brand` (referencia a `brand`)
- `category` (referencia a `productCategory`)
- `images` — Galería
- `colors` (array de `productColor`)
- `frameDimensions` — Dimensiones de montura
- `seo` — Metadatos SEO

### `productCategory`

Categorías de producto:
- `title`, `slug`, `description`
- `image`

### `brand`

Marcas:
- `title`, `slug`, `logo`
- `description`

### `location`

Ubicaciones físicas:
- `name`, `image`, `imageTitle`
- `address`, `phone`, `phoneUrl`
- `whatsappUrl`, `email`, `mapUrl`, `contactUrl`
- `schedule` — Horarios de atención

### `teamMember`

Miembros del equipo:
- `name`, `role`, `image`
- `bio`

### `siteSettings` (Singleton)

Configuración global del sitio:
- Datos de contacto
- Redes sociales
- Configuración general

## Relaciones

```
homepage ──────┐
               │
page ──────────┤── sections[] (14 tipos de sección)
               │
blogPost       │── seo (objeto)
               │
service ───────┘

product ──► brand (referencia)
product ──► productCategory (referencia)
product ──► productColor[] (objetos embebidos)

location ──► schedule (objeto embebido)
```

## Singletons

Los siguientes documentos son singletons (una sola instancia):
- `homepage` — Página de inicio
- `siteSettings` — Configuración del sitio

## Contenido Estático (Legacy)

Además del CMS, existe contenido estático en JSON en `apps/web/src/content/`:
- Datos de páginas de servicio (en proceso de migración a Sanity)
- Contenido de "Quiénes somos"
- Datos de contacto

Y en `content/` (raíz del monorepo):
- `blog/` — Artículos de blog en Markdown
- `images/` — Imágenes estáticas
- `json/` — JSON de contenido de páginas (legacy, app React Router deprecated)
