import { TASKS, VISA_TYPES, PHASES_META, CATEGORIES_META } from "@/lib/data/checklist";
import Link from "next/link";

export default function ChecklistPage() {
  const userVisa = "ICT" as const;
  const userTasks = TASKS.filter((t) => t.visaTypes.includes(userVisa))
    .sort((a, b) => a.order - b.order);

  const phases = Object.values(PHASES_META);
  const freePhases = ["before"];

  return (
    <div className="p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="text-sm font-body font-medium mb-1"
          style={{ color: "#6B8BA8", letterSpacing: "0.1em", textTransform: "uppercase" }}>
          🇪🇸 Spain · ICT Visa
        </div>
        <h1 className="font-display text-4xl font-semibold" style={{ color: "#083358" }}>
          Your Relocation Checklist
        </h1>
        <p className="mt-2 font-body text-sm" style={{ color: "#6B8BA8" }}>
          {userTasks.filter(t => freePhases.includes(t.phase)).length} tasks available on Free plan ·{" "}
          <Link href="/upgrade" style={{ color: "#0569B8" }}>Upgrade to unlock all {userTasks.length} tasks</Link>
        </p>
      </div>

      {/* Phases */}
      <div className="space-y-8">
        {phases.map((phase) => {
          const phaseTasks = userTasks.filter((t) => t.phase === phase.id);
          const isLocked = !freePhases.includes(phase.id);

          return (
            <div key={phase.id}>
              {/* Phase header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 rounded-full" style={{ background: phase.color }} />
                <h2 className="font-body font-semibold text-base" style={{ color: "#083358" }}>
                  {phase.label}
                </h2>
                <span className="text-xs font-body" style={{ color: "#6B8BA8" }}>
                  {phaseTasks.length} tasks
                </span>
                {isLocked && (
                  <span className="text-xs font-body font-semibold px-2 py-0.5 rounded-full"
                    style={{ background: "#EDF4FB", color: "#0569B8", border: "1px solid #C8DFF0" }}>
                    🔒 Pro
                  </span>
                )}
              </div>

              {/* Tasks */}
              {isLocked ? (
                <div className="rounded-2xl p-6 text-center" style={{ background: "#EDF4FB", border: "1px dashed #C8DFF0" }}>
                  <div className="font-body text-sm font-medium mb-1" style={{ color: "#083358" }}>
                    {phaseTasks.length} tasks in this phase
                  </div>
                  <div className="font-body text-xs mb-3" style={{ color: "#6B8BA8" }}>
                    Unlock {phase.label} tasks with Arryvo Base Pro
                  </div>
                  <Link href="/upgrade"
                    className="inline-block text-xs font-body font-semibold px-4 py-2 rounded-lg text-white"
                    style={{ background: "#0569B8" }}>
                    Upgrade to Pro — $19/mo
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {phaseTasks.map((task, i) => {
                    const catMeta = CATEGORIES_META[task.category];
                    const isDone = false;

                    return (
                      <div key={task.id}
                        className="rounded-xl p-4"
                        style={{
                          background: isDone ? "#EDF4FB" : "white",
                          border: `1px solid ${isDone ? "#C8DFF0" : "#C8DFF0"}`,
                        }}>
                        <div className="flex items-start gap-3">
                          {/* Checkbox */}
                          <div className="flex-shrink-0 mt-0.5">
                            <div className="w-5 h-5 rounded-md flex items-center justify-center cursor-pointer"
                              style={{
                                background: isDone ? "#00B9D1" : "white",
                                border: `2px solid ${isDone ? "#00B9D1" : "#C8DFF0"}`,
                              }}>
                              {isDone && <span className="text-white text-xs font-bold">✓</span>}
                            </div>
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <div className="font-body font-medium text-sm"
                                style={{ color: isDone ? "#6B8BA8" : "#083358",
                                  textDecoration: isDone ? "line-through" : "none" }}>
                                {task.title}
                              </div>
                              <span className="text-xs font-body flex-shrink-0" style={{ color: "#6B8BA8" }}>
                                {task.timeEstimate}
                              </span>
                            </div>

                            <div className="flex items-center gap-2 mt-2">
                              <span className="text-xs px-2 py-0.5 rounded-full font-body font-medium"
                                style={{ background: catMeta.bg, color: catMeta.color }}>
                                {task.category}
                              </span>
                            </div>

                            {!isDone && task.description && (
                              <p className="mt-2 text-xs font-body leading-relaxed"
                                style={{ color: "#6B8BA8" }}>
                                {task.description.slice(0, 120)}...
                              </p>
                            )}

                            {!isDone && task.tip && (
                              <div className="mt-2 p-2 rounded-lg text-xs font-body"
                                style={{ background: "#EDF4FB", color: "#2E4A68", borderLeft: `3px solid ${phase.color}` }}>
                                <strong>Tip:</strong> {task.tip.slice(0, 100)}...
                              </div>
                            )}

                            {!isDone && task.hasRecommendation && (
                              <Link href="/directory"
                                className="inline-flex items-center gap-1 mt-2 text-xs font-body font-semibold"
                                style={{ color: "#0569B8" }}>
                                ⭐ View recommended providers →
                              </Link>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
