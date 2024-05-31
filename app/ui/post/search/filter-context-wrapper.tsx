"use client";
import { ReactElement, ReactNode } from "react";
import { ImageFilterProvider } from "@/app/ui/post/search/post-filter-context";
import { PostExtended } from "@/lib/types/post";

interface FilterContextWrapperProps {
  children: ReactNode;
  posts: PostExtended[] | null;
  hashtags: string[] | null;
}

export function FilterContextWrapper({
  children,
  posts,
  hashtags,
}: FilterContextWrapperProps): ReactElement {
  return (
    <ImageFilterProvider initialPosts={posts} initialHashtags={hashtags}>
      {children}
    </ImageFilterProvider>
  );
}
