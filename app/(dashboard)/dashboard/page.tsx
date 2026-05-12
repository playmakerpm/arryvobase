import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="font-display text-4xl font-semibold mb-2" style={{ color: "#083358" }}>
          Welcome to Arryvo Base
        </h1>
        <p className="font-body text-sm" style={{ color: "#6B8BA8" }}>
          Your Spain relocation command center
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <Link href="/checklist" className="rounded-2xl p-6 block" style={{ background: "white", border: "1px solid #C8DFF0", textDecoration: "none" }}>
          <div className="text-3xl mb-3">✓</div>
          <div className="font-body font-semibold text-lg mb-1" style={{ color: "#083358" }}>Checklist</div>
          <div className="font-body text-sm" style={{ color: "#6B8BA8" }}>View your Spain relocation tasks</div>
        </Link>

        <Link href="/directory" className="rounded-2xl p-6 block" style={{ background: "white", border: "1px solid #C8DFF0", textDecoration: "none" }}>
          <div className="text-3xl mb-3">⭐</div>
          <div className="font-body font-semibold text-lg mb-1" style={{ color: "#083358" }}>Vendor Directory</div>
          <div className="font-body text-sm" style={{ color: "#6B8BA8" }}>Browse vetted providers for Spain</div>
        </Link>

        <Link href="/vendors" className="rounded-2xl p-6 block" style={{ background: "white", border: "1px solid #C8DFF0", textDecoration: "none" }}>
          <div className="text-3xl mb-3">👥</div>
          <div className="font-body font-semibold text-lg mb-1" style={{ color: "#083358" }}>My Vendors</div>
          <div className="font-body text-sm" style={{ color: "#6B8BA8" }}>Track your saved providers</div>
        </Link>

        <Link href="/settings" className="rounded-2xl p-6 block" style={{ background: "white", border: "1px solid #C8DFF0", textDecoration: "none" }}>
          <div className="text-3xl mb-3">⚙</div>
          <div className="font-body font-semibold text-lg mb-1" style={{ color: "#083358" }}>Settings</div>
          <div className="font-body text-sm" style={{ color: "#6B8BA8" }}>Update your profile and preferences</div>
        </Link>
      </div>
    </div>
  );
}
