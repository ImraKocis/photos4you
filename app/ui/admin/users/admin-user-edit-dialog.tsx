"use client";
import { ReactElement, ReactNode } from "react";
import { AdminUserEditForm } from "@/app/ui/admin/users/admin-user-edit-form";
import { User } from "@/lib/types/user";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export function AdminUserEditDialog({
  children,
  user,
}: {
  children: ReactNode;
  user: User;
}): ReactElement {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <AdminUserEditForm user={user} />
      </DialogContent>
    </Dialog>
  );
}
