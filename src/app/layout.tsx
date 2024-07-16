import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./builder-registry";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My Dataverse Project",
  description: "A Next.js project with Builder.io and Dataverse",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
