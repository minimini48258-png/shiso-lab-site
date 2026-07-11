const ESSAYS = [
  { tag: "マルチスピーシーズ", color: "#4ade80", title: "多生命的ウェルビーイング（Multi-species Wellbeing）のために（社会編）", date: "2025.08", url: "https://note.com/tackmetakumi" },
  { tag: "マルチスピーシーズ", color: "#4ade80", title: "多生命的ウェルビーイング（Multi-species Wellbeing）のために（個人編）", date: "2025.07", url: "https://note.com/tackmetakumi" },
  { tag: "環境哲学", color: "#5aa9e6", title: "思考：地球は生きているのか？〜身体としての地球と、私たちの存在をめぐる思索〜", date: "2025.07", url: "https://note.com/tackmetakumi" },
  { tag: "社会・教育", color: "#e878ac", title: "思考：教育について思うこと", date: "2025.06", url: "https://note.com/tackmetakumi" },
  { tag: "気候変動・エネルギー", color: "#E8842B", title: "気候変動、エネルギー問題についての連載マガジン", date: "マガジン・12本", url: "https://note.com/tackmetakumi/m/m6a6c22f9515a" },
  { tag: "社会課題・時事", color: "#9aa4a9", title: "社会課題、時事ネタについての連載マガジン", date: "マガジン・14本", url: "https://note.com/tackmetakumi/m/m572e1a6415f9" },
];

export default function EssaysPage() {
  return (
    <div>
      <div style={{ position: "relative", height: 280, overflow: "hidden" }}>
        <img
          src="/assets/desk-maps-notebook.jpg"
          alt="地図とノートの並ぶ机"
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", filter: "saturate(.85) brightness(.75)" }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, rgba(10,12,14,.2), rgba(10,12,14,.92))",
          }}
        />
        <div className="wrap" style={{ position: "absolute", left: 0, right: 0, bottom: 32, color: "#fff" }}>
          <div className="mono" style={{ fontSize: 10, letterSpacing: ".1em", color: "#e0b483" }}>
            ESSAYS &amp; COLUMNS
          </div>
          <div style={{ fontSize: 26, fontWeight: 700, marginTop: 8 }}>論考・エッセイ</div>
        </div>
      </div>
      <div className="wrap" style={{ padding: "30px 32px 8px", fontSize: 13.5, color: "#9aa4a9", lineHeight: 1.9, maxWidth: "70ch" }}>
        ドーナツ経済学・コンヴィヴィアリティ・マルチスピーシーズ・ウェルビーイングなど、思想的な視点とデータ解説を横断する連載を note で公開しています。
      </div>
      <div className="wrap grid-auto" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))", padding: "24px 32px 80px" }}>
        {ESSAYS.map((e) => (
          <a
            key={e.title}
            href={e.url}
            target="_blank"
            rel="noopener"
            className="card-dark"
            style={{ display: "flex", gap: 14, alignItems: "center", padding: "18px 20px", color: "#e7ecee" }}
          >
            <div style={{ flex: 1 }}>
              <div className="mono" style={{ fontSize: 10, letterSpacing: ".06em", color: e.color, fontWeight: 600 }}>
                {e.tag}
              </div>
              <div style={{ fontSize: 15, fontWeight: 700, marginTop: 8, lineHeight: 1.5, color: "#f2f5f6" }}>
                {e.title}
              </div>
              <div style={{ fontSize: 12, color: "#7c868d", marginTop: 8 }}>{e.date} ・ note で読む →</div>
            </div>
            <svg width="16" height="16" viewBox="0 0 24 24" style={{ flex: "none", opacity: 0.4 }}>
              <path d="M7 17L17 7M9 7h8v8" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        ))}
      </div>
    </div>
  );
}
