import type { Metadata } from "next";
import { Hanken_Grotesk as Grotesk } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";

const grotesk = Grotesk({
  subsets: ["latin"],
  weight: ["200", "300", "500", "600"],
  variable: "--font-grotesk",
});

export const metadata: Metadata = {
  title: "Photos4You",
  description: "Created by Imra Kocis",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-grotesk antialiased",
          grotesk.variable,
        )}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
