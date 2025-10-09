import { ContainerScroll } from "@/components/ui/container-scroll-animation";

export function Success() {
    return (
      <section className="py-12 md:py-16">
        <div className="container px-4 md:px-6 lg:px-8">
          <ContainerScroll
            titleComponent={
              <h3 className="text-3xl md:text-4xl font-bold mb-12 md:mb-8">Was Sie mit PROVOID erreichen</h3>
            }
          >
            <div className="grid md:grid-cols-2 gap-8 p-2 md:p-0">
              <div className="space-y-6">
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
                    <h4 className="font-semibold mb-2">Wissenschaftliches Wissen über Neurobereiche</h4>
                    <p className="text-muted-foreground">
                      Bewusstsein für eigene neuronale Stärken und Schwächen durch Analyse der 6 wichtigsten
                      Gehirnbereiche.
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
                      Verstehen Sie Ihre vorherrschenden Muster: Perfektionist, Unentschlossen, Überfordert oder
                      Ablenkbar.
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
                    <h4 className="font-semibold mb-2">Prokrastination überwinden</h4>
                    <p className="text-muted-foreground">
                      Schrittweise Anleitung, um neuronale Stärken zu fördern und Schwächen zu verbessern. Bessere
                      Leistung bei Aufgaben.
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
                    <h4 className="font-semibold mb-2">Klarere Entscheidungen</h4>
                    <p className="text-muted-foreground">
                      Verständnis kognitiver Mechanismen führt zu fundierteren, nachhaltigeren Entscheidungen im Alltag.
                    </p>
                  </div>
                </div>
              </div>
  
              <div className="space-y-6">
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
                      Neue neuronale Verbindungen schaffen und vorhandene Potenziale vollständig nutzen.
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
                    <h4 className="font-semibold mb-2">Höhere Leistung im Job oder Sport</h4>
                    <p className="text-muted-foreground">
                      Messbare Verbesserung der Leistung durch optimierte neuronale Prozesse und Strukturen.
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
                      Zusätzliches Teamprogramm stärkt die Zusammenarbeit und Kommunikation im gesamten Team.
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
                    <h4 className="font-semibold mb-2">
                    Effektiveres Lernen
                    </h4>
                    <p className="text-muted-foreground">
                    Wissen wird durch gehirngerechte Methoden schneller aufgenommen und länger behalten.
                    </p>
                  </div>
              </div>
            </div>
            </div>
          </ContainerScroll>
        </div>
      </section>
    )
}