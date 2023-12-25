import type { Metadata } from "next";
import "./globals.css";
import { UserProvider, useUser } from "@auth0/nextjs-auth0/client";
import { Footer, Header } from "@/components";

export const metadata: Metadata = {
  title: "JeCFe - Todo List",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <UserProvider>
        <body className="flex flex-col min-h-screen bg-white font-mono container mx-auto">
          <Header title="JeCFe - Todo List" />
          <div className="flex-1">{children}</div>
          <Footer />
        </body>
      </UserProvider>
    </html>
  );
}
