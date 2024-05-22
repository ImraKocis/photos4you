import { AWSUrlProps, S3Image } from "@/lib/types/image";
import { ReactElement } from "react";
import Image from "next/image";
import { ImageUrlBuilder } from "@/utils/builder/images-url-builder";

interface CustomImageProps {
  image: S3Image;
  imageData: AWSUrlProps;
}

export async function CustomImage({
  image,
  imageData,
}: CustomImageProps): Promise<ReactElement> {
  const src = new ImageUrlBuilder()
    .setImageUrl(image?.Key)
    .setBucketName(imageData.bucket)
    .setRegion(imageData.region)
    .build();
  return (
    <div className="flex items-center justify-center max-w-[470px] h-[580px] bg-gray-200 rounded-lg shadow-md">
      <Image src={src} alt="image" width={470} height={580} />
    </div>
  );
}
