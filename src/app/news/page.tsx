import Link from "next/link";
import { getNewsPosts } from "@/lib/notion";

export default async function NewsPage() {
  const posts = await getNewsPosts();

  return (
    <div className="wrap" style={{ padding: "56px 32px 90px" }}>
      <div className="mono" style={{ fontSize: 10, letterSpacing: ".1em", color: "#7c868d" }}>
        NEWS
      </div>
      <h1 style={{ margin: "10px 0 8px", fontSize: 28, fontWeight: 700, color: "#f2f5f6" }}>お知らせ</h1>
      <p style={{ margin: 0, fontSize: 14, color: "#9aa4a9", lineHeight: 1.8, maxWidth: "60ch" }}>
        研究所からのお知らせ・活動報告です。思想的なコラムや長文の論考は note で公開しています。
      </p>

      {posts.length === 0 ? (
        <div
          style={{
            marginTop: 28,
            padding: "18px 20px",
            background: "rgba(62,141,196,.1)",
            border: "1px solid rgba(62,141,196,.25)",
            borderRadius: 14,
            fontSize: 13,
            color: "#c7d0d4",
            lineHeight: 1.9,
          }}
        >
          現在公開中のお知らせはありません。
        </div>
      ) : (
        <div className="grid-auto" style={{ gridTemplateColumns: "1fr", marginTop: 28 }}>
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/news/${post.slug}/`}
              className="card-dark"
              style={{ display: "flex", flexDirection: "column", padding: "20px 22px", color: "#e7ecee" }}
            >
              <div className="mono" style={{ fontSize: 11, color: "#7c868d", marginBottom: 8 }}>
                {post.date}
              </div>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#f2f5f6" }}>{post.title}</div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
