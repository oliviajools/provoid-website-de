import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, Activity, TrendingUp, ChevronRight, User } from 'lucide-react';
import { apiUrl } from '../config/api';
import ScoreRing from '../components/ScoreRing';

const Dashboard = () => {
  const [stats, setStats] = useState({ players: 0, sessions: 0, avgScore: 0 });
  const [recentSessions, setRecentSessions] = useState([]);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [playersRes, sessionsRes] = await Promise.all([
        fetch(apiUrl('/api/players')),
        fetch(apiUrl('/api/sessions'))
      ]);
      
      const players = await playersRes.json();
      const sessions = await sessionsRes.json();
      
      const completedSessions = sessions.filter(s => s.completed);
      const avgScore = completedSessions.length > 0
        ? completedSessions.reduce((sum, s) => sum + (s.total_score || 0), 0) / completedSessions.length
        : 0;
      
      setStats({
        players: players.length,
        sessions: completedSessions.length,
        avgScore: Math.round(avgScore)
      });
      
      setRecentSessions(sessions.slice(0, 5));
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const categories = [
    {
      name: 'Bewegungsplanung & -ausführung',
      areas: 'Prämotorischer Kortex, Basalganglien, Kleinhirn',
      icon: '🧠',
      color: 'from-provoid-500 to-cyan-700',
      details: 'Der prämotorische Kortex plant komplexe Bewegungssequenzen, während die Basalganglien (Striatum, Globus pallidus) Bewegungen initiieren und modulieren. Das Kleinhirn (Cerebellum) koordiniert Timing und Feinmotorik durch Feedforward-Kontrolle.',
      functions: ['Reaktionszeit', 'Bewegungssequenzen', 'Motorisches Lernen', 'Timing-Präzision']
    },
    {
      name: 'Wahrnehmung & Orientierung',
      areas: 'Parietallappen, Visueller Kortex, Vestibuläres System',
      icon: '👁️',
      color: 'from-blue-500 to-blue-700',
      details: 'Der posteriore Parietalkortex (PPC) integriert visuelle, propriozeptive und vestibuläre Informationen für räumliche Orientierung. Die Area V5/MT verarbeitet Bewegung, während der vestibuläre Kortex Gleichgewicht und Kopfposition kodiert.',
      functions: ['Räumliche Orientierung', 'Bewegungserkennung', 'Peripheres Sehen', 'Tiefenwahrnehmung']
    },
    {
      name: 'Situationsanalyse & Entscheidungsfindung',
      areas: 'Präfrontaler Kortex, Anteriorer Cingulärer Kortex',
      icon: '⚡',
      color: 'from-amber-500 to-orange-600',
      details: 'Der dorsolaterale präfrontale Kortex (DLPFC) ermöglicht strategisches Denken und Arbeitsgedächtnis. Der anteriore cinguläre Kortex (ACC) überwacht Konflikte und optimiert Entscheidungen unter Unsicherheit durch Kosten-Nutzen-Analyse.',
      functions: ['Mustererkennung', 'Taktische Entscheidungen', 'Antizipation', 'Konfliktlösung']
    },
    {
      name: 'Aufmerksamkeit & Fokus',
      areas: 'Dorsales & Ventrales Aufmerksamkeitsnetzwerk',
      icon: '🎯',
      color: 'from-green-500 to-emerald-600',
      details: 'Das dorsale Netzwerk (FEF, IPS) steuert zielgerichtete Aufmerksamkeit "top-down". Das ventrale Netzwerk (TPJ, VFC) reagiert auf unerwartete Reize "bottom-up". Der Locus coeruleus moduliert Alertness über Noradrenalin.',
      functions: ['Daueraufmerksamkeit', 'Selektive Aufmerksamkeit', 'Geteilte Aufmerksamkeit', 'Vigilanz']
    },
    {
      name: 'Körperliche Selbstregulation',
      areas: 'Insula, Limbisches System, Autonomes Nervensystem',
      icon: '💪',
      color: 'from-pink-500 to-rose-600',
      details: 'Die Insula integriert interozeptive Signale (Herzschlag, Atmung) für Körperbewusstsein. Die Amygdala und der Hypothalamus regulieren Stressreaktion. Der Vagusnerv vermittelt parasympathische Entspannung und beeinflusst die Herzratenvariabilität (HRV).',
      functions: ['Impulskontrolle', 'Stressregulation', 'Atemkohärenz', 'Erregungssteuerung']
    }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Hero Section */}
      <div className="glass-card p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-provoid-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-provoid-500/10 rounded-full blur-3xl"></div>
        
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2">
            Neuroathletische Leistungsdiagnostik
          </h1>
          <p className="text-gray-500 max-w-2xl mb-6">
            Wissenschaftlich fundierte Analyse kognitiver und sensomotorischer Fähigkeiten 
            für optimale sportliche Leistung. Basierend auf aktueller neurowissenschaftlicher Forschung.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-provoid-500 to-provoid-600 text-white rounded-xl font-semibold hover:opacity-90 transition-opacity"
            >
              <User className="w-5 h-5" />
              Mit Code anmelden
            </Link>
                      </div>
        </div>
      </div>


      {/* Test Categories */}
      <div className="glass-card p-6">
        <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
          <img src="/analyse/provoid-logo.png" alt="PROVOID" className="h-7 w-auto object-contain" />
          Testbereiche & Neurowissenschaftliche Grundlagen
        </h2>
        <p className="text-gray-500 text-sm mb-6">
          Jeder Testbereich basiert auf aktueller neurowissenschaftlicher Forschung und misst spezifische kognitive sowie sensomotorische Fähigkeiten.
        </p>
        
        <div className="space-y-4">
          {categories.map((cat, idx) => (
            <div key={idx} className="p-5 rounded-xl bg-provoid-400/5 hover:bg-provoid-400/10 transition-colors border border-provoid-400/10">
              <div className="flex items-start gap-4">
                <span className="text-3xl">{cat.icon}</span>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-gray-800">{cat.name}</h3>
                  <p className="text-sm text-provoid-500 font-medium mt-1">{cat.areas}</p>
                  <p className="text-sm text-gray-600 mt-2 leading-relaxed">{cat.details}</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {cat.functions.map((fn, i) => (
                      <span key={i} className="px-2 py-1 bg-provoid-500/10 text-provoid-600 text-xs rounded-full font-medium">
                        {fn}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Neuroscience Info Section */}
      <div className="glass-card p-6">
        <h2 className="text-xl font-semibold mb-4">🔬 Wissenschaftlicher Hintergrund</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
              <h4 className="font-semibold text-blue-400 mb-2">Kortikale Verarbeitung</h4>
              <p className="text-sm text-gray-600">
                Der <strong>präfrontale Kortex</strong> ist das "Kommandozentrum" für Planung und Entscheidungsfindung. 
                Er arbeitet eng mit dem <strong>parietalen Kortex</strong> zusammen, der räumliche Informationen verarbeitet, 
                und dem <strong>motorischen Kortex</strong>, der Bewegungen ausführt.
              </p>
            </div>
            
            <div className="p-4 bg-green-500/10 rounded-xl border border-green-500/20">
              <h4 className="font-semibold text-green-400 mb-2">Subkortikale Strukturen</h4>
              <p className="text-sm text-gray-600">
                Die <strong>Basalganglien</strong> (Striatum, Pallidum) sind entscheidend für automatisierte Bewegungen 
                und prozedurales Lernen. Das <strong>Kleinhirn</strong> verfeinert Bewegungen durch Fehlerkorrektur 
                und ist essentiell für Timing und Koordination.
              </p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="p-4 bg-amber-500/10 rounded-xl border border-amber-500/20">
              <h4 className="font-semibold text-amber-400 mb-2">Aufmerksamkeitsnetzwerke</h4>
              <p className="text-sm text-gray-600">
                Das <strong>dorsale Aufmerksamkeitsnetzwerk</strong> (frontales Augenfeld, intraparietaler Sulcus) 
                ermöglicht zielgerichtete Aufmerksamkeit. Das <strong>ventrale Netzwerk</strong> reagiert auf 
                unerwartete, aber relevante Reize – wichtig für schnelle Reaktionen im Sport.
              </p>
            </div>
            
            <div className="p-4 bg-pink-500/10 rounded-xl border border-pink-500/20">
              <h4 className="font-semibold text-pink-400 mb-2">Autonome Regulation</h4>
              <p className="text-sm text-gray-600">
                Der <strong>Vagusnerv</strong> verbindet Gehirn und Körper und beeinflusst die Herzratenvariabilität (HRV). 
                Hohe HRV korreliert mit besserer Stressresistenz und kognitiver Flexibilität. 
                Die <strong>Insula</strong> ermöglicht Körperbewusstsein und emotionale Regulation.
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-provoid-500/10 rounded-xl border border-provoid-500/20">
          <h4 className="font-semibold text-provoid-400 mb-2">📚 Evidenzbasierte Testverfahren</h4>
          <p className="text-sm text-gray-600">
            Unsere Tests basieren auf etablierten neuropsychologischen Paradigmen: <strong>Go/No-Go</strong> für 
            inhibitorische Kontrolle, <strong>Stroop-ähnliche Aufgaben</strong> für selektive Aufmerksamkeit, 
            <strong>Dual-Task-Paradigmen</strong> für geteilte Aufmerksamkeit, und <strong>Atemkohärenz-Training</strong> 
            für autonome Selbstregulation. Diese Methoden werden in der klinischen Neuropsychologie und 
            Sportpsychologie weltweit eingesetzt.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
