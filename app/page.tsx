import { PostGrid } from "@/app/ui/post/post-grid";
import { getLatestPosts } from "@/app/actions/post/actions";
export default async function Home() {
  const posts = await getLatestPosts();

  return (
    <div className="flex min-h-screen flex-col items-center justify-between w-full">
      <PostGrid posts={posts} />
    </div>
  );
}
