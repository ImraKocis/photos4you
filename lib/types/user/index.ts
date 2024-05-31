import { Post } from "@/lib/types/post";

export interface User {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  role: Role;
  subscription: Subscription;
  posts: Post[];
  firstName: string | null;
  lastName: string | null;
  lastSubscriptionChange: Date | null;
  avatar?: string;
}

export interface Subscription {
  id: number;
  createdAt: Date;
  dailyLimitId: number;
  odlSubscription: SubscriptionName | null;
  name: SubscriptionName;
  updatedAt: Date;
  uploadSizeId: number;
  userId: number;
  validFrom: Date;
}

export type Role = "USER" | "ADMIN";

export type SubscriptionName = "FREE" | "PRO" | "GOLD";
