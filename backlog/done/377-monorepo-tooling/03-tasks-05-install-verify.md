# Task 05: Install dependencies and verify quality gates

## Description
Clean up old lock files and node_modules, run pnpm install, and verify
all quality gates pass.

## Steps

1. Delete `apps/opticasuarez-react-router/node_modules` and `apps/opticasuarez-react-router/package-lock.json`
2. Delete `apps/web/node_modules` and `apps/web/package-lock.json` (if exists)
3. Run `pnpm install` at root
4. Run `pnpm check` (build + linter + types)
5. Run `pnpm build`
6. Run `pnpm dev` (verify it starts, then stop)

## Acceptance Criteria
- [ ] `pnpm install` succeeds with no errors
- [ ] `pnpm check` passes (build + linter + types)
- [ ] `pnpm build` completes successfully
- [ ] `pnpm dev` starts the development server
- [ ] No `package-lock.json` files remain anywhere in the repo
