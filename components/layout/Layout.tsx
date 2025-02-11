import React from "react";
import Footer from "../footer/Footer";
import NavbarComponent from "@/components/navbar/NavbarComponent";

function Layout({
                    children,
                }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="w-full">
            {/* Navbar should be on top */}
            {/* Main content */}
            <div className="relative z-50">
                <NavbarComponent></NavbarComponent>
            </div>

            <main>{children}</main>

            {/* Footer, properly positioned */}
            <footer className="relative z-10">
                <Footer />

            </footer>

        </div>
    );
}

export default Layout;
