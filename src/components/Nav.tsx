"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/", label: "トップ" },
  { href: "/tools/", label: "データ分析ツール" },
  { href: "/news/", label: "お知らせ" },
  { href: "/essays/", label: "論考" },
  { href: "/contact/", label: "問い合わせ" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        zIndex: 30,
        background: "rgba(10,12,14,.62)",
        backdropFilter: "blur(14px) saturate(1.2)",
        borderBottom: "1px solid rgba(255,255,255,.08)",
      }}
    >
      <div
        className="wrap"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 20,
          paddingTop: 16,
          paddingBottom: 16,
        }}
      >
        <Link
          href="/"
          style={{ display: "flex", alignItems: "center", gap: 9 }}
        >
          <img
            src="/assets/logo/mark-black-bg.png"
            alt="思想とデータ研究所"
            width={28}
            height={28}
            style={{ flex: "none", borderRadius: 6, display: "block" }}
          />
          <span
            style={{
              fontSize: 15,
              fontWeight: 700,
              letterSpacing: ".02em",
              color: "#f2f5f6",
              lineHeight: 1,
            }}
          >
            思想とデータ研究所
          </span>
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: 28, overflowX: "auto" }}>
          {LINKS.map((link) => {
            const active =
              link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  letterSpacing: ".01em",
                  padding: "8px 2px",
                  whiteSpace: "nowrap",
                  color: active ? "#f2f5f6" : "#7c868d",
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
