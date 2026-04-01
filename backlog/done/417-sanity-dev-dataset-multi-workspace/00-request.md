## Description

Create a new `development` dataset in Sanity and configure the Sanity Studio for multi-workspace
support so editors can switch between the `production` and `development` datasets from a single
Studio deployment. Currently, both the Studio and the web app hardcode `dataset: "production"`.
After this change, production keeps using the `production` dataset while the dev Vercel project
will use the new `development` dataset (configured via `SANITY_DATASET` env var).

The web app already reads `SANITY_DATASET` from the environment with a fallback to `"production"`,
so only the Sanity Studio and CLI config need code changes.

## Acceptance Criteria

- [ ] A `development` dataset exists in the Sanity project `2a24wmex`, seeded with the current production data (clone via CLI)
- [ ] `sanity.config.ts` uses `defineConfig([...])` (array form) to define two workspaces: "Production" (dataset `production`) and "Development" (dataset `development`)
- [ ] `sanity.cli.ts` defaults dataset to `production` (used for CLI commands; editors can override with `--dataset`)
- [ ] Both workspaces share the same schemas, plugins, structure, and tools
- [ ] The Studio deploys successfully with multi-workspace support (`pnpm --filter opticasuarez-sanity-studio run deploy`)
- [ ] A new Sanity API token scoped to the `development` dataset is created (or the existing project-level token is verified to have access to both datasets)

## Technical Context

### Relevant Existing Code
- `apps/sanity-studio/sanity.config.ts` — currently `defineConfig({ ... dataset: "production" })`; needs to become array form with two workspace configs
- `apps/sanity-studio/sanity.cli.ts` — currently hardcodes `dataset: "production"`; may stay as-is or be updated
- `apps/sanity-studio/schemas/` — shared schema types used by both workspaces
- `apps/sanity-studio/structure/desk-structure.ts` — shared structure definition
- `apps/sanity-studio/lib/rebuild-site-tool.tsx` — custom tool (included in both workspaces)
- `apps/web/src/lib/sanity.ts` — Web app already uses `process.env.SANITY_DATASET || "production"` (no changes needed)
- `apps/web/vite.config.ts` — also reads `SANITY_DATASET` from env (no changes needed)

### Patterns to Follow
- Sanity multi-workspace: `defineConfig([{ name: "production", ... }, { name: "development", ... }])`
- Each workspace gets its own `name`, `title`, `dataset` but shares `projectId`, `plugins`, `schema`, `tools`
- The workspace switcher appears automatically in the Studio navigation when using array config

### Dataset Creation
```bash
# Clone production dataset to development
npx sanity dataset copy production development --project 2a24wmex
```

### Sanity API Tokens
- Check if the existing project-level API token (stored in `.env.development` infra file) has access to both datasets
- If not, create a new token for the `development` dataset from the Sanity management console

## Scope

### In Scope
- Creating the `development` dataset (clone from production)
- Updating `sanity.config.ts` for multi-workspace
- Updating `sanity.cli.ts` if needed
- Verifying/creating API tokens for dataset access
- Deploying the updated Studio

### Out of Scope
- Changing the web app code (it already reads from `SANITY_DATASET` env var)
- Configuring webhooks for the development dataset (can be done later)
- Updating `.env.development` or `.env.production` infra files (story #418)

## Priority

Medium — needed before production infra can use a separate dataset

## Type

feature

## Related Stories

- #416 Terraform multi-domain + production config — extends Terraform for production project setup
- #418 .env.production + parameterized GitHub workflow — will set `SANITY_DATASET=production` for prod and `SANITY_DATASET=development` for dev
