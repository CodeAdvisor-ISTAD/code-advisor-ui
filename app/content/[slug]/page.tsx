"use client";

import { CommentSection } from "@/components/engagement/comment/CommentSection";
import { ContentSection } from "@/components/engagement/content/ContentSection";
import { ContentSidebar } from "@/components/engagement/content/ContentSidebar";
import PrismLoader from "@/components/text-editor/prismLoader";
import { getContent } from "@/hooks/api-hook/content/content-api";
import { getComment } from "@/hooks/api-hook/engagement/engagement-api";
import { useQuery } from "@tanstack/react-query";
import { use } from "react";

export default function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params); // Unwrap the params Promise
  const slug = resolvedParams.slug;

  console.log("Slug here: ", slug);

  const contentId = "679f042faf0fca733f2edaf2"; // Example contentId, dynamically set as needed
  const userId = "6783b16f1b533f163cd7460d"; // Example userId, dynamically set as needed
  const ownerId = "author-67890";

  // Fetch content details using React Query
  const { data, isError, isLoading } = useQuery({
    queryKey: ["contentDetails", slug],
    queryFn: () => getContent(slug),
    enabled: !!slug, // Ensure query only runs when slug exists
  });

  console.log("Content's title: ", data?.title);

  console.log("Here is the content fetch from content service: ", data);
  console.log("Here is the slug: ", slug);

  // Fetch comments by contentId
  const {
    data: comments,
    isLoading: isCommentsLoading,
    isError: isCommentsError,
  } = useQuery({
    queryKey: ["comments", contentId], // Use unique key for comments
    queryFn: () => getComment(contentId), // Call the imported function
  });

  console.log("Comment list: ", comments);

  return (
    <main className="flex mx-auto mt-[80px] pb-4 bg-gray-100 w-full">
      <div className="w-full fixed bottom-0 md:bottom-auto flex items-center justify-center md:items-start md:justify-start px-[10px] md:px-[100px]">
        <ContentSidebar
          comment={comments}
          bookmark={0}
          contentId={contentId}
          userId={userId}
          ownerId={data?.ownerId}
          slug={slug}
        />
      </div>
      <div className="px-[10px] md:pl-[100px]">
        <ContentSection
          thumbnail={data?.thumbnail}
          username={data?.username}
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
          isLoading={isLoading}
        />
      </div>
      <CommentSection
        comment={comments}
        contentId={contentId}
        ownerId={ownerId}
        slug={slug}
        userId={userId}
        isLoading={isLoading}
      />

      <PrismLoader />
    </main>
  );
}
