"use server";

import { AWSUrlProps, S3Image } from "@/lib/types/image";
import { getS3Client } from "@/app/lib/s3/s3-config";
import { GetObjectCommand } from "@aws-sdk/client-s3";

export async function getUserImages(id?: string): Promise<S3Image[] | null> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/image/?userId=${id}`,
  );
  if (response.ok) {
    const data = await response.json();
    return data.images;
  }
  return null;
}

export async function getImageUrlData(): Promise<AWSUrlProps> {
  return {
    bucket: process.env.AWS_BUCKET_NAME!!,
    region: process.env.AWS_REGION!!,
  };
}

export async function getAllImages(): Promise<S3Image[] | null> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/image`);
  if (response.ok) {
    const data = await response.json();
    return data.images;
  }
  return null;
}

export async function downloadImage(key: string): Promise<any> {
  const s3 = await getS3Client();

  try {
    const input = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key,
    };

    const command = new GetObjectCommand(input);
    return await s3.send(command);
  } catch (e) {
    console.log(e);
  }
}
