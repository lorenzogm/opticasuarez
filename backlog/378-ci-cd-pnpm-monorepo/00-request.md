# Issue #378 — Migrate CI/CD pipelines and Copilot config to pnpm monorepo

## Description

After the monorepo tooling is in place (#377), all GitHub Actions workflows and Copilot configuration files need to be updated to use pnpm instead of npm, run commands from the monorepo root using Turbo, and target Node 22. This ensures CI/CD, preview deployments, e2e tests, and the Copilot coding agent all work correctly with the new setup.

## Acceptance Criteria

- [ ] `pr-checks.yml` updated: uses pnpm (via `pnpm/action-setup@v4`), Node 22, installs at root with `pnpm install`, runs `pnpm check` and `pnpm build` from root.
- [ ] `deploy-preview.yml` updated: e2e test job uses pnpm, Node 22, `pnpm install` at root, `pnpm --filter web test:e2e` for Playwright, cache strategy uses `pnpm-lock.yaml`.
- [ ] `deploy-production.yml` updated: if it needs dependencies installed, uses pnpm; otherwise only Vercel CLI install can remain standalone.
- [ ] `copilot-setup-steps.yml` updated: uses `pnpm/action-setup@v4`, Node 22, `pnpm install` at root.
- [ ] `copilot-instructions.md` updated: all references to `npm` replaced with `pnpm`, root-level commands.
- [ ] `copilot-agent-scheduler.yml` — no changes needed.
- [ ] CI pipeline passes.
