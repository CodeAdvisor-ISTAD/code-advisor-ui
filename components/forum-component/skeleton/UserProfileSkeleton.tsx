import { Skeleton } from "@/components/ui/skeleton";

export const UserProfileSkeleton = () => {
  return (
    <div className="flex items-center gap-3">
      <Skeleton className="w-10 h-10 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[100px]" />
        <Skeleton className="h-3 w-[80px]" />
      </div>
    </div>
  );
};