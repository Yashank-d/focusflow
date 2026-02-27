import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/components/AuthProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

// ─── Metadata ───────────────────────────────────────────────────────────────
const APP_URL = "https://focusflowproject.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: {
    default: "FocusFlow — Studio Manager for Photographers",
    template: "%s · FocusFlow",
  },
  description:
    "FocusFlow is a full-stack studio management platform for freelance photographers. Manage clients, track projects, share sneak peeks, and collect payments via Razorpay — all in one clean dashboard.",
  keywords: [
    "photographer studio manager",
    "photography client management",
    "razorpay payment photographer",
    "freelance photographer tools",
    "photography invoice app",
    "Next.js SaaS project",
  ],
  authors: [{ name: "Yashank D", url: "https://github.com/Yashank-d" }],
  creator: "Yashank D",

  // ── Open Graph ────────────────────────────────────────────────────────────
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: APP_URL,
    siteName: "FocusFlow",
    title: "FocusFlow — Studio Manager for Photographers",
    description:
      "Manage clients, track projects, share sneak peeks & collect payments. The all-in-one workspace for freelance photographers.",
    images: [
      {
        url: "/og-image.png", 
        width: 1200,
        height: 630,
        alt: "FocusFlow — Studio Manager for Photographers",
      },
    ],
  },

  // ── Twitter / X ──────────────────────────────────────────────────────────
  twitter: {
    card: "summary_large_image",
    title: "FocusFlow — Studio Manager for Photographers",
    description:
      "Manage clients, track projects, share sneak peeks & collect payments via Razorpay. Built with Next.js 14, TypeScript, Prisma & Supabase.",
    images: ["/og-image.png"],
    creator: "@yashank_d",
  },

  // ── Canonical ─────────────────────────────────────────────────────────────
  alternates: {
    canonical: APP_URL,
  },

  // ── Robots ────────────────────────────────────────────────────────────────
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // ── Icons ─────────────────────────────────────────────────────────────────
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon-32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
};

// ─── Root Layout ─────────────────────────────────────────────────────────────
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfair.variable} antialiased bg-slate-950 text-white`}
      >
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
