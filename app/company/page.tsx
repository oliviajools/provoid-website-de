import { Metadata } from "next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Target, Eye, Briefcase, Package, Users, FlaskConical, BarChart3, Globe, Smartphone, Brain, Palette, MousePointer, TrendingUp, ShieldCheck, Building2, GraduationCap, Sparkles } from "lucide-react";

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
                alt="Gehirn Illustration"
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
        <div className="mx-auto max-w-4xl">
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="unterschied" className="rounded-2xl border bg-card px-6 shadow-sm">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-primary/10 p-3">
                    <Sparkles className="h-6 w-6 text-primary" />
                  </div>
                  <span className="text-xl font-semibold">Was uns unterscheidet</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-4 pb-6">
                <div className="prose prose-neutral dark:prose-invert max-w-none">
                  <p>
                    PROVOID ist Hamburgs erste Neuromarketing-Agentur. Wir nutzen neurowissenschaftliche Erkenntnisse als Fundament unserer Arbeit – gehen aber weit darüber hinaus. Anders als klassische Agenturen arbeiten wir nicht von außen, sondern werden Teil Ihres Teams.
                  </p>
                  <p>
                    Was uns auszeichnet: Wir sind junge Unternehmerinnen, die sich mit Kreativität, Expertise und Neugier in jeden Kunden einarbeiten, um das Maximum zu erreichen. Wir kommen zu Ihnen ins Unternehmen, arbeiten uns tief in Ihre Branche ein und verstehen Ihre internen und externen Prozesse. So entstehen Lösungen, die wirklich zu Ihnen passen – keine Templates, keine Standardkonzepte.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="ansatz" className="rounded-2xl border bg-card px-6 shadow-sm">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-primary/10 p-3">
                    <Brain className="h-6 w-6 text-primary" />
                  </div>
                  <span className="text-xl font-semibold">Unser Ansatz</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-4 pb-6">
                <div className="prose prose-neutral dark:prose-invert max-w-none">
                  <p>
                    Wir arbeiten auf Basis einer zentralen Grundannahme: Ein Großteil aller Prozesse – ob Kaufentscheidungen, Teamdynamiken oder Markenwahrnehmung – läuft unterbewusst ab. Diese verborgenen Mechanismen möchten wir aufdecken und nutzbar machen.
                  </p>
                  <p>
                    Unsere Arbeit hilft dabei, die Identität des Käufers und des Mitarbeiters zu klarifizieren. Wer sind Ihre Kunden wirklich? Was treibt Ihre Mitarbeitenden an? Durch neurowissenschaftliche Methoden machen wir sichtbar, was sonst im Verborgenen bleibt – und schaffen so die Basis für authentische Kommunikation und echte Verbindung.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="exklusiv" className="rounded-2xl border bg-card px-6 shadow-sm">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-primary/10 p-3">
                    <Building2 className="h-6 w-6 text-primary" />
                  </div>
                  <span className="text-xl font-semibold">Exklusive Betreuung</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-4 pb-6">
                <div className="prose prose-neutral dark:prose-invert max-w-none">
                  <p>
                    Jeder Kunde wird bei uns exklusiv betreut. Wir arbeiten intensiv und persönlich – direkt vor Ort in Ihrem Unternehmen. So lernen wir Ihre Kultur, Ihre Herausforderungen und Ihre Ziele aus erster Hand kennen.
                  </p>
                  <p>
                    Ob interne Prozesse, Kundenreisen oder digitale Touchpoints: Wir analysieren, was für Ihr Unternehmen relevant ist, und entwickeln maßgeschneiderte Strategien und Lösungen.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="leistungen" className="rounded-2xl border bg-card px-6 shadow-sm">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-primary/10 p-3">
                    <Briefcase className="h-6 w-6 text-primary" />
                  </div>
                  <span className="text-xl font-semibold">Unsere Leistungen</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-4 pb-6">
                <div className="prose prose-neutral dark:prose-invert max-w-none">
                  <div className="grid gap-4 md:grid-cols-2 not-prose mb-6">
                    <div className="p-4 rounded-xl border bg-muted/30">
                      <div className="flex items-center gap-3 mb-2">
                        <Brain className="h-5 w-5 text-primary" />
                        <h4 className="font-semibold">Neuromarketing-Beratung</h4>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Strategische Beratung auf Basis neurowissenschaftlicher Erkenntnisse für Marketing, Vertrieb und Kommunikation.
                      </p>
                    </div>
                    <div className="p-4 rounded-xl border bg-muted/30">
                      <div className="flex items-center gap-3 mb-2">
                        <Globe className="h-5 w-5 text-primary" />
                        <h4 className="font-semibold">Webseiten & Apps</h4>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Conversion-optimierte digitale Produkte, die auf kognitiven Prinzipien basieren.
                      </p>
                    </div>
                    <div className="p-4 rounded-xl border bg-muted/30">
                      <div className="flex items-center gap-3 mb-2">
                        <Smartphone className="h-5 w-5 text-primary" />
                        <h4 className="font-semibold">Software-Entwicklung</h4>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Individuelle Software-Lösungen, flexibel an Ihre Anforderungen angepasst.
                      </p>
                    </div>
                    <div className="p-4 rounded-xl border bg-muted/30">
                      <div className="flex items-center gap-3 mb-2">
                        <BarChart3 className="h-5 w-5 text-primary" />
                        <h4 className="font-semibold">Prozessanalyse</h4>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Analyse interner und externer Prozesse mit Fokus auf Optimierungspotenziale.
                      </p>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="workshops" className="rounded-2xl border bg-card px-6 shadow-sm">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-primary/10 p-3">
                    <GraduationCap className="h-6 w-6 text-primary" />
                  </div>
                  <span className="text-xl font-semibold">Workshops & Seminare</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-4 pb-6">
                <div className="prose prose-neutral dark:prose-invert max-w-none">
                  <p>
                    Wir geben Workshops und Seminare zu Neuromarketing und der Rolle der Neurowissenschaft in Ihrer Branche. Ob für Marketing-Teams, Führungskräfte oder ganze Abteilungen – wir vermitteln praxisnahes Wissen, das sofort anwendbar ist.
                  </p>
                  <ul className="space-y-2 pl-6 list-disc">
                    <li><strong>Neuromarketing-Grundlagen:</strong> Wie das Gehirn Kaufentscheidungen trifft</li>
                    <li><strong>Branchenspezifische Insights:</strong> Neurowissenschaft angewendet auf Ihr Geschäftsfeld</li>
                    <li><strong>Praktische Anwendung:</strong> Hands-on-Übungen für Ihr Team</li>
                    <li><strong>Inhouse oder extern:</strong> Flexibel nach Ihren Wünschen</li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="diskretion" className="rounded-2xl border bg-card px-6 shadow-sm">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-primary/10 p-3">
                    <ShieldCheck className="h-6 w-6 text-primary" />
                  </div>
                  <span className="text-xl font-semibold">Diskretion & Vertrauen</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-4 pb-6">
                <div className="prose prose-neutral dark:prose-invert max-w-none">
                  <p>
                    Diskretion ist die Basis unserer Arbeit. Wir verstehen, dass wir als externe Partner tiefe Einblicke in Ihr Unternehmen erhalten. Dieses Vertrauen nehmen wir ernst.
                  </p>
                  <p>
                    Alle Informationen, Strategien und Entwicklungen bleiben streng vertraulich. Wir arbeiten im Hintergrund und treten nicht als sichtbarer Partner auf – es sei denn, Sie wünschen es ausdrücklich.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="flexibel" className="rounded-2xl border bg-card px-6 shadow-sm">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-primary/10 p-3">
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                  <span className="text-xl font-semibold">Flexibel & Individuell</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-4 pb-6">
                <div className="prose prose-neutral dark:prose-invert max-w-none">
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
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="kontakt" className="rounded-2xl border bg-card px-6 shadow-sm">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-primary/10 p-3">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <span className="text-xl font-semibold">Zusammenarbeit starten</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-4 pb-6">
                <div className="prose prose-neutral dark:prose-invert max-w-none">
                  <p>
                    Interessiert an einer Zusammenarbeit? Wir beginnen mit einem unverbindlichen Gespräch, um Ihre Situation und Ziele zu verstehen. Darauf basierend entwickeln wir einen individuellen Vorschlag – ohne starre Pakete, ohne versteckte Kosten.
                  </p>
                  <p>
                    Ob Start-up oder etabliertes Unternehmen, ob einzelnes Projekt oder langfristige Partnerschaft – wir finden die passende Lösung für Sie.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
    </div>
  );
}
