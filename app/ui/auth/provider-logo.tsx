import { ReactElement, ReactNode } from "react";

interface ProviderLogoProps {
  children: ReactNode;
}

export function ProviderLogo({ children }: ProviderLogoProps): ReactElement {
  return (
    <button className="flex justify-center items-center p-3 border rounded-md pointer-events-auto">
      {children}
    </button>
  );
}

export function ProviderLogoContainer({
  children,
}: ProviderLogoProps): ReactElement {
  return (
    <div className="flex bg-white items-center justify-center gap-4">
      {children}
    </div>
  );
}
