import "server-only";
import { S3Client } from "@aws-sdk/client-s3";

export async function getS3Client(): Promise<S3Client> {
  return new S3Client({
    region: process.env.AWS_REGION,
  });
}
