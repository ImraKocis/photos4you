"use client";
import { ReactElement, useState } from "react";
import { User } from "@/lib/types/user";
import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { userAdminDataUpdateSchema } from "@/app/lib/admin/definitions";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { updateAdminUser } from "@/app/actions/admin/users";
import { createPostFormSchema } from "@/app/lib/post/definitions";
import { PostExtended } from "@/lib/types/post";
import { updatePost } from "@/app/actions/post/actions";
import { Textarea } from "@/components/ui/textarea";

export function AdminPostEditForm({
  post,
}: {
  post: PostExtended;
}): ReactElement {
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);
  const form = useForm<z.infer<typeof createPostFormSchema>>({
    resolver: zodResolver(createPostFormSchema),
    defaultValues: {
      hashtags: post.hashtags.join(" "),
      description: post.description,
    },
  });

  async function onSubmit(data: z.infer<typeof createPostFormSchema>) {
    setUploading(true);
    const newData = {
      hashtags: data.hashtags.split(" "),
      description: data.description,
    };

    const response = await updatePost(post.id.toString(), newData);
    if (!response) {
      toast({
        variant: "destructive",
        title: "Update failed",
      });
      setUploading(false);
      return null;
    }
    setUploading(false);
    toast({
      title: "Post updated",
    });
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
                    <Textarea {...field} />
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
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormDescription>
                    Separate hashtags with spaces
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex w-full gap-12">
            <Button className="w-full" type="submit" disabled={uploading}>
              Update
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
