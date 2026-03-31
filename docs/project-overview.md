# Visión General del Proyecto — Óptica Suárez

> Generado: 2026-03-30 | Modo: initial_scan | Nivel: deep

## Resumen Ejecutivo

**Óptica Suárez** es la web corporativa de una cadena de ópticas en Jaén (España) con más de 80 años de historia. El sitio ofrece información sobre servicios de optometría, sistema de reserva de citas, blog, catálogo de productos (tienda) y gestión de contenido dinámica a través de Sanity CMS.

- **URL en producción:** https://opticasuarezjaen.es
- **Idioma del sitio:** Español (es_ES)
- **Plataforma de hosting:** Vercel

## Tipo de Repositorio

**Monorepo** gestionado con pnpm workspaces + Turborepo.

## Partes del Proyecto

| Parte | Ruta | Tipo | Estado | Descripción |
|-------|------|------|--------|-------------|
| **web** (TanStack Start) | `apps/web/` | Web App | ✅ Activa (principal) | Aplicación frontend con TanStack Start + React 18 + Tailwind CSS |
| **sanity-studio** | `apps/sanity-studio/` | CMS | ✅ Activa | Sanity Studio v3 — panel de administración de contenido |
| **web-e2e** | `apps/web-e2e/` | Testing | ✅ Activa | Tests E2E con Playwright |
| **configs** | `configs/` | Librería | ✅ Activa | Configuraciones TypeScript compartidas |

## Stack Tecnológico

| Categoría | Tecnología | Versión | Notas |
|-----------|-----------|---------|-------|
| **Framework (frontend)** | TanStack Start | ^1.121.0 | SSR + prerendering vía Nitro |
| **UI Library** | React | ^18.3.1 | — |
| **Routing** | TanStack React Router | ^1.121.0 | File-based routing |
| **Styling** | Tailwind CSS | ^4.1.11 | Con PostCSS plugin |
| **CMS** | Sanity | ^3.75.0 | Headless CMS con Studio |
| **Server runtime** | Nitro | 3.0.260311-beta | Server routes, prerendering |
| **Build tool** | Vite | ^7.0.0 (web) / ^5.4.21 (deprecated) | — |
| **Lenguaje** | TypeScript | ^5.9.2 | Estricto |
| **Testing E2E** | Playwright | ^1.54.2 | Multi-browser |
| **Testing unitario** | Vitest | 4.0.1 | Monorepo-level |
| **Linter/Formatter** | Biome (vía Ultracite) | 2.2.7 | Configuración extendida de ultracite |
| **Email** | Resend | ^6.0.1 | Envío de emails de citas |
| **SEO** | @forge42/seo-tools | ^1.4.5 | Sitemap, robots, meta tags |
| **Componentes UI** | Radix UI, Lucide icons, Embla Carousel | — | Componentes accesibles |
| **Monorepo** | pnpm workspaces + Turborepo | pnpm 10.5, turbo 2.5.6 | — |
| **Git hooks** | Lefthook | 2.0.0 | Pre-commit: ultracite fix |
| **Node.js** | Node.js | 22 | — |
| **Hosting** | Vercel | — | Deploy automático desde main |

## Patrón de Arquitectura

**Jamstack / Headless CMS** con pre-rendering estático y SSR:

- **Frontend:** TanStack Start (React) con server functions para data fetching
- **CMS:** Sanity como fuente de contenido (API CDN para producción, API directa para preview)
- **Server:** Nitro como servidor de aplicación — gestiona API routes, sitemap, robots.txt
- **Contenido estático:** Archivos JSON locales para contenido legacy y datos de servicio
- **Page Builder:** Sistema de secciones composable definido en Sanity y renderizado dinámicamente

## Estructura del Repositorio

```
opticasuarez/
├── apps/
│   ├── web/                          # 🎯 App principal (TanStack Start)
│   ├── sanity-studio/                # 📝 Panel CMS (Sanity Studio)
│   └── web-e2e/                      # 🧪 Tests E2E (Playwright)
├── configs/                          # 📦 Configs TypeScript compartidas
├── content/                          # 📄 Contenido estático (JSON, blog, imágenes)
├── infra/vercel/                     # ☁️ Configuración infraestructura Vercel
├── backlog/                          # 📋 Issues/backlog del proyecto
├── design-artifacts/                 # 🎨 Artefactos de diseño (estructura vacía)
├── _bmad/                            # 🤖 Configuración BMad Method
└── .github/                          # ⚙️ Workflows CI/CD + Copilot config
```

## Enlaces a Documentación Detallada

- [Arquitectura — Web (TanStack)](./architecture-web-tanstack.md)
- [Arquitectura — Sanity Studio](./architecture-sanity-studio.md)
- [Modelo de Datos — Sanity](./data-models-sanity.md)
- [Inventario de Componentes UI](./component-inventory-web-tanstack.md)
- [Contratos API / Server Functions](./api-contracts-web-tanstack.md)
- [Árbol de Fuentes Anotado](./source-tree-analysis.md)
- [Guía de Desarrollo](./development-guide.md)
- [Guía de Despliegue](./deployment-guide.md)
- [Arquitectura de Integración](./integration-architecture.md)
