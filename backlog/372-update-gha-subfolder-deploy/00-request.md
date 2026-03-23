# Issue #372 — Update GitHub Actions workflow for subfolder deploy

## Description

After the app is moved into `apps/opticasuarez-github/` (see the restructure issue), the GitHub Actions deploy workflow needs updating so that `npm ci`, `npm run lint`, and `npm run build` all execute from the subfolder, and the Pages artifact is uploaded from the correct `dist` path.

The current workflow at `.github/workflows/deploy.yml` assumes all commands run from the repo root. This issue updates it to set the correct working directory for all build steps and point the artifact upload to `apps/opticasuarez-github/dist`.

## Acceptance Criteria

- [ ] `npm ci` runs inside `apps/opticasuarez-github/`.
- [ ] `npm run lint` runs inside `apps/opticasuarez-github/`.
- [ ] `npm run build` runs inside `apps/opticasuarez-github/`.
- [ ] `upload-pages-artifact` path points to `./apps/opticasuarez-github/dist`.
- [ ] GitHub Pages deployment succeeds and the site is accessible at `https://lorenzogm.github.io/opticasuarez/`.
- [ ] No changes needed to GitHub repo settings (Pages source remains "GitHub Actions").

## Technical Context

- `.github/workflows/deploy.yml` — Current workflow.
- `apps/opticasuarez-github/vite.config.ts` — `base` is set to `/opticasuarez/` for production builds.
- Use `defaults.run.working-directory` at the job level.
- Keep workflow structure simple: build job + deploy job.

## Priority

High — Deployment is broken after the restructure until this is completed.
