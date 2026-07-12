import Link from "next/link";

const TOOLS = [
  {
    name: "地域ウェルビーイングダッシュボード",
    category: "GIS / 可視化",
    color: "#5aa9e6",
    iconBg: "rgba(62,141,196,.16)",
    desc: "地域版ドーナツ経済モデルにより、環境・経済・社会指標を可視化。",
    status: "公開中",
    href: "/tools/well-being-dashboard/",
    external: false,
  },
  {
    name: "長野県 FIT認定設備マップ",
    category: "GIS / エネルギー",
    color: "#eda100",
    iconBg: "rgba(232,161,0,.16)",
    desc: "長野県内のFIT認定太陽光・水力・バイオマス設備を地図上に可視化。卒FIT時期でも絞り込み可能。",
    status: "公開中",
    href: "/tools/fit-map/",
    external: true,
  },
  {
    name: "内発的発展度シミュレーター",
    category: "経済循環分析",
    color: "#4ade80",
    iconBg: "rgba(74,222,128,.14)",
    desc: "外部依存度・地域内経済循環・関係人口から自律性を試算。",
    status: "準備中",
    href: null,
    external: false,
  },
  {
    name: "社会的コスト試算ツール",
    category: "金額換算分析",
    color: "#e878ac",
    iconBg: "rgba(232,120,172,.14)",
    desc: "高齢化・医療アクセス・遊休農地などの見えにくいコストを推計。",
    status: "準備中",
    href: null,
    external: false,
  },
  {
    name: "関係人口・移住トレンド分析",
    category: "人口データ分析",
    color: "#E8842B",
    iconBg: "rgba(232,132,43,.14)",
    desc: "関係人口・移住トレンドから地域とのつながり方の変化を追跡。",
    status: "準備中",
    href: null,
    external: false,
  },
];

export default function ToolsPage() {
  return (
    <div className="wrap" style={{ padding: "56px 32px 80px" }}>
      <div className="mono" style={{ fontSize: 10, letterSpacing: ".1em", color: "#7c868d" }}>
        ANALYSIS TOOLS
      </div>
      <h1 style={{ margin: "10px 0 8px", fontSize: 28, fontWeight: 700, color: "#f2f5f6" }}>データ分析ツール</h1>
      <p style={{ margin: 0, fontSize: 14, color: "#9aa4a9", lineHeight: 1.8, maxWidth: "60ch" }}>
        地域の現状を多角的に捉えるための分析ソフトを一覧にしています。今後も順次追加していきます。
      </p>

      <div className="grid-auto" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", marginTop: 28 }}>
        {TOOLS.map((t) => {
          const isReady = t.status === "公開中";
          const body = (
            <div className="card-dark" style={{ padding: 22, opacity: isReady ? 1 : 0.7, height: "100%" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: t.iconBg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flex: "none",
                  }}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24">
                    <path
                      d="M4 19V10M10 19V5M16 19v-7M20 19V3"
                      stroke={t.color}
                      strokeWidth="1.8"
                      fill="none"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14.5, fontWeight: 700, color: "#f2f5f6", lineHeight: 1.4 }}>{t.name}</div>
                  <div className="mono" style={{ fontSize: 10, letterSpacing: ".06em", color: t.color, marginTop: 4 }}>
                    {t.category}
                  </div>
                </div>
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    color: isReady ? "var(--blue-bright)" : "#9aa4a9",
                    background: isReady ? "rgba(62,141,196,.18)" : "rgba(255,255,255,.08)",
                    padding: "4px 9px",
                    borderRadius: 20,
                    flex: "none",
                  }}
                >
                  {t.status}
                </div>
              </div>
              <div style={{ fontSize: 12.5, color: "#9aa4a9", lineHeight: 1.8 }}>{t.desc}</div>
            </div>
          );

          if (!t.href) {
            return <div key={t.name}>{body}</div>;
          }

          return (
            <Link key={t.name} href={t.href}>
              {body}
            </Link>
          );
        })}
      </div>

      <div
        style={{
          marginTop: 24,
          padding: "18px 20px",
          background: "rgba(62,141,196,.1)",
          border: "1px solid rgba(62,141,196,.25)",
          borderRadius: 14,
          fontSize: 13,
          color: "#c7d0d4",
          lineHeight: 1.9,
        }}
      >
        各ツールは順次公開していきます。
      </div>
    </div>
  );
}
