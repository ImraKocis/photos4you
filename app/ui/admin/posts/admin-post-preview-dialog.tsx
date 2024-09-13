"use client";
import { ReactElement, ReactNode } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { PostExtended } from "@/lib/types/post";
import { Post } from "@/app/ui/post/post";
import { ImageDownloadProvider } from "@/app/ui/image/image-download-context";

export function AdminPostPreviewDialog({
  children,
  post,
}: Readonly<{
  children: ReactNode;
  post: PostExtended;
}>): ReactElement {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="p-8">
        <ImageDownloadProvider>
          <Post {...post} />
        </ImageDownloadProvider>
      </DialogContent>
    </Dialog>
  );
}
