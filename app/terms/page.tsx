export default function TermsPage() {
  const sectionStyle = { marginBottom: "32px" };
  const h2Style = { fontFamily: "Georgia, serif", fontSize: "22px", fontWeight: 600, color: "#083358", marginBottom: "12px" };
  const pStyle = { fontSize: "14px", color: "#2E4A68", lineHeight: 1.8, fontWeight: 300, marginBottom: "12px" };

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
          Terms of Service
        </h1>
        <p style={{ fontSize: "13px", color: "#6B8BA8", marginBottom: "48px" }}>
          Last updated: June 30, 2026
        </p>

        <div style={sectionStyle}>
          <h2 style={h2Style}>1. Agreement to Terms</h2>
          <p style={pStyle}>
            These Terms of Service ("Terms") govern your access to and use of Arryvo Base ("Service," "we," "us," or "our"), operated at arryvobase.com. By creating an account or using the Service, you agree to be bound by these Terms. If you do not agree, do not use the Service.
          </p>
          <p style={pStyle}>
            You must be at least 18 years of age to create an account or use the Service. By using Arryvo Base, you represent and warrant that you meet this requirement.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>2. Description of Service</h2>
          <p style={pStyle}>
            Arryvo Base provides organizational tools for individuals relocating internationally, including relocation checklists, a directory of third-party service providers, vendor tracking, and document organization features. Arryvo Base is an organizational tool only. We do not provide legal, immigration, tax, financial, medical, or other professional advice of any kind.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>3. Not Professional Advice</h2>
          <p style={pStyle}>
            Information provided through the Service — including checklist content, task descriptions, tips, and vendor listings — is for general informational purposes only and should not be relied upon as legal, immigration, tax, financial, or professional advice. Immigration and tax laws change frequently and vary by individual circumstance. You should consult a licensed attorney, accountant, or other qualified professional before making decisions related to your relocation, visa application, or tax filings.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>4. Third-Party Vendors and Affiliate Relationships</h2>
          <p style={pStyle}>
            Arryvo Base may feature, recommend, or link to third-party service providers ("Vendors"), including law firms, insurance providers, banks, and relocation specialists. We do not endorse, guarantee, control, or assume responsibility for the services, conduct, pricing, or outcomes of any Vendor. Any engagement with a Vendor is solely between you and that Vendor.
          </p>
          <p style={pStyle}>
            We may receive referral fees, commissions, or other compensation from Vendors when you engage their services through links or referrals originating from the Service. This compensation does not influence the accuracy of information presented, but you should be aware of this relationship when evaluating Vendor recommendations.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>5. User Accounts</h2>
          <p style={pStyle}>
            You are responsible for maintaining the confidentiality of your account credentials and for all activity that occurs under your account. You agree to provide accurate information during registration and to keep it updated. You must notify us promptly of any unauthorized use of your account.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>6. Subscriptions and Payment</h2>
          <p style={pStyle}>
            Arryvo Base offers a free tier and a paid "Pro" subscription billed monthly. Subscription fees are processed by Stripe, our third-party payment processor. By subscribing, you authorize recurring charges to your provided payment method until you cancel. You may cancel your subscription at any time; cancellation takes effect at the end of the current billing period. Fees are non-refundable except as required by applicable law.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>7. User Content and Documents</h2>
          <p style={pStyle}>
            You may upload, store, or input information including documents, vendor notes, and relocation details ("User Content"). You retain ownership of your User Content. You are solely responsible for the accuracy and legality of any User Content you submit, and for ensuring you have the right to upload any documents you store on the Service.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>8. Acceptable Use</h2>
          <p style={pStyle}>
            You agree not to: use the Service for any unlawful purpose; attempt to gain unauthorized access to other accounts or systems; upload malicious code; misrepresent your identity or age; or use the Service to harass, defraud, or harm others.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>9. Disclaimers and Limitation of Liability</h2>
          <p style={pStyle}>
            THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED. WE DO NOT WARRANT THAT THE SERVICE WILL BE ERROR-FREE, UNINTERRUPTED, OR THAT INFORMATION PROVIDED WILL BE ACCURATE OR CURRENT.
          </p>
          <p style={pStyle}>
            TO THE FULLEST EXTENT PERMITTED BY LAW, ARRYVO BASE SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSSES ARISING FROM VISA DENIALS, MISSED DEADLINES, FINANCIAL LOSSES, OR ENGAGEMENT WITH ANY THIRD-PARTY VENDOR REFERENCED ON THE SERVICE.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>10. Termination</h2>
          <p style={pStyle}>
            We reserve the right to suspend or terminate your account at our discretion, including for violation of these Terms. You may delete your account at any time through your account settings.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>11. Changes to These Terms</h2>
          <p style={pStyle}>
            We may update these Terms from time to time. Material changes will be communicated via email or in-app notice. Continued use of the Service after changes take effect constitutes acceptance of the revised Terms.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>12. Contact</h2>
          <p style={pStyle}>
            Questions about these Terms can be directed to hello@arryvobase.com.
          </p>
        </div>

        <div style={{ marginTop: "48px", padding: "20px", borderRadius: "12px", background: "#EDF4FB", border: "1px solid #C8DFF0" }}>
          <p style={{ fontSize: "12px", color: "#6B8BA8", lineHeight: 1.7, margin: 0 }}>
            This document is a general template and has not yet been reviewed by a licensed attorney. It is provided as a starting point and should not be considered final or legally exhaustive until reviewed by qualified legal counsel.
          </p>
        </div>
      </div>
    </main>
  );
}
