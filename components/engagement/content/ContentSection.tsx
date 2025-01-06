import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Profile } from "../Profile";
// import { Author, Content } from "@/types/engagement";
import { Badge } from "@/components/ui/badge";
import { FaHeart, FaFire, FaThumbsUp } from "react-icons/fa";
import Preview from "@/components/text-editor/preview";

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
  content: content,
  authorUuid: authorUuid,
  communityEngagement: communityEngagement,
  createdAt: createdAt,
}: ContentDetails) {
  const formattedDate = formatDate(createdAt);

  return (
    <div className="no-scrollbar overflow-x-hidden">
      <Card className="ml-[100px] rounded-[5px] shadow-none no-scrollbar w-[100%%]">
        <img
          src={thumbnail}
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
                // postDate="23 Jan 21"
                postDate={formattedDate}
              />
            </div>
          </CardHeader>
          <div className="p-6 pt-0">
            <Preview content={content} />
          </div>
          {/* 
          <CardContent>{
            
            content}</CardContent> */}
        </div>
      </Card>
    </div>
  );
}
