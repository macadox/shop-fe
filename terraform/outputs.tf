output "cloudfront_url" {
  value = module.domain.cloudfront_url
}

output "static_contents_s3_url" {
  value = module.domain.static_contents_s3_url
}