locals {
  project_name = "alphashop"
  mime_types   = jsondecode(file("./mime.json"))

  default_tags = {
    Project     = local.project_name
    Environment = var.project_env
  }
}