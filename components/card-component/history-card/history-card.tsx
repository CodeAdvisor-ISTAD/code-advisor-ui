import { Card, CardContent } from "@/components/ui/card"
import { HistoryActions } from "./history-action"
import Image from "next/image"

interface HistoryCardProps {
  title: string
  thumbnail: string
  readTime: string
  upvotes: string
  onBookmark?: () => void
  onRemove?: () => void
  onShare?: () => void
}

export function HistoryCard({
  title,
  thumbnail,
  readTime,
  upvotes,
  onBookmark,
  onRemove,
  onShare
}: HistoryCardProps) {
  return (
    <Card className="rounded-sm border-none">
      <CardContent className="p-6">
        <div className="flex gap-4">
          <Image
            src={thumbnail}
            alt=""
            width={120}
            height={80}
            className="object-cover"
          />
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <h3 className="font-normal">{title}</h3>
              <HistoryActions
                onBookmark={onBookmark}
                onRemove={onRemove}
                onShare={onShare}
              />
            </div>
            <p className="text-sm text-muted-foreground">
              {readTime} · {upvotes}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

