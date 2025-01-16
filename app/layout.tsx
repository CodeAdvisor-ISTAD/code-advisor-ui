'use client'
import localFont from "next/font/local";
import "./globals.css";
import NavbarComponent from "@/components/navbar/NavbarComponent"; // Import the NavbarComponent
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
  // Mock function for onSearch (replace with your actual search logic)
  // const handleSearch = (query: string) => {
  //   console.log("Search query:", query);
  // };

  return (
    <html lang="en">
      <body
        className={`${roboto.variable} ${koh_Santepheap.variable} min-h-screen`}
      >
        <UserProvider>
          <CommentProvider>
            <Provider>
              {/* Add NavbarComponent here */}
              {/* <NavbarComponent onSearch={handleSearch} /> */}

              <SidebarProvider>
                <AppSidebar />
                <main className="w-full bg-background pt-[72px]">{children}</main>
              </SidebarProvider>
              <footer>
                <Footer />
              </footer>
              <Toaster />
            </Provider>
          </CommentProvider>
        </UserProvider>
      </body>
    </html>
  );
}