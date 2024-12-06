/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import NavbarComponent from "@/components/navbar/NavbarComponent";
import Footer from "@/components/footer/Footer";
import { roboto, koh_Santepheap } from "./fonts/fonts";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import TrendingComponent from "@/components/card-component/card-trending/LatestComponent";
import LatestComponent from "@/components/card-component/card-trending/LatestComponent";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.variable} ${koh_Santepheap.variable} min-h-screen`}
      >
        <header className="bg-white fixed top-0 right-0 left-0">
          <NavbarComponent />
        </header>
        <SidebarProvider>
          <AppSidebar />

                    <main className="bg-gray-100 w-full px-[100px] pb-6 pt-[72px]">
                        {children}
                    </main>
                </SidebarProvider>
                <footer>
                    <Footer />
                </footer>
            </body>
        </html>
    );
}
