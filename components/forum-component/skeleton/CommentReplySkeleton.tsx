import { Skeleton } from "@/components/ui/skeleton";

export const CommentReplySkeleton = () => {
  return (
    <div className="mt-5 space-y-4">
      <Skeleton className="h-20 w-full" />
      <Skeleton className="h-20 w-full" />
    </div>
  );
};