# Task 03: Create root monorepo config and tooling files

## Description
Create all root-level monorepo files: `package.json`, `pnpm-workspace.yaml`,
`turbo.json`, `biome.jsonc`, `.biomeignore`, `lefthook.yml`, `vitest.config.ts`,
and root `tsconfig.json`.

## Files to Create

### `package.json` (root)
- name: `opticasuarez`
- packageManager: `pnpm@10.5.0`
- engines: `{ "node": "22" }`
- Scripts: prepare, dev, build, check, check:linter, check:tests, check:types, fix, clean family
- devDependencies: @biomejs/biome, lefthook, turbo, ultracite, vitest, @vitest/coverage-v8, npm-run-all, shx

### `pnpm-workspace.yaml`
```yaml
packages:
  - "apps/*"
  - "configs"
```

### `turbo.json`
Mirror web-starter structure: prepare, dev, build, check, check:linter, check:tests, check:types, fix.

### `biome.jsonc`
Extends ultracite, VCS git settings, noUnknownAtRules off.

### `.biomeignore`
node_modules, dist, build, .react-router, coverage, pnpm-lock.yaml, etc.

### `lefthook.yml`
Pre-commit: `pnpm dlx ultracite fix` on JS/TS/JSON/CSS with stage_fixed.

### `vitest.config.ts`
Projects: `apps/*`

### `tsconfig.json` (root)
`{ "compilerOptions": { "strictNullChecks": true } }`

## Acceptance Criteria
- [ ] Root `package.json` exists with Turbo scripts and correct devDeps
- [ ] `pnpm-workspace.yaml` lists `apps/*` and `configs`
- [ ] `turbo.json` mirrors web-starter task structure
- [ ] `biome.jsonc` extends ultracite
- [ ] `.biomeignore` covers build outputs
- [ ] `lefthook.yml` runs ultracite fix on pre-commit
- [ ] `vitest.config.ts` lists app projects
- [ ] Root `tsconfig.json` exists
