import type { Metadata } from "next";
import { Hanken_Grotesk as Grotesk } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { Providers } from "@/utils/providers/Providers";
import { getUser } from "@/app/actions/user/actions";
import { SideNavigation } from "@/app/ui/navigation/side-navigation";
import { LayoutWrapper } from "@/app/ui/main/layout-wrapper";
import { getSubscription } from "@/app/actions/subscription/actions";
export const dynamic = "force-dynamic";
const grotesk = Grotesk({
  subsets: ["latin"],
  weight: ["200", "300", "500", "600"],
  variable: "--font-grotesk",
});

export const metadata: Metadata = {
  title: "Photos4You",
  description: "Created by Imra Kocis",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();
  const subscription = await getSubscription(user?.id.toString());
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen w-full bg-background font-grotesk antialiased",
          grotesk.variable,
        )}
      >
        <Providers user={user} subscription={subscription}>
          <div className="flex relative h-full w-full">
            <SideNavigation />
            <LayoutWrapper>{children}</LayoutWrapper>
            <Toaster />
            <SonnerToaster />
          </div>
        </Providers>
      </body>
    </html>
  );
}
