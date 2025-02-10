import { Skeleton } from "@/components/ui/skeleton";

export const RichTextEditorSkeleton = () => {
  return (
    <div className="mt-5 flex flex-col gap-2">
      <Skeleton className="h-6 w-[150px]" />
      <Skeleton className="h-4 w-[100px]" />
      <Skeleton className="h-40 w-full" />
      <Skeleton className="h-10 w-[120px] self-end" />
    </div>
  );
};