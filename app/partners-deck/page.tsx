export default function PartnersDeckPage() {
  const metrics = [
    { icon: "⚖️", label: "Immigration law firms", value: "€2,500 – €6,000", sub: "avg. per client" },
    { icon: "🛡️", label: "International health insurance", value: "$4,000 – $8,000", sub: "avg. annual premium" },
    { icon: "📊", label: "Tax advisory (Beckham Law, FBAR)", value: "€1,500 – €4,000", sub: "avg. first-year engagement" },
    { icon: "🎓", label: "International schools", value: "$15,000 – $35,000", sub: "avg. annual tuition" },
    { icon: "📦", label: "Moving & relocation services", value: "$8,000 – $20,000", sub: "avg. international move" },
    { icon: "🏠", label: "Housing platforms", value: "€1,200 – €3,600", sub: "avg. first booking value" },
  ];

  const users = [
    { icon: "🏢", title: "Corporate transferees", desc: "ICT and HQP visa holders relocating with employers" },
    { icon: "💻", title: "Digital nomads", desc: "Remote workers applying for digital nomad visas" },
    { icon: "🌴", title: "Retirees", desc: "Passive income earners on non-lucrative visas" },
    { icon: "👨‍👩‍👧", title: "Families", desc: "Households navigating school, housing, and healthcare" },
  ];

  const steps = [
    {
      n: "1",
      title: "Your firm is featured at the right moment",
      desc: "Featured partners appear both in our directory and directly inside the checklist — at the exact task where a user needs your service. A law firm surfaces when a user reaches visa applications. An insurer surfaces when they reach health coverage. The placement is contextual, not just a listing.",
    },
    {
      n: "2",
      title: "Referrals arrive with context",
      desc: "Users who reach out to you through Arryvo Base already know their visa type, destination, and timeline. You are not starting from zero. The qualification happens before they contact you.",
    },
    {
      n: "3",
      title: "Simple, transparent referral arrangement",
      desc: "We work on a flat fee per converted client or a percentage of first-year revenue — whatever fits your existing structure. All arrangements are documented in writing. We can also integrate with your existing affiliate program if you have one.",
    },
  ];

  const cardStyle = { background: "white", border: "1px solid #C8DFF0", borderRadius: "10px", padding: "12px 14px" };
  const sectionLabel = { fontSize: "11px", fontWeight: 600, letterSpacing: ".15em", textTransform: "uppercase" as const, color: "#0569B8", marginBottom: "16px", display: "block" };

  return (
    <main style={{ background: "#EDF4FB", minHeight: "100vh", padding: "48px 24px", fontFamily: "Georgia, serif" }}>
      <div style={{ maxWidth: "760px", margin: "0 auto" }}>

        {/* Nav */}
        <div style={{ marginBottom: "32px" }}>
          <a href="/" style={{ fontFamily: "Georgia, serif", fontSize: "18px", fontWeight: 600, color: "#083358", textDecoration: "none" }}>
            Arryvo<span style={{ color: "#0569B8" }}>Base</span>
          </a>
        </div>

        {/* Header card */}
        <div style={{ background: "#020D1C", borderRadius: "16px 16px 0 0", padding: "40px 48px 36px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "32px" }}>
            <div>
              <div style={{ fontSize: "11px", fontWeight: 600, letterSpacing: ".18em", textTransform: "uppercase", color: "rgba(200,238,245,.4)", marginBottom: "10px" }}>Partner Information</div>
              <div style={{ fontSize: "28px", fontWeight: 600, color: "#C8EEF5" }}>
                Arryvo<span style={{ color: "#00B9D1" }}>Base</span>
              </div>
              <div style={{ fontSize: "13px", color: "rgba(200,238,245,.4)", marginTop: "4px", fontWeight: 300 }}>arryvobase.com</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: "11px", fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase", color: "rgba(200,238,245,.35)", marginBottom: "10px" }}>Launching in</div>
              <div style={{ fontSize: "15px", color: "rgba(200,238,245,.8)", lineHeight: 1.7 }}>🇪🇸 Spain &nbsp;·&nbsp; 🇵🇹 Portugal</div>
              <div style={{ fontSize: "15px", color: "rgba(200,238,245,.8)", lineHeight: 1.7 }}>🇲🇽 Mexico &nbsp;·&nbsp; 🇹🇭 Thailand</div>
            </div>
          </div>
          <div style={{ paddingTop: "28px", borderTop: "1px solid rgba(255,255,255,.07)" }}>
            <div style={{ fontSize: "32px", fontWeight: 600, color: "white", lineHeight: 1.2, letterSpacing: "-.02em" }}>
              Your next clients are already<br />planning their move abroad.<br />
              <em style={{ color: "#5DD3E3" }}>We help them find you.</em>
            </div>
          </div>
        </div>

        {/* What we are */}
        <div style={{ background: "white", borderLeft: "1px solid #E0E8F0", borderRight: "1px solid #E0E8F0", padding: "32px 48px" }}>
          <span style={sectionLabel}>What we are</span>
          <p style={{ fontSize: "15px", color: "#2E4A68", lineHeight: 1.8, margin: "0 0 16px", fontWeight: 300 }}>
            Arryvo Base is a relocation command center for expats, digital nomads, corporate transferees, and retirees moving abroad. We give every user a personalized checklist, a curated provider directory, a vendor tracking tool, and a document vault — organized around their specific visa type and destination country.
          </p>
          <p style={{ fontSize: "15px", color: "#2E4A68", lineHeight: 1.8, margin: 0, fontWeight: 300 }}>
            Every person on our platform has self-selected as someone actively planning or executing an international relocation. They are not browsing casually. They are making decisions — on lawyers, insurance, banking, housing, and schools — right now.
          </p>
        </div>

        {/* Market metrics */}
        <div style={{ background: "#020D1C", borderLeft: "1px solid #0A2A48", borderRight: "1px solid #0A2A48", padding: "28px 48px" }}>
          <span style={{ ...sectionLabel, color: "rgba(200,238,245,.4)" }}>The expat opportunity</span>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "14px" }}>
            {[
              { stat: "9M+", desc: "US citizens living abroad right now" },
              { stat: "$97K", desc: "Average corporate relocation package value" },
              { stat: "68%", desc: "Of expats say finding trusted providers is the hardest part" },
            ].map((m) => (
              <div key={m.stat} style={{ textAlign: "center", padding: "20px 12px", background: "rgba(255,255,255,.04)", borderRadius: "12px", border: "1px solid rgba(255,255,255,.06)" }}>
                <div style={{ fontSize: "28px", fontWeight: 600, color: "#5DD3E3", marginBottom: "8px" }}>{m.stat}</div>
                <div style={{ fontSize: "12px", color: "rgba(200,238,245,.45)", lineHeight: 1.55, fontWeight: 300 }}>{m.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Referral value */}
        <div style={{ background: "#EDF4FB", borderLeft: "1px solid #C8DFF0", borderRight: "1px solid #C8DFF0", borderBottom: "1px solid #C8DFF0", padding: "28px 48px" }}>
          <span style={sectionLabel}>What a referred client is worth — by category</span>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "14px" }}>
            {metrics.map((m) => (
              <div key={m.label} style={{ display: "grid", gridTemplateColumns: "28px 1fr auto auto", gap: "12px", alignItems: "center", padding: "12px 16px", background: "white", borderRadius: "10px", border: "1px solid #C8DFF0" }}>
                <span style={{ fontSize: "18px" }}>{m.icon}</span>
                <span style={{ fontSize: "13px", fontWeight: 600, color: "#083358" }}>{m.label}</span>
                <span style={{ fontSize: "13px", color: "#0569B8", fontWeight: 600, textAlign: "right" }}>{m.value}</span>
                <span style={{ fontSize: "11px", color: "#6B8BA8", textAlign: "right", whiteSpace: "nowrap" }}>{m.sub}</span>
              </div>
            ))}
          </div>
          <div style={{ fontSize: "11px", color: "#6B8BA8", fontWeight: 300, lineHeight: 1.6 }}>
            Sources: industry averages across EU expat relocation market, 2024–2025. Individual client value will vary by service scope and destination.
          </div>
        </div>

        {/* How it works */}
        <div style={{ background: "white", borderLeft: "1px solid #E0E8F0", borderRight: "1px solid #E0E8F0", padding: "28px 48px" }}>
          <span style={sectionLabel}>How partnerships work</span>
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {steps.map((s) => (
              <div key={s.n} style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                <div style={{ width: "30px", height: "30px", borderRadius: "50%", background: "#EDF4FB", border: "1px solid #C8DFF0", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: "13px", fontWeight: 600, color: "#0569B8" }}>{s.n}</div>
                <div>
                  <div style={{ fontSize: "15px", fontWeight: 600, color: "#083358", marginBottom: "6px" }}>{s.title}</div>
                  <div style={{ fontSize: "13px", color: "#6B8BA8", lineHeight: 1.7, fontWeight: 300 }}>{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Who uses it */}
        <div style={{ background: "#EDF4FB", border: "1px solid #C8DFF0", padding: "28px 48px" }}>
          <span style={sectionLabel}>Our users</span>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
            {users.map((u) => (
              <div key={u.title} style={cardStyle}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{ fontSize: "20px" }}>{u.icon}</span>
                  <div>
                    <div style={{ fontSize: "13px", fontWeight: 600, color: "#083358", marginBottom: "3px" }}>{u.title}</div>
                    <div style={{ fontSize: "12px", color: "#6B8BA8", fontWeight: 300 }}>{u.desc}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div style={{ background: "#020D1C", borderRadius: "0 0 16px 16px", padding: "28px 48px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: "18px", fontWeight: 600, color: "#C8EEF5", marginBottom: "4px" }}>
              Arryvo<span style={{ color: "#00B9D1" }}>Base</span>
            </div>
            <div style={{ fontSize: "12px", color: "rgba(200,238,245,.35)", fontWeight: 300 }}>arryvobase.com</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "12px", color: "rgba(200,238,245,.35)", fontWeight: 300, marginBottom: "4px" }}>Questions or to discuss a partnership</div>
            <a href="mailto:arryvobase@gmail.com" style={{ fontSize: "14px", color: "#00B9D1", fontWeight: 600, textDecoration: "none" }}>arryvobase@gmail.com</a>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: "11px", color: "rgba(200,238,245,.25)", fontWeight: 300 }}>Built for expats, by expats.</div>
          </div>
        </div>

      </div>
    </main>
  );
}
