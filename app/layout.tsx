import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { foundation } from "./foundation";
import RouteTransition from "./RouteTransition";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: `${foundation.company.short_name} | ${foundation.publication.masthead}`,
    template: `%s | ${foundation.company.short_name}`,
  },
  description: foundation.company.region_description,
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
        <RouteTransition />
        {children}
      </body>
    </html>
  );
}
