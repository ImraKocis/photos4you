import { ReactElement, ReactNode } from "react";
import { getUser } from "@/app/actions/user/actions";
import { AdminForbidden } from "@/app/ui/auth/admin-forbidden";
import { AuthWrapper } from "@/app/ui/auth/auth-page-wrapper";

export default async function AdminPageWrapper({
  children,
}: {
  children: ReactNode;
}): Promise<ReactElement> {
  const user = await getUser();

  return (
    <AuthWrapper>
      {user?.role === "ADMIN" ? children : <AdminForbidden />}
    </AuthWrapper>
  );
}
