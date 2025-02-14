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
import { ThemeProvider } from "@/components/theme-provider";
import { Metadata } from "next";

export const metadata: Metadata = {
  icons: {
    icon: "https://media.panda.engineer/api/v1/files/preview?fileName=Logo%20V1-02.png",
  },
  title: {
    template: "CodeAdvisors",
    default: "CodeAdvisors",
  },
  description:
    "CodeAdvisors is an advanced platform designed to assist administrators in ISTAD with student information management, offering a seamless and efficient educational experience.",
  keywords: [
    "ISTAD",
    "student management",
    "educational technology",
    "admin tools",
    "CodeAdvisors",
    "student information system",
    "academic management",
    "digital education",
    "school management",
    "learning platform",
    "edtech",
    "student tracking",
    "teacher tools",
    "online education",
    "collaborative learning",
    "academic records",
    "virtual learning",
    "administration system",
  ],
  openGraph: {
    title: {
      template: "CodeAdvisors",
      default: "CodeAdvisors",
    },
    description:
      "CodeAdvisors is an advanced platform designed to assist administrators in ISTAD with student information management, offering a seamless and efficient educational experience.",
    images: [
      {
        url: "https://media.panda.engineer/api/v1/files/preview?fileName=Thumbnail.PNG",
        width: 1200,
        height: 630,
        alt: "CodeAdvisors Thumbnail",
      },
    ],
    emails: "",
    url: "https://code-advisors.istad.co",
    siteName: "CodeAdvisors",
  },
};

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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${roboto.variable} ${koh_Santepheap.variable} dark:bg-darkSecondary`}
      >
        <HighlightInitializer />
        <UserProvider>
          <CommentProvider>
            <ThemeProvider
              attribute="class"
              // defaultTheme="system"
              enableSystem={false}
              disableTransitionOnChange
            >
              <Provider>
                {/* Pass the search handler function to NavbarComponent */}

                {/* <header className="bg-white dark:bg-darkPrimary border border-gray-200 border-none fixed top-0 right-0 left-0  z-50">
              <NavbarComponent onSearch={handleSearch} />
              </header> */}
                <SidebarProvider>
                  {/* <AppSidebar /> */}
                  <main className="w-full">{children}</main>
                </SidebarProvider>
                <Toaster />
              </Provider>
            </ThemeProvider>
          </CommentProvider>
        </UserProvider>
      </body>
    </html>
  );
}
