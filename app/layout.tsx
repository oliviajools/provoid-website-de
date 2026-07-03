import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.provoid.de/"),
  title: "PROVOID – Neurowissenschaft für Performance",
  description: "no brain. no gain. PROVOID übersetzt neurowissenschaftliche Forschung in klare, anwendbare Systeme für bessere Entscheidungen, stärkere Performance und messbare Entwicklung.",
  keywords: ["PROVOID", "Neurowissenschaft", "Performance", "Entscheidung", "Company", "Sports", "Neuro-Insights"],
  authors: [{ name: "PROVOID" }],
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`${inter.className} antialiased flex min-h-screen flex-col`}>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
