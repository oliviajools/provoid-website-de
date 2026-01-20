import { Metadata } from "next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Activity, BarChart3, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Neuroathletische Analyse | PROVOID",
  description: "Neuroathletische Testung und Analyse – Messen Sie Ihre kognitiven und neuronalen Fähigkeiten.",
  alternates: {
    canonical: "/analyse",
  },
};

export default function AnalysePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-primary/20 to-background py-[48px] md:py-[77px]">
        <div className="container px-4 md:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Neuroathletische <span className="text-primary">Analyse</span>
            </h1>
            <p className="text-lg text-muted-foreground md:text-xl">
              Messen. Verstehen. Optimieren.
            </p>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="container px-4 md:px-6 lg:px-8 py-[38px] md:py-[58px]">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Was wird getestet?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Unsere neuroathletische Analyse erfasst verschiedene kognitive und neuronale Parameter, 
              die für sportliche Leistung entscheidend sind.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-primary/10 p-3">
                    <Brain className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Reaktionsfähigkeit</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Messung der neuronalen Verarbeitungsgeschwindigkeit und Reaktionszeiten auf visuelle und auditive Reize.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-primary/10 p-3">
                    <Activity className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Fokus & Aufmerksamkeit</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Analyse der Konzentrationsfähigkeit und selektiven Aufmerksamkeit unter verschiedenen Bedingungen.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-primary/10 p-3">
                    <BarChart3 className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Entscheidungsqualität</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Bewertung der Entscheidungsfindung unter Zeitdruck und komplexen Situationen.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-primary/10 p-3">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Selbstregulation</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Erfassung der Fähigkeit zur emotionalen und kognitiven Selbststeuerung.
                </CardDescription>
              </CardContent>
            </Card>
          </div>

          {/* Coming Soon Notice */}
          <div className="mt-12 text-center p-8 rounded-2xl border bg-card">
            <h3 className="text-xl font-semibold mb-3">Testung bald verfügbar</h3>
            <p className="text-muted-foreground">
              Die interaktive neuroathletische Testung wird in Kürze freigeschaltet. 
              Kontaktieren Sie uns für weitere Informationen.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
