# Specification: Disable legacy React Router deployment workflows

## Overview
Comment out the `on:` triggers in two workflow files to prevent the old React Router app from deploying.

## Functional Requirements
- `deploy-production.yml` trigger is commented out
- `deploy-preview.yml` trigger is commented out
- Both files retain their content for reference but stop triggering
- `web-vercel-deploy.yml` and `pr-checks.yml` are untouched

## Success Criteria
- Push to `main` does not trigger `deploy-production.yml`
- PRs do not trigger `deploy-preview.yml`
- `pnpm check` passes (no regressions)
