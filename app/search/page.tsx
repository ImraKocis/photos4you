import { FilterContextWrapper } from "@/app/ui/post/search/filter-context-wrapper";
import { FilterPostDialog } from "@/app/ui/post/search/filter-post-dialog";
import { ReactElement } from "react";
import { getAllPosts, getHashtags } from "@/app/actions/post/actions";
import { SearchPostsGrid } from "@/app/ui/post/search/search-post-grid";

export default async function Search(): Promise<ReactElement> {
  const posts = await getAllPosts();
  const hashtags = await getHashtags();
  return (
    <div className="flex flex-col">
      <h1 className="text-2xl font-bold">Search</h1>
      <FilterContextWrapper posts={posts} hashtags={hashtags}>
        <FilterPostDialog />
        <SearchPostsGrid />
      </FilterContextWrapper>
    </div>
  );
}
