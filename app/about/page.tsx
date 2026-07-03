"use client";

import { useState } from "react";
import Image from "next/image";
import { SectionHeader } from "@/components/SectionHeader";
import { CTABlock } from "@/components/ui/CTABlock";
import { EditorialQuote } from "@/components/ui/EditorialQuote";

export default function About() {
  const [showOliviaDetails, setShowOliviaDetails] = useState(false);
  return (
    <div className="flex flex-col">
      <section className="relative py-section-mobile md:py-section bg-surface overflow-hidden">
        <div className="container relative z-10">
          <div className="max-w-4xl flex items-start justify-between gap-8">
            <div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-text-primary mb-6">
                NO BRAIN. NO GAIN.
              </h1>
              <p className="text-lg md:text-xl text-text-secondary mb-8 max-w-3xl">
                Wir sind PROVOID, jung, wissenschaftlich neugierig und überzeugt davon, dass bessere Entscheidungen dort beginnen, wo Verhalten wirklich entsteht: im Gehirn.
              </p>
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

      <section className="py-section-mobile md:py-section bg-white">
        <div className="container">
          <SectionHeader label="MOTTO" title="VERSTEHEN. HINTERFRAGEN. ANWENDEN." description="Wir übersetzen Komplexität in klare, praktische und direkt anwendbare Systeme." />
          <EditorialQuote quote="Wissenschaft ist das Fundament für nachhaltigen Wandel." />
        </div>
      </section>

      <section className="py-section-mobile md:py-section bg-surface">
        <div className="container">
          <SectionHeader label="TEAM" title="Die Menschen hinter PROVOID" />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            <div className="border border-border bg-white p-8 rounded-card hover:border-primary-accent hover:shadow-lg hover:shadow-primary-accent/10 transition-all duration-300 hover:-translate-y-1">
              <h3 className="text-xl font-semibold text-text-primary mb-2">Olivia</h3>
              <p className="text-sm text-text-muted mb-4">Gründerin & CEO</p>
              <p className="text-text-secondary mb-4">Gründete PROVOID 2025 nach dem Abitur als Jahrgangsbeste. Sie kombiniert wissenschaftliche Tiefe mit unternehmerischem Denken sowie ihrer Erfahrung aus Sport und Forschung.</p>
              
              <button
                onClick={() => setShowOliviaDetails(!showOliviaDetails)}
                className="flex items-center gap-2 text-sm font-medium text-primary-accent hover:text-primary-light transition-colors mb-4"
              >
                {showOliviaDetails ? 'Details ausblenden' : 'Details anzeigen'}
                <svg className={`w-4 h-4 transition-transform ${showOliviaDetails ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {showOliviaDetails && (
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wider text-text-muted mb-2">Biografie</p>
                    <p className="text-sm text-text-secondary">Mit 15 Jahren begann Olivia als Juniorstudentin Physik an der Universität Hamburg zu studieren. Parallel forschte sie am Schülerforschungszentrum Hamburg, wo sie mit PROVOID den Landespreis bei Jugend forscht gewann. Erfahrung als Fußballtrainerin bei SC Victoria Hamburg.</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wider text-text-muted mb-2">Ausbildung & Zertifikate</p>
                    <ul className="text-sm text-text-secondary space-y-1">
                      <li>• Harvard University - Fundamentals of Neuroscience</li>
                      <li>• University of Cambridge - Cognitive Psychology & Neuropsychology</li>
                      <li>• Copenhagen Business School - Consumer Neuromarketing</li>
                      <li>• Juniorstudium Physik (B.Sc.)</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wider text-text-muted mb-2">Auszeichnungen</p>
                    <ul className="text-sm text-text-secondary space-y-1">
                      <li>• 1. Landespreis Jugend forscht (Arbeitswelt)</li>
                      <li>• 2. Platz bundesweit Young-Founders Summer School</li>
                      <li>• STARTERiN Award Hamburg 2025 (Top 6)</li>
                      <li>• Internationale Mathematik-Olympiade (Landesrunde)</li>
                    </ul>
                  </div>
                  <div>
                    <a href="/academicCV_05:26.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-primary-accent hover:text-primary-light transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Academic CV herunterladen
                    </a>
                  </div>
                </div>
              )}
              
              <p className="text-sm text-text-muted italic mt-4">"Gehirne zu verstehen, bedeutet, Menschen zu verstehen."</p>
            </div>
            <div className="border border-border bg-white p-8 rounded-card hover:border-primary-accent hover:shadow-lg hover:shadow-primary-accent/10 transition-all duration-300 hover:-translate-y-1">
              <h3 className="text-xl font-semibold text-text-primary mb-2">Jonathan</h3>
              <p className="text-sm text-text-muted mb-4">CFO / CMO</p>
              <p className="text-text-secondary mb-4">Studiert BWL an der LMU mit Fokus auf Rechnungswesen, Finanzen und Start-up-Entwicklung. Praktikum bei Caesar Ventures im Bereich Risikokapital.</p>
              <p className="text-sm text-text-muted italic">"Solides Fundament für nachhaltiges Wachstum."</p>
            </div>
            <div className="border border-border bg-white p-8 rounded-card hover:border-primary-accent hover:shadow-lg hover:shadow-primary-accent/10 transition-all duration-300 hover:-translate-y-1">
              <h3 className="text-xl font-semibold text-text-primary mb-2">Tito</h3>
              <p className="text-sm text-text-muted mb-4">Head of Sports</p>
              <p className="text-text-secondary mb-4">Aktiver Sportler und Trainer im Leistungssport mit umfassender Erfahrung in neurologisch orientierten Trainingsansätzen. Leitet die Sportabteilung von PROVOID.</p>
              <p className="text-sm text-text-muted italic">"Leistung beginnt im Nervensystem."</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-section-mobile md:py-section bg-white">
        <div className="container">
          <SectionHeader label="JOURNEY" title="Unser Weg" />
          
          <div className="mt-12 space-y-8">
            <div className="border-l-2 border-border pl-6"><p className="text-sm font-semibold uppercase tracking-wider text-text-muted mb-2">Forschungsprojekt</p><p className="text-text-secondary">Erste neurowissenschaftliche Untersuchungen und Fragestellung.</p></div>
            <div className="border-l-2 border-border pl-6"><p className="text-sm font-semibold uppercase tracking-wider text-text-muted mb-2">Jugend forscht</p><p className="text-text-secondary">Auszeichnung für innovatives Forschungsprojekt im Bereich Neurowissenschaft.</p></div>
            <div className="border-l-2 border-border pl-6"><p className="text-sm font-semibold uppercase tracking-wider text-text-muted mb-2">EEG-Testungen</p><p className="text-text-secondary">Erste praktische Anwendungen und Kooperationen mit Neurolaboren.</p></div>
            <div className="border-l-2 border-border pl-6"><p className="text-sm font-semibold uppercase tracking-wider text-text-muted mb-2">Gründung</p><p className="text-text-secondary">Offizielle Gründung von PROVOID als Unternehmen.</p></div>
            <div className="border-l-2 border-border pl-6"><p className="text-sm font-semibold uppercase tracking-wider text-text-muted mb-2">Auszeichnungen</p><p className="text-text-secondary">Young Founders, JugendUnternimmt, STARTERiN Award Nominierung.</p></div>
            <div className="border-l-2 border-primary-accent pl-6"><p className="text-sm font-semibold uppercase tracking-wider text-primary-accent mb-2">Heute</p><p className="text-text-secondary">Wissenschaftlich fundierte Beratung und digitale Tools für Unternehmen und Sport.</p></div>
          </div>
        </div>
      </section>

      <section className="py-section-mobile md:py-section bg-surface">
        <div className="container">
          <SectionHeader label="WHY OUR AGE IS A STRENGTH" title="Frische Perspektiven statt traditioneller Ansätze." />
          
          <div className="mt-12 border border-border bg-white p-8 rounded-card hover:border-primary-accent hover:shadow-lg hover:shadow-primary-accent/10 transition-all duration-300 hover:-translate-y-1">
            <p className="text-lg text-text-secondary mb-6">Unser Alter ist kein Makel, sondern Teil unseres Blickwinkels. Wir verbinden wissenschaftliche Ernsthaftigkeit mit der Fähigkeit, neue Systeme schnell zu verstehen, direkt zu testen und ehrlich zu hinterfragen.</p>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-4">Unsere Stärken</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3"><span className="text-primary-accent mt-1">•</span><span className="text-text-secondary">Nähe zu aktuellen Lern-, Arbeits- und Sportrealitäten</span></li>
                  <li className="flex items-start gap-3"><span className="text-primary-accent mt-1">•</span><span className="text-text-secondary">Hohe Geschwindigkeit bei Implementierung und Anpassung</span></li>
                  <li className="flex items-start gap-3"><span className="text-primary-accent mt-1">•</span><span className="text-text-secondary">Wissenschaftliche Neugier ohne eingefahrene Denkmuster</span></li>
                  <li className="flex items-start gap-3"><span className="text-primary-accent mt-1">•</span><span className="text-text-secondary">Mut, Dinge neu zu denken und zu hinterfragen</span></li>
                  <li className="flex items-start gap-3"><span className="text-primary-accent mt-1">•</span><span className="text-text-secondary">Digitale Selbstverständlichkeit und technologische Offenheit</span></li>
                  <li className="flex items-start gap-3"><span className="text-primary-accent mt-1">•</span><span className="text-text-secondary">Keine eingefahrenen Beratungsfloskeln</span></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-4">Unser Ansatz</h3>
                <p className="text-text-secondary mb-4">Wir kombinieren akademische Exzellenz mit praktischer Relevanz. Unsere Arbeit basiert auf aktueller Forschung, aber wir verstehen es, diese in die Sprache und Realität unserer Kunden zu übersetzen.</p>
                <p className="text-text-secondary">Ehrlichkeit, Transparenz und messbare Ergebnisse stehen im Zentrum, nicht Marketingversprechen oder kurzfristige Trends.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-section-mobile md:py-section bg-surface">
        <div className="container">
          <SectionHeader label="CONTACT" title="Lernen Sie uns kennen." />
          <div className="mt-12"><CTABlock primary={{ text: "Mit uns sprechen", href: "/kontakt" }} /></div>
        </div>
      </section>
    </div>
  );
}
