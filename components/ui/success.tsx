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
      <section className="pt-6 md:pt-8 pb-12 md:pb-16" ref={sectionRef}>
        <div className="container px-4 md:px-6 lg:px-8">
          <div className="relative">
            <ContainerScroll
              titleComponent={
                <h3 className="text-3xl md:text-4xl font-bold mb-12 md:mb-16">Wie Sie mit PROVOID wachsen</h3>
              }
              contentRef={contentRef}
            >
              <div className="grid gap-4 pt-2 md:pt-4 px-2 md:px-4 pb-6 md:pb-8">
                <div className="group p-4 rounded-xl bg-gradient-to-r from-primary/5 to-transparent border border-primary/10 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/70 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-white font-bold text-sm">01</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">Individuelle neurologische Konzeption</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Bewusstsein für eigene neuronale Stärken und Schwächen durch evidenzbasierte Analysen.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="group p-4 rounded-xl bg-gradient-to-r from-primary/5 to-transparent border border-primary/10 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/70 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-white font-bold text-sm">02</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">Kenntnis über Persönlichkeitstypen</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Lernen Sie sich kennen und entdecken Sie Ihre vorherrschenden Muster: perfektionistisch, unentschlossen, überfordert oder ablenkbar?
                      </p>
                    </div>
                  </div>
                </div>

                <div className="group p-4 rounded-xl bg-gradient-to-r from-primary/5 to-transparent border border-primary/10 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/70 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-white font-bold text-sm">03</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">Prokrastination endlich überwinden</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Entdecken Sie die tiefliegenden Zusammenhänge Ihrer Prokrastination und erhalten Sie wissenschaftliche Lösungsansätze zur Überwindung.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="group p-4 rounded-xl bg-gradient-to-r from-primary/5 to-transparent border border-primary/10 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/70 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-white font-bold text-sm">04</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">Klare Entscheidungen</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Das Verständnis der kognitiven Mechanismen führt zu fundierteren und nachhaltigen Entscheidungen in Alltag und Beruf.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="group p-4 rounded-xl bg-gradient-to-r from-primary/5 to-transparent border border-primary/10 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/70 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-white font-bold text-sm">05</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">Potenzial entfalten</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Durch neuronale Verbindungen kann das vorhandene Potential vollständig genutzt werden.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="group p-4 rounded-xl bg-gradient-to-r from-primary/5 to-transparent border border-primary/10 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/70 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-white font-bold text-sm">06</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">Höhere Leistung in Sport und Beruf</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Optimierte neuronale Prozesse und strukturen führen zu messbarer Leistungsverbesserung.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="group p-4 rounded-xl bg-gradient-to-r from-primary/5 to-transparent border border-primary/10 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/70 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-white font-bold text-sm">07</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">Verbesserte Teamverbindungen</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Das gegenseitige Verständnis der neuronalen Abläufe und deren Auswirkungen auf Verhaltensweisen verstärkt das Teamgefüge.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="group p-4 rounded-xl bg-gradient-to-r from-primary/5 to-transparent border border-primary/10 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/70 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-white font-bold text-sm">08</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">Effektiveres Lernen</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Durch die Anpassung der Lernmethoden an die individuelle neuronale Konzeption wird Wissen schneller und nachhaltiger aufgenommen.
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