import { getPostContent, getPost } from "@/lib/notion";
import NotionBlockRenderer from "@/components/notion-block-renderer";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export default async function Page({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);
  if (!post) return <div>Post not found</div>;

  const pagePost = post as PageObjectResponse;
  console.log(pagePost.id);
  const content = await getPostContent(pagePost.id);

  // Type assertion for the title property
  const titleProperty = pagePost.properties.Title as any;
  const title = titleProperty.title[0]?.plain_text || "Untitled";

  return (
    <div className="max-w-4xl mx-auto py-10 px-5 h-screen">
      <h1 className="text-3xl font-bold mb-8">{title}</h1>
      <NotionBlockRenderer blocks={content.blocks} />
    </div>
  );
}
