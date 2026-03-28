# READBEFORE: Issue #371 Context

## Ticket Summary
Move all app files from repo root to `apps/opticasuarez-react-router/`. Update all CI/CD configs. No code changes.

## Key Decisions
- Directory name: `apps/opticasuarez-react-router/`
- `.agents/` stays at root
- `backlog/` stays at root
- `skills-lock.json` stays at root
- `.github/copilot-instructions.md` paths get updated
- All 4 GitHub Actions workflows get updated
- `copilot-setup-steps.yml` gets updated

## Current Tech Stack
- React Router v7.7.1 (SSR + prerender)
- Vite 5.4.21
- Vercel deployment (not GitHub Pages)
- npm (not pnpm)
- `base: '/'` in vite.config.ts

## File Paths Involved
All files at repo root except `.github/`, `.gitignore`, `README.md`, `skills-lock.json`, `.agents/`, `backlog/`

## Preflight
```bash
cd apps/opticasuarez-react-router && npm ci && npm run check && npm run build
```
