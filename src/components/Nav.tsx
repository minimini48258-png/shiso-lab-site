"use client";

import { useState } from "react";
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
  const [open, setOpen] = useState(false);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

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
          gap: 16,
          paddingTop: 10,
          paddingBottom: 10,
        }}
      >
        <Link href="/" style={{ display: "flex", alignItems: "center", flex: "none", minWidth: 0 }}>
          <img
            src="/assets/logo/logo-transparent-bold-white-text.png"
            alt="思想とデータ研究所"
            style={{ height: "clamp(38px, 9vw, 56px)", width: "auto", display: "block", maxWidth: "100%" }}
          />
        </Link>

        {/* デスクトップ用ナビ */}
        <div className="hidden md:flex" style={{ alignItems: "center", gap: 28 }}>
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: ".01em",
                padding: "8px 2px",
                whiteSpace: "nowrap",
                color: isActive(link.href) ? "#f2f5f6" : "#7c868d",
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* モバイル用ハンバーガーボタン */}
        <button
          type="button"
          className="flex md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "メニューを閉じる" : "メニューを開く"}
          aria-expanded={open}
          style={{
            all: "unset",
            cursor: "pointer",
            alignItems: "center",
            justifyContent: "center",
            width: 36,
            height: 36,
            flex: "none",
          }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" stroke="#f2f5f6" strokeWidth="1.8" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" stroke="#f2f5f6" strokeWidth="1.8" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {/* モバイル用メニューパネル */}
      {open && (
        <div
          className="md:hidden"
          style={{ borderTop: "1px solid rgba(255,255,255,.08)" }}
        >
          <div className="wrap" style={{ display: "flex", flexDirection: "column", padding: "12px 32px 20px" }}>
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  padding: "12px 2px",
                  borderBottom: "1px solid rgba(255,255,255,.06)",
                  color: isActive(link.href) ? "#f2f5f6" : "#9aa4a9",
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
