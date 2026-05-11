import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

const NAV_ITEMS = [
  { href: "/dashboard",  label: "Dashboard",  icon: "⊞" },
  { href: "/checklist",  label: "Checklist",  icon: "✓" },
  { href: "/directory",  label: "Directory",  icon: "⭐" },
  { href: "/vendors",    label: "My Vendors", icon: "👥" },
  { href: "/documents",  label: "Documents",  icon: "📁" },
  { href: "/settings",   label: "Settings",   icon: "⚙" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen" style={{ background: "#EDF4FB" }}>
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 flex flex-col" style={{ background: "#020D1C", borderRight: "1px solid #083358" }}>
        {/* Logo */}
        <div className="p-6 border-b" style={{ borderColor: "#083358" }}>
          <Link href="/dashboard">
            <span className="font-display text-2xl font-semibold" style={{ color: "#C8EEF5" }}>
              Arryvo<span style={{ color: "#00B9D1" }}>Base</span>
            </span>
          </Link>
          <div className="mt-1 text-xs font-body" style={{ color: "#6B8BA8", letterSpacing: "0.1em" }}>
            COMMAND CENTER
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 rounded-lg font-body text-sm font-medium transition-all duration-150 group"
              style={{ color: "#6B8BA8" }}
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        {/* User + Upgrade */}
        <div className="p-4 border-t space-y-3" style={{ borderColor: "#083358" }}>
          {/* Upgrade CTA */}
          <div className="rounded-xl p-4" style={{ background: "linear-gradient(135deg, #0569B8, #00B9D1)" }}>
            <div className="text-xs font-body font-semibold text-white mb-1">Upgrade to Pro</div>
            <div className="text-xs text-white/70 mb-3">Unlock all countries, full checklist & document vault</div>
            <Link
              href="/upgrade"
              className="block text-center text-xs font-semibold py-2 px-3 rounded-lg transition-all"
              style={{ background: "white", color: "#0569B8" }}
            >
              $19/month →
            </Link>
          </div>

          {/* User button */}
          <div className="flex items-center gap-3 px-2">
            <UserButton />
            <div className="flex-1 min-w-0">
              <div className="text-xs font-body font-medium truncate" style={{ color: "#C8EEF5" }}>
                My Account
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
