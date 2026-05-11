import { currentUser } from "@clerk/nextjs/server";
import { TASKS, VISA_TYPES, PHASES_META } from "@/lib/data/checklist";
import Link from "next/link";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: { upgraded?: string; canceled?: string };
}) {
  const user = await currentUser();
  const firstName = user?.firstName || "there";

  // Default to Spain ICT for demo — in production this comes from user's profile in DB
  const userVisa = "ICT" as const;
  const userDestination = "Spain";

  const userTasks = TASKS.filter((t) => t.visaTypes.includes(userVisa));
  const totalTasks = userTasks.length;
  // Free users only see "before" phase tasks
  const freeTasks = userTasks.filter((t) => t.phase === "before");
  const completedCount = 2; // Mock — comes from DB in production
  const progressPct = Math.round((completedCount / freeTasks.length) * 100);

  const phases = Object.values(PHASES_META);

  return (
    <div className="p-8 max-w-5xl mx-auto">
      {/* Upgrade success banner */}
      {searchParams.upgraded && (
        <div className="mb-6 p-4 rounded-xl text-white text-sm font-body font-medium"
          style={{ background: "linear-gradient(135deg, #0569B8, #00B9D1)" }}>
          🎉 Welcome to Arryvo Base Pro! All features are now unlocked.
        </div>
      )}

      {/* Header */}
      <div className="mb-8">
        <div className="text-sm font-body font-medium mb-1" style={{ color: "#6B8BA8", letterSpacing: "0.1em", textTransform: "uppercase" }}>
          Welcome back
        </div>
        <h1 className="font-display text-4xl font-semibold mb-1" style={{ color: "#083358" }}>
          {firstName} 👋
        </h1>
        <div className="flex items-center gap-3 mt-2">
          <span className="text-sm font-body" style={{ color: "#6B8BA8" }}>
            🇪🇸 {userDestination}
          </span>
          <span style={{ color: "#C8DFF0" }}>·</span>
          <span className="text-sm font-body" style={{ color: "#6B8BA8" }}>
            {VISA_TYPES[userVisa].name}
          </span>
          <span style={{ color: "#C8DFF0" }}>·</span>
          <span className="text-sm font-body px-2 py-0.5 rounded-full text-xs font-semibold"
            style={{ background: "#EDF4FB", color: "#0569B8", border: "1px solid #C8DFF0" }}>
            Free Plan
          </span>
        </div>
      </div>

      {/* Progress card */}
      <div className="rounded-2xl p-6 mb-6" style={{ background: "linear-gradient(135deg, #083358, #0569B8)", color: "white" }}>
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="text-xs font-body font-semibold mb-1" style={{ letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(200,238,245,.7)" }}>
              Relocation Progress
            </div>
            <div className="font-display text-5xl font-semibold">{progressPct}%</div>
            <div className="text-sm mt-1" style={{ color: "rgba(200,238,245,.6)" }}>
              {completedCount} of {freeTasks.length} tasks complete (Before You Leave phase)
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs font-body mb-1" style={{ color: "rgba(200,238,245,.5)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              Current Phase
            </div>
            <div className="font-display text-lg font-semibold" style={{ color: "#5DD3E3" }}>
              Before You Leave
            </div>
          </div>
        </div>
        <div className="h-2 rounded-full" style={{ background: "rgba(255,255,255,.15)" }}>
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{ width: `${progressPct}%`, background: "linear-gradient(90deg, #5DD3E3, #C8EEF5)" }}
          />
        </div>
      </div>

      {/* Two column grid */}
      <div className="grid grid-cols-3 gap-6">
        {/* Next tasks - spans 2 cols */}
        <div className="col-span-2">
          <div className="rounded-2xl p-6" style={{ background: "white", border: "1px solid #C8DFF0" }}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-body font-semibold text-lg" style={{ color: "#083358" }}>
                Next Up
              </h2>
              <Link href="/checklist" className="text-xs font-body font-semibold"
                style={{ color: "#0569B8" }}>
                View all →
              </Link>
            </div>
            <div className="space-y-3">
              {freeTasks.slice(0, 4).map((task, i) => (
                <div key={task.id}
                  className="flex items-start gap-3 p-3 rounded-xl"
                  style={{ background: i < completedCount ? "#EDF4FB" : "white", border: "1px solid #C8DFF0" }}>
                  <div className="flex-shrink-0 mt-0.5">
                    {i < completedCount ? (
                      <div className="w-5 h-5 rounded-full flex items-center justify-center"
                        style={{ background: "#00B9D1" }}>
                        <span className="text-white text-xs">✓</span>
                      </div>
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2"
                        style={{ borderColor: "#C8DFF0" }} />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-body font-medium"
                      style={{ color: i < completedCount ? "#6B8BA8" : "#083358",
                        textDecoration: i < completedCount ? "line-through" : "none" }}>
                      {task.title}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs px-2 py-0.5 rounded-full font-body font-medium"
                        style={{ background: "#EDF4FB", color: "#0569B8" }}>
                        {task.category}
                      </span>
                      <span className="text-xs font-body" style={{ color: "#6B8BA8" }}>
                        {task.timeEstimate}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pro upgrade teaser */}
          <div className="mt-4 rounded-2xl p-5" style={{ background: "#EDF4FB", border: "1px solid #C8DFF0" }}>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-body font-semibold text-sm mb-1" style={{ color: "#083358" }}>
                  🔒 {totalTasks - freeTasks.length} more tasks hidden
                </div>
                <div className="text-xs font-body" style={{ color: "#6B8BA8" }}>
                  Upgrade to Pro to unlock First 30 Days, First 90 Days, and Ongoing phases
                </div>
              </div>
              <Link href="/upgrade"
                className="flex-shrink-0 text-xs font-body font-semibold px-4 py-2 rounded-lg text-white transition-all"
                style={{ background: "#0569B8" }}>
                Upgrade $19/mo
              </Link>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-4">
          {/* Stats */}
          <div className="rounded-2xl p-5" style={{ background: "white", border: "1px solid #C8DFF0" }}>
            <h3 className="font-body font-semibold text-sm mb-4" style={{ color: "#083358" }}>
              Your Relocation
            </h3>
            <div className="space-y-3">
              {[
                { label: "Destination", value: "🇪🇸 Spain" },
                { label: "Visa Type", value: "ICT" },
                { label: "Vendors Saved", value: "0" },
                { label: "Docs Uploaded", value: "0" },
              ].map((stat) => (
                <div key={stat.label} className="flex justify-between items-center">
                  <span className="text-xs font-body" style={{ color: "#6B8BA8" }}>{stat.label}</span>
                  <span className="text-xs font-body font-semibold" style={{ color: "#083358" }}>{stat.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div className="rounded-2xl p-5" style={{ background: "white", border: "1px solid #C8DFF0" }}>
            <h3 className="font-body font-semibold text-sm mb-4" style={{ color: "#083358" }}>
              Quick Actions
            </h3>
            <div className="space-y-2">
              {[
                { href: "/directory", label: "Browse Vendors", icon: "⭐" },
                { href: "/vendors", label: "My Saved Vendors", icon: "👥" },
                { href: "/documents", label: "Upload Documents", icon: "📁" },
                { href: "/settings", label: "Update Profile", icon: "⚙" },
              ].map((link) => (
                <Link key={link.href} href={link.href}
                  className="flex items-center gap-2 text-xs font-body font-medium p-2 rounded-lg transition-all"
                  style={{ color: "#0569B8" }}>
                  <span>{link.icon}</span>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
