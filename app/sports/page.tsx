import { Metadata } from "next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Target, Eye, Briefcase, Package, Users, FlaskConical } from "lucide-react";

export const metadata: Metadata = {
  title: "PROVOID-Sports | Sportlösungen",
  description: "Professionelle Unterstützung für Sportorganisationen und Athleten - wissenschaftlich fundiert und leistungsorientiert.",
};

export default function SportsPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-primary/10 to-background py-20 md:py-32">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              <span className="text-primary">PROVOID</span>-Sports
            </h1>
            <p className="text-lg text-muted-foreground md:text-xl">
              Professionelle Unterstützung für Sportorganisationen
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
                  Unser Ziel ist es, Sportorganisationen und Athleten dabei zu unterstützen, ihre Leistung 
                  zu maximieren und nachhaltigen Erfolg zu erzielen. Wir entwickeln individuelle Trainings- 
                  und Entwicklungsprogramme, die auf wissenschaftlichen Erkenntnissen basieren und gleichzeitig 
                  die spezifischen Anforderungen des jeweiligen Sports berücksichtigen. Durch unseren 
                  ganzheitlichen Ansatz fördern wir nicht nur die sportliche Leistung, sondern auch die 
                  mentale Stärke und das Wohlbefinden der Athleten.
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
                  Unsere Vision ist es, der führende Partner für evidenzbasierte Sportentwicklung zu werden. 
                  Wir streben danach, neue Standards in der Sportwissenschaft zu setzen und innovative 
                  Trainingsmethoden zu entwickeln, die Athleten und Teams dabei helfen, ihr volles Potenzial 
                  zu entfalten. Dabei legen wir besonderen Wert auf Nachhaltigkeit, Gesundheit und die 
                  langfristige Entwicklung von Talenten.
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
                    Wir bieten ein umfassendes Spektrum an Dienstleistungen für den Sportbereich:
                  </p>
                  <ul className="space-y-2 pl-6 list-disc">
                    <li>Leistungsdiagnostik und Trainingsplanung</li>
                    <li>Mentales Training und Sportpsychologie</li>
                    <li>Ernährungsberatung und Regenerationsmanagement</li>
                    <li>Talentsichtung und Nachwuchsförderung</li>
                    <li>Teambuilding und Gruppendynamik</li>
                    <li>Verletzungsprävention und Rehabilitation</li>
                    <li>Performance-Analyse und Datenauswertung</li>
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
                      <CardTitle>Athlet Paket</CardTitle>
                      <CardDescription>Für Einzelsportler</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Individuelle Leistungsdiagnostik</li>
                        <li>• Personalisierter Trainingsplan</li>
                        <li>• Mentales Coaching</li>
                        <li>• Monatliche Fortschrittskontrolle</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Team Paket</CardTitle>
                      <CardDescription>Für Mannschaftssportarten</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Team-Analyse und Diagnostik</li>
                        <li>• Kollektive Trainingsstrategien</li>
                        <li>• Teambuilding-Maßnahmen</li>
                        <li>• Saisonbegleitende Betreuung</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Verein Paket</CardTitle>
                      <CardDescription>Für Sportvereine</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Nachwuchsförderung</li>
                        <li>• Trainerfortbildung</li>
                        <li>• Vereinsentwicklung</li>
                        <li>• Langfristige Partnerschaft</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Elite Paket</CardTitle>
                      <CardDescription>Für Spitzensportler</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Ganzheitliche Betreuung</li>
                        <li>• Dediziertes Expertenteam</li>
                        <li>• 24/7 Support</li>
                        <li>• Wettkampfbegleitung</li>
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
                    <li>Professionelle Athleten und Spitzensportler</li>
                    <li>Nachwuchstalente und Jugendsportler</li>
                    <li>Sportvereine und -verbände</li>
                    <li>Mannschaften in allen Leistungsklassen</li>
                    <li>Trainer und Betreuer</li>
                    <li>Sportmanager und Funktionäre</li>
                    <li>Fitness- und Gesundheitssportler</li>
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
                  Sportwissenschaft, Trainingslehre, Sportpsychologie und Biomechanik. Wir kombinieren 
                  evidenzbasierte Ansätze mit modernster Technologie und nutzen datengestützte Analysen, 
                  um die Leistung zu optimieren. Durch kontinuierliche Forschung und Zusammenarbeit mit 
                  führenden Sportinstituten stellen wir sicher, dass unsere Methoden stets dem neuesten 
                  Stand der Sportwissenschaft entsprechen. Dabei berücksichtigen wir individuelle 
                  physiologische, psychologische und biomechanische Faktoren.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
    </div>
  );
}
