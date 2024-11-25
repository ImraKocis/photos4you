import { FilterContextWrapper } from "@/app/ui/post/search/filter-context-wrapper";
import { FilterPostDialog } from "@/app/ui/post/search/filter-post-dialog";
import { ReactElement, Suspense } from "react";
import { getAllPosts, getHashtags } from "@/app/actions/post/actions";
import { SearchPostsGrid } from "@/app/ui/post/search/search-post-grid";
import Loading from "@/app/loading";

export default async function Search(): Promise<ReactElement> {
  const posts = await getAllPosts();
  const hashtags = await getHashtags();
  return (
    <Suspense fallback={<Loading />}>
      <div className="flex flex-col">
        <div className="flex">
          <h1 className="text-2xl font-bold">Search</h1>
          <FilterContextWrapper posts={posts} hashtags={hashtags}>
            <FilterPostDialog />
          </FilterContextWrapper>
        </div>
        <FilterContextWrapper posts={posts} hashtags={hashtags}>
          <SearchPostsGrid />
        </FilterContextWrapper>
      </div>
    </Suspense>
  );
}
