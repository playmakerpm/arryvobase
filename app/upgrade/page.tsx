"use client";

const COUNTRIES = [
  { flag: "🇪🇸", name: "Spain", status: "live", statusLabel: "Live Now", desc: "ICT transfers, Digital Nomad Visa, Non-Lucrative, Beckham Law. Full checklist available.", visas: ["ICT", "DNV", "NLV", "HQP"], color: "#0569B8", bg: "linear-gradient(135deg, #EDF4FB, #D4E9F7)" },
  { flag: "🇵🇹", name: "Portugal", status: "soon", statusLabel: "Q3 2026", desc: "D8 Digital Nomad, D7 Passive Income, NHR 2.0 flat tax — 20% for 10 years.", visas: ["D8", "D7", "D3"], color: "#6B8BA8", bg: "linear-gradient(135deg, #F4F6F8, #E8ECF0)" },
  { flag: "🇲🇽", name: "Mexico", status: "soon", statusLabel: "Q4 2026", desc: "Temporal residency, Mexico City, Oaxaca, Riviera Maya expat communities.", visas: ["Temporal", "Rentista"], color: "#6B8BA8", bg: "linear-gradient(135deg, #F4F6F8, #E8ECF0)" },
  { flag: "🇹🇭", name: "Thailand", status: "soon", statusLabel: "2027", desc: "Long-Term Resident visa, Chiang Mai digital nomad scene, Bangkok.", visas: ["LTR"], color: "#6B8BA8", bg: "linear-gradient(135deg, #F4F6F8, #E8ECF0)" },
  { flag: "🇦🇪", name: "UAE", status: "soon", statusLabel: "2027", desc: "Golden Visa, Digital Nomad Visa, zero income tax environment.", visas: ["Golden", "DNV"], color: "#6B8BA8", bg: "linear-gradient(135deg, #F4F6F8, #E8ECF0)" },
  { flag: "🇩🇪", name: "Germany", status: "soon", statusLabel: "TBD", desc: "EU Blue Card, Freelancer Visa, Opportunity Card for skilled workers.", visas: ["Blue Card", "Freelancer"], color: "#6B8BA8", bg: "linear-gradient(135deg, #F4F6F8, #E8ECF0)" },
];

const FEATURES = [
  { free: true,  pro: true,  label: "Spain destination" },
  { free: false, pro: true,  label: "All countries as they launch" },
  { free: true,  pro: true,  label: "Task tracking" },
  { free: false, pro: true,  label: "Full checklist — all phases" },
  { free: true,  pro: true,  label: "Vendor directory access" },
  { free: false, pro: true,  label: "Save & track vendors" },
  { free: false, pro: true,  label: "Document vault" },
  { free: false, pro: true,  label: "Weekly digest emails" },
  { free: false, pro: true,  label: "Referral link generation" },
  { free: true,  pro: true,  label: "Referral commissions" },
];

