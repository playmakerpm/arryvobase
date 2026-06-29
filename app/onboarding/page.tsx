"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

const COUNTRIES = [
  { code: "ES", flag: "🇪🇸", name: "Spain", status: "live", desc: "ICT, Digital Nomad, Non-Lucrative, Beckham Law" },
  { code: "PT", flag: "🇵🇹", name: "Portugal", status: "soon", desc: "D8, D7, NHR 2.0 — Coming Q3 2026" },
  { code: "MX", flag: "🇲🇽", name: "Mexico", status: "soon", desc: "Temporal Residency — Coming Q4 2026" },
  { code: "TH", flag: "🇹🇭", name: "Thailand", status: "soon", desc: "LTR Visa — Coming 2027" },
  { code: "AE", flag: "🇦🇪", name: "UAE", status: "soon", desc: "Golden Visa — Coming 2027" },
];

const VISA_TYPES = [
  { code: "ICT", name: "Intra-Company Transfer", desc: "Moving with your employer to a Spanish office", icon: "🏢" },
  { code: "DNV", name: "Digital Nomad Visa", desc: "Remote worker or freelancer for non-Spanish clients", icon: "💻" },
  { code: "NLV", name: "Non-Lucrative Visa", desc: "Retiree or passive income — not working in Spain", icon: "🌴" },
  { code: "HQP", name: "Highly Qualified Professional", desc: "Senior executive or specialist role", icon: "🎯" },
  { code: "unsure", name: "Not sure yet", desc: "We will help you figure it out", icon: "🤔" },
];

const RELOCATING_WITH = [
  { value: "Just me", label: "Just me", icon: "🙋" },
  { value: "Partner / Spouse", label: "Partner / Spouse", icon: "👫" },
  { value: "Family with children", label: "Family with children", icon: "👨‍👩‍👧" },
];

