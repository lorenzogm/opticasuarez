# Task 01: Move all app files to apps/opticasuarez-react-router/

## Description
Use `git mv` to move all application files from the repo root into `apps/opticasuarez-react-router/`, preserving git history.

## Steps

1. Create `apps/opticasuarez-react-router/` directory
2. `git mv` the following into `apps/opticasuarez-react-router/`:
   - `app/`
   - `public/`
   - `tests/`
   - `docs/`
   - `package.json`
   - `package-lock.json`
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
3. `git mv REAL_IMAGES_INTEGRATION_SUMMARY.md apps/opticasuarez-react-router/docs/`
4. Remove `build/` directory (gitignored build output, will be recreated)
5. Verify repo root only contains: `.github/`, `.gitignore`, `README.md`, `skills-lock.json`, `.agents/`, `backlog/`, `apps/`

## Acceptance Criteria
- [ ] All app files live under `apps/opticasuarez-react-router/`
- [ ] Repo root is clean
- [ ] Git history preserved (git mv, not copy+delete)
