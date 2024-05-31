"use client";

import { ReactElement } from "react";
import React from "react";
import { usePostFilterContext } from "@/app/ui/post/search/post-filter-context";
import { Post } from "@/app/ui/post/post";
import { ImageDownloadProvider } from "@/app/ui/image/image-download-context";

export function SearchPostsGrid(): ReactElement {
  const { posts } = usePostFilterContext();
  return (
    <div className="w-full grid 2xl:grid-cols-3 xl:grid-cols-2 lg:grid-cols-1 xl:gap-8 gap-6">
      {posts?.map((post, index) => (
        <React.Fragment key={index}>
          <ImageDownloadProvider>
            <Post {...post} />
          </ImageDownloadProvider>
        </React.Fragment>
      ))}
    </div>
  );
}
