# Task 09 — Cleanup + deploy studio

## Goal
Remove old content files and dependencies, deploy Sanity Studio, finalize.

## Steps

1. Remove `gray-matter` from `apps/web/package.json` dependencies
2. Remove `apps/web/src/lib/blog.ts` (replaced by Sanity queries)
3. Remove `apps/web/src/content/` directory (backed up in `/content/`)
4. Remove any remaining JSON imports with `{ type: "json" }` pattern
5. Verify no `fs` usage remains in web app source (only in scripts)
6. Run `cd apps/sanity-studio && npx sanity deploy` to deploy studio
7. Update root README with Sanity setup instructions
8. Final `pnpm check` and `pnpm build` — all 49+ pages prerender from Sanity

## Acceptance Criteria
- [ ] No `gray-matter` dependency
- [ ] No JSON content imports in source
- [ ] No `fs.readFileSync` in web app source (except scripts)
- [ ] Sanity Studio deployed and accessible
- [ ] `pnpm build` completes with all pages prerendered
- [ ] `pnpm check` passes clean
