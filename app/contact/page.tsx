"use client";
import Footer from "@/components/footer";

import { useState } from "react";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [form, setForm] = useState({ name: "", email: "", subject: "General Inquiry", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "685d82be-8d83-4682-8872-430ae4f205fc",
          name: form.name,
          email: form.email,
          subject: `Arryvo Base — ${form.subject}`,
          message: form.message,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("sent");
        setForm({ name: "", email: "", subject: "General Inquiry", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const inputStyle = { width: "100%", padding: "12px 16px", borderRadius: "10px", border: "1px solid #C8DFF0", fontSize: "14px", color: "#083358", background: "white", outline: "none", fontFamily: "inherit" };
  const labelStyle = { display: "block", fontSize: "12px", fontWeight: 600, color: "#083358", marginBottom: "8px" };

  return (
    <main style={{ background: "#FAFCFF", minHeight: "100vh" }}>
      <nav style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(250,252,255,.9)", backdropFilter: "blur(16px)", borderBottom: "1px solid #C8DFF0", padding: "18px 48px" }}>
        <a href="/" style={{ fontFamily: "Georgia, serif", fontSize: "20px", fontWeight: 600, color: "#083358", textDecoration: "none" }}>
          Arryvo<span style={{ color: "#0569B8" }}>Base</span>
        </a>
      </nav>

      <div style={{ maxWidth: "560px", margin: "0 auto", padding: "80px 24px" }}>
        <div style={{ fontSize: "11px", fontWeight: 600, letterSpacing: ".15em", textTransform: "uppercase", color: "#0569B8", marginBottom: "16px" }}>
          Get In Touch
        </div>
        <h1 style={{ fontFamily: "Georgia, serif", fontSize: "40px", fontWeight: 600, color: "#083358", marginBottom: "12px" }}>
          Contact Us
        </h1>
        <p style={{ fontSize: "15px", color: "#6B8BA8", lineHeight: 1.7, fontWeight: 300, marginBottom: "40px" }}>
          Questions, feedback, or interested in partnering with us? We read every message.
        </p>

        {status === "sent" ? (
          <div style={{ padding: "32px", borderRadius: "16px", background: "#EDF2E8", border: "1px solid #C8DFE0", textAlign: "center" }}>
            <div style={{ fontSize: "32px", marginBottom: "12px" }}>✓</div>
            <div style={{ fontFamily: "Georgia, serif", fontSize: "20px", fontWeight: 600, color: "#083358", marginBottom: "8px" }}>Message sent</div>
            <p style={{ fontSize: "14px", color: "#6B8BA8" }}>Thanks for reaching out. We will get back to you soon.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div>
              <label style={labelStyle}>Your Name</label>
              <input required type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} style={inputStyle} placeholder="Jane Doe" />
            </div>
            <div>
              <label style={labelStyle}>Email Address</label>
              <input required type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} style={inputStyle} placeholder="jane@example.com" />
            </div>
            <div>
              <label style={labelStyle}>Subject</label>
              <select value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))} style={inputStyle}>
                <option>General Inquiry</option>
                <option>Partnership / Vendor Inquiry</option>
                <option>Account Support</option>
                <option>Billing Question</option>
                <option>Feedback</option>
              </select>
            </div>
            <div>
              <label style={labelStyle}>Message</label>
              <textarea required value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} rows={6} style={{ ...inputStyle, resize: "vertical" }} placeholder="How can we help?" />
            </div>
            <button type="submit" disabled={status === "sending"}
              style={{ padding: "14px", borderRadius: "10px", border: "none", background: status === "sending" ? "#C8DFF0" : "linear-gradient(135deg, #0569B8, #00B9D1)", color: "white", fontSize: "14px", fontWeight: 700, cursor: status === "sending" ? "default" : "pointer" }}>
              {status === "sending" ? "Sending..." : "Send Message"}
            </button>
            {status === "error" && (
              <p style={{ fontSize: "13px", color: "#7A3F28", textAlign: "center" }}>
                Something went wrong. Try again or email us directly at hello@arryvobase.com
              </p>
            )}
          </form>
        )}


      </div>
      <Footer />
    </main>
  );
}
