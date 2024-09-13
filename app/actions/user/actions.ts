"use server";

import { User } from "@/lib/types/user";
import {
  getSession,
  getSessionUserId,
} from "@/app/lib-server-only/auth/session";

export async function getUser(): Promise<User | null> {
  const tokens = await getSession();
  const { id } = await getSessionUserId();
  const response = await fetch(`${process.env.API_BASE_URL}/user/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${tokens.jwt}`,
    },
  });

  if (!response.ok) return null;
  return await response.json();
}

export async function getUserById(id: number): Promise<User | null> {
  const session = await getSession();
  const response = await fetch(`${process.env.API_BASE_URL}/user/${id}`, {
    headers: {
      Authorization: `Bearer ${session.jwt}`,
    },
  });

  if (!response.ok) return null;
  return await response.json();
}

export async function updateUserPersonalData(data: {
  firstName: string;
  lastName: string;
  id?: number;
}): Promise<User | null> {
  const tokens = await getSession();

  const response = await fetch(
    `${process.env.API_BASE_URL}/user/update/personal`,
    {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${tokens.jwt}`,
      },
      body: JSON.stringify({
        id: data.id?.toString(),
        firstName: data.firstName,
        lastName: data.lastName,
      }),
    },
  );

  if (!response.ok) return null;
  return await response.json();
}
