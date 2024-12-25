import { CommentSection } from "@/components/engagement/comment/CommentSection";
import { ContentSection } from "@/components/engagement/content/ContentSection";
import { ContentSidebar } from "@/components/engagement/content/ContentSidebar";
import { getContentById } from "@/lib/api";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;

  const content = await getContentById(slug);

  return (
    <main className="flex mx-auto mt-[80px] pb-4 bg-gray-100 w-full px-[100px]">
      <div className="w-full fixed">
        <ContentSidebar
          contentId={slug}
          bookmark={content?.bookmark ?? 0}
          comment={content?.comment}
          reactions={content?.reactions}
        />
      </div>
      <ContentSection
          cover={content?.cover}
          title={content?.title}
          tags={content?.tags}
          author={content?.author}
          reactions={content?.reactions}
          description={
            <div className="space-y-4">
              <p>
                Web development is constantly evolving, with new technologies
                and frameworks emerging regularly. In this post, we'll explore
                some of the latest trends and what they mean for developers.{" "}
                {slug}
              </p>
              <h2 className="text-xl font-semibold">Key Trends</h2>
              <ul className="list-disc pl-6">
                <li>Serverless architectures</li>
                <li>JAMstack and static site generators</li>
                <li>Progressive Web Apps (PWAs)</li>
              </ul>
              <img
                src="https://i.pinimg.com/736x/75/b2/ba/75b2ba0cb7998890338fff3bfb3d1f3c.jpg"
                alt="Web Development Trends"
                className="w-[70%] h-auto rounded-[5px] mx-auto py-8"
              />
              <h2 className="text-xl font-semibold">Impact on Developers</h2>
              <ol className="list-decimal pl-6">
                <li>Increased focus on frontend skills</li>
                <li>Growing importance of API design</li>
                <li>Need for continuous learning and adaptation</li>
              </ol>
              <p>
                As these trends continue to shape the industry, developers must
                stay informed and adapt their skills accordingly.
              </p>
              <img
                src="https://i.pinimg.com/736x/7e/e8/c8/7ee8c8e0e5817cee41a89a1316a3050f.jpg"
                alt="Web Development Trends"
                className="w-[70%] h-auto rounded-[5px] mx-auto py-8"
              />
            </div>
          }
        />
      <CommentSection id={slug} comment={content?.comment} />
    </main>
  );
}
