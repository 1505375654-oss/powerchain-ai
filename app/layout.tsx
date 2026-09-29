import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";

export const metadata: Metadata = {
  title: "PowerChain AI",
  description: "AI data center power infrastructure research terminal",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>
        <div className="min-h-screen bg-canvas">
          <Navbar />
          <Sidebar />
          <main className="pt-14 lg:pl-64">
            <div className="mx-auto min-h-[calc(100vh-3.5rem)] max-w-[1600px] p-4 md:p-6 lg:p-8">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
