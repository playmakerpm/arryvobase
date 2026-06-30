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

  const [customTasks, setCustomTasks] = useState<any[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTask, setNewTask] = useState({ title: "", details: "", due_date: "", assigned_to: "Me", category: "Other" });
  const [savingTask, setSavingTask] = useState(false);

  const FREE_CUSTOM_LIMIT = 3;
  const canAddMore = isPro || customTasks.length < FREE_CUSTOM_LIMIT;

  // Load custom tasks
  useEffect(() => {
    if (!user) return;
    supabase.from("custom_tasks").select("*").eq("clerk_user_id", user.id).order("created_at", { ascending: false }).then(({ data }) => {
      if (data) setCustomTasks(data);
    });
  }, [user]);

  const addCustomTask = async () => {
    if (!user || !newTask.title.trim()) return;
    setSavingTask(true);
    const { data } = await supabase.from("custom_tasks").insert({
      clerk_user_id: user.id,
      title: newTask.title,
      details: newTask.details,
      due_date: newTask.due_date || null,
      assigned_to: newTask.assigned_to,
      category: newTask.category,
    }).select().single();
    if (data) setCustomTasks((prev: any[]) => [data, ...prev]);
    setNewTask({ title: "", details: "", due_date: "", assigned_to: "Me", category: "Other" });
    setShowAddForm(false);
    setSavingTask(false);
  };

  const toggleCustomTask = async (id: string, current: boolean) => {
    const newVal = !current;
    setCustomTasks((prev: any[]) => prev.map((t: any) => t.id === id ? { ...t, completed: newVal } : t));
    await supabase.from("custom_tasks").update({ completed: newVal, completed_at: newVal ? new Date().toISOString() : null }).eq("id", id);
  };

  const deleteCustomTask = async (id: string) => {
    setCustomTasks((prev: any[]) => prev.filter((t: any) => t.id !== id));
    await supabase.from("custom_tasks").delete().eq("id", id);
  };

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
      {/* Custom Tasks Section */}
      <div style={{ marginTop: "48px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#F5A623", flexShrink: 0 }} />
            <h2 style={{ fontFamily: "Georgia, serif", fontSize: "22px", fontWeight: 600, color: "#083358" }}>My Custom Tasks</h2>
            <span style={{ fontSize: "12px", color: "#6B8BA8" }}>{customTasks.length} tasks</span>
            {!isPro && (
              <span style={{ fontSize: "11px", fontWeight: 700, padding: "3px 10px", borderRadius: "20px", background: "#EDF4FB", color: "#0569B8", border: "1px solid #C8DFF0" }}>
                {customTasks.length}/{FREE_CUSTOM_LIMIT} free
              </span>
            )}
          </div>
          {canAddMore ? (
            <button onClick={() => setShowAddForm(!showAddForm)}
              style={{ fontSize: "13px", fontWeight: 600, padding: "8px 18px", borderRadius: "10px", border: "none", background: showAddForm ? "#EDF4FB" : "linear-gradient(135deg, #0569B8, #00B9D1)", color: showAddForm ? "#0569B8" : "white", cursor: "pointer" }}>
              {showAddForm ? "Cancel" : "+ Add Task"}
            </button>
          ) : (
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ fontSize: "12px", color: "#6B8BA8" }}>Free limit reached</span>
              <Link href="/upgrade" style={{ fontSize: "13px", fontWeight: 600, padding: "8px 18px", borderRadius: "10px", background: "#0569B8", color: "white", textDecoration: "none" }}>
                Upgrade for unlimited
              </Link>
            </div>
          )}
        </div>

        {/* Add Task Form */}
        {showAddForm && (
          <div style={{ background: "white", border: "1px solid #C8DFF0", borderRadius: "16px", padding: "24px", marginBottom: "16px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "14px" }}>
              <div style={{ gridColumn: "1 / -1" }}>
                <label style={{ display: "block", fontSize: "11px", fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: "#6B8BA8", marginBottom: "6px" }}>Task Title *</label>
                <input type="text" placeholder="e.g. Schedule NIE appointment" value={newTask.title}
                  onChange={e => setNewTask(p => ({ ...p, title: e.target.value }))}
                  style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid #C8DFF0", fontSize: "14px", color: "#083358", background: "#EDF4FB", outline: "none", fontFamily: "inherit" }} />
              </div>
              <div style={{ gridColumn: "1 / -1" }}>
                <label style={{ display: "block", fontSize: "11px", fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: "#6B8BA8", marginBottom: "6px" }}>Details</label>
                <textarea placeholder="Any notes or details about this task..." value={newTask.details}
                  onChange={e => setNewTask(p => ({ ...p, details: e.target.value }))}
                  rows={2} style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid #C8DFF0", fontSize: "14px", color: "#083358", background: "#EDF4FB", outline: "none", fontFamily: "inherit", resize: "vertical" }} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "11px", fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: "#6B8BA8", marginBottom: "6px" }}>Due Date</label>
                <input type="date" value={newTask.due_date}
                  onChange={e => setNewTask(p => ({ ...p, due_date: e.target.value }))}
                  style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid #C8DFF0", fontSize: "14px", color: "#083358", background: "#EDF4FB", outline: "none", fontFamily: "inherit" }} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "11px", fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: "#6B8BA8", marginBottom: "6px" }}>Assigned To</label>
                <input type="text" placeholder="Me, Partner, Lawyer..." value={newTask.assigned_to}
                  onChange={e => setNewTask(p => ({ ...p, assigned_to: e.target.value }))}
                  style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid #C8DFF0", fontSize: "14px", color: "#083358", background: "#EDF4FB", outline: "none", fontFamily: "inherit" }} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "11px", fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: "#6B8BA8", marginBottom: "6px" }}>Category</label>
                <select value={newTask.category} onChange={e => setNewTask(p => ({ ...p, category: e.target.value }))}
                  style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid #C8DFF0", fontSize: "14px", color: "#083358", background: "#EDF4FB", outline: "none", fontFamily: "inherit" }}>
                  {["Legal", "Banking", "Housing", "Health", "School", "Tax", "Admin", "Moving", "Other"].map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              <button onClick={() => setShowAddForm(false)}
                style={{ flex: 1, padding: "10px", borderRadius: "10px", border: "1px solid #C8DFF0", background: "white", color: "#6B8BA8", fontSize: "13px", cursor: "pointer" }}>
                Cancel
              </button>
              <button onClick={addCustomTask} disabled={!newTask.title.trim() || savingTask}
                style={{ flex: 2, padding: "10px", borderRadius: "10px", border: "none", background: newTask.title.trim() ? "linear-gradient(135deg, #0569B8, #00B9D1)" : "#EDF4FB", color: newTask.title.trim() ? "white" : "#C8DFF0", fontSize: "13px", fontWeight: 700, cursor: newTask.title.trim() ? "pointer" : "default" }}>
                {savingTask ? "Saving..." : "Add Task"}
              </button>
            </div>
          </div>
        )}

        {/* Custom task tiles */}
        {customTasks.length === 0 && !showAddForm && (
          <div style={{ padding: "32px", borderRadius: "16px", border: "1px dashed #C8DFF0", textAlign: "center", background: "#FAFCFF" }}>
            <div style={{ fontSize: "13px", color: "#6B8BA8", marginBottom: "8px" }}>No custom tasks yet</div>
            <div style={{ fontSize: "12px", color: "#C8DFF0" }}>Add tasks specific to your situation — appointments, calls, deadlines</div>
          </div>
        )}

        {customTasks.length > 0 && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
            {customTasks.map((task: any) => (
              <div key={task.id}
                style={{ background: task.completed ? "#F0F7F4" : "white", border: `1px solid ${task.completed ? "#A8D5C0" : "#C8DFF0"}`, borderRadius: "14px", padding: "20px" }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                  <div onClick={() => toggleCustomTask(task.id, task.completed)}
                    style={{ width: "22px", height: "22px", borderRadius: "6px", flexShrink: 0, border: `2px solid ${task.completed ? "#00B9D1" : "#C8DFF0"}`, background: task.completed ? "#00B9D1" : "white", display: "flex", alignItems: "center", justifyContent: "center", marginTop: "2px", cursor: "pointer", transition: "all .15s" }}>
                    {task.completed && <span style={{ color: "white", fontSize: "12px", fontWeight: 700 }}>✓</span>}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: "14px", fontWeight: 600, color: task.completed ? "#6B8BA8" : "#083358", textDecoration: task.completed ? "line-through" : "none", lineHeight: 1.35, marginBottom: "6px" }}>
                      {task.title}
                    </div>
                    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: task.details ? "8px" : "0" }}>
                      <span style={{ fontSize: "11px", fontWeight: 600, padding: "2px 8px", borderRadius: "20px", background: "#EDF4FB", color: "#0569B8" }}>{task.category}</span>
                      {task.due_date && <span style={{ fontSize: "11px", color: "#6B8BA8" }}>📅 {new Date(task.due_date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>}
                      {task.assigned_to && <span style={{ fontSize: "11px", color: "#6B8BA8" }}>👤 {task.assigned_to}</span>}
                    </div>
                    {task.details && <p style={{ fontSize: "12px", color: "#6B8BA8", lineHeight: 1.6, margin: 0 }}>{task.details}</p>}
                  </div>
                  <button onClick={() => deleteCustomTask(task.id)}
                    style={{ flexShrink: 0, background: "none", border: "none", cursor: "pointer", color: "#C8DFF0", fontSize: "16px", padding: "0", lineHeight: 1 }}>
                    ×
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
