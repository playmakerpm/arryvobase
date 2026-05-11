import { currentUser } from "@clerk/nextjs/server";
import { VISA_TYPES } from "@/lib/data/checklist";

export default async function SettingsPage() {
  const user = await currentUser();

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <div className="mb-8">
        <div className="text-sm font-body font-medium mb-1"
          style={{ color: "#6B8BA8", letterSpacing: "0.1em", textTransform: "uppercase" }}>
          Account
        </div>
        <h1 className="font-display text-4xl font-semibold" style={{ color: "#083358" }}>
          Settings
        </h1>
      </div>

      <div className="space-y-6">
        <div className="rounded-2xl p-6" style={{ background: "white", border: "1px solid #C8DFF0" }}>
          <h2 className="font-body font-semibold text-base mb-4" style={{ color: "#083358" }}>Profile</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-body font-semibold mb-1 uppercase tracking-wider" style={{ color: "#6B8BA8" }}>Full Name</label>
              <input type="text" defaultValue={user?.fullName || ""} className="w-full px-4 py-2.5 rounded-xl text-sm font-body" style={{ background: "#EDF4FB", border: "1px solid #C8DFF0", color: "#083358" }} />
            </div>
            <div>
              <label className="block text-xs font-body font-semibold mb-1 uppercase tracking-wider" style={{ color: "#6B8BA8" }}>Email</label>
              <input type="email" defaultValue={user?.emailAddresses?.[0]?.emailAddress || ""} disabled className="w-full px-4 py-2.5 rounded-xl text-sm font-body" style={{ background: "#EDF4FB", border: "1px solid #C8DFF0", color: "#6B8BA8" }} />
            </div>
          </div>
        </div>

        <div className="rounded-2xl p-6" style={{ background: "white", border: "1px solid #C8DFF0" }}>
          <h2 className="font-body font-semibold text-base mb-4" style={{ color: "#083358" }}>Relocation Details</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-body font-semibold mb-1 uppercase tracking-wider" style={{ color: "#6B8BA8" }}>Destination</label>
              <select className="w-full px-4 py-2.5 rounded-xl text-sm font-body" style={{ background: "#EDF4FB", border: "1px solid #C8DFF0", color: "#083358" }}>
                <option value="ES">🇪🇸 Spain</option>
                <option value="PT" disabled>🇵🇹 Portugal (Coming Soon)</option>
                <option value="MX" disabled>🇲🇽 Mexico (Coming Soon)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-body font-semibold mb-1 uppercase tracking-wider" style={{ color: "#6B8BA8" }}>Visa Type</label>
              <select className="w-full px-4 py-2.5 rounded-xl text-sm font-body" style={{ background: "#EDF4FB", border: "1px solid #C8DFF0", color: "#083358" }}>
                {Object.values(VISA_TYPES).map((v) => (
                  <option key={v.id} value={v.id}>{v.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-body font-semibold mb-1 uppercase tracking-wider" style={{ color: "#6B8BA8" }}>Target Move Date</label>
              <input type="date" className="w-full px-4 py-2.5 rounded-xl text-sm font-body" style={{ background: "#EDF4FB", border: "1px solid #C8DFF0", color: "#083358" }} />
            </div>
          </div>
          <button className="mt-4 w-full py-2.5 rounded-xl text-sm font-body font-semibold text-white" style={{ background: "#0569B8" }}>
            Save Changes
          </button>
        </div>

        <div className="rounded-2xl p-6" style={{ background: "white", border: "1px solid #C8DFF0" }}>
          <h2 className="font-body font-semibold text-base mb-2" style={{ color: "#083358" }}>Subscription</h2>
          <p className="text-xs font-body mb-4" style={{ color: "#6B8BA8" }}>You are on the Free plan.</p>
          <a href="/upgrade" className="block text-center py-2.5 rounded-xl text-sm font-body font-semibold text-white" style={{ background: "linear-gradient(135deg, #0569B8, #00B9D1)" }}>
            Upgrade to Pro — 9/month
          </a>
        </div>
      </div>
    </div>
  );
}
