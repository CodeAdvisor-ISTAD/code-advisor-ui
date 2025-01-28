"use client";
import { CommentSection } from "@/components/engagement/comment/CommentSection";
import { ContentSection } from "@/components/engagement/content/ContentSection";
import { ContentSidebar } from "@/components/engagement/content/ContentSidebar";
import PrismLoader from "@/components/text-editor/prismLoader";
import { getContent } from "@/hooks/api-hook/content/content-api";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export type ParamProps = {
  params: Promise<{ slug: any }>;
};

export default async function Page({ params }: ParamProps) {
  const { slug } = await params;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["contentDetails", slug],
    queryFn: () => getContent(slug),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Something went wrong while fetching content.</div>;
  }

  // Derive contentCardData from the fetched data
  const contentCardData = {
    slug: data?.slug, // Ensure this matches the structure of your data
    thumbnail: data?.thumbnail,
    title: data?.title,
    tags: data?.tags,
    authorUuid: data?.authorUuid,
    communityEngagement: data?.communityEngagement,
    content: data?.content,
    createdAt: data?.createdDate,
  };

  console.log(contentCardData);

  return (
    <main className="flex mx-auto mt-[80px] pb-4 bg-gray-100 w-full px-[100px]">
      <div className="w-full fixed">
        <ContentSidebar
          contentId={slug}
          bookmark={data?.bookmark ?? 0}
          comment={data?.comment}
          reactions={data?.communityEngagement}
        />
      </div>
      <ContentSection
        thumbnail={contentCardData.thumbnail}
        title={contentCardData.title}
        tags={contentCardData.tags}
        authorUuid={contentCardData.authorUuid}
        communityEngagement={contentCardData.communityEngagement}
        content={contentCardData.content}
        createdAt={contentCardData.createdAt}
        slug={contentCardData.slug} // Pass the slug from contentCardData
      />
      <CommentSection
        id={Array.isArray(slug) ? slug[0] : slug}
        comment={data?.comment}
      />
      <PrismLoader />
    </main>
  );
}