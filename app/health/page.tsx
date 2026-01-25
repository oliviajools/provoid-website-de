import { Metadata } from "next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, Shield, Activity, Heart, Monitor } from "lucide-react";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Health | PROVOID",
  description: "Demenz-Prävention und Delir-Management durch spezialisierte Methoden.",
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
              <span className="text-foreground">PROVOID</span>-<span className="text-primary">Health</span>
            </h1>
            <p className="text-lg text-muted-foreground md:text-xl">
              Demenz-Prävention. Delir-Management. Kognitive Gesundheit.
            </p>
            <div className="relative mt-2 flex justify-center">
              <div aria-hidden className="pointer-events-none absolute inset-0 mx-auto flex justify-center items-center">
                <div className="h-48 w-48 md:h-64 md:w-64 lg:h-72 lg:w-72 rounded-full bg-primary/40 blur-[56px] animate-pulse" />
              </div>
              <Image
                src="/brain.png"
                alt="Gehirn Illustration"
                width={768}
                height={768}
                priority
                loading="eager"
                quality={90}
                className="relative mx-auto h-auto w-72 md:w-[28rem] lg:w-[32rem] drop-shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="container px-4 md:px-6 lg:px-8 py-[38px] md:py-[58px]">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Spezialisierte Gesundheitsvorsorge</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Spezialisierte Ansätze zur Prävention von Demenz und effektivem Delir-Management 
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
                  Aktive Förderung der kognitiven Reserve durch spezialisierte Trainingings zur Reduzierung 
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
                  Frühzeitige Erkennung und spezialisierte Intervention bei Delir-Symptomen zur 
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

          {/* Klinik-Tool Section */}
          <div className="mt-12 p-8 rounded-2xl border bg-card">
            <div className="text-center mb-6">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="rounded-full bg-primary/10 p-3">
                  <Monitor className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold">Klinik-Tool</h3>
              </div>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
                Spezialisierte Software für klinische Einrichtungen zur Unterstützung der Patientenorientierung 
                und des Delir-Managements direkt am Patientenbett.
              </p>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2 mb-6">
              <div className="p-4 rounded-lg bg-muted/50">
                <h4 className="font-semibold mb-2">Bettnutzung</h4>
                <p className="text-sm text-muted-foreground">
                  Optimiert für Bettbildschirme und direkte Anwendung am Patientenbett
                </p>
              </div>
              <div className="p-4 rounded-lg bg-muted/50">
                <h4 className="font-semibold mb-2">Orientierungshilfe</h4>
                <p className="text-sm text-muted-foreground">
                  Unterstützt Patienten bei zeitlicher und örtlicher Orientierung
                </p>
              </div>
            </div>
            
            <div className="text-center">
              <a href="https://klinik.provoid.de" 
                 className="inline-flex items-center justify-center rounded-md text-sm font-medium px-8 py-3 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                Klinik-Tool starten
              </a>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-12 text-center p-8 rounded-2xl border bg-card">
            <h3 className="text-xl font-semibold mb-3">Persönliche Gesundheitsberatung</h3>
            <p className="text-muted-foreground mb-6">
              Kontaktieren Sie uns für eine individuelle Beratung zur Demenz-Prävention und 
              Delir-Prävention durch spezialisierte Methoden.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
