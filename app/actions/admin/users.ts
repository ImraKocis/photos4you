"use server";

import { getSession } from "@/app/lib-server-only/auth/session";
import { Subscription, User } from "@/lib/types/user";
import { revalidateTag } from "next/cache";
import {
  UpdateAdminUserProps,
  UpdateAdminUserSubscriptionProps,
  UpdateUserRoleProps,
} from "@/app/actions/admin/interface/user-actions-interfaces";

export async function getUsers(): Promise<User[] | null> {
  const session = await getSession();
  const response = await fetch(`${process.env.API_BASE_URL}/user/admin/all`, {
    headers: {
      Authorization: `Bearer ${session.jwt}`,
    },
    next: {
      revalidate: 5,
      tags: ["users"],
    },
  });
  if (!response.ok) {
    return null;
  }
  return await response.json();
}

export async function revalidateTable(tag: string) {
  revalidateTag(tag);
}

export async function updateAdminUser(
  data: UpdateAdminUserProps,
): Promise<User | null> {
  const session = await getSession();
  const response = await fetch(
    `${process.env.API_BASE_URL}/user/update/personal`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.jwt}`,
      },
      body: JSON.stringify({
        id: data.id.toString(),
        firstName: data.firstName,
        lastName: data.lastName,
      }),
    },
  );

  if (!response.ok) return null;

  return await response.json();
}

export async function updateAdminUserSubscription(
  data: UpdateAdminUserSubscriptionProps,
): Promise<Subscription | null> {
  const session = await getSession();
  const response = await fetch(
    `${process.env.API_BASE_URL}/user/update/subscription`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.jwt}`,
      },
      body: JSON.stringify({
        id: data.id.toString(),
        subscriptionId: data.subscriptionId.toString(),
        subscriptionName: data.subscription,
        odlSubscriptionName: data.oldSubscription,
      }),
    },
  );
  if (!response.ok) return null;

  return await response.json();
}

export async function deleteUser(id: number): Promise<boolean> {
  const session = await getSession();
  const response = await fetch(`${process.env.API_BASE_URL}/user/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${session.jwt}`,
    },
  });
  return response.ok;
}

export async function updateUserRole(
  data: UpdateUserRoleProps,
): Promise<User | null> {
  const session = await getSession();
  const response = await fetch(`${process.env.API_BASE_URL}/user/update/role`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.jwt}`,
    },
    body: JSON.stringify({
      id: data.id.toString(),
      role: data.role,
    }),
  });
  if (!response.ok) return null;

  return await response.json();
}
