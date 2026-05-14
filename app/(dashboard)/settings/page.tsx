// @ts-nocheck
"use client";

import { useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function SettingsPage() {
  const { user } = useUser();
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showDanger, setShowDanger] = useState(false);
  const [cleared, setCleared] = useState(false);
  const [notifications, setNotifications] = useState({ weeklyDigest: true, phaseComplete: true, tipReminders: false });
  const [profile, setProfile] = useState({ destination: "ES", visa: "ICT", moveDate: "", relocatingWith: "Family with children" });

  const referralCode = user?.id ? `ref_${user.id.slice(-8)}` : "ref_loading";
  const referralLink = `https://arryvobase.com?ref=${referralCode}`;

  useEffect(() => {
    try {
      const s = localStorage.getItem("arryvobase_settings");
      if (s) { const p = JSON.parse(s); if (p.profile) setProfile(p.profile); if (p.notifications) setNotifications(p.notifications); }
    } catch {}
  }, []);

  const saveSettings = () => {
    try { localStorage.setItem("arryvobase_settings", JSON.stringify({ profile, notifications })); } catch {}
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const copyReferral = () => {
    navigator.clipboard.writeText(referralLink).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2500); });
  };

  const clearAllData = () => {
    ["arryvobase_checklist","arryvobase_vendors","arryvobase_docs","arryvobase_settings"].forEach(k => { try { localStorage.removeItem(k); } catch {} });
    setCleared(true); setShowDanger(false); setTimeout(() => setCleared(false), 3000);
  };

  const inputStyle = { width: "100%", padding: "11px 14px", borderRadius: "10px", border: "1px solid #C8DFF0", fontSize: "14px", color: "#083358", background: "#EDF4FB", outline: "none", fontFamily: "inherit" };
  const labelStyle = { display: "block", fontSize: "11px", fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase" as const, color: "#6B8BA8", marginBottom: "7px" };
  const cardStyle = { background: "white", border: "1px solid #C8DFF0", borderRadius: "16px", padding: "28px", marginBottom: "16px" };

  return (
    <div style={{ padding: "40px 48px", maxWidth: "860px", margin: "0 auto" }}>
      <div style={{ marginBottom: "32px" }}>
        <div style={{ fontSize: "11px", fontWeight: 600, letterSpacing: ".15em", textTransform: "uppercase" as const, color: "#6B8BA8", marginBottom: "8px" }}>Account</div>
        <h1 style={{ fontFamily: "Georgia, serif", fontSize: "40px", fontWeight: 600, color: "#083358", letterSpacing: "-.02em", lineHeight: 1.1 }}>Settings</h1>
      </div>

      {/* Profile */}
      <div style={cardStyle}>
        <div style={{ fontSize: "13px", fontWeight: 700, color: "#083358", marginBottom: "20px", textTransform: "uppercase" as const, letterSpacing: ".1em" }}>Your Profile</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "14px" }}>
          <div>
            <label style={labelStyle}>Full Name</label>
            <input style={{ ...inputStyle, color: "#6B8BA8" }} value={user?.fullName || ""} disabled />
          </div>
          <div>
            <label style={labelStyle}>Email Address</label>
            <input style={{ ...inputStyle, color: "#6B8BA8" }} value={user?.emailAddresses?.[0]?.emailAddress || ""} disabled />
          </div>
        </div>
        <div style={{ fontSize: "12px", color: "#6B8BA8", padding: "10px 14px", background: "#EDF4FB", borderRadius: "8px" }}>
          Name and email are managed via your account. <a href="https://accounts.clerk.dev" target="_blank" rel="noopener noreferrer" style={{ color: "#0569B8", fontWeight: 600 }}>Update here →</a>
        </div>
      </div>

      {/* Relocation Profile */}
      <div style={cardStyle}>
        <div style={{ fontSize: "13px", fontWeight: 700, color: "#083358", marginBottom: "20px", textTransform: "uppercase" as const, letterSpacing: ".1em" }}>Relocation Profile</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "20px" }}>
          <div><label style={labelStyle}>Destination</label>
            <select style={inputStyle} value={profile.destination} onChange={e => setProfile(p => ({ ...p, destination: e.target.value }))}>
              <option value="ES">🇪🇸 Spain</option>
              <option value="PT" disabled>🇵🇹 Portugal (Coming Soon)</option>
              <option value="MX" disabled>🇲🇽 Mexico (Coming Soon)</option>
            </select>
          </div>
          <div><label style={labelStyle}>Visa Type</label>
            <select style={inputStyle} value={profile.visa} onChange={e => setProfile(p => ({ ...p, visa: e.target.value }))}>
              <option value="ICT">Intra-Company Transfer (ICT)</option>
              <option value="DNV">Digital Nomad Visa (DNV)</option>
              <option value="NLV">Non-Lucrative Visa (NLV)</option>
              <option value="HQP">Highly Qualified Professional (HQP)</option>
            </select>
          </div>
          <div><label style={labelStyle}>Target Move Date</label>
            <input type="date" style={inputStyle} value={profile.moveDate} onChange={e => setProfile(p => ({ ...p, moveDate: e.target.value }))} />
          </div>
          <div><label style={labelStyle}>Relocating With</label>
            <select style={inputStyle} value={profile.relocatingWith} onChange={e => setProfile(p => ({ ...p, relocatingWith: e.target.value }))}>
              <option>Just me</option><option>Partner / Spouse</option><option>Family with children</option>
            </select>
          </div>
        </div>
        <button onClick={saveSettings} style={{ background: saved ? "#5C6E46" : "linear-gradient(135deg, #0569B8, #00B9D1)", color: "white", border: "none", padding: "12px 28px", borderRadius: "10px", fontSize: "14px", fontWeight: 600, cursor: "pointer" }}>
          {saved ? "✓ Saved!" : "Save Changes"}
        </button>
      </div>

      {/* Referral Link */}
      <div style={{ ...cardStyle, background: "linear-gradient(135deg, #083358, #0569B8)", borderColor: "transparent" }}>
        <div style={{ fontSize: "13px", fontWeight: 700, color: "rgba(200,238,245,.6)", marginBottom: "12px", textTransform: "uppercase" as const, letterSpacing: ".1em" }}>Your Referral Link</div>
        <p style={{ fontSize: "14px", color: "rgba(200,238,245,.7)", fontWeight: 300, lineHeight: 1.7, marginBottom: "20px" }}>
          Share Arryvo Base with other expats. When someone signs up or upgrades through your link, you earn a commission.
        </p>
        <div style={{ background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.15)", borderRadius: "12px", padding: "14px 16px", display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
          <div style={{ flex: 1, fontSize: "13px", color: "rgba(200,238,245,.9)", fontFamily: "monospace", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" as const }}>{referralLink}</div>
          <button onClick={copyReferral} style={{ flexShrink: 0, background: copied ? "#5C6E46" : "white", color: copied ? "white" : "#0569B8", border: "none", padding: "8px 18px", borderRadius: "8px", fontSize: "13px", fontWeight: 700, cursor: "pointer" }}>
            {copied ? "✓ Copied!" : "Copy Link"}
          </button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
          {[{ label: "Link Clicks", value: "—" },{ label: "Signups", value: "—" },{ label: "Commissions", value: "$0" }].map(stat => (
            <div key={stat.label} style={{ background: "rgba(255,255,255,.07)", borderRadius: "10px", padding: "14px", textAlign: "center" as const }}>
              <div style={{ fontFamily: "Georgia, serif", fontSize: "24px", fontWeight: 600, color: "#5DD3E3", marginBottom: "4px" }}>{stat.value}</div>
              <div style={{ fontSize: "11px", color: "rgba(200,238,245,.4)", textTransform: "uppercase" as const, letterSpacing: ".08em" }}>{stat.label}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: "14px", fontSize: "12px", color: "rgba(200,238,245,.3)", fontStyle: "italic" }}>
          Referral tracking and commission payouts activate with the Pro tier.
        </div>
      </div>

      {/* Notifications */}
      <div style={cardStyle}>
        <div style={{ fontSize: "13px", fontWeight: 700, color: "#083358", marginBottom: "20px", textTransform: "uppercase" as const, letterSpacing: ".1em" }}>Notifications</div>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "20px" }}>
          {[
            { key: "weeklyDigest", label: "Weekly Digest", desc: "Every Monday — progress summary and your next 3 tasks" },
            { key: "phaseComplete", label: "Phase Completion", desc: "When you finish all tasks in a relocation phase" },
            { key: "tipReminders", label: "Deadline Reminders", desc: "Alerts for time-sensitive tasks like Beckham Law filing" },
          ].map(pref => (
            <div key={pref.key} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", background: "#EDF4FB", borderRadius: "12px" }}>
              <div>
                <div style={{ fontSize: "14px", fontWeight: 600, color: "#083358", marginBottom: "3px" }}>{pref.label}</div>
                <div style={{ fontSize: "12px", color: "#6B8BA8" }}>{pref.desc}</div>
              </div>
              <div onClick={() => setNotifications(n => ({ ...n, [pref.key]: !n[pref.key] }))}
                style={{ width: "44px", height: "24px", borderRadius: "12px", background: notifications[pref.key] ? "#0569B8" : "#C8DFF0", cursor: "pointer", position: "relative" as const, transition: "background .2s", flexShrink: 0, marginLeft: "20px" }}>
                <div style={{ width: "18px", height: "18px", borderRadius: "50%", background: "white", position: "absolute" as const, top: "3px", left: notifications[pref.key] ? "23px" : "3px", transition: "left .2s", boxShadow: "0 1px 4px rgba(0,0,0,.2)" }} />
              </div>
            </div>
          ))}
        </div>
        <button onClick={saveSettings} style={{ background: "#EDF4FB", color: "#0569B8", border: "1px solid #C8DFF0", padding: "10px 24px", borderRadius: "10px", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}>
          {saved ? "✓ Saved!" : "Save Preferences"}
        </button>
      </div>

      {/* Subscription */}
      <div style={cardStyle}>
        <div style={{ fontSize: "13px", fontWeight: 700, color: "#083358", marginBottom: "16px", textTransform: "uppercase" as const, letterSpacing: ".1em" }}>Subscription</div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 18px", background: "#EDF4FB", borderRadius: "12px", marginBottom: "14px" }}>
          <div>
            <div style={{ fontSize: "14px", fontWeight: 600, color: "#083358", marginBottom: "3px" }}>Free Plan</div>
            <div style={{ fontSize: "12px", color: "#6B8BA8" }}>Spain · Before You Leave phase · Vendor directory view</div>
          </div>
          <span style={{ fontSize: "11px", fontWeight: 700, padding: "4px 12px", borderRadius: "20px", background: "#EDF4FB", color: "#0569B8", border: "1px solid #C8DFF0" }}>Active</span>
        </div>
        <Link href="/upgrade" style={{ display: "inline-block", background: "linear-gradient(135deg, #0569B8, #00B9D1)", color: "white", padding: "12px 28px", borderRadius: "10px", fontSize: "14px", fontWeight: 600, textDecoration: "none" }}>
          Upgrade to Pro — $19/month
        </Link>
      </div>

      {/* Danger Zone */}
      <div style={{ ...cardStyle, borderColor: "#FAEDE8", marginBottom: 0 }}>
        <div style={{ fontSize: "13px", fontWeight: 700, color: "#7A3F28", marginBottom: "16px", textTransform: "uppercase" as const, letterSpacing: ".1em" }}>Danger Zone</div>
        {cleared && <div style={{ padding: "12px 16px", background: "#EDF2E8", borderRadius: "10px", marginBottom: "14px", fontSize: "13px", color: "#5C6E46", fontWeight: 600 }}>✓ All data cleared.</div>}
        {!showDanger ? (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", background: "#FDF4F2", borderRadius: "12px" }}>
            <div>
              <div style={{ fontSize: "14px", fontWeight: 600, color: "#7A3F28", marginBottom: "3px" }}>Clear All My Data</div>
              <div style={{ fontSize: "12px", color: "#C4846A" }}>Removes all checklist progress, vendors, and documents from this device</div>
            </div>
            <button onClick={() => setShowDanger(true)} style={{ flexShrink: 0, marginLeft: "20px", background: "white", color: "#7A3F28", border: "1px solid #FAEDE8", padding: "8px 16px", borderRadius: "8px", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}>
              Clear Data
            </button>
          </div>
        ) : (
          <div style={{ padding: "16px", background: "#FDF4F2", borderRadius: "12px" }}>
            <div style={{ fontSize: "14px", fontWeight: 600, color: "#7A3F28", marginBottom: "6px" }}>Are you sure?</div>
            <div style={{ fontSize: "13px", color: "#C4846A", marginBottom: "16px", lineHeight: 1.6 }}>This permanently removes all your data from this browser. Cannot be undone.</div>
            <div style={{ display: "flex", gap: "10px" }}>
              <button onClick={() => setShowDanger(false)} style={{ flex: 1, padding: "10px", borderRadius: "8px", border: "1px solid #C8DFF0", background: "white", cursor: "pointer", fontSize: "13px", color: "#6B8BA8" }}>Cancel</button>
              <button onClick={clearAllData} style={{ flex: 1, padding: "10px", borderRadius: "8px", border: "none", background: "#7A3F28", color: "white", cursor: "pointer", fontSize: "13px", fontWeight: 700 }}>Yes, Clear Everything</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
