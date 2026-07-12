import { notFound } from "next/navigation";
import { getNewsPost, getNewsPosts } from "@/lib/notion";

// Next.js 16.2.6 + Turbopack + output:'export' では generateStaticParams() が
// 空配列を返すと「generateStaticParamsが存在しない」扱いになりビルドが失敗するため、
// お知らせが0件のときはダミーslugを1件返し、ページ側でnotFound()させる回避策を入れている。
const EMPTY_PLACEHOLDER = "__none__";

export async function generateStaticParams() {
  const posts = await getNewsPosts();
  if (posts.length === 0) return [{ slug: EMPTY_PLACEHOLDER }];
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function NewsPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (slug === EMPTY_PLACEHOLDER) notFound();

  const post = await getNewsPost(slug);
  if (!post) notFound();

  return (
    <div className="wrap" style={{ padding: "56px 32px 90px", maxWidth: "72ch" }}>
      <div className="mono" style={{ fontSize: 11, color: "#7c868d", marginBottom: 12 }}>
        {post.date}
      </div>
      <h1 style={{ margin: "0 0 24px", fontSize: 26, fontWeight: 700, color: "#f2f5f6", lineHeight: 1.4 }}>
        {post.title}
      </h1>
      <div
        className="notion-body"
        style={{ fontSize: 14.5, lineHeight: 2, color: "#c7d0d4" }}
        dangerouslySetInnerHTML={{ __html: post.html }}
      />
    </div>
  );
}
