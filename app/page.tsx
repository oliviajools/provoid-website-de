import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/Section";
import { ArrowRight, Building2, Trophy } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-primary/10 to-background py-20 md:py-32">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Willkommen bei <span className="text-primary">PROVOID</span>
            </h1>
            <p className="mb-8 text-lg text-muted-foreground md:text-xl">
              Innovative Lösungen für Unternehmen und Sport
            </p>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="container py-16 md:py-24">
        <div className="mx-auto max-w-4xl space-y-16">
          <Section id="was-ist-provoid" title="Was ist PROVOID?">
            <p>
              PROVOID ist eine innovative Plattform, die maßgeschneiderte Lösungen für Unternehmen 
              und Sportorganisationen bietet. Mit unserem ganzheitlichen Ansatz verbinden wir 
              wissenschaftliche Erkenntnisse mit praktischer Anwendung, um nachhaltige Erfolge zu erzielen.
            </p>
          </Section>

          <Section id="idee" title="Was ist die Idee hinter PROVOID?">
            <p>
              Die Idee hinter PROVOID basiert auf der Erkenntnis, dass sowohl Unternehmen als auch 
              Sportorganisationen von evidenzbasierten Strategien profitieren können. Wir schaffen 
              eine Brücke zwischen Theorie und Praxis und ermöglichen es unseren Kunden, ihr volles 
              Potenzial zu entfalten.
            </p>
          </Section>

          <Section id="vision" title="Was ist PROVOIDs Vision?">
            <p>
              Unsere Vision ist es, der führende Partner für ganzheitliche Entwicklung und Optimierung 
              zu werden. Wir streben danach, Standards zu setzen und innovative Lösungen zu entwickeln, 
              die nachhaltig positive Veränderungen bewirken.
            </p>
          </Section>

          <Section id="geschichte" title="Geschichte von PROVOID">
            <p>
              PROVOID wurde aus der Überzeugung heraus gegründet, dass wissenschaftlich fundierte 
              Methoden den Unterschied machen. Seit unserer Gründung haben wir kontinuierlich an der 
              Entwicklung innovativer Konzepte gearbeitet und unser Leistungsspektrum erweitert.
            </p>
          </Section>

          <Section id="wer-ist-provoid" title="Wer ist PROVOID?">
            <p>
              PROVOID ist ein Team von Experten aus verschiedenen Fachbereichen, die ihre Expertise 
              bündeln, um maßgeschneiderte Lösungen zu entwickeln. Unser interdisziplinäres Team 
              vereint Fachwissen aus Wissenschaft, Praxis und Beratung.
            </p>
          </Section>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t bg-muted/50 py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
              Entdecken Sie unsere Bereiche
            </h2>
            <p className="mb-12 text-lg text-muted-foreground">
              Wählen Sie den Bereich, der zu Ihnen passt
            </p>
            
            <div className="grid gap-8 md:grid-cols-2">
              <Card className="group transition-all hover:shadow-lg hover:border-primary">
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
                <CardContent>
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

              <Card className="group transition-all hover:shadow-lg hover:border-primary">
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
                <CardContent>
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
