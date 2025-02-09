'use client'
import localFont from "next/font/local";
import "./globals.css";
import NavbarComponent from "@/components/navbar/NavbarComponent";
import Footer from "@/components/footer/Footer";
import { roboto, koh_Santepheap } from "./fonts/fonts";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import Provider from "./_provider";
import { Toaster } from "react-hot-toast";
import { CommentProvider } from "@/lib/context/commentContext";
import { UserProvider } from "@/lib/context/userContext";
import HighlightInitializer from "@/components/text-editor/HighlightInitializer";
import { ThemeProvider } from "@/components/theme-provider"


export default function RootLayout({
                                     children,
                                   }: Readonly<{ children: React.ReactNode }>) {
  // Implement the search handler function
  const handleSearch = (query: string) => {
    console.log("Search query:", query);
    // Add logic to handle search, such as updating state or navigating
  };

  return (
    <html lang="en">
      <body
        className={`${roboto.variable} ${koh_Santepheap.variable} dark:bg-darkSecondary`}
      >
        <HighlightInitializer />
        <Provider>
        <UserProvider>
          <CommentProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >

              {/* Pass the search handler function to NavbarComponent */}
             
              {/* <header className="bg-white dark:bg-darkPrimary border border-gray-200 border-none fixed top-0 right-0 left-0  z-50">
              <NavbarComponent onSearch={handleSearch} />
              </header> */}
              <SidebarProvider >
                {/* <AppSidebar /> */}
                <main className="w-full">{children}</main>
              </SidebarProvider>
              <Toaster />

          </ThemeProvider>
            
          </CommentProvider>
        </UserProvider>
        </Provider>
      </body>
      </html>
  );
}
