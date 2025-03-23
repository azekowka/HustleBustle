import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { Navbar } from "../components/Navbar";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HustleBustle",
  description: "Turn chaos into clarity—track time effortlessly with HustleBustle",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en" className="view-transition">
        <body className={inter.className}>
          <Navbar />
          {children}
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  );
}
