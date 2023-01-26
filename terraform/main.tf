module "domain" {
  source       = "./modules/domain"
  project_env  = var.project_env
  project_name = local.project_name
  mime_types   = local.mime_types
  default_tags = local.default_tags
}