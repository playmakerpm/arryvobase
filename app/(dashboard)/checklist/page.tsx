"use client";

import { useState, useEffect } from "react";
import { TASKS, PHASES_META, CATEGORIES_META } from "@/lib/data/checklist";
import { supabase } from "@/lib/supabase";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

export default function ChecklistPage() {
  const { user } = useUser();
  const userVisa = "ICT" as const;
  const userTasks = TASKS.filter((t) => t.visaTypes.includes(userVisa)).sort((a, b) => a.order - b.order);
  const phases = Object.values(PHASES_META);
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);
  const [isPro, setIsPro] = useState(false);

  const freePhases = isPro ? ["before", "first30", "first90", "ongoing"] : ["before"];

  // Load from Supabase
  useEffect(() => {
    if (!user) return;
    const load = async () => {
      // Check Pro status
      const urlParams = new URLSearchParams(window.location.search);
      const upgraded = urlParams.get("upgraded");
      if (upgraded === "true") {
        setIsPro(true);
      } else {
        const { data: userData } = await supabase
          .from("users")
          .select("plan")
          .eq("clerk_user_id", user.id)
          .single();
        if (userData?.plan === "pro") setIsPro(true);
      }

      // Load checklist progress
      const { data } = await supabase
        .from("checklist_progress")
        .select("task_id, completed")
        .eq("clerk_user_id", user.id);
      if (data) {
        const map: Record<string, boolean> = {};
        data.forEach((row: any) => { map[row.task_id] = row.completed; });
        setChecked(map);
      }
      setLoading(false);
    };
    load();
  }, [user]);

  const toggleTask = async (id: string) => {
    if (!user) return;
    const newVal = !checked[id];
    setChecked((prev) => ({ ...prev, [id]: newVal }));

    // Upsert to Supabase
    await supabase.from("checklist_progress").upsert({
      clerk_user_id: user.id,
      task_id: id,
      completed: newVal,
      completed_at: newVal ? new Date().toISOString() : null,
    }, { onConflict: "clerk_user_id,task_id" });

    // Also keep localStorage in sync for dashboard progress bar
    try {
      const current = JSON.parse(localStorage.getItem("arryvobase_checklist") || "{}");
      current[id] = newVal;
      localStorage.setItem("arryvobase_checklist", JSON.stringify(current));
    } catch {}
  };

  const totalFree = userTasks.filter(t => freePhases.includes(t.phase)).length;
  const totalDone = Object.values(checked).filter(Boolean).length;

  if (loading) return (
    <div style={{ padding: "40px 48px", display: "flex", alignItems: "center", justifyContent: "center", minHeight: "400px" }}>
      <div style={{ fontFamily: "Georgia, serif", fontSize: "18px", color: "#6B8BA8" }}>Loading your checklist...</div>
    </div>
  );

  return (
    <div style={{ padding: "40px", maxWidth: "900px", margin: "0 auto" }}>
      <div style={{ marginBottom: "32px" }}>
        <div style={{ fontSize: "11px", fontWeight: 600, letterSpacing: ".15em", textTransform: "uppercase", color: "#6B8BA8", marginBottom: "8px" }}>🇪🇸 Spain · ICT Visa</div>
        <h1 style={{ fontFamily: "Georgia, serif", fontSize: "40px", fontWeight: 600, color: "#083358", letterSpacing: "-.02em", lineHeight: 1.1, marginBottom: "12px" }}>Your Relocation Checklist</h1>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
          <div style={{ flex: 1, height: "6px", background: "#C8DFF0", borderRadius: "3px", overflow: "hidden" }}>
            <div style={{ height: "100%", width: totalFree > 0 ? `${Math.round((totalDone / totalFree) * 100)}%` : "0%", background: "linear-gradient(90deg, #0569B8, #00B9D1)", borderRadius: "3px", transition: "width .4s ease" }} />
          </div>
          <div style={{ fontSize: "13px", fontWeight: 600, color: "#0569B8", whiteSpace: "nowrap" }}>{totalDone}/{totalFree} complete</div>
        </div>
        <div style={{ fontSize: "13px", color: "#6B8BA8" }}>{isPro ? `All ${userTasks.length} tasks unlocked` : `${totalFree} tasks on Free plan · `}{!isPro && <Link href="/upgrade" style={{ color: "#0569B8", fontWeight: 600 }}>Upgrade to unlock all {userTasks.length} tasks</Link>}</div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
        {phases.map((phase) => {
          const phaseTasks = userTasks.filter((t) => t.phase === phase.id);
          const isLocked = !freePhases.includes(phase.id);
          const phaseComplete = phaseTasks.filter(t => checked[t.id]).length;
          return (
            <div key={phase.id}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
                <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: phase.color, flexShrink: 0 }} />
                <h2 style={{ fontFamily: "Georgia, serif", fontSize: "22px", fontWeight: 600, color: "#083358" }}>{phase.label}</h2>
                <span style={{ fontSize: "12px", color: "#6B8BA8" }}>{phaseTasks.length} tasks</span>
                {!isLocked && <span style={{ fontSize: "11px", color: "#0569B8", fontWeight: 600 }}>{phaseComplete}/{phaseTasks.length} done</span>}
                {isLocked && <span style={{ fontSize: "11px", fontWeight: 700, padding: "3px 10px", borderRadius: "20px", background: "#EDF4FB", color: "#0569B8", border: "1px solid #C8DFF0" }}>🔒 Pro</span>}
              </div>
              {isLocked ? (
                <div style={{ borderRadius: "16px", padding: "32px", textAlign: "center", background: "#EDF4FB", border: "1px dashed #C8DFF0" }}>
                  <div style={{ fontSize: "14px", fontWeight: 600, color: "#083358", marginBottom: "6px" }}>{phaseTasks.length} tasks locked</div>
                  <div style={{ fontSize: "13px", color: "#6B8BA8", marginBottom: "16px" }}>Unlock {phase.label} with Arryvo Base Pro</div>
                  <Link href="/upgrade" style={{ display: "inline-block", background: "#0569B8", color: "white", padding: "10px 24px", borderRadius: "8px", fontSize: "13px", fontWeight: 600, textDecoration: "none" }}>Upgrade to Pro — $19/mo</Link>
                </div>
              ) : (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                  {phaseTasks.map((task) => {
                    const isDone = !!checked[task.id];
                    const catMeta = CATEGORIES_META[task.category];
                    return (
                      <div key={task.id}
                        style={{ background: isDone ? "#F0F7F4" : "white", border: `1px solid ${isDone ? "#A8D5C0" : "#C8DFF0"}`, borderRadius: "14px", padding: "20px", cursor: "pointer", transition: "all .15s" }}
                        onClick={() => toggleTask(task.id)}>
                        <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                          <div style={{ width: "22px", height: "22px", borderRadius: "6px", flexShrink: 0, border: `2px solid ${isDone ? "#00B9D1" : "#C8DFF0"}`, background: isDone ? "#00B9D1" : "white", display: "flex", alignItems: "center", justifyContent: "center", marginTop: "2px", transition: "all .15s" }}>
                            {isDone && <span style={{ color: "white", fontSize: "12px", fontWeight: 700 }}>✓</span>}
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: "14px", fontWeight: 600, color: isDone ? "#6B8BA8" : "#083358", textDecoration: isDone ? "line-through" : "none", lineHeight: 1.35, marginBottom: "8px" }}>{task.title}</div>
                            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                              <span style={{ fontSize: "11px", fontWeight: 600, padding: "3px 10px", borderRadius: "20px", background: catMeta.bg, color: catMeta.color }}>{task.category}</span>
                              <span style={{ fontSize: "11px", color: "#6B8BA8" }}>{task.timeEstimate}</span>
                            </div>
                            {!isDone && task.description && <p style={{ marginTop: "10px", fontSize: "12px", color: "#6B8BA8", lineHeight: 1.6 }}>{task.description.slice(0, 100)}...</p>}
                            {!isDone && task.tip && <div style={{ marginTop: "10px", padding: "8px 12px", borderRadius: "8px", background: "#EDF4FB", borderLeft: `3px solid ${phase.color}`, fontSize: "12px", color: "#2E4A68", lineHeight: 1.5 }}><strong>Tip:</strong> {task.tip.slice(0, 90)}...</div>}
                            {!isDone && task.hasRecommendation && <Link href="/directory" style={{ display: "inline-flex", alignItems: "center", gap: "4px", marginTop: "10px", fontSize: "12px", fontWeight: 600, color: "#0569B8", textDecoration: "none" }} onClick={(e) => e.stopPropagation()}>⭐ View recommended providers →</Link>}
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
