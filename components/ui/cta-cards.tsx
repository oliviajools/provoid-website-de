"use client";
import Link from "next/link";
import { ArrowRight, Building2, Trophy } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export function CtaCards() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="relative bg-background py-12 md:py-16">
      <div className="container px-4 md:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center relative z-10">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold">Entdecken Sie unsere Bereiche</h3>
            <p className="mt-4 text-lg text-muted-foreground">
              Wählen Sie den Bereich, der zu Ihnen passt
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 items-stretch">
            {/* Company Card */}
            <Link 
              href="/company" 
              className="relative group block h-full w-full"
              onMouseEnter={() => setHoveredIndex(0)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="rounded-xl h-full w-full p-8 bg-gradient-to-br from-primary/5 to-primary/15 border-2 border-primary/30 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_20px_60px_rgb(0,0,0,0.3)] transition-all duration-300 hover:-translate-y-2 relative overflow-hidden">
                <div className="relative z-50">
                  <div className="mb-4 flex justify-center">
                    <div className="rounded-full bg-primary/10 p-4">
                      <Building2 className="h-12 w-12 text-primary" />
                    </div>
                  </div>

                  <h4 className="text-2xl font-bold text-card-foreground mb-2 text-left">
                    PROVOID-Company
                  </h4>

                  <p className="text-base text-muted-foreground mb-4 text-left">
                    Maßgeschneiderte Lösungen für Ihr Unternehmen
                  </p>

                  <p className="text-sm text-muted-foreground mb-6 text-left">
                    Optimieren Sie Ihre Unternehmensprozesse mit unseren wissenschaftlich
                    fundierten Methoden und individuellen Beratungsleistungen.
                  </p>

                  <div className="inline-flex items-center font-medium text-primary text-left">
                    Mehr erfahren
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </div>
              </div>
            </Link>

            {/* Sports Card */}
            <Link 
              href="/sports" 
              className="relative group block h-full w-full"
              onMouseEnter={() => setHoveredIndex(1)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="rounded-xl h-full w-full p-8 bg-gradient-to-br from-primary/5 to-primary/15 border-2 border-primary/30 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_20px_60px_rgb(0,0,0,0.3)] transition-all duration-300 hover:-translate-y-2 relative overflow-hidden">
                <div className="relative z-50">
                  <div className="mb-4 flex justify-center">
                    <div className="rounded-full bg-primary/10 p-4">
                      <Trophy className="h-12 w-12 text-primary" />
                    </div>
                  </div>

                  <h4 className="text-2xl font-bold text-card-foreground mb-2 text-left">
                    PROVOID-Sports
                  </h4>

                  <p className="text-base text-muted-foreground mb-4 text-left">
                    Professionelle Unterstützung für Sportorganisationen
                  </p>

                  <p className="text-sm text-muted-foreground mb-6 text-left">
                    Steigern Sie die Leistung Ihrer Athleten und optimieren Sie Ihre
                    Sportorganisation mit unseren spezialisierten Programmen.
                  </p>

                  <div className="inline-flex items-center font-medium text-primary text-left">
                    Mehr erfahren
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
