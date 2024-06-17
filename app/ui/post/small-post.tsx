"use client";

import { ReactElement } from "react";
import Image from "next/image";
import { PostExtended } from "@/lib/types/post";
import { UpdatePostForm } from "@/app/ui/post/update-post-form";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useSmallPostAlertDialogContext } from "@/app/ui/post/small-post-dialog-context";

export function SmallPost(props: PostExtended): ReactElement {
  const { isSmallPostDialogOpen, setIsSmallPostDialogOpen } =
    useSmallPostAlertDialogContext();

  return (
    <AlertDialog open={isSmallPostDialogOpen}>
      <AlertDialogTrigger asChild>
        <div
          className="flex w-[150px] h-[128px] relative cursor-pointer"
          onClick={() => setIsSmallPostDialogOpen(true)}
        >
          <Image
            src={props.image.url}
            alt={props.user?.firstName ? props.user.firstName : ""}
            fill
            style={{ objectPosition: "center" }}
            className="rounded-sm h-full w-full"
          />
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <UpdatePostForm
          postId={props.id}
          description={props.description}
          hashtags={props.hashtags.join(" ")}
        />
      </AlertDialogContent>
    </AlertDialog>
  );
}
