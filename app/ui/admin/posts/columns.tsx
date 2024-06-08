"use client";
import { ColumnDef } from "@tanstack/react-table";
import { PostExtended } from "@/lib/types/post";
import Image from "next/image";
import { Edit, Eye, Trash } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { AdminPostEditDialog } from "@/app/ui/admin/posts/admin-post-edit-dialog";
import { AdminPostPreviewDialog } from "@/app/ui/admin/posts/admin-post-preview-dialog";
import { deletePost } from "@/app/actions/post/actions";

export const postColumns: ColumnDef<PostExtended>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ getValue }) => new Date(getValue() as string).toLocaleDateString(),
  },
  {
    accessorKey: "updatedAt",
    header: "Updated At",
    cell: ({ getValue }) => new Date(getValue() as string).toLocaleDateString(),
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ getValue }) => getValue() || "N/A",
  },
  {
    accessorKey: "hashtags",
    header: "Hashtags",
    cell: ({ getValue }) => (getValue() as string[]).join(", "),
  },
  {
    accessorKey: "user.email",
    header: "User Email",
  },
  {
    accessorKey: "user.firstName",
    header: "First Name",
  },
  {
    accessorKey: "user.lastName",
    header: "Last Name",
  },
  {
    accessorKey: "image.url",
    header: "Image",
    cell: ({ getValue }) => (
      <Image
        src={getValue() as string}
        alt="Post Image"
        width={100}
        height={100}
        className="rounded-md"
      />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const post = row.original;
      return (
        <div className="flex gap-4">
          <AdminPostPreviewDialog post={post}>
            <button>
              <Eye className="w-4 h-4" />
            </button>
          </AdminPostPreviewDialog>

          <AdminPostEditDialog post={post}>
            <button>
              <Edit className="w-4 h-4 text-black" />
            </button>
          </AdminPostEditDialog>

          <Dialog>
            <DialogTrigger asChild>
              <button className="disabled:text-gray-400 text-red-800">
                <Trash className="w-4 h-4" />
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you sure?</DialogTitle>
              </DialogHeader>
              <DialogDescription className="mb-8">
                Are you sure you want to delete this post, this is permanent
                action
              </DialogDescription>
              <div className="flex justify-center items-center">
                <Image
                  src={post.image.url}
                  alt="Post Image"
                  width={150}
                  height={150}
                  className="rounded-md"
                />
              </div>
              <DialogFooter>
                <Button
                  variant="destructive"
                  onClick={async () => {
                    const result = await deletePost(post.id.toString());
                    if (!result) {
                      toast.error("Failed to delete post");
                      return;
                    }
                    toast("Post deleted");
                  }}
                >
                  Delete
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      );
    },
  },
];
