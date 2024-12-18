/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import NavbarComponent from "@/components/navbar/NavbarComponent";
import Footer from "@/components/footer/Footer";
import { roboto, koh_Santepheap } from "./fonts/fonts";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";

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
        <header className="bg-white border border-gray-200 fixed top-0 right-0 left-0  z-50">
          <NavbarComponent />
        </header>
        <SidebarProvider>
          <AppSidebar />

                    <main className="w-full">
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
