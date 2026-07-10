import type { NextConfig } from "next";

// chips.jp（ロリポップ系の静的/共有レンタルサーバー）にそのままアップロードするため、
// サーバーサイド機能を使わず静的HTMLとして書き出す。
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
