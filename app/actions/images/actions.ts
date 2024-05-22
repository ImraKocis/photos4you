"use server";

import { AWSUrlProps, S3Image } from "@/lib/types/image";

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
