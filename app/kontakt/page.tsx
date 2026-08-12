"use client";

import { useState } from "react";
import { SectionHeader } from "@/components/SectionHeader";
import { CTABlock } from "@/components/ui/CTABlock";
import Image from "next/image";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function Contact() {
  const [message, setMessage] = useState("");
  const { t } = useLanguage();

  const handleQuickContact = (type: string) => {
    const subject = type === "sports" ? t("Anfrage: Sports-Paket für Trainer", "Inquiry: Sports Package for Coaches") : t("Anfrage: Video-Call vereinbaren", "Inquiry: Schedule a Video Call");
    window.location.href = `mailto:olivia@provoid.de?subject=${encodeURIComponent(subject)}`;
  };

  const handleDirectMessage = () => {
    if (message.trim()) {
      window.location.href = `mailto:olivia@provoid.de?subject=${encodeURIComponent(t("Kontakt über Website", "Contact via Website"))}&body=${encodeURIComponent(message)}`;
    }
  };
  return (
    <div className="flex flex-col">
      <section className="relative py-8 md:py-12 bg-surface overflow-hidden">
        <div className="container relative z-10">
          <div className="max-w-4xl flex items-center justify-between gap-8">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-text-primary mb-4">
                {t("KONTAKT", "CONTACT")}
              </h1>
              <p className="text-base md:text-lg text-text-secondary mb-6 max-w-3xl">
                {t("Bereit für den nächsten Schritt? Sprechen Sie mit uns über Ihr Projekt oder Ihre Frage.", "Ready for the next step? Talk to us about your project or your question.")}
              </p>
            </div>
            <div className="flex-shrink-0 hidden md:block">
              <Image
                src="/brain.png"
                alt="Gehirn Illustration"
                width={768}
                height={768}
                priority
                loading="eager"
                quality={90}
                className="relative mx-auto h-auto w-48 md:w-56 lg:w-64 drop-shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 md:py-12 bg-white">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="border border-border bg-surface p-8 rounded-card hover:border-primary-accent hover:shadow-lg hover:shadow-primary-accent/10 transition-all duration-300 hover:-translate-y-1">
              <h3 className="text-xl font-semibold text-text-primary mb-6">{t("Direkter Kontakt", "Direct Contact")}</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wider text-text-muted mb-2">E-Mail</p>
                  <a href="mailto:olivia@provoid.de" className="text-lg text-primary-accent hover:text-primary-light transition-colors">olivia@provoid.de</a>
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wider text-text-muted mb-2">{t("Telefon", "Phone")}</p>
                  <a href="tel:+491744401044" className="text-lg text-primary-accent hover:text-primary-light transition-colors">+49 174 440 1044</a>
                </div>
              </div>
            </div>

            <div className="border border-border bg-surface p-8 rounded-card hover:border-primary-accent hover:shadow-lg hover:shadow-primary-accent/10 transition-all duration-300 hover:-translate-y-1">
              <h3 className="text-xl font-semibold text-text-primary mb-6">{t("Schnellkontakt", "Quick Contact")}</h3>
              <p className="text-text-secondary mb-6">
                {t("Wählen Sie eine Option oder schreiben Sie uns direkt:", "Choose an option or write to us directly:")}
              </p>
              <div className="space-y-3 mb-6">
                <button
                  onClick={() => handleQuickContact("sports")}
                  className="w-full px-4 py-3 text-left border border-border rounded-editorial hover:border-primary-accent hover:bg-primary-accent/5 transition-colors text-sm text-text-primary"
                >
                  🏃 {t("Sportpaket für Trainer anfragen", "Inquire about Sports Package for Coaches")}
                </button>
                <button
                  onClick={() => handleQuickContact("call")}
                  className="w-full px-4 py-3 text-left border border-border rounded-editorial hover:border-primary-accent hover:bg-primary-accent/5 transition-colors text-sm text-text-primary"
                >
                  📞 {t("Video-Call vereinbaren", "Schedule a Video Call")}
                </button>
              </div>
              <div className="border-t border-border pt-6">
                <p className="text-sm font-semibold text-text-primary mb-3">{t("Oder direkt schreiben:", "Or write directly:")}</p>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={t("Ihre Nachricht...", "Your message...")}
                  rows={4}
                  className="w-full px-4 py-3 border border-border rounded-editorial text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary-accent transition-colors resize-none mb-3"
                />
                <button
                  onClick={handleDirectMessage}
                  disabled={!message.trim()}
                  className="w-full px-4 py-3 text-sm font-medium text-white bg-primary hover:bg-primary-light transition-colors rounded-editorial shadow-lg shadow-primary-accent/20 hover:shadow-primary-accent/30 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {t("Nachricht absenden", "Send Message")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-section-mobile md:py-section bg-surface">
        <div className="container">
          <SectionHeader label="OFFICE" title={t("Standort", "Location")} />
          
          <div className="mt-12 border border-border bg-white p-8 rounded-card hover:border-primary-accent hover:shadow-lg hover:shadow-primary-accent/10 transition-all duration-300 hover:-translate-y-1">
            <p className="text-text-secondary mb-4">
              {t("PROVOID ist in Hamburg beheimatet und arbeitet deutschlandweit sowie digital mit Kunden zusammen.", "PROVOID is based in Hamburg and works with clients throughout Germany as well as digitally.")}
            </p>
            <p className="text-text-secondary">
              {t("Für persönliche Termine und Kooperationen in Hamburg kontaktieren Sie uns bitte vorab per E-Mail oder Telefon.", "For in-person appointments and collaborations in Hamburg, please contact us in advance by email or phone.")}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
