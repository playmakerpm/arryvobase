const FAQS = [
  {
    section: "Visas",
    items: [
      { q: "What is the difference between ICT and Digital Nomad Visa?", a: "The ICT (Intra-Company Transfer) visa is for employees being transferred within a multinational company to a Spanish office. The Digital Nomad Visa is for remote workers and freelancers who work for non-Spanish clients. ICT requires an employer sponsor; DNV requires proof of remote income." },
      { q: "How long does Spain visa processing take?", a: "Typically 4–12 weeks depending on your consulate and visa type. Some consulates in major US cities like New York and Los Angeles have appointment backlogs of 8–12 weeks. Book your consulate appointment as early as possible." },
      { q: "Can my spouse work on an ICT visa?", a: "Yes. Spouses of ICT visa holders are typically granted work authorization in Spain. This is one of the advantages of the ICT route over some other visa types." },
    ]
  },
  {
    section: "Beckham Law",
    items: [
      { q: "What is Beckham Law?", a: "Spain's Beckham Law (officially the Special Expat Tax Regime) allows qualifying expats to pay a flat 24% tax rate on Spanish-source income for up to 6 years, instead of Spain's progressive rates which go up to 47%. It was named after David Beckham who famously used it when he moved to Real Madrid." },
      { q: "Who qualifies for Beckham Law?", a: "You qualify if you have not been a Spanish tax resident in the previous 5 years, and you are moving to Spain for work reasons (ICT, employment contract, or Digital Nomad Visa). You must file Form 149 within 6 months of starting work in Spain." },
      { q: "What happens if I miss the 6-month Beckham Law deadline?", a: "Unfortunately the deadline cannot be extended. Missing it means you will be taxed at Spain's standard progressive rates for the remainder of your stay. This is why we flag it as a critical task — hire a tax advisor who specializes in Beckham Law before you arrive." },
    ]
  },
  {
    section: "Banking",
    items: [
      { q: "Can I open a Spanish bank account before I arrive?", a: "Most major Spanish banks require you to be physically present. However, N26 (a European digital bank) can be opened entirely online with your passport. For in-person banking, Santander is the most expat-friendly — they can open accounts with just your passport and NIE application receipt, before your NIE is officially issued." },
      { q: "What is Wise and do I need it?", a: "Wise (formerly TransferWise) is an international money transfer platform that uses the real exchange rate with minimal fees. Almost every expat uses it for sending money from their US account to Spain before their Spanish bank account is active. Set it up before you leave — you will need it immediately on arrival." },
    ]
  },
  {
    section: "Schools",
    items: [
      { q: "How early should I apply to the American School of Valencia?", a: "Applications typically open 6–12 months in advance and spaces fill quickly, especially for popular grade levels. If you are relocating to Valencia, contact ASV as soon as your move is confirmed — even if your exact arrival date is uncertain. They have experience with corporate expat families and can sometimes accommodate mid-year enrollment." },
      { q: "Is public school an option for expat children?", a: "Yes, public schools in Spain are free and available to all residents. However, instruction is in Spanish and Valencian. If your children do not speak Spanish, the transition can be challenging. Many expat families use public school as a longer-term goal after a year or two in an international school." },
    ]
  },
];

export default function FAQPage() {
  return (
    <div style={{ padding: "40px", maxWidth: "800px", margin: "0 auto" }}>
      <div style={{ marginBottom: "36px" }}>
        <div style={{ fontSize: "11px", fontWeight: 600, letterSpacing: ".15em", textTransform: "uppercase", color: "#6B8BA8", marginBottom: "8px" }}>Knowledge Base</div>
        <h1 style={{ fontFamily: "Georgia, serif", fontSize: "40px", fontWeight: 600, color: "#083358", letterSpacing: "-.02em", lineHeight: 1.1, marginBottom: "10px" }}>
          Frequently Asked Questions
        </h1>
        <p style={{ fontSize: "14px", color: "#6B8BA8", lineHeight: 1.7 }}>
          Common questions about Spain relocation, visas, taxes, banking, and schools.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
        {FAQS.map((section) => (
          <div key={section.section}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px", paddingBottom: "12px", borderBottom: "2px solid #083358" }}>
              <h2 style={{ fontFamily: "Georgia, serif", fontSize: "24px", fontWeight: 600, color: "#083358" }}>{section.section}</h2>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {section.items.map((item) => (
                <div key={item.q} style={{ background: "white", border: "1px solid #C8DFF0", borderRadius: "14px", padding: "20px 24px" }}>
                  <div style={{ fontFamily: "Georgia, serif", fontSize: "16px", fontWeight: 600, color: "#083358", marginBottom: "10px", lineHeight: 1.4 }}>{item.q}</div>
                  <div style={{ fontSize: "14px", color: "#2E4A68", lineHeight: 1.75, fontWeight: 300 }}>{item.a}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: "40px", borderRadius: "16px", padding: "24px 28px", background: "linear-gradient(135deg, #083358, #0569B8)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "24px" }}>
        <div>
          <div style={{ fontFamily: "Georgia, serif", fontSize: "18px", fontWeight: 600, color: "#C8EEF5", marginBottom: "4px" }}>Have a question not listed here?</div>
          <div style={{ fontSize: "13px", color: "rgba(200,238,245,.55)" }}>Get in touch and we will add it to the knowledge base.</div>
        </div>
        <a href="mailto:hello@arryvobase.com" style={{ flexShrink: 0, background: "white", color: "#0569B8", padding: "10px 24px", borderRadius: "10px", fontSize: "13px", fontWeight: 700, textDecoration: "none", whiteSpace: "nowrap" }}>
          Contact Us
        </a>
      </div>
    </div>
  );
}
