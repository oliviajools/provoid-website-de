import React, { useState, useEffect, useRef, useCallback } from 'react';

const DecisionMakingTest = ({ onComplete, onCancel }) => {
  const [phase, setPhase] = useState('intro');
  const [trial, setTrial] = useState(0);
  const [results, setResults] = useState([]);
  const [feedback, setFeedback] = useState(null);
  
  // Pattern recognition state
  const [pattern, setPattern] = useState([]);
  const [options, setOptions] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  
  // Tactical decision state
  const [scenario, setScenario] = useState(null);
  const [decisionOptions, setDecisionOptions] = useState([]);
  
  // Anticipation state
  const [movingObject, setMovingObject] = useState(null);
  const [occluded, setOccluded] = useState(false);
  const [targetZones, setTargetZones] = useState([]);
  
  const timeoutRef = useRef(null);
  const intervalRef = useRef(null);
  const trialDataRef = useRef([]);
  const stimulusStartRef = useRef(null);
  const occludedRef = useRef(false);

  const TRIALS_PER_TEST = 6;

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // Pattern Recognition Test
  const startPatternTest = useCallback(() => {
    setPhase('pattern');
    setTrial(0);
    trialDataRef.current = [];
    runPatternTrial();
  }, []);

  const patterns = [
    { sequence: ['⚪', '⚫', '⚪', '⚫', '⚪', '⚫'], next: '⚪', wrong: ['⚫', '🔴', '🔵'] },
    { sequence: ['🔴', '�', '🔵', '🔴', '�', '🔵'], next: '🔴', wrong: ['🔵', '🟢', '🟡'] },
    { sequence: ['▲', '▲', '▼', '▲', '▲', '▼', '▲'], next: '▲', wrong: ['▼', '◆', '●'] },
    { sequence: ['2', '4', '8', '16', '32'], next: '64', wrong: ['48', '36', '128'] },
    { sequence: ['B', 'D', 'F', 'H', 'J'], next: 'L', wrong: ['K', 'M', 'I'] },
    { sequence: ['🏃', '🚶', '🏃', '🏃', '🚶', '🏃', '🏃', '🏃'], next: '🚶', wrong: ['🏃', '🧍', '🏊'] },
    { sequence: ['→', '→', '↑', '→', '→', '↑', '→', '→'], next: '↑', wrong: ['→', '↓', '←'] },
    { sequence: ['⚽', '🏀', '⚽', '⚽', '🏀', '⚽', '⚽', '⚽'], next: '🏀', wrong: ['⚽', '🏈', '⚾'] },
    { sequence: ['1', '1', '2', '3', '5', '8'], next: '13', wrong: ['10', '11', '9'] },
    { sequence: ['🔵', '🔴', '🔵', '🔵', '🔴', '🔵', '🔵', '🔵'], next: '🔴', wrong: ['🔵', '🟢', '🟡'] },
  ];

  const runPatternTrial = () => {
    setFeedback(null);
    
    const patternIndex = trial % patterns.length;
    const currentPattern = patterns[patternIndex];
    
    setPattern(currentPattern.sequence);
    setCorrectAnswer(currentPattern.next);
    
    // Shuffle options
    const allOptions = [currentPattern.next, ...currentPattern.wrong.slice(0, 3)];
    setOptions(allOptions.sort(() => Math.random() - 0.5));
    
    stimulusStartRef.current = performance.now();
  };

  const handlePatternAnswer = (answer) => {
    const responseTime = performance.now() - stimulusStartRef.current;
    const correct = answer === correctAnswer;
    
    trialDataRef.current.push({ correct, responseTime });
    
    setFeedback({ type: correct ? 'success' : 'error', message: correct ? 'Richtig!' : `Falsch! Richtig wäre: ${correctAnswer}` });
    
    const nextTrial = trial + 1;
    setTrial(nextTrial);
    
    if (nextTrial >= TRIALS_PER_TEST) {
      setTimeout(finishPatternTest, 1500);
    } else {
      setTimeout(runPatternTrial, 1500);
    }
  };

  const finishPatternTest = () => {
    const correctTrials = trialDataRef.current.filter(t => t.correct);
    const accuracy = correctTrials.length / TRIALS_PER_TEST;
    const avgRT = correctTrials.length > 0 
      ? correctTrials.reduce((sum, t) => sum + t.responseTime, 0) / correctTrials.length 
      : 5000;
    
    const rtScore = Math.max(0, Math.min(50, 50 - ((avgRT - 2000) / 100)));
    const normalizedScore = (accuracy * 50) + rtScore;
    
    setResults(prev => [...prev, {
      test_name: 'pattern_recognition',
      subcategory: 'Mustererkennung',
      raw_score: accuracy * 100,
      normalized_score: normalizedScore,
      reaction_time_ms: avgRT,
      accuracy_percent: accuracy * 100,
      trials_completed: TRIALS_PER_TEST,
      errors: TRIALS_PER_TEST - correctTrials.length
    }]);
    
    trialDataRef.current = [];
    setPhase('tactical_intro');
  };

  // Tactical Decision Test
  const startTacticalTest = useCallback(() => {
    setPhase('tactical');
    setTrial(0);
    trialDataRef.current = [];
    runTacticalTrial();
  }, []);

  const allScenarios = [
    {
      situation: 'Kontersituation: 3 gegen 2. Du führst den Ball zentral, links und rechts je eine Mitspielerin.',
      options: [
        { text: 'Weiterdribbeln und Schuss', score: 50 },
        { text: 'Kurzer Pass nach links, dann Doppelpass', score: 85 },
        { text: 'Langer Ball nach rechts', score: 60 },
        { text: 'Abbremsen und auf Unterstützung warten', score: 20 }
      ]
    },
    {
      situation: 'Du verteidigst 1-gegen-1. Die Angreiferin dribbelt auf dich zu und hat Tempo.',
      options: [
        { text: 'Sofort in den Zweikampf gehen', score: 40 },
        { text: 'Rückwärts laufen und den Winkel zumachen', score: 85 },
        { text: 'Stehen bleiben und abwarten', score: 30 },
        { text: 'Zur Seite ausweichen', score: 50 }
      ]
    },
    {
      situation: 'Freistoß 25 Meter vor dem Tor. Die Mauer steht, die Torhüterin positioniert sich.',
      options: [
        { text: 'Direkter Schuss über die Mauer', score: 60 },
        { text: 'Flacher Schuss um die Mauer', score: 70 },
        { text: 'Kurz abspielen und Nachschuss', score: 80 },
        { text: 'Hoher Ball in den Strafraum', score: 55 }
      ]
    },
    {
      situation: 'Letzte Minute, ihr liegt 1 Tor zurück. Euer Team hat Eckball.',
      options: [
        { text: 'Kurz spielen und kombinieren', score: 50 },
        { text: 'Hoher Ball auf die Torhüterin', score: 85 },
        { text: 'Flacher Ball auf den kurzen Pfosten', score: 70 },
        { text: 'Ball halten und Zeit gewinnen', score: 20 }
      ]
    },
    {
      situation: 'Du bist Torhüterin. Angreiferin kommt allein auf dich zu, noch 15 Meter entfernt.',
      options: [
        { text: 'Auf der Linie bleiben', score: 40 },
        { text: 'Langsam herauslaufen und Winkel verkürzen', score: 85 },
        { text: 'Schnell herausstürmen', score: 55 },
        { text: 'Nach links oder rechts bewegen', score: 35 }
      ]
    },
    {
      situation: 'Du hast den Ball im Mittelfeld. Zwei Gegner kommen auf dich zu, eine Mitspielerin bietet sich an.',
      options: [
        { text: 'Schnell zur freien Mitspielerin passen', score: 85 },
        { text: 'Versuch, beide zu umdribbeln', score: 30 },
        { text: 'Rückpass zum Torwart', score: 60 },
        { text: 'Ball lang nach vorne schlagen', score: 45 }
      ]
    },
    {
      situation: 'Elfmeter für dein Team. Du bist die Schützin. Die Torhüterin bewegt sich früh.',
      options: [
        { text: 'Sicher in die Mitte schießen', score: 70 },
        { text: 'Warten und in die Ecke schießen, die sie freigibt', score: 85 },
        { text: 'Hart in eine Ecke schießen', score: 65 },
        { text: 'Lupfer versuchen', score: 40 }
      ]
    },
    {
      situation: 'Anstoß nach einem Gegentor. Noch 5 Minuten zu spielen, Spielstand unentschieden.',
      options: [
        { text: 'Ruhig aufbauen und Ballbesitz halten', score: 75 },
        { text: 'Sofort nach vorne spielen', score: 60 },
        { text: 'Langer Ball in die Spitze', score: 50 },
        { text: 'Ball in der eigenen Hälfte zirkulieren lassen', score: 85 }
      ]
    }
  ];
  
  // Shuffle scenarios at component level to avoid duplicates
  const [scenarios] = useState(() => 
    [...allScenarios].sort(() => Math.random() - 0.5).slice(0, TRIALS_PER_TEST)
  );

  const runTacticalTrial = () => {
    setFeedback(null);
    
    const currentScenario = scenarios[trial];
    
    setScenario(currentScenario.situation);
    setDecisionOptions(currentScenario.options.sort(() => Math.random() - 0.5));
    
    stimulusStartRef.current = performance.now();
  };

  const handleTacticalDecision = (option) => {
    const responseTime = performance.now() - stimulusStartRef.current;
    const score = option.score;
    
    trialDataRef.current.push({ score, responseTime });
    
    const isGood = score >= 70;
    setFeedback({ 
      type: isGood ? 'success' : 'error', 
      message: isGood ? `Gute Entscheidung! (${score}%)` : `Suboptimal (${score}%)` 
    });
    
    const nextTrial = trial + 1;
    setTrial(nextTrial);
    
    if (nextTrial >= TRIALS_PER_TEST) {
      setTimeout(finishTacticalTest, 1500);
    } else {
      setTimeout(runTacticalTrial, 1500);
    }
  };

  const finishTacticalTest = () => {
    const avgScore = trialDataRef.current.reduce((sum, t) => sum + t.score, 0) / TRIALS_PER_TEST;
    const avgRT = trialDataRef.current.reduce((sum, t) => sum + t.responseTime, 0) / TRIALS_PER_TEST;
    
    // Normalize: avg score already 0-100, add small bonus for fast decisions
    const rtBonus = Math.max(0, Math.min(10, 10 - ((avgRT - 3000) / 1000)));
    const normalizedScore = Math.min(100, avgScore + rtBonus);
    
    setResults(prev => [...prev, {
      test_name: 'tactical_decision',
      subcategory: 'Taktische Entscheidungsfindung',
      raw_score: avgScore,
      normalized_score: normalizedScore,
      reaction_time_ms: avgRT,
      accuracy_percent: avgScore,
      trials_completed: TRIALS_PER_TEST,
      errors: trialDataRef.current.filter(t => t.score < 70).length
    }]);
    
    trialDataRef.current = [];
    setPhase('anticipation_intro');
  };

  // Anticipation Test
  const startAnticipationTest = useCallback(() => {
    setPhase('anticipation');
    setTrial(0);
    trialDataRef.current = [];
    runAnticipationTrial();
  }, []);

  const runAnticipationTrial = () => {
    setFeedback(null);
    setOccluded(false);
    occludedRef.current = false;
    
    // 3 Zielzonen für bessere Nachvollziehbarkeit
    const targetZone = Math.floor(Math.random() * 3); // 0-2 (Links, Mitte, Rechts)
    
    // Startposition oben, leicht variiert
    const startX = 40 + (Math.random() - 0.5) * 30; // 25-55%
    const startY = 5 + Math.random() * 10; // 5-15% von oben
    
    // Zielpositionen basierend auf Zone (Links=20%, Mitte=50%, Rechts=80%)
    const endX = 20 + targetZone * 30;
    const endY = 85 + Math.random() * 10;
    
    // Geringerer Kurvenfaktor für klarere Flugbahnen
    const curveStrength = (Math.random() - 0.5) * 15;
    
    setMovingObject({ x: startX, y: startY, targetX: endX, targetY: endY, curveStrength, targetZone });
    setTargetZones([
      { id: 0, label: 'Links', x: 20 },
      { id: 1, label: 'Mitte', x: 50 },
      { id: 2, label: 'Rechts', x: 80 }
    ]);
    
    // Animate object - langsamer und spätere Verdeckung für bessere Sichtbarkeit
    let progress = 0;
    const duration = 1500 + Math.random() * 500; // 1.5-2.0s (langsamer)
    const occlusionPoint = 0.50 + Math.random() * 0.15; // Verdeckung bei 50-65% (später)
    
    intervalRef.current = setInterval(() => {
      progress += 40 / duration; // Schnellere Updates
      
      if (progress >= occlusionPoint && !occludedRef.current) {
        occludedRef.current = true;
        setOccluded(true);
        clearInterval(intervalRef.current);
        stimulusStartRef.current = performance.now();
        return;
      }
      
      if (progress < 1 && !occludedRef.current) {
        // Kurvige Flugbahn mit Bezier-ähnlicher Interpolation
        const linearX = startX + (endX - startX) * progress;
        const curveOffset = Math.sin(progress * Math.PI) * curveStrength;
        
        setMovingObject(prev => ({
          ...prev,
          x: linearX + curveOffset,
          y: startY + (endY - startY) * progress
        }));
      }
    }, 40);
  };

  const handleAnticipationResponse = (zoneId) => {
    if (!occluded) return;
    
    const responseTime = performance.now() - stimulusStartRef.current;
    const correctZone = movingObject.targetZone;
    const correct = zoneId === correctZone;
    
    trialDataRef.current.push({ correct, responseTime });
    
    setFeedback({ 
      type: correct ? 'success' : 'error', 
      message: correct ? 'Richtig!' : `Falsch! Zone ${correctZone + 1}` 
    });
    
    const nextTrial = trial + 1;
    setTrial(nextTrial);
    
    if (nextTrial >= TRIALS_PER_TEST) {
      setTimeout(finishAnticipationTest, 1500);
    } else {
      setTimeout(runAnticipationTrial, 1500);
    }
  };

  const finishAnticipationTest = () => {
    const correctTrials = trialDataRef.current.filter(t => t.correct);
    const accuracy = correctTrials.length / TRIALS_PER_TEST;
    const avgRT = correctTrials.length > 0 
      ? correctTrials.reduce((sum, t) => sum + t.responseTime, 0) / correctTrials.length 
      : 2000;
    
    const rtScore = Math.max(0, Math.min(30, 30 - ((avgRT - 500) / 50)));
    const normalizedScore = (accuracy * 70) + rtScore;
    
    setResults(prev => [...prev, {
      test_name: 'anticipation',
      subcategory: 'Antizipation & Vorhersage',
      raw_score: accuracy * 100,
      normalized_score: normalizedScore,
      reaction_time_ms: avgRT,
      accuracy_percent: accuracy * 100,
      trials_completed: TRIALS_PER_TEST,
      errors: TRIALS_PER_TEST - correctTrials.length
    }]);
    
    setPhase('complete');
  };

  useEffect(() => {
    if (phase === 'complete' && results.length === 3) {
      setTimeout(() => onComplete(results), 2000);
    }
  }, [phase, results, onComplete]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between text-sm text-gray-500">
        <span>Situationsanalyse & Entscheidungsfindung</span>
        <span>
          {phase === 'pattern' && `Muster: ${trial}/${TRIALS_PER_TEST}`}
          {phase === 'tactical' && `Taktik: ${trial}/${TRIALS_PER_TEST}`}
          {phase === 'anticipation' && `Antizipation: ${trial}/${TRIALS_PER_TEST}`}
        </span>
      </div>

      {/* Intro */}
      {phase === 'intro' && (
        <div className="text-center py-8">
          <h3 className="text-xl font-semibold mb-4">Test 1: Mustererkennung</h3>
          <p className="text-gray-500 mb-6 max-w-md mx-auto">
            Erkenne das Muster in der Sequenz und wähle das nächste Element.
          </p>
          <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl mb-6 max-w-md mx-auto">
            <p className="text-sm text-blue-300">
              <strong>Neurowissenschaft:</strong> Mustererkennung aktiviert den 
              präfrontalen Kortex und den temporalen Assoziationskortex.
            </p>
          </div>
          <button onClick={startPatternTest} className="px-6 py-3 bg-provoid-600 hover:bg-cyan-700 rounded-xl font-semibold">
            Test starten
          </button>
        </div>
      )}

      {/* Pattern Test */}
      {phase === 'pattern' && (
        <div className="text-center py-4">
          <p className="text-gray-500 mb-4">Welches Element kommt als nächstes?</p>
          
          <div className="flex items-center justify-center gap-3 mb-8 flex-wrap">
            {pattern.map((item, i) => (
              <div key={i} className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center text-2xl">
                {item}
              </div>
            ))}
            <div className="w-12 h-12 bg-provoid-500/30 border-2 border-provoid-500 border-dashed rounded-lg flex items-center justify-center text-2xl">
              ?
            </div>
          </div>
          
          <div className="flex justify-center gap-3 flex-wrap">
            {options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handlePatternAnswer(opt)}
                className="w-16 h-16 bg-gray-700 hover:bg-gray-600 rounded-xl text-2xl transition-colors"
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Tactical Intro */}
      {phase === 'tactical_intro' && (
        <div className="text-center py-8">
          <h3 className="text-xl font-semibold mb-4">Test 2: Taktische Entscheidungsfindung</h3>
          <p className="text-gray-500 mb-6 max-w-md mx-auto">
            Lies die Spielsituation und wähle die beste Entscheidung.
          </p>
          <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl mb-6 max-w-md mx-auto">
            <p className="text-sm text-blue-300">
              <strong>Neurowissenschaft:</strong> Taktische Entscheidungen erfordern 
              Integration im dorsolateralen präfrontalen Kortex und orbitofrontalen Kortex.
            </p>
          </div>
          <button onClick={startTacticalTest} className="px-6 py-3 bg-provoid-600 hover:bg-cyan-700 rounded-xl font-semibold">
            Weiter
          </button>
        </div>
      )}

      {/* Tactical Test */}
      {phase === 'tactical' && (
        <div className="py-4">
          <div className="bg-gray-800 p-4 rounded-xl mb-6">
            <p className="text-lg text-white">{scenario}</p>
          </div>
          
          <div className="space-y-3">
            {decisionOptions.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleTacticalDecision(opt)}
                className="w-full p-4 bg-gray-700 hover:bg-gray-600 rounded-xl text-left transition-colors text-white"
              >
                {opt.text}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Anticipation Intro */}
      {phase === 'anticipation_intro' && (
        <div className="text-center py-8">
          <h3 className="text-xl font-semibold mb-4">Test 3: Antizipation</h3>
          <div className="bg-gray-800/50 rounded-2xl p-6 mb-6 max-w-lg mx-auto text-left">
            <h4 className="font-semibold text-provoid-400 mb-3">So funktioniert der Test:</h4>
            <ol className="space-y-2 text-gray-300">
              <li className="flex gap-3">
                <span className="bg-provoid-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
                <span>Ein <strong className="text-white">Ball</strong> fliegt über das Spielfeld.</span>
              </li>
              <li className="flex gap-3">
                <span className="bg-provoid-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
                <span>Der Ball <strong className="text-yellow-400">verschwindet</strong> bevor er ankommt.</span>
              </li>
              <li className="flex gap-3">
                <span className="bg-provoid-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>
                <span>Klicke auf <strong className="text-green-400">Links</strong>, <strong className="text-green-400">Mitte</strong> oder <strong className="text-green-400">Rechts</strong> - wo der Ball landen würde.</span>
              </li>
            </ol>
          </div>
          <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl mb-6 max-w-md mx-auto">
            <p className="text-sm text-blue-300">
              <strong>Neurowissenschaft:</strong> Antizipation aktiviert prädiktive 
              Prozesse im Kleinhirn und posterioren Parietalkortex.
            </p>
          </div>
          <button onClick={startAnticipationTest} className="px-6 py-3 bg-provoid-600 hover:bg-cyan-700 rounded-xl font-semibold">
            Weiter
          </button>
        </div>
      )}

      {/* Anticipation Test */}
      {phase === 'anticipation' && (
        <div className="py-4">
          <div className="relative w-full h-64 bg-gradient-to-b from-green-900 to-green-700 rounded-xl overflow-hidden mb-4">
            {/* Field markings */}
            <div className="absolute bottom-0 left-0 right-0 h-16 border-t-2 border-white/30" />
            
            {/* Moving ball */}
            {movingObject && !occluded && (
              <div 
                className="absolute w-6 h-6 bg-white rounded-full shadow-lg transform -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${movingObject.x}%`, top: `${movingObject.y}%` }}
              />
            )}
            
            {/* Occlusion overlay */}
            {occluded && (
              <div className="absolute inset-0 bg-gray-800/80 flex items-center justify-center">
                <p className="text-xl font-semibold">Wo landet der Ball?</p>
              </div>
            )}
            
            {/* Target zones - 3 Zonen */}
            <div className="absolute bottom-0 left-0 right-0 flex justify-around px-4 py-2">
              {targetZones.map(zone => (
                <button
                  key={zone.id}
                  onClick={() => handleAnticipationResponse(zone.id)}
                  disabled={!occluded}
                  className={`px-6 py-3 rounded-xl transition-all text-base font-bold ${
                    occluded 
                      ? 'bg-provoid-600 hover:bg-provoid-500 hover:scale-110 shadow-lg' 
                      : 'bg-gray-600/50 cursor-not-allowed'
                  }`}
                >
                  {zone.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Feedback */}
      {feedback && (
        <div className={`text-center px-4 py-2 rounded-lg ${
          feedback.type === 'success' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
        }`}>
          {feedback.message}
        </div>
      )}

      {/* Complete */}
      {phase === 'complete' && (
        <div className="text-center py-12">
          <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl">✓</span>
          </div>
          <h3 className="text-xl font-semibold mb-2">Test abgeschlossen!</h3>
          <p className="text-gray-500">Lade Ergebnisse...</p>
        </div>
      )}

      {phase !== 'complete' && (
        <div className="flex justify-center pt-4">
          <button onClick={onCancel} className="text-sm text-gray-500 hover:text-gray-600">
            Test abbrechen
          </button>
        </div>
      )}
    </div>
  );
};

export default DecisionMakingTest;
