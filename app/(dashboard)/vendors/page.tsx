// @ts-nocheck
"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useUser } from "@clerk/nextjs";

const CATEGORY_OPTIONS = [
  { value: "Immigration Law", icon: "⚖️", color: "#0569B8", bg: "#EDF4FB" },
  { value: "International Insurance", icon: "🛡️", color: "#00B9D1", bg: "#E8F9FC" },
  { value: "Banking", icon: "🏦", color: "#083358", bg: "#EDF4FB" },
  { value: "Tax Advisory", icon: "📊", color: "#F5A623", bg: "#FDF4E7" },
  { value: "Housing", icon: "🏠", color: "#5C6E46", bg: "#EDF2E8" },
  { value: "International Schools", icon: "🎓", color: "#7A3F28", bg: "#FAEDE8" },
  { value: "Moving & Relocation", icon: "📦", color: "#2E4A68", bg: "#EDF4FB" },
  { value: "Telecom", icon: "📱", color: "#6B8BA8", bg: "#EDF4FB" },
  { value: "Other", icon: "🔗", color: "#6B8BA8", bg: "#EDF4FB" },
];

const STATUS_OPTIONS = ["Researching", "Contacted", "Quote Received", "Hired", "Completed"];

const STATUS_COLORS = {
  "Researching":    { color: "#6B8BA8", bg: "#EDF4FB" },
  "Contacted":      { color: "#0569B8", bg: "#D4E9F7" },
  "Quote Received": { color: "#F5A623", bg: "#FDF4E7" },
  "Hired":          { color: "#5C6E46", bg: "#EDF2E8" },
  "Completed":      { color: "#00B9D1", bg: "#E8F9FC" },
};

const DIRECTORY_VENDORS = [
  { name: "Lexidy Law Boutique", category: "Immigration Law", website: "https://lexidy.com" },
  { name: "Cigna Global", category: "International Insurance", website: "https://cignaglobal.com" },
  { name: "SafetyWing", category: "International Insurance", website: "https://safetywing.com" },
  { name: "Santander Spain", category: "Banking", website: "https://santander.es" },
  { name: "Wise", category: "Banking", website: "https://wise.com" },
  { name: "N26", category: "Banking", website: "https://n26.com" },
  { name: "Beckham Law Spain", category: "Tax Advisory", website: "https://beckhamlawspain.com" },
  { name: "Taxoo", category: "Tax Advisory", website: "https://taxoo.es" },
  { name: "Idealista", category: "Housing", website: "https://idealista.com" },
  { name: "Spotahome", category: "Housing", website: "https://spotahome.com" },
  { name: "American School of Valencia", category: "International Schools", website: "https://asvalencia.org" },
  { name: "British Council Spain", category: "International Schools", website: "https://britishcouncil.es" },
  { name: "AGS Movers Spain", category: "Moving & Relocation", website: "https://ags-worldwide.com" },
  { name: "Digi Spain", category: "Telecom", website: "https://digimobil.es" },
];

const getCatMeta = (cat: string) => CATEGORY_OPTIONS.find(c => c.value === cat) || CATEGORY_OPTIONS[CATEGORY_OPTIONS.length - 1];

