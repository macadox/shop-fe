output "cloudfront_url" {
  value = aws_cloudfront_distribution.cf_distribution.domain_name
}

output "static_contents_s3_url" {
  value = aws_s3_bucket.static_content_bucket.bucket_regional_domain_name
}