import { CommentSection } from "@/components/engagement/comment/CommentSection";
import { ContentSection } from "@/components/engagement/content/ContentSection";
import { ContentSidebar } from "@/components/engagement/content/ContentSidebar";
import { getContentById } from "@/lib/api";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["contentDetails", slug],
    queryFn: () => getContent(slug.toString()),
  });


  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Something went wrong while fetching content.</div>;
  }

  console.log(data.content);



  return (
    <main className="flex mx-auto mt-[80px] pb-4 bg-gray-100 w-full px-[100px]">
      <div className="w-full fixed">
        <ContentSidebar
          contentId={slug.toString()}
          bookmark={data?.bookmark ?? 0}
          comment={data?.comment}
          reactions={data?.communityEngagement}
        />
      </div>
      <ContentSection
        thumbnail={data?.thumbnail}
        title={data?.title}
        tags={data?.tags}
        authorUuid={data?.authorUuid}
        communityEngagement={data?.communityEngagement}
        content={data?.content}
        createdAt={data?.createdDate}
      />
      <CommentSection id={slug} comment={data?.comment} />
      <PrismLoader />
    </main>
  );
}
