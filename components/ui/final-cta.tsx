import Link from "next/link";
import { Button } from "@/components/ui/button";

export function FinalCta() {
  return (
    <section className="py-12">
      <div className="container px-4 md:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-6">Bereit für den nächsten Schritt?</h3>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/kontakt">
              <Button size="lg">Kostenloses Gespräch buchen</Button>
            </Link>
            <Link href="/ueber-uns" className="inline-flex">
              <Button size="lg" variant="outline">Mehr über unseren Ansatz</Button>
            </Link>
          </div>
          <p className="text-sm text-muted-foreground mt-3">[Optional: Hinweis zu Dauer/Format des Erstgesprächs]</p>
        </div>
      </div>
    </section>
  );
}
