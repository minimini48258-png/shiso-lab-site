import { Client } from "@notionhq/client";
import type {
  PageObjectResponse,
  QueryDatabaseResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { NotionToMarkdown } from "notion-to-md";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

export interface NewsPost {
  id: string;
  slug: string;
  title: string;
  date: string;
  html: string;
}

// お知らせデータベースのスキーマ（Notion側）:
//   タイトル … Title
//   日付     … Date
//   公開     … Checkbox（オンのものだけサイトに表示）
//
// NOTION_TOKEN / NOTION_DATABASE_ID が未設定の場合はビルドを落とさず空配列を返す
// （Notion連携セットアップ前でもサイトのビルドが通るようにするため）。
function getClient(): { notion: Client; databaseId: string } | null {
  const token = process.env.NOTION_TOKEN;
  const databaseId = process.env.NOTION_DATABASE_ID;
  if (!token || !databaseId) return null;
  return { notion: new Client({ auth: token }), databaseId };
}

function getTitle(page: PageObjectResponse): string {
  const prop = page.properties["タイトル"];
  if (prop?.type === "title") {
    return prop.title.map((t) => t.plain_text).join("") || "(無題)";
  }
  return "(無題)";
}

function getDate(page: PageObjectResponse): string {
  const prop = page.properties["日付"];
  if (prop?.type === "date" && prop.date) {
    return prop.date.start;
  }
  return page.created_time.slice(0, 10);
}

function isPublished(page: PageObjectResponse): boolean {
  const prop = page.properties["公開"];
  return prop?.type === "checkbox" ? prop.checkbox : false;
}

export async function getNewsPosts(): Promise<NewsPost[]> {
  const client = getClient();
  if (!client) return [];
  const { notion, databaseId } = client;

  const results: PageObjectResponse[] = [];
  let cursor: string | undefined;
  do {
    const res: QueryDatabaseResponse = await notion.databases.query({
      database_id: databaseId,
      start_cursor: cursor,
    });
    results.push(...(res.results.filter((r): r is PageObjectResponse => "properties" in r)));
    cursor = res.has_more ? (res.next_cursor ?? undefined) : undefined;
  } while (cursor);

  const n2m = new NotionToMarkdown({ notionClient: notion });

  const posts = await Promise.all(
    results
      .filter(isPublished)
      .map(async (page) => {
        const mdBlocks = await n2m.pageToMarkdown(page.id);
        const markdown = n2m.toMarkdownString(mdBlocks).parent;
        const processed = await remark().use(remarkGfm).use(remarkHtml).process(markdown);
        return {
          id: page.id,
          slug: page.id.replace(/-/g, "").slice(-12),
          title: getTitle(page),
          date: getDate(page),
          html: processed.toString(),
        };
      })
  );

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getNewsPost(slug: string): Promise<NewsPost | null> {
  const posts = await getNewsPosts();
  return posts.find((p) => p.slug === slug) ?? null;
}
