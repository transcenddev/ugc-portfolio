import type { Metadata } from "next";
import { Bricolage_Grotesque, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://reymar.example"),
  title:
    "Reymar Mirante — UGC Creator | Fitness, Grooming, Lifestyle, Self-Improvement & Tech",
  description:
    "Story-driven UGC for fitness, grooming, lifestyle, and tech brands. Short-form video, talking-head, product demos, and lifestyle b-roll by Reymar, a creator based in Cavite, Philippines.",
  keywords: [
    "UGC creator",
    "user generated content",
    "short-form video",
    "fitness content creator",
    "Philippines UGC",
  ],
  openGraph: {
    title: "Reymar — UGC Creator",
    description:
      "Story-driven UGC for fitness, grooming, lifestyle, and tech brands.",
    type: "website",
    locale: "en_PH",
  },
  twitter: {
    card: "summary_large_image",
    title: "Reymar — UGC Creator",
    description:
      "Story-driven UGC for fitness, grooming, lifestyle, and tech brands.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${bricolage.variable} h-full`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
