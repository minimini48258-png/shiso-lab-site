import { Client } from "@notionhq/client";
import type {
  PageObjectResponse,
  QueryDatabaseResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { NotionToMarkdown } from "notion-to-md";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

export interface SiteSettings {
  hero_title: string;
  hero_body: string;
  about_body: string;
  value_1_title: string;
  value_1_desc: string;
  value_2_title: string;
  value_2_desc: string;
  value_3_title: string;
  value_3_desc: string;
}

// Notion未設定・該当行が無い場合のフォールバック（＝現在の固定文言）
const DEFAULTS: SiteSettings = {
  hero_title: "人の営みが、自然と地域を内側から再生していく社会へ。",
  hero_body:
    "思想とデータ研究所は、地域の持続可能性を哲学と実証データの両面から見つめ直す研究所です。特定の事業の宣伝ではなく、地域そのものの「あり方」を問い直します。",
  about_body:
    '私たちは、地域の持続可能性を「思想」と「データ」の両輪で探究する研究所です。特定の事業を推進する立場ではなく、<b style="color:var(--blue-bright)">人の営みが自然と地域の再生につながり、内発的に発展していく社会</b>というビジョンのもと、環境の天井と社会の土台のあいだで地域を捉える「ドーナツ経済学」を分析のベースに用いています。',
  value_1_title: "思想とデータの往復",
  value_1_desc: "哲学的な問いと実証データを行き来しながら地域を捉えます。",
  value_2_title: "内発的発展の重視",
  value_2_desc: "外部からの解決策ではなく、地域が自ら育つ力に着目します。",
  value_3_title: "公開性と検証可能性",
  value_3_desc: "出典を明示し、行政資料としても引用できる正確さを保ちます。",
};

// Notion「サイト設定」データベースの各ページのタイトルと、この完全一致で対応付ける。
// （タイトルだけで識別するので、追加のプロパティ設定が不要な最小構成にしている）
const LABELS: Record<keyof SiteSettings, string> = {
  hero_title: "トップ：見出し",
  hero_body: "トップ：本文",
  about_body: "研究所について：本文",
  value_1_title: "大切にしていること①：タイトル",
  value_1_desc: "大切にしていること①：説明",
  value_2_title: "大切にしていること②：タイトル",
  value_2_desc: "大切にしていること②：説明",
  value_3_title: "大切にしていること③：タイトル",
  value_3_desc: "大切にしていること③：説明",
};

function stripOuterP(html: string): string {
  const trimmed = html.trim();
  const m = trimmed.match(/^<p>([\s\S]*)<\/p>$/);
  return m ? m[1] : trimmed;
}

function getClient(): { notion: Client; databaseId: string } | null {
  const token = process.env.NOTION_TOKEN;
  const databaseId = process.env.NOTION_SETTINGS_DATABASE_ID;
  if (!token || !databaseId) return null;
  return { notion: new Client({ auth: token }), databaseId };
}

function getTitle(page: PageObjectResponse): string {
  const prop = Object.values(page.properties).find((p) => p.type === "title");
  if (prop?.type === "title") {
    return prop.title.map((t) => t.plain_text).join("").trim();
  }
  return "";
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const client = getClient();
  if (!client) return DEFAULTS;
  const { notion, databaseId } = client;

  const results: PageObjectResponse[] = [];
  let cursor: string | undefined;
  do {
    const res: QueryDatabaseResponse = await notion.databases.query({
      database_id: databaseId,
      start_cursor: cursor,
    });
    results.push(...res.results.filter((r): r is PageObjectResponse => "properties" in r));
    cursor = res.has_more ? (res.next_cursor ?? undefined) : undefined;
  } while (cursor);

  const byLabel = new Map<string, PageObjectResponse>();
  for (const page of results) {
    const title = getTitle(page);
    if (title) byLabel.set(title, page);
  }

  const n2m = new NotionToMarkdown({ notionClient: notion });
  const settings: SiteSettings = { ...DEFAULTS };

  await Promise.all(
    (Object.keys(LABELS) as (keyof SiteSettings)[]).map(async (key) => {
      const page = byLabel.get(LABELS[key]);
      if (!page) return;
      const mdBlocks = await n2m.pageToMarkdown(page.id);
      const markdown = n2m.toMarkdownString(mdBlocks).parent;
      if (!markdown.trim()) return;
      const processed = await remark().use(remarkGfm).use(remarkHtml).process(markdown);
      settings[key] = stripOuterP(processed.toString());
    })
  );

  return settings;
}
