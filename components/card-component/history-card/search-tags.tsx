import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { SearchTag } from "@/lib/reading"

interface SearchTagsProps {
  tags: SearchTag[]
  selectedTags: string[]
  onTagClick: (tagId: string) => void
}

export function SearchTags({ tags, selectedTags, onTagClick }: SearchTagsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <button
          key={tag.id}
          onClick={() => onTagClick(tag.id)}
          className="focus:outline-none"
        >
          <Badge
            variant="outline"
            className={cn(
              "cursor-pointer hover:bg-gray-300",
              selectedTags.includes(tag.id) && "bg-gray text-gray-foreground hover:bg-gray-300"
            )}
          >
            {tag.label}
          </Badge>
        </button>
      ))}
    </div>
  )
}

