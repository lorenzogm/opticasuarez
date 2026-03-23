# Plan: Set up monorepo tooling

**Issue**: #377
**Date**: 2026-03-23

## Architecture

```
opticasuarez/                    # pnpm monorepo root
├── package.json                 # Root: Turbo scripts, devDeps
├── pnpm-workspace.yaml          # Workspace packages
├── pnpm-lock.yaml               # Single lock file
├── turbo.json                   # Task orchestration
├── biome.jsonc                  # Linter/formatter (extends ultracite)
├── .biomeignore                 # Biome ignore patterns
├── lefthook.yml                 # Pre-commit hooks
├── vitest.config.ts             # Root test config
├── tsconfig.json                # Root TS config (strictNullChecks)
├── .nvmrc                       # Node 22
├── .npmrc                       # pnpm settings
├── .editorconfig                # Editor settings
├── .gitignore                   # Updated with monorepo patterns
├── configs/
│   ├── package.json             # @opticasuarez/configs
│   └── typescript/
│       ├── base.json            # Shared TS base config
│       └── react.json           # React-specific TS config
├── apps/
│   ├── opticasuarez-react-router/
│   │   ├── package.json         # name: "web", no ESLint/Prettier
│   │   └── tsconfig.json        # Extends @opticasuarez/configs/typescript/react.json
│   └── web/
│       ├── package.json         # No ESLint/Prettier deps
│       └── tsconfig.json        # Extends @opticasuarez/configs/typescript/react.json
```

## Technical Approach

### Task 1: Root editor and node config files
Create `.nvmrc`, `.npmrc`, `.editorconfig` — simple files with no dependencies.

### Task 2: Shared TypeScript configs package
Create `configs/` package with `package.json`, `typescript/base.json`, `typescript/react.json`.
Configs are copied from web-starter and adapted (remove next.js-specific settings).

### Task 3: Root package.json, pnpm-workspace.yaml, and monorepo tooling
Create root `package.json` with Turbo-based scripts and devDependencies.
Create `pnpm-workspace.yaml` listing `apps/*` and `configs`.
Create `turbo.json`, `biome.jsonc`, `.biomeignore`, `lefthook.yml`, `vitest.config.ts`, `tsconfig.json`.

### Task 4: Migrate app configs
- Remove ESLint + Prettier from both apps
- Update app `tsconfig.json` to extend shared config
- Update app `package.json` scripts for Turbo compatibility
- Delete `eslint.config.js`, `.prettierrc`, `.prettierignore`
- Update `.gitignore`

### Task 5: Install and verify
- Delete `node_modules` and lock files in apps
- Run `pnpm install` at root
- Run `pnpm check` (build + linter + types)
- Run `pnpm build`

## TDD Note

This is a pure infrastructure/config change with no application code. Traditional unit tests
don't apply. Validation is done via build and lint commands (`pnpm check`, `pnpm build`).
