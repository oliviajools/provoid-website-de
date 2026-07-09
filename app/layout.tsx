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
  metadataBase: new URL("https://www.provoid.de/"),
  title: "PROVOID - Neurowissenschaft für Unternehmen und Sport",
  description: "PROVOID übersetzt neurowissenschaftliche Forschung in praktische Lösungen: Neuromarketing-Seminare, Neuroathletik-Training und wissenschaftlich fundierte Strategien für Unternehmen, Vereine und Athlet:innen.",
  keywords: ["PROVOID", "Neuromarketing", "Neuroathletik", "Neurowissenschaft", "Consumer Neuroscience", "Sport", "Unternehmen", "Hamburg"],
  authors: [{ name: "PROVOID" }],
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/favicon-provoid.png",
    shortcut: "/favicon-provoid.png",
    apple: "/favicon-provoid.png",
  },
  openGraph: {
    title: "PROVOID - Neurowissenschaft für Unternehmen und Sport",
    description: "Neuromarketing, Neuroathletik und wissenschaftlich fundierte Strategien. Wir übersetzen Forschung in praktische Lösungen.",
    type: "website",
    locale: "de_DE",
    url: "/",
    images: [
      {
        url: "/Logo-provoid.png",
        width: 1200,
        height: 1200,
        alt: "PROVOID Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/Logo-provoid.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className="scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />
        <meta name="google-site-verification" content="MI330QIxs0puUAD7Pr14Noq-CJ7t8pwlVHXTexld2wU" />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-F9JJV77GFZ"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-F9JJV77GFZ');
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex min-h-screen flex-col mx-auto w-full`}
        suppressHydrationWarning
      >
        <Header />
        <main className="flex-1 w-full" style={{ isolation: 'isolate' }}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
