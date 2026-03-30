# Arquitectura — Sanity Studio

> Generado: 2026-03-30 | Parte: sanity-studio | Tipo: web (CMS)

## Resumen

Panel de administración de contenido basado en **Sanity Studio v3**. Permite gestionar todo el contenido del sitio web: páginas composables, artículos de blog, servicios, productos, ubicaciones, equipo y configuración global.

## Stack Tecnológico

| Capa | Tecnología | Versión |
|------|-----------|---------|
| CMS Framework | Sanity Studio | ^3.75.0 |
| UI | React | ^18.3.1 |
| Styling | Styled Components | ^6.1.15 |
| Lenguaje | TypeScript | ^5.9.0 |

## Configuración

- **Project ID:** 2a24wmex
- **Dataset:** production
- **Plugins:**
  - `structureTool` — Navegación personalizada del desk
  - `presentationTool` — Preview en vivo con la web
  - `visionTool` — Consultas GROQ de prueba
  - `RebuildSiteTool` — Herramienta custom para trigger de rebuild

## Estructura del Desk (navegación del CMS)

```
Contenido
├── Páginas (composables con page builder)
├── ─────────
├── Servicios
├── Artículos (blog)
├── Ubicaciones
├── Equipo
├── ─────────
├── Productos
├── Marcas
├── Categorías de producto
├── ─────────
└── Configuración del sitio (singleton)
```

## Modelo de Datos

### Documentos (tipos principales)

| Documento | Schema | Singleton | Descripción |
|-----------|--------|-----------|-------------|
| `page` | page.ts | No | Páginas composables con secciones |
| `homepage` | homepage.ts | Sí | Página de inicio con estructura fija |
| `blogPost` | blog-post.ts | No | Artículos del blog |
| `service` | service.ts | No | Servicios de optometría |
| `product` | product.ts | No | Productos de la tienda |
| `productCategory` | product-category.ts | No | Categorías de producto |
| `brand` | brand.ts | No | Marcas |
| `location` | location.ts | No | Ubicaciones físicas (Centro, Bulevar) |
| `teamMember` | team-member.ts | No | Miembros del equipo |
| `siteSettings` | site-settings.ts | Sí | Configuración global |

### Objetos (reusables)

| Objeto | Descripción |
|--------|-------------|
| `seo` | Metadatos SEO (title, description, keywords, ogImage) |
| `heroBlock` | Bloque hero reutilizable |
| `bookAppointmentBlock` | CTA de reserva de cita |
| `cardItem` | Item de tarjeta genérico |
| `faqItem` | Pregunta/respuesta FAQ |
| `featureItem` | Feature/característica |
| `serviceGridItem` | Item de cuadrícula de servicios |
| `accordionItem` | Item de acordeón |
| `processStep` | Paso de proceso |
| `testimonialItem` | Testimonio de cliente |
| `timelineEntry` | Entrada de timeline |
| `partnerItem` | Socio/partner |
| `schedule` | Horario de atención |
| `socialMediaLink` | Enlace de red social |
| `productColor` | Color de producto |
| `frameDimensions` | Dimensiones de montura |

### Page Builder — Secciones (14 tipos)

El sistema de page builder permite componer páginas arrastrando secciones:

| Sección | Descripción |
|---------|-------------|
| `sectionHero` | Hero banner con imagen/vídeo |
| `sectionCards` | Cuadrícula de tarjetas |
| `sectionFeatures` | Lista de características |
| `sectionText` | Bloque de texto enriquecido |
| `sectionAccordion` | Acordeón FAQ/contenido |
| `sectionTeaser` | Teaser con imagen + texto |
| `sectionTestimonials` | Carrusel de testimonios |
| `sectionTimeline` | Línea temporal |
| `sectionSocialMedia` | Enlaces de redes sociales |
| `sectionList` | Lista genérica |
| `sectionLocations` | Mapa de ubicaciones |
| `sectionProcessSteps` | Pasos de proceso |
| `sectionStats` | Estadísticas / cifras |
| `sectionCTA` | Call to action |

## Estructura de Carpetas

```
apps/sanity-studio/
├── schemas/
│   ├── index.ts              # Registro central de todos los schemas
│   ├── documents/            # 10 tipos de documento
│   │   ├── blog-post.ts
│   │   ├── brand.ts
│   │   ├── homepage.ts
│   │   ├── location.ts
│   │   ├── page.ts
│   │   ├── product.ts
│   │   ├── product-category.ts
│   │   ├── service.ts
│   │   ├── site-settings.ts
│   │   └── team-member.ts
│   ├── objects/              # 16 tipos de objeto reutilizable
│   └── sections/             # 14 secciones de page builder
├── structure/
│   └── desk-structure.ts     # Navegación personalizada del desk
├── lib/
│   └── rebuild-site-tool.ts  # Herramienta de rebuild
├── scripts/                  # Scripts de migración/utilidades
├── sanity.config.ts          # Configuración principal
├── sanity.cli.ts             # CLI config
└── tsconfig.json
```
