import { Post } from "@/lib/types/post";

export interface User {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  role: Role;
  subscription: Subscription;
  posts: Post[];
  firstName: string;
  lastName: string;
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
  DailyLimit: DailyLimit;
  UploadSize: UploadSize;
}

export interface DailyLimit {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  limit: number;
  subscriptions: Subscription[];
  subscriptionName: SubscriptionName;
}

export interface UploadSize {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  size: number;
  subscriptions: Subscription[];
  subscriptionName: SubscriptionName;
}

export type Role = "USER" | "ADMIN";

export type SubscriptionName = "FREE" | "PRO" | "GOLD";
