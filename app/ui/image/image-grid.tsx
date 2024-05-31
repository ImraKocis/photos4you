import { ReactElement } from "react";
import { getImageUrlData } from "@/app/actions/images/actions";
import { S3Image } from "@/lib/types/image";
import React from "react";
import { ImageContextWrapper } from "@/app/ui/image/image-context-provider";

export interface ImageGrid {
  images: S3Image[] | null;
}

export async function ImageGrid({ images }: ImageGrid): Promise<ReactElement> {
  const imageData = await getImageUrlData();
  return (
    <div className="w-full grid grid-cols-3 gap-12">
      {images?.map((image, index) => (
        <React.Fragment key={index}>
          <ImageContextWrapper image={image} imageData={imageData} />
        </React.Fragment>
      ))}
    </div>
  );
}
