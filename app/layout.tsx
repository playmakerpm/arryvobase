import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

export const metadata: Metadata = {
  title: "Arryvo Base — Your Command Center for Life Abroad",
  description: "Arryvo Base organizes every step of relocating abroad — visas, documents, timelines, and providers — so nothing falls through the cracks before you land.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,600;0,9..144,700;1,9..144,400;1,9..144,600&family=Outfit:wght@300;400;500;600&display=swap" rel="stylesheet" />
        </head>
        <body style={{ fontFamily: "'Outfit', system-ui, sans-serif", background: "#FAFCFF", color: "#020D1C" }}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
