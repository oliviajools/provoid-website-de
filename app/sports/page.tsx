import { SectionHeader } from "@/components/SectionHeader";
import { CTABlock } from "@/components/ui/CTABlock";
import { ProcessStep } from "@/components/ui/ProcessStep";
import Image from "next/image";

export default function Sports() {
  return (
    <div className="flex flex-col">
      <section className="relative py-section-mobile md:py-section bg-surface overflow-hidden">
        <div className="container relative z-10">
          <div className="max-w-4xl flex items-start justify-between gap-8">
            <div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-text-primary mb-6">
                NEUROATHLETISCHE PERFORMANCE MESSBAR GEMACHT.
              </h1>
              <p className="text-lg md:text-xl text-text-secondary mb-8 max-w-3xl">
                PROVOID Sports verbindet Neurowissenschaft, Trainingspsychologie und digitale Tools, um Fokus, Motivation und Entscheidungsverhalten im Sport gezielt zu stärken.
              </p>
              <CTABlock primary={{ text: "Sports-Paket anfragen", href: "/kontakt" }} secondary={{ text: "App kennenlernen", href: "#app" }} />
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
          <SectionHeader label="THE PROBLEM" title="Leistung beginnt im Nervensystem." />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            <div className="border border-border bg-black p-6 rounded-card hover:border-primary-accent hover:shadow-lg hover:shadow-primary-accent/10 transition-all duration-300 hover:-translate-y-1"><h3 className="text-lg font-semibold text-white mb-2">Autonome Dysbalance</h3><p className="text-sm text-gray-300">Sympathikus-Parasympathikus-Ungleichgewicht beeinträchtigt Regeneration.</p></div>
            <div className="border border-border bg-black p-6 rounded-card hover:border-primary-accent hover:shadow-lg hover:shadow-primary-accent/10 transition-all duration-300 hover:-translate-y-1"><h3 className="text-lg font-semibold text-white mb-2">Neuronale Übererregung</h3><p className="text-sm text-gray-300">Chronische Aktivierung reduziert Entscheidungsfähigkeit und Reaktionszeit.</p></div>
            <div className="border border-border bg-black p-6 rounded-card hover:border-primary-accent hover:shadow-lg hover:shadow-primary-accent/10 transition-all duration-300 hover:-translate-y-1"><h3 className="text-lg font-semibold text-white mb-2">Defizite in neuroplastischer Adaption</h3><p className="text-sm text-gray-300">Unzureichende Anpassungsfähigkeit an neue Trainingsreize.</p></div>
            <div className="border border-border bg-black p-6 rounded-card hover:border-primary-accent hover:shadow-lg hover:shadow-primary-accent/10 transition-all duration-300 hover:-translate-y-1"><h3 className="text-lg font-semibold text-white mb-2">Sensorische Integrationsstörungen</h3><p className="text-sm text-gray-300">Verschmelzung visueller, vestibulärer und propriozeptiver Informationen beeinträchtigt.</p></div>
            <div className="border border-border bg-black p-6 rounded-card hover:border-primary-accent hover:shadow-lg hover:shadow-primary-accent/10 transition-all duration-300 hover:-translate-y-1"><h3 className="text-lg font-semibold text-white mb-2">Mangelnde neurologische Sicherheit</h3><p className="text-sm text-gray-300">Nervensystem interpretiert Situationen als bedrohlich statt sicher.</p></div>
            <div className="border border-border bg-black p-6 rounded-card hover:border-primary-accent hover:shadow-lg hover:shadow-primary-accent/10 transition-all duration-300 hover:-translate-y-1"><h3 className="text-lg font-semibold text-white mb-2">Suboptimale motorische Kontrolle</h3><p className="text-sm text-gray-300">Neuronale Pfade für Bewegungsabläufe nicht effizient etabliert.</p></div>
          </div>
        </div>
      </section>

      <section className="py-section-mobile md:py-section bg-surface">
        <div className="container">
          <SectionHeader label="METHOD" title="Neurologische Analyse und Training." />
          
          <div className="mt-12 space-y-8">
            <ProcessStep number="01" title="Neurologische Analyse" description="Status des Nervensystems, Autonome Balance, Sensorische Integration." />
            <ProcessStep number="02" title="Neuroplastische Aktivierung" description="Gezielte Reize zur Stärkung neuronaler Verbindungen und Pfade." />
            <ProcessStep number="03" title="System-Training" description="Routinen für autonome Regulation und neurologische Sicherheit." />
            <ProcessStep number="04" title="Edukativer Transfer" description="Verständnis eigener Stärken und Schwächen für nachhaltige Selbstregulation." />
            <ProcessStep number="05" title="Integration" description="Verankerung neuer neuronaler Muster in Training und Wettkampf." />
          </div>
        </div>
      </section>

      <section className="py-section-mobile md:py-section bg-white">
        <div className="container">
          <SectionHeader label="CASE / SC VICTORIA HAMBURG" title="Wie wir Performance steigern" />
          
          <div className="mt-12 border border-border bg-surface p-8 rounded-card">
            <div className="space-y-6">
              <div><p className="text-sm font-semibold uppercase tracking-wider text-text-muted mb-2">Projekt</p><p className="text-text-secondary">SC Victoria Hamburg, Kooperation mit vier Jugendteams über 8 Monate</p></div>
              <div><p className="text-sm font-semibold uppercase tracking-wider text-text-muted mb-2">Angebot</p><p className="text-text-secondary">Neuroathletik-Training, individuelle Analysen, App-Zugang</p></div>
              <div><p className="text-sm font-semibold uppercase tracking-wider text-text-muted mb-2">Umsetzung</p><p className="text-text-secondary">Vermittlung von Neuroathletik-Wissen, Nervensystem-Analysen auf Sicherheiten und Unsicherheiten, individuelle Trainingspläne, App-Integration für neuronale Leistungsoptimierung</p></div>
              <div><p className="text-sm font-semibold uppercase tracking-wider text-text-muted mb-2">Ergebnis</p><p className="text-text-secondary">Festes neurologisches Grundverständnis bei allen Spieler:innen, messbare Leistungsoptimierung durch App-Nutzung, solide Basis für weitere Entwicklung</p></div>
            </div>
          </div>
        </div>
      </section>

      <section id="app" className="py-section-mobile md:py-section bg-surface">
        <div className="container">
          <SectionHeader label="APP" title="Neuro-gestützte Gamification für Teams." description="Basierend auf EEG-Messungen: Welche Reize aktivieren welche Gehirnareale? Wir haben Fußball-Funktionen auf neuronale Prozesse abgebildet und in Gamification verwandelt." />
          
          <div className="mt-12 border border-border bg-white p-8 rounded-card">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex items-center justify-center">
                <div className="border border-border bg-surface p-8 rounded-card w-full max-w-sm aspect-[9/16] flex items-center justify-center overflow-hidden">
                  <img src="/app-mockup.jpeg" alt="PROVOID App" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <h3 className="text-lg font-semibold text-text-primary mb-2 text-left">Entwicklungsprozess</h3>
                <p className="text-sm text-text-muted mb-6 text-left">Vom Labor zur App</p>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-accent text-white flex items-center justify-center text-sm font-semibold">1</div>
                    <p className="text-base text-text-secondary">EEG-Messung neuronaler Aktivitätsmuster</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-accent text-white flex items-center justify-center text-sm font-semibold">2</div>
                    <p className="text-base text-text-secondary">Fußball-Funktionen auf Gehirnareale abgebildet</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-accent text-white flex items-center justify-center text-sm font-semibold">3</div>
                    <p className="text-base text-text-secondary">Gezielte Reize für relevante Areale entwickelt</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-accent text-white flex items-center justify-center text-sm font-semibold">4</div>
                    <p className="text-base text-text-secondary">Neurofriendly Games durch Gamification</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-accent text-white flex items-center justify-center text-sm font-semibold">5</div>
                    <p className="text-base text-text-secondary">Team-Challenges und Leaderboard</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-accent text-white flex items-center justify-center text-sm font-semibold">6</div>
                    <p className="text-base text-text-secondary">Gehirn im Team und individuell optimieren</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-section-mobile md:py-section bg-white">
        <div className="container">
          <SectionHeader label="PACKAGES" title="Angebote für Vereine und Athlet:innen" />
          
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <div className="border border-border bg-surface p-8 rounded-card hover:border-border2 transition-colors">
              <h3 className="text-xl font-semibold text-text-primary mb-4">Saisonprogramm</h3>
              <p className="text-sm text-text-secondary mb-6">Für Sportvereine und Mannschaften</p>
              <div className="space-y-4 mb-8">
                <div><p className="text-sm font-semibold uppercase tracking-wider text-text-muted mb-1">Für wen</p><p className="text-sm text-text-secondary">Vereine, Jugendteams, Mannschaften</p></div>
                <div><p className="text-sm font-semibold uppercase tracking-wider text-text-muted mb-1">Inhalt</p><p className="text-sm text-text-secondary">Neuro-Edukation, Neurotrainingssessions, individuelle Betreuung bei Bedarf</p></div>
                <div><p className="text-sm font-semibold uppercase tracking-wider text-text-muted mb-1">Dauer</p><p className="text-sm text-text-secondary">Ganze Saison (8+ Monate)</p></div>
                <div><p className="text-sm font-semibold uppercase tracking-wider text-text-muted mb-1">App</p><p className="text-sm text-text-secondary">Zugang für alle Spieler:innen</p></div>
              </div>
              <CTABlock primary={{ text: "Auf Anfrage", href: "/kontakt" }} />
            </div>

            <div className="border border-primary-accent bg-surface p-8 rounded-card hover:border-primary-accent transition-colors">
              <h3 className="text-xl font-semibold text-text-primary mb-4">Einzelsportler:innen</h3>
              <p className="text-sm text-text-secondary mb-6">Für ambitionierte Athlet:innen im Leistungsbereich</p>
              <div className="space-y-4 mb-8">
                <div><p className="text-sm font-semibold uppercase tracking-wider text-text-muted mb-1">Für wen</p><p className="text-sm text-text-secondary">Einzelsportler:innen, Leistungssport</p></div>
                <div><p className="text-sm font-semibold uppercase tracking-wider text-text-muted mb-1">Inhalt</p><p className="text-sm text-text-secondary">Individuelle Analysen, Trainingspläne, neurologische Sicherheit</p></div>
                <div><p className="text-sm font-semibold uppercase tracking-wider text-text-muted mb-1">Dauer</p><p className="text-sm text-text-secondary">Auf Anfrage und individuell vereinbart</p></div>
                <div><p className="text-sm font-semibold uppercase tracking-wider text-text-muted mb-1">App</p><p className="text-sm text-text-secondary">Voller Zugang mit personalisiertem Dashboard</p></div>
              </div>
              <CTABlock primary={{ text: "Auf Anfrage", href: "/kontakt" }} />
            </div>
          </div>
        </div>
      </section>

      <section className="py-section-mobile md:py-section bg-surface">
        <div className="container">
          <SectionHeader label="CONTACT" title="Bereit für nachhaltige Performance?" />
          <div className="mt-12"><CTABlock primary={{ text: "Sports-Gespräch buchen", href: "/kontakt" }} /></div>
        </div>
      </section>
    </div>
  );
}
