import { Metadata } from "next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Shield, Activity, Heart } from "lucide-react";

export const metadata: Metadata = {
  title: "Health | PROVOID",
  description: "Demenz-Prävention und Delir-Management durch neuroathletische Methoden.",
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
              Demenz-Prävention. Delir-Management. Kognitive Gesundheit.
            </p>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="container px-4 md:px-6 lg:px-8 py-[38px] md:py-[58px]">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Neuroathletische Gesundheitsvorsorge</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Spezialisierte neuroathletische Ansätze zur Prävention von Demenz und effektivem Delir-Management 
              durch gezielte kognitive Trainingingsmethoden.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-primary/10 p-3">
                    <Brain className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Demenz-Prävention</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Aktive Förderung der kognitiven Reserve durch neuroathletische Trainingings zur Reduzierung 
                  des Demenzrisikos und Erhaltung der Gehirngesundheit.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-primary/10 p-3">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Delir-Management</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Frühzeitige Erkennung und neuroathletische Intervention bei Delir-Symptomen zur 
                  Stabilisierung der kognitiven Funktionen und schnelleren Genesung.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-primary/10 p-3">
                    <Activity className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Kognitive Resilienz</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Stärkung der neuroplastischen Anpassungsfähigkeit und Aufbau kognitiver Reserven 
                  für verbesserte Stressbewältigung und geistige Widerstandsfähigkeit.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-primary/10 p-3">
                    <Heart className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Gehirngesundheit</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Ganzheitliche Förderung der neuronalen Gesundheit durch kombinierte kognitive, 
                  motorische und sensorische Trainingingsansätze.
                </CardDescription>
              </CardContent>
            </Card>
          </div>

          {/* CTA Section */}
          <div className="mt-12 text-center p-8 rounded-2xl border bg-card">
            <h3 className="text-xl font-semibold mb-3">Persönliche Gesundheitsberatung</h3>
            <p className="text-muted-foreground mb-6">
              Kontaktieren Sie uns für eine individuelle Beratung zur Demenz-Prävention und 
              Delir-Prävention durch neuroathletische Methoden.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
