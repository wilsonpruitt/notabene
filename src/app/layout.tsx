import type { Metadata } from "next";
import Link from "next/link";
import { Cormorant_Garamond, EB_Garamond } from "next/font/google";
import { PressMark } from "@/components/decorations";
import "./globals.css";

// Self-hosted at build time (zero CLS, no external request).
// EB Garamond carries full Danish (æ ø å) and a Greek subset for the
// single Greek phrase in Vol. VII; Cormorant Garamond is the titling face.
const ebGaramond = EB_Garamond({
  subsets: ["latin", "latin-ext", "greek", "greek-ext"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-body",
  display: "swap",
});
const cormorant = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Kierkegaard–Notabene Edition",
  description:
    "A bilingual critical edition of the eight phantom volumes of Nicolaus Notabene (1844–1847) — the books the 1844 Forord prefaced — with biographical companion and editorial apparatus. Wroot Press.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${ebGaramond.variable} ${cormorant.variable}`}>
      <head>
        <script defer src="/_vercel/insights/script.js"></script>
      </head>
      <body>
        <header className="site-header">
          <div className="header-inner">
            <Link
              href="/"
              style={{ display: "flex", alignItems: "center", gap: "1rem" }}
            >
              <PressMark />
              <div>
                <div className="header-title">The Kierkegaard–Notabene Edition</div>
                <div className="header-subtitle">
                  Otte Skygge-Bind · 1844–1847 · Wroot Press
                </div>
              </div>
            </Link>
          </div>
          <nav className="site-nav">
            <Link href="/">The Volumes</Link>
            <Link href="/general-introduction-henriksen">General Introduction</Link>
            <Link href="/historical-preface-hertel-1923">Hertel 1923</Link>
            <Link href="/translators-note">Translator’s Note</Link>
            <Link href="/glossary">Lexicon</Link>
            <Link href="/about">About</Link>
          </nav>
        </header>

        <main className="main-content">{children}</main>

        <footer className="site-footer">
          <p className="ff-1">
            Liv betragtes baglæns, men leves forlæns.
          </p>
          <p className="ff-2">
            The Kierkegaard–Notabene Edition · Wroot Press · MMXXVI
          </p>
        </footer>
      </body>
    </html>
  );
}
