"use client";
import React from "react";
import { AWSUrlProps, S3Image } from "@/lib/types/image";
import { ImageDownloadProvider } from "@/app/ui/image/image-download-context";
import { CustomImage } from "@/app/ui/image/custom-image";

interface ImageContextProviderProps {
  image: S3Image;
  imageData: AWSUrlProps;
}

export function ImageContextWrapper({
  image,
  imageData,
}: ImageContextProviderProps) {
  return (
    <ImageDownloadProvider>
      <CustomImage image={image} imageData={imageData} />
    </ImageDownloadProvider>
  );
}
