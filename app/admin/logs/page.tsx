import { ReactElement } from "react";
import AdminPageWrapper from "@/app/ui/auth/admin-page-wrapper";
import { UsersTable } from "@/app/ui/admin/data-table";
import { logColumns } from "@/app/ui/admin/logs/columns";
import { getLogs } from "@/app/actions/admin/logs";

export default async function AdminLogs(): Promise<ReactElement> {
  const logs = await getLogs();
  return (
    <AdminPageWrapper>
      <UsersTable columns={logColumns} data={logs ? logs : []} />
    </AdminPageWrapper>
  );
}
