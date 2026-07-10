import Link from "next/link";
import PlaceholderImage from "@/components/PlaceholderImage";

const VALUES = [
  { num: "①", title: "思想とデータの往復", desc: "哲学的な問いと実証データを行き来しながら地域を捉えます。" },
  { num: "②", title: "内発的発展の重視", desc: "外部からの解決策ではなく、地域が自ら育つ力に着目します。" },
  { num: "③", title: "公開性と検証可能性", desc: "出典を明示し、行政資料としても引用できる正確さを保ちます。" },
];

const FEATURES = [
  {
    kicker: "内発的発展度",
    color: "#5aa9e6",
    seed: 0,
    title: "外部依存から自律へ ― 地域内経済循環を読む",
    desc: "外部依存度・地域内経済循環・関係人口から「自律性」を可視化。",
  },
  {
    kicker: "見えない社会的コスト",
    color: "#e878ac",
    seed: 1,
    title: "高齢化・医療アクセス・遊休農地を金額換算する",
    desc: "見えにくい社会的コストを推計し、政策判断の土台にする試み。",
  },
  {
    kicker: "関係人口・移住トレンド",
    color: "#4ade80",
    seed: 2,
    title: "暮らしの質と、地域とのつながり方の変化",
    desc: "関係人口・移住トレンドから見える、新しい地域との関わり方。",
  },
];

