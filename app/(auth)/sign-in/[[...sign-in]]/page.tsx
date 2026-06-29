import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <main style={{ minHeight: "100vh", display: "grid", gridTemplateColumns: "1fr 1fr" }}>
      {/* Left panel */}
      <div style={{ background: "linear-gradient(145deg, #020D1C, #083358)", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "48px" }}>
        <a href="/" style={{ textDecoration: "none" }}>
          <span style={{ fontFamily: "Georgia, serif", fontSize: "24px", fontWeight: 600, color: "#C8EEF5" }}>
            Arryvo<span style={{ color: "#00B9D1" }}>Base</span>
          </span>
        </a>

        <div>
          <div style={{ fontSize: "11px", fontWeight: 600, letterSpacing: ".18em", textTransform: "uppercase", color: "rgba(200,238,245,.5)", marginBottom: "16px" }}>
            Welcome back
          </div>
          <h1 style={{ fontFamily: "Georgia, serif", fontSize: "42px", fontWeight: 600, color: "#C8EEF5", lineHeight: 1.1, letterSpacing: "-.02em", marginBottom: "20px" }}>
            Your relocation<br/>
            <em style={{ color: "#5DD3E3" }}>awaits.</em>
          </h1>
          <p style={{ fontSize: "15px", fontWeight: 300, color: "rgba(200,238,245,.6)", lineHeight: 1.75, maxWidth: "380px" }}>
            Sign back in to pick up where you left off — your checklist, vendors, and documents are all waiting.
          </p>
        </div>

        <div style={{ fontSize: "12px", color: "rgba(200,238,245,.25)" }}>
          © 2026 Arryvo Base · arryvobase.com
        </div>
      </div>

      {/* Right panel */}
      <div style={{ background: "#EDF4FB", display: "flex", alignItems: "center", justifyContent: "center", padding: "48px" }}>
        <div style={{ width: "100%", maxWidth: "420px" }}>
          <div style={{ marginBottom: "32px" }}>
            <h2 style={{ fontFamily: "Georgia, serif", fontSize: "28px", fontWeight: 600, color: "#083358", marginBottom: "8px" }}>
              Sign in
            </h2>
            <p style={{ fontSize: "14px", color: "#6B8BA8", fontWeight: 300 }}>
              Don't have an account? <a href="/sign-up" style={{ color: "#0569B8", fontWeight: 600 }}>Sign up free</a>
            </p>
          </div>
          <SignIn
            forceRedirectUrl="/dashboard"
            appearance={{
              elements: {
                rootBox: "w-full",
                card: "shadow-none bg-transparent p-0",
                headerTitle: "hidden",
                headerSubtitle: "hidden",
                socialButtonsBlockButton: "border border-[#C8DFF0] bg-white hover:bg-[#EDF4FB] text-[#083358]",
                formButtonPrimary: "bg-[#0569B8] hover:bg-[#083358]",
                footerActionLink: "text-[#0569B8]",
                formFieldInput: "border-[#C8DFF0] bg-white focus:border-[#0569B8]",
                dividerLine: "bg-[#C8DFF0]",
                dividerText: "text-[#6B8BA8]",
              },
            }}
          />
        </div>
      </div>
    </main>
  );
}
