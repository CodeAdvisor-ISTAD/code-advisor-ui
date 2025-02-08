import ISTADCard from "@/components/card-component/card-trending/Card-Istad";
import TrendingComponent from "@/components/card-component/card-trending/TrendingComponent";
import ForumDetailComponent from "@/components/forum-component/forumDetailComponent";
import React, { useEffect, useState } from "react";
import Preview from "@/components/text-editor/preview";
import { usePathname, useParams } from "next/navigation";
import HomeLayout from "@/components/layout/HomeLayout";


export type ParamProps = {
  params: Promise<{ slug: any }>;
};

// If you're fetching data, make this async
export default async function Page({ params }: ParamProps) {
  // const { slug: forumSlug } = useParams();
  const { slug } = await params;

    return (
        <HomeLayout>
          <ForumDetailComponent slug={slug as string} />
        </HomeLayout>
    );
}
