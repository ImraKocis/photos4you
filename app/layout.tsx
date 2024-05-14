import type { Metadata } from "next";
import { Hanken_Grotesk as Grotesk } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import { Providers } from "@/utils/providers/Providers";
import { getUser } from "@/app/actions/user/actions";
import { SideNavigation } from "@/app/ui/navigation/side-navigation";

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
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-grotesk antialiased flex",
          grotesk.variable,
        )}
      >
        <Providers user={user}>
          <div className="flex h-full w-full">
            <SideNavigation />
            {children}
            <Toaster />
          </div>
        </Providers>
      </body>
    </html>
  );
}
