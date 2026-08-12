"use client";

import { SectionHeader } from "@/components/SectionHeader";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function Datenschutz() {
  const { t } = useLanguage();
  return (
    <div className="flex flex-col">
      <section className="relative py-section-mobile md:py-section bg-surface overflow-hidden">
        <div className="container relative z-10">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-text-primary mb-6">
              DATENSCHUTZ
            </h1>
            <p className="text-lg md:text-xl text-text-secondary mb-8 max-w-3xl">
              {t("Ihre Privatsphäre ist uns wichtig.", "Your privacy is important to us.")}
            </p>
          </div>
        </div>
      </section>

      <section className="py-section-mobile md:py-section bg-white">
        <div className="container">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-semibold text-text-primary mb-6">{t("Datenschutzerklärung", "Privacy Policy")}</h2>
            
            <div className="space-y-6 text-text-secondary">
              <p>
                {t("Wir nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.", "We take the protection of your personal data very seriously. We treat your personal data confidentially and in accordance with statutory data protection regulations and this privacy policy.")}
              </p>

              <h3 className="text-xl font-semibold text-text-primary mt-8 mb-4">{t("Datenerfassung auf unserer Website", "Data Collection on Our Website")}</h3>
              <p>
                {t("Wenn Sie unsere Website besuchen, werden vorübergehend Daten über den Zugriff auf unsere Website auf unserem Server gespeichert. Diese Daten umfassen:", "When you visit our website, data about access to our website is temporarily stored on our server. This data includes:")}
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>{t("IP-Adresse des anfragenden Rechners", "IP address of the requesting computer")}</li>
                <li>{t("Datum und Uhrzeit des Zugriffs", "Date and time of access")}</li>
                <li>{t("Name und URL der abgerufenen Datei", "Name and URL of the retrieved file")}</li>
                <li>{t("Website, von der aus der Zugriff erfolgte (Referrer-URL)", "Website from which access occurred (referrer URL)")}</li>
                <li>{t("Browsertyp und Browserversion", "Browser type and browser version")}</li>
                <li>{t("Betriebssystem", "Operating system")}</li>
              </ul>

              <h3 className="text-xl font-semibold text-text-primary mt-8 mb-4">Cookies</h3>
              <p>
                {t("Unsere Website verwendet keine Cookies, um personenbezogene Daten zu speichern. Es werden ausschließlich technisch notwendige Cookies für den Betrieb der Website verwendet.", "Our website does not use cookies to store personal data. Only technically necessary cookies are used to operate the website.")}
              </p>

              <h3 className="text-xl font-semibold text-text-primary mt-8 mb-4">{t("Kontaktformular", "Contact Form")}</h3>
              <p>
                {t("Wenn Sie uns über das Kontaktformular oder per E-Mail kontaktieren, werden die von Ihnen übermittelten Daten (Name, E-Mail-Adresse, ggf. Telefonnummer und Ihre Nachricht) zwecks Bearbeitung Ihrer Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.", "If you contact us via the contact form or by email, the data you submit (name, email address, phone number if applicable, and your message) will be stored by us for the purpose of processing your inquiry and for any follow-up questions. We will not share this data without your consent.")}
              </p>

              <h3 className="text-xl font-semibold text-text-primary mt-8 mb-4">{t("Ihre Rechte", "Your Rights")}</h3>
              <p>
                {t("Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung, Löschung oder Einschränkung der Verarbeitung Ihrer Daten zu verlangen.", "You have the right at any time to receive free information about the origin, recipient and purpose of your stored personal data. You also have the right to request correction, deletion or restriction of the processing of your data.")}
              </p>

              <h3 className="text-xl font-semibold text-text-primary mt-8 mb-4">{t("Kontakt bei Datenschutzfragen", "Contact for Privacy Questions")}</h3>
              <p>
                {t("Bei Fragen zum Datenschutz können Sie sich jederzeit an uns wenden:", "If you have any questions about data protection, please feel free to contact us at any time:")}
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
