import Link from "next/link";

export default function Footer() {
  const linkStyle = { fontSize: "13px", color: "rgba(200,238,245,.5)", textDecoration: "none", fontWeight: 300, display: "block", marginBottom: "10px", transition: "color .15s" };
  const headingStyle = { fontSize: "11px", fontWeight: 700, letterSpacing: ".15em", textTransform: "uppercase" as const, color: "rgba(200,238,245,.3)", marginBottom: "16px" };

  return (
    <footer style={{ background: "#010810", padding: "64px 48px 40px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr", gap: "48px", marginBottom: "56px" }}>
          {/* Brand column */}
          <div>
            <Link href="/" style={{ textDecoration: "none" }}>
              <span style={{ fontFamily: "Georgia, serif", fontSize: "22px", fontWeight: 600, color: "#C8EEF5" }}>
                Arryvo<span style={{ color: "#00B9D1" }}>Base</span>
              </span>
            </Link>
            <p style={{ fontSize: "13px", color: "rgba(200,238,245,.4)", lineHeight: 1.75, fontWeight: 300, marginTop: "14px", maxWidth: "240px" }}>
              Your command center for relocating abroad. Organized checklists, vetted providers, and a document vault — all in one place.
            </p>
            <div style={{ marginTop: "20px", display: "flex", gap: "12px" }}>
              <a href="https://instagram.com/arryvobase" target="_blank" rel="noopener noreferrer"
                style={{ fontSize: "12px", padding: "6px 14px", borderRadius: "20px", border: "1px solid rgba(255,255,255,.1)", color: "rgba(200,238,245,.5)", textDecoration: "none" }}>
                Instagram
              </a>
              <a href="mailto:hello@arryvobase.com"
                style={{ fontSize: "12px", padding: "6px 14px", borderRadius: "20px", border: "1px solid rgba(255,255,255,.1)", color: "rgba(200,238,245,.5)", textDecoration: "none" }}>
                Email Us
              </a>
            </div>
          </div>

          {/* Product column */}
          <div>
            <div style={headingStyle}>Product</div>
            <Link href="/#how" style={linkStyle}>How it works</Link>
            <Link href="/#destinations" style={linkStyle}>Destinations</Link>
            <Link href="/upgrade" style={linkStyle}>Pricing</Link>
            <Link href="/faq" style={linkStyle}>FAQ</Link>
          </div>

          {/* Company column */}
          <div>
            <div style={headingStyle}>Company</div>
            <Link href="/about" style={linkStyle}>About Us</Link>
            <Link href="/contact" style={linkStyle}>Contact Us</Link>
            <Link href="/partners" style={linkStyle}>Partners</Link>
          </div>

          {/* Destinations column */}
          <div>
            <div style={headingStyle}>Destinations</div>
            <Link href="/sign-up" style={linkStyle}>🇪🇸 Spain</Link>
            <span style={{ ...linkStyle, cursor: "default", opacity: 0.4 }}>🇵🇹 Portugal</span>
            <span style={{ ...linkStyle, cursor: "default", opacity: 0.4 }}>🇲🇽 Mexico</span>
            <span style={{ ...linkStyle, cursor: "default", opacity: 0.4 }}>🇹🇭 Thailand</span>
          </div>

          {/* Legal column */}
          <div>
            <div style={headingStyle}>Legal</div>
            <Link href="/terms" style={linkStyle}>Terms of Service</Link>
            <Link href="/privacy" style={linkStyle}>Privacy Policy</Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ paddingTop: "24px", borderTop: "1px solid rgba(255,255,255,.06)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: "12px", color: "rgba(255,255,255,.2)" }}>
            © 2026 Arryvo Base. All rights reserved.
          </span>
          <span style={{ fontSize: "12px", color: "rgba(255,255,255,.15)" }}>
            Built for expats, by expats.
          </span>
        </div>
      </div>
    </footer>
  );
}
