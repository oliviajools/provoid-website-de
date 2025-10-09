import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export function AboutTeaser() {
  return (
    <section className="py-16 md:py-24">
      <div className="container px-4 md:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-sm uppercase tracking-wider text-muted-foreground mb-3">Über uns</h2>
            <h3 className="text-3xl md:text-4xl font-bold">Warum wir tun, was wir tun</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="prose prose-neutral dark:prose-invert max-w-none">
              <p>
                In Hamburg geboren – aus Neugier, Leidenschaft und dem Wunsch, das Gehirn besser zu verstehen.
                PROVOID begann als Jugend-forscht-Projekt und wurde zu einer Bewegung, die neurowissenschaftliche Erkenntnisse greifbar macht. Wir glauben an eine Zukunft, in der jeder Mensch sein neuronales Potenzial kennt und nutzt – für mehr Klarheit, Fokus und echte Verbindung im Denken und Handeln.
              </p>
              <p>
                Unsere Arbeit ist evidenzbasiert und wirkungsorientiert: Tools, Trainings und Interventionen, die
                Entscheidungen, Zusammenarbeit und Strukturen messbar verbessern.
              </p>
              <p className="mt-6">
                <Link href="/ueber-uns" className="inline-flex items-center font-medium text-primary hover:underline">
                  Mehr über uns
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </p>
            </div>

            <div className="relative">
              <Image
                src="/olivia.jpg"
                alt="Olivia Bahr - Gründerin von PROVOID"
                width={500}
                height={500}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
