terraform {
  backend "s3" {
    region  = "eu-central-1"
    encrypt = "true"
    key     = "terraform/terraform.tfstate"
  }
}

provider "aws" {
  region = "eu-central-1"
}