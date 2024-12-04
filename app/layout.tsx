import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import NavbarComponent from "@/components/navbar/NavbarComponent";
import Footer from "@/components/footer/Footer";
import {roboto, koh_Santepheap} from "./fonts/fonts"


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} ${koh_Santepheap.variable}`}>
        <header className="bg-white">
          <NavbarComponent />
        </header>

        <main className="flex-grow">
          {children}
        </main>

        <footer className="h-screen">
          <Footer />
        </footer>
      </body>
    </html>
  );
}