export default function OnboardingPage() {
  const { user } = useUser();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [saving, setSaving] = useState(false);
  const [data, setData] = useState({
    destination: "ES",
    visa_type: "ICT",
    move_date: "",
    relocating_with: "Just me",
  });

  const handleComplete = async () => {
    if (!user) return;
    setSaving(true);
    const referralCode = `ref_${user.id.slice(-8)}_${Date.now().toString(36)}`;
    await supabase.from("users").upsert({
      clerk_user_id: user.id,
      email: user.emailAddresses?.[0]?.emailAddress || "",
      destination: data.destination,
      visa_type: data.visa_type,
      move_date: data.move_date || null,
      relocating_with: data.relocating_with,
      plan: "free",
      referral_code: referralCode,
    }, { onConflict: "clerk_user_id" });
    router.push("/dashboard");
  };

  const progress = (step / 3) * 100;

  return (
    <main style={{ minHeight: "100vh", background: "#EDF4FB", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <div style={{ padding: "24px 48px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #C8DFF0", background: "white" }}>
        <span style={{ fontFamily: "Georgia, serif", fontSize: "20px", fontWeight: 600, color: "#083358" }}>
          Arryvo<span style={{ color: "#0569B8" }}>Base</span>
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ fontSize: "12px", color: "#6B8BA8" }}>Step {step} of 3</div>
          <div style={{ width: "120px", height: "4px", background: "#C8DFF0", borderRadius: "2px", overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${progress}%`, background: "linear-gradient(90deg, #0569B8, #00B9D1)", borderRadius: "2px", transition: "width .4s ease" }} />
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "48px" }}>
        <div style={{ width: "100%", maxWidth: "640px" }}>

          {/* Step 1 — Destination */}
          {step === 1 && (
            <div>
              <div style={{ fontSize: "11px", fontWeight: 600, letterSpacing: ".15em", textTransform: "uppercase", color: "#6B8BA8", marginBottom: "12px" }}>Where are you headed?</div>
              <h1 style={{ fontFamily: "Georgia, serif", fontSize: "36px", fontWeight: 600, color: "#083358", marginBottom: "8px", lineHeight: 1.1 }}>
                Choose your destination
              </h1>
              <p style={{ fontSize: "15px", color: "#6B8BA8", fontWeight: 300, marginBottom: "32px" }}>
                We will build your personalized relocation checklist based on your destination.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "32px" }}>
                {COUNTRIES.map((country) => (
                  <div key={country.code}
                    onClick={() => country.status === "live" && setData(d => ({ ...d, destination: country.code }))}
                    style={{
                      display: "flex", alignItems: "center", gap: "16px", padding: "16px 20px",
                      borderRadius: "14px", border: `2px solid ${data.destination === country.code ? "#0569B8" : "#C8DFF0"}`,
                      background: data.destination === country.code ? "#EDF4FB" : "white",
                      cursor: country.status === "live" ? "pointer" : "default",
                      opacity: country.status === "soon" ? 0.5 : 1,
                      transition: "all .15s",
                    }}>
                    <span style={{ fontSize: "32px" }}>{country.flag}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: "Georgia, serif", fontSize: "18px", fontWeight: 600, color: "#083358", marginBottom: "2px" }}>{country.name}</div>
                      <div style={{ fontSize: "13px", color: "#6B8BA8" }}>{country.desc}</div>
                    </div>
                    {country.status === "live" ? (
                      <span style={{ fontSize: "11px", fontWeight: 700, padding: "4px 10px", borderRadius: "20px", background: "#EDF4FB", color: "#0569B8", border: "1px solid #C8DFF0" }}>● Live</span>
                    ) : (
                      <span style={{ fontSize: "11px", color: "#C8DFF0" }}>Coming soon</span>
                    )}
                  </div>
                ))}
              </div>
              <button onClick={() => setStep(2)}
                style={{ width: "100%", padding: "14px", borderRadius: "12px", border: "none", background: "linear-gradient(135deg, #0569B8, #00B9D1)", color: "white", fontSize: "15px", fontWeight: 700, cursor: "pointer" }}>
                Continue →
              </button>
            </div>
          )}

          {/* Step 2 — Visa Type */}
          {step === 2 && (
            <div>
              <div style={{ fontSize: "11px", fontWeight: 600, letterSpacing: ".15em", textTransform: "uppercase", color: "#6B8BA8", marginBottom: "12px" }}>Your visa situation</div>
              <h1 style={{ fontFamily: "Georgia, serif", fontSize: "36px", fontWeight: 600, color: "#083358", marginBottom: "8px", lineHeight: 1.1 }}>
                What brings you to Spain?
              </h1>
              <p style={{ fontSize: "15px", color: "#6B8BA8", fontWeight: 300, marginBottom: "32px" }}>
                This determines which tasks and vendors appear in your checklist.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "32px" }}>
                {VISA_TYPES.map((visa) => (
                  <div key={visa.code}
                    onClick={() => setData(d => ({ ...d, visa_type: visa.code }))}
                    style={{
                      display: "flex", alignItems: "center", gap: "16px", padding: "16px 20px",
                      borderRadius: "14px", border: `2px solid ${data.visa_type === visa.code ? "#0569B8" : "#C8DFF0"}`,
                      background: data.visa_type === visa.code ? "#EDF4FB" : "white",
                      cursor: "pointer", transition: "all .15s",
                    }}>
                    <span style={{ fontSize: "28px", width: "40px", textAlign: "center", flexShrink: 0 }}>{visa.icon}</span>
                    <div>
                      <div style={{ fontFamily: "Georgia, serif", fontSize: "17px", fontWeight: 600, color: "#083358", marginBottom: "2px" }}>{visa.name}</div>
                      <div style={{ fontSize: "13px", color: "#6B8BA8" }}>{visa.desc}</div>
                    </div>
                    {data.visa_type === visa.code && (
                      <div style={{ marginLeft: "auto", width: "22px", height: "22px", borderRadius: "50%", background: "#0569B8", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <span style={{ color: "white", fontSize: "12px", fontWeight: 700 }}>✓</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", gap: "10px" }}>
                <button onClick={() => setStep(1)}
                  style={{ flex: 1, padding: "14px", borderRadius: "12px", border: "1px solid #C8DFF0", background: "white", color: "#6B8BA8", fontSize: "15px", fontWeight: 600, cursor: "pointer" }}>
                  ← Back
                </button>
                <button onClick={() => setStep(3)}
                  style={{ flex: 3, padding: "14px", borderRadius: "12px", border: "none", background: "linear-gradient(135deg, #0569B8, #00B9D1)", color: "white", fontSize: "15px", fontWeight: 700, cursor: "pointer" }}>
                  Continue →
                </button>
              </div>
            </div>
          )}

          {/* Step 3 — Move details */}
          {step === 3 && (
            <div>
              <div style={{ fontSize: "11px", fontWeight: 600, letterSpacing: ".15em", textTransform: "uppercase", color: "#6B8BA8", marginBottom: "12px" }}>Almost there</div>
              <h1 style={{ fontFamily: "Georgia, serif", fontSize: "36px", fontWeight: 600, color: "#083358", marginBottom: "8px", lineHeight: 1.1 }}>
                Tell us about your move
              </h1>
              <p style={{ fontSize: "15px", color: "#6B8BA8", fontWeight: 300, marginBottom: "32px" }}>
                Just a couple more details to personalize your experience.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginBottom: "32px" }}>
                {/* Move date */}
                <div>
                  <label style={{ display: "block", fontSize: "11px", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "#6B8BA8", marginBottom: "8px" }}>
                    Target Move Date <span style={{ fontWeight: 400, textTransform: "none", letterSpacing: 0 }}>(approximate is fine)</span>
                  </label>
                  <input type="date" value={data.move_date}
                    onChange={e => setData(d => ({ ...d, move_date: e.target.value }))}
                    style={{ width: "100%", padding: "12px 16px", borderRadius: "10px", border: "1px solid #C8DFF0", fontSize: "15px", color: "#083358", background: "white", outline: "none", fontFamily: "inherit" }} />
                </div>

                {/* Relocating with */}
                <div>
                  <label style={{ display: "block", fontSize: "11px", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "#6B8BA8", marginBottom: "10px" }}>
                    Relocating With
                  </label>
                  <div style={{ display: "flex", gap: "10px" }}>
                    {RELOCATING_WITH.map((opt) => (
                      <div key={opt.value}
                        onClick={() => setData(d => ({ ...d, relocating_with: opt.value }))}
                        style={{
                          flex: 1, padding: "16px 12px", borderRadius: "12px", textAlign: "center",
                          border: `2px solid ${data.relocating_with === opt.value ? "#0569B8" : "#C8DFF0"}`,
                          background: data.relocating_with === opt.value ? "#EDF4FB" : "white",
                          cursor: "pointer", transition: "all .15s",
                        }}>
                        <div style={{ fontSize: "24px", marginBottom: "6px" }}>{opt.icon}</div>
                        <div style={{ fontSize: "12px", fontWeight: 600, color: data.relocating_with === opt.value ? "#0569B8" : "#083358", lineHeight: 1.3 }}>{opt.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", gap: "10px" }}>
                <button onClick={() => setStep(2)}
                  style={{ flex: 1, padding: "14px", borderRadius: "12px", border: "1px solid #C8DFF0", background: "white", color: "#6B8BA8", fontSize: "15px", fontWeight: 600, cursor: "pointer" }}>
                  ← Back
                </button>
                <button onClick={handleComplete} disabled={saving}
                  style={{ flex: 3, padding: "14px", borderRadius: "12px", border: "none", background: saving ? "#C8DFF0" : "linear-gradient(135deg, #0569B8, #00B9D1)", color: "white", fontSize: "15px", fontWeight: 700, cursor: saving ? "default" : "pointer" }}>
                  {saving ? "Setting up your account..." : "Take me to my dashboard →"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
