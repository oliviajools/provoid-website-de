"use client";

import { useState } from "react";
import Image from "next/image";
import { SectionHeader } from "@/components/SectionHeader";
import { CTABlock } from "@/components/ui/CTABlock";
import { EditorialQuote } from "@/components/ui/EditorialQuote";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function About() {
  const [showOliviaDetails, setShowOliviaDetails] = useState(false);
  const { t } = useLanguage();
  return (
    <div className="flex flex-col">
      <section className="relative py-8 md:py-12 bg-surface overflow-hidden">
        <div className="container relative z-10">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-text-primary mb-6">
              NO BRAIN. NO GAIN.
            </h1>
            <p className="text-lg md:text-xl text-text-secondary mb-8 max-w-3xl">
              {t("Wir sind PROVOID, jung, wissenschaftlich neugierig und überzeugt davon, dass bessere Entscheidungen dort beginnen, wo Verhalten wirklich entsteht: im Gehirn.", "We are PROVOID, young, scientifically curious and convinced that better decisions begin where behavior truly originates: in the brain.")}
            </p>
          </div>
        </div>
      </section>

      <section className="py-section-mobile md:py-section bg-white">
        <div className="container">
          <SectionHeader label="MOTTO" title={t("VERSTEHEN. HINTERFRAGEN. ANWENDEN.", "UNDERSTAND. QUESTION. APPLY.")} description={t("Wir übersetzen Komplexität in klare, praktische und direkt anwendbare Systeme.", "We translate complexity into clear, practical and directly applicable systems.")} />
          <EditorialQuote quote={t("Wissenschaft ist das Fundament für nachhaltigen Wandel.", "Science is the foundation for sustainable change.")} />
        </div>
      </section>

      <section className="py-section-mobile md:py-section bg-surface">
        <div className="container">
          <SectionHeader label="TEAM" title={t("Die Menschen hinter PROVOID", "The People Behind PROVOID")} />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            <div className="border border-border bg-white p-8 rounded-card hover:border-primary-accent hover:shadow-lg hover:shadow-primary-accent/10 transition-all duration-300 hover:-translate-y-1">
              <h3 className="text-xl font-semibold text-text-primary mb-2">Olivia</h3>
              <p className="text-sm text-text-muted mb-4">{t("Gründerin & CEO", "Founder & CEO")}</p>
              <p className="text-text-secondary mb-4">{t("Olivia gründete PROVOID Anfang 2025 während ihres Abiturs. Seit mehreren Jahren erforscht sie erfolgreich das Gehirn, unter anderem bei Wettbewerben wie Jugend forscht. Sie kombiniert seither Ihre Begeisterung für Wissenschaft mit unternehmerischem Denken sowie eigener Erfahrung aus Sport und Psychologie.", "Olivia founded PROVOID in early 2025 while finishing high school. For several years she has successfully researched the brain, including at competitions such as Jugend forscht. Since then she has combined her passion for science with entrepreneurial thinking and her own experience in sport and psychology.")}</p>
              
              <button
                onClick={() => setShowOliviaDetails(!showOliviaDetails)}
                className="flex items-center gap-2 text-sm font-medium text-primary-accent hover:text-primary-light transition-colors mb-4"
              >
                {showOliviaDetails ? t('Details ausblenden', 'Hide details') : t('Details anzeigen', 'Show details')}
                <svg className={`w-4 h-4 transition-transform ${showOliviaDetails ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {showOliviaDetails && (
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wider text-text-muted mb-2">{t("Biografie", "Biography")}</p>
                    <p className="text-sm text-text-secondary">{t("Mit 15 Jahren begann Olivia als Juniorstudentin Physik an der Universität Hamburg zu studieren und schloss ihr Juniorstudium in experimenteller und theoretischer Physik sowie Mathematik ab. Sie legte ihr Abitur mit einem Schnitt besser als 1.0 ab. Parallel forschte sie am Schülerforschungszentrum Hamburg an Projekten wie dem „A2C-System“ und „PROVOID“, mit dem sie den Landespreis bei Jugend forscht in der Kategorie Arbeitswelt gewann. Zudem absolvierte sie Praktika in der neurologischen Medizin und am Institut für Computational Neuroscience am UKE. Seit 2025 ist sie Gründerin des Startups PROVOID und als selbstständige IT-Expertin tätig.", "At 15, Olivia began studying physics as a junior student at the University of Hamburg and completed her junior studies in experimental and theoretical physics as well as mathematics. She graduated high school with a GPA better than 1.0. In parallel, she researched at the Hamburg Student Research Center on projects such as the \u201cA2C system\u201d and \u201cPROVOID\u201d, with which she won the state prize at Jugend forscht in the working world category. She also completed internships in neurological medicine and at the Institute for Computational Neuroscience at UKE. Since 2025 she has been the founder of the startup PROVOID and works as a self-employed IT expert.")}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wider text-text-muted mb-2">{t("Ausbildung & Zertifikate", "Education & Certificates")}</p>
                    <ul className="text-sm text-text-secondary space-y-1">
                      <li>• Harvard University - Fundamentals of Neuroscience</li>
                      <li>• University of Cambridge - Cognitive Psychology & Neuropsychology</li>
                      <li>• Copenhagen Business School - Consumer Neuromarketing</li>
                      <li>• {t("Juniorstudium Physik (B.Sc.)", "Junior studies in Physics (B.Sc.)")}</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wider text-text-muted mb-2">{t("Auszeichnungen", "Awards")}</p>
                    <ul className="text-sm text-text-secondary space-y-1">
                      <li>• {t("1. Landespreis Jugend forscht (Arbeitswelt)", "1st State Prize Jugend forscht (Working World)")}</li>
                      <li>• {t("2. Platz bundesweit Young-Founders Summer School", "2nd Place nationally, Young Founders Summer School")}</li>
                      <li>• STARTERiN Award Hamburg 2025 (Top 6)</li>
                      <li>• {t("Internationale Mathematik-Olympiade (Landesrunde)", "International Mathematical Olympiad (State Round)")}</li>
                    </ul>
                  </div>
                  <div>
                    <a href="/academicCV_05:26.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-primary-accent hover:text-primary-light transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      {t("Academic CV herunterladen", "Download Academic CV")}
                    </a>
                  </div>
                </div>
              )}
              
              <p className="text-sm text-text-muted italic mt-4">{t('"Gehirne zu verstehen, bedeutet, Menschen zu verstehen."', '"Understanding brains means understanding people."')}</p>
            </div>
            <div className="border border-border bg-white p-8 rounded-card hover:border-primary-accent hover:shadow-lg hover:shadow-primary-accent/10 transition-all duration-300 hover:-translate-y-1">
              <h3 className="text-xl font-semibold text-text-primary mb-2">Jonathan</h3>
              <p className="text-sm text-text-muted mb-4">CFO / CMO</p>
              <p className="text-text-secondary mb-4">{t("Studiert BWL an der LMU mit Fokus auf Rechnungswesen, Finanzen und Start-up-Entwicklung. Praktikum bei Caesar Ventures im Bereich Risikokapital.", "Studies business administration at LMU with a focus on accounting, finance and start-up development. Internship at Caesar Ventures in venture capital.")}</p>
              <p className="text-sm text-text-muted italic">{t('"Solides Fundament für nachhaltiges Wachstum."', '"A solid foundation for sustainable growth."')}</p>
            </div>
            <div className="border border-border bg-white p-8 rounded-card hover:border-primary-accent hover:shadow-lg hover:shadow-primary-accent/10 transition-all duration-300 hover:-translate-y-1">
              <h3 className="text-xl font-semibold text-text-primary mb-2">Tito</h3>
              <p className="text-sm text-text-muted mb-4">{t("Head of Sports", "Head of Sports")}</p>
              <p className="text-text-secondary mb-4">{t("Aktiver Sportler und Trainer im Leistungssport mit umfassender Erfahrung in neurologisch orientierten Trainingsansätzen. Leitet die Sportabteilung von PROVOID.", "Active athlete and coach in competitive sport with extensive experience in neurologically oriented training approaches. Leads PROVOID's sports division.")}</p>
              <p className="text-sm text-text-muted italic">{t('"Leistung beginnt im Nervensystem."', '"Performance begins in the nervous system."')}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-section-mobile md:py-section bg-white">
        <div className="container">
          <SectionHeader label="JOURNEY" title={t("Unser Weg", "Our Journey")} />
          
          <div className="mt-12 space-y-8">
            <div className="border-l-2 border-border pl-6"><p className="text-sm font-semibold uppercase tracking-wider text-text-muted mb-2">{t("Forschungsprojekt", "Research Project")}</p><p className="text-text-secondary">{t("Erste neurowissenschaftliche Untersuchungen und Fragestellung.", "First neuroscientific investigations and research questions.")}</p></div>
            <div className="border-l-2 border-border pl-6"><p className="text-sm font-semibold uppercase tracking-wider text-text-muted mb-2">Jugend forscht</p><p className="text-text-secondary">{t("Auszeichnung für innovatives Forschungsprojekt im Bereich Neurowissenschaft.", "Award for an innovative research project in neuroscience.")}</p></div>
            <div className="border-l-2 border-border pl-6"><p className="text-sm font-semibold uppercase tracking-wider text-text-muted mb-2">{t("EEG-Testungen", "EEG Testing")}</p><p className="text-text-secondary">{t("Erste praktische Anwendungen und Kooperationen mit Neurolaboren.", "First practical applications and collaborations with neuro labs.")}</p></div>
            <div className="border-l-2 border-border pl-6"><p className="text-sm font-semibold uppercase tracking-wider text-text-muted mb-2">{t("Gründung", "Founding")}</p><p className="text-text-secondary">{t("Offizielle Gründung von PROVOID als Unternehmen.", "Official founding of PROVOID as a company.")}</p></div>
            <div className="border-l-2 border-border pl-6"><p className="text-sm font-semibold uppercase tracking-wider text-text-muted mb-2">{t("Auszeichnungen", "Awards")}</p><p className="text-text-secondary">{t("Young Founders, JugendUnternimmt, STARTERiN Award Nominierung.", "Young Founders, JugendUnternimmt, STARTERiN Award nomination.")}</p></div>
            <div className="border-l-2 border-primary-accent pl-6"><p className="text-sm font-semibold uppercase tracking-wider text-primary-accent mb-2">{t("Heute", "Today")}</p><p className="text-text-secondary">{t("Wissenschaftlich fundierte Beratung und digitale Tools für Unternehmen und Sport.", "Scientifically grounded consulting and digital tools for companies and sport.")}</p></div>
          </div>
        </div>
      </section>

      <section className="py-section-mobile md:py-section bg-surface">
        <div className="container">
          <SectionHeader label="WHY OUR AGE IS A STRENGTH" title={t("Frische Perspektiven statt traditioneller Ansätze.", "Fresh perspectives instead of traditional approaches.")} />
          
          <div className="mt-12 border border-border bg-white p-8 rounded-card hover:border-primary-accent hover:shadow-lg hover:shadow-primary-accent/10 transition-all duration-300 hover:-translate-y-1">
            <p className="text-lg text-text-secondary mb-6">{t("Unser Alter ist kein Makel, sondern Teil unseres Blickwinkels. Wir verbinden wissenschaftliche Ernsthaftigkeit mit der Fähigkeit, neue Systeme schnell zu verstehen, direkt zu testen und ehrlich zu hinterfragen.", "Our age is not a flaw but part of our perspective. We combine scientific rigor with the ability to quickly understand new systems, test them directly, and question them honestly.")}</p>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-4">{t("Unsere Stärken", "Our Strengths")}</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3"><span className="text-primary-accent mt-1">•</span><span className="text-text-secondary">{t("Nähe zu aktuellen Lern-, Arbeits- und Sportrealitäten", "Close connection to current learning, work and sport realities")}</span></li>
                  <li className="flex items-start gap-3"><span className="text-primary-accent mt-1">•</span><span className="text-text-secondary">{t("Hohe Geschwindigkeit bei Implementierung und Anpassung", "High speed in implementation and adaptation")}</span></li>
                  <li className="flex items-start gap-3"><span className="text-primary-accent mt-1">•</span><span className="text-text-secondary">{t("Wissenschaftliche Neugier ohne eingefahrene Denkmuster", "Scientific curiosity without entrenched thought patterns")}</span></li>
                  <li className="flex items-start gap-3"><span className="text-primary-accent mt-1">•</span><span className="text-text-secondary">{t("Mut, Dinge neu zu denken und zu hinterfragen", "Courage to rethink and question things")}</span></li>
                  <li className="flex items-start gap-3"><span className="text-primary-accent mt-1">•</span><span className="text-text-secondary">{t("Digitale Selbstverständlichkeit und technologische Offenheit", "Digital fluency and technological openness")}</span></li>
                  <li className="flex items-start gap-3"><span className="text-primary-accent mt-1">•</span><span className="text-text-secondary">{t("Keine eingefahrenen Beratungsfloskeln", "No stale consulting clichés")}</span></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-4">{t("Unser Ansatz", "Our Approach")}</h3>
                <p className="text-text-secondary mb-4">{t("Wir kombinieren akademische Exzellenz mit praktischer Relevanz. Unsere Arbeit basiert auf aktueller Forschung, aber wir verstehen es, diese in die Sprache und Realität unserer Kunden zu übersetzen.", "We combine academic excellence with practical relevance. Our work is based on current research, but we know how to translate it into our clients' language and reality.")}</p>
                <p className="text-text-secondary">{t("Ehrlichkeit, Transparenz und messbare Ergebnisse stehen im Zentrum, nicht Marketingversprechen oder kurzfristige Trends.", "Honesty, transparency and measurable results are at the center, not marketing promises or short-term trends.")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
