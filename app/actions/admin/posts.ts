"use server";

import { getSession } from "@/app/lib/auth/session";

export async function deletePost(id: string): Promise<boolean | null> {
  const session = await getSession();
  const response = await fetch(`${process.env.API_BASE_URL}/post/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${session.jwt}`,
    },
  });
  console.log(response);
  const json = await response.json();
  console.log(json);
  if (!response.ok) return null;
  return json;
}
