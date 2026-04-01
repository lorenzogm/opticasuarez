variable "ENVIRONMENT" {
  type = string
}

variable "environment_variables" {
  type    = map(string)
  default = {}
}

variable "secrets" {
  type    = map(string)
  default = {}
}

variable "vercel" {
  type = object({
    project = object({
      name                       = string
      root_directory             = string
      build_command              = string
      framework                  = string
      public_source              = string
      output_directory           = optional(string)
      install_command            = optional(string)
      auto_assign_custom_domains = bool
      vercel_authentication = object({
        deployment_type = string
      })
    })
    project_domains = optional(list(object({
      domain   = string
      redirect = optional(string)
    })), [])
  })
}

##############
### VERCEL ###
##############
variable "VERCEL_TOKEN" {
  type = string
}
variable "VERCEL_ORG_ID" {
  type    = string
  default = ""
}

##############################
### APP ENVIRONMENT VARS   ###
##############################
variable "VITE_BASE_URL" {
  type    = string
  default = ""
}
variable "RESEND_API_KEY" {
  type      = string
  default   = ""
  sensitive = true
}
variable "SANITY_PROJECT_ID" {
  type    = string
  default = ""
}
variable "SANITY_DATASET" {
  type    = string
  default = ""
}
variable "SANITY_API_TOKEN" {
  type      = string
  default   = ""
  sensitive = true
}
variable "SANITY_WEBHOOK_SECRET" {
  type      = string
  default   = ""
  sensitive = true
}
variable "SANITY_PREVIEW_SECRET" {
  type      = string
  default   = ""
  sensitive = true
}
variable "GITHUB_DEPLOY_TOKEN" {
  type      = string
  default   = ""
  sensitive = true
}
