"use client";
import { ReactElement, ReactNode, useRef } from "react";
import { AppStore, makeStore } from "@/lib/redux/store";
import { Subscription, User } from "@/lib/types/user";
import { Provider as ReduxProvider } from "react-redux";
import { set as setUSer } from "@/lib/redux/features/userSlice";
import { set as setSubscription } from "@/lib/redux/features/subscriptionSlice";
import { NextUIProvider } from "@nextui-org/react";

interface ClientProvider {
  user: User | null;
  subscription: Subscription | null;
  children: ReactNode;
}

export function Providers({
  children,
  user,
  subscription,
}: ClientProvider): ReactElement {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = makeStore();
    storeRef.current.dispatch(setUSer(user));
    storeRef.current.dispatch(setSubscription(subscription));
  }
  return (
    <ReduxProvider store={storeRef.current}>
      <NextUIProvider>{children}</NextUIProvider>
    </ReduxProvider>
  );
}
