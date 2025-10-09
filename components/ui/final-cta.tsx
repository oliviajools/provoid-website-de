import Link from "next/link";
import { Button } from "@/components/ui/button";

export function FinalCta() {
  return (
    <section className="py-16 md:py-24">
      <div className="container px-4 md:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="text-center mb-8">
            <h3 className="text-3xl md:text-4xl font-bold">Bereit für den nächsten Schritt?</h3>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/kontakt">
              <Button size="lg">Kostenloses Gespräch buchen</Button>
            </Link>
            <Link href="/ueber-uns" className="inline-flex">
              <Button size="lg" variant="outline">Mehr über unseren Ansatz</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
