/* eslint-disable @typescript-eslint/no-unused-vars */

import Footer from "@/components/footer/Footer";
import { roboto, koh_Santepheap } from "../fonts/fonts";
import NavbarLogin from "@/components/navbar/NavbarLogin";

export default function AboutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.variable} ${koh_Santepheap.variable}`}
      >
        <header className="bg-white border border-gray-200 fixed top-0 right-0 left-0  z-50">
          <NavbarLogin />
        </header>
        <main className=" w-full px-[100px]  pt-[80px]">
          {children}
        </main>
      </body>
    </html>
  );
}
