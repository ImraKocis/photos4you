"use server";

import { getSession } from "@/app/lib/auth/session";
import { Subscription, User } from "@/lib/types/user";
import { revalidateTag } from "next/cache";

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

export async function updateAdminUser(data: {
  id: number;
  firstName?: string;
  lastName?: string;
}): Promise<User | null> {
  console.log(data);
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

export async function updateAdminUserSubscription(data: {
  id: number;
  subscriptionId: number;
  subscription: string;
  oldSubscription: string;
}): Promise<Subscription | null> {
  const session = await getSession();
  console.log(data);
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

export async function updateUserRole(data: {
  id: number;
  role: string;
}): Promise<User | null> {
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
