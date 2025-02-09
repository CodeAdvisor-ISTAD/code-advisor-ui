import React from "react";
import NavbarComponent from "../navbar/NavbarComponent";
import Footer from "../footer/Footer";
import Provider from "@/app/_provider";

function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full">
      <Provider>
      <NavbarComponent />
      {children}
      <Footer />
      </Provider>
    </div>
  );
}

export default Layout;
