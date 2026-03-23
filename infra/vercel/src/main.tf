locals {
  project_env_var_name = replace(upper(var.vercel.project.name), "-", "_")
  secrets = {}
  environments = {
    "development" = "dev"
    "staging"     = "stg"
    "production"  = "prod"
  }
  environment_short_code = lookup(local.environments, lower(var.ENVIRONMENT), "")
}

resource "vercel_project" "main" {
  team_id                    = var.VERCEL_ORG_ID != "" ? var.VERCEL_ORG_ID : null
  name                       = "${var.vercel.project.name}-${local.environment_short_code}"
  output_directory           = var.vercel.project.output_directory
  build_command              = var.vercel.project.build_command
  root_directory             = var.vercel.project.root_directory
  framework                  = var.vercel.project.framework
  public_source              = var.vercel.project.public_source
  install_command            = var.vercel.project.install_command
  auto_assign_custom_domains = var.vercel.project.auto_assign_custom_domains
  vercel_authentication      = var.vercel.project.vercel_authentication
}

resource "vercel_project_domain" "main" {
  count      = var.vercel.project_domain == null ? 0 : 1
  project_id = vercel_project.main.id
  domain     = var.vercel.project_domain.domain
}

resource "vercel_project_environment_variable" "variables" {
  for_each   = var.environment_variables
  project_id = vercel_project.main.id
  key        = each.key
  value      = each.value
  target     = ["development", "preview", "production"]
}

resource "vercel_project_environment_variable" "secrets" {
  for_each   = local.secrets
  project_id = vercel_project.main.id
  key        = each.key
  value      = each.value
  target     = ["development", "preview", "production"]
}

output "OPTICASUAREZ_WEB_VERCEL_PROJECT_ID" {
  description = "The Vercel project ID for opticasuarez-web"
  value       = vercel_project.main.id
  sensitive   = false
}
