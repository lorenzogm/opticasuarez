# Specification: Deploy web app to Vercel with Terraform

## Overview

Set up Vercel deployment for the TanStack Start app (apps/web/) using Terraform + GitHub Actions, following web-starter patterns.

## Components

1. **Terraform module** at `infra/vercel/src/` — provisions Vercel project with password protection
2. **GitHub Actions workflow** at `.github/workflows/web-vercel-deploy.yml` — 3-job pipeline (check-changes → infra-deploy → app-deploy)
3. **Encrypted state** — AES-256-CBC encrypted tfstate committed to repo

## Key Decisions

- Framework: "vite" (TanStack Start builds with Vite)
- Build command: `cd ../.. && npx turbo@^2 run build --filter=opticasuarez-web`
- Install command: `pnpm install --frozen-lockfile`
- Root directory: `apps/web`
- Change detection: `git diff` based (no Turbo infrastructure package needed)
- Output variable: `OPTICASUAREZ_WEB_VERCEL_PROJECT_ID`
- Existing deploy-production.yml left untouched (serves React Router app)

## Success Criteria

- All Terraform files created with correct structure
- Workflow has 3 jobs with proper dependencies
- State encryption follows web-starter pattern
- pnpm used throughout (matching #377/#378 monorepo setup)
