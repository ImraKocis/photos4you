"use server";

import {
  DailyLimit,
  Subscription,
  SubscriptionName,
  UploadSize,
  User,
} from "@/lib/types/user";
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
    console.error(e);
  }
  return null;
}

export async function getSubscription(
  id?: string,
): Promise<Subscription | null> {
  if (!id) return null;
  const session = await getSession();
  const response = await fetch(
    `${process.env.API_BASE_URL}/subscription/${id}`,
    {
      headers: {
        Authorization: `Bearer ${session.jwt}`,
      },
    },
  );

  if (!response.ok) return null;
  return await response.json();
}

export async function getDailyLimits(): Promise<DailyLimit[] | null> {
  const session = await getSession();
  const response = await fetch(`${process.env.API_BASE_URL}/daily-limit`, {
    headers: {
      Authorization: `Bearer ${session.jwt}`,
    },
  });

  if (!response.ok) return null;
  return await response.json();
}

export async function getUploadSizes(): Promise<UploadSize[] | null> {
  const session = await getSession();
  const response = await fetch(`${process.env.API_BASE_URL}/upload-size`, {
    headers: {
      Authorization: `Bearer ${session.jwt}`,
    },
  });

  if (!response.ok) return null;
  return await response.json();
}
