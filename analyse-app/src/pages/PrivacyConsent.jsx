import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Shield, CheckCircle, AlertCircle, FileText, Lock, Database, Trash2 } from 'lucide-react';

const PrivacyConsent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [consents, setConsents] = useState({
    dataCollection: false,
    dataStorage: false,
    dataProcessing: false,
    ageConfirmation: false
  });
  const [showFullPolicy, setShowFullPolicy] = useState(false);

  const allConsentsGiven = Object.values(consents).every(v => v);

  const handleConsent = (key) => {
    setConsents(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleAcceptAll = () => {
    setConsents({
      dataCollection: true,
      dataStorage: true,
      dataProcessing: true,
      ageConfirmation: true
    });
  };

  const handleContinue = async () => {
    if (allConsentsGiven) {
      try {
        // Save consent to database
        await fetch('/api/consent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            consents,
            user_agent: navigator.userAgent
          })
        });
      } catch (error) {
        console.error('Error saving consent:', error);
      }
      
      const returnTo = location.state?.returnTo || '/new-test';
      navigate(returnTo, { state: { privacyAccepted: true } });
    }
  };

  const handleDecline = () => {
    navigate('/');
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="glass-card p-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="p-4 bg-provoid-500/20 rounded-2xl">
            <img src="/analyse/provoid-logo.png" alt="PROVOID Logo" className="h-12 w-auto object-contain" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Datenschutzerklärung</h1>
            <p className="text-gray-500">PROVOID NeuroAthletic Analyse</p>
          </div>
        </div>

        {/* Introduction */}
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <Shield className="w-6 h-6 text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-blue-300">Datenschutz ist uns wichtig</p>
              <p className="text-sm text-gray-600 mt-1">
                Vor der Durchführung der neuroathletischen Testung benötigen wir Ihre Einwilligung zur Verarbeitung der erhobenen Daten.
              </p>
            </div>
          </div>
        </div>

        {/* Privacy Policy Summary */}
        <div className="space-y-4 mb-8">
          <h2 className="font-semibold flex items-center gap-2">
            <FileText className="w-5 h-5 text-provoid-400" />
            Zusammenfassung der Datenschutzbestimmungen
          </h2>

          <div className="space-y-3">
            <div className="bg-provoid-400/5 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <Database className="w-5 h-5 text-provoid-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Erhobene Daten</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Wir erfassen personenbezogene Daten (Name, Geburtsdatum, Team, Position) sowie Testergebnisse der neuroathletischen Analyse (Reaktionszeiten, Genauigkeit, kognitive Leistungswerte).
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-provoid-400/5 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <Lock className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Datensicherheit</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Alle Daten werden lokal in einer verschlüsselten SQLite-Datenbank gespeichert. Es erfolgt keine Übertragung an externe Server. Der Zugriff ist auf autorisierte Trainer und Betreuer beschränkt.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-provoid-400/5 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <Trash2 className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Datenaufbewahrung & Löschung</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Daten werden nur so lange gespeichert, wie es für die Analyse und Trainingsplanung erforderlich ist. Sie haben jederzeit das Recht auf Auskunft, Berichtigung und Löschung Ihrer Daten.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => setShowFullPolicy(!showFullPolicy)}
            className="text-provoid-400 hover:text-provoid-300 text-sm underline"
          >
            {showFullPolicy ? 'Weniger anzeigen' : 'Vollständige Datenschutzerklärung anzeigen'}
          </button>

          {showFullPolicy && (
            <div className="bg-provoid-400/5 rounded-xl p-6 text-sm text-gray-600 space-y-4 max-h-96 overflow-y-auto">
              <h3 className="font-semibold text-gray-800">Vollständige Datenschutzerklärung</h3>
              
              <div>
                <h4 className="font-medium text-gray-800 mb-2">1. Verantwortlicher</h4>
                <p>PROVOID NeuroAthletic ist verantwortlich für die Verarbeitung Ihrer personenbezogenen Daten im Rahmen dieser Anwendung.</p>
              </div>

              <div>
                <h4 className="font-medium text-gray-800 mb-2">2. Zweck der Datenverarbeitung</h4>
                <p>Die erhobenen Daten dienen ausschließlich der:</p>
                <ul className="list-disc ml-5 mt-2 space-y-1">
                  <li>Durchführung neuroathletischer Leistungstests</li>
                  <li>Erstellung individueller Leistungsprofile</li>
                  <li>Verfolgung der sportlichen Entwicklung über Zeit</li>
                  <li>Optimierung von Trainingsplänen</li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-gray-800 mb-2">3. Art der erhobenen Daten</h4>
                <ul className="list-disc ml-5 space-y-1">
                  <li>Personenstammdaten: Name, Geburtsdatum, Team, Position</li>
                  <li>Leistungsdaten: Reaktionszeiten, Genauigkeitswerte, kognitive Testergebnisse</li>
                  <li>Technische Daten: Zeitstempel der Testdurchführung</li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-gray-800 mb-2">4. Rechtsgrundlage</h4>
                <p>Die Verarbeitung erfolgt auf Grundlage Ihrer ausdrücklichen Einwilligung gemäß Art. 6 Abs. 1 lit. a DSGVO. Bei Minderjährigen ist die Einwilligung der Erziehungsberechtigten erforderlich.</p>
              </div>

              <div>
                <h4 className="font-medium text-gray-800 mb-2">5. Datenspeicherung</h4>
                <p>Alle Daten werden ausschließlich lokal auf dem verwendeten Gerät gespeichert. Es erfolgt keine Übertragung an Cloud-Dienste oder externe Server.</p>
              </div>

              <div>
                <h4 className="font-medium text-gray-800 mb-2">6. Ihre Rechte</h4>
                <p>Sie haben das Recht auf:</p>
                <ul className="list-disc ml-5 mt-2 space-y-1">
                  <li>Auskunft über Ihre gespeicherten Daten</li>
                  <li>Berichtigung unrichtiger Daten</li>
                  <li>Löschung Ihrer Daten</li>
                  <li>Widerruf Ihrer Einwilligung</li>
                  <li>Datenportabilität</li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-gray-800 mb-2">7. Kontakt</h4>
                <p>Bei Fragen zum Datenschutz wenden Sie sich bitte an Ihren Trainer oder die PROVOID-Verantwortlichen.</p>
              </div>
            </div>
          )}
        </div>

        {/* Consent Checkboxes */}
        <div className="space-y-3 mb-8">
          <h2 className="font-semibold mb-4">Einwilligungen</h2>

          <label className="flex items-start gap-3 p-3 bg-provoid-400/5 rounded-xl cursor-pointer hover:bg-provoid-400/10 transition-colors">
            <input
              type="checkbox"
              checked={consents.dataCollection}
              onChange={() => handleConsent('dataCollection')}
              className="mt-1 w-5 h-5 rounded border-gray-500 bg-provoid-400/10 text-provoid-500 focus:ring-provoid-500 focus:ring-offset-0"
            />
            <div>
              <p className="font-medium">Datenerhebung</p>
              <p className="text-sm text-gray-500">Ich willige in die Erhebung meiner personenbezogenen Daten und Testergebnisse ein.</p>
            </div>
          </label>

          <label className="flex items-start gap-3 p-3 bg-provoid-400/5 rounded-xl cursor-pointer hover:bg-provoid-400/10 transition-colors">
            <input
              type="checkbox"
              checked={consents.dataStorage}
              onChange={() => handleConsent('dataStorage')}
              className="mt-1 w-5 h-5 rounded border-gray-500 bg-provoid-400/10 text-provoid-500 focus:ring-provoid-500 focus:ring-offset-0"
            />
            <div>
              <p className="font-medium">Datenspeicherung</p>
              <p className="text-sm text-gray-500">Ich willige in die lokale Speicherung meiner Daten für Analysezwecke ein.</p>
            </div>
          </label>

          <label className="flex items-start gap-3 p-3 bg-provoid-400/5 rounded-xl cursor-pointer hover:bg-provoid-400/10 transition-colors">
            <input
              type="checkbox"
              checked={consents.dataProcessing}
              onChange={() => handleConsent('dataProcessing')}
              className="mt-1 w-5 h-5 rounded border-gray-500 bg-provoid-400/10 text-provoid-500 focus:ring-provoid-500 focus:ring-offset-0"
            />
            <div>
              <p className="font-medium">Datenverarbeitung</p>
              <p className="text-sm text-gray-500">Ich willige in die Verarbeitung meiner Daten zur Erstellung von Leistungsprofilen ein.</p>
            </div>
          </label>

          <label className="flex items-start gap-3 p-3 bg-provoid-400/5 rounded-xl cursor-pointer hover:bg-provoid-400/10 transition-colors">
            <input
              type="checkbox"
              checked={consents.ageConfirmation}
              onChange={() => handleConsent('ageConfirmation')}
              className="mt-1 w-5 h-5 rounded border-gray-500 bg-provoid-400/10 text-provoid-500 focus:ring-provoid-500 focus:ring-offset-0"
            />
            <div>
              <p className="font-medium">Altersbestätigung</p>
              <p className="text-sm text-gray-500">Ich bestätige, dass ich volljährig bin oder die Einwilligung meiner Erziehungsberechtigten vorliegt.</p>
            </div>
          </label>
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <button
            onClick={handleDecline}
            className="flex-1 px-6 py-3 bg-provoid-400/10 hover:bg-white/20 rounded-xl font-medium transition-colors"
          >
            Ablehnen
          </button>
          <button
            onClick={handleAcceptAll}
            className="px-6 py-3 bg-provoid-400/10 hover:bg-white/20 rounded-xl font-medium transition-colors"
          >
            Alle akzeptieren
          </button>
          <button
            onClick={handleContinue}
            disabled={!allConsentsGiven}
            className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
              allConsentsGiven
                ? 'bg-gradient-to-r from-provoid-500 to-blue-500 hover:opacity-90'
                : 'bg-gray-600 cursor-not-allowed opacity-50'
            }`}
          >
            <CheckCircle className="w-5 h-5" />
            Weiter zur Testung
          </button>
        </div>

        {!allConsentsGiven && (
          <p className="text-center text-sm text-amber-400 mt-4 flex items-center justify-center gap-2">
            <AlertCircle className="w-4 h-4" />
            Bitte alle Einwilligungen erteilen, um fortzufahren
          </p>
        )}
      </div>
    </div>
  );
};

export default PrivacyConsent;
