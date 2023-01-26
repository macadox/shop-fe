locals {
  s3_origin_id = "${var.project_name}-${terraform.workspace}-origin-id-${var.project_env}"
}