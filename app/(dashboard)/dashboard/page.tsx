"use client";

import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

const QUICK_TILES = [
  { href: "/checklist", icon: "✓", title: "Relocation Checklist", desc: "Track every step of your Spain move — visa, housing, banking, school.", color: "#0569B8", bg: "linear-gradient(135deg, #EDF4FB, #D4E9F7)", tag: "7 tasks available", locked: false },
  { href: "/directory", icon: "⭐", title: "Vendor Directory", desc: "Vetted lawyers, insurance, banks, and housing platforms for Spain.", color: "#00B9D1", bg: "linear-gradient(135deg, #E8F9FC, #C8EEF5)", tag: "14 providers", locked: false },
  { href: "/vendors", icon: "👥", title: "My Vendors", desc: "Track every provider you are working with from first contact to hired.", color: "#083358", bg: "linear-gradient(135deg, #EDF4FB, #D0DDED)", tag: "Personal CRM", locked: false },
  { href: "/documents", icon: "📁", title: "Document Vault", desc: "Organize passports, visas, contracts, and school records securely.", color: "#F5A623", bg: "linear-gradient(135deg, #FDF4E7, #FAE5C0)", tag: "Pro feature", locked: true },
  { href: "/upgrade", icon: "🌍", title: "More Countries", desc: "Portugal, Mexico, and Thailand coming soon. Upgrade for early access.", color: "#5C6E46", bg: "linear-gradient(135deg, #EDF2E8, #D8E5D0)", tag: "Coming soon", locked: true },
  { href: "/faq", icon: "💬", title: "FAQ & Help", desc: "Common questions about Spain visas, Beckham Law, banking, and schools.", color: "#6B8BA8", bg: "linear-gradient(135deg, #EDF4FB, #D4E2EE)", tag: "Knowledge base", locked: false },
];

const PHASES = [
  { label: "Before You Leave", color: "#0569B8", locked: false },
  { label: "First 30 Days", color: "#00B9D1", locked: true },
  { label: "First 90 Days", color: "#F5A623", locked: true },
  { label: "Ongoing", color: "#5DD3E3", locked: true },
];

const TOTAL_FREE = 7;
const TOTAL_TASKS = 22;

