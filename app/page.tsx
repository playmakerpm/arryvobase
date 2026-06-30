import Link from "next/link";
import Footer from "@/components/footer";

export default function HomePage() {
  return (
    <main style={{ background: "#FAFCFF" }}>
      {/* Nav */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: "rgba(250,252,255,.92)", backdropFilter: "blur(20px)", borderBottom: "1px solid #C8DFF0", padding: "18px 48px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/" style={{ fontFamily: "Georgia, serif", fontSize: "20px", fontWeight: 600, color: "#083358", textDecoration: "none" }}>
          Arryvo<span style={{ color: "#0569B8" }}>Base</span>
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
          <Link href="/about" style={{ fontSize: "13px", fontWeight: 500, color: "#2E4A68", textDecoration: "none" }}>About</Link>
          <Link href="/#how" style={{ fontSize: "13px", fontWeight: 500, color: "#2E4A68", textDecoration: "none" }}>How it works</Link>
          <Link href="/#destinations" style={{ fontSize: "13px", fontWeight: 500, color: "#2E4A68", textDecoration: "none" }}>Destinations</Link>
          <Link href="/sign-in" style={{ fontSize: "13px", fontWeight: 500, color: "#2E4A68", textDecoration: "none" }}>Sign in</Link>
          <Link href="/sign-up" style={{ fontSize: "13px", fontWeight: 600, color: "white", background: "#0569B8", padding: "10px 22px", borderRadius: "8px", textDecoration: "none" }}>
            Get started free
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ paddingTop: "140px", paddingBottom: "100px", paddingLeft: "48px", paddingRight: "48px", maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(5,105,184,.08)", border: "1px solid rgba(5,105,184,.2)", color: "#0569B8", fontSize: "11px", fontWeight: 600, letterSpacing: ".13em", textTransform: "uppercase", padding: "6px 14px", borderRadius: "20px", marginBottom: "28px" }}>
              Now live for Spain relocations
            </div>
            <h1 style={{ fontFamily: "Georgia, serif", fontSize: "68px", fontWeight: 600, lineHeight: 1.02, letterSpacing: "-.03em", color: "#083358", marginBottom: "24px" }}>
              Everything you need to{" "}
              <em style={{ fontStyle: "italic", color: "#0569B8" }}>arrive</em>,
              ready.
            </h1>
            <p style={{ fontSize: "18px", fontWeight: 300, color: "#2E4A68", lineHeight: 1.75, marginBottom: "40px", maxWidth: "440px" }}>
              Arryvo Base organizes <strong>every step of relocating abroad</strong> — visas, documents, timelines, and providers — in one calm, structured place.
            </p>
            <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
              <Link href="/sign-up" style={{ fontSize: "14px", fontWeight: 600, color: "white", background: "linear-gradient(135deg, #0569B8, #00B9D1)", padding: "14px 28px", borderRadius: "12px", textDecoration: "none" }}>
                Start free — no card needed
              </Link>
              <Link href="#how" style={{ fontSize: "14px", fontWeight: 500, color: "#0569B8", background: "#EDF4FB", padding: "14px 28px", borderRadius: "12px", textDecoration: "none", border: "1px solid #C8DFF0" }}>
                See how it works
              </Link>
            </div>
            <div style={{ marginTop: "20px", fontSize: "12px", color: "#6B8BA8" }}>
              Free to start · Upgrade anytime for $19/mo
            </div>
          </div>

          {/* App preview */}
          <div style={{ background: "#020D1C", borderRadius: "20px", overflow: "hidden", boxShadow: "0 40px 80px rgba(2,13,28,.25)" }}>
            <div style={{ background: "linear-gradient(135deg, #083358, #0569B8)", padding: "14px 20px", display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ display: "flex", gap: "6px" }}>
                <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#FF5F57" }} />
                <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#FFBD2E" }} />
                <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#28CA41" }} />
              </div>
              <div style={{ flex: 1, textAlign: "center", fontSize: "12px", fontWeight: 600, color: "rgba(255,255,255,.6)" }}>Spain Relocation · ICT Visa</div>
              <div style={{ fontSize: "11px", fontWeight: 600, color: "#5DD3E3", background: "rgba(0,185,209,.15)", padding: "3px 10px", borderRadius: "10px" }}>🇪🇸 Active</div>
            </div>
            <div style={{ padding: "20px" }}>
              <div style={{ marginBottom: "18px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                  <span style={{ fontSize: "12px", color: "rgba(200,238,245,.5)" }}>Progress</span>
                  <span style={{ fontFamily: "Georgia, serif", fontSize: "20px", fontWeight: 600, color: "#00B9D1" }}>68%</span>
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
                  <span style={{ flex: 1, fontSize: "12px", color: t.done ? "rgba(255,255,255,.25)" : "rgba(200,238,245,.8)", textDecoration: t.done ? "line-through" : "none" }}>{t.text}</span>
                  <span style={{ fontSize: "10px", fontWeight: 600, padding: "2px 8px", borderRadius: "4px", background: "rgba(5,130,202,.2)", color: "#5DD3E3" }}>{t.tag}</span>
                </div>
              ))}
              <div style={{ marginTop: "14px", paddingTop: "14px", borderTop: "1px solid rgba(255,255,255,.08)" }}>
                <div style={{ fontSize: "10px", fontWeight: 600, textTransform: "uppercase", letterSpacing: ".1em", color: "rgba(200,238,245,.25)", marginBottom: "8px" }}>My Providers</div>
                <div style={{ display: "flex", gap: "8px" }}>
                  {["Lexidy · Lawyer", "Cigna · Insurance", "Wise · Banking"].map((v) => (
                    <div key={v} style={{ fontSize: "11px", padding: "4px 10px", borderRadius: "20px", background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.1)", color: "rgba(200,238,245,.5)" }}>{v}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" style={{ padding: "96px 48px", background: "white" }}>
        <div style={{ maxWidth: "1060px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "64px" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#EDF4FB", border: "1px solid #C8DFF0", color: "#0569B8", fontSize: "11px", fontWeight: 600, letterSpacing: ".13em", textTransform: "uppercase", padding: "6px 14px", borderRadius: "20px", marginBottom: "20px" }}>
              How it works
            </div>
            <h2 style={{ fontFamily: "Georgia, serif", fontSize: "48px", fontWeight: 600, lineHeight: 1.05, letterSpacing: "-.025em", color: "#083358", marginBottom: "16px" }}>
              From overwhelmed to{" "}
              <em style={{ fontStyle: "italic", color: "#0569B8" }}>organized</em> in minutes.
            </h2>
            <p style={{ fontSize: "16px", fontWeight: 300, color: "#6B8BA8", maxWidth: "520px", margin: "0 auto", lineHeight: 1.75 }}>
              Three steps from signup to a fully structured relocation plan built around your visa and destination.
            </p>
          </div>

          {/* Steps */}
          <div style={{ position: "relative" }}>
            {/* Connector line */}
            <div style={{ position: "absolute", top: "40px", left: "calc(16.67% + 20px)", right: "calc(16.67% + 20px)", height: "1px", background: "linear-gradient(90deg, #C8DFF0, #0569B8, #C8DFF0)", zIndex: 0 }} />

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "32px", position: "relative", zIndex: 1 }}>
              {[
                {
                  n: "01",
                  icon: "🗺️",
                  color: "#0569B8",
                  bg: "#EDF4FB",
                  title: "Choose your destination",
                  desc: "Select your country and visa type. We instantly generate a personalized checklist with every step in the right order for your exact situation.",
                  tag: "Takes 30 seconds",
                },
                {
                  n: "02",
                  icon: "⚡",
                  color: "#00B9D1",
                  bg: "#E8F9FC",
                  title: "Work your command center",
                  desc: "Progress through phases. Check off tasks, upload documents, and surface the right vendors at exactly the right moment in your relocation.",
                  tag: "Track everything",
                },
                {
                  n: "03",
                  icon: "🤝",
                  color: "#083358",
                  bg: "#EDF4FB",
                  title: "Build your provider network",
                  desc: "Save lawyers, insurers, and banks to your personal directory. Track every vendor from first contact to hired — all in one place.",
                  tag: "Stay organized",
                },
              ].map((s) => (
                <div key={s.n} style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                  {/* Step circle */}
                  <div style={{ width: "80px", height: "80px", borderRadius: "50%", background: s.bg, border: `2px solid ${s.color}30`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "28px", position: "relative", boxShadow: `0 0 0 8px ${s.bg}` }}>
                    <span style={{ fontSize: "32px" }}>{s.icon}</span>
                    <div style={{ position: "absolute", top: "-6px", right: "-6px", width: "24px", height: "24px", borderRadius: "50%", background: s.color, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ fontSize: "10px", fontWeight: 800, color: "white" }}>{s.n}</span>
                    </div>
                  </div>

                  {/* Card */}
                  <div style={{ background: "white", border: "1px solid #C8DFF0", borderRadius: "16px", padding: "28px 24px", width: "100%", boxShadow: "0 4px 24px rgba(5,105,184,.06)" }}>
                    <div style={{ display: "inline-block", fontSize: "10px", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: s.color, background: s.bg, padding: "4px 10px", borderRadius: "20px", marginBottom: "14px" }}>
                      {s.tag}
                    </div>
                    <h3 style={{ fontFamily: "Georgia, serif", fontSize: "19px", fontWeight: 600, color: "#083358", marginBottom: "10px", lineHeight: 1.3 }}>
                      {s.title}
                    </h3>
                    <p style={{ fontSize: "13px", color: "#6B8BA8", lineHeight: 1.7, fontWeight: 300, margin: 0 }}>
                      {s.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom CTA */}
          <div style={{ textAlign: "center", marginTop: "56px" }}>
            <a href="/sign-up" style={{ display: "inline-block", fontSize: "14px", fontWeight: 600, color: "white", background: "linear-gradient(135deg, #0569B8, #00B9D1)", padding: "14px 32px", borderRadius: "12px", textDecoration: "none" }}>
              Start your relocation plan →
            </a>
          </div>
        </div>
      </section>

      {/* Social proof strip */}
      <section style={{ background: "#EDF4FB", padding: "48px", borderBottom: "1px solid #C8DFF0" }}>
        <div style={{ maxWidth: "1060px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "32px", textAlign: "center" }}>
          {[
            { stat: "🇪🇸", label: "Spain — Live Now" },
            { stat: "4", label: "Relocation Phases" },
            { stat: "14+", label: "Vetted Providers" },
            { stat: "Free", label: "To Get Started" },
          ].map((s) => (
            <div key={s.label}>
              <div style={{ fontFamily: "Georgia, serif", fontSize: "36px", fontWeight: 600, color: "#0569B8", marginBottom: "6px" }}>{s.stat}</div>
              <div style={{ fontSize: "13px", color: "#6B8BA8", fontWeight: 400 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Destinations */}
      <section id="destinations" style={{ padding: "96px 48px" }}>
        <div style={{ maxWidth: "1060px", margin: "0 auto" }}>
          <div style={{ fontSize: "11px", fontWeight: 600, letterSpacing: ".15em", textTransform: "uppercase", color: "#0569B8", marginBottom: "16px" }}>Destinations</div>
          <h2 style={{ fontFamily: "Georgia, serif", fontSize: "48px", fontWeight: 600, lineHeight: 1.05, letterSpacing: "-.025em", color: "#083358", marginBottom: "48px" }}>
            Where are you <em style={{ fontStyle: "italic", color: "#0569B8" }}>headed?</em>
          </h2>
          {[
            { flag: "🇪🇸", name: "Spain", status: "Live now", statusColor: "#0569B8", desc: "ICT transfers, Digital Nomad Visa, Non-Lucrative, Beckham Law. Full checklist available now.", href: "/sign-up" },
            { flag: "🇵🇹", name: "Portugal", status: "Coming Q3 2026", statusColor: "#C8DFF0", desc: "D8 Digital Nomad, D7 Passive Income, NHR 2.0 flat tax.", href: "/sign-up" },
            { flag: "🇲🇽", name: "Mexico", status: "Coming Q4 2026", statusColor: "#C8DFF0", desc: "Temporal residency, Mexico City, Oaxaca, Riviera Maya expat communities.", href: "/sign-up" },
            { flag: "🇹🇭", name: "Thailand", status: "2027 Roadmap", statusColor: "#C8DFF0", desc: "LTR visa, Chiang Mai digital nomad capital, Bangkok.", href: "/sign-up" },
          ].map((d) => (
            <Link key={d.name} href={d.href} style={{ display: "grid", gridTemplateColumns: "64px 1fr auto 40px", gap: "32px", alignItems: "center", padding: "24px 0", borderBottom: "1px solid #C8DFF0", textDecoration: "none" }}>
              <div style={{ fontSize: "40px", textAlign: "center" }}>{d.flag}</div>
              <div>
                <div style={{ fontFamily: "Georgia, serif", fontSize: "30px", fontWeight: 300, color: "#083358", marginBottom: "4px" }}>{d.name}</div>
                <div style={{ fontSize: "13px", fontStyle: "italic", color: "#6B8BA8" }}>{d.desc}</div>
              </div>
              <div style={{ fontSize: "11px", fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: d.statusColor, textAlign: "right" }}>{d.status}</div>
              <div style={{ fontSize: "18px", color: "#C8DFF0", textAlign: "right" }}>→</div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "#083358", padding: "96px 48px", textAlign: "center" }}>
        <div style={{ maxWidth: "580px", margin: "0 auto" }}>
          <h2 style={{ fontFamily: "Georgia, serif", fontSize: "48px", fontWeight: 600, lineHeight: 1.05, letterSpacing: "-.025em", color: "#C8EEF5", marginBottom: "16px" }}>
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

      <Footer />
    </main>
  );
}
