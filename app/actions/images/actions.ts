"use server";

import { AWSUrlProps, S3Image, S3ImageResponse } from "@/lib/types/image";

export async function getImageUrlData(): Promise<AWSUrlProps> {
  return {
    bucket: process.env.AWS_BUCKET_NAME!!,
    region: process.env.AWS_REGION!!,
  };
}

export async function getImagesWithUserId(
  id: number,
): Promise<S3Image[] | null> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/image?id=${id}`,
  );
  if (response.ok) {
    const data: S3ImageResponse = await response.json();
    return data.images.sort((a, b) => {
      return (
        new Date(b.LastModified).getTime() - new Date(a.LastModified).getTime()
      );
    });
  }
  return null;
}