export default function VendorsPage() {
  const [vendors, setVendors] = useState<any[]>([]);
  const [modal, setModal] = useState("none");
  const [selectedVendor, setSelectedVendor] = useState<any>(null);
  const [dirFilter, setDirFilter] = useState("");
  const [form, setForm] = useState({ name: "", category: "Immigration Law", repName: "", phone: "", email: "", website: "", notes: "" });

  const { user } = useUser();

  useEffect(() => {
    if (!user) return;
    const load = async () => {
      const { data } = await supabase
        .from("user_vendors")
        .select("*")
        .eq("clerk_user_id", user.id)
        .order("created_at", { ascending: false });
      if (data) setVendors(data);
    };
    load();
  }, [user]);

  const saveVendors = (updated: any[]) => {
    setVendors(updated);
  };

  const addFromDirectory = (dv) => {
    const newVendor = { id: Date.now().toString(), name: dv.name, category: dv.category, status: "Researching", website: dv.website, fromDirectory: true, addedAt: new Date().toISOString() };
    saveVendors([...vendors, newVendor]);
    setModal("none");
    setDirFilter("");
  };

  const addManual = async () => {
    if (!user || !form.name.trim()) return;
    const { data } = await supabase.from("user_vendors").insert({
      clerk_user_id: user.id,
      name: form.name,
      category: form.category,
      status: "Researching",
      rep_name: form.repName,
      phone: form.phone,
      email: form.email,
      website: form.website,
      notes: form.notes,
      from_directory: false,
    }).select().single();
    if (data) setVendors((prev: any[]) => [data, ...prev]);
    setModal("none");
    setForm({ name: "", category: "Immigration Law", repName: "", phone: "", email: "", website: "", notes: "" });
  };

  const updateStatus = (id, status) => {
    const updated = vendors.map(v => v.id === id ? { ...v, status } : v);
    saveVendors(updated);
    setSelectedVendor(prev => prev ? { ...prev, status } : prev);
  };

  const removeVendor = (id) => {
    saveVendors(vendors.filter(v => v.id !== id));
    setSelectedVendor(null);
    setModal("none");
  };

  const closeModal = () => { setModal("none"); setSelectedVendor(null); setDirFilter(""); };
  const alreadySaved = new Set(vendors.filter(v => v.from_directory).map(v => v.name));
  const filteredDir = DIRECTORY_VENDORS.filter(v => v.name.toLowerCase().includes(dirFilter.toLowerCase()) || v.category.toLowerCase().includes(dirFilter.toLowerCase()));

  return (
    <div style={{ padding: "40px 48px", maxWidth: "1100px", margin: "0 auto" }}>
      <div style={{ marginBottom: "32px" }}>
        <div style={{ fontSize: "11px", fontWeight: 600, letterSpacing: ".15em", textTransform: "uppercase", color: "#6B8BA8", marginBottom: "8px" }}>Personal CRM</div>
        <h1 style={{ fontFamily: "Georgia, serif", fontSize: "40px", fontWeight: 600, color: "#083358", letterSpacing: "-.02em", lineHeight: 1.1, marginBottom: "8px" }}>My Vendors</h1>
        <p style={{ fontSize: "14px", color: "#6B8BA8", fontWeight: 300 }}>Track every provider from first contact to hired.{vendors.length > 0 ? ` ${vendors.length} saved.` : ""}</p>
      </div>

      {vendors.length > 0 && (
        <div style={{ display: "flex", gap: "8px", marginBottom: "28px", flexWrap: "wrap" }}>
          {STATUS_OPTIONS.map(s => {
            const count = vendors.filter(v => v.status === s).length;
            const meta = STATUS_COLORS[s];
            return (
              <div key={s} style={{ display: "flex", alignItems: "center", gap: "6px", padding: "6px 14px", borderRadius: "20px", background: meta.bg, border: `1px solid ${meta.color}30` }}>
                <span style={{ fontSize: "12px", fontWeight: 700, color: meta.color }}>{count}</span>
                <span style={{ fontSize: "12px", color: meta.color, fontWeight: 500 }}>{s}</span>
              </div>
            );
          })}
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
        {vendors.map((vendor) => {
          const catMeta = getCatMeta(vendor.category);
          const statusMeta = STATUS_COLORS[vendor.status] || STATUS_COLORS["Researching"];
          return (
            <div key={vendor.id} onClick={() => { setSelectedVendor(vendor); setModal("detail"); }}
              style={{ background: "white", border: "1px solid #C8DFF0", borderRadius: "16px", padding: "22px", cursor: "pointer", display: "flex", flexDirection: "column", gap: "12px", minHeight: "172px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ width: "42px", height: "42px", borderRadius: "11px", background: catMeta.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px" }}>{catMeta.icon}</div>
                <span style={{ fontSize: "11px", fontWeight: 700, padding: "4px 10px", borderRadius: "20px", background: statusMeta.bg, color: statusMeta.color }}>{vendor.status}</span>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "Georgia, serif", fontSize: "17px", fontWeight: 600, color: "#083358", lineHeight: 1.25, marginBottom: "4px" }}>{vendor.name}</div>
                <div style={{ fontSize: "12px", color: catMeta.color, fontWeight: 600 }}>{vendor.category}</div>
                {vendor.repName && <div style={{ fontSize: "12px", color: "#6B8BA8", marginTop: "4px" }}>Contact: {vendor.repName}</div>}
              </div>
              <div style={{ fontSize: "12px", color: "#6B8BA8", fontWeight: 500 }}>Click to manage →</div>
            </div>
          );
        })}

        <div onClick={() => setModal("choose")}
          style={{ border: "2px dashed #C8DFF0", borderRadius: "16px", padding: "22px", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "12px", minHeight: "172px", background: "#FAFCFF" }}>
          <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: "#EDF4FB", border: "2px dashed #C8DFF0", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: "28px", color: "#C8DFF0", lineHeight: 1, marginTop: "-2px" }}>+</span>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "14px", fontWeight: 600, color: "#6B8BA8", marginBottom: "4px" }}>Add a Vendor</div>
            <div style={{ fontSize: "12px", color: "#C8DFF0" }}>From directory or manually</div>
          </div>
        </div>
      </div>

      {modal !== "none" && (
        <div onClick={closeModal} style={{ position: "fixed", inset: 0, background: "rgba(2,13,28,.55)", backdropFilter: "blur(4px)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
          <div onClick={e => e.stopPropagation()} style={{ background: "white", borderRadius: "20px", width: "100%", maxWidth: "540px", maxHeight: "85vh", overflow: "hidden", display: "flex", flexDirection: "column" }}>

            {modal === "choose" && (
              <>
                <div style={{ padding: "28px 28px 20px", borderBottom: "1px solid #C8DFF0" }}>
                  <div style={{ fontFamily: "Georgia, serif", fontSize: "24px", fontWeight: 600, color: "#083358", marginBottom: "6px" }}>Add a Vendor</div>
                  <div style={{ fontSize: "13px", color: "#6B8BA8" }}>Choose from our curated directory or add your own.</div>
                </div>
                <div style={{ padding: "24px 28px", display: "flex", flexDirection: "column", gap: "12px" }}>
                  <button onClick={() => setModal("directory")} style={{ display: "flex", alignItems: "center", gap: "16px", padding: "18px 20px", borderRadius: "14px", border: "1px solid #C8DFF0", background: "#EDF4FB", cursor: "pointer", textAlign: "left", width: "100%" }}>
                    <div style={{ width: "44px", height: "44px", borderRadius: "10px", background: "linear-gradient(135deg, #0569B8, #00B9D1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px", flexShrink: 0 }}>⭐</div>
                    <div>
                      <div style={{ fontFamily: "Georgia, serif", fontSize: "17px", fontWeight: 600, color: "#083358", marginBottom: "3px" }}>Choose from Directory</div>
                      <div style={{ fontSize: "13px", color: "#6B8BA8" }}>Pick from our 14 vetted providers for Spain</div>
                    </div>
                  </button>
                  <button onClick={() => setModal("manual")} style={{ display: "flex", alignItems: "center", gap: "16px", padding: "18px 20px", borderRadius: "14px", border: "1px solid #C8DFF0", background: "white", cursor: "pointer", textAlign: "left", width: "100%" }}>
                    <div style={{ width: "44px", height: "44px", borderRadius: "10px", background: "#EDF4FB", border: "1px solid #C8DFF0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px", flexShrink: 0 }}>✏️</div>
                    <div>
                      <div style={{ fontFamily: "Georgia, serif", fontSize: "17px", fontWeight: 600, color: "#083358", marginBottom: "3px" }}>Add a Different Vendor</div>
                      <div style={{ fontSize: "13px", color: "#6B8BA8" }}>Manually enter vendor details</div>
                    </div>
                  </button>
                </div>
                <div style={{ padding: "0 28px 28px" }}>
                  <button onClick={closeModal} style={{ width: "100%", padding: "12px", borderRadius: "10px", border: "1px solid #C8DFF0", background: "white", cursor: "pointer", fontSize: "13px", color: "#6B8BA8" }}>Cancel</button>
                </div>
              </>
            )}

            {modal === "directory" && (
              <>
                <div style={{ padding: "28px 28px 16px", borderBottom: "1px solid #C8DFF0" }}>
                  <button onClick={() => setModal("choose")} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "13px", color: "#6B8BA8", marginBottom: "12px", padding: 0 }}>← Back</button>
                  <div style={{ fontFamily: "Georgia, serif", fontSize: "24px", fontWeight: 600, color: "#083358", marginBottom: "12px" }}>Choose from Directory</div>
                  <input placeholder="Search providers..." value={dirFilter} onChange={e => setDirFilter(e.target.value)}
                    style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid #C8DFF0", fontSize: "14px", color: "#083358", background: "#EDF4FB", outline: "none" }} />
                </div>
                <div style={{ overflowY: "auto", flex: 1, padding: "12px 28px" }}>
                  {filteredDir.map((dv) => {
                    const catMeta = getCatMeta(dv.category);
                    const alreadyAdded = alreadySaved.has(dv.name);
                    return (
                      <div key={dv.name} onClick={() => !alreadyAdded && addFromDirectory(dv)}
                        style={{ display: "flex", alignItems: "center", gap: "12px", padding: "14px 12px", borderRadius: "10px", marginBottom: "4px", cursor: alreadyAdded ? "default" : "pointer", background: alreadyAdded ? "#F8F8F8" : "white", opacity: alreadyAdded ? 0.5 : 1 }}>
                        <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: catMeta.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", flexShrink: 0 }}>{catMeta.icon}</div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: "14px", fontWeight: 600, color: "#083358" }}>{dv.name}</div>
                          <div style={{ fontSize: "12px", color: catMeta.color, fontWeight: 500 }}>{dv.category}</div>
                        </div>
                        <div style={{ fontSize: "12px", fontWeight: 600, color: alreadyAdded ? "#C8DFF0" : "#0569B8" }}>{alreadyAdded ? "Added" : "+ Add"}</div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}

            {modal === "manual" && (
              <>
                <div style={{ padding: "28px 28px 16px", borderBottom: "1px solid #C8DFF0" }}>
                  <button onClick={() => setModal("choose")} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "13px", color: "#6B8BA8", marginBottom: "12px", padding: 0 }}>← Back</button>
                  <div style={{ fontFamily: "Georgia, serif", fontSize: "24px", fontWeight: 600, color: "#083358" }}>Add a Vendor</div>
                </div>
                <div style={{ overflowY: "auto", flex: 1, padding: "20px 28px", display: "flex", flexDirection: "column", gap: "14px" }}>
                  {[
                    { label: "Vendor / Company Name *", key: "name", placeholder: "e.g. Lexidy Law Boutique", type: "text" },
                    { label: "Contact / Rep Name", key: "repName", placeholder: "e.g. Maria García", type: "text" },
                    { label: "Phone Number", key: "phone", placeholder: "e.g. +34 93 000 0000", type: "tel" },
                    { label: "Email Address", key: "email", placeholder: "e.g. maria@lexidy.com", type: "email" },
                    { label: "Website", key: "website", placeholder: "e.g. https://lexidy.com", type: "url" },
                  ].map((field) => (
                    <div key={field.key}>
                      <label style={{ display: "block", fontSize: "11px", fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: "#6B8BA8", marginBottom: "6px" }}>{field.label}</label>
                      <input type={field.type} placeholder={field.placeholder} value={form[field.key]} onChange={e => setForm(prev => ({ ...prev, [field.key]: e.target.value }))}
                        style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid #C8DFF0", fontSize: "14px", color: "#083358", background: "#EDF4FB", outline: "none" }} />
                    </div>
                  ))}
                  <div>
                    <label style={{ display: "block", fontSize: "11px", fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: "#6B8BA8", marginBottom: "6px" }}>Category</label>
                    <select value={form.category} onChange={e => setForm(prev => ({ ...prev, category: e.target.value }))}
                      style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid #C8DFF0", fontSize: "14px", color: "#083358", background: "#EDF4FB", outline: "none" }}>
                      {CATEGORY_OPTIONS.map(c => <option key={c.value} value={c.value}>{c.icon} {c.value}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "11px", fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: "#6B8BA8", marginBottom: "6px" }}>Notes</label>
                    <textarea placeholder="e.g. Quoted €800, waiting on callback..." value={form.notes} onChange={e => setForm(prev => ({ ...prev, notes: e.target.value }))} rows={3}
                      style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid #C8DFF0", fontSize: "14px", color: "#083358", background: "#EDF4FB", outline: "none", resize: "vertical", fontFamily: "inherit" }} />
                  </div>
                </div>
                <div style={{ padding: "16px 28px 28px", display: "flex", gap: "10px" }}>
                  <button onClick={closeModal} style={{ flex: 1, padding: "12px", borderRadius: "10px", border: "1px solid #C8DFF0", background: "white", cursor: "pointer", fontSize: "13px", color: "#6B8BA8" }}>Cancel</button>
                  <button onClick={addManual} style={{ flex: 2, padding: "12px", borderRadius: "10px", border: "none", background: form.name.trim() ? "linear-gradient(135deg, #0569B8, #00B9D1)" : "#EDF4FB", color: form.name.trim() ? "white" : "#C8DFF0", cursor: form.name.trim() ? "pointer" : "default", fontSize: "13px", fontWeight: 700 }}>
                    Add Vendor
                  </button>
                </div>
              </>
            )}

            {modal === "detail" && selectedVendor && (
              <>
                <div style={{ padding: "28px 28px 16px", borderBottom: "1px solid #C8DFF0" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "4px" }}>
                    <div style={{ fontFamily: "Georgia, serif", fontSize: "24px", fontWeight: 600, color: "#083358" }}>{selectedVendor.name}</div>
                    <button onClick={closeModal} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "22px", color: "#C8DFF0", lineHeight: 1 }}>×</button>
                  </div>
                  <div style={{ fontSize: "13px", color: getCatMeta(selectedVendor.category).color, fontWeight: 600 }}>{selectedVendor.category}</div>
                </div>
                <div style={{ overflowY: "auto", flex: 1, padding: "20px 28px", display: "flex", flexDirection: "column", gap: "16px" }}>
                  <div>
                    <div style={{ fontSize: "11px", fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: "#6B8BA8", marginBottom: "10px" }}>Status</div>
                    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                      {STATUS_OPTIONS.map(s => {
                        const meta = STATUS_COLORS[s];
                        const active = selectedVendor.status === s;
                        return (
                          <button key={s} onClick={() => updateStatus(selectedVendor.id, s)}
                            style={{ padding: "7px 14px", borderRadius: "20px", border: `1px solid ${active ? meta.color : "#C8DFF0"}`, background: active ? meta.bg : "white", color: active ? meta.color : "#6B8BA8", fontSize: "12px", fontWeight: active ? 700 : 400, cursor: "pointer" }}>
                            {s}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    {selectedVendor.repName && (
                      <div style={{ display: "flex", gap: "12px", padding: "12px 14px", background: "#EDF4FB", borderRadius: "10px" }}>
                        <span style={{ fontSize: "12px", color: "#6B8BA8", width: "80px", flexShrink: 0 }}>Contact</span>
                        <span style={{ fontSize: "13px", fontWeight: 600, color: "#083358" }}>{selectedVendor.repName}</span>
                      </div>
                    )}
                    {selectedVendor.email && (
                      <div style={{ display: "flex", gap: "12px", padding: "12px 14px", background: "#EDF4FB", borderRadius: "10px" }}>
                        <span style={{ fontSize: "12px", color: "#6B8BA8", width: "80px", flexShrink: 0 }}>Email</span>
                        <a href={`mailto:${selectedVendor.email}`} style={{ fontSize: "13px", fontWeight: 600, color: "#0569B8" }}>{selectedVendor.email}</a>
                      </div>
                    )}
                    {selectedVendor.phone && (
                      <div style={{ display: "flex", gap: "12px", padding: "12px 14px", background: "#EDF4FB", borderRadius: "10px" }}>
                        <span style={{ fontSize: "12px", color: "#6B8BA8", width: "80px", flexShrink: 0 }}>Phone</span>
                        <a href={`tel:${selectedVendor.phone}`} style={{ fontSize: "13px", fontWeight: 600, color: "#0569B8" }}>{selectedVendor.phone}</a>
                      </div>
                    )}
                    {selectedVendor.website && (
                      <div style={{ display: "flex", gap: "12px", padding: "12px 14px", background: "#EDF4FB", borderRadius: "10px" }}>
                        <span style={{ fontSize: "12px", color: "#6B8BA8", width: "80px", flexShrink: 0 }}>Website</span>
                        <a href={selectedVendor.website} target="_blank" rel="noopener noreferrer" style={{ fontSize: "13px", fontWeight: 600, color: "#0569B8" }}>Visit website →</a>
                      </div>
                    )}
                    {selectedVendor.notes && (
                      <div style={{ padding: "12px 14px", background: "#EDF4FB", borderRadius: "10px" }}>
                        <div style={{ fontSize: "12px", color: "#6B8BA8", marginBottom: "6px" }}>Notes</div>
                        <div style={{ fontSize: "13px", color: "#2E4A68", lineHeight: 1.6 }}>{selectedVendor.notes}</div>
                      </div>
                    )}
                  </div>
                </div>
                <div style={{ padding: "16px 28px 28px", display: "flex", gap: "10px" }}>
                  <button onClick={() => removeVendor(selectedVendor.id)} style={{ flex: 1, padding: "12px", borderRadius: "10px", border: "1px solid #FAEDE8", background: "#FAEDE8", cursor: "pointer", fontSize: "13px", color: "#7A3F28", fontWeight: 600 }}>Remove</button>
                  <button onClick={closeModal} style={{ flex: 2, padding: "12px", borderRadius: "10px", border: "none", background: "linear-gradient(135deg, #0569B8, #00B9D1)", color: "white", cursor: "pointer", fontSize: "13px", fontWeight: 700 }}>Done</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
