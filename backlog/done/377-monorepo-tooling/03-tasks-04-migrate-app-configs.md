# Task 04: Migrate app configs

## Description
Update both apps to use shared monorepo tooling. Remove ESLint + Prettier,
update tsconfig to extend shared config, update package.json scripts.

## Changes for `apps/opticasuarez-react-router/`

### package.json
- Change `name` to `"web"`
- Remove devDependencies: eslint, eslint-plugin-react, eslint-plugin-react-hooks,
  @typescript-eslint/eslint-plugin, @typescript-eslint/parser, prettier
- Update scripts:
  - Remove: lint, lint:fix, format, format:fix
  - Change `check` to `npm run check:types`
  - Add `check:types`: `tsc`
  - Keep: build, dev, start, test:e2e, test:e2e:ui, test:e2e:headed

### tsconfig.json
- Add `"extends": "@opticasuarez/configs/typescript/react.json"`
- Remove duplicated compilerOptions that are in the shared config
- Keep only app-specific: include, baseUrl, paths, noEmit, lib (if different), target

### Delete files
- `eslint.config.js`
- `.prettierrc`
- `.prettierignore`
- `package-lock.json` (if exists)

## Changes for `apps/web/`

### package.json  
- Remove devDependencies: eslint, eslint-plugin-react, eslint-plugin-react-hooks,
  @typescript-eslint/eslint-plugin, @typescript-eslint/parser, @eslint/js, prettier
- Update scripts similar to above

### tsconfig.json
- Add `"extends": "@opticasuarez/configs/typescript/react.json"`
- Remove duplicated compilerOptions

### Delete files
- `eslint.config.js`

## Update `.gitignore`
Add: `.turbo`, `.pnpm-store`, `.biomeignore` patterns, `pnpm-lock.yaml` is NOT ignored.

## Acceptance Criteria
- [ ] ESLint and Prettier deps removed from both apps
- [ ] App tsconfigs extend `@opticasuarez/configs/typescript/react.json`
- [ ] Script updates are Turbo-compatible
- [ ] ESLint/Prettier config files deleted
- [ ] `.gitignore` updated with monorepo patterns
