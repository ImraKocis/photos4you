// app/components/ClientLayout.tsx
"use client";

import React, { ReactNode, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useLoading } from "@/app/context/loading-context";
import Loading from "@/app/loading";

interface ClientLayoutProps {
  children: ReactNode;
}

const ClientLayout: React.FC<ClientLayoutProps> = ({ children }) => {
  const { isLoading, setIsLoading } = useLoading();
  const pathname = usePathname();

  // Mimic route change handling
  useEffect(() => {
    // This will trigger loading state when pathname changes
    setIsLoading(true);

    // Simulate an async operation such as data fetching
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Adjust timing based on your needs

    return () => clearTimeout(timer);
  }, [pathname, setIsLoading]);

  return <>{isLoading ? <Loading /> : children}</>;
};

export default ClientLayout;
