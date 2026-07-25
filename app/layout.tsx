import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { foundation } from "./foundation";
import RouteTransition from "./RouteTransition";
import { siteUrl } from "./site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${foundation.company.short_name} | ${foundation.publication.masthead}`,
    template: `%s | ${foundation.company.short_name}`,
  },
  description: foundation.company.region_description,
  alternates: { canonical: "/" },
  openGraph: {
    title: `${foundation.company.short_name} | ${foundation.publication.masthead}`,
    description: foundation.company.region_description,
    type: "website",
    url: "/",
    siteName: foundation.company.short_name,
  },
  keywords: [
    "medicine",
    "wellness",
    "health journalism",
    "medical research",
    "holistic health",
    "XYLENS",
  ],
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <a className="skip-link" href="#main-content">
          Skip to main content
        </a>
        <RouteTransition />
        {children}
      </body>
    </html>
  );
}
