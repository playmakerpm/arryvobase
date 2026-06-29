// @ts-nocheck
"use client";

import { useState, useEffect, useRef } from "react";
import { supabase } from "@/lib/supabase";
import { useUser } from "@clerk/nextjs";

const DOC_CATEGORIES = [
  { value: "Passport & ID", icon: "🛂", color: "#0569B8", bg: "#EDF4FB" },
  { value: "Visa Documents", icon: "📋", color: "#00B9D1", bg: "#E8F9FC" },
  { value: "Housing", icon: "🏠", color: "#5C6E46", bg: "#EDF2E8" },
  { value: "School Records", icon: "🎓", color: "#7A3F28", bg: "#FAEDE8" },
  { value: "Financial", icon: "💳", color: "#F5A623", bg: "#FDF4E7" },
  { value: "Health", icon: "🏥", color: "#083358", bg: "#EDF4FB" },
  { value: "Tax", icon: "📊", color: "#2E4A68", bg: "#EDF4FB" },
  { value: "Employment", icon: "💼", color: "#6B8BA8", bg: "#EDF4FB" },
  { value: "Other", icon: "📄", color: "#6B8BA8", bg: "#EDF4FB" },
];

const getCatMeta = (cat) => DOC_CATEGORIES.find(c => c.value === cat) || DOC_CATEGORIES[DOC_CATEGORIES.length - 1];

