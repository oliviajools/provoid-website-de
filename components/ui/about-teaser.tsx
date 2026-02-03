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
                Mit 15 begann Olivia als Juniorstudentin Physik an der Universität Hamburg zu studieren. Parallel forschte sie am Schülerforschungszentrum – und gewann mit ihrem Projekt den Landespreis bei Jugend forscht. Heute, mit 19, führt sie PROVOID als CEO.
              </p>
              <p>
                Ihr Antrieb: verstehen, wie Menschen wirklich denken und entscheiden. Zertifiziert in Neuroscience (Harvard), Cognitive Psychology (Cambridge) und Consumer Neuromarketing (Copenhagen Business School) – kombiniert mit echtem Unternehmergeist.
              </p>
              <p>
                Was bedeutet das für Sie? Wissenschaftliche Tiefe, frische Perspektiven und die Energie, Ihr Unternehmen wirklich zu verstehen – nicht nur oberflächlich, sondern dort, wo Entscheidungen entstehen: im Gehirn.
              </p>
              <p className="mt-6">
                <Link href="/company" className="inline-flex items-center font-medium text-primary hover:underline">
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
