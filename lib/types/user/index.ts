import { Post } from "@/lib/types/post";

export interface User {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  role: Role;
  avatar?: string;
  firstName?: string;
  lastName?: string;
  posts?: Post[];
  subscription?: Subscription;
  lastSubscriptionChange?: Date;
}

export type Role = "USER" | "ADMIN";

export type Subscription = "FREE" | "PRO" | "GOLD";
