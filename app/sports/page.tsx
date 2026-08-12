"use client";

import { SectionHeader } from "@/components/SectionHeader";
import { CTABlock } from "@/components/ui/CTABlock";
import { ProcessStep } from "@/components/ui/ProcessStep";
import Image from "next/image";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function Sports() {
  const { t } = useLanguage();
  return (
    <div className="flex flex-col">
      <section className="relative py-section-mobile md:py-section bg-surface overflow-hidden">
        <div className="container relative z-10">
          <div className="max-w-4xl flex items-start justify-between gap-8">
            <div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-text-primary mb-6">
                {t("NEUROATHLETISCHE PERFORMANCE MESSBAR GEMACHT.", "NEUROATHLETIC PERFORMANCE MADE MEASURABLE.")}
              </h1>
              <p className="text-lg md:text-xl text-text-secondary mb-8 max-w-3xl">
                {t("PROVOID Sports verbindet Neurowissenschaft, Trainingspsychologie und digitale Tools, um Fokus, Motivation und Entscheidungsverhalten im Sport gezielt zu stärken.", "PROVOID Sports combines neuroscience, training psychology and digital tools to specifically strengthen focus, motivation and decision-making behavior in sport.")}
              </p>
              <CTABlock primary={{ text: t("Gespräch buchen", "Book a call"), href: "/kontakt" }} secondary={{ text: t("App kennenlernen", "Discover the App"), href: "#app" }} />
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
          <SectionHeader label="THE PROBLEM" title={t("Leistung beginnt im Nervensystem.", "Performance begins in the nervous system.")} />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            <div className="border border-border bg-black p-6 rounded-card hover:border-primary-accent hover:shadow-lg hover:shadow-primary-accent/10 transition-all duration-300 hover:-translate-y-1"><h3 className="text-lg font-semibold text-white mb-2">{t("Autonome Dysbalance", "Autonomic Imbalance")}</h3><p className="text-sm text-gray-300">{t("Sympathikus-Parasympathikus-Ungleichgewicht beeinträchtigt Regeneration.", "Sympathetic-parasympathetic imbalance impairs recovery.")}</p></div>
            <div className="border border-border bg-black p-6 rounded-card hover:border-primary-accent hover:shadow-lg hover:shadow-primary-accent/10 transition-all duration-300 hover:-translate-y-1"><h3 className="text-lg font-semibold text-white mb-2">{t("Neuronale Übererregung", "Neural Overactivation")}</h3><p className="text-sm text-gray-300">{t("Chronische Aktivierung reduziert Entscheidungsfähigkeit und Reaktionszeit.", "Chronic activation reduces decision-making ability and reaction time.")}</p></div>
            <div className="border border-border bg-black p-6 rounded-card hover:border-primary-accent hover:shadow-lg hover:shadow-primary-accent/10 transition-all duration-300 hover:-translate-y-1"><h3 className="text-lg font-semibold text-white mb-2">{t("Defizite in neuroplastischer Adaption", "Deficits in Neuroplastic Adaptation")}</h3><p className="text-sm text-gray-300">{t("Unzureichende Anpassungsfähigkeit an neue Trainingsreize.", "Insufficient adaptability to new training stimuli.")}</p></div>
            <div className="border border-border bg-black p-6 rounded-card hover:border-primary-accent hover:shadow-lg hover:shadow-primary-accent/10 transition-all duration-300 hover:-translate-y-1"><h3 className="text-lg font-semibold text-white mb-2">{t("Sensorische Integrationsstörungen", "Sensory Integration Disorders")}</h3><p className="text-sm text-gray-300">{t("Verschmelzung visueller, vestibulärer und propriozeptiver Informationen beeinträchtigt.", "Impaired fusion of visual, vestibular and proprioceptive information.")}</p></div>
            <div className="border border-border bg-black p-6 rounded-card hover:border-primary-accent hover:shadow-lg hover:shadow-primary-accent/10 transition-all duration-300 hover:-translate-y-1"><h3 className="text-lg font-semibold text-white mb-2">{t("Mangelnde neurologische Sicherheit", "Lack of Neurological Safety")}</h3><p className="text-sm text-gray-300">{t("Nervensystem interpretiert Situationen als bedrohlich statt sicher.", "The nervous system interprets situations as threatening instead of safe.")}</p></div>
            <div className="border border-border bg-black p-6 rounded-card hover:border-primary-accent hover:shadow-lg hover:shadow-primary-accent/10 transition-all duration-300 hover:-translate-y-1"><h3 className="text-lg font-semibold text-white mb-2">{t("Suboptimale motorische Kontrolle", "Suboptimal Motor Control")}</h3><p className="text-sm text-gray-300">{t("Neuronale Pfade für Bewegungsabläufe nicht effizient etabliert.", "Neural pathways for movement sequences not efficiently established.")}</p></div>
          </div>
        </div>
      </section>

      <section id="packages" className="py-section-mobile md:py-section bg-surface">
        <div className="container">
          <SectionHeader label="PACKAGES" title={t("Angebote für Vereine und Athlet:innen", "Offerings for Clubs and Athletes")} />
          
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <div className="border border-border bg-surface p-8 rounded-card hover:border-border2 transition-colors">
              <h3 className="text-xl font-semibold text-text-primary mb-4">{t("Saisonprogramm", "Season Program")}</h3>
              <p className="text-sm text-text-secondary mb-6">{t("Für Sportvereine und Mannschaften", "For sports clubs and teams")}</p>
              <div className="space-y-4 mb-8">
                <div><p className="text-sm font-semibold uppercase tracking-wider text-text-muted mb-1">{t("Für wen", "For whom")}</p><p className="text-sm text-text-secondary">{t("Vereine, Jugendteams, Mannschaften", "Clubs, youth teams, teams")}</p></div>
                <div><p className="text-sm font-semibold uppercase tracking-wider text-text-muted mb-1">{t("Inhalt", "Content")}</p><p className="text-sm text-text-secondary">{t("Neuro-Edukation, Neurotrainingssessions, individuelle Betreuung bei Bedarf", "Neuro-education, neuro-training sessions, individual support as needed")}</p></div>
                <div><p className="text-sm font-semibold uppercase tracking-wider text-text-muted mb-1">{t("Dauer", "Duration")}</p><p className="text-sm text-text-secondary">{t("Ganze Saison (8+ Monate)", "Full season (8+ months)")}</p></div>
                <div><p className="text-sm font-semibold uppercase tracking-wider text-text-muted mb-1">App</p><p className="text-sm text-text-secondary">{t("Zugang für alle Spieler:innen", "Access for all players")}</p></div>
              </div>
              <CTABlock primary={{ text: t("Gespräch buchen", "Book a call"), href: "/kontakt" }} />
            </div>

            <div className="border border-primary-accent bg-surface p-8 rounded-card hover:border-primary-accent transition-colors">
              <h3 className="text-xl font-semibold text-text-primary mb-4">{t("Einzelsportler:innen", "Individual Athletes")}</h3>
              <p className="text-sm text-text-secondary mb-6">{t("Für ambitionierte Athlet:innen im Leistungsbereich", "For ambitious athletes at the performance level")}</p>
              <div className="space-y-4 mb-8">
                <div><p className="text-sm font-semibold uppercase tracking-wider text-text-muted mb-1">{t("Für wen", "For whom")}</p><p className="text-sm text-text-secondary">{t("Einzelsportler:innen, Leistungssport", "Individual athletes, competitive sport")}</p></div>
                <div><p className="text-sm font-semibold uppercase tracking-wider text-text-muted mb-1">{t("Inhalt", "Content")}</p><p className="text-sm text-text-secondary">{t("Individuelle Analysen, Trainingspläne, neurologische Sicherheit", "Individual analyses, training plans, neurological safety")}</p></div>
                <div><p className="text-sm font-semibold uppercase tracking-wider text-text-muted mb-1">{t("Dauer", "Duration")}</p><p className="text-sm text-text-secondary">{t("Auf Anfrage und individuell vereinbart", "On request and individually arranged")}</p></div>
                <div><p className="text-sm font-semibold uppercase tracking-wider text-text-muted mb-1">App</p><p className="text-sm text-text-secondary">{t("Voller Zugang mit personalisiertem Dashboard", "Full access with personalized dashboard")}</p></div>
              </div>
              <CTABlock primary={{ text: t("Gespräch buchen", "Book a call"), href: "/kontakt" }} />
            </div>
          </div>
        </div>
      </section>

      <section className="py-section-mobile md:py-section bg-white">
        <div className="container">
          <SectionHeader label="CASE / SC VICTORIA HAMBURG" title={t("Wie wir Performance steigern", "How We Increase Performance")} />
          
          <div className="mt-12 border border-border bg-surface p-8 rounded-card">
            <div className="space-y-6">
              <div><p className="text-sm font-semibold uppercase tracking-wider text-text-muted mb-2">{t("Projekt", "Project")}</p><p className="text-text-secondary">{t("SC Victoria Hamburg, Kooperation mit vier Jugendteams über 8 Monate", "SC Victoria Hamburg, cooperation with four youth teams over 8 months")}</p></div>
              <div><p className="text-sm font-semibold uppercase tracking-wider text-text-muted mb-2">{t("Angebot", "Offering")}</p><p className="text-text-secondary">{t("Neuroathletik-Training, individuelle Analysen, App-Zugang", "Neuroathletics training, individual analyses, app access")}</p></div>
              <div><p className="text-sm font-semibold uppercase tracking-wider text-text-muted mb-2">{t("Umsetzung", "Implementation")}</p><p className="text-text-secondary">{t("Vermittlung von Neuroathletik-Wissen, Nervensystem-Analysen auf Sicherheiten und Unsicherheiten, individuelle Trainingspläne, App-Integration für neuronale Leistungsoptimierung", "Teaching neuroathletics knowledge, nervous system analyses of certainties and uncertainties, individual training plans, app integration for neural performance optimization")}</p></div>
              <div><p className="text-sm font-semibold uppercase tracking-wider text-text-muted mb-2">{t("Ergebnis", "Result")}</p><p className="text-text-secondary">{t(<><strong>Messbare Leistungsoptimierung</strong> durch App-Nutzung, festes neurologisches Grundverständnis bei allen Spieler:innen, starke Basis für weitere Entwicklung</>, <><strong>Measurable performance optimization</strong> through app usage, solid neurological foundational understanding among all players, strong basis for further development</>)}</p></div>
            </div>
          </div>
        </div>
      </section>

      <section id="app" className="py-section-mobile md:py-section bg-white">
        <div className="container">
          <SectionHeader label="APP" title={t("Neuro-gestützte Gamification für Teams.", "Neuro-driven Gamification for Teams.")} description={t("Basierend auf EEG-Messungen: Welche Reize aktivieren welche Gehirnareale? Wir haben Fußball-Funktionen auf neuronale Prozesse abgebildet und in Gamification verwandelt.", "Based on EEG measurements: which stimuli activate which brain regions? We mapped football functions onto neural processes and turned them into gamification.")} />
          
          <div className="mt-12 border border-border bg-white p-8 rounded-card">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex items-center justify-center">
                <div className="border border-border bg-surface p-8 rounded-card w-full max-w-sm aspect-[9/16] flex items-center justify-center overflow-hidden">
                  <img src="/app-mockup.jpeg" alt="PROVOID App" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <h3 className="text-lg font-semibold text-text-primary mb-2 text-left">{t("Entwicklungsprozess", "Development Process")}</h3>
                <p className="text-sm text-text-muted mb-6 text-left">{t("Vom Labor zur App", "From lab to app")}</p>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-accent text-white flex items-center justify-center text-sm font-semibold">1</div>
                    <p className="text-base text-text-secondary">{t("EEG-Messung neuronaler Aktivitätsmuster", "EEG measurement of neural activity patterns")}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-accent text-white flex items-center justify-center text-sm font-semibold">2</div>
                    <p className="text-base text-text-secondary">{t("Fußball-Funktionen auf Gehirnareale abgebildet", "Football functions mapped onto brain regions")}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-accent text-white flex items-center justify-center text-sm font-semibold">3</div>
                    <p className="text-base text-text-secondary">{t("Gezielte Reize für relevante Areale entwickelt", "Targeted stimuli developed for relevant regions")}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-accent text-white flex items-center justify-center text-sm font-semibold">4</div>
                    <p className="text-base text-text-secondary">{t("Neurofriendly Games durch Gamification", "Neurofriendly games through gamification")}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-accent text-white flex items-center justify-center text-sm font-semibold">5</div>
                    <p className="text-base text-text-secondary">{t("Team-Challenges und Leaderboard", "Team challenges and leaderboard")}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-accent text-white flex items-center justify-center text-sm font-semibold">6</div>
                    <p className="text-base text-text-secondary">{t("Gehirn im Team und individuell optimieren", "Optimize the brain as a team and individually")}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-section-mobile md:py-section bg-white">
        <div className="container">
          <SectionHeader label="METHOD" title={t("Neurologische Analyse und Training.", "Neurological Analysis and Training.")} />
          
          <div className="mt-12 space-y-8">
            <ProcessStep number="01" title={t("Neurologische Analyse", "Neurological Analysis")} description={t("Status des Nervensystems, Autonome Balance, Sensorische Integration.", "Status of the nervous system, autonomic balance, sensory integration.")} />
            <ProcessStep number="02" title={t("Neuroplastische Aktivierung", "Neuroplastic Activation")} description={t("Gezielte Reize zur Stärkung neuronaler Verbindungen und Pfade.", "Targeted stimuli to strengthen neural connections and pathways.")} />
            <ProcessStep number="03" title={t("System-Training", "System Training")} description={t("Routinen für autonome Regulation und neurologische Sicherheit.", "Routines for autonomic regulation and neurological safety.")} />
            <ProcessStep number="04" title={t("Edukativer Transfer", "Educational Transfer")} description={t("Verständnis eigener Stärken und Schwächen für nachhaltige Selbstregulation.", "Understanding one's own strengths and weaknesses for sustainable self-regulation.")} />
            <ProcessStep number="05" title={t("Integration", "Integration")} description={t("Verankerung neuer neuronaler Muster in Training und Wettkampf.", "Anchoring new neural patterns in training and competition.")} />
          </div>
        </div>
      </section>

      <section className="py-section-mobile md:py-section bg-surface">
        <div className="container">
          <SectionHeader label="CONTACT" title={t("Bereit für nachhaltige Performance?", "Ready for sustainable performance?")} />
          <div className="mt-12"><CTABlock primary={{ text: t("Gespräch buchen", "Book a call"), href: "/kontakt" }} /></div>
        </div>
      </section>
    </div>
  );
}
