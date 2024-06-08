"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Logs } from "@/lib/types/logs";

export const logColumns: ColumnDef<Logs>[] = [
  {
    accessorKey: "userId",
    header: "User ID",
    cell: ({ getValue }) => (getValue() ? (getValue() as string) : "N/A"),
  },
  {
    accessorKey: "action",
    header: "Action",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ getValue }) => (getValue() ? (getValue() as string) : "N/A"),
  },
];
