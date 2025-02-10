import { Skeleton } from "@/components/ui/skeleton";

export const FooterSkeleton = () => {
  return (
    <div className="flex justify-between items-center mt-6">
      <div className="flex items-center gap-2">
        <Skeleton className="w-6 h-6 rounded-full" />
        <Skeleton className="w-6 h-6 rounded-full" />
      </div>
      <div className="flex gap-4">
        <Skeleton className="w-6 h-6 rounded-full" />
        <Skeleton className="w-6 h-6 rounded-full" />
        <Skeleton className="w-6 h-6 rounded-full" />
      </div>
    </div>
  );
};