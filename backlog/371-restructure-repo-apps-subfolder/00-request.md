# Issue #371: Restructure repo into apps subfolder

## Description

Move the existing Vite + React application from the repository root into `apps/opticasuarez-github/` to prepare for a multi-app structure. The repo root currently contains the entire app (source, config, build files). After this change, the root becomes a shell with only repo-level files (`.github/`, `.gitignore`, `README.md`) and the app lives entirely in its own subfolder.

This restructuring enables adding new apps or packages alongside the existing GitHub Pages site without interference. The `-github` suffix distinguishes this deployment target from potential future ones (e.g., a Vercel deployment).

## Acceptance Criteria

- [ ] All app files moved to `apps/opticasuarez-github/`: `src/`, `public/`, `docs/`, `index.html`, `package.json`, `package-lock.json`, `vite.config.ts`, `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`, `eslint.config.js`, `postcss.config.js`, `tailwind.config.js`, `download-images.mjs`, `download-real-images.mjs`.
- [ ] Repo root retains only: `.github/`, `.gitignore`, `README.md`.
- [ ] Summary markdown files (`DEPLOYMENT_COMPLETE.md`, `GITHUB_PAGES_CHECKLIST.md`, `IMAGE_DOWNLOAD_SUMMARY.md`, `REAL_IMAGES_INTEGRATION_SUMMARY.md`) moved to `apps/opticasuarez-github/docs/` or removed if obsolete.
- [ ] `skills-lock.json` kept at root (the skills tooling expects it at the repo root).
- [ ] `npm install` and `npm run build` work from within `apps/opticasuarez-github/`.
- [ ] `npm run dev` starts the dev server correctly from the subfolder.
- [ ] No broken imports or asset paths after the move.

## Technical Context

### Relevant Existing Code
- `vite.config.ts` — Has a `base` path set to `/opticasuarez/` for production builds (GitHub Pages). This stays the same.
- `src/` — React + TypeScript source code.
- `public/` — Static assets.
- `package.json` — npm-based project (not pnpm). Uses `npm ci` in CI.

### Patterns to Follow
- Keep `apps/` as the directory for deployable applications.
- Use kebab-case for directory names.

### Data & API
- No API changes. This is a purely structural move.

## Scope

### In Scope
- Moving all app files into `apps/opticasuarez-github/`.
- Cleaning up the repo root.
- Verifying the app builds and runs from the new location.

### Out of Scope
- Updating the GitHub Actions deploy workflow (handled in a separate issue).
- Converting from npm to pnpm.
- Any code changes to the app itself.

## Priority

High — This is a prerequisite for the deploy workflow update and any future structural changes.

## Notes

- The `.github/` directory must stay at the repo root (GitHub requires it there).
- `node_modules/` and `dist/` should remain gitignored. After the move, they will live inside `apps/opticasuarez-github/`.

## Related Stories

- Update GitHub Actions workflow for subfolder deploy — Updates CI/CD to build from the new subfolder location.
