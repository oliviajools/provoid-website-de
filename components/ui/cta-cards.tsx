import Link from "next/link";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";
import { ArrowRight, Building2, Trophy } from "lucide-react";

export function CtaCards() {
  return (
    <section className="relative bg-background py-16 md:py-24">
      <div className="container px-4 md:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl text-center relative z-10">
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
            Entdecken Sie unsere Bereiche
          </h2>
          <p className="mb-8 text-lg text-muted-foreground">
            Wählen Sie den Bereich, der zu Ihnen passt
          </p>

          <div className="grid gap-6 md:grid-cols-2 items-stretch">
            {/* Company Card */}
            <Link href="/company" className="block h-full">
              <CardContainer containerClassName="!py-0 h-full">
                <CardBody className="bg-card relative group/card border border-primary rounded-xl p-6 h-full min-h-[22rem] w-full transition-colors">
                  <CardItem translateZ="50" className="mb-4 flex justify-center">
                    <div className="rounded-full bg-primary/10 p-4">
                      <Building2 className="h-12 w-12 text-primary" />
                    </div>
                  </CardItem>

                  <CardItem translateZ="60" className="text-2xl font-bold text-card-foreground mb-2 text-left">
                    PROVOID-Company
                  </CardItem>

                  <CardItem translateZ="40" className="text-base text-muted-foreground mb-4 text-left">
                    Maßgeschneiderte Lösungen für Ihr Unternehmen
                  </CardItem>

                  <CardItem translateZ="30" className="text-sm text-muted-foreground mb-6 text-left">
                    Optimieren Sie Ihre Unternehmensprozesse mit unseren wissenschaftlich
                    fundierten Methoden und individuellen Beratungsleistungen.
                  </CardItem>

                  <CardItem translateZ="50" className="inline-flex items-center font-medium text-primary text-left">
                    Mehr erfahren
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </CardItem>
                </CardBody>
              </CardContainer>
            </Link>

            {/* Sports Card */}
            <Link href="/sports" className="block h-full">
              <CardContainer containerClassName="!py-0 h-full">
                <CardBody className="bg-card relative group/card border border-primary rounded-xl p-6 h-full min-h-[22rem] w-full transition-colors">
                  <CardItem translateZ="50" className="mb-4 flex justify-center">
                    <div className="rounded-full bg-primary/10 p-4">
                      <Trophy className="h-12 w-12 text-primary" />
                    </div>
                  </CardItem>

                  <CardItem translateZ="60" className="text-2xl font-bold text-card-foreground mb-2 text-left">
                    PROVOID-Sports
                  </CardItem>

                  <CardItem translateZ="40" className="text-base text-muted-foreground mb-4 text-left">
                    Professionelle Unterstützung für Sportorganisationen
                  </CardItem>

                  <CardItem translateZ="30" className="text-sm text-muted-foreground mb-6 text-left">
                    Steigern Sie die Leistung Ihrer Athleten und optimieren Sie Ihre
                    Sportorganisation mit unseren spezialisierten Programmen.
                  </CardItem>

                  <CardItem translateZ="50" className="inline-flex items-center font-medium text-primary text-left">
                    Mehr erfahren
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </CardItem>
                </CardBody>
              </CardContainer>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
