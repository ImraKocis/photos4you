export interface UpdateAdminUserProps {
  id: number;
  firstName?: string;
  lastName?: string;
}

export interface UpdateAdminUserSubscriptionProps {
  id: number;
  subscriptionId: number;
  subscription: string;
  oldSubscription: string;
}

export interface UpdateUserRoleProps {
  id: number;
  role: string;
}