export default function TopPage() {
  return (
    <div>
      {/* hero */}
      <div style={{ position: "relative", height: "min(72vh, 620px)", overflow: "hidden" }}>
        <PlaceholderImage
          label="ドーナツ経済の光の輪が里山にかかるイメージ"
          seed={0}
          style={{ width: "100%", height: "100%" }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(6,8,10,.25) 0%, rgba(6,8,10,.55) 55%, rgba(6,8,10,.94) 100%)",
          }}
        />
        <div className="wrap" style={{ position: "absolute", left: 0, right: 0, bottom: 56, color: "#fff" }}>
          <div
            className="mono"
            style={{
              fontSize: 11,
              letterSpacing: ".16em",
              color: "#8fb9d4",
              marginBottom: 16,
              textTransform: "uppercase",
            }}
          >
            Institute for Thought &amp; Data
          </div>
          <h1
            style={{
              margin: "0 0 20px",
              fontSize: "clamp(28px, 4.4vw, 46px)",
              lineHeight: 1.35,
              fontWeight: 700,
              maxWidth: "20ch",
            }}
          >
            人の営みが、自然と地域を内側から再生していく社会へ。
          </h1>
          <p
            style={{
              margin: 0,
              fontSize: 15,
              lineHeight: 1.9,
              color: "#c7d0d4",
              fontWeight: 400,
              maxWidth: "56ch",
            }}
          >
            思想とデータ研究所は、地域の持続可能性を哲学と実証データの両面から見つめ直す研究所です。特定の事業の宣伝ではなく、地域そのものの「あり方」を問い直します。
          </p>
        </div>
      </div>

      {/* about */}
      <div className="wrap" style={{ padding: "60px 32px 12px" }}>
        <SectionHeading color="var(--blue-bright)" title="思想とデータ研究所について" />
        <div
          className="card-dark"
          style={{
            display: "grid",
            gridTemplateColumns: "1.1fr .9fr",
            gap: 36,
            alignItems: "center",
          }}
        >
          <p
            style={{
              fontSize: 14.5,
              lineHeight: 2.1,
              color: "#c7d0d4",
              margin: 0,
              padding: "28px 0 28px 28px",
            }}
          >
            私たちは、地域の持続可能性を「思想」と「データ」の両輪で探究する研究所です。特定の事業を推進する立場ではなく、
            <b style={{ color: "var(--blue-bright)" }}>
              人の営みが自然と地域の再生につながり、内発的に発展していく社会
            </b>
            というビジョンのもと、環境の天井と社会の土台のあいだで地域を捉える「ドーナツ経済学」を分析のベースに用いています。
          </p>
          <PlaceholderImage
            label="地域の人々による野良仕事の風景"
            seed={1}
            style={{
              width: "100%",
              height: "100%",
              minHeight: 180,
              borderRadius: "0 16px 16px 0",
            }}
          />
        </div>
      </div>

      {/* values */}
      <div className="wrap" style={{ padding: "52px 32px 12px" }}>
        <SectionHeading color="var(--orange)" title="私たちが大切にしていること" />
        <div className="grid-auto" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
          {VALUES.map((v) => (
            <div key={v.num} className="card-dark" style={{ display: "flex", gap: 14, padding: "18px 20px" }}>
              <div className="mono" style={{ fontSize: 12, fontWeight: 700, color: "var(--orange)", flex: "none" }}>
                {v.num}
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 6, color: "#f2f5f6" }}>{v.title}</div>
                <div style={{ fontSize: 12.5, color: "#9aa4a9", lineHeight: 1.8 }}>{v.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* tools teaser */}
      <div className="wrap" style={{ padding: "52px 32px 12px" }}>
        <SectionHeading color="var(--orange)" title="データ分析ツール" />
        <Link
          href="/tools/"
          className="card-dark"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 22,
            width: "100%",
            padding: "26px 28px",
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 14,
              background: "rgba(62,141,196,.14)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flex: "none",
            }}
          >
            <svg width="30" height="30" viewBox="0 0 24 24">
              <path
                d="M4 19V10M10 19V5M16 19v-7M20 19V3"
                stroke="var(--blue-bright)"
                strokeWidth="1.8"
                fill="none"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#f2f5f6" }}>分析ツール一覧を見る</div>
            <div style={{ marginTop: 6, fontSize: 13.5, color: "#9aa4a9", lineHeight: 1.8 }}>
              地域の環境・社会・レジリエンスを可視化する各種分析ソフトをまとめています。
            </div>
          </div>
          <div style={{ fontSize: 13, fontWeight: 700, color: "var(--blue-bright)", flex: "none" }}>見る →</div>
        </Link>
      </div>

      {/* features */}
      <div className="wrap" style={{ padding: "52px 32px 12px" }}>
        <SectionHeading color="var(--blue-bright)" title="特集：面白い切り口" />
        <div className="grid-auto" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
          {FEATURES.map((f) => (
            <Link
              href="/tools/"
              key={f.title}
              className="card-dark"
              style={{ display: "flex", flexDirection: "column", overflow: "hidden" }}
            >
              <PlaceholderImage label={f.kicker} seed={f.seed} style={{ width: "100%", height: 150 }} />
              <div style={{ padding: "18px 20px 22px" }}>
                <div
                  className="mono"
                  style={{ fontSize: 10, letterSpacing: ".08em", color: f.color, fontWeight: 600, marginBottom: 8 }}
                >
                  {f.kicker}
                </div>
                <div style={{ fontSize: 15.5, fontWeight: 700, color: "#f2f5f6", lineHeight: 1.45, marginBottom: 8 }}>
                  {f.title}
                </div>
                <div style={{ fontSize: 13, color: "#9aa4a9", lineHeight: 1.7 }}>{f.desc}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* essays teaser */}
      <div className="wrap" style={{ padding: "52px 32px 80px" }}>
        <SectionHeading color="var(--orange)" title="論考・エッセイ" />
        <Link
          href="/essays/"
          className="card-dark"
          style={{ display: "grid", gridTemplateColumns: "220px 1fr", overflow: "hidden", width: "100%" }}
        >
          <PlaceholderImage label="地図とノートの並ぶ机" seed={1} style={{ width: "100%", height: "100%", minHeight: 140 }} />
          <div style={{ padding: "22px 26px" }}>
            <div className="mono" style={{ fontSize: 10, letterSpacing: ".08em", color: "var(--orange)", fontWeight: 600, marginBottom: 8 }}>
              ESSAY
            </div>
            <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 10, lineHeight: 1.4, color: "#f2f5f6" }}>
              多生命的ウェルビーイング（Multi-species Wellbeing）のために
            </div>
            <div style={{ fontSize: 13, color: "#9aa4a9", lineHeight: 1.7 }}>
              思想的コラムとデータ解説記事を note で連載中 →
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

function SectionHeading({ color, title }: { color: string; title: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
      <span style={{ width: 8, height: 26, background: color, borderRadius: 2 }} />
      <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: "#f2f5f6" }}>{title}</h2>
    </div>
  );
}
