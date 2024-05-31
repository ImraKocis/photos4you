"use client";
import { ReactElement, ReactNode, useRef } from "react";
import { AppStore, makeStore } from "@/lib/redux/store";
import { User } from "@/lib/types/user";
import { Provider as ReduxProvider } from "react-redux";
import { set } from "@/lib/redux/features/userSlice";
import { NextUIProvider } from "@nextui-org/react";
import { LoadingProvider } from "@/app/context/loading-context";
import ClientLayout from "@/app/ui/main/client-layout";

interface ClientProvider {
  user: User | null;
  children: ReactNode;
}

export function Providers({ children, user }: ClientProvider): ReactElement {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = makeStore();
    storeRef.current.dispatch(set(user));
  }
  return (
    <ReduxProvider store={storeRef.current}>
      <NextUIProvider>
        <LoadingProvider>
          <ClientLayout>{children}</ClientLayout>
        </LoadingProvider>
      </NextUIProvider>
    </ReduxProvider>
  );
}
