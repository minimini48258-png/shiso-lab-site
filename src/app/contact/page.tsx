export default function ContactPage() {
  return (
    <div className="wrap" style={{ padding: "56px 32px 90px" }}>
      <div className="mono" style={{ fontSize: 10, letterSpacing: ".1em", color: "#7c868d" }}>
        CONTACT
      </div>
      <h1 style={{ margin: "10px 0 16px", fontSize: 28, fontWeight: 700, color: "#f2f5f6" }}>問い合わせ</h1>

      <p style={{ margin: "0 0 30px", fontSize: 14, color: "#9aa4a9", lineHeight: 1.9, maxWidth: "60ch" }}>
        データ事業、思想に関してのお問い合わせは以下からお願いします。
      </p>

      <div className="card-dark" style={{ display: "flex", alignItems: "center", gap: 18, padding: "24px 26px", maxWidth: 520 }}>
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: 12,
            background: "rgba(62,141,196,.16)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flex: "none",
          }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24">
            <path d="M3 6h18v12H3z M3 6l9 7 9-7" stroke="var(--blue-bright)" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div>
          <div style={{ fontSize: 12, color: "#9aa4a9" }}>メールでのご連絡</div>
          <a href="mailto:takumi48258ikeike@outlook.jp" style={{ fontSize: 15, fontWeight: 700, color: "#f2f5f6" }}>
            takumi48258ikeike@outlook.jp
          </a>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "44px 0 22px" }}>
        <span style={{ width: 8, height: 26, background: "var(--orange)", borderRadius: 2 }} />
        <h2 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: "#f2f5f6" }}>運営者</h2>
      </div>
      <div className="card-dark" style={{ display: "flex", gap: 18, alignItems: "flex-start", padding: 22, maxWidth: 640 }}>
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            background: "rgba(62,141,196,.16)",
            flex: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--blue-bright)",
            fontWeight: 700,
            fontSize: 16,
          }}
        >
          た
        </div>
        <div>
          <div style={{ fontSize: 14.5, fontWeight: 700, color: "#f2f5f6" }}>たっくみー ／ 研究所 運営代表</div>
          <div style={{ fontSize: 12.5, color: "#9aa4a9", lineHeight: 1.8, marginTop: 6 }}>
            思考と実践を通してより良い生き方と社会を手繰り寄せる。気候変動・エネルギー問題やマルチスピーシーズ・ウェルビーイングをテーマに note で連載中。
          </div>
          <a href="https://note.com/tackmetakumi" target="_blank" rel="noopener" style={{ display: "inline-block", marginTop: 10, fontSize: 12, fontWeight: 600, color: "var(--blue-bright)" }}>
            note プロフィールを見る →
          </a>
        </div>
      </div>
    </div>
  );
}
