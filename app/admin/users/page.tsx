import { ReactElement } from "react";
import AdminPageWrapper from "@/app/ui/auth/admin-page-wrapper";
import { getUsers } from "@/app/actions/admin/users";
import { UsersTable } from "@/app/ui/admin/data-table";
import { userTableColumns } from "@/app/ui/admin/users/columns";
import { RevalidateTable } from "@/app/ui/admin/users/revalidate-table";

export default async function AdminUsers(): Promise<ReactElement> {
  const users = await getUsers();

  return (
    <AdminPageWrapper>
      <div className="flex flex-col">
        <div className="flex w-full justify-between mb-12">
          <h1 className="text-3xl font-bold">Users</h1>
          <RevalidateTable tag="users" />
        </div>
        <UsersTable columns={userTableColumns} data={users!!} />
      </div>
    </AdminPageWrapper>
  );
}
