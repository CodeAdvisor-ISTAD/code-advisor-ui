import { Card, CardHeader } from "@/components/ui/card";
import { Profile } from "../Profile";
// import { Author, Content } from "@/types/engagement";
// import { Author, Content } from "@/types/engagement";
import { Badge } from "@/components/ui/badge";
import { FaHeart, FaFire, FaThumbsUp } from "react-icons/fa";
import Preview from "@/components/text-editor/preview";
import { Content } from "@/types/engagement";
import { Skeleton } from "@/components/ui/skeleton";
import UserProfile from "@/components/pages/UserProfile";

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
  thumbnail: thumbnail,
  title: title,
  tags: tags,
  description: description,
  authorUuid: authorUuid,
  reactions: communityEngagement,
  createdAt: createdAt,
  username: username,
  profileImage: profileImage,
  isLoading,
}: Content & { isLoading?: boolean }) {
  return (
    <div className="no-scrollbar overflow-x-hidden">
      <Card className="md:ml-[100px] rounded-[5px] shadow-none no-scrollbar">
        {/* Thumbnail Skeleton */}
        {isLoading ? (
          <Skeleton className="rounded-t-[5px] h-80 md:w-[930px] w-[390px]" />
        ) : (
          <img
            src={
              thumbnail ||
              "https://i.pinimg.com/736x/d0/e0/0d/d0e00dcece8115773e285495ef2e6949.jpg"
            }
            alt={title}
            className="w-full h-80 object-cover rounded-t-[5px]"
          />
        )}
        <div className="mx-20 md:mx-10 sm:mx-2 xs:mx-0">
          <CardHeader>
            <h1 className="text-4xl font-bold py-2 md:text-3xl sm:text-2xl xs:text-xl">
              {isLoading ? (
                <div>
                  <Skeleton className="h-4 md:w-[800px] w-[350px] mb-4 rounded-lg" />
                  <Skeleton className="h-4 md:w-[400px] w-[350px] rounded-lg" />
                </div>
              ) : (
                title ||
                "Memory Optimization Techniques You Must Know for Spring Boot Applications"
              )}
            </h1>
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

            {isLoading ? (
              <div className="max-w-[300px] w-full flex items-center gap-3">
                <div>
                  <Skeleton className="flex rounded-full w-12 h-12 " />
                </div>
                <div className="w-full flex flex-col gap-2">
                  <Skeleton className="h-3 md:w-3/5 w-2/5 rounded-lg" />
                  <Skeleton className="h-3 md:w-4/5 w-1/5 rounded-lg" />
                </div>
              </div>
            ) : (
              <Profile
                imageUrl={
                  profileImage ||
                  "https://i.pinimg.com/736x/0f/78/5d/0f785d55cea2a407ac8c1d0c6ef19292.jpg"
                }
                username={username || "Annoymous"}
                postDate={formatDate(createdAt) || "Jan 31 2025"}
              />
            )}
            
            <div className="flex gap-4 pt-4">
              <div className="flex gap-2">
                <FaHeart className="text-2xl text-pink-700" />
                <span>{communityEngagement?.loveCount || "0"}</span>
              </div>
              <div className="flex gap-2">
                <FaFire className="text-2xl text-red-500" />
                <span>{communityEngagement?.fireCount || "0"}</span>
              </div>
              <div className="flex gap-2">
                <FaThumbsUp className="text-2xl text-blue-500" />
                <span>{communityEngagement?.likeCount || "0"}</span>
              </div>
            </div>
            <div className="pt-4">
              <div className="space-y-4">
                <Preview content={description as string} />
              </div>
            </div>
          </CardHeader>
        </div>
      </Card>
    </div>
  );
}