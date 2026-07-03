import { SectionHeader } from "@/components/SectionHeader";

export default function Impressum() {
  return (
    <div className="flex flex-col">
      <section className="relative py-section-mobile md:py-section bg-surface overflow-hidden">
        <div className="frequency-line top-1/3" />
        <div className="container relative z-10">
          <div className="max-w-4xl flex items-start justify-between gap-8">
            <div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-text-primary mb-6">
                IMPRESSUM
              </h1>
              <p className="text-lg md:text-xl text-text-secondary mb-8 max-w-3xl">
                Verantwortlich gemäß § 5 TMG
              </p>
            </div>
            <div className="flex-shrink-0">
              <img src="/Logo-provoid.png" alt="PROVOID" className="h-24 md:h-32" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-section-mobile md:py-section bg-white">
        <div className="container">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-semibold text-text-primary mb-6">Verantwortlich für den Inhalt dieser Webseite</h2>
            
            <div className="space-y-4 text-text-secondary">
              <p>Olivia Bahr</p>
              <p>Beim Andreasbrunnen 6</p>
              <p>20249 Hamburg</p>
              <p>Deutschland</p>
            </div>

            <h2 className="text-2xl font-semibold text-text-primary mt-12 mb-6">Sitz des Unternehmens</h2>
            
            <div className="space-y-4 text-text-secondary">
              <p>Eppendorfer Landstraße 15</p>
              <p>20249 Hamburg</p>
            </div>

            <h2 className="text-2xl font-semibold text-text-primary mt-12 mb-6">Kontakt</h2>
            
            <div className="space-y-4 text-text-secondary">
              <p>Telefon: <a href="tel:+491744401044" className="text-primary-accent hover:text-primary-light transition-colors">+49 174 440 1044</a></p>
              <p>E-Mail: <a href="mailto:olivia@provoid.de" className="text-primary-accent hover:text-primary-light transition-colors">olivia@provoid.de</a></p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
