"use client";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

export function Success() {
    const contentRef = useRef<HTMLDivElement>(null);
    const sectionRef = useRef<HTMLElement>(null);
    const [isScrollLocked, setIsScrollLocked] = useState(false);
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

      const handleWheel = (e: WheelEvent) => {
        if (!contentRef.current || !sectionRef.current) return;
        
        const isMobile = window.innerWidth <= 768;
        if (!isMobile) return; // Solo en móvil

        const rect = sectionRef.current.getBoundingClientRect();
        // Detectar si la sección está visible en el viewport
        const isInView = rect.top < window.innerHeight * 0.8 && rect.bottom > window.innerHeight * 0.2;
        
        if (isInView) {
          const content = contentRef.current;
          const isAtTop = content.scrollTop === 0;
          const isAtBottom = Math.abs(content.scrollHeight - content.scrollTop - content.clientHeight) < 2;
          
          // Si está en el top y scrollea hacia arriba, permitir scroll de página
          if (isAtTop && e.deltaY < 0) {
            return;
          }
          
          // Si está en el bottom y scrollea hacia abajo, permitir scroll de página
          if (isAtBottom && e.deltaY > 0) {
            return;
          }
          
          // De lo contrario, bloquear scroll de página y scrollear el contenido
          e.preventDefault();
          e.stopPropagation();
          content.scrollTop += e.deltaY;
        }
      };

      const handleTouchMove = (e: TouchEvent) => {
        if (!contentRef.current || !sectionRef.current) return;
        
        const isMobile = window.innerWidth <= 768;
        if (!isMobile) return;

        const rect = sectionRef.current.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight * 0.8 && rect.bottom > window.innerHeight * 0.2;
        
        if (isInView) {
          const content = contentRef.current;
          const isAtTop = content.scrollTop === 0;
          const isAtBottom = Math.abs(content.scrollHeight - content.scrollTop - content.clientHeight) < 2;
          
          // Permitir scroll de página solo en los bordes
          if ((isAtTop && content.scrollTop <= 0) || (isAtBottom && content.scrollTop >= content.scrollHeight - content.clientHeight)) {
            return;
          }
          
          // Bloquear scroll de página
          e.preventDefault();
        }
      };

      window.addEventListener('wheel', handleWheel, { passive: false });
      window.addEventListener('touchmove', handleTouchMove, { passive: false });
      
      return () => {
        window.removeEventListener('wheel', handleWheel);
        window.removeEventListener('touchmove', handleTouchMove);
        if (contentRef.current) {
          contentRef.current.removeEventListener('scroll', handleScroll);
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
              <div className="space-y-6 pt-2 md:pt-4 px-2 md:px-4 pb-6 md:pb-8">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Individuelle neurologische Konzeption</h4>
                    <p className="text-muted-foreground">
                      Bewusstsein für eigene neuronale Stärken und Schwächen durch evidenzbasierte Analysen.
                    </p>
                  </div>
                </div>
  
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Kenntnis über Persönlichkeitstypen</h4>
                    <p className="text-muted-foreground">
                      Lernen Sie sich kennen und entdecken Sie Ihre vorherrschenden Muster: perfektionistisch, unentschlossen, überfordert oder ablenkbar?
                    </p>
                  </div>
                </div>
  
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Prokrastination endlich überwinden</h4>
                    <p className="text-muted-foreground">
                      Entdecken Sie die tiefliegenden Zusammenhänge Ihrer Prokrastination und erhalten Sie wissenschaftliche Lösungsansätze zur Überwindung.
                    </p>
                  </div>
                </div>
  
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Klare Entscheidungen</h4>
                    <p className="text-muted-foreground">
                      Das Verständnis der kognitiven Mechanismen führt zu fundierteren und nachhaltigen Entscheidungen in Alltag und Beruf.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Potenzial entfalten</h4>
                    <p className="text-muted-foreground">
                      Durch neuronale Verbindungen kann das vorhandene Potential vollständig genutzt werden.
                    </p>
                  </div>
                </div>
  
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Höhere Leistung in Sport und Beruf</h4>
                    <p className="text-muted-foreground">
                      Optimierte neuronale Prozesse und strukturen führen zu messbarer Leistungsverbesserung.
                    </p>
                  </div>
                </div>
  
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Verbesserte Teamverbindungen</h4>
                    <p className="text-muted-foreground">
                      Das gegenseitige Verständnis der neuronalen Abläufe und deren Auswirkungen auf Verhaltensweisen verstärkt das Teamgefüge.
                    </p>
                  </div>
                </div>
  
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Effektiveres Lernen</h4>
                    <p className="text-muted-foreground">
                      Durch die Anpassung der Lernmethoden an die individuelle neuronale Konzeption wird Wissen schneller und nachhaltiger aufgenommen.
                    </p>
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