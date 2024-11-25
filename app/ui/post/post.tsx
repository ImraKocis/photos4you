import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CardContent, Card } from "@/components/ui/card";
import { DownloadIcon } from "lucide-react";
import { ReactElement } from "react";
import Image from "next/image";
import { handleUserProfileName } from "@/lib/utils";
import { v4 as uuidv4 } from "uuid";
import { PostExtended } from "@/lib/types/post";
import {
  BlurredImage,
  ImagePrototype,
  OriginalImage,
  SepiaImage,
} from "@/utils/prototype/image-download-options";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { imageOptions, imageTypes } from "@/lib/image/image";
import { useImageDownloadContext } from "@/app/ui/image/image-download-context";
import moment from "moment";

const handleDownload = async (url: string, type: string, format: string) => {
  const prototypes: { [key: string]: ImagePrototype } = {
    original: new OriginalImage(),
    blurred: new BlurredImage(),
    sepia: new SepiaImage(),
  };

  const selectedPrototype = prototypes[type].clone();
  const link = document.createElement("a");
  const response = await fetch(url);
  if (!response.ok) {
    return null;
  }
  const blob = await response.blob();
  const processedBlob = await selectedPrototype.processImage(blob);
  const blobUrl = URL.createObjectURL(processedBlob);
  link.href = blobUrl;
  link.download = `${uuidv4()}.${format}`;
  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);
  URL.revokeObjectURL(blobUrl);
};

export function Post(props: PostExtended): ReactElement {
  const { imageType, setImageType, imageFormat, setImageFormat } =
    useImageDownloadContext();
  const postDate = moment(props.createdAt);
  const now = moment();
  const isMoreThanTwoDaysOld = now.diff(postDate, "hours") > 24;
  return (
    <Card className="w-full flex flex-col min-w-[400px] h-[600px] rounded-lg">
      <div className="basis-2/3 w-full h-full relative">
        <Image
          className="rounded-t-lg"
          fill
          src={props.image.url}
          alt={props.user.firstName ? props.user.firstName : ""}
          style={{ objectPosition: "top", objectFit: "cover" }}
        />
      </div>
      <CardContent className="p-4 grid gap-2 basis-1/3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage
                alt={props.user.firstName ? props.user.firstName : ""}
                src={props.user.avatar}
              />
              <AvatarFallback className="text-white">
                {handleUserProfileName(
                  null,
                  props.user.firstName,
                  props.user.lastName,
                )}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium">{`${props.user.firstName} ${props.user.lastName}`}</span>
          </div>
          <Button size="icon" variant="ghost">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <DownloadIcon className="w-5 h-5" />
              </AlertDialogTrigger>
              <AlertDialogContent className="p-8 bg-background">
                <AlertDialogHeader>
                  <AlertDialogTitle>Manage image options</AlertDialogTitle>
                </AlertDialogHeader>

                <div className="flex flex-col gap-4 mb-8">
                  <div className="flex gap-2">
                    {imageOptions.map((option, index) => (
                      <Button
                        key={index}
                        variant={
                          imageType === option.value ? "default" : "secondary"
                        }
                        onClick={() => setImageType(option.value)}
                        className="flex w-full"
                      >
                        {option.label}
                      </Button>
                    ))}
                  </div>
                  <div className="flex gap-2 w-full">
                    {imageTypes.map((option, index) => (
                      <Button
                        key={index}
                        variant={
                          imageFormat === option.value ? "default" : "secondary"
                        }
                        onClick={() => setImageFormat(option.value)}
                        className="flex w-full"
                      >
                        {option.label}
                      </Button>
                    ))}
                  </div>
                </div>

                <AlertDialogFooter className="flex w-full sm:justify-center">
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={async () =>
                      await handleDownload(
                        props.image.url,
                        imageType,
                        imageFormat,
                      )
                    }
                  >
                    Submit
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </Button>
        </div>
        <p className="text-sm text-gray-500">{props.description}</p>
        <p className="text-sm text-gray-700">
          {isMoreThanTwoDaysOld
            ? postDate.format("MMMM Do YYYY.")
            : postDate.fromNow()}
        </p>
        {props.hashtags.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {props.hashtags?.map((hashtag, index) => (
              <Badge key={index} className="text-xs" variant="outline">
                {hashtag}
              </Badge>
            ))}
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
