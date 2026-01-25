import { Metadata } from "next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Activity, Brain, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Health | PROVOID",
  description: "Gesundheit und Wohlbefinden durch neuroathletische Methoden.",
  alternates: {
    canonical: "/health",
  },
};

export default function HealthPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-primary/20 to-background py-[48px] md:py-[77px]">
        <div className="container px-4 md:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              <span className="text-primary">Health</span>
            </h1>
            <p className="text-lg text-muted-foreground md:text-xl">
              Gesundheit. Prävention. Leistungsfähigkeit.
            </p>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="container px-4 md:px-6 lg:px-8 py-[38px] md:py-[58px]">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Gesundheit durch Neuroathletik</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Unsere neuroathletischen Ansätze helfen dabei, die körperliche und geistige Gesundheit zu verbessern 
              und präventiv gegen Stress und Burnout vorzugehen.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-primary/10 p-3">
                    <Heart className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Stressmanagement</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Lernen Sie, Stress effektiv zu regulieren und Ihre Resilienz durch gezielte neuroathletische 
                  Techniken zu stärken.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-primary/10 p-3">
                    <Activity className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Prävention</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Identifizieren Sie frühzeitig Risikofaktoren und stärken Sie Ihre Gesundheit durch 
                  maßgeschneiderte neuroathletische Präventionsprogramme.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-primary/10 p-3">
                    <Brain className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Kognitive Gesundheit</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Verbessern Sie Ihre kognitive Leistungsfähigkeit und fördern Sie die neuroplastische 
                  Entwicklung durch gezielte Trainingsmethoden.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-primary/10 p-3">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Immunsystem</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Stärken Sie Ihr Immunsystem durch neuroathletische Ansätze und verbessern Sie Ihre 
                  körpereigene Abwehrkräfte.
                </CardDescription>
              </CardContent>
            </Card>
          </div>

          {/* CTA Section */}
          <div className="mt-12 text-center p-8 rounded-2xl border bg-card">
            <h3 className="text-xl font-semibold mb-3">Gesundheitsprogramm starten</h3>
            <p className="text-muted-foreground mb-6">
              Kontaktieren Sie uns für ein persönliches Beratungsgespräch und finden Sie den passenden 
              Ansatz für Ihre Gesundheit.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
