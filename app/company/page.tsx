"use client";

import { useState } from "react";
import React from "react";
import Image from "next/image";
import { SectionHeader } from "@/components/SectionHeader";
import { CTABlock } from "@/components/ui/CTABlock";
import { ProofCard } from "@/components/ui/ProofCard";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function Company() {
  const [activeStep, setActiveStep] = useState<number | null>(0);
  const { t } = useLanguage();
  return (
    <div className="flex flex-col">
      <section className="relative py-section-mobile md:py-section bg-surface overflow-hidden">
        <div className="container relative z-10">
          <div className="max-w-4xl flex items-start justify-between gap-8">
            <div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-text-primary mb-6">
                {t("ENTSCHEIDUNGEN VERSTEHEN - WACHSTUM STEUERN.", "UNDERSTAND DECISIONS - DRIVE GROWTH.")}
              </h1>
              <p className="text-lg md:text-xl text-text-secondary mb-8 max-w-3xl">
                {t("Wir helfen Unternehmen, Verhalten, Motivation und Kaufentscheidungen wissenschaftlich zu verstehen und daraus klare Strategien für Marketing, Kommunikation und Teams abzuleiten.", "We help companies scientifically understand behavior, motivation and purchase decisions, and derive clear strategies for marketing, communication and teams.")}
              </p>
              <CTABlock primary={{ text: t("Gespräch buchen", "Book a call"), href: "/kontakt" }} secondary={{ text: t("Leistungen ansehen", "View Services"), href: "#services" }} />
            </div>
            <div className="flex-shrink-0">
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

      <section id="services" className="py-8 md:py-12 bg-white">
        <div className="container">
          <SectionHeader label="PRODUKTE" title={t("Unser Angebot für Unternehmen", "Our Offering for Companies")} />
          
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <div className="border border-border bg-black p-8 rounded-card hover:border-primary-accent hover:shadow-lg hover:shadow-primary-accent/10 transition-all duration-300 hover:-translate-y-1">
              <h3 className="text-xl font-semibold text-white mb-4">Seminar: Neuroscience & Neuromarketing</h3>
              <p className="text-sm text-gray-300 mb-4">{t("Kompakte Einführung in Neuromarketing & Consumer Neuroscience", "Compact introduction to neuromarketing & consumer neuroscience")}</p>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3"><span className="text-primary-accent mt-1">•</span><span className="text-gray-300">{t("Bessere Kunden- und Kaufprozess-Insights", "Better customer and purchase-process insights")}</span></div>
                <div className="flex items-start gap-3"><span className="text-primary-accent mt-1">•</span><span className="text-gray-300">{t("Neue Perspektiven für Entwicklung & Marketing", "New perspectives for development & marketing")}</span></div>
                <div className="flex items-start gap-3"><span className="text-primary-accent mt-1">•</span><span className="text-gray-300">{t("Wissenschaftliches Fundament für Strategien", "Scientific foundation for strategies")}</span></div>
              </div>
            </div>

            <div className="border border-border bg-black p-8 rounded-card hover:border-primary-accent hover:shadow-lg hover:shadow-primary-accent/10 transition-all duration-300 hover:-translate-y-1">
              <h3 className="text-xl font-semibold text-white mb-4">{t("Workshop: Branchenspezifisch & Hands-On", "Workshop: Industry-Specific & Hands-On")}</h3>
              <p className="text-sm text-gray-300 mb-4">{t("Maßgeschneidertes Format mit klaren Strategien und konkreten Umsetzungs-Sprints", "Tailored format with clear strategies and concrete implementation sprints")}</p>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3"><span className="text-primary-accent mt-1">•</span><span className="text-gray-300">{t("Für Branding, Marketing, Produktentwicklung und Produktdesign", "For branding, marketing, product development and product design")}</span></div>
                <div className="flex items-start gap-3"><span className="text-primary-accent mt-1">•</span><span className="text-gray-300">{t("Konkrete Entscheidungen und Umsetzungen direkt anstoßen", "Directly trigger concrete decisions and implementations")}</span></div>
                <div className="flex items-start gap-3"><span className="text-primary-accent mt-1">•</span><span className="text-gray-300">{t("Praktische Anwendung statt nur Wissen", "Practical application instead of just knowledge")}</span></div>
              </div>
            </div>

            <div className="border border-border bg-black p-8 rounded-card hover:border-primary-accent hover:shadow-lg hover:shadow-primary-accent/10 transition-all duration-300 hover:-translate-y-1">
              <h3 className="text-xl font-semibold text-white mb-4">{t("EEG-Produktevaluation & Analyse", "EEG Product Evaluation & Analysis")}</h3>
              <p className="text-sm text-gray-300 mb-4">{t("Testung der neuronalen Wirkung von Produkten inkl. Interpretation & Handlungsempfehlungen", "Testing the neural impact of products incl. interpretation & recommendations for action")}</p>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3"><span className="text-primary-accent mt-1">•</span><span className="text-gray-300">{t("EEG-Testung (optional ergänzend fMRI)", "EEG testing (optionally supplemented with fMRI)")}</span></div>
                <div className="flex items-start gap-3"><span className="text-primary-accent mt-1">•</span><span className="text-gray-300">{t("Datenbasierte Entscheidungen im Produktdesign", "Data-driven decisions in product design")}</span></div>
                <div className="flex items-start gap-3"><span className="text-primary-accent mt-1">•</span><span className="text-gray-300">{t("Besonders bei high-stakes Entscheidungen (Positionierung, Design)", "Especially for high-stakes decisions (positioning, design)")}</span></div>
              </div>
            </div>

            <div className="border border-primary-accent bg-black p-8 rounded-card hover:border-primary-accent hover:shadow-lg hover:shadow-primary-accent/10 transition-all duration-300 hover:-translate-y-1">
              <h3 className="text-xl font-semibold text-white mb-4">{t("Begleitende Produktentwicklung", "Ongoing Product Development Support")}</h3>
              <p className="text-sm text-gray-300 mb-4">{t("Kontinuierliche Begleitung von der Idee bis zur Umsetzung", "Continuous support from idea to implementation")}</p>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3"><span className="text-primary-accent mt-1">•</span><span className="text-gray-300">{t("Neurowissenschaftliche Perspektive und Feedback-Loops", "Neuroscientific perspective and feedback loops")}</span></div>
                <div className="flex items-start gap-3"><span className="text-primary-accent mt-1">•</span><span className="text-gray-300">{t("Priorisierung für bessere Produkt- und Marketingentscheidungen", "Prioritization for better product and marketing decisions")}</span></div>
                <div className="flex items-start gap-3"><span className="text-primary-accent mt-1">•</span><span className="text-gray-300">{t("Schnell lernen, iterieren und messbar bessere Entscheidungen treffen", "Learn fast, iterate, and make measurably better decisions")}</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-section-mobile md:py-section bg-white">
        <div className="container">
          <SectionHeader label="THE PROBLEM" title={t("Die meisten Strategien beginnen zu spät.", "Most strategies start too late.")} description={t("Viele Unternehmen verlassen sich auf Umfragen, Annahmen oder oberflächliche Daten. Doch Entscheidungen entstehen oft, bevor Menschen sie bewusst erklären können.", "Many companies rely on surveys, assumptions or superficial data. Yet decisions often arise before people can consciously explain them.")} />
          
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <div className="border border-border bg-surface p-8 rounded-card hover:border-primary-accent hover:shadow-lg hover:shadow-primary-accent/10 transition-all duration-300 hover:-translate-y-1">
              <h3 className="text-lg font-semibold text-text-primary mb-6">{t("Ohne PROVOID", "Without PROVOID")}</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3"><span className="text-text-muted mt-1">•</span><span className="text-text-secondary">{t("Annahmen statt Mechanismen", "Assumptions instead of mechanisms")}</span></li>
                <li className="flex items-start gap-3"><span className="text-text-muted mt-1">•</span><span className="text-text-secondary">{t("Zielgruppen ohne psychologische Tiefe", "Target groups without psychological depth")}</span></li>
                <li className="flex items-start gap-3"><span className="text-text-muted mt-1">•</span><span className="text-text-secondary">{t("Kommunikation ohne neuronale Relevanz", "Communication without neural relevance")}</span></li>
                <li className="flex items-start gap-3"><span className="text-text-muted mt-1">•</span><span className="text-text-secondary">{t("Conversion-Potenzial bleibt ungenutzt", "Conversion potential remains untapped")}</span></li>
              </ul>
            </div>

            <div className="border border-primary-accent bg-surface p-8 rounded-card hover:border-primary-accent hover:shadow-lg hover:shadow-primary-accent/10 transition-all duration-300 hover:-translate-y-1">
              <h3 className="text-lg font-semibold text-text-primary mb-6">{t("Mit PROVOID", "With PROVOID")}</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3"><span className="text-primary-accent mt-1">+</span><span className="text-text-secondary">{t("Verhalten wirklich verstehen", "Truly understand behavior")}</span></li>
                <li className="flex items-start gap-3"><span className="text-primary-accent mt-1">+</span><span className="text-text-secondary">{t("Kaufmotive präzisieren", "Refine purchase motives")}</span></li>
                <li className="flex items-start gap-3"><span className="text-primary-accent mt-1">+</span><span className="text-text-secondary">{t("Touchpoints gehirngerecht optimieren", "Optimize touchpoints in a brain-friendly way")}</span></li>
                <li className="flex items-start gap-3"><span className="text-primary-accent mt-1">+</span><span className="text-text-secondary">{t("Entscheidungen messbar machen", "Make decisions measurable")}</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="py-section-mobile md:py-section bg-surface">
        <div className="container">
          <SectionHeader label="SERVICES" title={t("Diagnose. Strategie. Umsetzung. Evaluation.", "Diagnosis. Strategy. Implementation. Evaluation.")} />
          
          <div className="mt-12 space-y-8">
            <div className="border border-border bg-black p-4 rounded-card hover:border-primary-accent hover:shadow-lg hover:shadow-primary-accent/10 transition-all duration-300 hover:-translate-y-1 group">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <span className="text-sm font-semibold uppercase tracking-wider text-gray-400 group-hover:text-primary-accent transition-colors">01</span>
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-primary-accent transition-colors">{t("Diagnose", "Diagnosis")}</h4>
                  <p className="text-sm text-gray-300">{t("Analyse von Zielgruppe, Kommunikation, Entscheidungswegen und psychologischen Triggern.", "Analysis of target group, communication, decision paths and psychological triggers.")}</p>
                </div>
              </div>
            </div>
            <div className="border border-border bg-black p-4 rounded-card hover:border-primary-accent hover:shadow-lg hover:shadow-primary-accent/10 transition-all duration-300 hover:-translate-y-1 group">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <span className="text-sm font-semibold uppercase tracking-wider text-gray-400 group-hover:text-primary-accent transition-colors">02</span>
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-primary-accent transition-colors">{t("Neuro-Strategie", "Neuro-Strategy")}</h4>
                  <p className="text-sm text-gray-300">{t("Ableitung konkreter Hypothesen, Botschaften, Touchpoints und Maßnahmen.", "Deriving concrete hypotheses, messages, touchpoints and measures.")}</p>
                </div>
              </div>
            </div>
            <div className="border border-border bg-black p-4 rounded-card hover:border-primary-accent hover:shadow-lg hover:shadow-primary-accent/10 transition-all duration-300 hover:-translate-y-1 group">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <span className="text-sm font-semibold uppercase tracking-wider text-gray-400 group-hover:text-primary-accent transition-colors">03</span>
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-primary-accent transition-colors">{t("Umsetzung", "Implementation")}</h4>
                  <p className="text-sm text-gray-300">{t("Workshops, Kampagnenlogik, Teamformate, Tool-Integration.", "Workshops, campaign logic, team formats, tool integration.")}</p>
                </div>
              </div>
            </div>
            <div className="border border-border bg-black p-4 rounded-card hover:border-primary-accent hover:shadow-lg hover:shadow-primary-accent/10 transition-all duration-300 hover:-translate-y-1 group">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <span className="text-sm font-semibold uppercase tracking-wider text-gray-400 group-hover:text-primary-accent transition-colors">04</span>
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-primary-accent transition-colors">{t("Evaluation", "Evaluation")}</h4>
                  <p className="text-sm text-gray-300">{t("Messung, Feedback, Optimierung, Weiterentwicklung.", "Measurement, feedback, optimization, further development.")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-section-mobile md:py-section bg-white">
        <div className="container">
          <SectionHeader label="CLIENT JOURNEY" title={t("Wie Wir Sie unterstützen.", "How We Support You.")} />
          
          <div className="mt-12">
            <div className="flex items-center justify-center gap-2 mb-8">
              <button
                onClick={() => setActiveStep(activeStep === null ? 0 : Math.max(0, activeStep - 1))}
                className="p-2 rounded-editorial bg-surface text-text-muted hover:bg-border2 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
                disabled={activeStep === null || activeStep === 0}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {[
                { number: "01", title: t("Ausgangslage", "Starting Point"), description: t("Ein mittelständisches Unternehmen im B2C-Bereich kämpft mit stagnierenden Conversion-Raten trotz intensiver Marketingaktivitäten.", "A mid-sized B2C company struggles with stagnating conversion rates despite intensive marketing activities.") },
                { number: "02", title: t("Herausforderung", "Challenge"), description: t("Kunden wandern im Checkout-Prozess ab und es besteht Unklarheit über die tatsächlichen Kaufmotive.", "Customers drop off during checkout and there is uncertainty about the actual purchase motives.") },
                { number: "03", title: t("Analyse", "Analysis"), description: t("Eine neurowissenschaftliche Analyse der Entscheidungspunkte identifiziert implizite Barrieren und Trigger.", "A neuroscientific analysis of decision points identifies implicit barriers and triggers.") },
                { number: "04", title: t("Umsetzung", "Implementation"), description: t("Die Optimierung der Touchpoints basiert auf neuronalen Prinzipien und die Kommunikation wird an emotionale Entscheidungswege angepasst.", "Touchpoint optimization is based on neural principles and communication is adapted to emotional decision pathways.") },
                { number: "05", title: t("Ergebnis", "Result"), description: t("Es zeigt sich eine messbare Verbesserung der Conversion-Rate, eine höhere Kundenbindung und ein klareres Verständnis der Zielgruppenpsychologie.", "There is a measurable improvement in conversion rate, higher customer retention, and a clearer understanding of target group psychology.") }
              ].map((step, index) => (
                <button
                  key={index}
                  onClick={() => setActiveStep(index)}
                  className={`px-4 py-2 rounded-editorial text-sm font-semibold transition-all duration-300 ${
                    activeStep === index
                      ? 'bg-primary-accent text-white'
                      : 'bg-surface text-text-muted hover:bg-border2'
                  }`}
                >
                  {step.number}
                </button>
              ))}

              <button
                onClick={() => setActiveStep(activeStep === null ? 0 : Math.min(4, activeStep + 1))}
                className="p-2 rounded-editorial bg-surface text-text-muted hover:bg-border2 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
                disabled={activeStep === null || activeStep === 4}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            <div className="flex flex-col md:flex-row gap-4 items-center relative">
              {[
                { number: "01", title: t("Ausgangslage", "Starting Point"), description: t("Ein mittelständisches Unternehmen im B2C-Bereich kämpft mit stagnierenden Conversion-Raten trotz intensiver Marketingaktivitäten.", "A mid-sized B2C company struggles with stagnating conversion rates despite intensive marketing activities.") },
                { number: "02", title: t("Herausforderung", "Challenge"), description: t("Kunden wandern im Checkout-Prozess ab und es besteht Unklarheit über die tatsächlichen Kaufmotive.", "Customers drop off during checkout and there is uncertainty about the actual purchase motives.") },
                { number: "03", title: t("Analyse", "Analysis"), description: t("Eine neurowissenschaftliche Analyse der Entscheidungspunkte identifiziert implizite Barrieren und Trigger.", "A neuroscientific analysis of decision points identifies implicit barriers and triggers.") },
                { number: "04", title: t("Umsetzung", "Implementation"), description: t("Die Optimierung der Touchpoints basiert auf neuronalen Prinzipien und die Kommunikation wird an emotionale Entscheidungswege angepasst.", "Touchpoint optimization is based on neural principles and communication is adapted to emotional decision pathways.") },
                { number: "05", title: t("Ergebnis", "Result"), description: t("Es zeigt sich eine messbare Verbesserung der Conversion-Rate, eine höhere Kundenbindung und ein klareres Verständnis der Zielgruppenpsychologie.", "There is a measurable improvement in conversion rate, higher customer retention, and a clearer understanding of target group psychology.") }
              ].map((step, index) => (
                <React.Fragment key={index}>
                  <div className="w-full md:w-[18%]">
                    <div 
                      onClick={() => setActiveStep(index)}
                      className={`border bg-black p-4 rounded-card hover:border-primary-accent transition-all duration-500 ease-in-out cursor-pointer ${
                        activeStep === index 
                          ? 'border-primary-accent' 
                          : 'border-border'
                      }`}
                    >
                      <div className="text-2xl font-bold text-gray-400 mb-2 transition-colors duration-500 ease-in-out" style={{ color: activeStep === index ? '#3DB8DE' : '' }}>
                        {step.number}
                      </div>
                      <h4 className="text-lg font-semibold text-white mb-2 transition-colors duration-500 ease-in-out" style={{ color: activeStep === index ? '#3DB8DE' : '' }}>
                        {step.title}
                      </h4>
                      {activeStep === index && (
                        <p className="text-xs text-white mt-3 transition-all duration-500 ease-in-out text-left">
                          {step.description}
                        </p>
                      )}
                    </div>
                  </div>
                  {index < 4 && (
                    <div 
                      onClick={() => setActiveStep(index + 1)}
                      className="hidden md:flex items-center justify-center w-6 cursor-pointer hover:text-primary-accent transition-colors"
                      style={{ marginTop: '32px' }}
                    >
                      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-section-mobile md:py-section bg-surface">
        <div className="container">
          <SectionHeader label="EVIDENCE" title={t("Wissenschaftliche Fundierung", "Scientific Grounding")} />
          
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <ProofCard title={t("Implizite Assoziationen", "Implicit Associations")} field="Neuromarketing" result={t("Implizite Messverfahren (IAT, fMRI) zeigen, dass unbewusste Assoziationen Kaufentscheidungen stärker beeinflussen als bewusste Präferenzen.", "Implicit measurement methods (IAT, fMRI) show that unconscious associations influence purchase decisions more strongly than conscious preferences.")} relevance={t("Begründet unsere Fokussierung auf implizite Verfahren.", "Underpins our focus on implicit methods.")} />
            <ProofCard title={t("Emotionale Konditionierung", "Emotional Conditioning")} field={t("Verhaltenspsychologie", "Behavioral Psychology")} result={t("Wiederholte emotionale Reize schaffen neuronale Pfade, die automatische Entscheidungen steuern.", "Repeated emotional stimuli create neural pathways that drive automatic decisions.")} relevance={t("Erklärt die Wirksamkeit von konsistenten Brand-Touchpoints.", "Explains the effectiveness of consistent brand touchpoints.")} />
            <ProofCard title={t("Aufmerksamkeit und Verarbeitung", "Attention and Processing")} field={t("Kognitive Neurowissenschaft", "Cognitive Neuroscience")} result={t("Visuelle Reize werden innerhalb von Millisekunden gefiltert; nur emotional relevante Informationen erreichen das bewusste Bewusstsein.", "Visual stimuli are filtered within milliseconds; only emotionally relevant information reaches conscious awareness.")} relevance={t("Validiert unsere Ansätze für visuelle Kommunikation.", "Validates our approaches to visual communication.")} />
          </div>
        </div>
      </section>

      <section className="py-section-mobile md:py-section bg-white">
        <div className="container">
          <SectionHeader label="RECOGNITION" title={t("Auszeichnungen und Kooperationen", "Awards and Collaborations")} />
          
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <div className="border border-border bg-surface p-6 rounded-card hover:border-primary-accent hover:shadow-lg hover:shadow-primary-accent/10 transition-all duration-300 hover:-translate-y-1"><h3 className="text-lg font-semibold text-text-primary mb-4">Jugend forscht</h3><p className="text-text-secondary">{t("Auszeichnung für neurowissenschaftliches Forschungsprojekt.", "Award for a neuroscientific research project.")}</p></div>
            <div className="border border-border bg-surface p-6 rounded-card hover:border-primary-accent hover:shadow-lg hover:shadow-primary-accent/10 transition-all duration-300 hover:-translate-y-1"><h3 className="text-lg font-semibold text-text-primary mb-4">Young Founders / JugendUnternimmt</h3><p className="text-text-secondary">{t("Programm für junge Gründer und Unternehmer.", "Program for young founders and entrepreneurs.")}</p></div>
            <div className="border border-border bg-surface p-6 rounded-card hover:border-primary-accent hover:shadow-lg hover:shadow-primary-accent/10 transition-all duration-300 hover:-translate-y-1"><h3 className="text-lg font-semibold text-text-primary mb-4">STARTERiN Award</h3><p className="text-text-secondary">{t("Nominierung für innovatives Gründungskonzept.", "Nomination for an innovative founding concept.")}</p></div>
            <div className="border border-border bg-surface p-6 rounded-card hover:border-primary-accent hover:shadow-lg hover:shadow-primary-accent/10 transition-all duration-300 hover:-translate-y-1"><h3 className="text-lg font-semibold text-text-primary mb-4">{t("EEG-Kooperationen", "EEG Collaborations")}</h3><p className="text-text-secondary">{t("Wissenschaftliche Zusammenarbeit und Testungen im Neurolabor.", "Scientific collaboration and testing in the neuro lab.")}</p></div>
          </div>
        </div>
      </section>

      <section className="bg-surface">
        <div className="container py-section-mobile md:py-section">
          <SectionHeader label="CONTACT" title={t("Bereit für wissenschaftlich fundiertes Wachstum?", "Ready for scientifically grounded growth?")} />
          <div className="mt-12"><CTABlock primary={{ text: t("Gespräch buchen", "Book a call"), href: "/kontakt" }} /></div>
        </div>
      </section>
    </div>
  );
}
