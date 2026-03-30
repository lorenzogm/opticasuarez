# Guía de Despliegue

> Generado: 2026-03-30

## Plataforma

**Vercel** — Despliegue automático desde GitHub.

## Apps Desplegadas

| App | URL | Workflow | Trigger |
|-----|-----|----------|---------|
| **web** (TanStack Start) | https://opticasuarezjaen.es | `web-vercel-deploy.yml` | Push a `main` |
| **sanity-studio** | (Sanity hosted) | `deploy-sanity-studio.yml` | Push a `main` |
| **opticasuarez-react-router** | — | `deploy-production.yml` | ⛔ DISABLED (`workflow_dispatch`) |

## Pipeline de Deploy — Web

### `web-vercel-deploy.yml`

Trigger: push a `main` o `workflow_dispatch`

**Fase 1: Check Changes**
- Compara HEAD~1 para detectar cambios en:
  - `infra/vercel/web/` → cambios de infraestructura
  - `apps/web/` o `apps/web-e2e/` → cambios de aplicación

**Fase 2: Deploy Infrastructure** (si hay cambios en infra)
- Aplica configuración de Vercel desde `infra/vercel/web/`

**Fase 3: Deploy Application** (si hay cambios en app)
- Build y deploy a Vercel Production

### Secrets Requeridos

| Secret | Uso |
|--------|-----|
| `VERCEL_TOKEN` | Token de API de Vercel |
| `VERCEL_TEAM_ID` | ID de la organización |
| `VERCEL_PROJECT_ID` | ID del proyecto |
| `SANITY_API_TOKEN` | Token para preview mode |
| `RESEND_API_KEY` | Token para envío de emails |

## Pipeline de CI — PR Checks

### `pr-checks.yml`

Trigger: Pull Request a `main`

Ejecuta:
1. Checkout + pnpm setup + Node.js 22
2. `pnpm install`
3. `pnpm check` (types + linting + build)

## Pipeline — Sanity Studio

### `deploy-sanity-studio.yml`

Deploy del Sanity Studio cuando hay cambios en `apps/sanity-studio/`.

## Redirects y Headers

Configurados en `apps/opticasuarez-react-router/vercel.json`:
- Redirect: `www.opticasuarezjaen.es` → `opticasuarezjaen.es` (301)
- Redirect: trailing slashes eliminados (301)
- Headers de seguridad en respuestas

## Pre-rendering

La app web pre-renderiza rutas en build time:
- Homepage (`/`)
- Artículos de blog (`/blog/*`)
- Páginas de Sanity (dinámicas, consultadas durante build)
- Sitemap XML y robots.txt (vía Nitro)

**Excluidas del prerender:** `/cita/*`, `/tienda/*`, rutas de servicios legacy.

## Dominio

- **Producción:** https://opticasuarezjaen.es
- **DNS:** Gestionado por Vercel
- **Verificación Pinterest:** configurada (meta tag `p:domain_verify`)
