import React from "react";
import Footer from "../footer/Footer";
import NavbarComponent from "@/components/navbar/NavbarComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
  
    icons: {
      icon: "https://media.panda.engineer/api/v1/files/preview?fileName=Logo%20V1-02.png"
    },
    title: {
      template: "%s - CodeAdvisors",
      default: "CodeAdvisors",
    },
    description: "CodeAdvisors is an advanced platform designed to assist administrators in ISTAD with student information management, offering a seamless and efficient educational experience.",
    keywords: [
      "ISTAD",
      "student management",
      "educational technology",
      "admin tools",
      "CodeAdvisors",
      "student information system",
      "academic management",
      "digital education",
      "school management",
      "learning platform",
      "edtech",
      "student tracking",
      "teacher tools",
      "online education",
      "collaborative learning",
      "academic records",
      "virtual learning",
      "administration system"
    ],
    openGraph: {
      title: {
        template: "CodeAdvisors",
        default: "CodeAdvisors",
      },
      description: "CodeAdvisors is an advanced platform designed to assist administrators in ISTAD with student information management, offering a seamless and efficient educational experience.",
      images: [
        {
          url: "https://media.panda.engineer/api/v1/files/preview?fileName=Thumbnail.PNG",
          width: 1200,
          height: 630,
          alt: "CodeAdvisors Thumbnail",
        },
      ],
      emails: "codeadvisors.services@gmail.com",
      url: "https://code-advisors.istad.co",
      siteName: "CodeAdvisors",
    },
  };


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
