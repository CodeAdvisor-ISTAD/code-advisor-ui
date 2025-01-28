import { Card, CardHeader } from "@/components/ui/card";
import { Profile } from "../Profile";
import { Badge } from "@/components/ui/badge";
import { FaHeart, FaFire, FaThumbsUp } from "react-icons/fa";
import Preview from "@/components/text-editor/preview";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useRouter } from "next/router";
import { createHistory } from "@/hooks/api-hook/user/history";

// Define the ContentDetails interface
interface ContentDetails {
  thumbnail: string;
  title: string;
  tags?: string[];
  content: string;
  authorUuid: string;
  communityEngagement: {
    loveCount: number;
    fireCount: number;
    likeCount: number;
  };
  createdAt: string;
  slug: string; // Add slug for navigation
}

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };
  return new Date(dateString)
    .toLocaleDateString(undefined, options)
    .replace(",", "");
};

export function ContentSection({
  thumbnail,
  title,
  tags,
  content,
  authorUuid,
  communityEngagement,
  createdAt,
  slug, // Destructure slug from props
}: ContentDetails) {
  const formattedDate = formatDate(createdAt);
  const [clicked, setClicked] = useState(false); // State to track clicks
  const router = useRouter(); // Initialize the router

  // Define the mutation for creating history
  // const { mutate: submitHistory } = useMutation({
  //   mutationKey: ["history"],
  //   mutationFn: (data: { forumSlug: string }) => createHistory(data.forumSlug), // Replace with your actual API call
  //   onSuccess: () => {
  //     console.log("History submitted successfully");
  //   },
  //   onError: (error) => {
  //     console.error("Error submitting history:", error);
  //   },
  // });

  // // Submit history for forum
  // const handleNavigate = (slug: string) => {
  //   if (!clicked) {
  //     setClicked(true); // Set clicked to true to prevent multiple clicks

  //     // Navigate to the forum page immediately
  //     router.push(`/forum/${slug}`);

  //     // Submit history after 5 seconds
  //     setTimeout(() => {
  //       console.log("Submitting history for:", slug);

  //       const data = {
  //         forumSlug: slug,
  //       };

  //       submitHistory(data);
  //     }, 5000); // Delay of 5 seconds
  //   }
  // };

  return (
    <div className="no-scrollbar overflow-x-hidden">
      <Card className="ml-[100px] rounded-[5px] shadow-none no-scrollbar w-full">
        <img
          src={thumbnail}
          alt={title} // Add alt text for accessibility
          className="w-full h-80 object-cover rounded-t-[5px]"
        />
        <div className="mx-20">
          <CardHeader>
            <h1 className="text-4xl font-bold py-2">{title}</h1>
            <div className="flex flex-wrap gap-2 pb-2">
              {tags?.map((tag, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="border-secondary text-primary text-xs rounded-[5px] font-medium"
                >
                  #{tag}
                </Badge>
              ))}
            </div>
            <div className="flex gap-4">
              <div className="flex gap-2">
                <FaHeart className="text-2xl text-pink-700" />
                <span>{communityEngagement?.loveCount}</span>
              </div>
              <div className="flex gap-2">
                <FaFire className="text-2xl text-red-500" />
                <span>{communityEngagement?.fireCount}</span>
              </div>
              <div className="flex gap-2">
                <FaThumbsUp className="text-2xl text-blue-500" />
                <span>{communityEngagement?.likeCount}</span>
              </div>
            </div>

            <div className="pt-4">
              <Profile
                imageUrl={authorUuid}
                username={authorUuid}
                postDate={formattedDate}
              />
            </div>
          </CardHeader>
          <div className="p-6 pt-0">
            <Preview content={content} />
          </div>
        </div>
      </Card>
    </div>
  );
}