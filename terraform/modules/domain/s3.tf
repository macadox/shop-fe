resource "aws_s3_bucket" "static_app_bucket" {
  bucket        = "${var.project_name}-${terraform.workspace}-static-app-bucket-${var.project_env}"
  force_destroy = true
  acl           = "private"

  server_side_encryption_configuration {
    rule {
      apply_server_side_encryption_by_default {
        sse_algorithm = "AES256"
      }
    }
  }

  tags = var.default_tags
}

# STATIC APP OBJECTS TO UPLOAD
resource "aws_s3_bucket_object" "static_app_objects" {
  for_each     = fileset("../build", "**")
  bucket       = aws_s3_bucket.static_app_bucket.bucket
  key          = each.value
  source       = "../build/${each.value}"
  etag         = filemd5("../build/${each.value}")
  content_type = lookup(var.mime_types, regex("\\.[^.]+$", each.value), null)
  tags         = var.default_tags
}

resource "aws_s3_bucket_public_access_block" "block_public_access" {
  bucket = aws_s3_bucket.static_app_bucket.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket_policy" "static_app_bucket_policy" {
  bucket = aws_s3_bucket.static_app_bucket.id
  policy = <<EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "s3:GetObject"
            ],
            "Resource": [
                "${aws_s3_bucket.static_app_bucket.arn}/*"
            ],
            "Principal":{
                "AWS": [
                    "${aws_cloudfront_origin_access_identity.oai.iam_arn}"
                ]
            }
        }
    ]
}
EOF
}