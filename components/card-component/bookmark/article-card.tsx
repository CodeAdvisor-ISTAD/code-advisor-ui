import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Bookmark } from 'lucide-react'
import Image from "next/image"


interface ArticleCardProps {
  id: string;
  title: string;
  description: string;
  tags: string[];
  tags1: string;
  image: string;
  created_date: string;
  onToggleBookmark: () => void
}

export function ArticleCard({
  title,
  description,
  tags,
  tags1,
  image,
  created_date,
  id,
  onToggleBookmark
}: ArticleCardProps) {
  return (
    <Card className="h-full relative rounded-sm border-gray-100 ">
      <CardContent className="p-6 space-y-4">
        <div className="aspect-video relative overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
          />
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-medium tracking-tight text-primary line-clamp-2">{title}</h3>
          <p className="text-slate-500 text-sm line-clamp-2">{description}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge key={tag} variant="outline" className="border-secondary text-primary text-xs rounded-[5px] font-medium  hover:bg-primary hover:text-white">
              {tag}
            </Badge>
          ))}
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="absolute bottom-4 right-2 text-yellow-500 hover:text-yellow-600 bg-white/80 hover:bg-white z-10"
          onClick={onToggleBookmark}
        >
          <Bookmark className="h-5 w-5" fill={Bookmark ? "currentColor" : "none"} />
        </Button>
      </CardContent>
    </Card>
  )
}

