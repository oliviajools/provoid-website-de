import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export function AboutTeaser() {
  return (
    <section className="py-12 md:py-16">
      <div className="container px-4 md:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold">Warum wir tun, was wir tun</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="prose prose-neutral dark:prose-invert max-w-none">
              <p>
                95% aller Entscheidungen werden unbewusst getroffen. Trotzdem basieren die meisten Marketing- und Führungsstrategien auf dem, was Menschen sagen, nicht auf dem, wie sie wirklich denken. Neurowissenschaftliche Erkenntnisse existieren seit Jahren, kommen aber kaum in Unternehmen an.
              </p>
              <p>
                Das wollen wir ändern. PROVOID macht Neurowissenschaft für Unternehmen nutzbar: für besseres Marketing, klarere Kommunikation und stärkere Teams.
              </p>
              <p>
                Dahinter steht Olivia Bahr, zertifiziert in Neuroscience (Harvard), Cognitive Psychology (Cambridge) und Consumer Neuromarketing (Copenhagen Business School). Mit 19 Jahren verbindet sie wissenschaftliche Tiefe mit unternehmerischem Denken.
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
                src="/OliviaBahr.png"
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
