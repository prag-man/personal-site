import type { Metadata } from "next";
import "./globals.css";
import MinimalFooter from "@/components/minimal-footer";
import { Toaster } from "sonner";
export const metadata: Metadata = {
  title: "Pragyam Soni",
  description: "a place where i dump my thoughts, ideas, updates, and any shitty things i do",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased relative">
          {children}
          <MinimalFooter />
          <Toaster />
      </body>
    </html>
  );
}
