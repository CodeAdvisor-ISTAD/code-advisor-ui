import { CommentSection } from "@/components/engagement/comment/CommentSection";
import { ContentSidebar } from "@/components/engagement/content/ContentSidebar";
import NavbarComponent from "@/components/navbar/NavbarComponent";
import { SidebarProvider } from "@/components/ui/sidebarContent";
import { ReactNode } from "react";

export default function ContentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="">
        <header className="bg-white fixed top-0 right-0 left-0">
          <NavbarComponent />
        </header>

        <SidebarProvider>
          <main className="bg-gray-100 w-full pl-[100px]">{children}</main>
        </SidebarProvider>
      </body>
    </html>
  );
}
