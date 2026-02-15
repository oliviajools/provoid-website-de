import React, { useState, useEffect, useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Download, TrendingUp, AlertTriangle, CheckCircle, Target } from 'lucide-react';
import { apiUrl } from '../config/api';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';
import ScoreRing from '../components/ScoreRing';

const Results = () => {
  const { sessionId } = useParams();
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);
  const reportRef = useRef(null);

  useEffect(() => {
    fetchSession();
  }, [sessionId]);

  const fetchSession = async () => {
    try {
      const res = await fetch(apiUrl(`/api/sessions/${sessionId}`));
      const data = await res.json();
      setSession(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching session:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <img src="/analyse/provoid-logo.png" alt="PROVOID" className="h-16 w-auto object-contain animate-pulse" />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Session nicht gefunden</p>
        <Link to="/" className="text-provoid-400 hover:text-provoid-300 mt-4 inline-block">
          Zurück zum Dashboard
        </Link>
      </div>
    );
  }

  // Group results by category
  const categoryResults = {};
  const categoryLabels = {
    movement_planning: 'Bewegungsplanung',
    perception: 'Wahrnehmung',
    decision_making: 'Entscheidungsfindung',
    attention: 'Aufmerksamkeit',
    self_regulation: 'Selbstregulation'
  };

  const categoryDescriptions = {
    movement_planning: {
      brain: 'Prämotorischer Kortex, Supplementär-motorisches Areal, Basalganglien, Kleinhirn',
      function: 'Planung und Koordination von Bewegungsabläufen, motorisches Lernen',
      relevance: 'Wichtig für technische Ausführung, Timing bei Pässen und Schüssen'
    },
    perception: {
      brain: 'Visueller Kortex (V1-V5), Parietallappen, Vestibuläres System',
      function: 'Visuelle Verarbeitung, räumliche Orientierung, Objektverfolgung',
      relevance: 'Spielübersicht, Gegner- und Mitspielerwahrnehmung, Raumgefühl'
    },
    decision_making: {
      brain: 'Dorsolateraler präfrontaler Kortex, Anteriorer cingulärer Kortex, Orbitofrontaler Kortex',
      function: 'Exekutive Funktionen, Konfliktüberwachung, Handlungsauswahl',
      relevance: 'Taktische Entscheidungen, Spielintelligenz, Antizipation'
    },
    attention: {
      brain: 'Dorsales & Ventrales Aufmerksamkeitsnetzwerk, Frontaler Augenfelder',
      function: 'Selektive und geteilte Aufmerksamkeit, Vigilanz',
      relevance: 'Konzentration über 90 Minuten, Multitasking, Ballbeobachtung'
    },
    self_regulation: {
      brain: 'Insula, Limbisches System (Amygdala), Präfrontale Kontrollregionen',
      function: 'Emotionsregulation, Impulskontrolle, Stressmanagement',
      relevance: 'Leistung unter Druck, Frustrationstoleranz, Erholung'
    }
  };

  session.results?.forEach(r => {
    if (!categoryResults[r.category]) {
      categoryResults[r.category] = [];
    }
    categoryResults[r.category].push(r);
  });

  // Calculate category averages
  const categoryScores = Object.entries(categoryResults).map(([category, results]) => ({
    category,
    label: categoryLabels[category] || category,
    score: results.reduce((sum, r) => sum + r.normalized_score, 0) / results.length,
    results
  }));

  // Radar chart data
  const radarData = categoryScores.map(cs => ({
    subject: cs.label,
    score: Math.round(cs.score),
    fullMark: 100
  }));

  // Get score interpretation - evidenzbasierte Klassifikation
  const getScoreInterpretation = (score) => {
    if (score >= 85) return { 
      label: 'Exzellent', 
      sublabel: 'Top 15% der Altersgruppe',
      color: 'text-emerald-400', 
      bg: 'bg-emerald-500/20',
      border: 'border-emerald-500/50'
    };
    if (score >= 70) return { 
      label: 'Überdurchschnittlich', 
      sublabel: 'Obere 30% der Altersgruppe',
      color: 'text-provoid-400', 
      bg: 'bg-provoid-500/20',
      border: 'border-provoid-500/50'
    };
    if (score >= 55) return { 
      label: 'Durchschnittlich', 
      sublabel: 'Mittlere 40% der Altersgruppe',
      color: 'text-blue-400', 
      bg: 'bg-blue-500/20',
      border: 'border-blue-500/50'
    };
    if (score >= 40) return { 
      label: 'Unterdurchschnittlich', 
      sublabel: 'Entwicklungspotenzial vorhanden',
      color: 'text-amber-400', 
      bg: 'bg-amber-500/20',
      border: 'border-amber-500/50'
    };
    return { 
      label: 'Entwicklungsbedarf', 
      sublabel: 'Gezieltes Training empfohlen',
      color: 'text-orange-400', 
      bg: 'bg-orange-500/20',
      border: 'border-orange-500/50'
    };
  };

  // Identify strengths, middle, and weaknesses (sorted by score)
  const sortedCategories = [...categoryScores].sort((a, b) => b.score - a.score);
  const strengths = sortedCategories.slice(0, 2);
  const middle = sortedCategories.length >= 3 ? [sortedCategories[2]] : [];
  const weaknesses = sortedCategories.slice(-2).reverse();

  // Generate recommendations
  const getRecommendations = (category, score) => {
    const recommendations = {
      movement_planning: score < 50 ? [
        'Grundlegende Koordinationsübungen täglich 10 Min.',
        'Reaktionstraining mit Lichtreizen (z.B. BlazePod)',
        'Einfache Bewegungssequenzen wiederholen und automatisieren'
      ] : [
        'Komplexe Koordinationsübungen mit Störfaktoren',
        'Multi-direktionales Reaktionstraining unter Zeitdruck',
        'Sequenzlernen: Lange Bewegungsfolgen automatisieren'
      ],
      perception: score < 50 ? [
        'Peripheres Sehtraining: Blickfeld bewusst erweitern',
        'Gleichgewichtsübungen mit geschlossenen Augen',
        'Ball-Tracking Übungen mit langsamen Bewegungen'
      ] : [
        'Multiple Object Tracking mit 4+ Objekten',
        'Gleichgewichtsübungen mit visueller Ablenkung',
        'Räumliche Orientierung unter Belastung trainieren'
      ],
      decision_making: score < 50 ? [
        'Vereinfachte Spielsituationen analysieren',
        'Taktik-Videos ansehen und Entscheidungen nachvollziehen',
        'Langsame Entscheidungsfindung mit Feedback üben'
      ] : [
        'Spielformtraining mit Überzahl/Unterzahl-Situationen',
        'Schnelle Entscheidungen unter Zeitdruck trainieren',
        'Komplexe Muster erkennen und antizipieren'
      ],
      attention: score < 50 ? [
        'Kurze Achtsamkeitsübungen (5 Min. täglich)',
        'Einfache Konzentrationsspiele ohne Ablenkung',
        'Fokus-Training: Eine Aufgabe bewusst ausführen'
      ] : [
        'Meditations- und Achtsamkeitsübungen (15+ Min.)',
        'Dual-Task Training mit steigender Komplexität',
        'Konzentration über längere Zeiträume (30+ Min.) halten'
      ],
      self_regulation: score < 50 ? [
        'Box-Atmung: 4 Sek. ein, 4 halten, 4 aus, 4 halten',
        'Körperwahrnehmung: Anspannung bewusst erkennen',
        'Einfache Visualisierungen von Erfolgsmomenten'
      ] : [
        'Fortgeschrittene Atemtechniken (4-7-8 Methode)',
        'Mentales Training vor Wettkämpfen (10 Min.)',
        'Biofeedback-Training zur HRV-Optimierung'
      ]
    };
    
    return recommendations[category] || [];
  };

  const exportPDF = async () => {
    if (!reportRef.current) return;
    
    setExporting(true);
    try {
      const canvas = await html2canvas(reportRef.current, {
        scale: 2,
        backgroundColor: '#0f172a',
        useCORS: true,
        logging: false,
        allowTaint: true,
        windowWidth: 1200
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      
      // Calculate how many pages we need
      const scaledHeight = imgHeight * ratio;
      let heightLeft = scaledHeight;
      let position = 0;
      
      // First page
      pdf.addImage(imgData, 'PNG', imgX, position, imgWidth * ratio, scaledHeight);
      heightLeft -= pdfHeight;
      
      // Additional pages if needed
      while (heightLeft > 0) {
        position = heightLeft - scaledHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', imgX, position, imgWidth * ratio, scaledHeight);
        heightLeft -= pdfHeight;
      }
      
      const testDate = new Date(session.test_date).toISOString().split('T')[0];
      const fileName = `PROVOID_NeuroAnalyse_${session.first_name}_${session.last_name}_${testDate}.pdf`;
      pdf.save(fileName);
    } catch (error) {
      console.error('PDF Export error:', error);
      alert('Fehler beim PDF-Export. Bitte versuche es erneut.');
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6" ref={reportRef}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5" />
          Zurück
        </Link>
        
        <button 
          onClick={exportPDF}
          disabled={exporting}
          className="flex items-center gap-2 px-4 py-2 bg-provoid-600 hover:bg-cyan-700 disabled:bg-gray-600 rounded-xl transition-colors"
        >
          <Download className="w-5 h-5" />
          {exporting ? 'Exportiere...' : 'PDF Export'}
        </button>
      </div>

      {/* PROVOID Header */}
      <div className="text-center mb-2">
        <div className="inline-flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-provoid-400 to-provoid-500 flex items-center justify-center">
            <img src="/analyse/provoid-logo.png" alt="PROVOID" className="h-6 w-auto object-contain" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-provoid-400 to-provoid-300 bg-clip-text text-transparent">
            PROVOID NeuroAthletic
          </span>
        </div>
        <p className="text-gray-500 text-sm">Evidenzbasierte Leistungsdiagnostik</p>
      </div>

      {/* Header Card - ohne Gesamtscore */}
      <div className="glass-card p-6 border border-gray-700/50">
        <div className="text-center md:text-left">
          <p className="text-provoid-400 text-sm font-medium mb-1">Neuroathletisches Profil</p>
          <h1 className="text-2xl font-bold mb-1">
            {session.first_name} {session.last_name}
          </h1>
          <p className="text-gray-500">
            {new Date(session.test_date).toLocaleDateString('de-DE', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
            {session.team && ` • ${session.team}`}
          </p>
        </div>
      </div>

      {/* Radar Chart & Category Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Radar Chart */}
        <div className="glass-card p-6">
          <h2 className="text-lg font-semibold mb-4">Neuroathletisches Profil</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="rgba(6,182,212,0.2)" />
                <PolarAngleAxis 
                  dataKey="subject" 
                  tick={{ fill: '#9ca3af', fontSize: 11 }}
                />
                <PolarRadiusAxis 
                  angle={90} 
                  domain={[0, 100]} 
                  tick={{ fill: '#6b7280', fontSize: 10 }}
                />
                <Radar
                  name="Score"
                  dataKey="score"
                  stroke="#06b6d4"
                  fill="#06b6d4"
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Scores */}
        <div className="glass-card p-6">
          <h2 className="text-lg font-semibold mb-4">Bereichsscores</h2>
          <div className="space-y-4">
            {categoryScores.map(cs => {
              const interp = getScoreInterpretation(cs.score);
              return (
                <div key={cs.category} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{cs.label}</span>
                    <span className={`text-sm ${interp.color}`}>
                      {Math.round(cs.score)}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-700/50 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-500 bg-gradient-to-r from-provoid-500 to-provoid-400"
                      style={{ width: `${cs.score}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Leistungsübersicht: Stärken, Mittel, Schwächen */}
      <div className="glass-card p-6">
        <h2 className="text-lg font-semibold mb-6 text-center">Leistungsübersicht</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Stärken (Top 2) */}
          <div className="rounded-2xl border-2 border-green-500/50 bg-green-500/5 p-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <h3 className="font-semibold text-green-400">Stärken</h3>
                <p className="text-xs text-gray-500">Top 2 Bereiche</p>
              </div>
            </div>
            <div className="space-y-3">
              {strengths.map((s, idx) => (
                <div key={s.category} className="p-3 bg-green-500/10 rounded-xl">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-5 h-5 rounded-full bg-green-500 text-white text-xs flex items-center justify-center font-bold">{idx + 1}</span>
                    <span className="font-medium text-sm">{s.label}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex-1 h-2 bg-gray-700 rounded-full mr-3">
                      <div className="h-2 bg-green-500 rounded-full" style={{ width: `${s.score}%` }} />
                    </div>
                    <span className="text-green-400 font-bold text-sm">{Math.round(s.score)}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mittlere Bereiche */}
          <div className="rounded-2xl border-2 border-blue-500/50 bg-blue-500/5 p-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                <Target className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <h3 className="font-semibold text-blue-400">Mittelfeld</h3>
                <p className="text-xs text-gray-500">Solide Basis</p>
              </div>
            </div>
            <div className="space-y-3">
              {middle.map((m, idx) => (
                <div key={m.category} className="p-3 bg-blue-500/10 rounded-xl">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-5 h-5 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center font-bold">{idx + 3}</span>
                    <span className="font-medium text-sm">{m.label}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex-1 h-2 bg-gray-700 rounded-full mr-3">
                      <div className="h-2 bg-blue-500 rounded-full" style={{ width: `${m.score}%` }} />
                    </div>
                    <span className="text-blue-400 font-bold text-sm">{Math.round(m.score)}%</span>
                  </div>
                </div>
              ))}
              {middle.length === 0 && (
                <p className="text-sm text-gray-500 text-center py-4">Keine mittleren Bereiche</p>
              )}
            </div>
          </div>

          {/* Entwicklungsfelder (Bottom 2) */}
          <div className="rounded-2xl border-2 border-orange-500/50 bg-orange-500/5 p-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-orange-400" />
              </div>
              <div>
                <h3 className="font-semibold text-orange-400">Entwicklungsfelder</h3>
                <p className="text-xs text-gray-500">Fokus für Training</p>
              </div>
            </div>
            <div className="space-y-3">
              {weaknesses.map((w, idx) => (
                <div key={w.category} className="p-3 bg-orange-500/10 rounded-xl">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-5 h-5 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center font-bold">{idx + 4}</span>
                    <span className="font-medium text-sm">{w.label}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex-1 h-2 bg-gray-700 rounded-full mr-3">
                      <div className="h-2 bg-orange-500 rounded-full" style={{ width: `${w.score}%` }} />
                    </div>
                    <span className="text-orange-400 font-bold text-sm">{Math.round(w.score)}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Results by Category */}
      <div className="glass-card p-6">
        <h2 className="text-lg font-semibold mb-6">Detailergebnisse nach Bereich</h2>
        
        <div className="space-y-8">
          {categoryScores.map(cs => (
            <div key={cs.category} className="border-b border-white/10 pb-6 last:border-0 last:pb-0">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-medium">{cs.label}</h3>
                  <p className="text-sm text-gray-500">
                    {categoryDescriptions[cs.category]?.brain}
                  </p>
                </div>
                <ScoreRing score={cs.score} size={70} strokeWidth={5} />
              </div>
              
              {/* Sub-tests */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                {cs.results.map((r, idx) => (
                  <div key={idx} className="p-3 bg-provoid-400/5 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">{r.subcategory || r.test_name}</span>
                      <span className={`text-sm ${
                        r.normalized_score >= 70 ? 'text-green-400' :
                        r.normalized_score >= 50 ? 'text-blue-400' : 'text-orange-400'
                      }`}>
                        {Math.round(r.normalized_score)}%
                      </span>
                    </div>
                    {r.reaction_time_ms && (
                      <p className="text-xs text-gray-500">RT: {Math.round(r.reaction_time_ms)} ms</p>
                    )}
                    {r.accuracy_percent !== undefined && (
                      <p className="text-xs text-gray-500">Genauigkeit: {Math.round(r.accuracy_percent)}%</p>
                    )}
                  </div>
                ))}
              </div>
              
              {/* Neuroscience explanation */}
              <div className="p-3 bg-provoid-500/10 rounded-xl text-sm">
                <strong className="text-provoid-400">Funktion:</strong>
                <span className="text-gray-400 ml-2">{categoryDescriptions[cs.category]?.function}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div className="glass-card p-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-provoid-400" />
          Trainingsempfehlungen
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {weaknesses.slice(0, 2).map(w => (
            <div key={w.category} className="space-y-3">
              <h3 className="font-medium text-provoid-300">{w.label} verbessern:</h3>
              <ul className="space-y-2">
                {getRecommendations(w.category, w.score).map((rec, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-gray-400">
                    <span className="text-provoid-400 mt-1">•</span>
                    {rec}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Scientific Disclaimer */}
      <div className="glass-card p-4 border border-blue-500/30">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-gray-400">
            <strong className="text-blue-400">Wissenschaftlicher Hinweis:</strong> Diese Testbatterie 
            basiert auf etablierten neurowissenschaftlichen Paradigmen (CPT, Stroop, Go/No-Go, MOT) 
            und dient der Leistungsdiagnostik. Die Ergebnisse sollten im Kontext des Trainingsalters, 
            der Tagesform und individueller Faktoren interpretiert werden. Für klinische Diagnostik 
            ist eine fachärztliche Konsultation erforderlich.
          </div>
        </div>
      </div>

      {/* Retest Recommendation */}
      <div className="glass-card p-4 border border-provoid-500/30">
        <div className="flex items-start gap-3">
          <Target className="w-5 h-5 text-provoid-400 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-gray-400">
            <strong className="text-provoid-400">Empfehlung:</strong> Eine Wiederholungstestung nach 
            4-6 Wochen gezieltem Training ermöglicht die Messung des Trainingsfortschritts. 
            Regelmäßige Testungen unterstützen die individuelle Leistungsentwicklung.
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-xs text-gray-600 py-4">
        <p>© {new Date().getFullYear()} PROVOID • Neuroathletische Leistungsdiagnostik</p>
        <p className="mt-1">Erstellt am {new Date().toLocaleDateString('de-DE', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })}</p>
      </div>
    </div>
  );
};

export default Results;
