import React from "react";

// If you're fetching data, make this async
export default function ForumDetailPage({
    params,
}: {
    params: { id: string };
}) {
    // You can get the forum data using the ID from params
    // For example:
    // const forumData = await getForumById(params.id);

    // If data doesn't exist, you can show 404
    // if (!forumData) notFound();

    return (
        <main className="ml-[264px] w-full">
            <div className="py-6">
                {/* Add your detail page layout here */}
                <h1 className="text-2xl font-bold">Forum Detail {params.id}</h1>
                {/* Add more content components */}
            </div>
        </main>
    );
}
