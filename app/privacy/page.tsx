import Footer from "@/components/footer";
export default function PrivacyPage() {
  const sectionStyle = { marginBottom: "32px" };
  const h2Style = { fontFamily: "Georgia, serif", fontSize: "22px", fontWeight: 600, color: "#083358", marginBottom: "12px" };
  const pStyle = { fontSize: "14px", color: "#2E4A68", lineHeight: 1.8, fontWeight: 300, marginBottom: "12px" };
  const liStyle = { fontSize: "14px", color: "#2E4A68", lineHeight: 1.8, fontWeight: 300, marginBottom: "6px" };

  return (
    <main style={{ background: "#FAFCFF", minHeight: "100vh" }}>
      <div style={{ maxWidth: "760px", margin: "0 auto", padding: "64px 24px" }}>
        <a href="/" style={{ fontFamily: "Georgia, serif", fontSize: "20px", fontWeight: 600, color: "#083358", textDecoration: "none", display: "inline-block", marginBottom: "40px" }}>
          Arryvo<span style={{ color: "#0569B8" }}>Base</span>
        </a>

        <div style={{ fontSize: "11px", fontWeight: 600, letterSpacing: ".15em", textTransform: "uppercase", color: "#6B8BA8", marginBottom: "12px" }}>
          Legal
        </div>
        <h1 style={{ fontFamily: "Georgia, serif", fontSize: "40px", fontWeight: 600, color: "#083358", marginBottom: "8px" }}>
          Privacy Policy
        </h1>
        <p style={{ fontSize: "13px", color: "#6B8BA8", marginBottom: "48px" }}>
          Last updated: June 30, 2026
        </p>

        <div style={sectionStyle}>
          <h2 style={h2Style}>1. Introduction</h2>
          <p style={pStyle}>
            This Privacy Policy explains how Arryvo Base ("we," "us," "our") collects, uses, and protects your information when you use arryvobase.com (the "Service"). By using the Service, you consent to the practices described in this policy.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>2. Information We Collect</h2>
          <p style={pStyle}><strong>Account information:</strong> Name, email address, and authentication credentials, collected via our authentication provider (Clerk) when you create an account.</p>
          <p style={pStyle}><strong>Relocation profile information:</strong> Destination country, visa type, target move date, and household composition, which you provide during onboarding.</p>
          <p style={pStyle}><strong>User content:</strong> Checklist progress, vendor notes and contact details you save, and documents or document metadata you upload to the Document Vault.</p>
          <p style={pStyle}><strong>Payment information:</strong> If you subscribe to a paid plan, payment is processed by Stripe. We do not store your full credit card number; Stripe handles and stores payment credentials in accordance with PCI-DSS standards.</p>
          <p style={pStyle}><strong>Usage data:</strong> Information about how you interact with the Service, including pages visited and features used, collected automatically.</p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>3. How We Use Your Information</h2>
          <p style={pStyle}>We use collected information to:</p>
          <ul style={{ paddingLeft: "20px", marginBottom: "12px" }}>
            <li style={liStyle}>Provide, operate, and personalize the Service, including your relocation checklist and dashboard</li>
            <li style={liStyle}>Process subscription payments and manage your account</li>
            <li style={liStyle}>Communicate with you about your account, updates, and — if opted in — weekly digest emails</li>
            <li style={liStyle}>Track referrals if you participate in our referral program</li>
            <li style={liStyle}>Improve and maintain the Service, including troubleshooting and security</li>
            <li style={liStyle}>Comply with legal obligations</li>
          </ul>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>4. How We Share Information</h2>
          <p style={pStyle}>We do not sell your personal information. We share information only in the following circumstances:</p>
          <ul style={{ paddingLeft: "20px", marginBottom: "12px" }}>
            <li style={liStyle}><strong>Service providers:</strong> We use third-party providers to operate the Service, including Clerk (authentication), Supabase (database hosting), Stripe (payment processing), and Vercel (hosting). These providers process data on our behalf under their own privacy and security commitments.</li>
            <li style={liStyle}><strong>Vendors you choose to contact:</strong> If you click through to a third-party vendor listed in our directory, that vendor's own privacy policy governs any information you provide directly to them. We do not share your saved vendor notes with the vendors themselves.</li>
            <li style={liStyle}><strong>Legal requirements:</strong> We may disclose information if required by law, subpoena, or to protect the rights, safety, or property of Arryvo Base or others.</li>
            <li style={liStyle}><strong>Business transfers:</strong> If Arryvo Base is involved in a merger, acquisition, or asset sale, your information may be transferred as part of that transaction.</li>
          </ul>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>5. Document Storage</h2>
          <p style={pStyle}>
            The Document Vault feature allows you to upload and organize documents related to your relocation. You are responsible for the documents you choose to upload. We recommend avoiding upload of highly sensitive identifiers (such as full passport scans) until you have reviewed our security practices, which are still maturing as the Service develops.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>6. Data Retention</h2>
          <p style={pStyle}>
            We retain your information for as long as your account is active or as needed to provide the Service. You may request deletion of your account and associated data at any time via your account settings or by contacting us.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>7. Your Rights</h2>
          <p style={pStyle}>
            Depending on your location, you may have rights to access, correct, delete, or export your personal information. EU and UK residents may have additional rights under GDPR; California residents may have additional rights under the CCPA. To exercise any of these rights, contact us at hello@arryvobase.com.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>8. Cookies</h2>
          <p style={pStyle}>
            We use cookies and similar technologies for authentication and essential site functionality. We do not currently use cookies for third-party advertising.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>9. Children's Privacy</h2>
          <p style={pStyle}>
            The Service is not directed to individuals under 18. We do not knowingly collect information from anyone under 18. If we learn that we have collected information from a user under 18, we will delete it promptly.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>10. International Data Transfers</h2>
          <p style={pStyle}>
            Your information may be processed in the United States or other countries where our service providers operate. By using the Service, you consent to this transfer and processing.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>11. Changes to This Policy</h2>
          <p style={pStyle}>
            We may update this Privacy Policy periodically. Material changes will be communicated via email or in-app notice.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>12. Contact Us</h2>
          <p style={pStyle}>
            Questions about this Privacy Policy can be directed to hello@arryvobase.com.
          </p>
        </div>

        <div style={{ marginTop: "48px", padding: "20px", borderRadius: "12px", background: "#EDF4FB", border: "1px solid #C8DFF0" }}>
          <p style={{ fontSize: "12px", color: "#6B8BA8", lineHeight: 1.7, margin: 0 }}>
            This document is a general template and has not yet been reviewed by a licensed attorney. It is provided as a starting point and should not be considered final or legally exhaustive until reviewed by qualified legal counsel.
          </p>
        </div>
      </div>
      <Footer />
    </main>
  );
}
