import { VENDORS, VENDOR_CATEGORIES, CATEGORY_META } from "@/lib/data/vendors";
import Link from "next/link";

export default function DirectoryPage() {
  const featured = VENDORS.filter((v) => v.featured);
  const all = VENDORS;

  return (
    <div className="p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="text-sm font-body font-medium mb-1"
          style={{ color: "#6B8BA8", letterSpacing: "0.1em", textTransform: "uppercase" }}>
          🇪🇸 Spain · Vetted Providers
        </div>
        <h1 className="font-display text-4xl font-semibold" style={{ color: "#083358" }}>
          Vendor Directory
        </h1>
        <p className="mt-2 font-body text-sm" style={{ color: "#6B8BA8" }}>
          Hand-curated providers for every stage of your Spain relocation. Recommended because they are good, not because they paid.
        </p>
      </div>

      {/* Category filters */}
      <div className="flex gap-2 flex-wrap mb-8">
        <button className="text-xs font-body font-semibold px-4 py-2 rounded-full text-white"
          style={{ background: "#0569B8" }}>
          All
        </button>
        {VENDOR_CATEGORIES.map((cat) => {
          const meta = CATEGORY_META[cat];
          return (
            <button key={cat}
              className="text-xs font-body font-medium px-4 py-2 rounded-full transition-all"
              style={{ background: meta.bg, color: meta.color, border: `1px solid ${meta.color}40` }}>
              {meta.icon} {cat}
            </button>
          );
        })}
      </div>

      {/* Featured vendors */}
      <div className="mb-8">
        <h2 className="font-body font-semibold text-sm mb-4 uppercase tracking-widest" style={{ color: "#6B8BA8" }}>
          Featured
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {featured.map((vendor) => {
            const meta = CATEGORY_META[vendor.category];
            return (
              <div key={vendor.id} className="rounded-2xl p-5"
                style={{ background: "white", border: "1px solid #C8DFF0" }}>
                {/* Category */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-body font-semibold px-2 py-1 rounded-full"
                    style={{ background: meta.bg, color: meta.color }}>
                    {meta.icon} {vendor.category}
                  </span>
                  <span className="text-xs font-body" style={{ color: "#6B8BA8" }}>
                    {vendor.commissionValue}
                  </span>
                </div>

                {/* Name */}
                <h3 className="font-display text-xl font-semibold mb-2" style={{ color: "#083358" }}>
                  {vendor.name}
                </h3>
                <p className="text-xs font-body leading-relaxed mb-4" style={{ color: "#6B8BA8" }}>
                  {vendor.description}
                </p>

                {/* Why recommended */}
                <div className="p-3 rounded-xl text-xs font-body mb-4"
                  style={{ background: "#EDF4FB", color: "#2E4A68", borderLeft: "3px solid #0569B8" }}>
                  <strong>Why we recommend:</strong> {vendor.whyRecommended.slice(0, 100)}...
                </div>

                {/* Tags */}
                <div className="flex gap-1 flex-wrap mb-4">
                  {vendor.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="text-xs px-2 py-0.5 rounded-full font-body"
                      style={{ background: "#EDF4FB", color: "#6B8BA8" }}>
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <a href={vendor.affiliateLink} target="_blank" rel="noopener noreferrer"
                    className="flex-1 text-center text-xs font-body font-semibold py-2 rounded-lg text-white transition-all"
                    style={{ background: "#0569B8" }}>
                    Visit Provider →
                  </a>
                  <button className="text-xs font-body font-semibold py-2 px-3 rounded-lg transition-all"
                    style={{ background: "#EDF4FB", color: "#0569B8", border: "1px solid #C8DFF0" }}>
                    + Save
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* All vendors list */}
      <div>
        <h2 className="font-body font-semibold text-sm mb-4 uppercase tracking-widest" style={{ color: "#6B8BA8" }}>
          All Providers
        </h2>
        <div className="space-y-3">
          {all.map((vendor) => {
            const meta = CATEGORY_META[vendor.category];
            return (
              <div key={vendor.id}
                className="flex items-center gap-4 p-4 rounded-xl"
                style={{ background: "white", border: "1px solid #C8DFF0" }}>
                <div className="w-10 h-10 flex-shrink-0 rounded-xl flex items-center justify-center text-xl"
                  style={{ background: meta.bg }}>
                  {meta.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-body font-semibold text-sm" style={{ color: "#083358" }}>
                      {vendor.name}
                    </span>
                    {vendor.featured && (
                      <span className="text-xs font-body px-1.5 py-0.5 rounded"
                        style={{ background: "#EDF4FB", color: "#0569B8" }}>
                        Featured
                      </span>
                    )}
                  </div>
                  <div className="text-xs font-body" style={{ color: "#6B8BA8" }}>
                    {vendor.category} · {vendor.description.slice(0, 80)}...
                  </div>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <a href={vendor.affiliateLink} target="_blank" rel="noopener noreferrer"
                    className="text-xs font-body font-semibold py-1.5 px-3 rounded-lg text-white"
                    style={{ background: "#0569B8" }}>
                    Visit
                  </a>
                  <button className="text-xs font-body font-semibold py-1.5 px-3 rounded-lg"
                    style={{ background: "#EDF4FB", color: "#0569B8", border: "1px solid #C8DFF0" }}>
                    + Save
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
