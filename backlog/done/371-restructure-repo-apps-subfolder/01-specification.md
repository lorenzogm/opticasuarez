# Specification: Restructure repo into apps subfolder

**Issue**: #371
**Date**: 2026-03-23

## Overview

Move the existing React Router + Vite application from the repository root into `apps/opticasuarez-react-router/` to support a multi-app monorepo structure. After the move, the repo root becomes a shell with only repo-level files, and the application lives entirely in its own subfolder.

## Functional Requirements

1. All application files moved to `apps/opticasuarez-react-router/`
2. Repo root retains only repo-level files (`.github/`, `.gitignore`, `README.md`, `skills-lock.json`, `.agents/`, `backlog/`)
3. `npm install` and `npm run build` work from the app subdirectory
4. `npm run dev` starts the dev server from the app subdirectory
5. No broken imports or asset paths after the move

## Files to Move → `apps/opticasuarez-react-router/`

### Application code
- `app/` — React application source
- `public/` — Static assets
- `tests/` — E2E tests (Playwright)
- `build/` — Build output (gitignored, will be recreated)

### Configuration
- `package.json` + `package-lock.json`
- `vite.config.ts`
- `react-router.config.ts`
- `tsconfig.json`
- `eslint.config.js`
- `tailwind.config.js`
- `playwright.config.ts`
- `vercel.json`
- `.env.example`
- `.prettierignore`
- `.prettierrc`

### Documentation
- `docs/` → stays as `apps/opticasuarez-react-router/docs/`
- `REAL_IMAGES_INTEGRATION_SUMMARY.md` → `apps/opticasuarez-react-router/docs/`

## Files to Stay at Root

- `.github/` (required by GitHub)
- `.gitignore` (updated for new structure)
- `README.md` (updated to explain monorepo)
- `skills-lock.json` (skills tooling expects it at root)
- `.agents/` (stays at root per user decision)
- `backlog/` (issue tracking artifacts)

## Configuration Updates Required

### GitHub Actions Workflows (4 files)

1. **`pr-checks.yml`**: Add `working-directory: apps/opticasuarez-react-router` to npm steps
2. **`deploy-production.yml`**: Add working directory for Vercel deploy
3. **`deploy-preview.yml`**: Add working directory for npm + Vercel + Playwright steps
4. **`copilot-setup-steps.yml`**: Update `npm ci` to run in app subdirectory

### `.github/copilot-instructions.md`
- Update path references (e.g., `app/` → `apps/opticasuarez-react-router/app/`)
- Update CI command instructions to include `cd apps/opticasuarez-react-router`

### `.gitignore`
- Update paths for new structure (node_modules, build, etc. now inside `apps/`)

### `tsconfig.json`
- Path alias `~/*` → `./app/*` stays the same (relative to tsconfig location, which moves with the app)

### `vercel.json`
- No changes needed (Vercel config is relative; but Vercel project root setting may need updating on the dashboard)

## Integration Points

- **Vercel**: The Vercel project must have its root directory set to `apps/opticasuarez-react-router` in the Vercel dashboard (or via `vercel.json` `rootDirectory` field)
- **GitHub Actions**: All 4 workflow files need working-directory updates
- **Copilot setup**: `copilot-setup-steps.yml` needs path update

## Success Criteria

- [ ] `cd apps/opticasuarez-react-router && npm ci && npm run build` succeeds
- [ ] `cd apps/opticasuarez-react-router && npm run dev` starts dev server
- [ ] `cd apps/opticasuarez-react-router && npm run check` passes (lint + typecheck)
- [ ] All GitHub Actions workflows reference the correct subdirectory
- [ ] Repo root is clean: only `.github/`, `.gitignore`, `README.md`, `skills-lock.json`, `.agents/`, `backlog/`
- [ ] No broken imports or asset paths
