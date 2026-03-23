# Task 02: Update CI/CD and repo-level configuration

## Description
Update all GitHub Actions workflows, copilot instructions, copilot setup steps, and gitignore to work with the new monorepo structure.

## Files to Modify

### `.github/workflows/pr-checks.yml`
- Add `defaults.run.working-directory: apps/opticasuarez-react-router` or use `working-directory` on each step
- Update `npm ci`, `npm run check`, `npm run build` steps

### `.github/workflows/deploy-production.yml`
- Add working directory for Vercel deploy step

### `.github/workflows/deploy-preview.yml`
- Add working directory for npm ci, Playwright, Vercel deploy steps

### `.github/workflows/copilot-agent-scheduler.yml`
- No changes needed (operates on GitHub API, no file paths)

### `.github/copilot-setup-steps.yml`
- Update `npm ci` to `cd apps/opticasuarez-react-router && npm ci`

### `.github/copilot-instructions.md`
- Update file path references to include `apps/opticasuarez-react-router/`

### `.gitignore`
- Update to handle new monorepo structure
- Add `apps/*/node_modules/`, `apps/*/build/`, etc.

### `README.md` (root)
- Update to describe monorepo structure
- Point to `apps/opticasuarez-react-router/` for the main app

### `apps/opticasuarez-react-router/vercel.json`
- Already moved; verify no path changes needed

## Acceptance Criteria
- [ ] All 4 workflow files updated with correct working directories
- [ ] `copilot-setup-steps.yml` installs deps in correct location
- [ ] `copilot-instructions.md` references correct paths
- [ ] `.gitignore` covers new structure
- [ ] `README.md` explains monorepo layout
