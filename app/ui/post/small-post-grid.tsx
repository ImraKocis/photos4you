"use client";

import React from "react";
import { ReactElement } from "react";
import { PostExtended } from "@/lib/types/post";
import { SmallPost } from "@/app/ui/post/small-post";
import { SmallPostAlertDialogProvider } from "@/app/ui/post/small-post-dialog-context";

interface SmallPostGridProps {
  posts: PostExtended[] | null;
}

export function SmallPostGrid({ posts }: Readonly<SmallPostGridProps>): ReactElement {
  return (
    <div className="grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
      {posts?.map((post) => (
        <React.Fragment key={post.id}>
          <SmallPostAlertDialogProvider>
            <SmallPost {...post} />
          </SmallPostAlertDialogProvider>
        </React.Fragment>
      ))}
    </div>
  );
}