export default function DashboardPage({ searchParams }: { searchParams: any }) {
  const { user } = useUser();
  const firstName = user?.firstName || "there";
  const [completedCount, setCompletedCount] = useState(0);
  const [isPro, setIsPro] = useState(false);

  useEffect(() => {
    if (!user) return;
    const load = async () => {
      // If returning from successful Stripe checkout, update plan to pro
      if (searchParams?.upgraded) {
        await supabase
          .from("users")
          .upsert({
            clerk_user_id: user.id,
            email: user.emailAddresses?.[0]?.emailAddress || "",
            plan: "pro",
          }, { onConflict: "clerk_user_id" });
        setIsPro(true);
      }

      // Load checklist progress
      const { data: progress } = await supabase
        .from("checklist_progress")
        .select("task_id, completed")
        .eq("clerk_user_id", user.id)
        .eq("completed", true);
      if (progress) setCompletedCount(progress.length);

      // Load user plan
      const { data: userData } = await supabase
        .from("users")
        .select("plan")
        .eq("clerk_user_id", user.id)
        .single();
      if (userData) setIsPro(userData.plan === "pro");
    };
    load();
  }, [user]);

  const progressPct = TOTAL_FREE > 0 ? Math.round((completedCount / TOTAL_FREE) * 100) : 0;

  return (
    <div style={{ padding: "40px 48px", maxWidth: "1100px", margin: "0 auto" }}>
      {searchParams?.upgraded && (
        <div style={{ marginBottom: "24px", padding: "16px 20px", borderRadius: "12px", background: "linear-gradient(135deg, #0569B8, #00B9D1)", color: "white", fontSize: "14px", fontWeight: 600 }}>
          🎉 Welcome to Arryvo Base Pro! All features are now unlocked.
        </div>
      )}

      <div style={{ marginBottom: "32px" }}>
        <div style={{ fontSize: "11px", fontWeight: 600, letterSpacing: ".18em", textTransform: "uppercase", color: "#6B8BA8", marginBottom: "8px" }}>Your Command Center</div>
        <h1 style={{ fontFamily: "Georgia, serif", fontSize: "52px", fontWeight: 600, color: "#083358", letterSpacing: "-.025em", lineHeight: 1.05, marginBottom: "10px" }}>
          Welcome back, {firstName}.
        </h1>
        <p style={{ fontSize: "15px", fontWeight: 300, color: "#2E4A68", lineHeight: 1.7 }}>
          Your Spain relocation is organized and ready. Here is where you left off.
        </p>
      </div>

      <div style={{ borderRadius: "20px", padding: "28px 32px", marginBottom: "32px", background: "linear-gradient(135deg, #083358 0%, #0569B8 60%, #00B9D1 100%)", color: "white", display: "grid", gridTemplateColumns: "1fr 200px", gap: "32px", alignItems: "center" }}>
        <div>
          <div style={{ fontSize: "11px", fontWeight: 600, letterSpacing: ".14em", textTransform: "uppercase", color: "rgba(200,238,245,.6)", marginBottom: "8px" }}>
            🇪🇸 Spain · ICT Visa · Before You Leave Phase
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "14px" }}>
            <div style={{ fontFamily: "Georgia, serif", fontSize: "52px", fontWeight: 600, lineHeight: 1, color: "#5DD3E3" }}>{progressPct}%</div>
            <div>
              <div style={{ fontSize: "15px", fontWeight: 600, color: "white", marginBottom: "3px" }}>{completedCount} of {TOTAL_FREE} tasks complete</div>
              <div style={{ fontSize: "12px", color: "rgba(200,238,245,.55)" }}>
                {isPro ? "Pro plan active ✓" : `Upgrade to unlock all ${TOTAL_TASKS} tasks`}
              </div>
            </div>
          </div>
          <div style={{ height: "8px", background: "rgba(255,255,255,.15)", borderRadius: "4px", overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${progressPct}%`, background: "linear-gradient(90deg, #5DD3E3, #C8EEF5)", borderRadius: "4px", transition: "width .6s ease" }} />
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {PHASES.map((p) => (
            <div key={p.label} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: p.locked && !isPro ? "rgba(255,255,255,.2)" : p.color, flexShrink: 0 }} />
              <div style={{ fontSize: "12px", color: p.locked && !isPro ? "rgba(255,255,255,.3)" : "rgba(200,238,245,.9)", flex: 1 }}>{p.label}</div>
              {p.locked && !isPro && <span style={{ fontSize: "10px", color: "rgba(255,255,255,.25)" }}>🔒</span>}
            </div>
          ))}
        </div>
      </div>

      <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: ".16em", textTransform: "uppercase", color: "#6B8BA8", marginBottom: "14px" }}>Quick Access</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "14px", marginBottom: "28px" }}>
        {QUICK_TILES.map((tile) => (
          <Link key={tile.href} href={tile.href} style={{ textDecoration: "none", display: "block" }}>
            <div style={{ background: tile.bg, borderRadius: "16px", padding: "22px", display: "flex", flexDirection: "column", gap: "10px", border: "1px solid rgba(200,222,240,.6)", minHeight: "172px", boxSizing: "border-box" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ width: "42px", height: "42px", borderRadius: "11px", background: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", boxShadow: "0 2px 8px rgba(0,0,0,.06)", flexShrink: 0 }}>{tile.icon}</div>
                <span style={{ fontSize: "10px", fontWeight: 700, padding: "4px 10px", borderRadius: "20px", background: "rgba(255,255,255,.75)", color: tile.color, letterSpacing: ".06em", textTransform: "uppercase", whiteSpace: "nowrap" }}>{tile.tag}</span>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "Georgia, serif", fontSize: "17px", fontWeight: 600, color: "#083358", marginBottom: "5px", lineHeight: 1.25 }}>{tile.title}</div>
                <div style={{ fontSize: "13px", color: "#2E4A68", lineHeight: 1.6, fontWeight: 300 }}>{tile.desc}</div>
              </div>
              <div style={{ fontSize: "12px", fontWeight: 600, color: tile.color }}>
                {tile.locked && !isPro ? "Upgrade to unlock →" : "Open →"}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {!isPro && (
        <div style={{ borderRadius: "16px", padding: "22px 28px", background: "linear-gradient(135deg, #020D1C, #083358)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "24px" }}>
          <div>
            <div style={{ fontFamily: "Georgia, serif", fontSize: "20px", fontWeight: 600, color: "#C8EEF5", marginBottom: "4px" }}>Unlock your full relocation plan</div>
            <div style={{ fontSize: "13px", color: "rgba(200,238,245,.45)", fontWeight: 300 }}>All phases · Document vault · Portugal, Mexico & Thailand</div>
          </div>
          <Link href="/upgrade" style={{ flexShrink: 0, background: "linear-gradient(135deg, #0569B8, #00B9D1)", color: "white", padding: "12px 28px", borderRadius: "10px", fontSize: "13px", fontWeight: 700, textDecoration: "none", whiteSpace: "nowrap" }}>
            Upgrade to Pro — $19/mo
          </Link>
        </div>
      )}
    </div>
  );
}
