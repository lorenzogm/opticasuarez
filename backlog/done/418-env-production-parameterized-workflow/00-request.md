## Description

Create the `.env.production` encrypted env file for production infrastructure secrets and
refactor the GitHub Actions workflow (`web-vercel-deploy.yml`) so a single workflow handles
both development and production deployments. The workflow currently hardcodes `development`
everywhere. After this change:

- **Push to `main`** → automatically deploys **development** (same as today)
- **Manual trigger (workflow_dispatch)** → lets the user choose between `development` (default) and `production`

Both paths run the same pipeline: infra → preview → E2E → promote to Vercel production.
The only difference is which `.env.<environment>` file is read and which GitHub Environment
namespace is used for the `OPTICASUAREZ_WEB_VERCEL_PROJECT_ID` variable.

## Acceptance Criteria

- [ ] An `.env.production` file exists at `infra/vercel/web/.env.production`, encrypted with dotenvx, containing production values (see Technical Context for the value mapping)
- [ ] The workflow `workflow_dispatch` trigger includes an `environment` input with type `choice`, options `[development, production]`, default `development`
- [ ] On `push` to `main`, the environment is always `development`
- [ ] On `workflow_dispatch`, the environment is the selected input value
- [ ] Every job that currently hardcodes `environment: development` or `TF_VAR_ENVIRONMENT: development` uses the resolved environment value instead
- [ ] Every job that reads `.env.development` reads `.env.<environment>` instead
- [ ] Every job that references `secrets.DOTENV_PRIVATE_KEY_INFRA_DEVELOPMENT` uses the environment-appropriate secret (`DOTENV_PRIVATE_KEY_INFRA_DEVELOPMENT` or `DOTENV_PRIVATE_KEY_INFRA_PRODUCTION`)
- [ ] GitHub Environment `production` is created as a namespace with its own `OPTICASUAREZ_WEB_VERCEL_PROJECT_ID` variable (value set after first Terraform run)
- [ ] The `.env.development` file is updated: `SANITY_DATASET` changed from `production` to `development`, `VITE_BASE_URL` reflects the dev URL
- [ ] The workflow still functions correctly for development (no regression)

## Technical Context

### Relevant Existing Code
- `.github/workflows/web-vercel-deploy.yml` — the full workflow to refactor (4 jobs: check-changes, infra-deploy, deploy-preview, deploy-production, e2e-tests)
- `infra/vercel/web/.env.development` — existing encrypted dev secrets
- `infra/vercel/web/.env.keys` — contains the development private key (gitignored pattern but committed for local dev)
- `infra/vercel/web/.gitignore` — already ignores `.env.keys`

### Workflow Parameterization Pattern
```yaml
on:
  push:
    branches: [main]
  workflow_dispatch:
    inputs:
      environment:
        description: "Target environment"
        required: true
        type: choice
        options:
          - development
          - production
        default: development

jobs:
  setup:
    runs-on: ubuntu-latest
    outputs:
      environment: ${{ steps.resolve.outputs.environment }}
    steps:
      - id: resolve
        run: |
          if [ "${{ github.event_name }}" = "workflow_dispatch" ]; then
            echo "environment=${{ github.event.inputs.environment }}" >> $GITHUB_OUTPUT
          else
            echo "environment=development" >> $GITHUB_OUTPUT
          fi

  infra-deploy:
    needs: [setup]
    environment: ${{ needs.setup.outputs.environment }}
    env:
      TF_VAR_ENVIRONMENT: ${{ needs.setup.outputs.environment }}
    # ...use .env.${{ needs.setup.outputs.environment }}
```

### Secret Naming for GitHub Environments
Since this is a free private repo, GitHub Environments work as namespaces for variables
but not for secrets with protection rules. The approach:
- **Repository secrets** (shared): `DOTENV_PRIVATE_KEY_INFRA_DEVELOPMENT`, `DOTENV_PRIVATE_KEY_INFRA_PRODUCTION`, `VERCEL_AUTOMATION_BYPASS_SECRET`
- **Environment variables** (per-env): `OPTICASUAREZ_WEB_VERCEL_PROJECT_ID` (different per env, set after first Terraform deploy)

The workflow references `secrets.DOTENV_PRIVATE_KEY_INFRA_${{ upper(env) }}` — since GitHub Actions doesn't support dynamic secret names directly, use a mapping step or conditional.

### .env.production Values

| Key | Value | Notes |
|-----|-------|-------|
| VERCEL_TOKEN | same as dev | Same Vercel account |
| VERCEL_ORG_ID | same as dev | Same team |
| TERRAFORM_STATE_ENCRYPT_KEY | same as dev | Same key, different state file names |
| VITE_BASE_URL | `https://opticasuarezjaen.es` | Production URL |
| RESEND_API_KEY | empty | Not configured yet |
| SANITY_PROJECT_ID | `2a24wmex` | Same Sanity project |
| SANITY_DATASET | `production` | Production dataset |
| SANITY_API_TOKEN | same as dev | Project-level token (verify access to both datasets) |
| SANITY_WEBHOOK_SECRET | **new value needed** | Separate webhook for production |
| SANITY_PREVIEW_SECRET | **new value needed** | Separate preview secret |
| GITHUB_DEPLOY_TOKEN | same as dev | Same repo access |

### .env.development Updates

| Key | Old Value | New Value | Notes |
|-----|-----------|-----------|-------|
| SANITY_DATASET | `production` | `development` | Point dev at new dataset (from story #417) |

### Creating .env.production
```bash
cd infra/vercel/web
# Create plaintext .env.production first, then encrypt
dotenvx encrypt -f .env.production
# This generates a DOTENV_PUBLIC_KEY_PRODUCTION in the file
# and outputs DOTENV_PRIVATE_KEY_PRODUCTION to add to GitHub Secrets
```

### GitHub Setup Needed
1. Create GitHub Environment `production` (Settings → Environments → New)
2. Add Environment variable `OPTICASUAREZ_WEB_VERCEL_PROJECT_ID` (value from first Terraform run)
3. Add Repository secret `DOTENV_PRIVATE_KEY_INFRA_PRODUCTION` (from dotenvx encrypt output)

## Scope

### In Scope
- Creating `.env.production` (encrypted)
- Updating `.env.development` (SANITY_DATASET change)
- Refactoring the workflow for environment parameterization
- Documenting the GitHub Environment / Secrets setup steps

### Out of Scope
- Actually creating the GitHub Environments in the GitHub UI (manual step)
- DNS configuration for production domains
- Removing custom domains from the dev Vercel project (user does manually)
- Terraform code changes (story #416)
- Sanity dataset creation (story #417)

## Priority

Medium — final piece that enables production deployments

## Type

feature

## Notes

- The Developer agent cannot create encrypted `.env.production` without the private key. The implementation should create the file with plaintext values and provide instructions for the user to encrypt with `dotenvx encrypt`.
- After encrypting, the user must add `DOTENV_PRIVATE_KEY_INFRA_PRODUCTION` to GitHub repository secrets.
- The first production workflow run will create the Vercel project and output its ID. The user must then set `OPTICASUAREZ_WEB_VERCEL_PROJECT_ID` in the GitHub `production` environment.

## Related Stories

- #416 Terraform multi-domain + production config — provides the Terraform config this workflow will use
- #417 Sanity development dataset + Studio multi-workspace — provides the dataset that .env.development will point to
