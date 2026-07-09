import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FinalCta } from "@/components/ui/final-cta";
import { Brain, Briefcase, Building2, FlaskConical, GraduationCap, Package, ShieldCheck, Sparkles, Target } from "lucide-react";

import Image from "next/image";

export const metadata: Metadata = {
  title: "PROVOID-Company | Neuromarketing-Agentur Hamburg",
  description: "Hamburgs erste Neuromarketing-Agentur. Exklusive Betreuung, maßgeschneiderte Lösungen und Workshops – wissenschaftlich fundiert und diskret.",
  alternates: {
    canonical: "/company",
  },
};

export default function CompanyPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-primary/20 to-background py-[48px] md:py-[77px]">
        <div className="container px-4 md:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              <span className="text-primary">PROVOID</span>-Company
            </h1>
            <p className="text-lg text-muted-foreground md:text-xl">
              Hamburgs erste Neuromarketing-Agentur
            </p>
            <div className="relative mt-2 flex justify-center">
              <div aria-hidden className="pointer-events-none absolute inset-0 mx-auto flex justify-center items-center">
                <div className="h-48 w-48 md:h-64 md:w-64 lg:h-72 lg:w-72 rounded-full bg-primary/40 blur-[56px] animate-pulse" />
              </div>
              <Image
                src="/brain.png"
                alt="Gehirn Illustration 1"
                width={768}
                height={768}
                priority
                loading="eager"
                quality={90}
                className="relative mx-auto h-auto w-72 md:w-[28rem] lg:w-[32rem] drop-shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>
      {/* Content Section */}
      <section className="container px-4 md:px-6 lg:px-8 py-[38px] md:py-[58px]">
        <div className="mx-auto max-w-7xl">
          <div className="space-y-12">
            <div className="rounded-2xl border bg-card p-8 md:p-12 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-primary/10 p-3">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold tracking-tight">Produktübersicht PROVOID-Company</h2>
                  <p className="mt-3 text-muted-foreground max-w-prose leading-relaxed">
                    Wähle das passende Format – kompakt zum Einstieg oder tiefgehend für datenbasierte Produktentscheidungen.
                  </p>
                </div>
              </div>

              <div className="mt-10 space-y-6">
                <div className="rounded-2xl border bg-gradient-to-br from-primary/5 to-transparent p-7 md:p-8 shadow-sm">
                  <div className="grid gap-6 md:grid-cols-12 md:items-start">
                    <div className="md:col-span-5">
                      <div className="flex items-start gap-4">
                        <div className="rounded-xl bg-primary/10 p-3 text-primary">
                          <GraduationCap className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-semibold leading-snug">Seminar: Neuroscience &amp; Neuromarketing</h3>
                          <p className="mt-3 text-muted-foreground leading-relaxed max-w-prose">
                            Kompakte Einführung in Neuromarketing &amp; Consumer Neuroscience – verständlich, praxisnah und direkt anwendbar.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="md:col-span-7">
                      <ul className="space-y-2 text-sm md:text-base text-muted-foreground list-disc pl-5 leading-relaxed">
                        <li>Bessere Kunden- und Kaufprozess-Insights</li>
                        <li>Neue Perspektiven für Entwicklung &amp; Marketing</li>
                        <li>Wissenschaftliches Fundament für Strategien</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border bg-gradient-to-br from-primary/5 to-transparent p-7 md:p-8 shadow-sm">
                  <div className="grid gap-6 md:grid-cols-12 md:items-start">
                    <div className="md:col-span-5">
                      <div className="flex items-start gap-4">
                        <div className="rounded-xl bg-primary/10 p-3 text-primary">
                          <Sparkles className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-semibold leading-snug">Workshop: Branchenspezifisch &amp; Hands-On</h3>
                          <p className="mt-3 text-muted-foreground leading-relaxed max-w-prose">
                            Maßgeschneidertes Format mit klaren Strategien und konkreten Umsetzungs-Sprints – für Branding, Marketing, Produktentwicklung und Produktdesign.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="md:col-span-7">
                      <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-prose">
                        Ideal, wenn Sie nicht nur Wissen wollen, sondern direkt konkrete Entscheidungen und Umsetzungen anstoßen möchten.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border bg-gradient-to-br from-primary/5 to-transparent p-7 md:p-8 shadow-sm">
                  <div className="grid gap-6 md:grid-cols-12 md:items-start">
                    <div className="md:col-span-5">
                      <div className="flex items-start gap-4">
                        <div className="rounded-xl bg-primary/10 p-3 text-primary">
                          <Brain className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-semibold leading-snug">EEG-Produktevaluation &amp; Analyse</h3>
                          <p className="mt-3 text-muted-foreground leading-relaxed max-w-prose">
                            Testung der neuronalen Wirkung von Produkten (z. B. per EEG, optional ergänzend fMRI) – inkl. Interpretation &amp; Handlungsempfehlungen für datenbasierte Entscheidungen im Produktdesign.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="md:col-span-7">
                      <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-prose">
                        Besonders sinnvoll bei high-stakes Entscheidungen (Positionierung, Produktvarianten, Design), bei denen reine Befragungen oft zu kurz greifen.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border bg-gradient-to-br from-primary/5 to-transparent p-7 md:p-8 shadow-sm">
                  <div className="grid gap-6 md:grid-cols-12 md:items-start">
                    <div className="md:col-span-5">
                      <div className="flex items-start gap-4">
                        <div className="rounded-xl bg-primary/10 p-3 text-primary">
                          <Package className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-semibold leading-snug">Begleitende Produktentwicklung</h3>
                          <p className="mt-3 text-muted-foreground leading-relaxed max-w-prose">
                            Kontinuierliche Begleitung von der Idee bis zur Umsetzung – mit neurowissenschaftlicher Perspektive, Feedback-Loops und Priorisierung für bessere Produkt- und Marketingentscheidungen.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="md:col-span-7">
                      <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-prose">
                        Für Teams, die schnell lernen, iterieren und messbar bessere Entscheidungen treffen möchten – ohne den Fokus im Alltag zu verlieren.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border bg-card p-6 md:p-8 shadow-sm">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight">Bereit für den nächsten Schritt?</h2>
                  <p className="mt-1 text-muted-foreground">
                    Buchen Sie direkt einen Termin – schnell, unverbindlich und ohne Umwege.
                  </p>
                </div>
                <Link href="/kontakt" className="w-full md:w-auto">
                  <Button size="lg" className="w-full md:w-auto">Termin buchen</Button>
                </Link>
              </div>
            </div>

            <div className="rounded-2xl border bg-card p-8 md:p-12 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-primary/10 p-3">
                  <Brain className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold tracking-tight">Unser Ansatz</h2>
                  <p className="mt-1 text-muted-foreground">Wissenschaftlich fundiert, individuell und diskret – so arbeiten wir mit Ihnen.</p>
                </div>
              </div>

              <div className="mt-10 space-y-6">
                <div className="rounded-2xl border bg-gradient-to-br from-primary/5 to-transparent p-7 md:p-8 shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="rounded-full bg-primary/10 p-3">
                      <Sparkles className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold">Wer wir sind</h3>
                  </div>
                  <div className="prose prose-neutral dark:prose-invert max-w-none mt-4">
                    <p>
                      PROVOID ist Hamburgs erste Neuromarketing-Agentur. Wir nutzen neurowissenschaftliche Erkenntnisse als Fundament unserer Arbeit – gehen aber weit darüber hinaus. Anders als klassische Agenturen arbeiten wir nicht nur von außen, sondern begleiten Sie auf Wunsch auch direkt vor Ort.
                    </p>
                    <p>
                      Was uns auszeichnet: Wir sind junge Unternehmerinnen, die sich mit Kreativität, Expertise und Neugier in jeden Kunden einarbeiten, um das Maximum zu erreichen. Wir kommen zu Ihnen ins Unternehmen, arbeiten uns tief in Ihre Branche ein und verstehen Ihre internen und externen Prozesse. So entstehen Lösungen, die wirklich zu Ihnen passen – keine Templates, keine Standardkonzepte.
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl border bg-gradient-to-br from-primary/5 to-transparent p-7 md:p-8 shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="rounded-full bg-primary/10 p-3">
                      <Building2 className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold">Exklusive Betreuung</h3>
                  </div>
                  <div className="prose prose-neutral dark:prose-invert max-w-none mt-4">
                    <p>
                      Jeder Kunde wird bei uns exklusiv betreut. Wir arbeiten intensiv und persönlich – direkt vor Ort in Ihrem Unternehmen. So lernen wir Ihre Kultur, Ihre Herausforderungen und Ihre Ziele aus erster Hand kennen.
                    </p>
                    <p>
                      Ob interne Prozesse, Kundenreisen oder digitale Touchpoints: Wir analysieren, was für Ihr Unternehmen relevant ist, und entwickeln maßgeschneiderte Strategien und Lösungen.
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl border bg-gradient-to-br from-primary/5 to-transparent p-7 md:p-8 shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="rounded-full bg-primary/10 p-3">
                      <FlaskConical className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold">Forschung &amp; Entwicklung</h3>
                  </div>
                  <div className="prose prose-neutral dark:prose-invert max-w-none mt-4">
                    <p>
                      Wir sind nicht nur Anwender, sondern forschen kontinuierlich selbst. Unser Ziel: immer auf dem neuesten Stand der Neurowissenschaft zu sein und dieses Wissen direkt in unsere Arbeit einfließen zu lassen.
                    </p>
                    <p>
                      Wir entwickeln eigene Programme und Tools auf Basis von EEG-Messungen, um Erkenntnisse über kognitive Prozesse messbar und nutzbar zu machen. So verbinden wir wissenschaftliche Tiefe mit praktischer Anwendung.
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl border bg-gradient-to-br from-primary/5 to-transparent p-7 md:p-8 shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="rounded-full bg-primary/10 p-3">
                      <ShieldCheck className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold">Diskretion &amp; Vertrauen</h3>
                  </div>
                  <div className="prose prose-neutral dark:prose-invert max-w-none mt-4">
                    <p>
                      Diskretion ist die Basis unserer Arbeit. Wir verstehen, dass wir als externe Partner tiefe Einblicke in Ihr Unternehmen erhalten. Dieses Vertrauen nehmen wir ernst.
                    </p>
                    <p>
                      Alle Informationen, Strategien und Entwicklungen bleiben streng vertraulich. Wir arbeiten im Hintergrund und treten nicht als sichtbarer Partner auf – es sei denn, Sie wünschen es ausdrücklich.
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl border bg-gradient-to-br from-primary/5 to-transparent p-7 md:p-8 shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="rounded-full bg-primary/10 p-3">
                      <Target className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold">Flexibel &amp; Individuell</h3>
                  </div>
                  <div className="prose prose-neutral dark:prose-invert max-w-none mt-4">
                    <p>
                      Jedes Unternehmen ist anders. Deshalb gibt es bei uns keine starren Pakete oder festgelegten Abläufe. Wir passen uns an – an Ihre Branche, Ihre Größe, Ihre Ziele und Ihren Zeitrahmen.
                    </p>
                    <ul className="space-y-2 pl-6 list-disc">
                      <li>Projektbasierte Zusammenarbeit oder langfristige Partnerschaft</li>
                      <li>Einmalige Beratung oder kontinuierliche Begleitung</li>
                      <li>Einzelne Services oder ganzheitliche Lösungen</li>
                      <li>Vor Ort, remote oder hybrid</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <FinalCta />
          </div>
        </div>
      </section>
    </div>
  );
}
