import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PROVOID - Innovative Lösungen für Unternehmen und Sport",
  description: "PROVOID bietet innovative Lösungen für Unternehmen und Sport. Entdecken Sie PROVOID-Company und PROVOID-Sports.",
  keywords: ["PROVOID", "Company", "Sports", "Innovation", "Lösungen"],
  authors: [{ name: "PROVOID" }],
  openGraph: {
    title: "PROVOID - Innovative Lösungen für Unternehmen und Sport",
    description: "PROVOID bietet innovative Lösungen für Unternehmen und Sport.",
    type: "website",
    locale: "de_DE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex min-h-screen flex-col`}
      >
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
