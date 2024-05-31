"use server";

import { User } from "@/lib/types/user";
import { getSession, getSessionUserId } from "@/app/lib/auth/session";

export async function getUser(): Promise<User | null> {
  const tokens = await getSession();
  const { id } = await getSessionUserId();
  if (!tokens.jwt) return null;
  const response = await fetch(`${process.env.API_BASE_URL}/user/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${tokens.jwt}`,
    },
  });

  if (response.ok) return await response.json();
  return null;
}

export async function updateUserPersonalData(data: {
  firstName: string;
  lastName: string;
  id?: number;
}): Promise<User | null> {
  console.log(data);
  const tokens = await getSession();
  if (!tokens.jwt) return null;
  try {
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

    if (response.ok) return await response.json();
  } catch (e) {
    console.log(e);
  }
  return null;
}
