"use client";

export default function UpgradePage() {
  const handleUpgrade = async () => {
    const res = await fetch("/api/stripe/checkout", { method: "POST" });
    const data = await res.json();
    if (data.url) window.location.href = data.url;
  };

  const features = [
    { free: true,  pro: true,  label: "Spain destination" },
    { free: false, pro: true,  label: "Portugal, Mexico, Thailand (coming soon)" },
    { free: true,  pro: true,  label: "Task tracking" },
    { free: false, pro: true,  label: "Full checklist — all phases" },
    { free: true,  pro: true,  label: "Vendor directory access" },
    { free: false, pro: true,  label: "Save & track vendors" },
    { free: false, pro: true,  label: "Document vault" },
    { free: false, pro: true,  label: "Weekly digest emails" },
    { free: false, pro: true,  label: "Referral link generation" },
    { free: true,  pro: true,  label: "Referral commissions" },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-8" style={{ background: "#EDF4FB" }}>
      <div className="w-full max-w-3xl">
        <div className="text-center mb-10">
          <h1 className="font-display text-5xl font-semibold mb-3" style={{ color: "#083358" }}>
            Upgrade to Pro
          </h1>
          <p className="font-body text-base" style={{ color: "#6B8BA8" }}>
            Everything you need for a stress-free relocation abroad
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* Free */}
          <div className="rounded-2xl p-6" style={{ background: "white", border: "1px solid #C8DFF0" }}>
            <div className="mb-4">
              <div className="font-body font-semibold text-lg mb-1" style={{ color: "#083358" }}>Free</div>
              <div className="font-display text-4xl font-semibold" style={{ color: "#083358" }}>/bin/sh</div>
              <div className="text-sm font-body" style={{ color: "#6B8BA8" }}>Forever free</div>
            </div>
            <div className="space-y-3 mb-6">
              {features.map((f) => (
                <div key={f.label} className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center"
                    style={{ background: f.free ? "#EDF4FB" : "#F5F5F5" }}>
                    <span style={{ color: f.free ? "#0569B8" : "#C8DFF0", fontSize: "10px" }}>
                      {f.free ? "✓" : "—"}
                    </span>
                  </div>
                  <span className="text-sm font-body" style={{ color: f.free ? "#083358" : "#C8DFF0" }}>
                    {f.label}
                  </span>
                </div>
              ))}
            </div>
            <div className="py-2.5 text-center rounded-xl text-sm font-body font-semibold"
              style={{ background: "#EDF4FB", color: "#6B8BA8" }}>
              Current Plan
            </div>
          </div>

          {/* Pro */}
          <div className="rounded-2xl p-6 relative overflow-hidden"
            style={{ background: "linear-gradient(145deg, #083358, #0569B8)", color: "white" }}>
            <div className="absolute top-4 right-4 text-xs font-body font-semibold px-3 py-1 rounded-full"
              style={{ background: "#F5A623", color: "white" }}>
              Most Popular
            </div>
            <div className="mb-4">
              <div className="font-body font-semibold text-lg mb-1" style={{ color: "#C8EEF5" }}>Pro</div>
              <div className="font-display text-4xl font-semibold text-white">9</div>
              <div className="text-sm font-body" style={{ color: "rgba(200,238,245,.7)" }}>per month</div>
            </div>
            <div className="space-y-3 mb-6">
              {features.map((f) => (
                <div key={f.label} className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center"
                    style={{ background: "rgba(93,211,227,.2)" }}>
                    <span style={{ color: "#5DD3E3", fontSize: "10px" }}>✓</span>
                  </div>
                  <span className="text-sm font-body text-white">{f.label}</span>
                </div>
              ))}
            </div>
            <button onClick={handleUpgrade}
              className="w-full py-3 rounded-xl text-sm font-body font-semibold transition-all"
              style={{ background: "white", color: "#0569B8" }}>
              Upgrade Now →
            </button>
            <div className="mt-3 text-center text-xs" style={{ color: "rgba(200,238,245,.5)" }}>
              Cancel anytime · Secure checkout via Stripe
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
