import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Section } from "@/components/Section";
import { Button } from "@/components/ui/button";
import { AboutTeaser } from "@/components/ui/about-teaser";
import { Intro } from "@/components/ui/intro";
import { Success } from "@/components/ui/success";
import { Stats } from "@/components/ui/stats";
import { CtaCards } from "@/components/ui/cta-cards";
import { FinalCta } from "@/components/ui/final-cta";
import { GeminiCta } from "@/components/ui/gemini-cta";
import { Proof } from "@/components/ui/proof";
import { FlipWords } from "@/components/ui/flip-words";
import Image from "next/image";

export default function Home() {
  const words = ["Performance", "Leistung", "Erfolg", "Spitzenleistung"];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-primary/20 to-background pt-[40px] pb-[120px] md:pt-[80px] md:pb-[180px]">
        <div className="container px-4 md:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-6xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              <div>Neurowissenschaft für</div>
              <FlipWords words={words} className="text-6xl font-bold tracking-tight sm:text-5xl md:text-6xl text-primary" />
            </h1>
            <p className="mb-8 text-lg text-muted-foreground md:text-xl">
              no brain no gain
            </p>
            <div className="relative flex justify-center">
              <div aria-hidden className="pointer-events-none absolute inset-0 mx-auto flex justify-center items-center">
                <div className="h-48 w-48 md:h-64 md:w-64 lg:h-72 lg:w-72 rounded-full bg-primary/40 blur-[56px] animate-pulse" />
              </div>
              <Image
                src="/brain.png"
                alt="Gehirn Illustration"
                width={768}
                height={768}
                priority
                loading="eager"
                quality={90}
                className="relative mx-auto h-auto w-72 md:w-[28rem] lg:w-[32rem] drop-shadow-lg"
              />
            </div>
            <p className="mb-8 text-lg text-muted-foreground md:text-xl">
              <strong>Wir übersetzen neurowissenschaftliche Forschung in praktische Lösungen für Sportvereine und Unternehmen</strong>
            </p>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <Intro />

      {/* Proof Section (SB7: The Guide) */}
      <Proof />

      {/* Primary CTA with Gemini Effect */}
      <GeminiCta />

      {/* Stakes Section (SB7: Help them avoid failure) */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-bold">Verpasste Potenziale vermeiden</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-muted/30 border border-border rounded-lg p-6">
                <h4 className="text-lg font-semibold mb-2">Ohne einen klaren Ansatz</h4>
                <ul className="list-disc ml-5 text-muted-foreground space-y-1">
                  <li>Unklarheit über neuronale Stärken/Schwächen</li>
                  <li>Prokrastination und schwächere Entscheidungen</li>
                  <li>Geringe Entscheidungsfähigkeit</li>
                  <li>Verbindungen durch fehlende Stimulation</li>
                  <li>Unterdrücktes oder unentdecktes Potenzial</li>

                </ul>
              </div>
              <div className="bg-card border border-border rounded-lg p-6">
                <h4 className="text-lg font-semibold mb-2">Mit PROVOID</h4>
                <ul className="list-disc ml-5 text-muted-foreground space-y-1">
                  <li>Bewusste Nutzung neuronaler Fähigkeiten</li>
                  <li>Reduzierung von Prokrastination</li>
                  <li>Verbesserte Entscheidungsfähigkeit</li>
                  <li>Aufbau und Erhalt neuronaler Verbindungen durch gezielte Stimulationen</li>
                  <li>Entdeckung und Entfaltung von verborgenem Potenzial</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Section */}
      <Success />

      {/* About teaser (concise) */}
      <AboutTeaser />

      {/* Stats Section with Lamp Effect */}
      <Stats />

      {/* CTA Cards Section (final) */}
      <CtaCards />

      {/* Final CTA (SB7: Clear next step) */}
      <FinalCta />
    </div>
  );
}
