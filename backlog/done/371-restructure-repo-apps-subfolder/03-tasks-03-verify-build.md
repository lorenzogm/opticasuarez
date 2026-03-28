# Task 03: Verify build and dev server

## Description
Install dependencies, run quality checks, build the app, and verify the dev server starts from the new location.

## Steps

1. `cd apps/opticasuarez-react-router`
2. `rm -rf node_modules` (clean slate)
3. `npm ci` — must succeed
4. `npm run check` — must pass (lint + typecheck)
5. `npm run build` — must succeed
6. `npm run dev` — must start dev server (check for 3-5 seconds, then stop)
7. Verify root directory is clean (only expected files)

## Acceptance Criteria
- [ ] `npm ci` succeeds
- [ ] `npm run check` passes
- [ ] `npm run build` succeeds
- [ ] Dev server starts without errors
- [ ] No broken asset paths in build output
