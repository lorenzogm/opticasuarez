# Árbol de Fuentes Anotado

> Generado: 2026-03-30 | Nivel: deep

## Estructura Completa del Monorepo

```
opticasuarez/                               # Raíz del monorepo
├── apps/                                    # Aplicaciones del workspace
│   │
│   ├── web/                                 # 🎯 APP PRINCIPAL — TanStack Start
│   │   ├── server/                          # Nitro server routes
│   │   │   └── routes/
│   │   │       ├── api/
│   │   │       │   ├── preview/             # Endpoints de preview Sanity
│   │   │       │   └── revalidate.post.ts   # Revalidación de caché
│   │   │       ├── robots.txt.ts            # robots.txt dinámico
│   │   │       └── sitemap.xml.ts           # sitemap.xml dinámico
│   │   ├── src/
│   │   │   ├── actions/                     # Server actions
│   │   │   │   ├── send-booking-emails.ts   # Emails de reserva (Resend)
│   │   │   │   ├── submit-booking.ts        # Procesar reserva
│   │   │   │   └── submit-product-inquiry.ts # Consulta de producto
│   │   │   ├── components/                  # Componentes React
│   │   │   │   ├── blog/                    # Blog (listado, detalle)
│   │   │   │   ├── book/                    # Flujo de citas (5 pasos)
│   │   │   │   ├── homepage/                # Página principal
│   │   │   │   ├── sections/                # 14 page builder sections
│   │   │   │   │   ├── section-renderer.tsx # Orquestador de secciones
│   │   │   │   │   ├── section-hero.tsx
│   │   │   │   │   ├── section-cards.tsx
│   │   │   │   │   └── ... (12 más)
│   │   │   │   ├── tienda/                  # Catálogo de productos
│   │   │   │   ├── button.tsx               # Botón base (CVA)
│   │   │   │   ├── carousel.tsx             # Carrusel (Embla)
│   │   │   │   ├── global-navigation.tsx    # Header/Footer
│   │   │   │   ├── image.tsx
│   │   │   │   └── ...
│   │   │   ├── content/                     # JSON estático (legacy)
│   │   │   │   ├── homepage.json
│   │   │   │   ├── quienes-somos.json
│   │   │   │   └── ... (12 archivos)
│   │   │   ├── lib/                         # Utilidades y servicios
│   │   │   │   ├── sanity.ts                # → Cliente Sanity + GROQ queries
│   │   │   │   ├── server-fns.ts            # → Server functions (data loaders)
│   │   │   │   ├── seo.ts                   # → Utilidades SEO
│   │   │   │   ├── services.ts              # → Definición servicios
│   │   │   │   └── utils.ts                 # → Helpers generales
│   │   │   ├── routes/                      # File-based routing
│   │   │   │   ├── __root.tsx               # → Layout raíz (site settings)
│   │   │   │   ├── index.tsx                # → Homepage (/)
│   │   │   │   ├── $.tsx                    # → Catch-all (páginas Sanity)
│   │   │   │   ├── blog/
│   │   │   │   │   ├── index.tsx            # /blog
│   │   │   │   │   └── $slug.tsx            # /blog/:slug
│   │   │   │   ├── cita/                    # Flujo de reserva
│   │   │   │   │   ├── index.tsx            # /cita (tipo)
│   │   │   │   │   ├── centro.tsx           # /cita/centro
│   │   │   │   │   ├── horario.tsx          # /cita/horario
│   │   │   │   │   ├── contacto.tsx         # /cita/contacto
│   │   │   │   │   └── confirmacion.tsx     # /cita/confirmacion
│   │   │   │   ├── cita.tsx                 # Layout del flujo de citas
│   │   │   │   └── tienda/
│   │   │   │       ├── index.tsx            # /tienda
│   │   │   │       └── $slug.tsx            # /tienda/:slug
│   │   │   ├── router.tsx                   # Config del router
│   │   │   ├── routeTree.gen.ts             # Auto-generado
│   │   │   └── global.css                   # Estilos Tailwind
│   │   ├── public/                          # Assets estáticos
│   │   │   └── images/                      # Imágenes
│   │   ├── scripts/
│   │   │   └── migrate-to-sanity.ts         # Script migración a Sanity
│   │   ├── vite.config.ts                   # Vite + TanStack Start + Nitro
│   │   ├── tailwind.config.js
│   │   ├── tsconfig.json
│   │   └── package.json
│   │
│   ├── sanity-studio/                       # 📝 CMS — Sanity Studio
│   │   ├── schemas/
│   │   │   ├── index.ts                     # → Registro central de schemas
│   │   │   ├── documents/                   # 10 tipos de documento
│   │   │   │   ├── homepage.ts              # Singleton
│   │   │   │   ├── page.ts                  # Páginas composables
│   │   │   │   ├── blog-post.ts
│   │   │   │   ├── product.ts
│   │   │   │   ├── service.ts
│   │   │   │   └── ... (5 más)
│   │   │   ├── objects/                     # 16 objetos reutilizables
│   │   │   │   ├── seo.ts
│   │   │   │   ├── hero-block.ts
│   │   │   │   └── ... (14 más)
│   │   │   └── sections/                    # 14 secciones page builder
│   │   │       ├── section-hero.ts
│   │   │       ├── section-cards.ts
│   │   │       └── ... (12 más)
│   │   ├── structure/
│   │   │   └── desk-structure.ts            # → Navegación del CMS
│   │   ├── lib/
│   │   │   └── rebuild-site-tool.ts         # → Herramienta de rebuild
│   │   ├── scripts/                         # Scripts de migración
│   │   ├── sanity.config.ts                 # → Config principal
│   │   └── sanity.cli.ts
│   │
│   ├── web-e2e/                             # 🧪 TESTS E2E — Playwright
│   │   ├── tests/                           # Test specs
│   │   ├── test-cases/                      # Documentación de casos
│   │   ├── test-results/                    # Resultados
│   │   ├── playwright-report/               # Reportes HTML
│   │   └── playwright.config.ts             # → Chromium, Firefox, Webkit
│   │
│   └── opticasuarez-react-router/           # ⛔ DEPRECATED — React Router v7
│       ├── app/                             # (no documentar en detalle)
│       ├── docs/                            # Docs legacy (SEO, deploy, etc.)
│       └── tests/                           # Tests legacy
│
├── configs/                                 # 📦 CONFIGS COMPARTIDAS
│   ├── typescript/                          # TSConfig bases para el monorepo
│   └── package.json                         # @opticasuarez/configs
│
├── content/                                 # 📄 CONTENIDO ESTÁTICO
│   ├── blog/                                # Artículos Markdown (legacy)
│   ├── images/                              # Imágenes del contenido
│   └── json/                                # JSON de páginas (legacy, deprecated)
│
├── infra/                                   # ☁️ INFRAESTRUCTURA
│   └── vercel/
│       └── web/                             # Config Vercel para apps/web
│
├── backlog/                                 # 📋 BACKLOG
│   ├── to-do/                               # Issues pendientes
│   └── done/                                # Issues completados
│
├── .github/                                 # ⚙️ CI/CD + COPILOT
│   ├── workflows/
│   │   ├── pr-checks.yml                    # → Checks en PRs
│   │   ├── web-vercel-deploy.yml            # → Deploy web a Vercel (main)
│   │   ├── deploy-sanity-studio.yml         # → Deploy Sanity Studio
│   │   ├── deploy-production.yml            # → DISABLED (React Router)
│   │   ├── deploy-preview.yml               # → Preview deploys
│   │   └── copilot-agent-scheduler.yml      # → Copilot agent scheduling
│   ├── copilot-instructions.md              # Reglas para Copilot
│   ├── agents/                              # Agents de Copilot
│   └── skills/                              # Skills de BMAD
│
├── _bmad/                                   # 🤖 BMAD METHOD CONFIG
│   ├── _config/                             # Configuración global BMAD
│   ├── bmm/                                 # BMad Method Module
│   ├── core/                                # Core skills
│   ├── tea/                                 # Test Architecture
│   ├── wds/                                 # Web Design System
│   ├── cis/                                 # Creative Innovation
│   └── bmb/                                 # BMad Builder
│
├── _bmad-output/                            # Salida de workflows BMAD
│   ├── planning-artifacts/
│   ├── implementation-artifacts/
│   └── test-artifacts/
│
├── design-artifacts/                        # 🎨 ARTEFACTOS DE DISEÑO
│   ├── A-Product-Brief/                     # (vacío)
│   ├── B-Trigger-Map/
│   ├── C-UX-Scenarios/
│   ├── D-Design-System/                     # (vacío)
│   ├── E-PRD/
│   ├── F-Testing/
│   └── G-Product-Development/
│
├── biome.jsonc                              # Configuración Biome (linter/formatter)
├── lefthook.yml                             # Git hooks (pre-commit)
├── turbo.json                               # Turborepo config
├── pnpm-workspace.yaml                      # Workspace definition
├── vitest.config.ts                         # Vitest config (monorepo)
├── tsconfig.json                            # TSConfig raíz
├── package.json                             # Package raíz (scripts monorepo)
└── README.md                                # Documentación principal
```

