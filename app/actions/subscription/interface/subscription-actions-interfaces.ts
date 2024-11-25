import { SubscriptionName } from "@/lib/types/user";

export interface SubscriptionChangeData {
  userId?: number | null;
  subscriptionId?: number | null;
  newSubscriptionName?: SubscriptionName | null;
  oldSubscriptionName?: SubscriptionName | null;
}
