import Link from "next/link";

export default function HomePage() {
  return (
    <main style={{ background: "#FAFCFF" }}>
      {/* Nav */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: "rgba(250,252,255,.9)", backdropFilter: "blur(16px)", borderBottom: "1px solid #C8DFF0", padding: "18px 48px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/" style={{ fontFamily: "var(--font-fraunces), Georgia, serif", fontSize: "20px", fontWeight: 600, color: "#083358", textDecoration: "none" }}>
          Arryvo<span style={{ color: "#0569B8" }}>Base</span>
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
          <Link href="#how" style={{ fontSize: "13px", fontWeight: 500, color: "#2E4A68", textDecoration: "none" }}>How it works</Link>
          <Link href="#destinations" style={{ fontSize: "13px", fontWeight: 500, color: "#2E4A68", textDecoration: "none" }}>Destinations</Link>
          <Link href="/sign-in" style={{ fontSize: "13px", fontWeight: 500, color: "#2E4A68", textDecoration: "none" }}>Sign in</Link>
          <Link href="/sign-up" style={{ fontSize: "13px", fontWeight: 600, color: "white", background: "#0569B8", padding: "10px 22px", borderRadius: "8px", textDecoration: "none" }}>
            Get started free
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ paddingTop: "140px", paddingBottom: "80px", paddingLeft: "48px", paddingRight: "48px", maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(5,130,202,.08)", border: "1px solid rgba(5,130,202,.2)", color: "#0569B8", fontSize: "11px", fontWeight: 600, letterSpacing: ".13em", textTransform: "uppercase", padding: "6px 14px", borderRadius: "20px", marginBottom: "28px" }}>
              Your command center for life abroad
            </div>
            <h1 style={{ fontFamily: "var(--font-fraunces), Georgia, serif", fontSize: "72px", fontWeight: 600, lineHeight: 1.02, letterSpacing: "-.03em", color: "#083358", marginBottom: "24px" }}>
              Everything you need to{" "}
              <em style={{ fontStyle: "italic", color: "#0569B8" }}>arrive</em>,
              ready.
            </h1>
            <p style={{ fontSize: "18px", fontWeight: 300, color: "#2E4A68", lineHeight: 1.75, marginBottom: "40px", maxWidth: "440px" }}>
              Arryvo Base organizes <strong>every step of relocating abroad</strong> — visas, documents, timelines, and providers — in one calm, structured place.
            </p>
            <div style={{ display: "flex", gap: "12px" }}>
              <Link href="/sign-up" style={{ fontSize: "14px", fontWeight: 600, color: "white", background: "linear-gradient(135deg, #0569B8, #00B9D1)", padding: "14px 28px", borderRadius: "12px", textDecoration: "none" }}>
                Start free — no card needed
              </Link>
              <Link href="#how" style={{ fontSize: "14px", fontWeight: 500, color: "#0569B8", background: "#EDF4FB", padding: "14px 28px", borderRadius: "12px", textDecoration: "none", border: "1px solid #C8DFF0" }}>
                See how it works
              </Link>
            </div>
            <div style={{ marginTop: "20px", fontSize: "12px", color: "#6B8BA8" }}>
              Free forever · Upgrade anytime for $19/mo
            </div>
          </div>

          {/* App preview card */}
          <div style={{ background: "#020D1C", borderRadius: "20px", overflow: "hidden", boxShadow: "0 40px 80px rgba(2,13,28,.3)" }}>
            <div style={{ background: "linear-gradient(135deg, #083358, #0569B8)", padding: "16px 20px", display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ display: "flex", gap: "6px" }}>
                <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#FF5F57" }} />
                <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#FFBD2E" }} />
                <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#28CA41" }} />
              </div>
              <div style={{ flex: 1, textAlign: "center", fontSize: "12px", fontWeight: 600, color: "rgba(255,255,255,.7)" }}>
                Spain Relocation · ICT Visa
              </div>
              <div style={{ fontSize: "11px", fontWeight: 600, color: "#5DD3E3", background: "rgba(0,185,209,.15)", padding: "3px 10px", borderRadius: "10px" }}>
                🇪🇸 Active
              </div>
            </div>
            <div style={{ padding: "20px" }}>
              <div style={{ marginBottom: "18px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                  <span style={{ fontSize: "12px", color: "rgba(200,238,245,.6)" }}>Progress</span>
                  <span style={{ fontFamily: "var(--font-fraunces), Georgia, serif", fontSize: "20px", fontWeight: 600, color: "#00B9D1" }}>68%</span>
                </div>
                <div style={{ height: "6px", background: "rgba(255,255,255,.08)", borderRadius: "3px", overflow: "hidden" }}>
                  <div style={{ height: "100%", width: "68%", background: "linear-gradient(90deg, #0569B8, #00B9D1)", borderRadius: "3px" }} />
                </div>
              </div>
              {[
                { done: true, text: "Apply for NIE number", tag: "Legal" },
                { done: true, text: "Open Santander account", tag: "Banking" },
                { done: false, text: "Select health insurance", tag: "Health" },
                { done: false, text: "Enroll children in school", tag: "School" },
              ].map((t, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 12px", background: "rgba(255,255,255,.04)", borderRadius: "8px", marginBottom: "6px" }}>
                  <div style={{ width: "18px", height: "18px", borderRadius: "50%", background: t.done ? "#00B9D1" : "transparent", border: t.done ? "none" : "1.5px solid rgba(255,255,255,.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {t.done && <span style={{ color: "#020D1C", fontSize: "10px", fontWeight: 700 }}>✓</span>}
                  </div>
                  <span style={{ flex: 1, fontSize: "12px", color: t.done ? "rgba(255,255,255,.3)" : "rgba(200,238,245,.8)", textDecoration: t.done ? "line-through" : "none" }}>{t.text}</span>
                  <span style={{ fontSize: "10px", fontWeight: 600, padding: "2px 8px", borderRadius: "4px", background: "rgba(5,130,202,.2)", color: "#5DD3E3" }}>{t.tag}</span>
                </div>
              ))}
              <div style={{ marginTop: "14px", paddingTop: "14px", borderTop: "1px solid rgba(255,255,255,.08)" }}>
                <div style={{ fontSize: "10px", fontWeight: 600, textTransform: "uppercase", letterSpacing: ".1em", color: "rgba(200,238,245,.3)", marginBottom: "8px" }}>My Providers</div>
                <div style={{ display: "flex", gap: "8px" }}>
                  {["Lexidy · Lawyer", "Cigna · Insurance", "Wise · Banking"].map((v) => (
                    <div key={v} style={{ fontSize: "11px", padding: "4px 10px", borderRadius: "20px", background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.1)", color: "rgba(200,238,245,.6)" }}>{v}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" style={{ background: "#020D1C", padding: "96px 48px" }}>
        <div style={{ maxWidth: "1060px", margin: "0 auto" }}>
          <div style={{ fontSize: "11px", fontWeight: 600, letterSpacing: ".15em", textTransform: "uppercase", color: "#00B9D1", marginBottom: "16px" }}>How Arryvo Base works</div>
          <h2 style={{ fontFamily: "var(--font-fraunces), Georgia, serif", fontSize: "52px", fontWeight: 600, lineHeight: 1.05, letterSpacing: "-.025em", color: "#C8EEF5", marginBottom: "16px" }}>
            From overwhelmed to{" "}
            <em style={{ fontStyle: "italic", color: "#5DD3E3" }}>organized</em> in minutes.
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1px", marginTop: "56px", background: "rgba(255,255,255,.06)", borderRadius: "16px", overflow: "hidden" }}>
            {[
              { n: "01", icon: "🗺️", title: "Choose your destination", desc: "Select your country and visa type. Arryvo Base instantly builds a personalized checklist — every step in the right order for your situation." },
              { n: "02", icon: "⚡", title: "Work your command center", desc: "Progress through phases. Save documents, mark tasks done, and surface the right vendors exactly when you need them." },
              { n: "03", icon: "🤝", title: "Build your provider network", desc: "Save vetted lawyers, insurers, and banks to your personal directory. Track every vendor from first contact to hired." },
            ].map((s) => (
              <div key={s.n} style={{ padding: "44px 34px", background: "rgba(255,255,255,.02)" }}>
                <div style={{ fontFamily: "var(--font-fraunces), Georgia, serif", fontSize: "72px", fontWeight: 700, color: "rgba(0,185,209,.08)", lineHeight: 1, marginBottom: "20px" }}>{s.n}</div>
                <div style={{ fontSize: "24px", marginBottom: "16px" }}>{s.icon}</div>
                <div style={{ fontSize: "17px", fontWeight: 600, color: "#C8EEF5", marginBottom: "10px" }}>{s.title}</div>
                <div style={{ fontSize: "13px", fontWeight: 300, color: "rgba(200,238,245,.45)", lineHeight: 1.75 }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Destinations */}
      <section id="destinations" style={{ padding: "96px 48px" }}>
        <div style={{ maxWidth: "1060px", margin: "0 auto" }}>
          <div style={{ fontSize: "11px", fontWeight: 600, letterSpacing: ".15em", textTransform: "uppercase", color: "#0569B8", marginBottom: "16px" }}>Destinations</div>
          <h2 style={{ fontFamily: "var(--font-fraunces), Georgia, serif", fontSize: "52px", fontWeight: 600, lineHeight: 1.05, letterSpacing: "-.025em", color: "#083358", marginBottom: "48px" }}>
            Where are you <em style={{ fontStyle: "italic", color: "#0569B8" }}>headed?</em>
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {[
              { flag: "🇪🇸", name: "Spain", status: "Live now", statusColor: "#6EE7B7", desc: "ICT transfers, Digital Nomad Visa, Non-Lucrative, Beckham Law. Full checklist available now.", href: "/sign-up" },
              { flag: "🇵🇹", name: "Portugal", status: "Coming Q3 2026", statusColor: "rgba(108,135,168,.6)", desc: "D8 Digital Nomad, D7 Passive Income, NHR 2.0 flat tax — 20% for 10 years.", href: "/sign-up" },
              { flag: "🇲🇽", name: "Mexico", status: "Coming Q4 2026", statusColor: "rgba(108,135,168,.6)", desc: "Temporal residency, Mexico City, Oaxaca, Riviera Maya expat communities.", href: "/sign-up" },
              { flag: "🇹🇭", name: "Thailand", status: "2027 Roadmap", statusColor: "rgba(108,135,168,.6)", desc: "LTR visa, Chiang Mai digital nomad capital, Bangkok.", href: "/sign-up" },
            ].map((d, i) => (
              <Link key={d.name} href={d.href} style={{ display: "grid", gridTemplateColumns: "64px 1fr auto 40px", gap: "32px", alignItems: "center", padding: "24px 0", borderBottom: "1px solid #C8DFF0", textDecoration: "none", transition: "padding-left .2s" }}>
                <div style={{ fontSize: "40px", textAlign: "center" }}>{d.flag}</div>
                <div>
                  <div style={{ fontFamily: "var(--font-fraunces), Georgia, serif", fontSize: "32px", fontWeight: 300, color: "#083358", marginBottom: "4px" }}>{d.name}</div>
                  <div style={{ fontSize: "13px", fontStyle: "italic", color: "#6B8BA8" }}>{d.desc}</div>
                </div>
                <div style={{ fontSize: "11px", fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: d.statusColor, textAlign: "right" }}>{d.status}</div>
                <div style={{ fontSize: "18px", color: "#C8DFF0", textAlign: "right" }}>→</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "#083358", padding: "96px 48px", textAlign: "center" }}>
        <div style={{ maxWidth: "580px", margin: "0 auto" }}>
          <h2 style={{ fontFamily: "var(--font-fraunces), Georgia, serif", fontSize: "52px", fontWeight: 600, lineHeight: 1.05, letterSpacing: "-.025em", color: "#C8EEF5", marginBottom: "16px" }}>
            Your next chapter starts <em style={{ color: "#5DD3E3" }}>organized.</em>
          </h2>
          <p style={{ fontSize: "16px", fontWeight: 300, color: "rgba(200,238,245,.5)", marginBottom: "36px", lineHeight: 1.75 }}>
            Free to start. Upgrade when you need more. Spain checklist available now.
          </p>
          <Link href="/sign-up" style={{ display: "inline-block", fontSize: "15px", fontWeight: 600, color: "white", background: "linear-gradient(135deg, #0569B8, #00B9D1)", padding: "16px 36px", borderRadius: "12px", textDecoration: "none" }}>
            Create your free account →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: "#010810", padding: "40px 48px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontFamily: "var(--font-fraunces), Georgia, serif", fontSize: "18px", fontWeight: 600, color: "rgba(200,238,245,.5)" }}>
          Arryvo<span style={{ color: "#0569B8" }}>Base</span>
        </span>
        <span style={{ fontSize: "12px", color: "rgba(255,255,255,.2)" }}>© 2026 Arryvo Base. All rights reserved.</span>
      </footer>
    </main>
  );
}
