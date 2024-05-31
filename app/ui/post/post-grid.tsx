"use client";
import React from "react";
import { ReactElement } from "react";
import { PostExtended } from "@/lib/types/post";
import { Post } from "./post";
import { ImageDownloadProvider } from "@/app/ui/image/image-download-context";

interface PostGridProps {
  posts: PostExtended[] | null;
}

export function PostGrid({ posts }: PostGridProps): ReactElement {
  return (
    <div className="grid 2xl:grid-cols-3 xl:grid-cols-2 lg:grid-cols-1 gap-8">
      <ImageDownloadProvider>
        {posts?.map((post, index) => (
          <React.Fragment key={index}>
            <Post {...post} />
          </React.Fragment>
        ))}
      </ImageDownloadProvider>
    </div>
  );
}
