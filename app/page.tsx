"use client";

import { useState } from "react";
import Image from "next/image";
import { SectionHeader } from "@/components/SectionHeader";
import { CTABlock } from "@/components/ui/CTABlock";
import { ProofCard } from "@/components/ui/ProofCard";
import { ProductCard } from "@/components/ui/ProductCard";
import { ProcessStep } from "@/components/ui/ProcessStep";
import { BlogCard } from "@/components/ui/BlogCard";
import { blogPosts } from "@/lib/blog-posts";

export default function Home() {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const [activeStep, setActiveStep] = useState<number | null>(0);
  return (
    <div className="flex flex-col">
      <section className="relative py-section-mobile md:py-section bg-surface overflow-hidden">
        <div className="container relative z-10">
          <div className="max-w-4xl flex items-start justify-between gap-8">
            <div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-text-primary mb-6">
                NEUROSCIENCE FOR PERFORMANCE.
              </h1>
              <p className="text-lg md:text-xl text-text-secondary mb-8 max-w-3xl">
                PROVOID übersetzt neurowissenschaftliche Forschung in klare, anwendbare Systeme für bessere Entscheidungen, stärkere Performance und messbare Entwicklung.
              </p>
              <div className="text-2xl md:text-3xl font-semibold tracking-tight text-primary-accent mb-8">
                VERSTEHEN. MESSEN. VERÄNDERN.
              </div>
              <CTABlock
                primary={{ text: "Gespräch buchen", href: "/kontakt" }}
              />
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

      <section className="py-section-mobile md:py-section bg-white border-t border-primary-accent/10">
        <div className="container">
          <SectionHeader
            label="WHO WE ARE"
            title={
            <div className="leading-tight">
              Wissenschaftlich fundiert.<br />
              Unternehmerisch gedacht.<br />
              Praktisch angewandt.
            </div>
          }
            description="PROVOID verbindet Neurowissenschaft, Verhaltenspsychologie und angewandte Performance-Strategien. Wir machen sichtbar, was Entscheidungen, Motivation und Verhalten wirklich beeinflusst, in Unternehmen, Teams und im Leistungssport."
          />
        </div>
      </section>

      <section className="py-section-mobile md:py-section bg-surface bg-primary-accent/10">
        <div className="container">
          <SectionHeader label="WHAT WE DO" title="Zwei Leistungsfelder" />
          
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <div className="border border-border bg-white p-6 rounded-card hover:border-primary-accent hover:shadow-lg hover:shadow-primary-accent/10 transition-all duration-300 hover:-translate-y-1">
              <h3 className="text-2xl font-semibold text-text-primary mb-4">Neuromarketing</h3>
              <p className="text-sm text-text-muted mb-6">Für Unternehmen & Marken</p>
              <div className="space-y-4 text-sm">
                <div>
                  <p className="font-semibold text-text-primary mb-2">Angebote</p>
                  <p className="text-text-secondary">Seminare, Workshops, Beratung und langfristige Partnerschaften</p>
                </div>
                <div>
                  <p className="font-semibold text-text-primary mb-2">Optimierung</p>
                  <p className="text-text-secondary">Produkte und Websites neurologisch optimal erfassbar gestalten</p>
                </div>
                <div>
                  <p className="font-semibold text-text-primary mb-2">Design & Umsetzung</p>
                  <p className="text-text-secondary">Unterstützung bei Produktdesign und -Umsetzung bei Bedarf</p>
                </div>
              </div>
            </div>

            <div className="border border-primary-accent/50 bg-white p-6 rounded-card hover:border-primary-accent hover:shadow-lg hover:shadow-primary-accent/10 transition-all duration-300 hover:-translate-y-1">
              <h3 className="text-2xl font-semibold text-text-primary mb-4">Neuroathletik</h3>
              <p className="text-sm text-text-muted mb-6">Für Sportvereine & Athlet:innen</p>
              <div className="space-y-4 text-sm">
                <div>
                  <p className="font-semibold text-text-primary mb-2">Saisonprogramme</p>
                  <p className="text-text-secondary">Neuro-Edukation, Neurotrainingssessions und individuelle Betreuung bei Bedarf</p>
                </div>
                <div>
                  <p className="font-semibold text-text-primary mb-2">Einzelsportler:innen</p>
                  <p className="text-text-secondary">Arbeit im Leistungsbereich auf Anfrage möglich</p>
                </div>
                <div>
                  <p className="font-semibold text-text-primary mb-2">Digitaler Zugang</p>
                  <p className="text-text-secondary">Zugang zur PROVOID App für Training und Tracking</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-section-mobile md:py-section bg-white border-t border-primary-accent/10">
        <div className="container">
          <SectionHeader label="SOLUTIONS" title="Unsere Lösung für Ihre Herausforderung." />
          
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <ProductCard title="PROVOID Company" description="Für Unternehmen, Marken und Teams." cta="Company ansehen" href="/company" accent={false} />
            <ProductCard title="PROVOID Sports" description="Für Vereine, Athlet:innen und Trainerteams." cta="Sports ansehen" href="/sports" accent={false} />
          </div>
        </div>
      </section>

      <section className="py-section-mobile md:py-section bg-surface">
        <div className="container">
          <SectionHeader label="PROOF" title="Evidenz über Meinung." />
          
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div 
              className={`border bg-surface p-6 rounded-card transition-all duration-300 cursor-pointer ${
                expandedCard === 0 
                  ? 'border-primary-accent shadow-lg scale-105' 
                  : 'border-border hover:border-border2 hover:shadow-md'
              }`}
              onClick={() => setExpandedCard(expandedCard === 0 ? null : 0)}
            >
              <p className="text-sm font-semibold uppercase tracking-wider text-text-muted mb-2">Entscheidungspsychologie</p>
              <h3 className="text-lg font-semibold text-text-primary mb-3">Unbewusste Entscheidungsprozesse</h3>
              <p className={`text-sm text-text-secondary transition-all duration-300 ${expandedCard === 0 ? '' : 'line-clamp-2'}`}>
                Studien zeigen, dass 95% der Kaufentscheidungen unbewusst getroffen werden, bevor sie bewusst erklärt werden können.
              </p>
              <div className={`mt-4 transition-all duration-300 ${expandedCard === 0 ? 'opacity-100 max-h-20' : 'opacity-0 max-h-0 overflow-hidden'}`}>
                <p className="text-sm text-text-muted italic">Begründet unseren Fokus auf implizite Messverfahren.</p>
              </div>
              <div className="mt-4 flex items-center text-sm text-primary-accent">
                <span>{expandedCard === 0 ? 'Weniger anzeigen' : 'Mehr erfahren'}</span>
                <svg className={`w-4 h-4 ml-2 transition-transform duration-300 ${expandedCard === 0 ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            <div 
              className={`border bg-surface p-6 rounded-card transition-all duration-300 cursor-pointer ${
                expandedCard === 1 
                  ? 'border-primary-accent shadow-lg scale-105' 
                  : 'border-border hover:border-border2 hover:shadow-md'
              }`}
              onClick={() => setExpandedCard(expandedCard === 1 ? null : 1)}
            >
              <p className="text-sm font-semibold uppercase tracking-wider text-text-muted mb-2">Neurowissenschaft</p>
              <h3 className="text-lg font-semibold text-text-primary mb-3">Emotion und Belohnungssystem</h3>
              <p className={`text-sm text-text-secondary transition-all duration-300 ${expandedCard === 1 ? '' : 'line-clamp-2'}`}>
                Das Belohnungssystem im Gehirn reagiert stärker auf anticipation als auf tatsächliche Belohnung.
              </p>
              <div className={`mt-4 transition-all duration-300 ${expandedCard === 1 ? 'opacity-100 max-h-20' : 'opacity-0 max-h-0 overflow-hidden'}`}>
                <p className="text-sm text-text-muted italic">Erklärt, warum Vorfreude und Erwartung stärker wirken als reine Incentives.</p>
              </div>
              <div className="mt-4 flex items-center text-sm text-primary-accent">
                <span>{expandedCard === 1 ? 'Weniger anzeigen' : 'Mehr erfahren'}</span>
                <svg className={`w-4 h-4 ml-2 transition-transform duration-300 ${expandedCard === 1 ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            <div 
              className={`border bg-surface p-6 rounded-card transition-all duration-300 cursor-pointer ${
                expandedCard === 2 
                  ? 'border-primary-accent shadow-lg scale-105' 
                  : 'border-border hover:border-border2 hover:shadow-md'
              }`}
              onClick={() => setExpandedCard(expandedCard === 2 ? null : 2)}
            >
              <p className="text-sm font-semibold uppercase tracking-wider text-text-muted mb-2">Sportpsychologie</p>
              <h3 className="text-lg font-semibold text-text-primary mb-3">Neurofeedback im Sport</h3>
              <p className={`text-sm text-text-secondary transition-all duration-300 ${expandedCard === 2 ? '' : 'line-clamp-2'}`}>
                Neurofeedback-Training kann die Fokusfähigkeit und Stressregulation bei Athleten signifikant verbessern.
              </p>
              <div className={`mt-4 transition-all duration-300 ${expandedCard === 2 ? 'opacity-100 max-h-20' : 'opacity-0 max-h-0 overflow-hidden'}`}>
                <p className="text-sm text-text-muted italic">Validiert unseren Ansatz für digitale mentale Trainings.</p>
              </div>
              <div className="mt-4 flex items-center text-sm text-primary-accent">
                <span>{expandedCard === 2 ? 'Weniger anzeigen' : 'Mehr erfahren'}</span>
                <svg className={`w-4 h-4 ml-2 transition-transform duration-300 ${expandedCard === 2 ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-section-mobile md:py-section bg-white border-t border-primary-accent/10">
        <div className="container">
          <SectionHeader label="DECISION JOURNEY" title="Die Reise einer Kaufentscheidung" />
          
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
                { number: "01", title: "Wahrnehmung", description: "Erster Kontakt mit Marke oder Produkt, oft unbewusst und durch Muster gesteuert." },
                { number: "02", title: "Emotion", description: "Gefühlhafte Reaktion, das limbische System bewertet, bevor der Verstand urteilt." },
                { number: "03", title: "Bewertung", description: "Rationale Begründung, der Verstand sucht nach Argumenten für die emotionale Entscheidung." },
                { number: "04", title: "Aktivierung", description: "Vorbereitung der Handlung, neuronale Pfade für die Entscheidung werden gestärkt." },
                { number: "05", title: "Entscheidung", description: "Der Moment der Wahl, oft als rational erlebt, aber emotional vorbereitet." },
                { number: "06", title: "Handlung", description: "Umsetzung, Kauf, Kontakt oder weitere Interaktion." }
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
                onClick={() => setActiveStep(activeStep === null ? 0 : Math.min(5, activeStep + 1))}
                className="p-2 rounded-editorial bg-surface text-text-muted hover:bg-border2 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
                disabled={activeStep === null || activeStep === 5}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {activeStep !== null && (
              <div className="border border-border bg-surface p-6 rounded-card transition-all duration-300">
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0">
                    <span className="text-3xl font-bold text-primary-accent">
                      {activeStep + 1 < 10 ? `0${activeStep + 1}` : activeStep + 1}
                    </span>
                  </div>
                  <div className="flex-1 text-center">
                    <h4 className="text-xl font-semibold text-text-primary mb-3">
                      {[
                        "Wahrnehmung", "Emotion", "Bewertung", "Aktivierung", "Entscheidung", "Handlung"
                      ][activeStep]}
                    </h4>
                    <p className="text-base text-text-secondary">
                      {[
                        "Dies ist der erste Kontakt mit einer Marke oder einem Produkt, der oft unbewusst und durch Muster gesteuert erfolgt.",
                        "Es entsteht eine gefühlhafte Reaktion, bei der das limbische System bewertet, bevor der Verstand urteilt.",
                        "Es folgt eine rationale Begründung, bei der der Verstand nach Argumenten für die emotionale Entscheidung sucht.",
                        "Es erfolgt die Vorbereitung der Handlung, bei der neuronale Pfade für die Entscheidung gestärkt werden.",
                        "Dies ist der Moment der Wahl, der oft als rational erlebt wird, aber emotional vorbereitet ist.",
                        "Es erfolgt die Umsetzung durch Kauf, Kontakt oder weitere Interaktion."
                      ][activeStep]}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-section-mobile md:py-section bg-surface bg-primary-accent/10">
        <div className="container">
          <SectionHeader label="NEUROINSIGHT" title="Unsere Publikation" description="NeuroInsight ist unsere erste, eigene wissenschaftliche Publikation über die personalisierte Messbarkeit von Hirnwellen zur Performancesteigerung." />
          
          <div className="mt-12 border border-border bg-white p-8 rounded-card hover:border-primary-accent hover:shadow-lg hover:shadow-primary-accent/10 transition-all duration-300 hover:-translate-y-1">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <h3 className="text-2xl font-semibold text-text-primary mb-2">NeuroInsight</h3>
                <p className="text-text-secondary">Vol. 1, Ausgabe 1, Februar 2026</p>
              </div>
              <CTABlock primary={{ text: "Ausgabe ansehen", href: "/NeuroInsight_Vol1_Issue1_202602.pdf" }} secondary={{ text: "Weitere Insights", href: "/insights" }} />
            </div>
          </div>
        </div>
      </section>

      <section className="py-section-mobile md:py-section bg-white border-t border-primary-accent/10">
        <div className="container">
          <SectionHeader label="INSIGHTS" title="Aktuelle Beiträge" description="In unserem Blog erhalten Sie aktuelle Einblicke in die Welt der Neurowissenschaften und deren Anwendung in der Praxis." />
          
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {blogPosts.slice(0, 3).map((post) => (
              <BlogCard 
                key={post.id} 
                title={post.title}
                excerpt={post.excerpt}
                slug={post.id}
                date={post.date}
                tags={post.tags}
              />
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <a href="/insights" className="inline-flex items-center gap-2 text-sm font-medium text-primary-accent hover:text-primary-light transition-colors">
              Alle Beiträge ansehen
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      <section className="py-section-mobile md:py-section bg-surface bg-primary-accent/10">
        <div className="container">
          <SectionHeader label="CONTACT" title="Bereit für den nächsten Schritt?" description={<>Ob Unternehmen, Sportorganisation oder Forschungskooperation -<br />der effektivste Weg zur Veränderung ist ein persönliches Gespräch.</>} />
          
          <div className="mt-12">
            <CTABlock primary={{ text: "Gespräch buchen", href: "/kontakt" }} secondary={{ text: "E-Mail schreiben", href: "mailto:olivia@provoid.de" }} />
          </div>
        </div>
      </section>
    </div>
  );
}
