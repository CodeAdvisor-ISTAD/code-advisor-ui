import { Skeleton } from "@/components/ui/skeleton";

export const TagsSkeleton = () => {
  return (
    <div className="flex gap-2">
      {Array.from({ length: 3 }).map((_, index) => (
        <Skeleton key={index} className="h-8 w-[60px] rounded-[5px]" />
      ))}
    </div>
  );
};