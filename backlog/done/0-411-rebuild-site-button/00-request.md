## Description

Content editors occasionally need to force a complete rebuild of all pages — for example after making bulk content changes, fixing a schema issue, or when on-demand revalidation alone isn't sufficient. This story adds a **"Rebuild Site" button** inside Sanity Studio that triggers a full Vercel deployment, rebuilding all static pages from scratch.

The button should be implemented as a custom Sanity Studio tool that calls a Vercel Deploy Hook URL. It should provide visual feedback (loading state, success/error) so editors know the rebuild was triggered.

## Acceptance Criteria

- [ ] A "Rebuild Site" tool/action is visible in Sanity Studio's sidebar or toolbar
- [ ] Clicking the button triggers a Vercel Deploy Hook that starts a full production build
- [ ] The button shows a loading state while the request is being sent
- [ ] A success message confirms the rebuild was triggered (with a note that it may take a few minutes to complete)
- [ ] An error message is shown if the deploy hook request fails
- [ ] A confirmation dialog is shown before triggering to prevent accidental rebuilds
- [ ] The Vercel Deploy Hook URL is configured as an environment variable (`SANITY_STUDIO_VERCEL_DEPLOY_HOOK`) in Sanity Studio, not hardcoded

## Technical Context

### Relevant Existing Code
- `apps/sanity-studio/sanity.config.ts` — Studio config where custom tools are registered via `plugins` or `tools`
- `apps/sanity-studio/package.json` — Dependencies for the studio
- `apps/sanity-studio/structure/desk-structure.ts` — Current desk structure
- `.github/workflows/deploy-sanity-studio.yml` — Studio deployment workflow; env vars need to include the deploy hook URL

### Patterns to Follow
- Sanity Studio custom tool: `definePlugin` with a `tools` array containing a React component
- Vercel Deploy Hooks: `POST` to `https://api.vercel.com/v1/integrations/deploy/{hookId}` with no auth needed (URL is the secret)
- Use `SANITY_STUDIO_` prefix for environment variables (Sanity Studio convention for client-exposed vars)

### Data & API
- Vercel Deploy Hook: created in Vercel dashboard → Project Settings → Git → Deploy Hooks
- Hook triggers a new deployment for the specified branch (main)
- Hook URL format: `https://api.vercel.com/v1/integrations/deploy/prj_xxxxx`

## Scope

### In Scope
- Create a custom Sanity Studio tool component with a "Rebuild Site" button
- Register the tool in `sanity.config.ts`
- Call the Vercel Deploy Hook URL on button click
- Show loading, success, and error states
- Add confirmation dialog
- Document how to create the Deploy Hook in Vercel and set the env var

### Out of Scope
- Showing real-time build progress (Vercel doesn't expose this via deploy hooks)
- Per-page revalidation (Story #409)
- Preview mode (Story #410)

## Priority

Medium — Useful convenience feature but not blocking. Editors can alternatively trigger a rebuild by pushing to GitHub or via the Vercel dashboard.

## Type

feature

## Notes

- Vercel Deploy Hooks are created in the Vercel dashboard under Project Settings → Git → Deploy Hooks. The generated URL should be stored as `SANITY_STUDIO_VERCEL_DEPLOY_HOOK` in the Sanity Studio environment
- The `SANITY_STUDIO_` prefix is required for Sanity to expose the variable to the Studio client bundle
- The deploy hook URL itself acts as authentication — anyone with the URL can trigger a deploy. Keep it secret.
- The button should be restricted to editors/admins if possible (Sanity role-based access)

## Related Stories

- #408 Static pre-rendering at build time — the rebuild button triggers a full rebuild of the static site
- #409 On-demand revalidation via Sanity webhook — complementary; webhook handles per-page updates, this handles full rebuilds
- #410 Sanity Presentation tool (live preview) — independent
- #412 Remove products from homepage — independent
