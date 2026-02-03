"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { Brain, Users, Microscope, BookOpen } from "lucide-react";

export function Proof() {
  const proofItems = [
    {
      icon: Brain,
      text: "Neurowissenschaftlich fundiert",
      description: "Basierend auf aktueller Forschung"
    },
    {
      icon: Users,
      text: "In engem Austausch mit Fachexperten",
      description: "Kontinuierliche Weiterentwicklung"
    },
    {
      icon: Microscope,
      text: "Angewandte Forschung",
      description: "Praxisnahe Umsetzung"
    },
    {
      icon: BookOpen,
      text: "Gehirngerechte Methoden",
      description: "Individuell angepasst"
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-muted/30">
      <div className="container px-4 md:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold mb-6">
              Begleitung mit neurowissenschaftlicher Expertise
            </h3>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Wir übersetzen Forschung in anwendbare Schritte und begleiten Sie empathisch, strukturiert und evidenzbasiert.
            </p>
          </div>
        </div>
      </div>
      
      {/* Full width carousel */}
      <ProofCarousel items={proofItems} />
    </section>
  );
}

function ProofCarousel({ items }: { items: { icon: React.ElementType; text: string; description?: string }[] }) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    addAnimation();
  }, []);

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      if (containerRef.current) {
        containerRef.current.style.setProperty("--animation-direction", "forwards");
        containerRef.current.style.setProperty("--animation-duration", "90s");
      }
      setStart(true);
    }
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]"
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-6 py-4",
          start && "animate-scroll",
          "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item, idx) => {
          const Icon = item.icon;
          return (
            <li
              className="relative w-[280px] max-w-full shrink-0 rounded-xl border border-border bg-card px-6 py-8 hover:border-primary/30 hover:shadow-sm transition-all"
              key={`${item.text}-${idx}`}
            >
              <div className="flex flex-col items-center text-center gap-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h4 className="text-base font-semibold text-primary mb-2">
                    {item.text}
                  </h4>
                  {item.description && (
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
