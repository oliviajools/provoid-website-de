"use client";

import { useState } from "react";
import React from "react";
import Image from "next/image";
import { SectionHeader } from "@/components/SectionHeader";
import { CTABlock } from "@/components/ui/CTABlock";
import { ProofCard } from "@/components/ui/ProofCard";

export default function Company() {
  const [activeStep, setActiveStep] = useState<number | null>(0);
  return (
    <div className="flex flex-col">
      <section className="relative py-section-mobile md:py-section bg-surface overflow-hidden">
        <div className="container relative z-10">
          <div className="max-w-4xl flex items-start justify-between gap-8">
            <div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-text-primary mb-6">
                ENTSCHEIDUNGEN VERSTEHEN - WACHSTUM STEUERN.
              </h1>
              <p className="text-lg md:text-xl text-text-secondary mb-8 max-w-3xl">
                Wir helfen Unternehmen, Verhalten, Motivation und Kaufentscheidungen wissenschaftlich zu verstehen und daraus klare Strategien für Marketing, Kommunikation und Teams abzuleiten.
              </p>
              <CTABlock primary={{ text: "Erstgespräch buchen", href: "/kontakt" }} secondary={{ text: "Leistungen ansehen", href: "#services" }} />
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

      <section id="services" className="py-section-mobile md:py-section bg-white">
        <div className="container">
          <SectionHeader label="PRODUKTE" title="Unser Angebot für Unternehmen" />
          
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <div className="border border-border bg-black p-8 rounded-card hover:border-primary-accent hover:shadow-lg hover:shadow-primary-accent/10 transition-all duration-300 hover:-translate-y-1">
              <h3 className="text-xl font-semibold text-white mb-4">Seminar: Neuroscience & Neuromarketing</h3>
              <p className="text-sm text-gray-300 mb-4">Kompakte Einführung in Neuromarketing & Consumer Neuroscience</p>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3"><span className="text-primary-accent mt-1">•</span><span className="text-gray-300">Bessere Kunden- und Kaufprozess-Insights</span></div>
                <div className="flex items-start gap-3"><span className="text-primary-accent mt-1">•</span><span className="text-gray-300">Neue Perspektiven für Entwicklung & Marketing</span></div>
                <div className="flex items-start gap-3"><span className="text-primary-accent mt-1">•</span><span className="text-gray-300">Wissenschaftliches Fundament für Strategien</span></div>
              </div>
            </div>

            <div className="border border-border bg-black p-8 rounded-card hover:border-primary-accent hover:shadow-lg hover:shadow-primary-accent/10 transition-all duration-300 hover:-translate-y-1">
              <h3 className="text-xl font-semibold text-white mb-4">Workshop: Branchenspezifisch & Hands-On</h3>
              <p className="text-sm text-gray-300 mb-4">Maßgeschneidertes Format mit klaren Strategien und konkreten Umsetzungs-Sprints</p>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3"><span className="text-primary-accent mt-1">•</span><span className="text-gray-300">Für Branding, Marketing, Produktentwicklung und Produktdesign</span></div>
                <div className="flex items-start gap-3"><span className="text-primary-accent mt-1">•</span><span className="text-gray-300">Konkrete Entscheidungen und Umsetzungen direkt anstoßen</span></div>
                <div className="flex items-start gap-3"><span className="text-primary-accent mt-1">•</span><span className="text-gray-300">Praktische Anwendung statt nur Wissen</span></div>
              </div>
            </div>

            <div className="border border-border bg-black p-8 rounded-card hover:border-primary-accent hover:shadow-lg hover:shadow-primary-accent/10 transition-all duration-300 hover:-translate-y-1">
              <h3 className="text-xl font-semibold text-white mb-4">EEG-Produktevaluation & Analyse</h3>
              <p className="text-sm text-gray-300 mb-4">Testung der neuronalen Wirkung von Produkten inkl. Interpretation & Handlungsempfehlungen</p>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3"><span className="text-primary-accent mt-1">•</span><span className="text-gray-300">EEG-Testung (optional ergänzend fMRI)</span></div>
                <div className="flex items-start gap-3"><span className="text-primary-accent mt-1">•</span><span className="text-gray-300">Datenbasierte Entscheidungen im Produktdesign</span></div>
                <div className="flex items-start gap-3"><span className="text-primary-accent mt-1">•</span><span className="text-gray-300">Besonders bei high-stakes Entscheidungen (Positionierung, Design)</span></div>
              </div>
            </div>

            <div className="border border-primary-accent bg-black p-8 rounded-card hover:border-primary-accent hover:shadow-lg hover:shadow-primary-accent/10 transition-all duration-300 hover:-translate-y-1">
              <h3 className="text-xl font-semibold text-white mb-4">Begleitende Produktentwicklung</h3>
              <p className="text-sm text-gray-300 mb-4">Kontinuierliche Begleitung von der Idee bis zur Umsetzung</p>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3"><span className="text-primary-accent mt-1">•</span><span className="text-gray-300">Neurowissenschaftliche Perspektive und Feedback-Loops</span></div>
                <div className="flex items-start gap-3"><span className="text-primary-accent mt-1">•</span><span className="text-gray-300">Priorisierung für bessere Produkt- und Marketingentscheidungen</span></div>
                <div className="flex items-start gap-3"><span className="text-primary-accent mt-1">•</span><span className="text-gray-300">Schnell lernen, iterieren und messbar bessere Entscheidungen treffen</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-section-mobile md:py-section bg-white">
        <div className="container">
          <SectionHeader label="THE PROBLEM" title="Die meisten Strategien beginnen zu spät." description="Viele Unternehmen verlassen sich auf Umfragen, Annahmen oder oberflächliche Daten. Doch Entscheidungen entstehen oft, bevor Menschen sie bewusst erklären können." />
          
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <div className="border border-border bg-surface p-8 rounded-card hover:border-primary-accent hover:shadow-lg hover:shadow-primary-accent/10 transition-all duration-300 hover:-translate-y-1">
              <h3 className="text-lg font-semibold text-text-primary mb-6">Ohne PROVOID</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3"><span className="text-text-muted mt-1">•</span><span className="text-text-secondary">Annahmen statt Mechanismen</span></li>
                <li className="flex items-start gap-3"><span className="text-text-muted mt-1">•</span><span className="text-text-secondary">Zielgruppen ohne psychologische Tiefe</span></li>
                <li className="flex items-start gap-3"><span className="text-text-muted mt-1">•</span><span className="text-text-secondary">Kommunikation ohne neuronale Relevanz</span></li>
                <li className="flex items-start gap-3"><span className="text-text-muted mt-1">•</span><span className="text-text-secondary">Conversion-Potenzial bleibt ungenutzt</span></li>
              </ul>
            </div>

            <div className="border border-primary-accent bg-surface p-8 rounded-card hover:border-primary-accent hover:shadow-lg hover:shadow-primary-accent/10 transition-all duration-300 hover:-translate-y-1">
              <h3 className="text-lg font-semibold text-text-primary mb-6">Mit PROVOID</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3"><span className="text-primary-accent mt-1">+</span><span className="text-text-secondary">Verhalten besser verstehen</span></li>
                <li className="flex items-start gap-3"><span className="text-primary-accent mt-1">+</span><span className="text-text-secondary">Kaufmotive präzisieren</span></li>
                <li className="flex items-start gap-3"><span className="text-primary-accent mt-1">+</span><span className="text-text-secondary">Touchpoints gehirngerecht optimieren</span></li>
                <li className="flex items-start gap-3"><span className="text-primary-accent mt-1">+</span><span className="text-text-secondary">Entscheidungen messbarer machen</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="py-section-mobile md:py-section bg-surface">
        <div className="container">
          <SectionHeader label="SERVICES" title="Von Analyse zu Anwendung." />
          
          <div className="mt-12 space-y-8">
            <div className="border border-border bg-black p-4 rounded-card hover:border-primary-accent hover:shadow-lg hover:shadow-primary-accent/10 transition-all duration-300 hover:-translate-y-1 group">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <span className="text-sm font-semibold uppercase tracking-wider text-gray-400 group-hover:text-primary-accent transition-colors">01</span>
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-primary-accent transition-colors">Diagnose</h4>
                  <p className="text-sm text-gray-300">Analyse von Zielgruppe, Kommunikation, Entscheidungswegen und psychologischen Triggern.</p>
                </div>
              </div>
            </div>
            <div className="border border-border bg-black p-4 rounded-card hover:border-primary-accent hover:shadow-lg hover:shadow-primary-accent/10 transition-all duration-300 hover:-translate-y-1 group">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <span className="text-sm font-semibold uppercase tracking-wider text-gray-400 group-hover:text-primary-accent transition-colors">02</span>
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-primary-accent transition-colors">Neuro-Strategie</h4>
                  <p className="text-sm text-gray-300">Ableitung konkreter Hypothesen, Botschaften, Touchpoints und Maßnahmen.</p>
                </div>
              </div>
            </div>
            <div className="border border-border bg-black p-4 rounded-card hover:border-primary-accent hover:shadow-lg hover:shadow-primary-accent/10 transition-all duration-300 hover:-translate-y-1 group">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <span className="text-sm font-semibold uppercase tracking-wider text-gray-400 group-hover:text-primary-accent transition-colors">03</span>
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-primary-accent transition-colors">Umsetzung</h4>
                  <p className="text-sm text-gray-300">Workshops, Kampagnenlogik, Teamformate, Tool-Integration.</p>
                </div>
              </div>
            </div>
            <div className="border border-border bg-black p-4 rounded-card hover:border-primary-accent hover:shadow-lg hover:shadow-primary-accent/10 transition-all duration-300 hover:-translate-y-1 group">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <span className="text-sm font-semibold uppercase tracking-wider text-gray-400 group-hover:text-primary-accent transition-colors">04</span>
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-primary-accent transition-colors">Evaluation</h4>
                  <p className="text-sm text-gray-300">Messung, Feedback, Optimierung, Weiterentwicklung.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-section-mobile md:py-section bg-white">
        <div className="container">
          <SectionHeader label="CLIENT JOURNEY" title="Wie Wir Sie unterstützen." />
          
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
                { number: "01", title: "Ausgangslage", description: "Ein mittelständisches Unternehmen im B2C-Bereich kämpft mit stagnierenden Conversion-Raten trotz intensiver Marketingaktivitäten." },
                { number: "02", title: "Herausforderung", description: "Kunden wandern im Checkout-Prozess ab und es besteht Unklarheit über die tatsächlichen Kaufmotive." },
                { number: "03", title: "Analyse", description: "Eine neurowissenschaftliche Analyse der Entscheidungspunkte identifiziert implizite Barrieren und Trigger." },
                { number: "04", title: "Umsetzung", description: "Die Optimierung der Touchpoints basiert auf neuronalen Prinzipien und die Kommunikation wird an emotionale Entscheidungswege angepasst." },
                { number: "05", title: "Ergebnis", description: "Es zeigt sich eine messbare Verbesserung der Conversion-Rate, eine höhere Kundenbindung und ein klareres Verständnis der Zielgruppenpsychologie." }
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
                { number: "01", title: "Ausgangslage", description: "Ein mittelständisches Unternehmen im B2C-Bereich kämpft mit stagnierenden Conversion-Raten trotz intensiver Marketingaktivitäten." },
                { number: "02", title: "Herausforderung", description: "Kunden wandern im Checkout-Prozess ab und es besteht Unklarheit über die tatsächlichen Kaufmotive." },
                { number: "03", title: "Analyse", description: "Eine neurowissenschaftliche Analyse der Entscheidungspunkte identifiziert implizite Barrieren und Trigger." },
                { number: "04", title: "Umsetzung", description: "Die Optimierung der Touchpoints basiert auf neuronalen Prinzipien und die Kommunikation wird an emotionale Entscheidungswege angepasst." },
                { number: "05", title: "Ergebnis", description: "Es zeigt sich eine messbare Verbesserung der Conversion-Rate, eine höhere Kundenbindung und ein klareres Verständnis der Zielgruppenpsychologie." }
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
                      <div className="text-4xl font-bold text-gray-400 mb-2 transition-colors duration-500 ease-in-out" style={{ color: activeStep === index ? '#3DB8DE' : '' }}>
                        {step.number}
                      </div>
                      <h4 className="text-lg font-semibold text-white mb-2 transition-colors duration-500 ease-in-out" style={{ color: activeStep === index ? '#3DB8DE' : '' }}>
                        {step.title}
                      </h4>
                      {activeStep === index && (
                        <p className="text-xs text-white mt-3 transition-all duration-500 ease-in-out text-center">
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
          <SectionHeader label="EVIDENCE" title="Wissenschaftliche Fundierung" />
          
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <ProofCard title="Implizite Assoziationen" field="Neuromarketing" result="Implizite Messverfahren (IAT, fMRI) zeigen, dass unbewusste Assoziationen Kaufentscheidungen stärker beeinflussen als bewusste Präferenzen." relevance="Begründet unsere Fokussierung auf implizite Verfahren." />
            <ProofCard title="Emotionale Konditionierung" field="Verhaltenspsychologie" result="Wiederholte emotionale Reize schaffen neuronale Pfade, die automatische Entscheidungen steuern." relevance="Erklärt die Wirksamkeit von konsistenten Brand-Touchpoints." />
            <ProofCard title="Aufmerksamkeit und Verarbeitung" field="Kognitive Neurowissenschaft" result="Visuelle Reize werden innerhalb von Millisekunden gefiltert; nur emotional relevante Informationen erreichen das bewusste Bewusstsein." relevance="Validiert unsere Ansätze für visuelle Kommunikation." />
          </div>
        </div>
      </section>

      <section className="py-section-mobile md:py-section bg-white">
        <div className="container">
          <SectionHeader label="RECOGNITION" title="Auszeichnungen und Kooperationen" />
          
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <div className="border border-border bg-surface p-6 rounded-card hover:border-primary-accent hover:shadow-lg hover:shadow-primary-accent/10 transition-all duration-300 hover:-translate-y-1"><h3 className="text-lg font-semibold text-text-primary mb-4">Jugend forscht</h3><p className="text-text-secondary">Auszeichnung für neurowissenschaftliches Forschungsprojekt.</p></div>
            <div className="border border-border bg-surface p-6 rounded-card hover:border-primary-accent hover:shadow-lg hover:shadow-primary-accent/10 transition-all duration-300 hover:-translate-y-1"><h3 className="text-lg font-semibold text-text-primary mb-4">Young Founders / JugendUnternimmt</h3><p className="text-text-secondary">Programm für junge Gründer und Unternehmer.</p></div>
            <div className="border border-border bg-surface p-6 rounded-card hover:border-primary-accent hover:shadow-lg hover:shadow-primary-accent/10 transition-all duration-300 hover:-translate-y-1"><h3 className="text-lg font-semibold text-text-primary mb-4">STARTERiN Award</h3><p className="text-text-secondary">Nominierung für innovatives Gründungskonzept.</p></div>
            <div className="border border-border bg-surface p-6 rounded-card hover:border-primary-accent hover:shadow-lg hover:shadow-primary-accent/10 transition-all duration-300 hover:-translate-y-1"><h3 className="text-lg font-semibold text-text-primary mb-4">EEG-Kooperationen</h3><p className="text-text-secondary">Wissenschaftliche Zusammenarbeit und Testungen im Neurolabor.</p></div>
          </div>
        </div>
      </section>

      <section className="bg-surface">
        <div className="container py-section-mobile md:py-section">
          <SectionHeader label="CONTACT" title="Bereit für wissenschaftlich fundiertes Wachstum?" />
          <div className="mt-12"><CTABlock primary={{ text: "Company-Gespräch buchen", href: "/kontakt" }} /></div>
        </div>
      </section>
    </div>
  );
}
