"use client";

import ErrorComponent from "@/app/error";
import { CommentSection } from "@/components/engagement/comment/CommentSection";
import { ContentSection } from "@/components/engagement/content/ContentSection";
import { ContentSidebar } from "@/components/engagement/content/ContentSidebar";
import PrismLoader from "@/components/text-editor/prismLoader";
import { getContent } from "@/hooks/api-hook/content/content-api";
import { getComment } from "@/hooks/api-hook/engagement/engagement-api";
import { useQuery } from "@tanstack/react-query";
import { use } from "react";
import { SidebarProvider } from "@/components/ui/sidebarContent";
import Layout from "@/components/layout/Layout";

export default function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params); // Unwrap the params Promise
  const slug = resolvedParams.slug;

 

  // const contentId = "6795c8a465314844e79028dd"; // Example contentId, dynamically set as needed
  // const userId = "6783b16f1b533f163cd7460d"; // Example userId, dynamically set as needed
  // const ownerId = "424c64c0-efae-4798-8a50-7017f6c5533f";

  // Fetch content details using React Query
  const { data, isError } = useQuery({
    queryKey: ["contentDetails", slug],
    queryFn: () => getContent(slug),
    enabled: !!slug, // Ensure query only runs when slug exists
  });
  



  // Fetch comments by contentId
  const {
    data: comments,
    isLoading: isCommentsLoading,
    isError: isCommentsError,
  } = useQuery({
    queryKey: ["comments", data?.contentId], // Use unique key for comments
    queryFn: () => getComment(data?.contentId), // Call the imported function
  });

  return (
    <Layout>
      <SidebarProvider>
        <div className="flex mx-auto  pb-4 bg-gray-100 w-full px-[100px]">
          <div className="w-full fixed">
            <ContentSidebar
              comment={comments} // Replace with your comments data
              bookmark={0} // Replace with your bookmark count
              contentId={data?.contentId} // Pass the contentId
              userId={data?.userId}
              ownerId={data?.ownerId}
              slug={slug}
            />
          </div>
          <ContentSection
            thumbnail={data?.thumbnail}
            title={data?.title}
            tags={data?.tags}
            reactions={data?.communityEngagement}
            description={data?.content}
            createdAt={data?.createdDate}
            slug={data?.slug} // Ensure you pass the correct slug
            keywords={data?.keywords ?? ""} // Pass your actual keywords if needed
            isDraft={false}
            isArchived={false}
            isDeleted={false}
          />
          <CommentSection
            comment={comments}
            contentId={data?.contentId}
            ownerId={data?.ownerId}
            slug={slug}
            userId={data?.userId}
          />

          <PrismLoader />
        </div>
      </SidebarProvider>
    </Layout>
  );
}
