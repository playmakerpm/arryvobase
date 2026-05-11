export default function DocumentsPage() {
  const categories = [
    { name: "Passport & ID", icon: "🛂", count: 0 },
    { name: "Visa Documents", icon: "📋", count: 0 },
    { name: "Housing", icon: "🏠", count: 0 },
    { name: "School Records", icon: "🎓", count: 0 },
    { name: "Financial", icon: "💳", count: 0 },
    { name: "Health", icon: "🏥", count: 0 },
  ];

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="text-sm font-body font-medium mb-1"
          style={{ color: "#6B8BA8", letterSpacing: "0.1em", textTransform: "uppercase" }}>
          Secure Storage
        </div>
        <h1 className="font-display text-4xl font-semibold" style={{ color: "#083358" }}>
          Document Vault
        </h1>
        <p className="mt-2 font-body text-sm" style={{ color: "#6B8BA8" }}>
          Upload and organize all your relocation documents in one secure place
        </p>
      </div>
      <div className="mb-6 rounded-2xl p-5 flex items-center justify-between"
        style={{ background: "linear-gradient(135deg, #0569B8, #00B9D1)", color: "white" }}>
        <div>
          <div className="font-body font-semibold text-sm mb-1">Document Vault is a Pro feature</div>
          <div className="text-xs" style={{ color: "rgba(200,238,245,.8)" }}>
            Upgrade to store, organize, and access all your documents from anywhere
          </div>
        </div>
        <a href="/upgrade"
          className="flex-shrink-0 text-xs font-body font-semibold px-4 py-2 rounded-lg"
          style={{ background: "white", color: "#0569B8" }}>
          Upgrade to Pro
        </a>
      </div>
      <div className="grid grid-cols-2 gap-4" style={{ opacity: 0.4, pointerEvents: "none" }}>
        {categories.map((cat) => (
          <div key={cat.name} className="rounded-2xl p-5"
            style={{ background: "white", border: "1px solid #C8DFF0" }}>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">{cat.icon}</span>
              <div>
                <div className="font-body font-semibold text-sm" style={{ color: "#083358" }}>{cat.name}</div>
                <div className="text-xs font-body" style={{ color: "#6B8BA8" }}>{cat.count} documents</div>
              </div>
            </div>
            <button className="w-full text-xs font-body font-semibold py-2 rounded-lg"
              style={{ background: "#EDF4FB", color: "#0569B8", border: "1px solid #C8DFF0" }}>
              + Upload Document
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
