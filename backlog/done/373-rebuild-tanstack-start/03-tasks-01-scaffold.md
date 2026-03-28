# Task 01 — Scaffold TanStack Start project

## Objective
Create the `apps/web/` directory with all configuration files and the TanStack Start framework boilerplate.

## Files to Create

1. `apps/web/package.json` — Dependencies, scripts (dev, build, start, lint, check, typecheck, format)
2. `apps/web/vite.config.ts` — tanstackStart plugin + viteReact + Tailwind CSS via PostCSS
3. `apps/web/tsconfig.json` — Strict mode, path alias `~/*` → `./src/*`
4. `apps/web/tailwind.config.js` — Content paths `./src/**/*.{js,ts,jsx,tsx}`, same custom utilities as source
5. `apps/web/eslint.config.js` — Copy from source app
6. `apps/web/.env.example` — Copy from source app (RESEND_API_KEY)
7. `apps/web/src/router.tsx` — createRouter with routeTree, scrollRestoration
8. `apps/web/src/routes/__root.tsx` — Root layout: HTML structure, HeadContent, Scripts, GTM, favicon, structured data, GlobalNavigation + Outlet
9. `apps/web/src/global.css` — Copy from source app (Tailwind import + custom styles)

## Dependencies to Install

**Production:** @tanstack/react-start, @tanstack/react-router, react, react-dom, @tailwindcss/postcss, embla-carousel-react, resend, lucide-react, gray-matter, class-variance-authority, tailwind-merge, clsx, @forge42/seo-tools

**Development:** vite, @vitejs/plugin-react, typescript, @types/react, @types/react-dom, @types/node, eslint

## Acceptance Criteria
- [ ] `cd apps/web && npm install` succeeds
- [ ] `npm run dev` starts without crashing (may have empty routes)
- [ ] tsconfig.json has strict mode and `~/*` alias
- [ ] Tailwind CSS configured and working
- [ ] Root layout renders HTML shell
