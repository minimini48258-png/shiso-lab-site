# 思想とデータ研究所 (shiso-lab.chips.jp)

地域の持続可能性を哲学と実証データの両面から見つめ直す研究所のウェブサイト。

## 技術構成

- Next.js (App Router) + TypeScript + Tailwind CSS v4
- `output: 'export'` による静的書き出し（chips.jp / ロリポップ共有サーバーへの配置を想定）
- データ可視化: Recharts（`/tools/sakuho-dashboard`）

## ページ構成

- `/` トップ
- `/tools/` データ分析ツール一覧
  - `/tools/sakuho-dashboard/` 佐久穂町 地域ウェルビーイングダッシュボード（Next.jsページとして統合）
  - `/tools/fit-map/` 長野県FIT認定設備マップ（静的HTML/JS/Leafletをそのまま `public/` に同梱）
- `/essays/` 論考・エッセイ（note記事への外部リンク集）
- `/contact/` 問い合わせ

## 開発

```bash
npm install
npm run dev
```

## ビルド・静的書き出し

```bash
npm run build
```

`out/` ディレクトリに静的ファイル一式が生成される。chips.jp（ロリポップ）へは `out/` の中身をそのままFTP/SFTPでアップロードする。

## 画像アセットについて

トップ・論考ページの写真は現在プレースホルダー（グラデーション矩形）。デザイン指針（`02_マーケティング広報/ブランド・メッセージ/shiso-lab_デザイン指針.md`）の方針どおり、実際の写真は後日差し替え予定。差し替え先は各ページ内の `PlaceholderImage` を `<img>` に置き換える。

## データ分析ツールの追加について

`/tools/` の一覧（`src/app/tools/page.tsx`）に項目を追加し、公開済みツールは `status: "公開中"` と実体へのリンクを設定する。
