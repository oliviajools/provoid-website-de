import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.provoid.de/"),
  title: "PROVOID – Neurowissenschaft für Unternehmen und Sport",
  description: "PROVOID übersetzt neurowissenschaftliche Forschung in praktische Lösungen: Neuromarketing-Seminare und Beratung für Unternehmen, Neuroathletik-Programme für Vereine und Athlet:innen. Wissenschaftlich fundiert, messbar, aus Hamburg.",
  keywords: ["PROVOID", "Neuromarketing", "Neuroathletik", "Neurowissenschaft", "Consumer Neuroscience", "Performance", "Entscheidung", "Sport", "Unternehmen", "Hamburg"],
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
        <LanguageProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
