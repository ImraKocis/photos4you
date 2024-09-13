"use client";

import { ReactElement, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createPostFormSchema } from "@/lib/post/definitions";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSmallPostAlertDialogContext } from "@/app/ui/post/small-post-dialog-context";
import { AlertDialogCancel } from "@/components/ui/alert-dialog";
import { deletePost, updatePost } from "@/app/actions/post/actions";

interface UpdatePostFormCurrentData {
  postId: number;
  description?: string;
  hashtags: string;
}

export function UpdatePostForm({
  description,
  hashtags,
  postId,
}: UpdatePostFormCurrentData): ReactElement {
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);
  const { setIsSmallPostDialogOpen } = useSmallPostAlertDialogContext();
  const form = useForm<z.infer<typeof createPostFormSchema>>({
    resolver: zodResolver(createPostFormSchema),
    defaultValues: {
      description: description,
      hashtags: hashtags,
    },
  });

  async function onSubmit(data: z.infer<typeof createPostFormSchema>) {
    setUploading(true);
    const newData = {
      description:
        data.description === description ? undefined : data.description,
      hashtags:
        data.hashtags === hashtags ? undefined : data.hashtags.split(" "),
    };

    const response = await updatePost(postId.toString(), newData);
    if (!response) {
      toast({
        variant: "destructive",
        title: "Post edit failed",
        description: "Something went wrong, please try again later",
      });
      setUploading(false);
      return null;
    }
    setUploading(false);
    toast({
      title: "Post updated",
      description:
        "Your post has been updated successfully, changes will be reflected in the feed shortly",
    });
    setIsSmallPostDialogOpen(false);
  }

  return (
    <div className="w-full min-w-[350px] p-8 bg-background">
      <Form {...form}>
        <form className="space-y-6 " onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <h2 className="text-3xl font-bold">Edit your post</h2>
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
          <div className="flex w-full gap-12">
            <Button className="w-full" type="submit" disabled={uploading}>
              Publish
            </Button>
            <Button
              variant="destructive"
              type="button"
              onClick={async () => {
                const result = await deletePost(postId.toString());
                if (!result) {
                  toast({
                    title: "Failed to delete post",
                    variant: "destructive",
                  });
                  setIsSmallPostDialogOpen(false);
                  return;
                }
                toast({
                  title: "Post deleted",
                  description: "Your post has been deleted successfully",
                });
                setIsSmallPostDialogOpen(false);
                return;
              }}
            >
              Delete
            </Button>
            <AlertDialogCancel
              className="w-full"
              onClick={() => setIsSmallPostDialogOpen(false)}
            >
              Cancel
            </AlertDialogCancel>
          </div>
        </form>
      </Form>
    </div>
  );
}
