"use client";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

export function Success() {
    const contentRef = useRef<HTMLDivElement>(null);
    const sectionRef = useRef<HTMLElement>(null);
    const [showScrollIndicator, setShowScrollIndicator] = useState(true);
    const [isAtBottom, setIsAtBottom] = useState(false);

    useEffect(() => {
      const handleScroll = () => {
        if (!contentRef.current) return;
        const content = contentRef.current;
        const scrolled = content.scrollTop > 50;
        const atBottom = Math.abs(content.scrollHeight - content.scrollTop - content.clientHeight) < 10;
        
        setShowScrollIndicator(!scrolled && !atBottom);
        setIsAtBottom(atBottom);
      };

      if (contentRef.current) {
        contentRef.current.addEventListener('scroll', handleScroll);
      }

      return () => {
        const currentContent = contentRef.current;
        if (currentContent) {
          currentContent.removeEventListener('scroll', handleScroll);
        }
      };
    }, []);

    return (
      <section className="py-8 md:py-12" ref={sectionRef}>
        <div className="container px-4 md:px-6 lg:px-8">
          <div className="relative">
            <ContainerScroll
              titleComponent={
                <h3 className="text-3xl md:text-4xl font-bold mb-20 md:mb-24 text-white">Wie Sie mit PROVOID wachsen</h3>
              }
              contentRef={contentRef}
            >
              <div className="grid gap-3 pt-2 md:pt-4 px-2 md:px-4 pb-6 md:pb-8">
                <div className="group p-4 rounded-md bg-slate-800/50 border border-slate-700/50 hover:border-cyan-500/30 hover:shadow-md transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-cyan-500/10 text-cyan-400 rounded flex items-center justify-center flex-shrink-0 font-semibold text-sm">
                      01
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Unterbewusste Prozesse verstehen</h4>
                      <p className="text-sm text-slate-400 leading-relaxed">
                        Wir decken auf, was im Verborgenen liegt – bei Ihren Kunden, Mitarbeitenden und in Ihren Prozessen.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="group p-4 rounded-md bg-slate-800/50 border border-slate-700/50 hover:border-cyan-500/30 hover:shadow-md transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-cyan-500/10 text-cyan-400 rounded flex items-center justify-center flex-shrink-0 font-semibold text-sm">
                      02
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Käufer- und Mitarbeiter-Identität klären</h4>
                      <p className="text-sm text-slate-400 leading-relaxed">
                        Wer sind Ihre Kunden wirklich? Was treibt Ihr Team an? Wir schaffen Klarheit für authentische Kommunikation.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="group p-4 rounded-md bg-slate-800/50 border border-slate-700/50 hover:border-cyan-500/30 hover:shadow-md transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-cyan-500/10 text-cyan-400 rounded flex items-center justify-center flex-shrink-0 font-semibold text-sm">
                      03
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Conversion steigern</h4>
                      <p className="text-sm text-slate-400 leading-relaxed">
                        Neurowissenschaftlich optimierte Touchpoints führen zu messbarer Steigerung Ihrer Conversion-Rates.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="group p-4 rounded-md bg-slate-800/50 border border-slate-700/50 hover:border-cyan-500/30 hover:shadow-md transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-cyan-500/10 text-cyan-400 rounded flex items-center justify-center flex-shrink-0 font-semibold text-sm">
                      04
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Entscheidungen fundieren</h4>
                      <p className="text-sm text-slate-400 leading-relaxed">
                        Das Verständnis kognitiver Mechanismen führt zu besseren Entscheidungen in Marketing, Führung und Strategie.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="group p-4 rounded-md bg-slate-800/50 border border-slate-700/50 hover:border-cyan-500/30 hover:shadow-md transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-cyan-500/10 text-cyan-400 rounded flex items-center justify-center flex-shrink-0 font-semibold text-sm">
                      05
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Teamdynamik stärken</h4>
                      <p className="text-sm text-slate-400 leading-relaxed">
                        Das Verständnis neuronaler Muster verbessert Zusammenarbeit, Kommunikation und Teamgefüge.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="group p-4 rounded-md bg-slate-800/50 border border-slate-700/50 hover:border-cyan-500/30 hover:shadow-md transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-cyan-500/10 text-cyan-400 rounded flex items-center justify-center flex-shrink-0 font-semibold text-sm">
                      06
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Leistung maximieren</h4>
                      <p className="text-sm text-slate-400 leading-relaxed">
                        Optimierte Prozesse und Strukturen führen zu messbarer Leistungssteigerung – im Sport wie im Business.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="group p-4 rounded-md bg-slate-800/50 border border-slate-700/50 hover:border-cyan-500/30 hover:shadow-md transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-cyan-500/10 text-cyan-400 rounded flex items-center justify-center flex-shrink-0 font-semibold text-sm">
                      07
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Wissen nachhaltig verankern</h4>
                      <p className="text-sm text-slate-400 leading-relaxed">
                        Durch unsere Workshops und Seminare wird neurowissenschaftliches Know-how in Ihrem Team verankert.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </ContainerScroll>
            
            {/* Scroll indicator - justo encima del borde inferior */}
            {showScrollIndicator && (
              <div className="md:hidden absolute bottom-6 left-0 right-0 z-20 flex justify-center pointer-events-none">
                <div className="bg-gray-500/40 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 animate-bounce shadow-lg">
                  <ChevronDown className="w-4 h-4" />
                  Scroll für mehr
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
            )}
            
            {/* Indicador cuando termina el scroll */}
            {isAtBottom && (
              <div className="md:hidden absolute bottom-6 left-0 right-0 z-20 flex justify-center pointer-events-none">
                <div className="bg-green-500/50 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 shadow-lg">
                  ✓ Alles gesehen - weiter scrollen
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    )
}