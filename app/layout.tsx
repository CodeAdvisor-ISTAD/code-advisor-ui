 'use client'
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
import HighlightInitializer from "@/components/text-editor/HighlightInitializer";
import { SearchProvider } from "@/lib/context/SearchContext";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  // Implement the search handler function
  const handleSearch = (query: string) => {
    console.log("Search query:", query);
    // Add logic to handle search, such as updating state or navigating
  };

  return (
    <html lang="en">
      <body
        className={`${roboto.variable} ${koh_Santepheap.variable} min-h-screen`}
      >
        <HighlightInitializer />
        <SearchProvider>
        <UserProvider>
          <CommentProvider>
            <Provider>
              {/* Pass the search handler function to NavbarComponent */}
              <NavbarComponent onSearch={handleSearch} />
            
              <SidebarProvider>
                <AppSidebar />
                <main className="w-full bg-background  ">{children}</main>
              </SidebarProvider>
              <footer  className="relative z-10">
                <Footer />
              </footer>
              <Toaster />
            </Provider>
          </CommentProvider>
        </UserProvider>
        </SearchProvider>
      </body>
    </html>
  );
}
