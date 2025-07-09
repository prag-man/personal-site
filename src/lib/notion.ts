import { Client } from "@notionhq/client";
import { BlockObjectResponse, PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

const notion = new Client({ auth: process.env.NOTION_TOKEN });

export async function getPublishedPosts() {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_THOUGHT_DB_ID!,
    filter: {
      property: "Published",
      checkbox: { equals: true },
    },
    sorts: [{ property: "Date", direction: "descending" }],
  });

  return response.results.map((page: any) => ({
    id: page.id,
    title: page.properties.Title?.title?.[0]?.plain_text || "Untitled",
    slug: page.properties.Slug?.rich_text?.[0]?.plain_text || "",
    date: page.properties.Date?.date?.start || null,
    excerpt: page.properties.Excerpt?.rich_text?.[0]?.plain_text || "",
    readingTime: page.properties.Reading?.rich_text?.[0]?.plain_text || "",
    category: page.properties.Category?.select?.name || null,
    tags: page.properties.Tags?.multi_select?.map((tag: any) => tag.name) || [],
    // cover: page.properties.Cover?.files?.[0]?.file?.url || "",
  }));
}

export async function getProjects() {
    const response = await notion.databases.query({
        database_id: process.env.NOTION_PROJECT_DB_ID!,
        filter: {
            property: "Published",
            checkbox: { equals: true },
        },
    })

    return response.results.map((page: any) => ({
        id: page.id,
        name: page.properties.Name?.title?.[0]?.plain_text || "Untitled",
        excerpt: page.properties.Excerpt?.rich_text?.[0]?.plain_text || "",
        date: page.properties.Date?.date?.start || null,
        status: page.properties.Status?.status?.name || null,
        techStack: page.properties.TechStack?.multi_select?.map((tag: any) => tag.name) || [],
        liveLink: page.properties.LiveLink?.url || null,
        githubLink: page.properties.GithubLink?.url || null,
    }));
}

export async function addContactSubmission({
    name,
    email,
    subject,
    message,
  }: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }) {
    try {
      const response = await notion.pages.create({
        parent: { database_id: process.env.NOTION_CONTACT_DB_ID! },
        properties: {
          Name: {
            title: [{ text: { content: name } }],
          },
          Email: {
            email: email,
          },
          Subject: {
            rich_text: [{ text: { content: subject } }],
          },
          Message: {
            rich_text: [{ text: { content: message } }],
          },
        },
      });
  
      return response;
    } catch (error) {
      console.error("Error saving contact to Notion:", error);
      throw error;
    }
  }
  

export async function getPost(slug: string) {
    const response = await notion.databases.query({
        database_id: process.env.NOTION_DB_ID!,
        filter: {
            property: "Slug",
            rich_text: {
                equals: slug,
            }
        }
    })
    return response.results[0];
}

// Helper function to recursively get all blocks from a page
async function getAllBlocks(blockId: string): Promise<BlockObjectResponse[]> {
  const blocks: BlockObjectResponse[] = [];
  let cursor: string | undefined;
  
  do {
    const response = await notion.blocks.children.list({
      block_id: blockId,
      page_size: 100,
      start_cursor: cursor,
    });
    
    const blockResults = response.results.filter(
      (block): block is BlockObjectResponse => 'type' in block
    );
    
    blocks.push(...blockResults);
    cursor = response.next_cursor || undefined;
  } while (cursor);
  
  // Recursively get children for blocks that have children
  for (const block of blocks) {
    if (block.has_children) {
      const childBlocks = await getAllBlocks(block.id);
      // Store children in the block object
      (block as any).children = childBlocks;
    }
  }
  
  return blocks;
}

export async function getPostContent(pageId: string) {
  try {
    console.log("Getting post content for page:", pageId);
    
    // Get the page details
    const page = await notion.pages.retrieve({ page_id: pageId }) as PageObjectResponse;
    
    // Get all blocks from the page
    const blocks = await getAllBlocks(pageId);
    
    console.log("Successfully retrieved", blocks.length, "blocks");
    
    return {
      page,
      blocks,
      // Create a simple record map structure for compatibility
      recordMap: {
        page: pageId,
        blocks: blocks.reduce((acc, block) => {
          acc[block.id] = block;
          return acc;
        }, {} as Record<string, BlockObjectResponse>)
      }
    };
  } catch (error) {
    console.error("Error getting post content:", error);
    throw error;
  }
}
