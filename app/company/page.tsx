import { Metadata } from "next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Target, Eye, Briefcase, Package, Users, FlaskConical, BarChart3 } from "lucide-react";

import Image from "next/image";

export const metadata: Metadata = {
  title: "PROVOID-Company | Unternehmenslösungen",
  description: "Maßgeschneiderte Lösungen für Ihr Unternehmen - wissenschaftlich fundiert und praxisorientiert.",
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
              no brain no gain
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
            <AccordionItem value="ziel" className="rounded-2xl border bg-card px-6 shadow-sm">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-primary/10 p-3">
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                  <span className="text-xl font-semibold">Ziel</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-4 pb-6">
                <div className="prose prose-neutral dark:prose-invert max-w-none">
                  <p>
                    PROVOID-Company verfolgt das Ziel, Neurowissenschaft fest in Unternehmenskulturen zu verankern, damit die neuronale Gesundheit der Mitarbeitenden gestärkt und die Effizienz ihrer Arbeit nachhaltig verbessert wird. Dazu setzen wir auf praxisnahe Interventionen. Gemeinsam entwickeln wit Leitlinien für Fokus, Erholung und Lernfähigkeit und schulen Führungskräfte in neurofreundlicher Leitung und Kommunikation. 
                  </p>
                  <p>
                    Digitale Tools unterstützen den Alltag mit kurzen Übungen, personalisierten Empfehlungen und Feedback.
                    Wirkung messen wir transparent über klar definierte Ziele und Kennzahlen, immer mit Datenschutz und Ethik als verbindlichem Rahmen.

                  </p>
                  <p>
                    So entsteht Schritt für Schritt eine Kultur, die Gesundheit und Leistung gleichermaßen fördert.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="vision" className="rounded-2xl border bg-card px-6 shadow-sm">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-primary/10 p-3">
                    <Eye className="h-6 w-6 text-primary" />
                  </div>
                  <span className="text-xl font-semibold">Vision</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-4 pb-6">
                <div className="prose prose-neutral dark:prose-invert max-w-none">
                  <p>
                    Unsere Vision ist, dass Unternehmen neuronale Prozesse so gut verstehen, dass sie Kultur, Zusammenarbeit und Entscheidungen im Einklang mit der menschlichen Biologie gestalten. PROVOID will dafür als verlässliche Instanz die führende Rolle am Unternehmensmarkt einnehmen und  neurowissenschaftliche Erkenntnisse verständlich machen, Vertrauen schaffen und Maßstäbe für Wirksamkeit und Verantwortung setzen. Wir streben an, der bevorzugte Partner für Vorstände und Führungsteams zu sein und einen Branchenstandard zu prägen, an dem sich messbare Wirkung, wissenschaftliche Qualität und Schutz der Privatsphäre orientieren. So entsteht eine Wirtschaft, in der neuronale Gesundheit  und Leistungsfähigkeit nachhaltig miteinander vereint werden und miteinander wachsen können.
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
                  <span className="text-xl font-semibold">Leistungen</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-4 pb-6">
                <div className="prose prose-neutral dark:prose-invert max-w-none">
                  <p>
                    PROVOID vereint Dienstleistungen und Software zu einem ganzheitlichen Angebot. In enger Zusammenarbeit
                    gestalten wir passgenaue Konzepte, die neurowissenschaftliche Erkenntnisse in Prozesse, Entscheidungen
                    und Zusammenarbeit übertragen.
                  </p>
                  <p>
                    So entstehen messbare Veränderungen und spürbare Effizienzgewinne. Dazu entwickeln und implementieren
                    wir evidenzbasierte Tools, die Mitarbeitende in ihrem Arbeitsalltag unterstützen.
                  </p>
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
                      <CardTitle>Starter-Paket</CardTitle>
                      <CardDescription>Für kleine und mittlere Unternehmen</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Analyse der MitarbeiterInnen</li>
                        <li>• Strategieentwicklung</li>
                        <li>• Dreimonatige Begleitung</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Professional Paket</CardTitle>
                      <CardDescription>Für etablierte Unternehmen</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Analyse der MitarbeiterInnen</li>
                        <li>• Maßgeschneiderte Strategien</li>
                        <li>• Intensive sechsmonatige Begleitung</li>
                        <li>• Softwarezugänge für Mitarbeiterinnen</li>
                        <li>• Monatliche Reviews und Anpassungen</li>
                        <li>• Abschlussanalyse</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Enterprise Paket</CardTitle>
                      <CardDescription>Für große Organisationen</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-6">
                        <li>Ganzheitliche Transformation</li>
                        <li>Konzeptentwicklung zur neurofreundlichen Entwicklung</li>
                        <li>12-monatige Begleitung</li>
                        <li>Kontinuierliche Optimierung</li>
                        <li>Eingangs- und Abschlussanalyse</li>
                        <li>Softwarezugänge für Abteilungen und Mitarbeiterinnen</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Individual Paket</CardTitle>
                      <CardDescription>Let's talk</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Vollständig anpassbar</li>
                        <li>• Flexible Laufzeit</li>
                        <li>• Spezifische Module</li>
                        <li>• On-Demand Support</li>
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
                  <span className="text-xl font-semibold">Zielgruppe</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-4 pb-6">
                <div className="prose prose-neutral dark:prose-invert max-w-none">
                  <p>
                    Unsere Dienstleistungen richten sich an:
                  </p>
                  <ul className="space-y-2 pl-6 list-disc">
                    <li>Start-ups und Scale-ups in der Wachstumsphase</li>
                    <li>Mittelständische Unternehmen mit Optimierungsbedarf</li>
                    <li>Große Konzerne in Transformationsprozessen</li>
                    <li>Familienunternehmen bei Generationswechseln</li>
                    <li>Führungskräfte und Entscheidungsträger</li>
                    <li>HR-Abteilungen und Personalentwickler</li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="science" className="rounded-2xl border bg-card px-6 shadow-sm">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-primary/10 p-3">
                    <FlaskConical className="h-6 w-6 text-primary" />
                  </div>
                  <span className="text-xl font-semibold">Wissenschaftliche Arbeit & Hintergrund</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-4 pb-6">
                <div className="prose prose-neutral dark:prose-invert max-w-none">
                  <p>
                    Unsere Methoden basieren auf aktuellen wissenschaftlichen Erkenntnissen aus den Bereichen Neurowissenschaft, Organisationspsychologie, Verhaltensökonomie und Managementforschung. Wir stützen uns dabei besonders auf neurowissenschaftliche Evidenz und betreiben eigene Forschung. Unsere Tools werden in EEG Messungen geprüft, um ihre beabsichtigte Wirkung nachweisbar zu erzielen. Wir kombinieren evidenzbasierte Ansätze mit praktischer Erfahrung und nutzen datengestützte Analysen, um messbare Ergebnisse zu erreichen. Durch kontinuierliche Forschung und Entwicklung stellen wir sicher, dass unsere Methoden dem neuesten Stand der Wissenschaft entsprechen. Der Neurotech Markt entwickelt sich rasant und wir möchten ihn aktiv und wissenschaftlich mitgestalten.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="analysis" className="rounded-2xl border bg-card px-6 shadow-sm">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-primary/10 p-3">
                    <BarChart3 className="h-6 w-6 text-primary" />
                  </div>
                  <span className="text-xl font-semibold">Analyse</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-4 pb-6">
                <div className="prose prose-neutral dark:prose-invert max-w-none">
                  <p>
                    Aktuell bietet PROVOID eine Analyse zum Prokrastinationsverhalten von Mitarbeiterinnen an. Sie stützt sich auf Erkenntnisse der Verhaltenspsychologie und der Neurowissenschaft, umfasst über 90 Fragen und wird automatisiert ausgewertet. Auf Basis der Ergebnisse ordnen wir jede Person einem von vier entwickelten Typen zu. Im Anschluss erhält jeder Typ neurowissenschaftlich angepasste Tools und Empfehlungen, die auf die jeweiligen Mechanismen und Bedürfnisse zugeschnitten sind.
                  </p>
                  <p className="leading-relaxed">
                    Weitere Analysen sind in Arbeit und können unternehmensspezifisch ausgearbeitet werden, damit sie den exakten Bedürfnissen und Zielen entsprechen.
                  </p>
                  <div>
                    <p className="leading-relaxed font-medium mb-2">Unsere Analyse umfasst</p>
                    <ul className="space-y-2 pl-6 list-disc">
                      <li>Einen wissenschaftlich fundierten Fragebogen mit über 90 Items aus Verhaltenspsychologie und Neurowissenschaft</li>
                      <li>Eine automatisierte Auswertung mit individuellem Profil und klaren Handlungshinweisen</li>
                      <li>Die Zuordnung zu vier Typen mit Beschreibung der zugrunde liegenden Muster</li>
                      <li>Typenspezifische, neurowissenschaftlich adaptierte Tools und Empfehlungen für den Arbeitsalltag</li>
                      <li>Die Option, weitere Analysen zu entwickeln und auf die spezifische Unternehmenssituation zuzuschneiden</li>
                    </ul>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
    </div>
  );
}
