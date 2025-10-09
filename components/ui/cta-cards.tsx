import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Building2, Trophy } from "lucide-react";

export function CtaCards() {
  return (
    <section className="relative bg-background py-16 md:py-24">
      <div className="container px-4 md:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center relative z-10">
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
            Entdecken Sie unsere Bereiche
          </h2>
          <p className="mb-12 text-lg text-muted-foreground">
            Wählen Sie den Bereich, der zu Ihnen passt
          </p>
          
          <div className="grid gap-8 md:grid-cols-2">
            <Link href="/company" className="group relative block cursor-pointer">
              <Card className="relative overflow-visible h-full flex flex-col transition-all hover:shadow-lg hover:border-primary
                ring-1 ring-primary/20 group-hover:ring-2 group-hover:ring-primary/40
                after:content-[''] after:absolute after:inset-0 after:-z-10 after:rounded-2xl
                after:mx-auto after:h-[80%] after:w-[80%] after:bg-primary/30 after:blur-2xl after:opacity-0 group-hover:after:opacity-100 after:transition-opacity">
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
                  <div className="inline-flex items-center font-medium text-primary group-hover:underline">
                    Mehr erfahren
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/sports" className="group relative block cursor-pointer">
              <Card className="relative overflow-visible h-full flex flex-col transition-all hover:shadow-lg hover:border-primary
                ring-1 ring-primary/20 group-hover:ring-2 group-hover:ring-primary/40
                after:content-[''] after:absolute after:inset-0 after:-z-10 after:rounded-2xl
                after:mx-auto after:h-[80%] after:w-[80%] after:bg-primary/30 after:blur-2xl after:opacity-0 group-hover:after:opacity-100 after:transition-opacity">
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
                  <div className="inline-flex items-center font-medium text-primary group-hover:underline">
                    Mehr erfahren
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
