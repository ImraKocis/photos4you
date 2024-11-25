import { ReactElement } from "react";
import AdminPageWrapper from "@/app/ui/auth/admin/admin-page-wrapper";
import { RevalidateTable } from "@/app/ui/admin/users/revalidate-table";
import { getAllPosts } from "@/app/actions/post/actions";
import { UsersTable } from "@/app/ui/admin/data-table";
import { postColumns } from "@/app/ui/admin/posts/columns";

export default async function AdminPosts(): Promise<ReactElement> {
  const posts = await getAllPosts();

  return (
    <AdminPageWrapper>
      <div className="flex flex-col">
        <div className="flex w-full justify-between mb-12">
          <h1 className="text-3xl font-bold">Posts</h1>
          <RevalidateTable tag="posts" />
        </div>
        <UsersTable columns={postColumns} data={posts!} />
      </div>
    </AdminPageWrapper>
  );
}
