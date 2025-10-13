import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Datenschutz | PROVOID",
  description: "Datenschutzerklärung der PROVOID-App und -Webseite gemäß DSGVO.",
  alternates: {
    canonical: "/datenschutz",
  },
};

export default function DatenschutzPage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative bg-gradient-to-b from-primary/10 to-background py-16 md:py-24">
        <div className="container px-4 md:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl">Datenschutz</h1>
            <p className="text-lg text-muted-foreground">Informationen gemäß DSGVO</p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="container px-4 md:px-6 lg:px-8 py-12 md:py-16">
        <div className="mx-auto max-w-3xl space-y-8 text-muted-foreground">
          <div className="rounded-2xl border bg-card px-6 py-6 shadow-sm space-y-6">
            <p>
              Wir nehmen Ihren Datenschutz sehr ernst. Diese Datenschutzerklärung erläutert, welche Daten wir in der
              Provoid-App und PROVOID-Webseite verarbeiten, zu welchen Zwecken und welche Rechte Sie gemäß DSGVO haben.
              Diese Informationen gelten für iOS und Android.
            </p>

            <div>
              <h2 className="mb-2 text-xl font-semibold tracking-tight">1. Verantwortlicher & Kontakt</h2>
              <p>Verantwortlich: PROVOID (App-Betreiber)</p>
              <p>Kontakt: <a className="text-foreground hover:underline" href="mailto:oliviabahr@avoid-procrastination-provoid.com">oliviabahr@avoid-procrastination-provoid.com</a></p>
            </div>

            <div>
              <h2 className="mb-2 text-xl font-semibold tracking-tight">2. Welche Daten wir verarbeiten</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Kontodaten:</strong> Pseudonymisierte Anmeldedaten (E-Mail‑ähnliche Logins ohne private E‑Mail) und UID für Registrierung/Anmeldung (Firebase Authentication)</li>
                <li><strong>Nutzungs-/ Trainingsdaten:</strong> Scores, Tool-Nutzung, Fortschritt, Leaderboards (Firestore)</li>
                <li><strong>Team-/Vereinszuordnung:</strong> falls von Ihnen hinzugefügt (Firestore)</li>
                <li><strong>Medien/Audiodaten:</strong> Audioausgabe für Trainingszwecke (expo-av). Keine Mikrofonaufnahmen.</li>
                <li><strong>Technische Basisdaten:</strong> App-Version, Installations-/Gerätemetadaten, soweit für Betrieb/Fehlerbehebung erforderlich.</li>
              </ul>
              <p className="mt-2">Hinweis: Es werden keine privaten E‑Mail‑Adressen erhoben. Die Registrierung ist ausschließlich mit zuvor von uns vergebenen, in der Datenbank hinterlegten Anmeldedaten möglich.</p>
            </div>

            <div>
              <h2 className="mb-2 text-xl font-semibold tracking-tight">3. Zwecke und Rechtsgrundlagen (DSGVO)</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Bereitstellung der App-Funktionen (Art. 6 Abs. 1 lit. b DSGVO – Vertrag/ähnliches Nutzungsverhältnis)</li>
                <li>Sicherheit, Missbrauchs- und Betrugsprävention (Art. 6 Abs. 1 lit. f DSGVO – berechtigtes Interesse)</li>
                <li>Hintergrund-Audio für Trainings-Tools (Art. 6 Abs. 1 lit. b/f DSGVO)</li>
              </ul>
            </div>

            <div>
              <h2 className="mb-2 text-xl font-semibold tracking-tight">4. Speicherorte, Auftragsverarbeiter & Drittanbieter</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Google Firebase (Authentication, Cloud Firestore, ggf. Storage) – Google LLC als Auftragsverarbeiter</li>
                <li>Expo (Over-the-Air Updates/Dev-Services) – Nutzung für App-Bereitstellung/Updates</li>
                <li>Es werden aktuell keine separaten Analytics- oder Crash-Reporting-SDKs eingesetzt.</li>
              </ul>
            </div>

            <div>
              <h2 className="mb-2 text-xl font-semibold tracking-tight">5. Internationale Datenübermittlungen</h2>
              <p>Firebase kann Daten global speichern/verarbeiten. Es werden geeignete Garantien (z. B. EU-Standardvertragsklauseln) durch Google bereitgestellt. Wir stellen sicher, dass ein angemessenes Datenschutzniveau besteht.</p>
            </div>

            <div>
              <h2 className="mb-2 text-xl font-semibold tracking-tight">6. Speicherdauer & Löschung</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Kontodaten und Trainingsdaten speichern wir für die Dauer der Nutzung.</li>
                <li>Auf Anfrage löschen wir Ihr Konto und zugehörige Daten, sofern keine gesetzlichen Pflichten entgegenstehen.</li>
                <li>Backups/Protokolle können aus Sicherheitsgründen befristet vorgehalten werden.</li>
              </ul>
            </div>

            <div>
              <h2 className="mb-2 text-xl font-semibold tracking-tight">7. Ihre Rechte (DSGVO)</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit</li>
                <li>Widerspruch gegen Verarbeitungen auf Grundlage berechtigter Interessen</li>
                <li>Beschwerderecht bei einer Datenschutzaufsichtsbehörde</li>
              </ul>
              <p className="mt-2">Kontakt zur Ausübung: <a className="text-foreground hover:underline" href="mailto:oliviabahr@avoid-procrastination-provoid.com">oliviabahr@avoid-procrastination-provoid.com</a></p>
            </div>

            <div>
              <h2 className="mb-2 text-xl font-semibold tracking-tight">8. Kinder/Jugendliche</h2>
              <p>Die App richtet sich nicht an Kinder unter 13 Jahren. Für Minderjährige sind die gesetzlichen Vorgaben zu Einwilligungen/Erziehungsberechtigten zu beachten.</p>
            </div>

            <div>
              <h2 className="mb-2 text-xl font-semibold tracking-tight">9. App-spezifische Hinweise iOS/Android</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>iOS: Hintergrund-Audio (UIBackgroundModes: audio) kann für Trainingszwecke aktiv sein.</li>
                <li>Android: Audio-Berechtigungen ausschließlich für die Trainingsfunktionen.</li>
                <li>Es erfolgt keine Kamera- oder Standortnutzung.</li>
              </ul>
            </div>

            <div>
              <h2 className="mb-2 text-xl font-semibold tracking-tight">10. Externe Datenschutz-URL</h2>
              <p>Eine öffentlich zugängliche Datenschutz-URL wird in der App und im App Store hinterlegt, sobald verfügbar.</p>
            </div>

            <p className="text-sm">Letzte Aktualisierung: 2025-10-05</p>
          </div>
        </div>
      </section>
    </div>
  );
}
