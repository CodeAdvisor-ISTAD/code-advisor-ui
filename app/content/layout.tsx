import { SidebarProvider } from "@/components/ui/sidebarContent";
import { koh_Santepheap, roboto } from "../fonts/fonts";
import '../globals.css';
import NavbarComponent from "@/components/navbar/NavbarComponent";
import toast, { Toaster } from 'react-hot-toast';

export default function ContentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
        className={`${roboto.variable} ${koh_Santepheap.variable} h-full relative`}
      >
        <SidebarProvider>
          <main className="bg-gray-100 w-full ">{children}</main>
        </SidebarProvider>
        <Toaster />
      </div>
  );
}
