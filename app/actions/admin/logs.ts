"use server";

import { getSession } from "@/app/lib-server-only/auth/session";
import { Logs } from "@/lib/types/logs";

export async function getLogs(): Promise<Logs[] | null> {
  const session = await getSession();
  const response = await fetch(`${process.env.API_BASE_URL}/logs`, {
    headers: {
      Authorization: `Bearer ${session.jwt}`,
    },
  });
  if (!response.ok) return null;
  return await response.json();
}
