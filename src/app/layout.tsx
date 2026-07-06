import type { Metadata } from "next";
import { Fraunces, Manrope, Space_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Providers from "@/components/providers";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-space-mono",
  weight: ["400", "700"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://crownixstore.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Crownix Store — Luxury Within Reach",
    template: "%s | Crownix Store",
  },
  description:
    "Crownix Store crafts premium watches — automatic, quartz, skeleton and sport collections — designed in-house and priced for the modern collector. Luxury within reach.",
  keywords: [
    "Crownix",
    "Crownix Store",
    "luxury watches Pakistan",
    "automatic watches",
    "premium watches online",
  ],
  openGraph: {
    title: "Crownix Store — Luxury Within Reach",
    description:
      "Premium watches designed in-house. Automatic, quartz, skeleton and sport collections.",
    url: siteUrl,
    siteName: "Crownix Store",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Crownix Store — Luxury Within Reach",
    description: "Premium watches designed in-house.",
  },
  icons: { icon: "/favicon.ico" },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${manrope.variable} ${spaceMono.variable}`}>
      <body>
        <Providers>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:bg-champagne focus:text-onyx focus:px-4 focus:py-2"
          >
            Skip to content
          </a>
          <Navbar />
          <main id="main-content">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
