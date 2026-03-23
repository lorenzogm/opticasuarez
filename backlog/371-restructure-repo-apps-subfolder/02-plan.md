# Implementation Plan: Restructure repo into apps subfolder

**Issue**: #371
**Date**: 2026-03-23

## Approach

This is a purely structural move with config updates. No application code changes.

### Phase 1: Move files

Use `git mv` to preserve history. Create `apps/opticasuarez-react-router/` and move all app files there.

### Phase 2: Update configurations

Update GitHub Actions workflows, copilot instructions, gitignore, and add `rootDirectory` to vercel.json for Vercel to find the app. Update copilot-setup-steps.yml.

### Phase 3: Verify

Run `npm ci`, `npm run check`, `npm run build` from the new location.

## TDD Plan

This is a structural move — no unit tests apply. Verification is done via:
1. `npm run check` (lint + typecheck) from new location
2. `npm run build` from new location
3. E2E tests still discoverable from new location

## Exact Files to Create/Modify

### Task 1: Move app files
- `git mv` all app files to `apps/opticasuarez-react-router/`
- Move `REAL_IMAGES_INTEGRATION_SUMMARY.md` to `apps/opticasuarez-react-router/docs/`

### Task 2: Update workflow + config files
- Modify: `.github/workflows/pr-checks.yml`
- Modify: `.github/workflows/deploy-production.yml`
- Modify: `.github/workflows/deploy-preview.yml`
- Modify: `.github/copilot-setup-steps.yml`
- Modify: `.github/copilot-instructions.md`
- Modify: `.gitignore`
- Modify: `apps/opticasuarez-react-router/vercel.json` (add rootDirectory or note for dashboard)
- Create: Updated `README.md` at root

### Task 3: Verify build
- Run `npm ci` + `npm run check` + `npm run build` from app directory
- Verify dev server starts
