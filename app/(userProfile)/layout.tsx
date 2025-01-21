import "../globals.css";
import { Toaster } from "react-hot-toast";
import { CommentProvider } from "@/lib/context/commentContext";
import { UserProvider, useUser } from "@/lib/context/userContext";
import { Provider } from "@radix-ui/react-toast";
import { koh_Santepheap, roboto } from "../fonts/fonts";
import Footer from "@/components/footer/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={`${roboto.variable} ${koh_Santepheap.variable} min-h-screen`}
    >
      <UserProvider>
        <CommentProvider>
          <Provider>
            <header className="bg-white border border-gray-200 fixed top-0 right-0 left-0  z-50">
              {/* <NavbarComponent /> */}
            </header>

            <main className="w-full bg-background ">{children}</main>
            {/* <footer><Footer /></footer> */}
            <Toaster />
          </Provider>
        </CommentProvider>
      </UserProvider>
    </div>
  );
}
