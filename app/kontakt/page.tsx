import { Metadata } from "next";
import { Mail, Phone, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Kontakt | PROVOID",
  description: "Kontaktieren Sie PROVOID - Wir freuen uns auf Ihre Nachricht.",
  alternates: {
    canonical: "/kontakt",
  },
};

export default function KontaktPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-primary/20 to-background py-[48px] md:py-[77px]">
        <div className="container px-4 md:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              <span className="text-primary">Kontakt</span>
            </h1>
            <p className="text-lg text-muted-foreground md:text-xl">
              Wir freuen uns auf Ihre Nachricht
            </p>
          </div>
        </div>
      </section>

      {/* Calendly Embed Section */}
      <section className="container px-4 md:px-6 lg:px-8 py-4 md:py-8">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-2xl border bg-card p-3 md:p-4 shadow-sm">
            <div className="w-full h-[calc(100vh-280px)] md:h-[calc(100vh-200px)] rounded-lg overflow-hidden">
              <iframe
                src="https://calendly.com/oliviajools/30min"
                width="100%"
                height="100%"
                frameBorder="0"
                title="Calendly Terminbuchung"
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="container px-4 md:px-6 lg:px-8 py-[38px] md:py-[58px]">
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardContent className="pt-6 pb-6 flex flex-col items-center text-center">
                <div className="mb-4 rounded-full bg-primary/10 p-4">
                  <Mail className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">E-Mail</h3>
                <a 
                  href="mailto:oliviajools@icloud.com"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors break-all"
                >
                  oliviajools@icloud.com
                </a>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardContent className="pt-6 pb-6 flex flex-col items-center text-center">
                <div className="mb-4 rounded-full bg-primary/10 p-4">
                  <Phone className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">Telefon</h3>
                <a 
                  href="tel:+491744401044"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  +49 1744401044
                </a>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardContent className="pt-6 pb-6 flex flex-col items-center text-center">
                <div className="mb-4 rounded-full bg-primary/10 p-4">
                  <MapPin className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">Adresse</h3>
                <address className="text-sm text-muted-foreground not-italic">
                  Olivia Bahr<br />
                  Beim Andreasbrunnen 6<br />
                  20249 Hamburg<br />
                  Deutschland
                </address>
              </CardContent>
            </Card>

          </div>

          {/* Additional Info Section */}
          <div className="mt-12 rounded-2xl border bg-card p-6 md:p-8 shadow-sm">
            <h2 className="mb-4 text-2xl font-bold tracking-tight">
              Nehmen Sie Kontakt auf
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Haben Sie Fragen zu unseren Dienstleistungen oder möchten Sie mehr über PROVOID erfahren? 
              Buchen Sie direkt einen Termin über Calendly oder kontaktieren Sie uns per E-Mail oder Telefon. 
              Wir freuen uns darauf, von Ihnen zu hören und gemeinsam mit Ihnen die besten Lösungen 
              für Ihre Bedürfnisse zu entwickeln.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
