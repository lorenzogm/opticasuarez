# Context: Issue #377 — Monorepo Tooling Setup

## Ticket Summary
Migrate opticasuarez from npm + ESLint/Prettier to pnpm monorepo with Turbo, Biome, Lefthook,
shared TS configs, and Vitest — matching web-starter patterns.

## Key Decisions
- Both `apps/opticasuarez-react-router` and `apps/web` are workspace packages
- `configs/` package at root level (not nested) named `@opticasuarez/configs`
- pnpm 10.5.0, Turbo 2.5.6, Biome 2.2.7, ultracite 5.6.4
- Node 22 enforced
- No application code changes

## File Paths Involved
### Create
- Root: `package.json`, `pnpm-workspace.yaml`, `turbo.json`, `biome.jsonc`, `.biomeignore`,
  `lefthook.yml`, `vitest.config.ts`, `tsconfig.json`, `.nvmrc`, `.npmrc`, `.editorconfig`
- `configs/package.json`, `configs/typescript/base.json`, `configs/typescript/react.json`

### Modify
- `apps/opticasuarez-react-router/package.json`
- `apps/opticasuarez-react-router/tsconfig.json`
- `apps/web/package.json`
- `apps/web/tsconfig.json`
- `.gitignore`

### Delete
- `apps/opticasuarez-react-router/eslint.config.js`
- `apps/opticasuarez-react-router/.prettierrc`
- `apps/opticasuarez-react-router/.prettierignore`
- `apps/web/eslint.config.js` (if exists)

## Preflight
```bash
pnpm install
pnpm check
pnpm build
```

## Test Patterns
Infrastructure change — no unit tests. Validation via `pnpm check` and `pnpm build`.
