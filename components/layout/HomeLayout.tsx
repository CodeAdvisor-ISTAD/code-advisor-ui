import React from "react";
import NavbarComponent from "../navbar/NavbarComponent";
import App from "next/app";
import { AppSidebar } from "../sidebar/app-sidebar";
import Recommendations from "../card-component/card-trending/TrendingComponent";
import ISTADCard from "../card-component/card-trending/Card-Istad";
import Footer from "../footer/Footer";
import TrendingComponent from "@/components/card-component/card-trending/TrendingComponent";

function HomeLayout({
  children,
  showTrending = true, // default to true, so it's shown by default
}: Readonly<{
  children: React.ReactNode;
  showTrending?: boolean; // optional prop to toggle trending visibility
}>) {
  const latest = [
    "Advanced CSS techniques for modern web design",
    "Learn Tailwind CSS for responsive layouts",
    "Master React state management with Redux",
  ];

  return (
    <div className="w-full">
      <NavbarComponent />
      <div className="flex xl:px-[100px] lg:px-[25px] md:px-[20px] xl:gap-3">
        <div>
          <AppSidebar />
        </div>
        <div className="w-full">{children}</div>
        <div className="xl:flex xl:flex-col xl:gap-2 lg:hidden md:hidden hidden">
          {showTrending && <TrendingComponent type="Latest" item={latest} />}
          {showTrending && <ISTADCard />}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default HomeLayout;
