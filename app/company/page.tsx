import { Metadata } from "next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Target, Eye, Briefcase, Package, Users, FlaskConical, BarChart3, Globe, Smartphone, Brain, Palette, MousePointer, TrendingUp } from "lucide-react";

import Image from "next/image";

export const metadata: Metadata = {
  title: "PROVOID-Company | Neuromarketing-Agentur",
  description: "Neuromarketing-Agentur für wissenschaftlich fundierte Webseiten, Apps und digitale Strategien. Wir nutzen Neurowissenschaft für messbar bessere Conversion.",
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
              Neuromarketing-Agentur
            </h1>
            <p className="text-lg text-muted-foreground md:text-xl">
              Wir gestalten digitale Erlebnisse, die das Gehirn versteht
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
            <AccordionItem value="neuromarketing" className="rounded-2xl border bg-card px-6 shadow-sm">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-primary/10 p-3">
                    <Brain className="h-6 w-6 text-primary" />
                  </div>
                  <span className="text-xl font-semibold">Was ist Neuromarketing?</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-4 pb-6">
                <div className="prose prose-neutral dark:prose-invert max-w-none">
                  <p>
                    Neuromarketing verbindet Neurowissenschaft mit Marketing und Design. Wir nutzen Erkenntnisse darüber, wie das menschliche Gehirn Informationen verarbeitet, Entscheidungen trifft und auf visuelle Reize reagiert – um digitale Produkte zu schaffen, die intuitiv funktionieren und überzeugen.
                  </p>
                  <p>
                    95% aller Kaufentscheidungen werden unbewusst getroffen. Neuromarketing macht diese unbewussten Prozesse nutzbar: Durch gezielte Gestaltung von Farben, Formen, Texten und Nutzerführung aktivieren wir die richtigen neuronalen Muster und erhöhen messbar Conversion, Vertrauen und Nutzerbindung.
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
                        <Globe className="h-5 w-5 text-primary" />
                        <h4 className="font-semibold">Webseiten</h4>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Conversion-optimierte Websites mit neurowissenschaftlich fundierter Nutzerführung, die Besucher zu Kunden machen.
                      </p>
                    </div>
                    <div className="p-4 rounded-xl border bg-muted/30">
                      <div className="flex items-center gap-3 mb-2">
                        <Smartphone className="h-5 w-5 text-primary" />
                        <h4 className="font-semibold">Apps</h4>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Native und Web-Apps mit intuitivem UX-Design, das auf kognitiven Prinzipien basiert.
                      </p>
                    </div>
                    <div className="p-4 rounded-xl border bg-muted/30">
                      <div className="flex items-center gap-3 mb-2">
                        <Palette className="h-5 w-5 text-primary" />
                        <h4 className="font-semibold">Branding & Design</h4>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Markenidentitäten, die emotional ansprechen und im Gedächtnis bleiben.
                      </p>
                    </div>
                    <div className="p-4 rounded-xl border bg-muted/30">
                      <div className="flex items-center gap-3 mb-2">
                        <MousePointer className="h-5 w-5 text-primary" />
                        <h4 className="font-semibold">UX-Optimierung</h4>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Analyse und Verbesserung bestehender digitaler Produkte mit Neuromarketing-Methoden.
                      </p>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="methoden" className="rounded-2xl border bg-card px-6 shadow-sm">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-primary/10 p-3">
                    <FlaskConical className="h-6 w-6 text-primary" />
                  </div>
                  <span className="text-xl font-semibold">Unsere Methoden</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-4 pb-6">
                <div className="prose prose-neutral dark:prose-invert max-w-none">
                  <p>
                    Wir setzen auf evidenzbasierte Neuromarketing-Prinzipien, die in der Wissenschaft belegt sind:
                  </p>
                  <ul className="space-y-2 pl-6 list-disc">
                    <li><strong>Cognitive Load Reduction:</strong> Weniger mentale Anstrengung = höhere Conversion</li>
                    <li><strong>Emotionale Trigger:</strong> Farben, Bilder und Worte, die das limbische System aktivieren</li>
                    <li><strong>Aufmerksamkeitssteuerung:</strong> Visuelle Hierarchien, die den Blick lenken</li>
                    <li><strong>Vertrauenssignale:</strong> Elemente, die das Sicherheitsgefühl stärken</li>
                    <li><strong>Decision Architecture:</strong> Nutzerführung, die Entscheidungen erleichtert</li>
                    <li><strong>Social Proof & Autorität:</strong> Psychologische Überzeugungsprinzipien</li>
                  </ul>
                  <p className="mt-4">
                    Unsere Designs werden durch EEG-Messungen und A/B-Tests validiert, um nachweisbare Ergebnisse zu liefern.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="vorteile" className="rounded-2xl border bg-card px-6 shadow-sm">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-primary/10 p-3">
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                  <span className="text-xl font-semibold">Ihre Vorteile</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-4 pb-6">
                <div className="prose prose-neutral dark:prose-invert max-w-none">
                  <ul className="space-y-2 pl-6 list-disc">
                    <li><strong>Höhere Conversion-Rates:</strong> Durch gehirngerechte Gestaltung steigern wir messbar Ihre Abschlussquoten</li>
                    <li><strong>Bessere User Experience:</strong> Intuitive Designs, die Nutzer verstehen, ohne nachzudenken</li>
                    <li><strong>Stärkere Markenbindung:</strong> Emotionale Verbindungen, die Kunden zu Fans machen</li>
                    <li><strong>Weniger Absprünge:</strong> Optimierte Nutzerführung reduziert Bounce-Rates</li>
                    <li><strong>Wissenschaftlich fundiert:</strong> Keine Bauchentscheidungen, sondern evidenzbasiertes Design</li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="pakete" className="rounded-2xl border bg-card px-6 shadow-sm">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-primary/10 p-3">
                    <Package className="h-6 w-6 text-primary" />
                  </div>
                  <span className="text-xl font-semibold">Pakete</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-4 pb-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Landingpage</CardTitle>
                      <CardDescription>Perfekt für Kampagnen & Launches</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Neuromarketing-optimierte Einzelseite</li>
                        <li>• Conversion-fokussiertes Design</li>
                        <li>• Responsive & schnell</li>
                        <li>• A/B-Test-Ready</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Website</CardTitle>
                      <CardDescription>Ihre komplette Online-Präsenz</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Mehrseitige Website mit CMS</li>
                        <li>• Neuromarketing-Konzeption</li>
                        <li>• SEO-Grundoptimierung</li>
                        <li>• Kontaktformular & Analytics</li>
                        <li>• 3 Monate Support</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>E-Commerce</CardTitle>
                      <CardDescription>Verkaufsoptimierte Online-Shops</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Shop mit Neuromarketing-Checkout</li>
                        <li>• Produktpräsentation nach Kaufpsychologie</li>
                        <li>• Vertrauens-Elemente & Social Proof</li>
                        <li>• Payment-Integration</li>
                        <li>• 6 Monate Betreuung</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>App & Individuell</CardTitle>
                      <CardDescription>Maßgeschneiderte Lösungen</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Native oder Web-App</li>
                        <li>• Komplexe Webapplikationen</li>
                        <li>• UX-Research & Prototyping</li>
                        <li>• Langfristige Partnerschaft</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="zielgruppe" className="rounded-2xl border bg-card px-6 shadow-sm">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-primary/10 p-3">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <span className="text-xl font-semibold">Für wen wir arbeiten</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-4 pb-6">
                <div className="prose prose-neutral dark:prose-invert max-w-none">
                  <p>
                    Unsere Neuromarketing-Dienstleistungen richten sich an:
                  </p>
                  <ul className="space-y-2 pl-6 list-disc">
                    <li><strong>Start-ups:</strong> Die von Anfang an auf conversion-optimiertes Design setzen wollen</li>
                    <li><strong>E-Commerce-Unternehmen:</strong> Die ihre Conversion-Rate steigern möchten</li>
                    <li><strong>SaaS-Anbieter:</strong> Die mehr Nutzer zu zahlenden Kunden konvertieren wollen</li>
                    <li><strong>Agenturen:</strong> Die ihren Kunden wissenschaftlich fundiertes Design bieten möchten</li>
                    <li><strong>Etablierte Unternehmen:</strong> Die ihre digitale Präsenz modernisieren wollen</li>
                    <li><strong>Marketing-Teams:</strong> Die messbare Ergebnisse brauchen</li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="prozess" className="rounded-2xl border bg-card px-6 shadow-sm">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-primary/10 p-3">
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                  <span className="text-xl font-semibold">Unser Prozess</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-4 pb-6">
                <div className="prose prose-neutral dark:prose-invert max-w-none">
                  <ol className="space-y-3 pl-6 list-decimal">
                    <li><strong>Analyse:</strong> Wir verstehen Ihre Zielgruppe, Ziele und aktuelle Pain Points</li>
                    <li><strong>Strategie:</strong> Neuromarketing-Konzept basierend auf Ihren spezifischen Anforderungen</li>
                    <li><strong>Design:</strong> Wireframes und Designs mit wissenschaftlich fundierten Prinzipien</li>
                    <li><strong>Entwicklung:</strong> Technische Umsetzung mit Fokus auf Performance</li>
                    <li><strong>Testing:</strong> A/B-Tests und Optimierung basierend auf echten Daten</li>
                    <li><strong>Launch & Iteration:</strong> Go-Live und kontinuierliche Verbesserung</li>
                  </ol>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="science" className="rounded-2xl border bg-card px-6 shadow-sm">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-primary/10 p-3">
                    <BarChart3 className="h-6 w-6 text-primary" />
                  </div>
                  <span className="text-xl font-semibold">Wissenschaftlicher Hintergrund</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-4 pb-6">
                <div className="prose prose-neutral dark:prose-invert max-w-none">
                  <p>
                    Unsere Arbeit basiert auf aktuellen Erkenntnissen aus Neurowissenschaft, Kognitionspsychologie und Verhaltensökonomie. Wir nutzen Forschungsergebnisse von führenden Institutionen und validieren unsere Designs durch eigene EEG-Messungen.
                  </p>
                  <p>
                    Durch die Kombination von wissenschaftlicher Evidenz mit praktischer Erfahrung erreichen wir nachweisbare Ergebnisse. Jedes Design-Element hat einen Grund – basierend auf dem, was wir über die Funktionsweise des menschlichen Gehirns wissen.
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
