import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronRight, CheckCircle } from 'lucide-react';
import { apiUrl } from '../config/api';

// Import test components
import MovementPlanningTest from '../tests/MovementPlanningTest';
import PerceptionTest from '../tests/PerceptionTest';
import DecisionMakingTest from '../tests/DecisionMakingTest';
import AttentionTest from '../tests/AttentionTest';
import SelfRegulationTest from '../tests/SelfRegulationTest';

const testCategories = [
  {
    id: 'movement_planning',
    name: 'Bewegungsplanung & -ausführung',
    description: 'Prämotorischer Kortex, Basalganglien, Kleinhirn',
    icon: '🧠',
    component: MovementPlanningTest,
    neuroscience: 'Testet die Integrität motorischer Bahnen und die Effizienz der Bewegungsplanung im prämotorischen und supplementär-motorischen Areal.'
  },
  {
    id: 'perception',
    name: 'Wahrnehmung & Orientierung',
    description: 'Parietallappen, Visueller Kortex',
    icon: '👁️',
    component: PerceptionTest,
    neuroscience: 'Evaluiert die visuelle Verarbeitung (V1-V5) und räumliche Orientierung im posterioren Parietalkortex.'
  },
  {
    id: 'decision_making',
    name: 'Situationsanalyse & Entscheidung',
    description: 'Präfrontaler Kortex, ACC',
    icon: '⚡',
    component: DecisionMakingTest,
    neuroscience: 'Misst exekutive Funktionen des dorsolateralen präfrontalen Kortex und Konfliktüberwachung im anterioren cingulären Kortex.'
  },
  {
    id: 'attention',
    name: 'Aufmerksamkeit & Fokus',
    description: 'Dorsales & Ventrales Aufmerksamkeitsnetzwerk',
    icon: '🎯',
    component: AttentionTest,
    neuroscience: 'Prüft das dorsale (top-down) und ventrale (bottom-up) Aufmerksamkeitsnetzwerk sowie die Vigilanzfunktion.'
  },
  {
    id: 'self_regulation',
    name: 'Körperliche Selbstregulation',
    description: 'Insula, Limbisches System',
    icon: '💪',
    component: SelfRegulationTest,
    neuroscience: 'Bewertet interozeptive Wahrnehmung (Insula) und Emotionsregulation über präfrontal-limbische Verbindungen.'
  }
];

