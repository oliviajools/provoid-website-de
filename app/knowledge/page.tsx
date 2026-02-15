import { Brain3DRealistic } from "@/components/ui/brain-3d-realistic";
import { Brain, Lightbulb, Target } from "lucide-react";

export const metadata = {
  title: "Neuro-Knowledge | PROVOID",
  description: "Entdecken Sie interaktiv, wie verschiedene Hirnareale Entscheidungen, Teamdynamiken und Unternehmensprozesse beeinflussen.",
  alternates: {
    canonical: "/knowledge",
  },
};

export default function KnowledgePage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-gradient-to-b from-primary/10 to-background pt-8 md:pt-12 pb-8">
        <div className="container px-4 md:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Brain className="h-4 w-4" />
              Interaktives Lernen
            </div>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
              Das Gehirn verstehen
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Entdecken Sie, wie verschiedene Hirnareale Kaufentscheidungen, Teamdynamiken 
              und Unternehmensprozesse beeinflussen – und wie Sie dieses Wissen nutzen können.
            </p>
          </div>
        </div>
      </section>

      {/* 3D Brain */}
      <section className="py-8 md:py-12">
        <div className="container px-4 md:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <Brain3DRealistic />
          </div>
        </div>
      </section>

      {/* Key Insights */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container px-4 md:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Warum Hirnwissen für Unternehmen relevant ist
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                95% aller Entscheidungen werden unbewusst getroffen. Wer die zugrundeliegenden 
                Mechanismen versteht, kann gezielter kommunizieren und führen.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 rounded-xl border border-border bg-card text-card-foreground">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Marketing & Vertrieb</h3>
                <p className="text-sm text-muted-foreground">
                  Verstehen Sie, was Kaufentscheidungen wirklich antreibt – jenseits von dem, 
                  was Kunden in Umfragen angeben.
                </p>
              </div>

              <div className="p-6 rounded-xl border border-border bg-card text-card-foreground">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Lightbulb className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Führung & Teams</h3>
                <p className="text-sm text-muted-foreground">
                  Nutzen Sie neurowissenschaftliche Erkenntnisse für bessere Motivation, 
                  Kommunikation und Teamdynamik.
                </p>
              </div>

              <div className="p-6 rounded-xl border border-border bg-card text-card-foreground">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Brain className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Strategische Entscheidungen</h3>
                <p className="text-sm text-muted-foreground">
                  Erkennen Sie kognitive Verzerrungen und treffen Sie fundiertere 
                  Entscheidungen auf allen Ebenen.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20">
        <div className="container px-4 md:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Wie können wir Ihnen helfen?
            </h2>
            <p className="text-muted-foreground mb-8">
              Wir übersetzen neurowissenschaftliche Erkenntnisse in praktische Lösungen 
              für Ihr Unternehmen. Lassen Sie uns gemeinsam herausfinden, wo das größte Potenzial liegt.
            </p>
            <a 
              href="/kontakt" 
              className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Gespräch vereinbaren
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
