import React from "react";
import NavbarComponent from "../navbar/NavbarComponent";
import Footer from "../footer/Footer";

function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full">
      <NavbarComponent />
      {children}
      <Footer />
    </div>
  );
}

export default Layout;
