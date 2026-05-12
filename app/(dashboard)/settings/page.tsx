import { UserProfile } from "@clerk/nextjs";

export default function SettingsPage() {
  return (
    <div className="p-8 max-w-3xl mx-auto">
      <div className="mb-8">
        <div style={{ fontSize: "11px", fontWeight: 600, letterSpacing: ".15em", textTransform: "uppercase", color: "#6B8BA8", marginBottom: "8px" }}>Account</div>
        <h1 style={{ fontFamily: "Georgia, serif", fontSize: "40px", fontWeight: 600, color: "#083358", letterSpacing: "-.02em", lineHeight: 1.1 }}>Settings</h1>
      </div>
      <div style={{ background: "white", borderRadius: "16px", border: "1px solid #C8DFF0", padding: "32px", marginBottom: "24px" }}>
        <div style={{ fontSize: "13px", fontWeight: 600, color: "#083358", marginBottom: "20px", textTransform: "uppercase", letterSpacing: ".1em" }}>Relocation Profile</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          <div>
            <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "#6B8BA8", letterSpacing: ".12em", textTransform: "uppercase", marginBottom: "8px" }}>Destination</label>
            <select style={{ width: "100%", padding: "12px 16px", borderRadius: "10px", border: "1px solid #C8DFF0", fontSize: "14px", color: "#083358", background: "#EDF4FB" }}>
              <option value="ES">🇪🇸 Spain</option>
              <option value="PT" disabled>🇵🇹 Portugal (Coming Soon)</option>
              <option value="MX" disabled>🇲🇽 Mexico (Coming Soon)</option>
            </select>
          </div>
          <div>
            <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "#6B8BA8", letterSpacing: ".12em", textTransform: "uppercase", marginBottom: "8px" }}>Visa Type</label>
            <select style={{ width: "100%", padding: "12px 16px", borderRadius: "10px", border: "1px solid #C8DFF0", fontSize: "14px", color: "#083358", background: "#EDF4FB" }}>
              <option value="ICT">Intra-Company Transfer (ICT)</option>
              <option value="DNV">Digital Nomad Visa (DNV)</option>
              <option value="NLV">Non-Lucrative Visa (NLV)</option>
              <option value="HQP">Highly Qualified Professional (HQP)</option>
            </select>
          </div>
          <div>
            <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "#6B8BA8", letterSpacing: ".12em", textTransform: "uppercase", marginBottom: "8px" }}>Target Move Date</label>
            <input type="date" style={{ width: "100%", padding: "12px 16px", borderRadius: "10px", border: "1px solid #C8DFF0", fontSize: "14px", color: "#083358", background: "#EDF4FB" }} />
          </div>
          <div>
            <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "#6B8BA8", letterSpacing: ".12em", textTransform: "uppercase", marginBottom: "8px" }}>Relocating With</label>
            <select style={{ width: "100%", padding: "12px 16px", borderRadius: "10px", border: "1px solid #C8DFF0", fontSize: "14px", color: "#083358", background: "#EDF4FB" }}>
              <option>Just me</option>
              <option>Partner / Spouse</option>
              <option>Family with children</option>
            </select>
          </div>
        </div>
        <button style={{ marginTop: "20px", background: "#0569B8", color: "white", border: "none", padding: "12px 28px", borderRadius: "10px", fontSize: "14px", fontWeight: 600, cursor: "pointer" }}>Save Changes</button>
      </div>
      <div style={{ background: "white", borderRadius: "16px", border: "1px solid #C8DFF0", padding: "32px", marginBottom: "24px" }}>
        <div style={{ fontSize: "13px", fontWeight: 600, color: "#083358", marginBottom: "4px", textTransform: "uppercase", letterSpacing: ".1em" }}>Subscription</div>
        <div style={{ fontSize: "13px", color: "#6B8BA8", marginBottom: "20px" }}>You are on the Free plan.</div>
        <a href="/upgrade" style={{ display: "inline-block", background: "linear-gradient(135deg, #0569B8, #00B9D1)", color: "white", padding: "12px 28px", borderRadius: "10px", fontSize: "14px", fontWeight: 600, textDecoration: "none" }}>Upgrade to Pro — $19/month</a>
      </div>
    </div>
  );
}
