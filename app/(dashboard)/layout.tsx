import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

const NAV_ITEMS = [
  { href: "/dashboard",  label: "Dashboard",  emoji: "⊞" },
  { href: "/checklist",  label: "Checklist",  emoji: "✓" },
  { href: "/directory",  label: "Directory",  emoji: "⭐" },
  { href: "/vendors",    label: "My Vendors", emoji: "👥" },
  { href: "/documents",  label: "Documents",  emoji: "📁" },
  { href: "/settings",   label: "Settings",   emoji: "⚙️" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", height: "100vh", background: "#EDF4FB" }}>
      {/* Sidebar */}
      <aside style={{ width: "240px", flexShrink: 0, display: "flex", flexDirection: "column", background: "#020D1C", borderRight: "1px solid #083358" }}>
        {/* Logo */}
        <div style={{ padding: "28px 24px 20px", borderBottom: "1px solid rgba(255,255,255,.06)" }}>
          <Link href="/dashboard" style={{ textDecoration: "none" }}>
            <div style={{ fontFamily: "Georgia, serif", fontSize: "20px", fontWeight: 600, color: "#C8EEF5", letterSpacing: "-.01em" }}>
              Arryvo<span style={{ color: "#00B9D1" }}>Base</span>
            </div>
            <div style={{ fontSize: "9px", fontWeight: 600, letterSpacing: ".18em", textTransform: "uppercase", color: "#2E4A68", marginTop: "3px" }}>
              Command Center
            </div>
          </Link>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: "16px 12px" }}>
          {NAV_ITEMS.map((item) => (
            <Link key={item.href} href={item.href} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 12px", borderRadius: "8px", marginBottom: "2px", textDecoration: "none", color: "#6B8BA8", fontSize: "13px", fontWeight: 500, transition: "all .15s" }}>
              <span style={{ fontSize: "14px", width: "18px", textAlign: "center" }}>{item.emoji}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Upgrade CTA */}
        <div style={{ padding: "16px" }}>
          <div style={{ background: "linear-gradient(135deg, #0569B8, #00B9D1)", borderRadius: "12px", padding: "16px", marginBottom: "12px" }}>
            <div style={{ fontSize: "12px", fontWeight: 700, color: "white", marginBottom: "4px" }}>Upgrade to Pro</div>
            <div style={{ fontSize: "11px", color: "rgba(255,255,255,.7)", marginBottom: "12px", lineHeight: 1.4 }}>Unlock all countries, full checklist & document vault</div>
            <Link href="/upgrade" style={{ display: "block", textAlign: "center", fontSize: "12px", fontWeight: 700, padding: "8px", borderRadius: "8px", background: "white", color: "#0569B8", textDecoration: "none" }}>
              $19/month →
            </Link>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "8px 4px" }}>
            <UserButton />
            <span style={{ fontSize: "12px", color: "#2E4A68", fontWeight: 500 }}>My Account</span>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, overflowY: "auto" }}>
        {children}
      </main>
    </div>
  );
}
