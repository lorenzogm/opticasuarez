# Specification: Migrate CI/CD pipelines to pnpm monorepo

## Overview

Migrate all GitHub Actions workflows and Copilot configuration from npm (single-app) to pnpm (monorepo root-level). Node version bumps from 20 to 22.

## Functional Requirements

1. **pr-checks.yml**: Replace npm ci + working-directory with pnpm/action-setup + pnpm install at root. Run `pnpm check` (Turbo delegates). Remove working-directory default.
2. **deploy-preview.yml**: E2E job uses pnpm + Node 22. Install at root. Use `pnpm --filter web test:e2e`. Cache uses pnpm-lock.yaml. Deploy job keeps Vercel CLI via npm (global install).
3. **deploy-production.yml**: Only uses Vercel CLI globally — keep npm for that. No pnpm needed.
4. **copilot-setup-steps.yml**: Add pnpm/action-setup@v4, Node 22, pnpm install at root.
5. **copilot-instructions.md**: Rewrite all npm references to pnpm root-level commands.

## Non-Functional Requirements

- No application code changes
- Workflows must be valid YAML
- Cache efficiency: use pnpm store path for caching

## Success Criteria

- All workflows use pnpm where applicable
- `pnpm check` and `pnpm build` succeed locally (already verified in #377)
- copilot-instructions.md accurately reflects new workflow
