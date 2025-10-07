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
  title: "PROVOID - no brain no gain",
  description: "no brain no gain.",
  keywords: ["PROVOID", "Company", "Sports", "Innovation", "Lösungen"],
  authors: [{ name: "PROVOID" }],
  icons: {
    icon: "/favicon-provoid.png",
    shortcut: "/favicon-provoid.png",
    apple: "/favicon-provoid.png",
  },
  openGraph: {
    title: "PROVOID - no brain no gain",
    description: "no brain no gain",
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
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />
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
