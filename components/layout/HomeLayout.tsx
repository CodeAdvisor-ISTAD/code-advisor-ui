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
}: Readonly<{
  children: React.ReactNode;
}>) {

  const latest = [
    "Advanced CSS techniques for modern web design",
    "Learn Tailwind CSS for responsive layouts",
    "Master React state management with Redux",
];
  return (
    <div className="w-full">
      <NavbarComponent />
      <div className="flex px-[100px] gap-3">
        <div>
        <AppSidebar />
        </div>
        <div className="w-full">{children}</div>
        <div className="flex flex-col gap-2">
          <TrendingComponent type="Latest" item={latest} />
          <ISTADCard />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default HomeLayout;
