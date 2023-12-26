import type { Metadata } from "next";
import "@jecfe/react-design-system/src/tailwind.css";
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
        <body className="flex flex-col min-h-screen bg-white font-mono">
          <Header title="JeCFe - Todo List" />
          <div className="flex-1 container mx-auto">{children}</div>
          <Footer />
        </body>
      </UserProvider>
    </html>
  );
}