const formatSize = (bytes) => {
  if (!bytes) return "";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const formatDate = (iso) => {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
};

export default function DocumentsPage() {
  const [docs, setDocs] = useState([]);
  const [modal, setModal] = useState("none");
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [form, setForm] = useState({ name: "", category: "Passport & ID", notes: "", fileName: "", fileSize: 0, fileType: "" });
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef(null);

  const { user } = useUser();

  useEffect(() => {
    if (!user) return;
    const load = async () => {
      const { data } = await supabase
        .from("user_documents")
        .select("*")
        .eq("clerk_user_id", user.id)
        .order("created_at", { ascending: false });
      if (data) setDocs(data);
    };
    load();
  }, [user]);

  const saveDocs = (updated) => {
    setDocs(updated);
  };

  const handleFile = (file) => {
    if (!file) return;
    setForm(prev => ({ ...prev, fileName: file.name, fileSize: file.size, fileType: file.type, name: prev.name || file.name.replace(/\.[^/.]+$/, "") }));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const addDoc = async () => {
    if (!user || !form.name.trim()) return;
    const { data } = await supabase.from("user_documents").insert({
      clerk_user_id: user.id,
      name: form.name,
      category: form.category,
      notes: form.notes,
      file_name: form.fileName,
      file_size: form.fileSize,
      file_type: form.fileType,
    }).select().single();
    if (data) setDocs((prev) => [data, ...prev]);
    setModal("none");
    setForm({ name: "", category: "Passport & ID", notes: "", fileName: "", fileSize: 0, fileType: "" });
  };

  const removeDoc = async (id) => {
    await supabase.from("user_documents").delete().eq("id", id);
    setDocs((prev) => prev.filter((d) => d.id !== id));
    setSelectedDoc(null);
    setModal("none");
  };

  const closeModal = () => { setModal("none"); setSelectedDoc(null); setDragOver(false); };

  const docsByCategory = DOC_CATEGORIES.map(cat => ({
    ...cat,
    docs: docs.filter(d => d.category === cat.value),
  })).filter(cat => cat.docs.length > 0);

  return (
    <div style={{ padding: "40px 48px", maxWidth: "1100px", margin: "0 auto" }}>
      {/* Header */}
      <div style={{ marginBottom: "32px", display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontSize: "11px", fontWeight: 600, letterSpacing: ".15em", textTransform: "uppercase", color: "#6B8BA8", marginBottom: "8px" }}>Secure Storage</div>
          <h1 style={{ fontFamily: "Georgia, serif", fontSize: "40px", fontWeight: 600, color: "#083358", letterSpacing: "-.02em", lineHeight: 1.1, marginBottom: "8px" }}>Document Vault</h1>
          <p style={{ fontSize: "14px", color: "#6B8BA8", fontWeight: 300 }}>
            Upload and organize all your relocation documents.{docs.length > 0 ? ` ${docs.length} document${docs.length !== 1 ? "s" : ""} saved.` : ""}
          </p>
        </div>
      </div>

      {/* Category summary pills */}
      {docs.length > 0 && (
        <div style={{ display: "flex", gap: "8px", marginBottom: "28px", flexWrap: "wrap" }}>
          {DOC_CATEGORIES.filter(c => docs.some(d => d.category === c.value)).map(cat => {
            const count = docs.filter(d => d.category === cat.value).length;
            return (
              <div key={cat.value} style={{ display: "flex", alignItems: "center", gap: "6px", padding: "6px 14px", borderRadius: "20px", background: cat.bg, border: `1px solid ${cat.color}30` }}>
                <span style={{ fontSize: "13px" }}>{cat.icon}</span>
                <span style={{ fontSize: "12px", fontWeight: 700, color: cat.color }}>{count}</span>
                <span style={{ fontSize: "12px", color: cat.color, fontWeight: 500 }}>{cat.value}</span>
              </div>
            );
          })}
        </div>
      )}

      {/* Doc tiles grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
        {docs.map((doc) => {
          const catMeta = getCatMeta(doc.category);
          return (
            <div key={doc.id} onClick={() => { setSelectedDoc(doc); setModal("detail"); }}
              style={{ background: "white", border: "1px solid #C8DFF0", borderRadius: "16px", padding: "22px", cursor: "pointer", display: "flex", flexDirection: "column", gap: "12px", minHeight: "172px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ width: "42px", height: "42px", borderRadius: "11px", background: catMeta.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px" }}>{catMeta.icon}</div>
                <span style={{ fontSize: "11px", fontWeight: 700, padding: "4px 10px", borderRadius: "20px", background: catMeta.bg, color: catMeta.color }}>{doc.category}</span>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "Georgia, serif", fontSize: "16px", fontWeight: 600, color: "#083358", lineHeight: 1.25, marginBottom: "4px" }}>{doc.name}</div>
                {doc.file_name && <div style={{ fontSize: "12px", color: "#6B8BA8", marginBottom: "2px" }}>📎 {doc.file_name}</div>}
                {doc.file_size > 0 && <div style={{ fontSize: "11px", color: "#C8DFF0" }}>{formatSize(doc.file_size)}</div>}
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ fontSize: "11px", color: "#C8DFF0" }}>{formatDate(doc.created_at)}</div>
                <div style={{ fontSize: "12px", color: "#6B8BA8", fontWeight: 500 }}>View →</div>
              </div>
            </div>
          );
        })}

        {/* Add tile */}
        <div onClick={() => setModal("add")}
          style={{ border: "2px dashed #C8DFF0", borderRadius: "16px", padding: "22px", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "12px", minHeight: "172px", background: "#FAFCFF" }}>
          <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: "#EDF4FB", border: "2px dashed #C8DFF0", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: "28px", color: "#C8DFF0", lineHeight: 1, marginTop: "-2px" }}>+</span>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "14px", fontWeight: 600, color: "#6B8BA8", marginBottom: "4px" }}>Add a Document</div>
            <div style={{ fontSize: "12px", color: "#C8DFF0" }}>Upload or log a document</div>
          </div>
        </div>
      </div>

      {/* ── MODAL ── */}
      {modal !== "none" && (
        <div onClick={closeModal} style={{ position: "fixed", inset: 0, background: "rgba(2,13,28,.55)", backdropFilter: "blur(4px)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
          <div onClick={e => e.stopPropagation()} style={{ background: "white", borderRadius: "20px", width: "100%", maxWidth: "520px", maxHeight: "88vh", overflow: "hidden", display: "flex", flexDirection: "column" }}>

            {/* ADD modal */}
            {modal === "add" && (
              <>
                <div style={{ padding: "28px 28px 16px", borderBottom: "1px solid #C8DFF0" }}>
                  <div style={{ fontFamily: "Georgia, serif", fontSize: "24px", fontWeight: 600, color: "#083358", marginBottom: "6px" }}>Add a Document</div>
                  <div style={{ fontSize: "13px", color: "#6B8BA8" }}>Upload a file or log a document you have already submitted.</div>
                </div>
                <div style={{ overflowY: "auto", flex: 1, padding: "20px 28px", display: "flex", flexDirection: "column", gap: "16px" }}>

                  {/* File drop zone */}
                  <div
                    onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={handleDrop}
                    onClick={() => fileRef.current?.click()}
                    style={{ border: `2px dashed ${dragOver ? "#0569B8" : "#C8DFF0"}`, borderRadius: "12px", padding: "24px", textAlign: "center", cursor: "pointer", background: dragOver ? "#EDF4FB" : "#FAFCFF", transition: "all .15s" }}>
                    <input ref={fileRef} type="file" style={{ display: "none" }} onChange={e => handleFile(e.target.files?.[0])} />
                    {form.fileName ? (
                      <div>
                        <div style={{ fontSize: "24px", marginBottom: "6px" }}>📎</div>
                        <div style={{ fontSize: "14px", fontWeight: 600, color: "#083358", marginBottom: "4px" }}>{form.fileName}</div>
                        <div style={{ fontSize: "12px", color: "#6B8BA8" }}>{formatSize(form.fileSize)} · Click to change</div>
                      </div>
                    ) : (
                      <div>
                        <div style={{ fontSize: "28px", marginBottom: "8px" }}>☁️</div>
                        <div style={{ fontSize: "14px", fontWeight: 600, color: "#6B8BA8", marginBottom: "4px" }}>Drop a file here or click to upload</div>
                        <div style={{ fontSize: "12px", color: "#C8DFF0" }}>PDF, JPG, PNG, DOCX supported</div>
                      </div>
                    )}
                  </div>

                  {/* Document name */}
                  <div>
                    <label style={{ display: "block", fontSize: "11px", fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: "#6B8BA8", marginBottom: "6px" }}>Document Name *</label>
                    <input type="text" placeholder="e.g. NIE Application Confirmation" value={form.name} onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))}
                      style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid #C8DFF0", fontSize: "14px", color: "#083358", background: "#EDF4FB", outline: "none" }} />
                  </div>

                  {/* Category */}
                  <div>
                    <label style={{ display: "block", fontSize: "11px", fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: "#6B8BA8", marginBottom: "8px" }}>Category</label>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px" }}>
                      {DOC_CATEGORIES.map(cat => (
                        <button key={cat.value} onClick={() => setForm(prev => ({ ...prev, category: cat.value }))}
                          style={{ display: "flex", alignItems: "center", gap: "6px", padding: "8px 10px", borderRadius: "8px", border: `1px solid ${form.category === cat.value ? cat.color : "#C8DFF0"}`, background: form.category === cat.value ? cat.bg : "white", cursor: "pointer", fontSize: "12px", fontWeight: form.category === cat.value ? 700 : 400, color: form.category === cat.value ? cat.color : "#6B8BA8" }}>
                          <span>{cat.icon}</span>
                          <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{cat.value}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Notes */}
                  <div>
                    <label style={{ display: "block", fontSize: "11px", fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: "#6B8BA8", marginBottom: "6px" }}>Notes</label>
                    <textarea placeholder="e.g. Submitted to consulate on Jan 15. Awaiting response." value={form.notes} onChange={e => setForm(prev => ({ ...prev, notes: e.target.value }))} rows={3}
                      style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid #C8DFF0", fontSize: "14px", color: "#083358", background: "#EDF4FB", outline: "none", resize: "vertical", fontFamily: "inherit" }} />
                  </div>
                </div>
                <div style={{ padding: "16px 28px 28px", display: "flex", gap: "10px" }}>
                  <button onClick={closeModal} style={{ flex: 1, padding: "12px", borderRadius: "10px", border: "1px solid #C8DFF0", background: "white", cursor: "pointer", fontSize: "13px", color: "#6B8BA8" }}>Cancel</button>
                  <button onClick={addDoc} style={{ flex: 2, padding: "12px", borderRadius: "10px", border: "none", background: form.name.trim() ? "linear-gradient(135deg, #0569B8, #00B9D1)" : "#EDF4FB", color: form.name.trim() ? "white" : "#C8DFF0", cursor: form.name.trim() ? "pointer" : "default", fontSize: "13px", fontWeight: 700 }}>
                    Save Document
                  </button>
                </div>
              </>
            )}

            {/* DETAIL modal */}
            {modal === "detail" && selectedDoc && (
              <>
                <div style={{ padding: "28px 28px 16px", borderBottom: "1px solid #C8DFF0" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "4px" }}>
                    <div style={{ fontFamily: "Georgia, serif", fontSize: "22px", fontWeight: 600, color: "#083358", flex: 1, marginRight: "12px" }}>{selectedDoc.name}</div>
                    <button onClick={closeModal} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "22px", color: "#C8DFF0", lineHeight: 1, flexShrink: 0 }}>×</button>
                  </div>
                  <div style={{ fontSize: "13px", color: getCatMeta(selectedDoc.category).color, fontWeight: 600 }}>
                    {getCatMeta(selectedDoc.category).icon} {selectedDoc.category}
                  </div>
                </div>
                <div style={{ overflowY: "auto", flex: 1, padding: "20px 28px", display: "flex", flexDirection: "column", gap: "10px" }}>
                  {selectedDoc.file_name && (
                    <div style={{ display: "flex", gap: "12px", padding: "14px 16px", background: "#EDF4FB", borderRadius: "10px", alignItems: "center" }}>
                      <span style={{ fontSize: "24px" }}>📎</span>
                      <div>
                        <div style={{ fontSize: "13px", fontWeight: 600, color: "#083358" }}>{selectedDoc.file_name}</div>
                        {selectedDoc.file_size > 0 && <div style={{ fontSize: "12px", color: "#6B8BA8" }}>{formatSize(selectedDoc.file_size)}</div>}
                      </div>
                    </div>
                  )}
                  <div style={{ display: "flex", gap: "12px", padding: "12px 16px", background: "#EDF4FB", borderRadius: "10px" }}>
                    <span style={{ fontSize: "12px", color: "#6B8BA8", width: "80px", flexShrink: 0 }}>Added</span>
                    <span style={{ fontSize: "13px", fontWeight: 600, color: "#083358" }}>{formatDate(selectedDoc.created_at)}</span>
                  </div>
                  {selectedDoc.notes && (
                    <div style={{ padding: "14px 16px", background: "#EDF4FB", borderRadius: "10px" }}>
                      <div style={{ fontSize: "12px", color: "#6B8BA8", marginBottom: "6px" }}>Notes</div>
                      <div style={{ fontSize: "13px", color: "#2E4A68", lineHeight: 1.7 }}>{selectedDoc.notes}</div>
                    </div>
                  )}
                </div>
                <div style={{ padding: "16px 28px 28px", display: "flex", gap: "10px" }}>
                  <button onClick={() => removeDoc(selectedDoc.id)} style={{ flex: 1, padding: "12px", borderRadius: "10px", border: "1px solid #FAEDE8", background: "#FAEDE8", cursor: "pointer", fontSize: "13px", color: "#7A3F28", fontWeight: 600 }}>Remove</button>
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