const TestSession = () => {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  
  const [session, setSession] = useState(null);
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [completedCategories, setCompletedCategories] = useState({});
  const [categoryScores, setCategoryScores] = useState({});
  const [isTestActive, setIsTestActive] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSession();
  }, [sessionId]);

  const fetchSession = async () => {
    try {
      const res = await fetch(apiUrl(`/api/sessions/${sessionId}`));
      if (!res.ok) {
        navigate('/');
        return;
      }
      const data = await res.json();
      setSession(data);
      
      // Check for existing results
      if (data.results && data.results.length > 0) {
        const completed = {};
        const scores = {};
        
        data.results.forEach(r => {
          completed[r.category] = true;
          if (!scores[r.category]) scores[r.category] = [];
          scores[r.category].push(r.normalized_score);
        });
        
        Object.keys(scores).forEach(cat => {
          scores[cat] = scores[cat].reduce((a, b) => a + b, 0) / scores[cat].length;
        });
        
        setCompletedCategories(completed);
        setCategoryScores(scores);
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching session:', error);
      navigate('/');
    }
  };

  const handleTestComplete = useCallback(async (category, results) => {
    // Save results to database
    for (const result of results) {
      await fetch(apiUrl('/api/results'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          session_id: sessionId,
          category: category,
          ...result
        })
      });
    }
    
    // Calculate category score
    const avgScore = results.reduce((sum, r) => sum + r.normalized_score, 0) / results.length;
    
    setCompletedCategories(prev => ({ ...prev, [category]: true }));
    setCategoryScores(prev => ({ ...prev, [category]: avgScore }));
    setIsTestActive(false);
    
    // Auto-advance to next category
    if (currentCategoryIndex < testCategories.length - 1) {
      setCurrentCategoryIndex(prev => prev + 1);
    }
  }, [sessionId, currentCategoryIndex]);

  const completeSession = async () => {
    // Calculate total score
    const scores = Object.values(categoryScores);
    const totalScore = scores.reduce((sum, s) => sum + s, 0) / scores.length;
    
    // Calculate percentile (simplified - would use normative data in production)
    const percentile = Math.min(99, Math.max(1, Math.round(totalScore)));
    
    await fetch(apiUrl(`/api/sessions/${sessionId}/complete`), {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ total_score: totalScore, percentile })
    });
    
    navigate(`/results/${sessionId}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Brain className="w-16 h-16 text-provoid-400 animate-pulse mx-auto mb-4" />
          <p className="text-gray-500">Lade Testsession...</p>
        </div>
      </div>
    );
  }

  const allCompleted = Object.keys(completedCategories).length === testCategories.length;
  const CurrentTest = testCategories[currentCategoryIndex].component;

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="glass-card p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">Neuroathletische Testung</h1>
            <p className="text-gray-500">
              {session.first_name} {session.last_name}
              {session.team && ` • ${session.team}`}
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            {testCategories.map((cat, idx) => (
              <div
                key={cat.id}
                className={`w-10 h-10 rounded-full flex items-center justify-center text-lg transition-all ${
                  completedCategories[cat.id]
                    ? 'bg-green-500/30 border-2 border-green-500'
                    : idx === currentCategoryIndex
                    ? 'bg-provoid-500/30 border-2 border-provoid-500'
                    : 'bg-provoid-400/10 border-2 border-white/20'
                }`}
                title={cat.name}
              >
                {completedCategories[cat.id] ? (
                  <CheckCircle className="w-5 h-5 text-green-400" />
                ) : (
                  cat.icon
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Category Sidebar */}
        <div className="lg:col-span-1 space-y-2">
          {testCategories.map((cat, idx) => (
            <button
              key={cat.id}
              onClick={() => !isTestActive && setCurrentCategoryIndex(idx)}
              disabled={isTestActive}
              className={`w-full text-left p-4 rounded-xl transition-all ${
                idx === currentCategoryIndex
                  ? 'bg-provoid-500/30 border border-provoid-500'
                  : completedCategories[cat.id]
                  ? 'bg-green-500/10 border border-green-500/30'
                  : 'bg-provoid-400/5 hover:bg-provoid-400/10 border border-transparent'
              } ${isTestActive ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{cat.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{cat.name}</p>
                  {completedCategories[cat.id] && categoryScores[cat.id] !== undefined && (
                    <p className="text-xs text-green-400">
                      Score: {Math.round(categoryScores[cat.id])}%
                    </p>
                  )}
                </div>
              </div>
            </button>
          ))}
          
          {allCompleted && (
            <button
              onClick={completeSession}
              className="w-full mt-4 p-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            >
              Testung abschließen
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Test Area */}
        <div className="lg:col-span-3">
          <div className="glass-card p-6">
            {!isTestActive ? (
              <div className="text-center py-8">
                <span className="text-6xl mb-4 block">{testCategories[currentCategoryIndex].icon}</span>
                <h2 className="text-2xl font-bold mb-2">
                  {testCategories[currentCategoryIndex].name}
                </h2>
                <p className="text-gray-500 mb-4">
                  {testCategories[currentCategoryIndex].description}
                </p>
                <div className="max-w-lg mx-auto mb-6 p-4 bg-provoid-400/5 rounded-xl text-sm text-gray-600">
                  <strong className="text-provoid-400">Neurowissenschaftliche Grundlage:</strong>
                  <p className="mt-1">{testCategories[currentCategoryIndex].neuroscience}</p>
                </div>
                
                {completedCategories[testCategories[currentCategoryIndex].id] ? (
                  <div className="text-green-400">
                    <CheckCircle className="w-12 h-12 mx-auto mb-2" />
                    <p>Dieser Test wurde bereits abgeschlossen</p>
                    <p className="text-2xl font-bold mt-2">
                      {Math.round(categoryScores[testCategories[currentCategoryIndex].id])}%
                    </p>
                  </div>
                ) : (
                  <button
                    onClick={() => setIsTestActive(true)}
                    className="px-8 py-3 bg-gradient-to-r from-provoid-500 to-blue-500 rounded-xl font-semibold hover:opacity-90 transition-opacity"
                  >
                    Test starten
                  </button>
                )}
              </div>
            ) : (
              <CurrentTest
                onComplete={(results) => handleTestComplete(testCategories[currentCategoryIndex].id, results)}
                onCancel={() => setIsTestActive(false)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestSession;
