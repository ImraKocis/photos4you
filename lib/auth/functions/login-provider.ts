import { AuthProvider } from "@/lib/types/auth";
import { AppStore } from "@/lib/redux/store";
import { loginWithProvider } from "@/app/actions/auth/actions";
import { set as setAuth } from "@/lib/redux/features/authSlice";
import { getUser } from "@/app/actions/user/actions";
import { getSubscription } from "@/app/actions/subscription/actions";
import { set as setUser } from "@/lib/redux/features/userSlice";
import { set as setSubscription } from "@/lib/redux/features/subscriptionSlice";

export const loginProvider = async (
  id: string,
  provider: AuthProvider,
  store?: AppStore,
) => {
  const response = await loginWithProvider(id, provider);
  store?.dispatch(setAuth(response));
  const user = await getUser();
  const subscription = await getSubscription(user?.subscription.id.toString());
  store?.dispatch(setUser(user));
  store?.dispatch(setSubscription(subscription));
  return response;
};
