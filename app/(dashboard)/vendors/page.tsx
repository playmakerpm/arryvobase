export default function VendorsPage() {
  const statuses = ["Researching", "Contacted", "Quote Received", "Hired", "Completed"];

  return (
    <div className="p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8 flex items-start justify-between">
        <div>
          <div className="text-sm font-body font-medium mb-1"
            style={{ color: "#6B8BA8", letterSpacing: "0.1em", textTransform: "uppercase" }}>
            Personal CRM
          </div>
          <h1 className="font-display text-4xl font-semibold" style={{ color: "#083358" }}>
            My Vendors
          </h1>
          <p className="mt-2 font-body text-sm" style={{ color: "#6B8BA8" }}>
            Track every provider from first contact to hired
          </p>
        </div>
        <button className="text-sm font-body font-semibold px-4 py-2 rounded-xl text-white"
          style={{ background: "#0569B8" }}>
          + Add Vendor
        </button>
      </div>

      {/* Empty state */}
      <div className="rounded-2xl p-16 text-center" style={{ background: "white", border: "1px solid #C8DFF0" }}>
        <div className="text-5xl mb-4">👥</div>
        <h2 className="font-display text-2xl font-semibold mb-2" style={{ color: "#083358" }}>
          No vendors saved yet
        </h2>
        <p className="font-body text-sm mb-6" style={{ color: "#6B8BA8", maxWidth: "360px", margin: "0 auto 24px" }}>
          Browse the vendor directory and save providers to track them here. Each saved vendor moves through your pipeline as you work with them.
        </p>
        <a href="/directory"
          className="inline-block text-sm font-body font-semibold px-6 py-3 rounded-xl text-white"
          style={{ background: "#0569B8" }}>
          Browse Vendor Directory →
        </a>

        {/* Pipeline preview */}
        <div className="mt-10 pt-8 border-t" style={{ borderColor: "#C8DFF0" }}>
          <div className="text-xs font-body font-semibold mb-4 uppercase tracking-widest" style={{ color: "#6B8BA8" }}>
            Your pipeline
          </div>
          <div className="flex gap-3 justify-center flex-wrap">
            {statuses.map((status) => (
              <div key={status}
                className="px-4 py-2 rounded-xl text-xs font-body font-medium"
                style={{ background: "#EDF4FB", color: "#2E4A68", border: "1px solid #C8DFF0" }}>
                {status}
                <span className="ml-2 font-semibold" style={{ color: "#0569B8" }}>0</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
