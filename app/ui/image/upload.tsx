"use client";

import { ReactElement, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertDialogCancel } from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast";
import { useUser } from "@/lib/redux/hooks";

const handleToastMessage = (success: number, fail: number): string => {
  if (!fail) return `${success} image/s has been successfully uploaded`;
  if (!success) return `${fail} image/s has failed to upload`;
  else
    return `${success} image/s has been successfully uploaded and ${fail} image/s has failed to upload`;
};

export function UploadPhoto(): ReactElement {
  const file = useRef<HTMLInputElement | null>(null);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();
  const user = useUser();
  let failCount = 0;
  let successCount = 0;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const arrayOfImages = file.current?.files;

    if (!user) {
      toast({
        variant: "destructive",
        title: "Your session has expired",
        description: "Please login again",
      });
      return;
    }

    if (!arrayOfImages || arrayOfImages.length < 1) {
      toast({
        variant: "destructive",
        title: "Upload fail!",
        description: "Please select at least one image to upload",
      });
      return;
    }

    setUploading(true);

    for (let i = 0; i < arrayOfImages.length; i++) {
      const response = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL + "/api/image",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            filename: file.current?.name,
            contentType: file.current?.type,
            userId: user.id,
          }),
        },
      );

      if (response.ok) {
        const { url, fields } = await response.json();
        const formData = new FormData();
        Object.entries(fields).forEach(([key, value]) => {
          formData.append(key, value as string);
        });
        formData.append("file", arrayOfImages[i]);

        const uploadResponse = await fetch(url, {
          method: "POST",
          body: formData,
        });

        if (uploadResponse.ok) {
          successCount += 1;
          if (i == arrayOfImages.length - 1) {
            toast({
              variant: "default",
              title: "Images uploaded",
              description: handleToastMessage(successCount, failCount),
            });
          }
        } else {
          failCount += 1;
          if (i == arrayOfImages.length - 1) {
            toast({
              variant: "default",
              title: "Images uploaded",
              description: handleToastMessage(successCount, failCount),
            });
          }
          console.error("S3 Upload Error:", uploadResponse);
        }
      } else {
        toast({
          variant: "destructive",
          title: "Failed to upload images",
          description:
            "Please try again later and check your internet connection",
        });
      }
    }
    setUploading(false);
  };

  return (
    <div className="flex flex-col gap-4 p-2">
      <form onSubmit={handleSubmit} className="flex flex-col gap-8 p-6">
        <Input
          id="file"
          type="file"
          ref={file}
          multiple
          accept="image/png, image/jpeg, image/jpg"
        />
        <div className="flex justify-between">
          <Button type="submit" disabled={uploading}>
            Upload
          </Button>
          <AlertDialogCancel className="bg-transparent border-0 p-[0px]">
            <Button variant="destructive" type="button">
              Cancel
            </Button>
          </AlertDialogCancel>
        </div>
      </form>
    </div>
  );
}
