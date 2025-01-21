import "../globals.css";
import { Toaster } from "react-hot-toast";
import { UserProvider } from "@/lib/context/userContext";
import { Provider } from "@radix-ui/react-toast";
import { koh_Santepheap, roboto } from "../fonts/fonts";

export default function UserProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`${roboto.variable} ${koh_Santepheap.variable} min-h-screen`}>
      <UserProvider>
        <Provider>
          <header className="bg-white border border-gray-200 fixed top-0 right-0 left-0 z-50">
            {/* <UserProfileNavbar /> */}
          </header>
          <main className="w-full bg-background pt-16">{children}</main>
          <footer>
            {/* <Footer /> */}
          </footer>
          <Toaster />
        </Provider>
      </UserProvider>
    </div>
  );
}