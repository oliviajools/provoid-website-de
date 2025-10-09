import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Section } from "@/components/Section";
import { Button } from "@/components/ui/button";
import { AboutTeaser } from "@/components/ui/about-teaser";
import { Intro } from "@/components/ui/intro";
import { Success } from "@/components/ui/success";
import { CtaCards } from "@/components/ui/cta-cards";
import { FinalCta } from "@/components/ui/final-cta";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-primary/20 to-background pt-[40px] pb-[120px] md:pt-[80px] md:pb-[180px]">
        <div className="container px-4 md:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-6xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Neurowissenschaft für Performance
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

      {/* Guide Section (SB7: The Guide) */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container px-4 md:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-sm uppercase tracking-wider text-muted-foreground mb-4">Ihr Guide</h2>
            <h3 className="text-3xl md:text-4xl font-bold mb-6">Begleitung mit neurowissenschaftlicher Expertise</h3>
            <p className="text-lg text-muted-foreground">
              Wir übersetzen Forschung in anwendbare Schritte und begleiten Sie strukturiert – empathisch, klar und evidenzbasiert.
            </p>
            <div className="mt-8 text-sm text-muted-foreground">
              {/* Platzhalter: Referenzen/Logos/Partnerschaften */}
              <p>[Platzhalter: Referenzen, Logos/Partnerschaften – hier einfügen]</p>
            </div>
          </div>
        </div>
      </section>

      {/* Primary CTA Bar (SB7: Call To Action) */}
      <section className="py-10">
        <div className="container px-4 md:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl bg-card border border-border rounded-xl p-6 md:p-8 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
            <div>
              <h4 className="text-xl font-semibold">Starten Sie mit einem kostenlosen, unverbindlichen Gespräch</h4>
              <p className="text-muted-foreground">Klären Sie Ziele und nächste Schritte – in 20 Minuten.</p>
            </div>
            <div className="flex gap-3">
              <Link href="/kontakt">
                <Button size="lg">Beratungstermin vereinbaren</Button>
              </Link>
              <Link href="/ueber-uns" className="inline-flex">
                <Button size="lg" variant="outline">Mehr über uns</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stakes Section (SB7: Help them avoid failure) */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-sm uppercase tracking-wider text-muted-foreground mb-4">Was steht auf dem Spiel?</h2>
            <h3 className="text-3xl md:text-4xl font-bold mb-8">Verpasste Potenziale vermeiden</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-muted/30 border border-border rounded-lg p-6">
                <h4 className="text-lg font-semibold mb-2">Ohne einen klaren Ansatz</h4>
                <ul className="list-disc ml-5 text-muted-foreground space-y-1">
                  <li>Unklarheit über neuronale Stärken/Schwächen</li>
                  <li>Prokrastination und schwächere Entscheidungen</li>
                  <li>Unnötige Reibung in Teams und im Alltag</li>
                </ul>
              </div>
              <div className="bg-card border border-border rounded-lg p-6">
                <h4 className="text-lg font-semibold mb-2">Mit PROVOID</h4>
                <ul className="list-disc ml-5 text-muted-foreground space-y-1">
                  <li>Bewusste Nutzung neuronaler Fähigkeiten</li>
                  <li>Mehr Fokus, klarere Entscheidungen</li>
                  <li>Gesündere Zusammenarbeit und Lernen</li>
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

      {/* CTA Cards Section (final) */}
      <CtaCards />

      {/* Final CTA (SB7: Clear next step) */}
      <FinalCta />
    </div>
  );
}
