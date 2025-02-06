import { Skeleton } from "@/components/ui/skeleton";

export const ContentSkeleton = () => {
  return (
    <div className="space-y-4">
      <Skeleton className="h-8 w-[200px]" />
      <Skeleton className="h-6 w-[150px]" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-20 w-full" />
      <div className="rounded-md p-4 font-mono text-sm">
        <Skeleton className="h-6 w-[150px] mb-3" />
        <Skeleton className="h-20 w-full" />
      </div>
    </div>
  );
};