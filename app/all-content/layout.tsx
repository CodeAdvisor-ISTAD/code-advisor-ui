import { SidebarProvider } from "@/components/ui/sidebarContent";
import { koh_Santepheap, roboto } from "../fonts/fonts";
import '../globals.css';
import NavbarComponent from "@/components/navbar/NavbarComponent";
import toast, { Toaster } from 'react-hot-toast';
import Footer from "@/components/footer/Footer";
import {NavbarLogin} from "@/components/navbar/NavbarLogin";

export default function ContentLayout({
                                          children,
                                      }: {
    children: React.ReactNode;
}) {
    return (
        <div
            className={`${roboto.variable} ${koh_Santepheap.variable} h-full relative`}
        >
            <NavbarComponent/>
                <main className=" w-full dark:bg-darkPrimary -mt-[80px]">{children}</main>
            <Toaster />
            <Footer/>
        </div>
    );
}