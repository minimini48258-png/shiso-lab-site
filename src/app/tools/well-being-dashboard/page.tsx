"use client";

import { useState } from "react";
import DonutRingChart from "@/components/dashboard/DonutRingChart";
import MetricPanel from "@/components/dashboard/MetricPanel";
import ScoreOverview from "@/components/dashboard/ScoreOverview";

export default function WellBeingDashboardPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <div className="min-h-screen" style={{ background: "#f8f9fa", color: "#111" }}>
      <header style={{ background: "#fff", borderBottom: "1px solid #e5e7eb" }}>
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between flex-wrap gap-2">
          <div>
            <h1 className="text-xl font-bold flex items-center gap-2" style={{ color: "#111" }}>
              <span>🏔️</span>
              <span>地域ウェルビーイングダッシュボード</span>
            </h1>
            <p className="text-sm mt-0.5" style={{ color: "#6b7280" }}>
              地域版ドーナツ経済モデルによる持続可能性の可視化
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm flex-wrap" style={{ color: "#6b7280" }}>
            <span className="rounded-full px-3 py-1" style={{ background: "#f3f4f6" }}>2023–24年データ</span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3 rounded-2xl p-4" style={{ background: "#fff", border: "1px solid #f3f4f6" }}>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold" style={{ color: "#374151" }}>
                指標マップ
                <span className="ml-2 text-xs font-normal" style={{ color: "#9ca3af" }}>
                  （セグメントをクリックして詳細を確認）
                </span>
              </h2>
            </div>
            <DonutRingChart selectedId={selectedId} onSelect={setSelectedId} />
          </div>

          <div className="lg:col-span-2 rounded-2xl overflow-auto" style={{ background: "#fff", border: "1px solid #f3f4f6" }}>
            <MetricPanel selectedId={selectedId} onClose={() => setSelectedId(null)} />
          </div>
        </div>

        <div className="rounded-2xl p-4" style={{ background: "#fff", border: "1px solid #f3f4f6" }}>
          <h2 className="text-sm font-semibold mb-4" style={{ color: "#374151" }}>ドメイン別スコア概要</h2>
          <ScoreOverview />
        </div>

        <div className="text-xs pb-4 space-y-1" style={{ color: "#9ca3af" }}>
          <p>
            ⚠️ 本ダッシュボードのデータは公開統計（環境省・総務省・農林水産省・e-Stat等）から収集・一部推計したものです。
            公式の行政データとは異なる場合があります。
          </p>
          <p>
            スコアは各指標を0〜100に正規化した相対値です。指標の定義・算定方法は今後、自治体との協議により改定される予定です。
          </p>
        </div>
      </main>
    </div>
  );
}
