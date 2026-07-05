import { SectionHeader } from "@/components/SectionHeader";

export default function Datenschutz() {
  return (
    <div className="flex flex-col">
      <section className="relative py-section-mobile md:py-section bg-surface overflow-hidden">
        <div className="container relative z-10">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-text-primary mb-6">
              DATENSCHUTZ
            </h1>
            <p className="text-lg md:text-xl text-text-secondary mb-8 max-w-3xl">
              Ihre Privatsphäre ist uns wichtig.
            </p>
          </div>
        </div>
      </section>

      <section className="py-section-mobile md:py-section bg-white">
        <div className="container">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-semibold text-text-primary mb-6">Datenschutzerklärung</h2>
            
            <div className="space-y-6 text-text-secondary">
              <p>
                Wir nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.
              </p>

              <h3 className="text-xl font-semibold text-text-primary mt-8 mb-4">Datenerfassung auf unserer Website</h3>
              <p>
                Wenn Sie unsere Website besuchen, werden vorübergehend Daten über den Zugriff auf unsere Website auf unserem Server gespeichert. Diese Daten umfassen:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>IP-Adresse des anfragenden Rechners</li>
                <li>Datum und Uhrzeit des Zugriffs</li>
                <li>Name und URL der abgerufenen Datei</li>
                <li>Website, von der aus der Zugriff erfolgte (Referrer-URL)</li>
                <li>Browsertyp und Browserversion</li>
                <li>Betriebssystem</li>
              </ul>

              <h3 className="text-xl font-semibold text-text-primary mt-8 mb-4">Cookies</h3>
              <p>
                Unsere Website verwendet keine Cookies, um personenbezogene Daten zu speichern. Es werden ausschließlich technisch notwendige Cookies für den Betrieb der Website verwendet.
              </p>

              <h3 className="text-xl font-semibold text-text-primary mt-8 mb-4">Kontaktformular</h3>
              <p>
                Wenn Sie uns über das Kontaktformular oder per E-Mail kontaktieren, werden die von Ihnen übermittelten Daten (Name, E-Mail-Adresse, ggf. Telefonnummer und Ihre Nachricht) zwecks Bearbeitung Ihrer Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
              </p>

              <h3 className="text-xl font-semibold text-text-primary mt-8 mb-4">Ihre Rechte</h3>
              <p>
                Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung, Löschung oder Einschränkung der Verarbeitung Ihrer Daten zu verlangen.
              </p>

              <h3 className="text-xl font-semibold text-text-primary mt-8 mb-4">Kontakt bei Datenschutzfragen</h3>
              <p>
                Bei Fragen zum Datenschutz können Sie sich jederzeit an uns wenden:
              </p>
              <p>
                E-Mail: <a href="mailto:olivia@provoid.de" className="text-primary-accent hover:text-primary-light transition-colors">olivia@provoid.de</a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
