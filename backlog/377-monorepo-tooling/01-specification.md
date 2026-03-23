# Specification: Set up monorepo tooling

**Issue**: #377
**Date**: 2026-03-23

## Overview

Migrate the opticasuarez repository from npm with ESLint+Prettier to a pnpm monorepo with Turborepo, Biome (via ultracite), Lefthook, shared TypeScript configs, and root-level Vitest — matching the web-starter developer experience.

This is a structural/tooling change only. No application code changes.

## Functional Requirements

1. **Package Manager**: pnpm replaces npm; `pnpm-lock.yaml` at root replaces `package-lock.json`.
2. **Workspace**: `pnpm-workspace.yaml` at root includes `apps/*` and `configs`.
3. **Turbo**: Task orchestration via turbo.json mirroring web-starter pattern.
4. **Biome**: Replaces ESLint + Prettier. Root `biome.jsonc` extends `ultracite`.
5. **Lefthook**: Pre-commit hook runs `pnpm dlx ultracite fix` on staged JS/TS/JSON/CSS.
6. **Shared TypeScript**: `configs/` package with `base.json` and `react.json` presets.
7. **Vitest**: Root-level `vitest.config.ts` listing app projects.
8. **Node 22**: Enforced via `.nvmrc` and `engines` in root `package.json`.

## Non-Functional Requirements

- All existing build, lint, and type-check functionality continues to work
- Developer workflow remains simple: `pnpm check`, `pnpm build`, `pnpm dev`
- No application source code changes

## Integration Points

### Files to Create
- Root: `package.json`, `pnpm-workspace.yaml`, `turbo.json`, `biome.jsonc`, `.biomeignore`, `lefthook.yml`, `vitest.config.ts`, `.nvmrc`, `.npmrc`, `.editorconfig`, `tsconfig.json`
- `configs/package.json`, `configs/typescript/base.json`, `configs/typescript/react.json`

### Files to Modify
- `apps/opticasuarez-react-router/package.json` — rename to `web`, remove ESLint/Prettier deps, update scripts
- `apps/opticasuarez-react-router/tsconfig.json` — extend shared config
- `apps/web/package.json` — remove ESLint/Prettier deps, update scripts
- `apps/web/tsconfig.json` — extend shared config
- `.gitignore` — add Turbo, pnpm-store, Biome patterns

### Files to Delete
- `apps/opticasuarez-react-router/eslint.config.js`
- `apps/opticasuarez-react-router/.prettierrc`
- `apps/opticasuarez-react-router/.prettierignore`
- `apps/opticasuarez-react-router/package-lock.json` (if exists)
- `apps/web/eslint.config.js` (if exists)

## Success Criteria

- `pnpm install` succeeds at root
- `pnpm check` succeeds (build + linter + types)
- `pnpm build` completes successfully
- `pnpm dev` starts the development server
- No `package-lock.json` files remain
- ESLint and Prettier config files removed from apps

## Assumptions

- Both `apps/opticasuarez-react-router` and `apps/web` should be workspace packages.
- The `apps/opticasuarez-react-router` package name changes to `web` per the AC.
- `apps/web` package name stays `opticasuarez-web` to avoid conflicts.
- The `configs` package is named `@opticasuarez/configs`.
- pnpm version is 10.5.0 (matching web-starter).
- Biome version 2.2.7, Turbo 2.5.6, ultracite 5.6.4 (matching web-starter).
