import { SidebarProvider } from "@/components/ui/sidebarContent";
import { koh_Santepheap, roboto } from "../fonts/fonts";
import '../globals.css';
import NavbarComponent from "@/components/navbar/NavbarComponent";

export default function ContentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
        className={`${roboto.variable} ${koh_Santepheap.variable} h-full relative`}
      >
        <header className="bg-white fixed top-0 right-0 left-0 z-50">
          <NavbarComponent />
        </header>

        <SidebarProvider>
          <main className="bg-gray-100 w-full ">{children}</main>
        </SidebarProvider>
      </div>
  );
}
