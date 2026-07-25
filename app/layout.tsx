import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ThemeScript from "@/components/ThemeScript";
import { SITE_URL } from "@/lib/seo";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Fraunces: an editorial serif with optical sizing, used only for display
// headings — the contrast against Inter body copy is what gives the site
// its distinctive, premium feel instead of a uniform sans-everywhere look.
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz"],
});

const DEFAULT_TITLE = "CodeIT | Web, Mobile & AI Software Development Agency";
const DEFAULT_DESCRIPTION =
  "CodeIT is a full-spectrum technology partner building web, mobile, and AI-powered software for growing businesses — custom development meets automation.";

// Shared, sitewide defaults. Every route below defines its own `title` /
// `description` / `alternates.canonical`, which Next.js's metadata merging
// replaces these with — this is just the fallback for anything that
// doesn't (and the base every relative OG/canonical URL resolves against).
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: DEFAULT_TITLE,
  description: DEFAULT_DESCRIPTION,
  applicationName: "CodeIT",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: "CodeIT",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body
        className={`${inter.variable} ${fraunces.variable} font-sans antialiased`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
