import { ReactElement } from "react";
import { getImageUrlData } from "@/app/actions/images/actions";
import { S3Image } from "@/lib/types/image";
import { CustomImage } from "@/app/ui/image/custom-image";
import React from "react";

export interface ImageGrid {
  images: S3Image[] | null;
}

export async function ImageGrid({ images }: ImageGrid): Promise<ReactElement> {
  const imageData = await getImageUrlData();
  return (
    <div className="grid grid-cols-2 gap-12">
      {images?.map((image, index) => (
        <React.Fragment key={index}>
          <CustomImage image={image} imageData={imageData} />
        </React.Fragment>
      ))}
    </div>
  );
}
