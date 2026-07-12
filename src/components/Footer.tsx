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
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <img
            src="/assets/logo/mark-black-bg.png"
            alt=""
            width={18}
            height={18}
            style={{ borderRadius: 4, display: "block", opacity: 0.85 }}
          />
          <div className="mono" style={{ fontSize: 11, color: "#5f676d" }}>
            © 思想とデータ研究所
          </div>
        </div>
        <div style={{ display: "flex", gap: 20 }}>
          <Link href="/tools/" style={{ fontSize: 12, color: "#7c868d" }}>
            分析ツール
          </Link>
          <Link href="/news/" style={{ fontSize: 12, color: "#7c868d" }}>
            お知らせ
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
