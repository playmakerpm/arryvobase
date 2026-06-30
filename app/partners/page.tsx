import Footer from "@/components/footer";
export default function PartnersPage() {
  const pStyle = { fontSize: "15px", color: "#2E4A68", lineHeight: 1.8, fontWeight: 300, marginBottom: "16px" };

  return (
    <main style={{ background: "#FAFCFF" }}>
      <nav style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(250,252,255,.9)", backdropFilter: "blur(16px)", borderBottom: "1px solid #C8DFF0", padding: "18px 48px" }}>
        <a href="/" style={{ fontFamily: "Georgia, serif", fontSize: "20px", fontWeight: 600, color: "#083358", textDecoration: "none" }}>
          Arryvo<span style={{ color: "#0569B8" }}>Base</span>
        </a>
      </nav>

      <div style={{ maxWidth: "720px", margin: "0 auto", padding: "80px 24px" }}>
        <div style={{ fontSize: "11px", fontWeight: 600, letterSpacing: ".15em", textTransform: "uppercase", color: "#0569B8", marginBottom: "16px" }}>
          For Vendors & Service Providers
        </div>
        <h1 style={{ fontFamily: "Georgia, serif", fontSize: "44px", fontWeight: 600, color: "#083358", lineHeight: 1.15, letterSpacing: "-.02em", marginBottom: "32px" }}>
          How we work with partners
        </h1>

        <p style={pStyle}>
          Arryvo Base connects people in the middle of relocating abroad with the lawyers, banks, insurers, and relocation specialists they need at exactly the moment they need them. Every visitor on our platform is actively planning a move — which means high intent, not browsing.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px", margin: "40px 0" }}>
          {[
            { num: "01", title: "Featured Placement", desc: "Recommended providers appear directly inside relevant checklist tasks, not buried in a directory." },
            { num: "02", title: "Qualified Referrals", desc: "Users reach you because they need your specific service right now, not someday." },
            { num: "03", title: "Transparent Tracking", desc: "Every referral is tracked. We are clear with our users when a recommendation includes a commission." },
          ].map((s) => (
            <div key={s.num} style={{ background: "white", border: "1px solid #C8DFF0", borderRadius: "16px", padding: "24px" }}>
              <div style={{ fontFamily: "Georgia, serif", fontSize: "32px", fontWeight: 700, color: "#C8DFF0", marginBottom: "10px" }}>{s.num}</div>
              <div style={{ fontFamily: "Georgia, serif", fontSize: "16px", fontWeight: 600, color: "#083358", marginBottom: "6px" }}>{s.title}</div>
              <div style={{ fontSize: "13px", color: "#6B8BA8", lineHeight: 1.6 }}>{s.desc}</div>
            </div>
          ))}
        </div>

        <h2 style={{ fontFamily: "Georgia, serif", fontSize: "26px", fontWeight: 600, color: "#083358", marginTop: "48px", marginBottom: "16px" }}>
          Who we work with
        </h2>
        <p style={pStyle}>
          We currently feature partners across immigration law, international insurance, banking, tax advisory, housing platforms, international schools, moving services, and telecom — starting with Spain, with additional destinations launching soon.
        </p>

        <h2 style={{ fontFamily: "Georgia, serif", fontSize: "26px", fontWeight: 600, color: "#083358", marginTop: "40px", marginBottom: "16px" }}>
          How compensation works
        </h2>
        <p style={pStyle}>
          We work with partners on a referral basis — typically a flat fee per converted client or a percentage of first-year revenue, depending on the service category. We are upfront with our users that some recommendations include compensation to us, because trust with our users is what makes the referrals valuable to you in the first place.
        </p>

        <div style={{ marginTop: "48px", padding: "32px", borderRadius: "16px", background: "linear-gradient(135deg, #083358, #0569B8)", textAlign: "center" }}>
          <div style={{ fontFamily: "Georgia, serif", fontSize: "22px", fontWeight: 600, color: "#C8EEF5", marginBottom: "10px" }}>
            Interested in partnering with us?
          </div>
          <p style={{ fontSize: "14px", color: "rgba(200,238,245,.7)", marginBottom: "20px" }}>
            Reach out and tell us about your services — we will follow up to discuss fit.
          </p>
          <a href="/contact" style={{ display: "inline-block", background: "white", color: "#0569B8", padding: "12px 28px", borderRadius: "10px", fontSize: "14px", fontWeight: 700, textDecoration: "none" }}>
            Contact Us →
          </a>
        </div>
      </div>
      <Footer />
    </main>
  );
}
