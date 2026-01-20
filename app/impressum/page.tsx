import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum | PROVOID",
  description: "Rechtliche Anbieterkennzeichnung und Kontaktinformationen von PROVOID.",
  alternates: {
    canonical: "/impressum",
  },
};

export default function ImpressumPage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative bg-gradient-to-b from-primary/10 to-background py-16 md:py-24">
        <div className="container px-4 md:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl">Impressum</h1>
            <p className="text-lg text-muted-foreground">Verantwortlich gemäß § 5 TMG</p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="container px-4 md:px-6 lg:px-8 py-12 md:py-16">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-2xl border bg-card px-6 py-6 shadow-sm">
            <div className="space-y-6 text-muted-foreground">
              <div>
                <h2 className="mb-2 text-xl font-semibold tracking-tight">Verantwortlich für den Inhalt dieser Webseite</h2>
                <p>Olivia Bahr</p>
                <p>Beim Andreasbrunnen 6</p>
                <p>20249 Hamburg</p>
                <p>Deutschland</p>
              </div>

              <div>
                <h2 className="mb-2 text-xl font-semibold tracking-tight">Sitz des Unternehmens</h2>
                <p>Eppendorfer Landstraße 15</p>
                <p>20249 Hamburg</p>
              </div>

              <div>
                <h2 className="mb-2 text-xl font-semibold tracking-tight">Kontakt</h2>
                <p>Telefon: <a className="text-foreground hover:underline" href="tel:+491744401044">+49 174 4401044</a></p>
                <p>E-Mail: <a className="text-foreground hover:underline" href="mailto:oliviabahr@avoid-procrastination-provoid.com">oliviabahr@avoid-procrastination-provoid.com</a></p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
