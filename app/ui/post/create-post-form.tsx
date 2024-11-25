"use client";

import { ChangeEvent, ReactElement, useRef, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createPostFormSchema } from "@/lib/post/definitions";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useSubscription, useUser } from "@/lib/redux/hooks";
import Image from "next/image";
import {
  getImagesWithUserId,
  getImageUrlData,
} from "@/app/actions/images/actions";
import { ImageUrlBuilder } from "@/utils/builder/images-url-builder";
import { createPost } from "@/app/actions/post/actions";
import { AlertDialogCancel } from "@/components/ui/alert-dialog";
import { useAlertDialogContext } from "@/app/ui/navigation/alert-dialog-context";
import { Subscription, User } from "@/lib/types/user";

function handlePostCreationAbilityByLimit(
  user: User,
  subscription: Subscription,
): boolean {
  const oneDay = 1000 * 3600 * 24;
  const todayPosts = user.posts.filter(
    (post) =>
      new Date().getTime() - new Date(post.createdAt).getTime() <= oneDay,
  );

  return todayPosts.length < subscription.DailyLimit.limit;
}

function handlePostCreationAbilityBySize(
  subscription: Subscription | null,
  imageSize: number,
): boolean {
  if (!subscription) return false;
  const { UploadSize } = subscription;
  return imageSize <= UploadSize.size * 1024 * 1024;
}

export function CreatePostForm(): ReactElement {
  const { toast } = useToast();
  const user = useUser();
  const subscription = useSubscription();
  const { setIsDialogOpen } = useAlertDialogContext();
  const file = useRef<HTMLInputElement | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const form = useForm<z.infer<typeof createPostFormSchema>>({
    resolver: zodResolver(createPostFormSchema),
    defaultValues: {
      description: "",
      hashtags: "",
    },
  });

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const previewURL = URL.createObjectURL(file);
      setImagePreview(previewURL);
    }
  };

  async function onSubmit(data: z.infer<typeof createPostFormSchema>) {
    const arrayOfImages = file.current?.files;
    if (!user) {
      toast({
        variant: "destructive",
        title: "Your session has expired",
        description: "Please login again",
      });
      return;
    }

    if (!subscription) {
      toast({
        variant: "destructive",
        title: "Something went wrong with publishing your post",
        description: "Please refresh the page and try again",
      });
      return;
    }
    if (!handlePostCreationAbilityByLimit(user, subscription)) {
      toast({
        variant: "destructive",
        title: "You have reached your daily limit",
        description: "Please try again tomorrow",
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
    if (!handlePostCreationAbilityBySize(subscription, arrayOfImages[0].size)) {
      toast({
        variant: "destructive",
        title: "Image size is too big",
        description: "Please try again with a smaller image",
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
            contentType: arrayOfImages[i].type,
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

        await fetch(url, {
          method: "POST",
          body: formData,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Failed to upload images",
          description:
            "Please try again later and check your internet connection",
        });
      }
    }

    const userImages = await getImagesWithUserId(user.id);
    if (!userImages) {
      toast({
        variant: "destructive",
        title: "Something went wrong",
      });
      return null;
    }
    const imageBaseData = await getImageUrlData();
    const newestImage = userImages[0];
    const uploadedImageUrl = new ImageUrlBuilder()
      .setImageUrl(newestImage.Key)
      .setBucketName(imageBaseData.bucket)
      .setRegion(imageBaseData.region)
      .build();

    const post = await createPost({
      userId: user.id.toString(),
      description: data.description,
      hashtags: data.hashtags.split(" "),
      image: {
        url: uploadedImageUrl,
        size: newestImage.Size.toString(),
      },
    });

    if (!post) {
      toast({
        variant: "destructive",
        title: "We could not create your post",
        description: "Please try again later",
      });
    } else {
      toast({
        variant: "default",
        title: "Post created",
        description: "If will be visible to others shortly",
      });
    }

    setUploading(false);
    setIsDialogOpen(false);
  }

  return (
    <div className="w-full min-w-[350px]">
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <h2 className="text-3xl font-bold">Create a new post</h2>
            <p className="text-gray-500">
              Share your thoughts, photos, and more.
            </p>
          </div>
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="What's on your mind?" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="hashtags"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Hashtags</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="#example #hashtag"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Separate hashtags with a space.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="image">Image</Label>
            {!imagePreview ? (
              <div className="flex items-center justify-center w-full">
                <label
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-700"
                  htmlFor="image"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <ImageIcon className="w-10 h-10 text-gray-400" />
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span>
                    </p>
                    <p className="text-xs text-gray-500">
                      JPEG, PNG, JPG up to 10MB
                    </p>
                  </div>
                </label>
              </div>
            ) : (
              <div className="flex items-center justify-center w-full">
                <div className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg bg-gray-50">
                  <div className="flex items-center">
                    <Image
                      src={imagePreview}
                      alt="Selected image"
                      width={64}
                      height={64}
                    />
                  </div>
                  <div className="flex flex-wrap flex-col">
                    <p className="text-sm text-gray-500">
                      Type: {file.current?.files?.[0].type}
                    </p>
                  </div>
                </div>
              </div>
            )}
            <input
              className="hidden"
              type="file"
              id="image"
              ref={file}
              onChange={handleFileChange}
              accept="image/png, image/jpeg, image/jpg"
            />
          </div>
          <div className="flex w-full gap-12">
            <Button className="w-full" type="submit" disabled={uploading}>
              Publish
            </Button>
            <AlertDialogCancel
              className="w-full"
              onClick={() => setIsDialogOpen(false)}
            >
              Cancel
            </AlertDialogCancel>
          </div>
        </form>
      </Form>
    </div>
  );
}
