import { roboto, koh_Santepheap } from "@/app/fonts/fonts";
import NavbarLogin from "@/components/navbar/NavbarLogin";
import Footer from "@/components/footer/Footer";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import Error from "@/app/error";

export default function AboutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <ErrorBoundary errorComponent={Error}>
        <main className= {`${roboto.variable} ${koh_Santepheap.variable} h-full relative` }>
          {children}
        </main>
      </ErrorBoundary>
    </>
  );
}
