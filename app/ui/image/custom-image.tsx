"use client";
import { AWSUrlProps, S3Image } from "@/lib/types/image";
import { ReactElement } from "react";
import Image from "next/image";
import { ImageUrlBuilder } from "@/utils/builder/images-url-builder";

interface CustomImageProps {
  image: S3Image;
  imageData: AWSUrlProps;
}

export type ImageType = "original" | "blurred" | "sepia";
export type ImageFormat = "png" | "jpeg" | "jpg";

// const imageTypes = [
//   { value: "jpg", label: "JPG" },
//   { value: "png", label: "PNG" },
//   { value: "jpeg", label: "JPEG" },
// ];
//
// const imageOptions = [
//   { value: "original", label: "Original" },
//   { value: "blurred", label: "Blurred" },
//   { value: "sepia", label: "Sepia" },
// ];

export function CustomImage({
  image,
  imageData,
}: CustomImageProps): ReactElement {
  // const { imageType, setImageType, imageFormat, setImageFormat } =
  //   useImageDownloadContext();
  const src = new ImageUrlBuilder()
    .setImageUrl(image?.Key)
    .setBucketName(imageData.bucket)
    .setRegion(imageData.region)
    .build();

  // const handleDownload = async (
  //   image: S3Image,
  //   url: string,
  //   type: string,
  //   format: string,
  // ) => {
  //   const prototypes: { [key: string]: ImagePrototype } = {
  //     original: new OriginalImage(),
  //     blurred: new BlurredImage(),
  //     sepia: new SepiaImage(),
  //   };
  //
  //   const selectedPrototype = prototypes[type].clone();
  //   const link = document.createElement("a");
  //   const response = await fetch(url);
  //   console.log(response);
  //   if (!response.ok) {
  //     return null;
  //   }
  //   const blob = await response.blob();
  //   const processedBlob = await selectedPrototype.processImage(blob);
  //   const blobUrl = URL.createObjectURL(processedBlob);
  //   link.href = blobUrl;
  //   link.download = `${image.Key}.${format}`;
  //   document.body.appendChild(link);
  //
  //   link.click();
  //
  //   document.body.removeChild(link);
  //   URL.revokeObjectURL(blobUrl);
  // };

  return (
    <div className="flex relative items-center justify-center max-w-[470px] h-[580px] bg-gray-200 rounded-lg shadow-md">
      <Image src={src} alt="image" width={470} height={580} />
      <div className="absolute bottom-5 right-5 h-10 w-10 flex justify-center items-center hover:bg-gray-800 hover:text-white rounded-md transition duration-300 z-50">
        {/*<AlertDialog>*/}
        {/*  <AlertDialogTrigger asChild>*/}
        {/*    <DownloadIcon className="w-10" />*/}
        {/*  </AlertDialogTrigger>*/}
        {/*  <AlertDialogContent className="p-8 bg-background">*/}
        {/*    <AlertDialogHeader>*/}
        {/*      <AlertDialogTitle>Manage image options</AlertDialogTitle>*/}
        {/*    </AlertDialogHeader>*/}

        {/*    <div className="flex flex-col gap-4 mb-8">*/}
        {/*      <div className="flex gap-2">*/}
        {/*        {imageOptions.map((option, index) => (*/}
        {/*          <Button*/}
        {/*            key={index}*/}
        {/*            variant={*/}
        {/*              imageType === option.value ? "default" : "secondary"*/}
        {/*            }*/}
        {/*            onClick={() => setImageType(option.value)}*/}
        {/*            className="flex w-full"*/}
        {/*          >*/}
        {/*            {option.label}*/}
        {/*          </Button>*/}
        {/*        ))}*/}
        {/*      </div>*/}
        {/*      <div className="flex gap-2 w-full">*/}
        {/*        {imageTypes.map((option, index) => (*/}
        {/*          <Button*/}
        {/*            key={index}*/}
        {/*            variant={*/}
        {/*              imageFormat === option.value ? "default" : "secondary"*/}
        {/*            }*/}
        {/*            onClick={() => setImageFormat(option.value)}*/}
        {/*            className="flex w-full"*/}
        {/*          >*/}
        {/*            {option.label}*/}
        {/*          </Button>*/}
        {/*        ))}*/}
        {/*      </div>*/}
        {/*    </div>*/}

        {/*    <AlertDialogFooter className="flex w-full sm:justify-center">*/}
        {/*      <AlertDialogCancel>Cancel</AlertDialogCancel>*/}
        {/*      <AlertDialogAction*/}
        {/*        onClick={async () =>*/}
        {/*          await handleDownload(image, src, imageType, imageFormat)*/}
        {/*        }*/}
        {/*      >*/}
        {/*        Submit*/}
        {/*      </AlertDialogAction>*/}
        {/*    </AlertDialogFooter>*/}
        {/*  </AlertDialogContent>*/}
        {/*</AlertDialog>*/}
      </div>
    </div>
  );
}
