import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import {
  MoreVertical,
  Badge,
  MessageSquare,
  ArrowUp,
  BookmarkIcon,
  ShareIcon,
  TrashIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import {
  PopoverBody,
  PopoverButton,
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
} from "@/components/ui/pop-over";
import router from "next/router";

interface HistoryCardProps {}

interface HistoryCardProps {
  createdAt: string;
  title: string;
  content: string;
  tags: string;
  // views: number;
  // comments: number;
  upvotes: number;
  slug: string;
  onBookmark?: () => void;
  onRemove?: () => void;
  onShare?: () => void;
}

export function ForumHistoryCard({
  createdAt,
  title,
  content,
  slug,
  // views,
  // comments,
  upvotes,
  onBookmark,
  onRemove,
  onShare,
}: HistoryCardProps) {
  const actions = [
    // {
    //   label: "Bookmark",
    //   icon: <BookmarkIcon />,
    //   action: onBookmark,
    // },
    {
      label: "Remove",
      icon: <TrashIcon />,
      action: onRemove,
    },
    {
      label: "Share",
      icon: <ShareIcon />,
      action: onShare,
    },
  ];

  return (
    // <a href={`/forum/${slug}`} >
    <div>
      <div className=" bg-white rounded-[5px] w-full p-4 ring-1 ring-gray-200">
        {/* Content Section */}
        <div className="mb-4">
          <div className="flex justify-between">
            <h2 className="text-2xl font-medium tracking-normal text-primary line-clamp-2">
              {slug}
            </h2>
            <div className=" flex justify-end text-gray-500 hover:text-gray-700">
              <PopoverRoot>
                <PopoverTrigger className="border-none ">
                  <MoreVertical className="w-5 h-5 " />
                </PopoverTrigger>
                <PopoverContent className="w-48 h-auto">
                  <PopoverBody>
                    {actions.map((action, index) => (
                      <PopoverButton key={index} onClick={action.action}>
                        {action.icon}
                        <span>{action.label}</span>
                      </PopoverButton>
                    ))}
                  </PopoverBody>
                </PopoverContent>
              </PopoverRoot>
            </div>
          </div>
          {/* <p className="text-gray-700 mb-4">{content}</p> */}
        </div>

        {/* <div className="max-h-20 overflow-y-auto ">
          <div className="flex flex-wrap gap-2">
            <Badge
            className="border-secondary text-primary text-xs rounded-[5px] font-medium  hover:bg-primary hover:text-white "
            >
            #{tags}
            </Badge>
            
          </div>
          </div> */}

        {/* Tags Section */}
        <div className="flex flex-wrap gap-2 mb-4 justify-between">
          <div className="pt-4 text-sm text-gray-500">
            {new Date(createdAt)
              .toLocaleDateString("en-GB", {
                year: "numeric",
                month: "short",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })
              .replace(",", " :")
              .replace(/\b(am|pm)\b/g, (match) => match.toUpperCase())}
          </div>
          {/* Metrics Section */}
        </div>
      </div>
    </div>
    // </a>
  );
}
