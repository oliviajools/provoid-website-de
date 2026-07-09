"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const faqItems = [
  {
    question: "Was ist Neuromarketing?",
    answer:
      "Neuromarketing verbindet Neurowissenschaft mit Marketing. Es untersucht, wie das Gehirn auf Marken, Produkte und Kommunikation reagiert. Bis zu 95% aller Kaufentscheidungen laufen unbewusst ab (Gerald Zaltman, Harvard Business School). Neuromarketing macht diese unbewussten Prozesse messbar und nutzbar.",
  },
  {
    question: "Was macht PROVOID genau?",
    answer:
      "PROVOID übersetzt neurowissenschaftliche Forschung in praktische Lösungen für Unternehmen und Sport. Wir bieten Seminare zu Neuromarketing und Consumer Neuroscience, neurologische Analysen für Sportteams, eine Neuro-Trainings-App sowie wissenschaftlich fundierte Strategieberatung.",
  },
  {
    question: "Wie läuft eine Kaufentscheidung im Gehirn ab?",
    answer:
      "Eine Kaufentscheidung durchläuft mehrere Phasen: Wahrnehmung (~50-100ms, visueller Kortex), emotionale Bewertung (~100-300ms, Amygdala), rationale Begründung (~300-500ms, präfrontaler Kortex) und schließlich die Entscheidung (~1000-2000ms, Striatum). Die Emotion bewertet, bevor der Verstand urteilt.",
  },
  {
    question: "Was ist Neuroathletik?",
    answer:
      "Neuroathletik trainiert das Nervensystem als Grundlage sportlicher Leistung. Fokus, Reaktionszeit und Bewegungsqualität hängen von neuronaler Verarbeitung ab. PROVOID hat u.a. mit dem SC Victoria Hamburg über 8 Monate mit vier Jugendteams gearbeitet und messbare Leistungsoptimierung erzielt.",
  },
  {
    question: "Für wen sind die Angebote von PROVOID geeignet?",
    answer:
      "Unsere Angebote richten sich an Unternehmen (Marketing, Kommunikation, Teamentwicklung), Sportvereine und Mannschaften sowie ambitionierte Einzelsportler:innen im Leistungsbereich. Wir arbeiten deutschlandweit und digital, mit Sitz in Hamburg.",
  },
  {
    question: "Auf welcher wissenschaftlichen Grundlage arbeitet PROVOID?",
    answer:
      "Unsere Arbeit basiert auf aktueller neurowissenschaftlicher Forschung, eigenen EEG-Messungen in Kooperation mit Neurolaboren und etablierten Studien, z.B. zur Antizipation im Belohnungssystem (Knutson et al., 2001). PROVOID entstand als Jugend forscht-Projekt und gewann 2026 den 1. Preis.",
  },
];

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <section className="py-16 md:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container px-4 md:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="text-center mb-12">
            <p className="text-primary text-sm font-medium tracking-wider uppercase mb-3">
              FAQ
            </p>
            <h2 className="text-3xl md:text-4xl font-bold">
              Häufige Fragen
            </h2>
          </div>

          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div
                key={index}
                className="rounded-2xl border border-border bg-card overflow-hidden hover:border-primary/30 transition-colors"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between gap-4 p-6 text-left"
                  aria-expanded={openIndex === index}
                >
                  <h3 className="text-base md:text-lg font-semibold text-foreground">
                    {item.question}
                  </h3>
                  <ChevronDown
                    className={`w-5 h-5 flex-shrink-0 text-primary transition-transform duration-300 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="px-6 pb-6 text-muted-foreground leading-relaxed">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
