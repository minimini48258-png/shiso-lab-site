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
          paddingTop: 10,
          paddingBottom: 10,
        }}
      >
        <Link href="/" style={{ display: "flex", alignItems: "center", flex: "none" }}>
          <img
            src="/assets/logo/logo-black-bg.png"
            alt="思想とデータ研究所"
            style={{ height: 56, width: "auto", display: "block", borderRadius: 6 }}
          />
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
