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
              className="relative group block p-2 h-full w-full"
              onMouseEnter={() => setHoveredIndex(0)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <AnimatePresence>
                {hoveredIndex === 0 && (
                  <motion.span
                    className="absolute inset-0 h-full w-full bg-primary/20 block rounded-3xl z-0"
                    layoutId="hoverBackground"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: 1,
                      transition: { duration: 0.15 },
                    }}
                    exit={{
                      opacity: 0,
                      transition: { duration: 0.15, delay: 0.2 },
                    }}
                  />
                )}
              </AnimatePresence>
              <div className="rounded-2xl h-full w-full p-6 overflow-hidden bg-card/80 backdrop-blur-sm border border-primary group-hover:border-primary relative z-10">
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
              className="relative group block p-2 h-full w-full"
              onMouseEnter={() => setHoveredIndex(1)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <AnimatePresence>
                {hoveredIndex === 1 && (
                  <motion.span
                    className="absolute inset-0 h-full w-full bg-primary/20 block rounded-3xl z-0"
                    layoutId="hoverBackground"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: 1,
                      transition: { duration: 0.15 },
                    }}
                    exit={{
                      opacity: 0,
                      transition: { duration: 0.15, delay: 0.2 },
                    }}
                  />
                )}
              </AnimatePresence>
              <div className="rounded-2xl h-full w-full p-6 overflow-hidden bg-card/80 backdrop-blur-sm border border-primary group-hover:border-primary relative z-10">
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
