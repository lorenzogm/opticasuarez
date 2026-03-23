# Task 02: Create shared TypeScript configs package

## Description
Create `configs/` package with shared TypeScript base and React presets,
adapted from web-starter's `@repo/configs` package.

## Files to Create

### `configs/package.json`
```json
{
  "name": "@opticasuarez/configs",
  "version": "0.0.0",
  "private": true
}
```

### `configs/typescript/base.json`
Copy from web-starter with all compiler options intact.

### `configs/typescript/react.json`
Extends `./base.json`, adds `jsx: "react-jsx"` and DOM libs.

## Acceptance Criteria
- [ ] `configs/package.json` exists with name `@opticasuarez/configs`
- [ ] `configs/typescript/base.json` matches web-starter base config
- [ ] `configs/typescript/react.json` extends base with React settings
