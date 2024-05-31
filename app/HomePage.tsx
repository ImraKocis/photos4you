import { getLatestPosts } from "@/app/actions/post/actions";
import { Suspense } from "react";
import Loading from "@/app/loading";
import { PostGrid } from "@/app/ui/post/post-grid";

export async function HomePageGetter() {
  const posts = await getLatestPosts();

  return (
    <div className="flex min-h-screen flex-col items-center justify-between w-full">
      <PostGrid posts={posts} />
    </div>
  );
}
