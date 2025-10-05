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
      <section className="relative bg-gradient-to-b from-primary/10 to-background py-[48px] md:py-[77px]">
        <div className="container px-4 md:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              <span className="text-primary">PROVOID</span>-Sports
            </h1>
            <p className="text-lg text-muted-foreground md:text-xl">
              no brain no gain.
            </p>
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
                <p className="text-muted-foreground leading-relaxed">
                  Unser Ziel ist es, Sportorganisationen sowie Athletinnen und Athleten durch angewandte Neurowissenschaft zu nachhaltiger Spitzenleistung zu befähigen. Wir wollen Reaktionsfähigkeit, Entscheidungsqualität, Fokus und Selbstregulation stärken und zugleich mentale Stabilität und Wohlbefinden fördern. Leistung soll messbar wachsen und sich im Training, im Wettkampf und in der Teamkultur dauerhaft zeigen.
                </p>
              </AccordionContent>
            </AccordionItem>

            {/* Vision */}
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
                <p className="text-muted-foreground leading-relaxed">
                  Unsere Vision ist es, der führende Partner für angewandte Neurowissenschaft im Sport zu sein. Wir wollen neue Standards in Neuroathletik und Neurotech setzen und den Markt verantwortungsvoll mitgestalten. Dafür verbinden wir Forschung und Praxis, machen neuronale Mechanismen verständlich und nutzbar und richten Entwicklung konsequent auf messbare Wirkung aus. So unterstützen wir Athletinnen, Athleten und Teams dabei, Reaktionsfähigkeit, Entscheidungsqualität, Fokus, Selbstregulation und mentale Stabilität nachhaltig zu stärken, mit Blick auf Gesundheit, Fairness und die langfristige Entwicklung von Talenten.
                </p>
              </AccordionContent>
            </AccordionItem>

            {/* Leistungen */}
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
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p className="font-semibold">Unsere Leistungen im Sportbereich</p>
                  <ul className="space-y-2 pl-6 list-disc">
                    <li>Neuroathletik Wissensvermittlung für Athletinnen und Athleten, altersgerecht und praxisnah</li>
                    <li>Optionale individuelle EEG Analyse zur Testung neuroathletischer Eigenschaften</li>
                    <li>Gezielte Förderung in sechs Einheiten mit Übungen für Wahrnehmung, Reaktionsfähigkeit, Entscheidungsfindung, Koordination und Selbstregulation</li>
                    <li>Programme für Jugendteams mit altersgerechter Didaktik, Trainingseinheiten und begleitendem Austausch mit Trainerinnen und Trainern</li>
                    <li>Optionale Neurostimulation durch die PROVOID-App als non-invasive Ergänzung zur Leistungsunterstützung</li>
                    <li>Teamprogramme mit klarer Struktur aus Wissen, Analyse, Training, persönlichen Auswertungen und optionalen Abschlusstestungen</li>
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
                      <CardTitle>Athlet-Paket</CardTitle>
                      <CardDescription>Für Einzelsportler</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Individuelle Leistungsdiagnostik</li>
                        <li>• Personalisierter Neuro-Trainingsplan</li>
                        <li>• App-Zugang</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Team-Paket</CardTitle>
                      <CardDescription>Für Mannschaftssportarten</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-6">
                        <li>Team-Analyse und Diagnostik</li>
                        <li>Kollektive Trainingsstrategien</li>
                        <li>Trainingssitzungen mit neuroathletischen Schwerpunkten</li>
                        <li>Saisonbegleitende Betreuung</li>
                        <li>App-Zugänge</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Vereins-Paket</CardTitle>
                      <CardDescription>Für Sportvereine</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Nachwuchsförderung</li>
                        <li>• Arbeit mit mehreren Teams</li>
                        <li>• Neurowissenschaftliche Integration in die Vereinsarbeit</li>
                        <li>• Langfristige Partnerschaft & Datensicherung</li>
                        <li>• Einzel- und Teamzugänge der App</li>
                        <li>• Eingangs- und Abschlussanalyse</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Individual-Paket</CardTitle>
                      <CardDescription>Let’s talk</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Flexible Anpassung</li>
                        <li>• Individuelle Betreuung</li>
                        <li>• Sportspezifische Schwerpunkte</li>
                        <li>• App-Zugänge falls gewünscht</li>
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
              <AccordionContent className="pt-4 pb-6">
                <p className="text-muted-foreground leading-relaxed">
                  Unsere Methoden basieren auf aktuellen wissenschaftlichen Erkenntnissen aus den Bereichen 
                  Sportwissenschaft, Trainingslehre, Sportpsychologie und Biomechanik. Wir kombinieren 
                  evidenzbasierte Ansätze mit modernster Technologie und nutzen datengestützte Analysen, 
                  um die Leistung zu optimieren. Durch kontinuierliche Forschung und Zusammenarbeit mit 
                  Experten stellen wir sicher, dass unsere Methoden stets dem neuesten Stand der Sportwissenschaft 
                  entsprechen. Dabei berücksichtigen wir individuelle physiologische, psychologische und 
                  biomechanische Faktoren.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
    </div>
  );
}
