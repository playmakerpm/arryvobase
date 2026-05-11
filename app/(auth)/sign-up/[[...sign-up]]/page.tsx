import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <main className="min-h-screen flex items-center justify-center" style={{ background: "#EDF4FB" }}>
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <a href="/" className="inline-block">
            <span className="font-display text-3xl font-semibold" style={{ color: "#083358" }}>
              Arryvo<span style={{ color: "#0569B8" }}>Base</span>
            </span>
          </a>
          <p className="mt-2 text-sm font-body" style={{ color: "#6B8BA8" }}>
            Start your relocation journey — it&apos;s free
          </p>
        </div>
        <SignUp
          appearance={{
            elements: {
              rootBox: "w-full",
              card: "shadow-lg border border-[#C8DFF0] rounded-2xl",
              headerTitle: "font-display text-[#083358]",
              formButtonPrimary: "bg-[#0569B8] hover:bg-[#083358] transition-colors",
              footerActionLink: "text-[#0569B8] hover:text-[#083358]",
            },
          }}
        />
      </div>
    </main>
  );
}
