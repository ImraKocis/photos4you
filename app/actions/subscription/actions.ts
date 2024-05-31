"use server";

import { SubscriptionName, User } from "@/lib/types/user";
import { getSession } from "@/app/lib/auth/session";

interface SubscriptionChangeData {
  userId?: number | null;
  subscriptionId?: number | null;
  newSubscriptionName?: SubscriptionName | null;
  oldSubscriptionName?: SubscriptionName | null;
}

export async function changeSubscription(
  data: SubscriptionChangeData,
): Promise<User | null> {
  const tokens = await getSession();
  if (!tokens.jwt) return null;
  try {
    const response = await fetch(
      `${process.env.API_BASE_URL}/user/update/subscription`,
      {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${tokens.jwt}`,
        },
        body: JSON.stringify({
          id: data.userId?.toString(),
          subscriptionId: data.subscriptionId?.toString(),
          subscriptionName: data.newSubscriptionName,
          odlSubscriptionName: data.oldSubscriptionName,
        }),
      },
    );

    if (response.ok) return await response.json();
  } catch (e) {
    console.log(e);
  }
  return null;
}