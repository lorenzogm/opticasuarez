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
      install_command            = string
      auto_assign_custom_domains = bool
      vercel_authentication = object({
        deployment_type = string
      })
    })
    project_domain = optional(object({
      domain = string
    }))
  })
}

##############
### VERCEL ###
##############
variable "VERCEL_TOKEN" {
  type = string
}
variable "VERCEL_ORG_ID" {
  type = string
}
