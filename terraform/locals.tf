
locals {
  project_name = "alphashop"
  mime_types   = jsondecode(file("./mime.json"))
  project_env  = "dev"

  default_tags = {
    Project     = local.project_name
    Environment = local.project_env
  }
}