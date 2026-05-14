"use client";

import { useState } from "react";
import { VENDORS, VENDOR_CATEGORIES, CATEGORY_META } from "@/lib/data/vendors";

export default function DirectoryPage() {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const filtered = activeFilter === "All" ? VENDORS : VENDORS.filter((v) => v.category === activeFilter);
  const featured = filtered.filter((v) => v.featured);
  const rest = filtered.filter((v) => !v.featured);

  return (
    <div style={{ padding: "40px", maxWidth: "1000px", margin: "0 auto" }}>
      <div style={{ marginBottom: "32px" }}>
        <div style={{ fontSize: "11px", fontWeight: 600, letterSpacing: ".15em", textTransform: "uppercase", color: "#6B8BA8", marginBottom: "8px" }}>🇪🇸 Spain · Vetted Providers</div>
        <h1 style={{ fontFamily: "Georgia, serif", fontSize: "40px", fontWeight: 600, color: "#083358", letterSpacing: "-.02em", lineHeight: 1.1, marginBottom: "10px" }}>Vendor Directory</h1>
        <p style={{ fontSize: "14px", color: "#6B8BA8", lineHeight: 1.6 }}>Hand-curated providers for your Spain relocation. Recommended because they are good, not because they paid.</p>
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "32px" }}>
        <button onClick={() => setActiveFilter("All")} style={{ fontSize: "12px", fontWeight: 600, padding: "8px 18px", borderRadius: "20px", border: "none", cursor: "pointer", background: activeFilter === "All" ? "#0569B8" : "#EDF4FB", color: activeFilter === "All" ? "white" : "#2E4A68", transition: "all .15s" }}>
          All ({VENDORS.length})
        </button>
        {VENDOR_CATEGORIES.map((cat) => {
          const meta = CATEGORY_META[cat];
          const count = VENDORS.filter(v => v.category === cat).length;
          return (
            <button key={cat} onClick={() => setActiveFilter(cat)} style={{ fontSize: "12px", fontWeight: 600, padding: "8px 16px", borderRadius: "20px", border: `1px solid ${activeFilter === cat ? meta.color : "#C8DFF0"}`, cursor: "pointer", background: activeFilter === cat ? meta.bg : "white", color: activeFilter === cat ? meta.color : "#6B8BA8", transition: "all .15s" }}>
              {meta.icon} {cat} ({count})
            </button>
          );
        })}
      </div>

      {/* Featured tiles */}
      {featured.length > 0 && (
        <div style={{ marginBottom: "40px" }}>
          <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: ".16em", textTransform: "uppercase", color: "#6B8BA8", marginBottom: "16px" }}>Featured</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            {featured.map((vendor) => {
              const meta = CATEGORY_META[vendor.category];
              return (
                <div key={vendor.id} style={{ background: "white", border: "1px solid #C8DFF0", borderRadius: "16px", padding: "24px", display: "flex", flexDirection: "column", gap: "12px" }}>
                  <span style={{ fontSize: "11px", fontWeight: 700, padding: "4px 12px", borderRadius: "20px", background: meta.bg, color: meta.color, alignSelf: "flex-start" }}>{meta.icon} {vendor.category}</span>
                  <div>
                    <h3 style={{ fontFamily: "Georgia, serif", fontSize: "20px", fontWeight: 600, color: "#083358", marginBottom: "6px" }}>{vendor.name}</h3>
                    <p style={{ fontSize: "13px", color: "#6B8BA8", lineHeight: 1.65 }}>{vendor.description}</p>
                  </div>
                  <div style={{ padding: "10px 14px", borderRadius: "10px", background: "#EDF4FB", borderLeft: "3px solid #0569B8", fontSize: "12px", color: "#2E4A68", lineHeight: 1.6 }}>
                    <strong>Why we recommend:</strong> {vendor.whyRecommended.slice(0, 120)}...
                  </div>
                  <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                    {vendor.tags.slice(0, 4).map((tag) => (
                      <span key={tag} style={{ fontSize: "11px", padding: "3px 10px", borderRadius: "20px", background: "#EDF4FB", color: "#6B8BA8" }}>{tag}</span>
                    ))}
                  </div>
                  <a href={vendor.affiliateLink} target="_blank" rel="noopener noreferrer" style={{ display: "block", textAlign: "center", background: "linear-gradient(135deg, #0569B8, #00B9D1)", color: "white", padding: "12px", borderRadius: "10px", fontSize: "13px", fontWeight: 600, textDecoration: "none", marginTop: "auto" }}>
                    Visit {vendor.name} →
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* All providers */}
      {rest.length > 0 && (
        <div>
          <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: ".16em", textTransform: "uppercase", color: "#6B8BA8", marginBottom: "16px" }}>
            {activeFilter === "All" ? "All Providers" : activeFilter}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "14px" }}>
            {rest.map((vendor) => {
              const meta = CATEGORY_META[vendor.category];
              return (
                <div key={vendor.id} style={{ background: "white", border: "1px solid #C8DFF0", borderRadius: "14px", padding: "20px", display: "flex", flexDirection: "column", gap: "10px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: meta.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", flexShrink: 0 }}>{meta.icon}</div>
                    <div>
                      <div style={{ fontSize: "13px", fontWeight: 700, color: "#083358" }}>{vendor.name}</div>
                      <div style={{ fontSize: "11px", color: meta.color, fontWeight: 600 }}>{vendor.category}</div>
                    </div>
                  </div>
                  <p style={{ fontSize: "12px", color: "#6B8BA8", lineHeight: 1.6 }}>{vendor.description.slice(0, 90)}...</p>
                  <a href={vendor.affiliateLink} target="_blank" rel="noopener noreferrer" style={{ display: "block", textAlign: "center", background: "#EDF4FB", color: "#0569B8", padding: "8px", borderRadius: "8px", fontSize: "12px", fontWeight: 600, textDecoration: "none", border: "1px solid #C8DFF0", marginTop: "auto" }}>
                    Visit Provider →
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
