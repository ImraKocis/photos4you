"use client";
import { ReactElement, ReactNode } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { PostExtended } from "@/lib/types/post";
import { AdminPostEditForm } from "@/app/ui/admin/posts/admin-post-edit-form";

export function AdminPostEditDialog({
  children,
  post,
}: {
  children: ReactNode;
  post: PostExtended;
}): ReactElement {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <AdminPostEditForm post={post} />
      </DialogContent>
    </Dialog>
  );
}
