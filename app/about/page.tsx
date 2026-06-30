export default function AboutPage() {
  const pStyle = { fontSize: "16px", color: "#2E4A68", lineHeight: 1.85, fontWeight: 300, marginBottom: "20px" };

  return (
    <main style={{ background: "#FAFCFF" }}>
      <nav style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(250,252,255,.9)", backdropFilter: "blur(16px)", borderBottom: "1px solid #C8DFF0", padding: "18px 48px" }}>
        <a href="/" style={{ fontFamily: "Georgia, serif", fontSize: "20px", fontWeight: 600, color: "#083358", textDecoration: "none" }}>
          Arryvo<span style={{ color: "#0569B8" }}>Base</span>
        </a>
      </nav>

      <div style={{ maxWidth: "720px", margin: "0 auto", padding: "80px 24px" }}>
        <div style={{ fontSize: "11px", fontWeight: 600, letterSpacing: ".15em", textTransform: "uppercase", color: "#0569B8", marginBottom: "16px" }}>
          Our Story
        </div>
        <h1 style={{ fontFamily: "Georgia, serif", fontSize: "48px", fontWeight: 600, color: "#083358", lineHeight: 1.1, letterSpacing: "-.02em", marginBottom: "40px" }}>
          We built this because<br/>
          <em style={{ color: "#0569B8" }}>we needed it.</em>
        </h1>

        <p style={pStyle}>
          Arryvo Base started with a family — our family — going through the process of relocating abroad. We had the visa paperwork in one folder, insurance quotes in an email thread, a half-finished spreadsheet for vendor contacts, and a dozen browser tabs open trying to figure out what came next.
        </p>

        <p style={pStyle}>
          Nothing was wrong with any single piece of it. The problem was that nothing lived in one place. Every guide we found online was generic. Every checklist we built ourselves was incomplete. We kept discovering things we should have done weeks earlier, and the time pressure of a real move makes every missed step expensive — financially and emotionally.
        </p>

        <p style={pStyle}>
          So we built the tool we wished we had. A single command center that holds your checklist, your vendors, your documents, and your timeline — built around your actual visa type and destination, not a generic template.
        </p>

        <div style={{ margin: "56px 0", padding: "40px", borderRadius: "20px", background: "linear-gradient(135deg, #083358, #0569B8)" }}>
          <div style={{ fontSize: "11px", fontWeight: 600, letterSpacing: ".15em", textTransform: "uppercase", color: "rgba(200,238,245,.6)", marginBottom: "12px" }}>
            Our Mission
          </div>
          <p style={{ fontFamily: "Georgia, serif", fontSize: "24px", fontWeight: 500, color: "#C8EEF5", lineHeight: 1.5, marginBottom: "0" }}>
            To make relocating abroad feel organized instead of overwhelming — for every person who decides to build a life somewhere new.
          </p>
        </div>

        <p style={pStyle}>
          We believe relocating abroad shouldn't require a personal project manager or a finance background to get right. It should require a clear plan, the right people to call, and somewhere to keep it all — which is exactly what Arryvo Base is built to be.
        </p>

        <div style={{ marginTop: "56px", paddingTop: "40px", borderTop: "1px solid #C8DFF0" }}>
          <div style={{ fontSize: "11px", fontWeight: 600, letterSpacing: ".15em", textTransform: "uppercase", color: "#0569B8", marginBottom: "16px" }}>
            What We Value
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
            {[
              { title: "Clarity over complexity", desc: "Every feature exists to remove a decision, not add one." },
              { title: "Honesty about providers", desc: "We tell you why we recommend a vendor, including when we earn a commission." },
              { title: "Built for real timelines", desc: "Relocation deadlines are real. Our checklists reflect what actually matters when." },
              { title: "Free access matters", desc: "The core checklist will always have a free tier — moving abroad is expensive enough." },
            ].map((v) => (
              <div key={v.title}>
                <div style={{ fontFamily: "Georgia, serif", fontSize: "17px", fontWeight: 600, color: "#083358", marginBottom: "6px" }}>{v.title}</div>
                <div style={{ fontSize: "14px", color: "#6B8BA8", lineHeight: 1.6, fontWeight: 300 }}>{v.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: "56px", textAlign: "center" }}>
          <a href="/sign-up" style={{ display: "inline-block", background: "linear-gradient(135deg, #0569B8, #00B9D1)", color: "white", padding: "14px 32px", borderRadius: "12px", fontSize: "14px", fontWeight: 700, textDecoration: "none" }}>
            Start your relocation plan →
          </a>
        </div>
      </div>
    </main>
  );
}
