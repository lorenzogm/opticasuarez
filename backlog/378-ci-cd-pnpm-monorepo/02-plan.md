# Plan: Migrate CI/CD pipelines to pnpm monorepo

## Files to Modify

1. `.github/workflows/pr-checks.yml`
2. `.github/workflows/deploy-preview.yml`
3. `.github/workflows/deploy-production.yml` (minimal — global Vercel CLI stays npm)
4. `.github/copilot-setup-steps.yml`
5. `.github/copilot-instructions.md`

## Technical Approach

### pr-checks.yml
- Remove `defaults.run.working-directory`
- Add `pnpm/action-setup@v4` step
- Change node-version to 22, cache to pnpm
- Replace `npm ci` with `pnpm install`
- Replace `npm run check` with `pnpm check`
- Replace `npm run build` with `pnpm build`

### deploy-preview.yml
- E2E job: add pnpm/action-setup, node 22, cache pnpm
- Replace `npm ci` with `pnpm install` at root
- Replace `npx playwright install` with `pnpm --filter web exec playwright install`
- Replace `npm run test:e2e` with `pnpm --filter web test:e2e`
- Deploy job: keep `npm install --global vercel@latest` (global CLI, no workspace needed)
- Remove `cache-dependency-path: apps/opticasuarez-react-router/package-lock.json`

### deploy-production.yml
- Keep as-is (only uses global Vercel CLI)
- No pnpm needed

### copilot-setup-steps.yml
- Add pnpm/action-setup@v4
- Change node-version to 22
- Replace `cd apps/opticasuarez-react-router && npm ci` with `pnpm install`

### copilot-instructions.md
- Update repo structure to include apps/web, configs/
- Replace all `npm` commands with `pnpm` root-level equivalents
- Update quality gates section
- Update CI validation commands