## Directorios Críticos

| Directorio | Propósito | Importancia |
|-----------|-----------|-------------|
| `apps/web/src/routes/` | Routing y páginas | Alta — entry points de usuario |
| `apps/web/src/lib/` | Data fetching y utilidades | Alta — capa de acceso a datos |
| `apps/web/src/components/sections/` | Page builder | Alta — sistema composable |
| `apps/web/src/actions/` | Server actions | Alta — lógica de negocio |
| `apps/web/server/routes/` | API routes (Nitro) | Media — infraestructura |
| `apps/sanity-studio/schemas/` | Modelo de datos | Alta — define toda la estructura |
| `apps/sanity-studio/structure/` | Navegación CMS | Media — UX del editor |
| `.github/workflows/` | CI/CD | Alta — pipeline de calidad |

## Puntos de Entrada

| Entry Point | Archivo | Descripción |
|------------|---------|-------------|
| Web App | `apps/web/src/routes/__root.tsx` | Layout raíz React |
| Vite Config | `apps/web/vite.config.ts` | Build + server config |
| Sanity Studio | `apps/sanity-studio/sanity.config.ts` | Config del CMS |
| Tests E2E | `apps/web-e2e/playwright.config.ts` | Config Playwright |
| Monorepo | `package.json` (raíz) | Scripts globales |
