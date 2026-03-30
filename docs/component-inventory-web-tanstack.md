# Inventario de Componentes UI — Web (TanStack Start)

> Generado: 2026-03-30 | Parte: web-tanstack | Ruta: apps/web/src/components/

## Componentes Base

| Componente | Archivo | Descripción |
|-----------|---------|-------------|
| `Button` | `button.tsx` | Botón con variantes (CVA + Radix Slot) |
| `Carousel` | `carousel.tsx` | Carrusel (Embla Carousel) |
| `Image` | `image.tsx` | Imagen optimizada |
| `Text` | `text.tsx` | Componente de texto |
| `FaqAccordion` | `faq-accordion.tsx` | Acordeón para FAQ |
| `GlobalNavigation` | `global-navigation.tsx` | Navegación global (header/footer) |
| `GoogleTagManager` | `google-tag-manager.tsx` | Integración GTM |
| `HeroCarousel` | `hero-carousel.tsx` | Carrusel hero |
| `HeroSlider` | `hero-slider.tsx` | Slider hero |
| `ProgressIndicator` | `progress-indicator.tsx` | Indicador de progreso |
| `SocialShare` | `social-share.tsx` | Botones de compartir |
| `StructuredData` | `structured-data.tsx` | JSON-LD structured data |
| `YouTubeFacade` | `youtube-facade.tsx` | Carga lazy de YouTube |

## Page Builder — Secciones (14)

Mapeadas desde Sanity a React via `SectionRenderer`:

| Componente | Archivo | Tipo Sanity |
|-----------|---------|-------------|
| `SectionHero` | `sections/section-hero.tsx` | `sectionHero` |
| `SectionCards` | `sections/section-cards.tsx` | `sectionCards` |
| `SectionFeatures` | `sections/section-features.tsx` | `sectionFeatures` |
| `SectionText` | `sections/section-text.tsx` | `sectionText` |
| `SectionAccordion` | `sections/section-accordion.tsx` | `sectionAccordion` |
| `SectionTeaser` | `sections/section-teaser.tsx` | `sectionTeaser` |
| `SectionTestimonials` | `sections/section-testimonials.tsx` | `sectionTestimonials` |
| `SectionTimeline` | `sections/section-timeline.tsx` | `sectionTimeline` |
| `SectionSocialMedia` | `sections/section-social-media.tsx` | `sectionSocialMedia` |
| `SectionList` | `sections/section-list.tsx` | `sectionList` |
| `SectionLocations` | `sections/section-locations.tsx` | `sectionLocations` |
| `SectionProcessSteps` | `sections/section-process-steps.tsx` | `sectionProcessSteps` |
| `SectionStats` | `sections/section-stats.tsx` | `sectionStats` |
| `SectionCTA` | `sections/section-cta.tsx` | `sectionCTA` |
| `SectionRenderer` | `sections/section-renderer.tsx` | — (orquestador) |

### Secciones adicionales por dominio

**sections/about.tsx** — Página "Quiénes somos"
**sections/book-appointment.tsx** — CTA de reserva de cita
**sections/brands.tsx** — Galería de marcas
**sections/contact.tsx** — Datos de contacto
**sections/customer-testimonials.tsx** — Testimonios
**sections/locations-info.tsx** — Información de ubicaciones
**sections/services-grid.tsx** — Cuadrícula de servicios

## Componentes por Dominio

### Blog (`components/blog/`)

| Componente | Archivo | Descripción |
|-----------|---------|-------------|
| `Blog` | `blog.tsx` | Listado de artículos |
| `BlogPost` | `blog-post.tsx` | Artículo individual |

### Reserva de Citas (`components/book/`)

Flujo multi-paso:

| Componente | Archivo | Paso |
|-----------|---------|------|
| `BookAppointment` | `book-appointment.tsx` | Selección de tipo |
| `LocationSelection` | `location-selection.tsx` | Selección de centro |
| `DateTime` | `date-time.tsx` | Selección de horario |
| `ContactDetails` | `contact-details.tsx` | Datos personales |
| `Confirmation` | `confirmation.tsx` | Confirmación |

### Homepage (`components/homepage/`)

| Componente | Archivo | Descripción |
|-----------|---------|-------------|
| `Homepage` | `homepage.tsx` | Componente raíz de inicio |
| (+ sections/) | `homepage/sections/` | Secciones específicas del homepage |

### Tienda (`components/tienda/`)

| Componente | Archivo | Descripción |
|-----------|---------|-------------|
| `Tienda` | `tienda.tsx` | Catálogo de productos |
| `ProductDetail` | `product-detail.tsx` | Detalle de producto |

## Design System

- **Estilo:** Tailwind CSS 4 con utilidades customizadas (text-shadow)
- **Componentes base:** CVA (class-variance-authority) + clsx + tailwind-merge
- **Iconos:** Lucide React
- **Carrusel:** Embla Carousel React
- **Accesibilidad:** Radix UI primitives (`@radix-ui/react-slot`)
