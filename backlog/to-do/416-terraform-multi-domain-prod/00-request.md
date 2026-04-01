## Description

Extend the Terraform configuration to support multiple custom domains per Vercel project
(including redirect domains) and create the production environment Terraform config file.
Currently the Terraform only supports a single optional domain via `project_domain`. Production
needs 4 domains: `opticasuarezjaen.es` (primary), `opticasuarezjaen.com`, `www.opticasuarezjaen.es`,
and `www.opticasuarezjaen.com` — the last three redirecting to the primary `.es` domain.

Also remove the unused `"staging"` entry from the environment lookup in `main.tf`.

## Acceptance Criteria

- [ ] `variables.tf` replaces the single `project_domain` with a `project_domains` list that supports multiple domains, each with an optional `redirect` target
- [ ] `main.tf` iterates over the domain list using `for_each`, creating a `vercel_project_domain` for each entry (with `redirect` when specified)
- [ ] The `"staging" = "stg"` entry is removed from the `local.environments` map in `main.tf`
- [ ] A new `config.production.json` is created with the 4 production domains (`opticasuarezjaen.es` as primary, the other 3 redirecting to it)
- [ ] `config.development.json` is updated: `project_domains` is an empty list (no custom domains for dev — they will be removed manually from Vercel first)
- [ ] Existing Terraform `plan` for development still works (no breaking changes to the existing dev infra)

## Technical Context

### Relevant Existing Code
- `infra/vercel/web/src/main.tf` — current Terraform resources; has single `vercel_project_domain.main` with `count`, and has `"staging" = "stg"` to remove
- `infra/vercel/web/src/variables.tf` — current variable definitions; has `project_domain = optional(object({ domain = string }))`
- `infra/vercel/web/src/config.development.json` — dev Terraform var file; no `project_domain` currently set
- `infra/vercel/web/src/config.production.json` — **to be created**
- `infra/vercel/web/src/providers.tf` — Vercel provider config (no changes needed)

### Patterns to Follow
- Use the Vercel Terraform provider's `vercel_project_domain` resource which supports a `redirect` attribute for domain redirects
- Use `for_each` with a map derived from the list for stable resource addressing (key by domain name)
- Keep the JSON config files as the only thing that differs between environments

### Domain Configuration for Production
- `opticasuarezjaen.es` — primary domain (no redirect)
- `www.opticasuarezjaen.es` → redirect to `opticasuarezjaen.es`
- `opticasuarezjaen.com` → redirect to `opticasuarezjaen.es`
- `www.opticasuarezjaen.com` → redirect to `opticasuarezjaen.es`

### Vercel project_domain redirect
The `vercel_project_domain` resource supports a `redirect` attribute. Example:
```hcl
resource "vercel_project_domain" "redirect" {
  project_id = vercel_project.main.id
  domain     = "www.example.com"
  redirect   = "example.com"
}
```

## Scope

### In Scope
- Extending Terraform variable and resource definitions for multi-domain
- Creating `config.production.json`
- Updating `config.development.json` to use new variable shape
- Removing staging from locals

### Out of Scope
- Actually running the Terraform (that happens via the workflow)
- Creating the `.env.production` file (separate story #418)
- DNS configuration (user manages DNS externally)
- Removing domains from the live dev Vercel project (user will do manually)

## Priority

Medium — needed before production deployment workflow can run

## Type

feature

## Related Stories

- #417 Sanity development dataset + Studio multi-workspace — creates the Sanity dataset production will use
- #418 .env.production + parameterized GitHub workflow — uses this Terraform config to deploy production
