import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { Header } from "@/components";

export const metadata: Metadata = {
  title: "Auth0 Client",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <UserProvider>
        <body className="bg-white font-mono">
          <Header />
          {children}
        </body>
      </UserProvider>
    </html>
  );
}
