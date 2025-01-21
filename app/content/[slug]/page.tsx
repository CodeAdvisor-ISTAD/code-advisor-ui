"use client";

import ErrorComponent from "@/app/error";
import { CommentSection } from "@/components/engagement/comment/CommentSection";
import { ContentSection } from "@/components/engagement/content/ContentSection";
import { ContentSidebar } from "@/components/engagement/content/ContentSidebar";
import PrismLoader from "@/components/text-editor/prismLoader";
import { getContent } from "@/hooks/api-hook/content/content-api";
import { getComment } from "@/hooks/api-hook/engagement/engagement-api";
import { getCommentsByContentId } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";

export default function Page({ params }: { params: { slug: string } }) {
  const [slug, setSlug] = useState<string | null>(null);

  const contentId = "678378aecde7c858c76a0290"; // Example contentId, dynamically set as needed
  const userId = "6783b16f1b533f163cd7460d"; // Example userId, dynamically set as needed
  const ownerId = "b3ee9ec3-be2f-401d-89fc-6f3956efcfc4";
  // const slug = "spring-boot-jpa"

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
    queryKey: ["comments", contentId], // Use unique key for comments
    queryFn: () => getComment(contentId), // Call the imported function
  });

  return (
    <main className="flex mx-auto mt-[80px] pb-4 bg-gray-100 w-full px-[100px]">
      <div className="w-full fixed">
        <ContentSidebar
          comment={comments} // Replace with your comments data
          bookmark={42} // Replace with your bookmark count
          contentId={contentId} // Pass the contentId
          userId={userId}
          ownerId={ownerId}
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
      {isCommentsLoading ? (
        <p>Loading comments...</p>
      ) : (
        <CommentSection comment={comments} contentId={contentId} ownerId={ownerId} slug={slug} userId={userId} />
      )}
      <PrismLoader />
    </main>
  );
}
