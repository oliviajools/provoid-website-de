"use client";

import { useState } from "react";
import { SectionHeader } from "@/components/SectionHeader";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const faqItemsDe = [
  {
    question: "Was ist Neuromarketing?",
    answer:
      "Neuromarketing verbindet Neurowissenschaft mit Marketing. Es untersucht, wie das Gehirn auf Marken, Produkte und Kommunikation reagiert. Studien zeigen, dass 95% aller Kaufentscheidungen unbewusst getroffen werden (Gerald Zaltman, Harvard Business School). Neuromarketing macht diese unbewussten Prozesse messbar und nutzbar.",
  },
  {
    question: "Was macht PROVOID genau?",
    answer:
      "PROVOID übersetzt neurowissenschaftliche Forschung in praktische Lösungen für Unternehmen und Sport. Wir bieten Seminare und Workshops zu Neuromarketing, neurologisch fundierte Optimierung von Produkten und Websites, Saisonprogramme für Sportvereine sowie Zugang zur PROVOID App für Training und Tracking.",
  },
  {
    question: "Wie läuft eine Kaufentscheidung im Gehirn ab?",
    answer:
      "Eine Kaufentscheidung durchläuft sechs Phasen: Wahrnehmung (~50-100ms, visueller Kortex), Emotion (~100-300ms, Amygdala), Bewertung (~300-500ms, präfrontaler Kortex), Aktivierung (~500-1000ms, motorischer Kortex), Entscheidung (~1000-2000ms, Striatum) und Handlung (>2000ms). Die Emotion bewertet, bevor der Verstand urteilt.",
  },
  {
    question: "Was ist Neuroathletik?",
    answer:
      "Neuroathletik trainiert das Nervensystem als Grundlage sportlicher Leistung. Fokus, Reaktionszeit und Bewegungsqualität hängen von neuronaler Verarbeitung ab. Neurofeedback-Training kann die Fokusfähigkeit und Stressregulation bei Athlet:innen signifikant verbessern. PROVOID bietet Neuro-Edukation, Trainingssessions und individuelle Betreuung.",
  },
  {
    question: "Für wen sind die Angebote von PROVOID geeignet?",
    answer:
      "Unsere Angebote richten sich an Unternehmen und Marken (Neuromarketing, Seminare, Beratung), Sportvereine und Trainerteams (Saisonprogramme) sowie ambitionierte Einzelsportler:innen im Leistungsbereich. Wir arbeiten deutschlandweit, mit Sitz in Hamburg.",
  },
  {
    question: "Auf welcher wissenschaftlichen Grundlage arbeitet PROVOID?",
    answer:
      "Unsere Arbeit basiert auf aktueller neurowissenschaftlicher Forschung, eigenen EEG-Messungen in Kooperation mit Neurolaboren und etablierten Studien, z.B. zur Antizipation im Belohnungssystem (Knutson et al., 2001). Mit NeuroInsight veröffentlichen wir zudem eine eigene wissenschaftliche Publikation.",
  },
];

const faqItemsEn = [
  {
    question: "What is neuromarketing?",
    answer:
      "Neuromarketing combines neuroscience with marketing. It studies how the brain responds to brands, products and communication. Studies show that 95% of all purchase decisions are made unconsciously (Gerald Zaltman, Harvard Business School). Neuromarketing makes these unconscious processes measurable and usable.",
  },
  {
    question: "What exactly does PROVOID do?",
    answer:
      "PROVOID translates neuroscientific research into practical solutions for companies and sport. We offer seminars and workshops on neuromarketing, neurologically grounded optimization of products and websites, season programs for sports clubs, and access to the PROVOID App for training and tracking.",
  },
  {
    question: "How does a purchase decision unfold in the brain?",
    answer:
      "A purchase decision goes through six phases: perception (~50-100ms, visual cortex), emotion (~100-300ms, amygdala), evaluation (~300-500ms, prefrontal cortex), activation (~500-1000ms, motor cortex), decision (~1000-2000ms, striatum) and action (>2000ms). Emotion evaluates before the mind judges.",
  },
  {
    question: "What is neuroathletics?",
    answer:
      "Neuroathletics trains the nervous system as the foundation of athletic performance. Focus, reaction time and movement quality depend on neural processing. Neurofeedback training can significantly improve focus and stress regulation in athletes. PROVOID offers neuro-education, training sessions and individual support.",
  },
  {
    question: "Who are PROVOID's offerings suitable for?",
    answer:
      "Our offerings are aimed at companies and brands (neuromarketing, seminars, consulting), sports clubs and coaching teams (season programs), and ambitious individual athletes at the performance level. We operate throughout Germany, based in Hamburg.",
  },
  {
    question: "What scientific basis does PROVOID work on?",
    answer:
      "Our work is based on current neuroscientific research, our own EEG measurements in cooperation with neuro labs, and established studies, e.g. on anticipation in the reward system (Knutson et al., 2001). With NeuroInsight, we also publish our own scientific publication.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { t, language } = useLanguage();
  const faqItems = language === "de" ? faqItemsDe : faqItemsEn;

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
    <section className="py-section-mobile md:py-section bg-white border-t border-primary-accent/10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container">
        <SectionHeader label="FAQ" title={t("Häufige Fragen", "Frequently Asked Questions")} />

        <div className="mt-12 max-w-3xl space-y-4">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className="border border-border bg-surface rounded-card overflow-hidden hover:border-primary-accent transition-colors duration-300"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between gap-4 p-6 text-left"
                aria-expanded={openIndex === index}
              >
                <h3 className="text-base md:text-lg font-semibold text-text-primary">
                  {item.question}
                </h3>
                <svg
                  className={`w-5 h-5 flex-shrink-0 text-primary-accent transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openIndex === index && (
                <p className="px-6 pb-6 text-sm text-text-secondary leading-relaxed">
                  {item.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
