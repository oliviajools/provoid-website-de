import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function AboutTeaser() {
  return (
    <section className="py-16 md:py-24">
      <div className="container px-4 md:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-8">
            <h2 className="text-sm uppercase tracking-wider text-muted-foreground mb-3">Über uns</h2>
            <h3 className="text-3xl md:text-4xl font-bold">Wer wir sind und was wir tun</h3>
          </div>

          <div className="prose prose-neutral dark:prose-invert max-w-none text-center">
            <p>
              PROVOID übersetzt neurowissenschaftliche Erkenntnisse in anwendbare Lösungen. Wir nutzen aktuelle Forschung
              und führen eigene Studien durch, um neuronale Fähigkeiten in leistungsbezogenen Bereichen zu stärken –
              von Fokus und Lernen bis zu resilienten Teamstrukturen.
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
        </div>
      </div>
    </section>
  );
}
