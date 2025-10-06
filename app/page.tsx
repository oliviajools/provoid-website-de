import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/Section";
import { ArrowRight, Building2, Trophy } from "lucide-react";
import Image from "next/image";
import { ParticlesBackground } from "@/components/ParticlesBackground";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-primary/20 to-background py-[48px] md:py-[77px] overflow-hidden">
        <ParticlesBackground />
        <div className="container px-4 md:px-6 lg:px-8 relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Willkommen bei <span className="text-primary">PROVOID</span>
            </h1>
            <p className="mb-8 text-lg text-muted-foreground md:text-xl">
              no brain no gain
            </p>
            <div className="relative -mt-6 flex justify-center">
              <div aria-hidden className="pointer-events-none absolute inset-0 mx-auto flex justify-center items-center">
                <div className="h-48 w-48 md:h-64 md:w-64 lg:h-72 lg:w-72 rounded-full bg-primary/40 blur-[56px] animate-pulse" />
              </div>
              <Image
                src="/brain.png"
                alt="Gehirn Illustration"
                width={768}
                height={768}
                priority
                className="relative mx-auto h-auto w-72 md:w-[28rem] lg:w-[32rem] drop-shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="container px-4 md:px-6 lg:px-8 py-[38px] md:py-[58px]">
        <div className="mx-auto max-w-4xl space-y-16">
          <Section id="was-ist-provoid" title="Was ist PROVOID?">
            <div className="prose prose-neutral dark:prose-invert max-w-none">
              <p>
                <strong>From Insight To Impact</strong>
              </p>
              <p>
                Wir sind ein Hamburger StartUp, das neurowissenschaftliche Erkenntnisse in anwendbare
                Lösungen überführt, um einen messbaren positiven Wandel in Organisationen und Gesellschaft zu bewirken.
              </p>
              <p>
                Wir entwickeln evidenzbasierte Tools, Trainings und Interventionen, die Entscheidungen,
                Zusammenarbeit und Strukturen durch neuronale Fortschritte messbar verbessern.
              </p>
              <p>
                So verfolgen wir das Ziel, Menschen in ihren persönlichen, leistungsorientierten Bereichen ihres Lebens
                zu unterstützen und ihre neuronale Gesundheit zu verbessern.
              </p>
            </div>
          </Section>

          <Section id="idee" title="Unsere Idee">
            <div className="prose prose-neutral dark:prose-invert max-w-none">
              <p>
                PROVOID begann als „Jugend forscht“-Projekt zur Prokrastination. Der Name war schnell gefunden:
                PROVOID – kurz für Procrastination avoid.
              </p>
              <p>
                Im Verlauf der Arbeit wurde klar, wie stark neurowissenschaftliche Mechanismen Entscheidungen,
                Arbeitsverhalten und Kognition prägen. PROVOID wuchs – und mit uns die leitende Idee.
              </p>
              <p>
                Heute verfolgen wir einen breiteren Ansatz: Wir übersetzen aktuelle Forschung und betreiben eigene
                Studien in der angewandten Neurowissenschaft, um neuronale Fähigkeiten in allen leistungsbezogenen
                Bereichen zu optimieren – von Fokus und Lernen über Zusammenarbeit bis zu resilienten Strukturen in
                Organisationen.
              </p>
            </div>
          </Section>

          <Section id="vision" title="Unsere Vision">
            <div className="prose prose-neutral dark:prose-invert max-w-none">
              <p>
                Unsere Vision ist eine Gesellschaft, in der jede und jeder neurowissenschaftlichen Fortschritt nutzen kann. Wir machen Erkenntnisse aus der Forschung verständlich und zugänglich, damit Menschen ihre neuronalen Fähigkeiten entfalten und verantwortungsvoll einsetzen. So entstehen bessere Entscheidungen, mehr Fokus, nachhaltiges Lernen und gesunde Zusammenarbeit im Alltag und in Organisationen. Wir wollen wachsen, damit dieser Zugang breit verfügbar wird und die Wirkung für die Gesellschaft stetig zunimmt. Transparenz, Innovation und Qualität leiten unser Handeln. Wir streben danach, Standards zu setzen und innovative Lösungen zu entwickeln, die nachhaltig positive Veränderungen bewirken. So möchten wir der führende Partner für ganzheitliche Entwicklung und Optimierung werden.
              </p>
            </div>
          </Section>

          <Section id="geschichte" title="Unsere Geschichte">
            <div className="prose prose-neutral dark:prose-invert max-w-none">
              <p>
                Das Ursprungsprojekt von PROVOID entstand 2023 und nahm 2024 erstmals erfolgreich bei dem Wettbewerb
                „Jugend forscht” teil. Im Frühjahr entstand hieraus das Einzelunternehmen und StartUp PROVOID. 2025 war
                das Projekt Teil der JugendUnternimmt-Summerschool und belegte deutschlandweit den 2. Platz. Im Oktober
                2025 wurde es nun für den Hamburger-Award „STARTERiN” 2025 nominiert.
              </p>
            </div>
          </Section>

          <Section id="wer-ist-provoid" title="Wer sind Wir?">
            <div className="prose prose-neutral dark:prose-invert max-w-none">
              <p>
                PROVOID wurde im April 2025 von Olivia Bahr gegründet.
              </p>
              <p>
                Olivia Bahr hat 2025 ihr Abitur im naturwissenschaftlichen Profil abgeschlossen und bereits ein Juniorstudium im Fachbereich Physik (B.Sc.) an der Universität Hamburg absolviert.
              </p>
              <p>
                An ihrer Seite arbeitet seit Juli 2025 ein Programmierer und die Marketing-Abteilung wächst stetig.
              </p>
              <p>
                Wir stehen im engen Austausch mit Neurologen, Neurowissenschaftlern und PsychologInnen in Hamburg und Umgebung und können es kaum erwarten, weiter zu wachsen.
              </p>
            </div>
          </Section>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t bg-muted/50 py-16 md:py-24">
        <div className="container px-4 md:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
              Entdecken Sie unsere Bereiche
            </h2>
            <p className="mb-12 text-lg text-muted-foreground">
              Wählen Sie den Bereich, der zu Ihnen passt
            </p>
            
            <div className="grid gap-8 md:grid-cols-2">
              <Card className="group transition-all hover:shadow-lg hover:border-primary h-full flex flex-col">
                <CardHeader>
                  <div className="mb-4 flex justify-center">
                    <div className="rounded-full bg-primary/10 p-4">
                      <Building2 className="h-12 w-12 text-primary" />
                    </div>
                  </div>
                  <CardTitle className="text-2xl">PROVOID-Company</CardTitle>
                  <CardDescription className="text-base">
                    Maßgeschneiderte Lösungen für Ihr Unternehmen
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-6 mt-auto">
                  <p className="mb-6 text-sm text-muted-foreground">
                    Optimieren Sie Ihre Unternehmensprozesse mit unseren wissenschaftlich 
                    fundierten Methoden und individuellen Beratungsleistungen.
                  </p>
                  <Link href="/company">
                    <Button className="w-full group-hover:bg-primary group-hover:text-primary-foreground">
                      Mehr erfahren
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="group transition-all hover:shadow-lg hover:border-primary h-full flex flex-col">
                <CardHeader>
                  <div className="mb-4 flex justify-center">
                    <div className="rounded-full bg-primary/10 p-4">
                      <Trophy className="h-12 w-12 text-primary" />
                    </div>
                  </div>
                  <CardTitle className="text-2xl">PROVOID-Sports</CardTitle>
                  <CardDescription className="text-base">
                    Professionelle Unterstützung für Sportorganisationen
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-6 mt-auto">
                  <p className="mb-6 text-sm text-muted-foreground">
                    Steigern Sie die Leistung Ihrer Athleten und optimieren Sie Ihre 
                    Sportorganisation mit unseren spezialisierten Programmen.
                  </p>
                  <Link href="/sports">
                    <Button className="w-full group-hover:bg-primary group-hover:text-primary-foreground">
                      Mehr erfahren
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
