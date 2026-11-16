# Guía de Despliegue

> Generado: 2026-03-30

## Plataforma

**Vercel** — Despliegue automático desde GitHub.

## Entorno único

Solo existe un entorno: **producción** (proyecto Vercel `opticasuarez-web-prod`). No hay entorno de desarrollo/staging.
Las ramas/PRs se validan con un **preview de Vercel** y, al mezclar en `main`, se despliega directamente a producción.

## Flujo de issues → producción

1. Alguien crea una issue → `copilot-01-new-issue.yml` la asigna automáticamente al Copilot coding agent.
2. Copilot abre un PR. `deploy.yml` despliega un **preview de Vercel**, ejecuta los E2E contra él y comenta la URL del preview en el PR.
3. Cuando Copilot termina, `copilot-02-pull-request.yml` (evento `workflow_run` + cron cada 5 min) marca el PR como listo y lo mezcla (squash).
4. El push a `main` ejecuta `deploy.yml` → despliegue a producción.

## Workflows

| Workflow | Trigger | Qué hace |
|----------|---------|----------|
| `copilot-01-new-issue.yml` | Issue abierta | Asigna la issue a Copilot |
| `copilot-02-pull-request.yml` | Fin de sesión de Copilot / cron / manual | Marca ready y mezcla los PRs de Copilot terminados |
| `pr-checks.yml` | PR a `main` | `pnpm check` (types + lint + build) |
| `deploy.yml` | PR / push a `main` / manual | Preview (PR) o producción (main) |

### `deploy.yml`

- **PR:** Terraform `plan` (sin apply), preview de Vercel, E2E contra el preview y comentario con la URL. Sanity no se toca.
- **Push a `main` / manual:** contenido Sanity + Studio, Terraform apply (`infra/vercel/web/`) y deploy de la web a producción.
- Detecta cambios en `apps/sanity-studio/` (y scripts/contenido de blog), `infra/vercel/web/` y `apps/web/`/`apps/web-e2e/` para saltar pasos innecesarios.

### Secrets Requeridos

| Secret | Uso |
|--------|-----|
| `GH_PAT` | Asignar issues a Copilot y mezclar sus PRs |
| `DOTENV_PRIVATE_KEY_INFRA_PRODUCTION` | Descifra `infra/vercel/web/.env.production` (token de Vercel, claves de la app) |
| `DOTENV_PRIVATE_KEY` | Checks de PR |
| `VERCEL_AUTOMATION_BYPASS_SECRET` | E2E contra el preview |
| `SANITY_EDITOR_TOKEN`, `SANITY_DEPLOY_STUDIO_TOKEN`, `SANITY_STUDIO_GITHUB_DEPLOY_TOKEN` | Deploy de Sanity |

Variable de repo: `OPTICASUAREZ_WEB_VERCEL_PROJECT_ID`.

## Redirects y Headers

Configurados en `apps/web/vercel.json`:
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
