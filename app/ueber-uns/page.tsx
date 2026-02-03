import { Section } from "@/components/Section";
import Image from "next/image";
import { Award, GraduationCap, Brain, Rocket, Users, Download } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Über uns | PROVOID",
  description: "Hamburgs erste Neuromarketing-Agentur. Lernen Sie unser Team, unsere Geschichte und Vision kennen.",
  alternates: {
    canonical: "/ueber-uns",
  },
};

export default function UeberUnsPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-primary/10 to-background py-16 md:py-24">
        <div className="container px-4 md:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Über <span className="text-primary">PROVOID</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Hamburgs erste Neuromarketing-Agentur. Wissenschaft trifft Unternehmergeist.
            </p>
          </div>
        </div>
      </section>

      <div className="container px-4 md:px-6 lg:px-8 py-12 md:py-16">
        <div className="mx-auto max-w-5xl space-y-20">
          
          {/* Timeline / Geschichte */}
          <section>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Unsere Geschichte</h2>
              <p className="text-muted-foreground">Von der Idee zur Agentur</p>
            </div>
            
            <div className="max-w-2xl mx-auto">
              <div className="relative pl-8 border-l-2 border-primary/20 space-y-10">
                <div className="relative">
                  <div className="absolute -left-[41px] w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <Brain className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-medium text-primary">2023</span>
                  <h3 className="font-semibold mt-1">Die Idee entsteht</h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    PROVOID beginnt als Forschungsprojekt am Schülerforschungszentrum Hamburg. Thema: Wie lässt sich Prokrastination wissenschaftlich verstehen und überwinden?
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute -left-[41px] w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <Award className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-medium text-primary">2024</span>
                  <h3 className="font-semibold mt-1">Landespreis Jugend forscht</h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    Das Projekt gewinnt den 1. Landespreis bei Jugend forscht im Bereich Arbeitswelt. Die Grundlage für PROVOID ist gelegt.
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute -left-[41px] w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <Rocket className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-medium text-primary">2025</span>
                  <h3 className="font-semibold mt-1">Gründung & Auszeichnungen</h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    PROVOID wird offiziell gegründet. 2. Platz bundesweit bei der Young-Founders Summer School. Nominierung für den STARTERiN Award Hamburg (Top 6).
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute -left-[41px] w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <Users className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-medium text-primary">Heute</span>
                  <h3 className="font-semibold mt-1">Hamburgs erste Neuromarketing-Agentur</h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    Wir betreuen Unternehmen exklusiv, entwickeln eigene EEG-basierte Tools und geben Workshops zu Neuromarketing und angewandter Neurowissenschaft.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Vision */}
          <section className="bg-muted/30 rounded-2xl p-8 md:p-12">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Unsere Vision</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Wir glauben, dass bessere Entscheidungen entstehen, wenn man versteht, wie Entscheidungen wirklich getroffen werden. Unser Ziel: Neurowissenschaftliche Erkenntnisse für Unternehmen nutzbar machen. Transparent, fundiert und praxisnah.
              </p>
            </div>
          </section>

          {/* Team - Olivia */}
          <section>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Das Team</h2>
              <p className="text-muted-foreground">Die Menschen hinter PROVOID</p>
            </div>

            <div className="bg-card border rounded-2xl overflow-hidden">
              <div className="grid md:grid-cols-[300px_1fr] gap-0">
                <div className="relative aspect-square md:aspect-auto">
                  <Image
                    src="/OliviaBahr.png"
                    alt="Olivia Bahr - Gründerin und CEO von PROVOID"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6 md:p-8">
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold">Olivia Bahr</h3>
                    <p className="text-primary font-medium">Gründerin & CEO</p>
                  </div>
                  
                  <div className="prose prose-neutral dark:prose-invert max-w-none mb-6">
                    <p>
                      Mit 15 Jahren begann Olivia als Juniorstudentin Physik an der Universität Hamburg zu studieren. Parallel forschte sie am Schülerforschungszentrum Hamburg, wo sie mit PROVOID den Landespreis bei Jugend forscht gewann.
                    </p>
                    <p>
                      2025 schloss sie ihr Abitur als Jahrgangsbeste ab (NC 0,9) und gründete PROVOID. Sie kombiniert wissenschaftliche Tiefe mit unternehmerischem Denken und bringt Erfahrung aus Sport (Fußballtrainerin bei SC Victoria Hamburg) und Forschung zusammen.
                    </p>
                  </div>

                  {/* Ausbildung & Zertifikate */}
                  <div className="mb-6">
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-primary" />
                      Ausbildung & Zertifikate
                    </h4>
                    <div className="grid sm:grid-cols-2 gap-2">
                      <Link href="/zertifikate/harvard.pdf" target="_blank" className="text-sm p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                        <span className="font-medium">Harvard University</span>
                        <p className="text-muted-foreground text-xs">Fundamentals of Neuroscience</p>
                      </Link>
                      <Link href="/zertifikate/cambridge.pdf" target="_blank" className="text-sm p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                        <span className="font-medium">University of Cambridge</span>
                        <p className="text-muted-foreground text-xs">Cognitive Psychology & Neuropsychology</p>
                      </Link>
                      <Link href="/zertifikate/neuromarketing.pdf" target="_blank" className="text-sm p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                        <span className="font-medium">Copenhagen Business School</span>
                        <p className="text-muted-foreground text-xs">Consumer Neuromarketing</p>
                      </Link>
                      <div className="text-sm p-3 bg-muted/50 rounded-lg">
                        <span className="font-medium">Universität Hamburg</span>
                        <p className="text-muted-foreground text-xs">Juniorstudium Physik (B.Sc.)</p>
                      </div>
                    </div>
                  </div>

                  {/* Auszeichnungen */}
                  <div className="mb-6">
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Award className="w-4 h-4 text-primary" />
                      Auszeichnungen
                    </h4>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>1. Landespreis Jugend forscht (Arbeitswelt)</li>
                      <li>2. Platz bundesweit Young-Founders Summer School</li>
                      <li>STARTERiN Award Hamburg 2025 (Top 6)</li>
                      <li>Internationale Mathematik-Olympiade (Landesrunde)</li>
                    </ul>
                  </div>

                  {/* CV Download */}
                  <div className="flex flex-wrap gap-3">
                    <Link 
                      href="#" 
                      className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                    >
                      <Download className="w-4 h-4" />
                      CV herunterladen
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Team Growth Note */}
            <div className="mt-8 text-center">
              <p className="text-muted-foreground">
                Unser Team wächst stetig. Wir arbeiten eng mit Neurologen, Neurowissenschaftlern und Psychologen in Hamburg zusammen.
              </p>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
