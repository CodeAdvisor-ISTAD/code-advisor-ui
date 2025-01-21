import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import NavbarComponent from "@/components/navbar/NavbarComponent";
import Footer from "@/components/footer/Footer";
import { roboto, koh_Santepheap } from "./fonts/fonts";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import Provider from "./_provider";
import { Toaster } from "react-hot-toast";
import { CommentProvider } from "@/lib/context/commentContext";
import { UserProvider, useUser } from "@/lib/context/userContext";

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
        <UserProvider>
          <CommentProvider>
            <Provider>
              <header className="bg-white border border-gray-200 fixed top-0 right-0 left-0  z-50">
                <NavbarComponent />
              </header>
              <SidebarProvider>
                <AppSidebar />

                <main className="w-full bg-background ">{children}</main>
              </SidebarProvider>
              <footer><Footer /></footer>
              <Toaster />
            </Provider>
          </CommentProvider>
        </UserProvider>
      </body>
    </html>
  );
}
