terraform {
  required_providers {
    vercel = {
      source  = "vercel/vercel"
      version = "1.11.0"
    }
  }
}
provider "vercel" {
  api_token = var.VERCEL_TOKEN
  team      = var.VERCEL_ORG_ID
}
