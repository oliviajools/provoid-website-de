"use client";

import { useState } from "react";
import Image from "next/image";
import { SectionHeader } from "@/components/SectionHeader";
import { CTABlock } from "@/components/ui/CTABlock";
import { ProofCard } from "@/components/ui/ProofCard";
import { ProductCard } from "@/components/ui/ProductCard";
import { ProcessStep } from "@/components/ui/ProcessStep";
import { BlogCard } from "@/components/ui/BlogCard";
import { FAQSection } from "@/components/ui/FAQSection";
import { blogPosts } from "@/lib/blog-posts";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function Home() {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const [activeStep, setActiveStep] = useState<number | null>(0);
  const { t } = useLanguage();
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
                {t("PROVOID übersetzt neurowissenschaftliche Forschung in klare, anwendbare Systeme für bessere Entscheidungen, stärkere Performance und messbare Entwicklung.", "PROVOID translates neuroscientific research into clear, applicable systems for better decisions, stronger performance, and measurable development.")}
              </p>
              <div className="text-2xl md:text-3xl font-semibold tracking-tight text-primary-accent mb-8">
                {t("VERSTEHEN. MESSEN. VERÄNDERN.", "UNDERSTAND. MEASURE. TRANSFORM.")}
              </div>
              <CTABlock
                primary={{ text: t("Gespräch buchen", "Book a call"), href: "/kontakt" }}
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
          <SectionHeader label="WHAT WE DO" title={t("Zwei Leistungsfelder", "Two Fields of Expertise")} />
          
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <div className="border border-border bg-white p-6 rounded-card hover:border-primary-accent hover:shadow-lg hover:shadow-primary-accent/10 transition-all duration-300 hover:-translate-y-1">
              <h3 className="text-2xl font-semibold text-text-primary mb-4">Neuromarketing</h3>
              <p className="text-sm text-text-muted mb-6">{t("Für Unternehmen & Marken", "For companies & brands")}</p>
              <div className="space-y-4 text-sm">
                <div>
                  <p className="font-semibold text-text-primary mb-2">{t("Angebote", "Offerings")}</p>
                  <p className="text-text-secondary">{t("Seminare, Workshops, Beratung und langfristige Partnerschaften", "Seminars, workshops, consulting and long-term partnerships")}</p>
                </div>
                <div>
                  <p className="font-semibold text-text-primary mb-2">{t("Optimierung", "Optimization")}</p>
                  <p className="text-text-secondary">{t("Produkte und Websites neurologisch optimal erfassbar gestalten", "Designing products and websites to be neurologically optimally perceivable")}</p>
                </div>
                <div>
                  <p className="font-semibold text-text-primary mb-2">{t("Design & Umsetzung", "Design & Implementation")}</p>
                  <p className="text-text-secondary">{t("Unterstützung bei Produktdesign und -Umsetzung bei Bedarf", "Support with product design and implementation as needed")}</p>
                </div>
              </div>
            </div>

            <div className="border border-primary-accent/50 bg-white p-6 rounded-card hover:border-primary-accent hover:shadow-lg hover:shadow-primary-accent/10 transition-all duration-300 hover:-translate-y-1">
              <h3 className="text-2xl font-semibold text-text-primary mb-4">Neuroathletik</h3>
              <p className="text-sm text-text-muted mb-6">{t("Für Sportvereine & Athlet:innen", "For sports clubs & athletes")}</p>
              <div className="space-y-4 text-sm">
                <div>
                  <p className="font-semibold text-text-primary mb-2">{t("Saisonprogramme", "Season Programs")}</p>
                  <p className="text-text-secondary">{t("Neuro-Edukation, Neurotrainingssessions und individuelle Betreuung bei Bedarf", "Neuro-education, neuro-training sessions and individual support as needed")}</p>
                </div>
                <div>
                  <p className="font-semibold text-text-primary mb-2">{t("Einzelsportler:innen", "Individual Athletes")}</p>
                  <p className="text-text-secondary">{t("Arbeit im Leistungsbereich auf Anfrage möglich", "Performance-level work available on request")}</p>
                </div>
                <div>
                  <p className="font-semibold text-text-primary mb-2">{t("Digitaler Zugang", "Digital Access")}</p>
                  <p className="text-text-secondary">{t("Zugang zur PROVOID App für Training und Tracking", "Access to the PROVOID App for training and tracking")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-section-mobile md:py-section bg-surface bg-primary-accent/10">
        <div className="container">
          <SectionHeader
            label="WHO WE ARE"
            title={
            <div className="leading-tight">
              {t("Wissenschaftlich fundiert.", "Scientifically grounded.")}<br />
              {t("Unternehmerisch gedacht.", "Entrepreneurially minded.")}<br />
              {t("Praktisch angewandt.", "Practically applied.")}
            </div>
          }
            description={t("PROVOID verbindet Neurowissenschaft, Verhaltenspsychologie und angewandte Performance-Strategien. Wir machen sichtbar, was Entscheidungen, Motivation und Verhalten wirklich beeinflusst, in Unternehmen, Teams und im Leistungssport.", "PROVOID combines neuroscience, behavioral psychology and applied performance strategies. We make visible what truly drives decisions, motivation and behavior in companies, teams and competitive sport.")}
          />
        </div>
      </section>

      <section className="py-section-mobile md:py-section bg-white border-t border-primary-accent/10">
        <div className="container">
          <SectionHeader label="SOLUTIONS" title={t("Unsere Lösung für Ihre Herausforderung.", "Our solution for your challenge.")} />
          
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <ProductCard title="PROVOID Company" description={t("Für Unternehmen, Marken und Teams.", "For companies, brands and teams.")} cta={t("Company ansehen", "View Company")} href="/company" accent={false} />
            <ProductCard title="PROVOID Sports" description={t("Für Vereine, Athlet:innen und Trainerteams.", "For clubs, athletes and coaching teams.")} cta={t("Sports ansehen", "View Sports")} href="/sports" accent={false} />
          </div>
        </div>
      </section>

      <section className="py-section-mobile md:py-section bg-surface">
        <div className="container">
          <SectionHeader label="PROOF" title={t("Evidenz über Meinung.", "Evidence over opinion.")} />
          
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div 
              className={`border bg-surface p-6 rounded-card transition-all duration-300 cursor-pointer ${
                expandedCard === 0 
                  ? 'border-primary-accent shadow-lg scale-105' 
                  : 'border-border hover:border-border2 hover:shadow-md'
              }`}
              onClick={() => setExpandedCard(expandedCard === 0 ? null : 0)}
            >
              <p className="text-sm font-semibold uppercase tracking-wider text-text-muted mb-2">{t("Entscheidungspsychologie", "Decision Psychology")}</p>
              <h3 className="text-lg font-semibold text-text-primary mb-3">{t("Unbewusste Entscheidungsprozesse", "Unconscious Decision Processes")}</h3>
              <p className={`text-sm text-text-secondary transition-all duration-300 ${expandedCard === 0 ? '' : 'line-clamp-2'}`}>
                {t("Studien zeigen, dass 95% der Kaufentscheidungen unbewusst getroffen werden, bevor sie bewusst erklärt werden können.", "Studies show that 95% of purchase decisions are made unconsciously before they can be consciously explained.")}
              </p>
              <div className={`mt-4 transition-all duration-300 ${expandedCard === 0 ? 'opacity-100 max-h-20' : 'opacity-0 max-h-0 overflow-hidden'}`}>
                <p className="text-sm text-text-muted italic">{t("Begründet unseren Fokus auf implizite Messverfahren. (Gerald Zaltman, Harvard Business School)", "Underpins our focus on implicit measurement methods. (Gerald Zaltman, Harvard Business School)")}</p>
              </div>
              <div className="mt-4 flex items-center text-sm text-primary-accent">
                <span>{expandedCard === 0 ? t('Weniger anzeigen', 'Show less') : t('Mehr erfahren', 'Learn more')}</span>
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
              <p className="text-sm font-semibold uppercase tracking-wider text-text-muted mb-2">{t("Neurowissenschaft", "Neuroscience")}</p>
              <h3 className="text-lg font-semibold text-text-primary mb-3">{t("Emotion und Belohnungssystem", "Emotion and Reward System")}</h3>
              <p className={`text-sm text-text-secondary transition-all duration-300 ${expandedCard === 1 ? '' : 'line-clamp-2'}`}>
                {t("Das Belohnungssystem im Gehirn reagiert stärker auf die Antizipation als auf tatsächliche Belohnung.", "The brain's reward system responds more strongly to anticipation than to actual reward.")}
              </p>
              <div className={`mt-4 transition-all duration-300 ${expandedCard === 1 ? 'opacity-100 max-h-20' : 'opacity-0 max-h-0 overflow-hidden'}`}>
                <p className="text-sm text-text-muted italic">{t("Erklärt, warum Vorfreude und Erwartung stärker wirken als reine Incentives. (Knutson et al., 2001)", "Explains why anticipation and expectation have a stronger effect than pure incentives. (Knutson et al., 2001)")}</p>
              </div>
              <div className="mt-4 flex items-center text-sm text-primary-accent">
                <span>{expandedCard === 1 ? t('Weniger anzeigen', 'Show less') : t('Mehr erfahren', 'Learn more')}</span>
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
              <p className="text-sm font-semibold uppercase tracking-wider text-text-muted mb-2">{t("Sportpsychologie", "Sports Psychology")}</p>
              <h3 className="text-lg font-semibold text-text-primary mb-3">{t("Neurofeedback im Sport", "Neurofeedback in Sports")}</h3>
              <p className={`text-sm text-text-secondary transition-all duration-300 ${expandedCard === 2 ? '' : 'line-clamp-2'}`}>
                {t("Neurofeedback-Training kann die Fokusfähigkeit und Stressregulation bei Athleten signifikant verbessern.", "Neurofeedback training can significantly improve focus ability and stress regulation in athletes.")}
              </p>
              <div className={`mt-4 transition-all duration-300 ${expandedCard === 2 ? 'opacity-100 max-h-20' : 'opacity-0 max-h-0 overflow-hidden'}`}>
                <p className="text-sm text-text-muted italic">{t("Validiert unseren Ansatz für digitale mentale Trainings. (Gruzelier, 2014)", "Validates our approach to digital mental training. (Gruzelier, 2014)")}</p>
              </div>
              <div className="mt-4 flex items-center text-sm text-primary-accent">
                <span>{expandedCard === 2 ? t('Weniger anzeigen', 'Show less') : t('Mehr erfahren', 'Learn more')}</span>
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
          <SectionHeader label="DECISION JOURNEY" title={t("Die Reise einer Kaufentscheidung", "The Journey of a Purchase Decision")} />
          
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
                { number: "01", title: t("Wahrnehmung", "Perception"), description: t("Erster Kontakt mit Marke oder Produkt, oft unbewusst und durch Muster gesteuert. (~50-100ms, visueller Kortex)", "First contact with brand or product, often unconscious and pattern-driven. (~50-100ms, visual cortex)") },
                { number: "02", title: t("Emotion", "Emotion"), description: t("Gefühlhafte Reaktion, das limbische System bewertet, bevor der Verstand urteilt. (~100-300ms, Amygdala)", "Emotional reaction, the limbic system evaluates before the mind judges. (~100-300ms, amygdala)") },
                { number: "03", title: t("Bewertung", "Evaluation"), description: t("Rationale Begründung, der Verstand sucht nach Argumenten für die emotionale Entscheidung. (~300-500ms, präfrontaler Kortex)", "Rational justification, the mind seeks arguments for the emotional decision. (~300-500ms, prefrontal cortex)") },
                { number: "04", title: t("Aktivierung", "Activation"), description: t("Vorbereitung der Handlung, neuronale Pfade für die Entscheidung werden gestärkt. (~500-1000ms, motorischer Kortex)", "Preparation for action, neural pathways for the decision are strengthened. (~500-1000ms, motor cortex)") },
                { number: "05", title: t("Entscheidung", "Decision"), description: t("Der Moment der Wahl, oft als rational erlebt, aber emotional vorbereitet. (~1000-2000ms, Striatum)", "The moment of choice, often experienced as rational but emotionally prepared. (~1000-2000ms, striatum)") },
                { number: "06", title: t("Handlung", "Action"), description: t("Umsetzung, Kauf, Kontakt oder weitere Interaktion. (>2000ms, motorische Ausführung)", "Implementation, purchase, contact or further interaction. (>2000ms, motor execution)") }
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
                      {t(
                        ["Wahrnehmung", "Emotion", "Bewertung", "Aktivierung", "Entscheidung", "Handlung"][activeStep],
                        ["Perception", "Emotion", "Evaluation", "Activation", "Decision", "Action"][activeStep]
                      )}
                    </h4>
                    <p className="text-base text-text-secondary">
                      {t(
                        [
                          "Dies ist der erste Kontakt mit einer Marke oder einem Produkt, der oft unbewusst und durch Muster gesteuert erfolgt. (~50-100ms, visuelle Verarbeitung im Kortex)",
                          "Es entsteht eine gefühlhafte Reaktion, bei der das limbische System bewertet, bevor der Verstand urteilt. (~100-300ms, Amygdala-Aktivierung)",
                          "Es folgt eine rationale Begründung, bei der der Verstand nach Argumenten für die emotionale Entscheidung sucht. (~300-500ms, präfrontale Bewertung)",
                          "Es erfolgt die Vorbereitung der Handlung, bei der neuronale Pfade für die Entscheidung gestärkt werden. (~500-1000ms, motorische Planung)",
                          "Dies ist der Moment der Wahl, der oft als rational erlebt wird, aber emotional vorbereitet ist. (~1000-2000ms, Belohnungssystem im Striatum)",
                          "Es erfolgt die Umsetzung durch Kauf, Kontakt oder weitere Interaktion. (>2000ms, motorische Ausführung)"
                        ][activeStep],
                        [
                          "This is the first contact with a brand or product, often unconscious and driven by patterns. (~50-100ms, visual processing in the cortex)",
                          "An emotional reaction arises, where the limbic system evaluates before the mind judges. (~100-300ms, amygdala activation)",
                          "A rational justification follows, where the mind seeks arguments for the emotional decision. (~300-500ms, prefrontal evaluation)",
                          "Preparation for action occurs, strengthening the neural pathways for the decision. (~500-1000ms, motor planning)",
                          "This is the moment of choice, often experienced as rational but emotionally prepared. (~1000-2000ms, reward system in the striatum)",
                          "Implementation follows through purchase, contact or further interaction. (>2000ms, motor execution)"
                        ][activeStep]
                      )}
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
          <SectionHeader label="NEUROINSIGHT" title={t("Unsere Publikation", "Our Publication")} description={t("NeuroInsight ist unsere erste, eigene wissenschaftliche Publikation über die personalisierte Messbarkeit von Hirnwellen zur Performancesteigerung.", "NeuroInsight is our first proprietary scientific publication on the personalized measurability of brainwaves for performance enhancement.")} />
          
          <div className="mt-12 border border-border bg-white p-8 rounded-card hover:border-primary-accent hover:shadow-lg hover:shadow-primary-accent/10 transition-all duration-300 hover:-translate-y-1">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <h3 className="text-2xl font-semibold text-text-primary mb-2">NeuroInsight</h3>
                <p className="text-text-secondary">{t("Vol. 1, Ausgabe 1, Februar 2026", "Vol. 1, Issue 1, February 2026")}</p>
              </div>
              <CTABlock primary={{ text: t("Ausgabe ansehen", "View Issue"), href: "/NeuroInsight_Vol1_Issue1_202602.pdf" }} secondary={{ text: t("Weitere Insights", "More Insights"), href: "/insights" }} />
            </div>
          </div>
        </div>
      </section>

      <section className="py-section-mobile md:py-section bg-white border-t border-primary-accent/10">
        <div className="container">
          <SectionHeader label="INSIGHTS" title={t("Aktuelle Beiträge", "Latest Articles")} description={t("In unserem Blog erhalten Sie aktuelle Einblicke in die Welt der Neurowissenschaften und deren Anwendung in der Praxis.", "In our blog you'll find current insights into the world of neuroscience and its practical application.")} />
          
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
              {t("Alle Beiträge ansehen", "View all articles")}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      <FAQSection />

      <section className="py-section-mobile md:py-section bg-surface bg-primary-accent/10">
        <div className="container">
          <SectionHeader label="CONTACT" title={t("Bereit für den nächsten Schritt?", "Ready for the next step?")} description={t(<>Ob Unternehmen, Sportorganisation oder Forschungskooperation -<br />der effektivste Weg zur Veränderung ist ein persönliches Gespräch.</>, <>Whether company, sports organization or research partnership -<br />the most effective path to change is a personal conversation.</>)} />
          
          <div className="mt-12">
            <CTABlock primary={{ text: t("Gespräch buchen", "Book a call"), href: "/kontakt" }} secondary={{ text: t("E-Mail schreiben", "Send an email"), href: "mailto:olivia@provoid.de" }} />
          </div>
        </div>
      </section>
    </div>
  );
}
