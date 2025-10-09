import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";

export function FinalCta() {
  const words = [
    { text: "Bereit" },
    { text: "für" },
    { text: "den" },
    { text: "nächsten" },
    { text: "Schritt?", className: "text-primary" },
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="container px-4 md:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="text-center mb-8 flex justify-center">
            <TypewriterEffectSmooth 
              words={words} 
              className="text-4xl md:text-5xl lg:text-6xl font-bold"
              cursorClassName="bg-primary"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/kontakt">
              <Button size="lg">Gespräch buchen</Button>
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
