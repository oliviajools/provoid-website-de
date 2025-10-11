import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";

export function FinalCta() {
  const words = [
    { text: "Klären" },
    { text: "Sie" },
    { text: "Ihre" },
    { text: "Ziele", className: "text-primary" },
    { text: "in" },
    { text: "30" },
    { text: "Minuten.", className: "text-primary" },
  ];

  return (
    <section className="py-12 md:py-16">
      <div className="container px-4 md:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          {/* Mobile: Static title */}
          <div className="md:hidden text-center mb-8">
            <h3 className="text-3xl font-bold">
              Klären Sie Ihre <span className="text-primary">Ziele</span> in <span className="text-primary">30 Minuten.</span>
            </h3>
          </div>
          
          {/* Desktop: Typewriter effect */}
          <div className="hidden md:flex text-center mb-8 justify-center">
            <TypewriterEffectSmooth 
              words={words} 
              className="text-4xl md:text-5xl lg:text-6xl font-bold"
              cursorClassName="bg-primary"
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/kontakt" className="w-full sm:w-auto cursor-pointer">
              <Button size="lg" className="w-full sm:w-auto">Gespräch buchen</Button>
            </Link>
            <Link href="/ueber-uns" className="w-full sm:w-auto cursor-pointer">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">Mehr über unseren Ansatz</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
