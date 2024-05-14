"use server";

import { User } from "@/lib/types/user";
import { getSession } from "@/app/lib/auth/session";

export async function getUser(): Promise<User | null> {
  const tokens = await getSession();
  const response = await fetch(`${process.env.API_BASE_URL}/user/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${tokens.jwt}`,
    },
  });

  if (response.ok) return await response.json();
  return null;
}
