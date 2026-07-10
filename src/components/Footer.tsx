import Link from "next/link";

export default function Footer() {
  return (
    <div style={{ borderTop: "1px solid rgba(255,255,255,.08)", padding: "28px 32px" }}>
      <div
        className="wrap"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <div className="mono" style={{ fontSize: 11, color: "#5f676d" }}>
          © 思想とデータ研究所
        </div>
        <div style={{ display: "flex", gap: 20 }}>
          <Link href="/tools/" style={{ fontSize: 12, color: "#7c868d" }}>
            分析ツール
          </Link>
          <Link href="/essays/" style={{ fontSize: 12, color: "#7c868d" }}>
            論考
          </Link>
          <Link href="/contact/" style={{ fontSize: 12, color: "#7c868d" }}>
            問い合わせ
          </Link>
        </div>
      </div>
    </div>
  );
}
