"use client";

import { SectionHeader } from "@/components/SectionHeader";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function Impressum() {
  const { t } = useLanguage();
  return (
    <div className="flex flex-col">
      <section className="relative py-section-mobile md:py-section bg-surface overflow-hidden">
        <div className="container relative z-10">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-text-primary mb-6">
              IMPRESSUM
            </h1>
            <p className="text-lg md:text-xl text-text-secondary mb-8 max-w-3xl">
              {t("Verantwortlich gemäß § 5 TMG", "Responsible pursuant to § 5 TMG (German Telemedia Act)")}
            </p>
          </div>
        </div>
      </section>

      <section className="py-section-mobile md:py-section bg-white">
        <div className="container">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-semibold text-text-primary mb-6">{t("Verantwortlich für den Inhalt dieser Webseite", "Responsible for the Content of this Website")}</h2>
            
            <div className="space-y-4 text-text-secondary">
              <p>Olivia Bahr</p>
              <p>Beim Andreasbrunnen 6</p>
              <p>20249 Hamburg</p>
              <p>{t("Deutschland", "Germany")}</p>
            </div>

            <h2 className="text-2xl font-semibold text-text-primary mt-12 mb-6">{t("Sitz des Unternehmens", "Company Headquarters")}</h2>
            
            <div className="space-y-4 text-text-secondary">
              <p>Eppendorfer Landstraße 15</p>
              <p>20249 Hamburg</p>
            </div>

            <h2 className="text-2xl font-semibold text-text-primary mt-12 mb-6">{t("Kontakt", "Contact")}</h2>
            
            <div className="space-y-4 text-text-secondary">
              <p>{t("Telefon", "Phone")}: <a href="tel:+491744401044" className="text-primary-accent hover:text-primary-light transition-colors">+49 174 440 1044</a></p>
              <p>{t("E-Mail", "Email")}: <a href="mailto:olivia@provoid.de" className="text-primary-accent hover:text-primary-light transition-colors">olivia@provoid.de</a></p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
