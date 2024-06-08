"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Post } from "@/lib/types/post";
import { Role, Subscription } from "@/lib/types/user";
import Image from "next/image";
import { AdminUserEditDialog } from "@/app/ui/admin/users/admin-user-edit-dialog";
import { Edit, Trash } from "lucide-react";
import { toast } from "sonner";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  deleteUser,
  updateAdminUserSubscription,
  updateUserRole,
} from "@/app/actions/admin/users";
import { getSubscription } from "@/app/actions/subscription/actions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { getUserById } from "@/app/actions/user/actions";

type UserT = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  role: Role;
  subscription: Subscription;
  posts: Post[];
  firstName: string;
  lastName: string;
  lastSubscriptionChange: Date | null;
  avatar?: string;
};

export const userTableColumns: ColumnDef<UserT>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      const user = row.original;

      return (
        <Select
          onValueChange={async (value) => {
            const newRole = await updateUserRole({
              id: user.id,
              role: value,
            });
            if (!newRole) {
              toast.error("Failed to update", {
                description: "Failed to update role",
              });
              return;
            }
            toast("Role updated", {
              action: {
                label: "Undo",
                onClick: async () => {
                  const updatedRole = await getUserById(user.id);
                  if (!updatedRole) {
                    console.error("Failed to get updated role");
                    return;
                  }
                  const undoRole = await updateUserRole({
                    id: user.id,
                    role: updatedRole.role === "USER" ? "ADMIN" : "USER",
                  });
                  if (!undoRole) console.error("Failed to undo role update");
                },
              },
            });
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={user.role} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="USER">USER</SelectItem>
            <SelectItem value="ADMIN">ADMIN</SelectItem>
          </SelectContent>
        </Select>
      );
    },
  },
  {
    accessorKey: "firstName",
    header: "First Name",
    cell: ({ getValue }) => getValue() || "N/A",
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
    cell: ({ getValue }) => getValue() || "N/A",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ getValue }) => new Date(getValue() as string).toLocaleDateString(),
  },
  {
    accessorKey: "updatedAt",
    header: "Updated At",
    cell: ({ getValue }) => new Date(getValue() as string).toLocaleDateString(),
  },
  {
    accessorKey: "lastSubscriptionChange",
    header: "Last Subscription Change",
    cell: ({ getValue }) =>
      getValue() ? new Date(getValue() as string).toLocaleDateString() : "N/A",
  },
  {
    accessorKey: "subscription.name",
    header: "Subscription Name",
    cell: ({ row }) => {
      const subscription = row.original.subscription;
      const user = row.original;
      return (
        <Select
          onValueChange={async (value) => {
            const newSubscription = await updateAdminUserSubscription({
              id: user.id,
              subscriptionId: subscription.id,
              subscription: value,
              oldSubscription: subscription.name,
            });
            if (!newSubscription) {
              toast.error("Failed to update", {
                description: "Failed to update subscription",
              });
              return;
            }
            toast("Subscription updated", {
              action: {
                label: "Undo",
                onClick: async () => {
                  const updatedSubscription = await getSubscription(
                    subscription.id.toString(),
                  );
                  if (
                    updatedSubscription &&
                    updatedSubscription.odlSubscription
                  ) {
                    const undoSubscription = await updateAdminUserSubscription({
                      id: user.id,
                      subscriptionId: subscription.id,
                      subscription: updatedSubscription.odlSubscription,
                      oldSubscription: subscription.name,
                    });
                    if (!undoSubscription)
                      console.error("Failed to undo subscription update");
                  } else {
                    console.error("Failed to get updated subscription");
                  }
                },
              },
            });
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={subscription.name} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="FREE">FREE</SelectItem>
            <SelectItem value="PRO">PRO</SelectItem>
            <SelectItem value="GOLD">GOLD</SelectItem>
          </SelectContent>
        </Select>
      );
    },
  },
  {
    accessorKey: "subscription.validFrom",
    header: "Subscription Valid From",
    cell: ({ getValue }) => new Date(getValue() as string).toLocaleDateString(),
  },

  {
    accessorKey: "posts",
    header: "Posts Count",
    cell: ({ getValue }) => (getValue() as Post[]).length,
  },
  {
    accessorKey: "avatar",
    header: "Avatar",
    cell: ({ getValue }) =>
      getValue() ? (
        <Image
          src={getValue() as string}
          alt="Avatar"
          width={32}
          height={32}
          className="rounded-full"
        />
      ) : (
        "N/A"
      ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div className="flex gap-4">
          <AdminUserEditDialog user={user}>
            <button>
              <Edit className="w-4 h-4 text-black" />
            </button>
          </AdminUserEditDialog>

          <Dialog>
            <DialogTrigger asChild>
              <button
                disabled={user.role === "ADMIN"}
                className="disabled:text-gray-400 text-red-800"
              >
                <Trash className="w-4 h-4" />
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you sure?</DialogTitle>
              </DialogHeader>
              <DialogDescription>
                Are you sure you want to delete user with email
                <span className="font-bold"> {user.email}</span>?
              </DialogDescription>
              <DialogFooter>
                <Button
                  variant="destructive"
                  onClick={async () => {
                    const result = await deleteUser(user.id);
                    if (!result) {
                      toast.error("Failed to delete user", {
                        description: "Failed to delete user",
                      });
                      return;
                    }
                    toast("User deleted");
                  }}
                >
                  Delete
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      );
    },
  },
];