export default function UpgradePage() {
  const handleUpgrade = async () => {
    const res = await fetch("/api/stripe/checkout", { method: "POST" });
    const data = await res.json();
    if (data.url) window.location.href = data.url;
  };

  return (
    <div style={{ padding: "40px 48px", maxWidth: "1100px", margin: "0 auto" }}>
      {/* Header */}
      <div style={{ marginBottom: "40px" }}>
        <div style={{ fontSize: "11px", fontWeight: 600, letterSpacing: ".15em", textTransform: "uppercase", color: "#6B8BA8", marginBottom: "8px" }}>Pro Plan</div>
        <h1 style={{ fontFamily: "Georgia, serif", fontSize: "48px", fontWeight: 600, color: "#083358", letterSpacing: "-.025em", lineHeight: 1.05, marginBottom: "12px" }}>
          Your full relocation<br/>command center.
        </h1>
        <p style={{ fontSize: "16px", fontWeight: 300, color: "#2E4A68", lineHeight: 1.7, maxWidth: "520px" }}>
          Unlock every country, every phase, and every feature — including secure document storage and your personal vendor CRM.
        </p>
      </div>

      {/* Countries grid */}
      <div style={{ marginBottom: "40px" }}>
        <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: ".16em", textTransform: "uppercase", color: "#6B8BA8", marginBottom: "16px" }}>Destinations</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "14px" }}>
          {COUNTRIES.map((country) => (
            <div key={country.name} style={{ background: country.bg, border: `1px solid ${country.status === "live" ? "#C8DFF0" : "#E8ECF0"}`, borderRadius: "16px", padding: "22px", display: "flex", flexDirection: "column", gap: "12px", minHeight: "160px", position: "relative", overflow: "hidden" }}>
              {country.status === "live" && (
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: "linear-gradient(90deg, #0569B8, #00B9D1)" }} />
              )}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: "32px" }}>{country.flag}</span>
                <span style={{ fontSize: "11px", fontWeight: 700, padding: "4px 10px", borderRadius: "20px", background: country.status === "live" ? "#EDF4FB" : "rgba(200,223,240,.3)", color: country.status === "live" ? "#0569B8" : "#6B8BA8" }}>
                  {country.status === "live" ? "● Live Now" : `⏳ ${country.statusLabel}`}
                </span>
              </div>
              <div>
                <div style={{ fontFamily: "Georgia, serif", fontSize: "20px", fontWeight: 600, color: country.status === "live" ? "#083358" : "#6B8BA8", marginBottom: "4px" }}>{country.name}</div>
                <div style={{ fontSize: "12px", color: country.status === "live" ? "#2E4A68" : "#C8DFF0", lineHeight: 1.55, fontWeight: 300 }}>{country.desc}</div>
              </div>
              <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginTop: "auto" }}>
                {country.visas.map(v => (
                  <span key={v} style={{ fontSize: "10px", fontWeight: 600, padding: "3px 8px", borderRadius: "20px", background: country.status === "live" ? "rgba(5,105,184,.1)" : "rgba(200,223,240,.3)", color: country.status === "live" ? "#0569B8" : "#C8DFF0" }}>{v}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing comparison */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "32px" }}>
        {/* Free */}
        <div style={{ background: "white", border: "1px solid #C8DFF0", borderRadius: "20px", padding: "28px" }}>
          <div style={{ marginBottom: "20px" }}>
            <div style={{ fontSize: "13px", fontWeight: 600, color: "#6B8BA8", marginBottom: "6px" }}>Free</div>
            <div style={{ fontFamily: "Georgia, serif", fontSize: "40px", fontWeight: 600, color: "#083358", lineHeight: 1 }}>$0</div>
            <div style={{ fontSize: "13px", color: "#6B8BA8", marginTop: "4px" }}>Forever free</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "24px" }}>
            {FEATURES.map((f) => (
              <div key={f.label} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ width: "18px", height: "18px", borderRadius: "50%", flexShrink: 0, background: f.free ? "#EDF4FB" : "#F4F6F8", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: "10px", color: f.free ? "#0569B8" : "#C8DFF0" }}>{f.free ? "✓" : "—"}</span>
                </div>
                <span style={{ fontSize: "13px", color: f.free ? "#083358" : "#C8DFF0", fontWeight: f.free ? 500 : 300 }}>{f.label}</span>
              </div>
            ))}
          </div>
          <div style={{ padding: "12px", textAlign: "center", borderRadius: "10px", background: "#EDF4FB", fontSize: "13px", color: "#6B8BA8", fontWeight: 600 }}>
            Current Plan
          </div>
        </div>

        {/* Pro */}
        <div style={{ background: "linear-gradient(145deg, #083358, #0569B8)", borderRadius: "20px", padding: "28px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: "20px", right: "20px", background: "#F5A623", color: "white", fontSize: "10px", fontWeight: 800, padding: "4px 12px", borderRadius: "20px" }}>Most Popular</div>
          <div style={{ marginBottom: "20px" }}>
            <div style={{ fontSize: "13px", fontWeight: 600, color: "rgba(200,238,245,.6)", marginBottom: "6px" }}>Pro</div>
            <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
              <div style={{ fontFamily: "Georgia, serif", fontSize: "40px", fontWeight: 600, color: "white", lineHeight: 1 }}>$19</div>
              <div style={{ fontSize: "13px", color: "rgba(200,238,245,.6)" }}>/month</div>
            </div>
            <div style={{ fontSize: "13px", color: "rgba(200,238,245,.5)", marginTop: "4px" }}>Cancel anytime</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "24px" }}>
            {FEATURES.map((f) => (
              <div key={f.label} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ width: "18px", height: "18px", borderRadius: "50%", flexShrink: 0, background: "rgba(93,211,227,.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: "10px", color: "#5DD3E3" }}>✓</span>
                </div>
                <span style={{ fontSize: "13px", color: "rgba(200,238,245,.85)", fontWeight: 500 }}>{f.label}</span>
              </div>
            ))}
          </div>
          <button onClick={handleUpgrade}
            style={{ width: "100%", padding: "14px", borderRadius: "10px", border: "none", background: "white", color: "#0569B8", cursor: "pointer", fontSize: "14px", fontWeight: 700 }}>
            Upgrade Now →
          </button>
          <div style={{ textAlign: "center", marginTop: "10px", fontSize: "11px", color: "rgba(200,238,245,.35)" }}>
            Secure checkout via Stripe
          </div>
        </div>
      </div>

      {/* Bottom note */}
      <div style={{ textAlign: "center", padding: "20px", borderRadius: "14px", background: "#EDF4FB" }}>
        <div style={{ fontSize: "13px", color: "#2E4A68", lineHeight: 1.7 }}>
          New countries are added automatically to your Pro account as they launch — no additional cost. 🌍
        </div>
      </div>
    </div>
  );
}
