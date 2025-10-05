import { Metadata } from "next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Target, Eye, Briefcase, Package, Users, FlaskConical, BarChart3 } from "lucide-react";

export const metadata: Metadata = {
  title: "PROVOID-Company | Unternehmenslösungen",
  description: "Maßgeschneiderte Lösungen für Ihr Unternehmen - wissenschaftlich fundiert und praxisorientiert.",
};

export default function CompanyPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-primary/10 to-background py-20 md:py-32">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              <span className="text-primary">PROVOID</span>-Company
            </h1>
            <p className="text-lg text-muted-foreground md:text-xl">
              Maßgeschneiderte Lösungen für Ihr Unternehmen
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="container py-16 md:py-24">
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
              <AccordionContent className="pt-4 pb-2">
                <p className="text-muted-foreground leading-relaxed">
                  Unser Ziel ist es, Unternehmen dabei zu unterstützen, ihre Prozesse zu optimieren und 
                  nachhaltiges Wachstum zu erzielen. Wir fokussieren uns auf die Entwicklung individueller 
                  Strategien, die auf wissenschaftlichen Erkenntnissen basieren und gleichzeitig praktisch 
                  umsetzbar sind. Durch unsere ganzheitliche Herangehensweise schaffen wir messbare Erfolge 
                  und langfristige Wettbewerbsvorteile.
                </p>
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
              <AccordionContent className="pt-4 pb-2">
                <p className="text-muted-foreground leading-relaxed">
                  Unsere Vision ist es, der führende Partner für evidenzbasierte Unternehmensberatung zu werden. 
                  Wir streben danach, Standards in der Branche zu setzen und innovative Ansätze zu entwickeln, 
                  die Unternehmen dabei helfen, ihr volles Potenzial auszuschöpfen. Dabei legen wir besonderen 
                  Wert auf Nachhaltigkeit, ethische Geschäftspraktiken und die kontinuierliche Weiterentwicklung 
                  unserer Methoden.
                </p>
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
              <AccordionContent className="pt-4 pb-2">
                <div className="space-y-4 text-muted-foreground">
                  <p className="leading-relaxed">
                    Wir bieten ein umfassendes Spektrum an Dienstleistungen, die auf die individuellen 
                    Bedürfnisse Ihres Unternehmens zugeschnitten sind:
                  </p>
                  <ul className="space-y-2 pl-6 list-disc">
                    <li>Strategische Unternehmensberatung und Prozessoptimierung</li>
                    <li>Führungskräfteentwicklung und Executive Coaching</li>
                    <li>Organisationsentwicklung und Change Management</li>
                    <li>Datenanalyse und evidenzbasierte Entscheidungsfindung</li>
                    <li>Mitarbeiterentwicklung und Teambuilding</li>
                    <li>Performance Management und KPI-Systeme</li>
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
              <AccordionContent className="pt-4 pb-2">
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Starter Paket</CardTitle>
                      <CardDescription>Für kleine und mittlere Unternehmen</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Initiale Analyse und Beratung</li>
                        <li>• Strategieentwicklung</li>
                        <li>• 3 Monate Begleitung</li>
                        <li>• Quartalsweise Reviews</li>
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
                        <li>• Umfassende Analyse</li>
                        <li>• Maßgeschneiderte Strategien</li>
                        <li>• 6 Monate intensive Begleitung</li>
                        <li>• Monatliche Reviews und Anpassungen</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Enterprise Paket</CardTitle>
                      <CardDescription>Für große Organisationen</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Ganzheitliche Transformation</li>
                        <li>• Dediziertes Beraterteam</li>
                        <li>• 12 Monate Vollbetreuung</li>
                        <li>• Kontinuierliche Optimierung</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Individual Paket</CardTitle>
                      <CardDescription>Maßgeschneiderte Lösungen</CardDescription>
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
              <AccordionContent className="pt-4 pb-2">
                <div className="space-y-4 text-muted-foreground">
                  <p className="leading-relaxed">
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
                  <span className="text-xl font-semibold">Science behind PROVOID</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-4 pb-2">
                <p className="text-muted-foreground leading-relaxed">
                  Unsere Methoden basieren auf aktuellen wissenschaftlichen Erkenntnissen aus den Bereichen 
                  Organisationspsychologie, Verhaltensökonomie und Management-Forschung. Wir kombinieren 
                  evidenzbasierte Ansätze mit praktischer Erfahrung und nutzen datengestützte Analysen, 
                  um messbare Ergebnisse zu erzielen. Durch kontinuierliche Forschung und Entwicklung 
                  stellen wir sicher, dass unsere Methoden stets dem neuesten Stand der Wissenschaft entsprechen.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="analysis" className="rounded-2xl border bg-card px-6 shadow-sm">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-primary/10 p-3">
                    <BarChart3 className="h-6 w-6 text-primary" />
                  </div>
                  <span className="text-xl font-semibold">Analysis</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-4 pb-2">
                <div className="space-y-4 text-muted-foreground">
                  <p className="leading-relaxed">
                    Unsere Analysemethoden umfassen:
                  </p>
                  <ul className="space-y-2 pl-6 list-disc">
                    <li>Umfassende Ist-Analyse der aktuellen Unternehmenssituation</li>
                    <li>Stakeholder-Interviews und Mitarbeiterbefragungen</li>
                    <li>Prozess-Mapping und Effizienzanalysen</li>
                    <li>Benchmarking und Wettbewerbsanalysen</li>
                    <li>Datenanalyse und KPI-Auswertungen</li>
                    <li>SWOT-Analysen und Risikobewertungen</li>
                    <li>Erstellung detaillierter Handlungsempfehlungen</li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
    </div>
  );
}
