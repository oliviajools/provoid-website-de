import React, { useState, useEffect, useRef, useCallback } from 'react';

const PerceptionTest = ({ onComplete, onCancel }) => {
  const [phase, setPhase] = useState('intro');
  const [trial, setTrial] = useState(0);
  const [results, setResults] = useState([]);
  const [feedback, setFeedback] = useState(null);
  
  // Visual tracking state
  const [ballPosition, setBallPosition] = useState({ x: 50, y: 50 });
  const [targetBall, setTargetBall] = useState(0);
  const [balls, setBalls] = useState([]);
  const [trackingPhase, setTrackingPhase] = useState('show'); // show, track, respond
  const [remainingTargets, setRemainingTargets] = useState(0);
  const responseTimeoutRef = useRef(null);
  
  // Spatial awareness state
  const [gridItems, setGridItems] = useState([]);
  const [correctPositions, setCorrectPositions] = useState([]);
  const [userSelections, setUserSelections] = useState([]);
  
  // Peripheral vision state
  const [centralTarget, setCentralTarget] = useState(null);
  const [peripheralTarget, setPeripheralTarget] = useState(null);
  const [showPeripheral, setShowPeripheral] = useState(false);
  
  const timeoutRef = useRef(null);
  const intervalRef = useRef(null);
  const trialDataRef = useRef([]);
  const stimulusStartRef = useRef(null);

  const TRIALS_PER_TEST = 6;

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (responseTimeoutRef.current) clearTimeout(responseTimeoutRef.current);
    };
  }, []);

  // Visual Tracking Test (Multiple Object Tracking - MOT)
  const startVisualTracking = useCallback(() => {
    setPhase('tracking');
    setTrial(0);
    trialDataRef.current = [];
    runTrackingTrial();
  }, []);

  const runTrackingTrial = () => {
    setFeedback(null);
    setTrackingPhase('show');
    
    // Create balls
    const numBalls = 4 + Math.floor(trial / 2);
    const numTargets = 2;
    const newBalls = Array.from({ length: numBalls }, (_, i) => ({
      id: i,
      x: 10 + Math.random() * 80,
      y: 10 + Math.random() * 80,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      isTarget: i < numTargets
    }));
    
    setBalls(newBalls);
    setTargetBall(numTargets);
    
    // Show targets for 2 seconds
    timeoutRef.current = setTimeout(() => {
      setTrackingPhase('track');
      
      // Animate balls
      intervalRef.current = setInterval(() => {
        setBalls(prev => prev.map(ball => {
          let newX = ball.x + ball.vx;
          let newY = ball.y + ball.vy;
          let newVx = ball.vx;
          let newVy = ball.vy;
          
          // Bounce off walls
          if (newX < 5 || newX > 95) { newVx = -newVx; newX = Math.max(5, Math.min(95, newX)); }
          if (newY < 5 || newY > 95) { newVy = -newVy; newY = Math.max(5, Math.min(95, newY)); }
          
          return { ...ball, x: newX, y: newY, vx: newVx, vy: newVy };
        }));
      }, 50);
      
      // After 4 seconds, stop and ask for response
      timeoutRef.current = setTimeout(() => {
        clearInterval(intervalRef.current);
        setTrackingPhase('respond');
        setRemainingTargets(numTargets);
        stimulusStartRef.current = performance.now();
        
        // Auto-advance after 10 seconds if no response
        responseTimeoutRef.current = setTimeout(() => {
          const nextTrial = trial + 1;
          setTrial(nextTrial);
          setFeedback({ type: 'error', message: 'Zeit abgelaufen!' });
          
          setTimeout(() => {
            if (nextTrial >= TRIALS_PER_TEST) {
              finishTrackingTest();
            } else {
              runTrackingTrial();
            }
          }, 1500);
        }, 10000);
      }, 4000);
    }, 2000);
  };

  const handleBallClick = (ballId) => {
    if (trackingPhase !== 'respond') return;
    
    const ball = balls.find(b => b.id === ballId);
    if (!ball || ball.selected) return;
    
    const correct = ball.isTarget;
    trialDataRef.current.push({ correct, responseTime: performance.now() - stimulusStartRef.current });
    
    // Update ball to show selection
    const updatedBalls = balls.map(b => 
      b.id === ballId ? { ...b, selected: true, wasCorrect: correct } : b
    );
    setBalls(updatedBalls);
    
    // Check if all targets found or too many errors
    const selectedTargets = updatedBalls.filter(b => b.selected && b.isTarget).length;
    const errors = updatedBalls.filter(b => b.selected && !b.isTarget).length;
    const remaining = targetBall - selectedTargets;
    setRemainingTargets(Math.max(0, remaining));
    
    setFeedback({ type: correct ? 'success' : 'error', message: correct ? `Richtig! Noch ${remaining} Ziel(e)` : 'Falsch!' });
    
    if (selectedTargets >= targetBall || errors >= 2) {
      // Clear response timeout
      if (responseTimeoutRef.current) clearTimeout(responseTimeoutRef.current);
      
      setTimeout(() => {
        const nextTrial = trial + 1;
        setTrial(nextTrial);
        
        if (nextTrial >= TRIALS_PER_TEST) {
          finishTrackingTest();
        } else {
          runTrackingTrial();
        }
      }, 1500);
    }
  };

  const finishTrackingTest = () => {
    const correctResponses = trialDataRef.current.filter(t => t.correct).length;
    const totalResponses = trialDataRef.current.length;
    const accuracy = totalResponses > 0 ? correctResponses / totalResponses : 0;
    const normalizedScore = Math.max(0, Math.min(100, accuracy * 100));
    
    setResults(prev => [...prev, {
      test_name: 'visual_tracking',
      subcategory: 'Visuelle Objektverfolgung (MOT)',
      raw_score: correctResponses,
      normalized_score: normalizedScore,
      accuracy_percent: accuracy * 100,
      trials_completed: TRIALS_PER_TEST,
      errors: trialDataRef.current.filter(t => !t.correct).length
    }]);
    
    trialDataRef.current = [];
    setPhase('spatial_intro');
  };

  // Spatial Awareness Test
  const startSpatialTest = useCallback(() => {
    setPhase('spatial');
    setTrial(0);
    trialDataRef.current = [];
    runSpatialTrial();
  }, []);

  const runSpatialTrial = () => {
    setFeedback(null);
    setUserSelections([]);
    
    // Create grid with highlighted positions
    const numPositions = 3 + Math.floor(trial / 2);
    const positions = [];
    while (positions.length < numPositions) {
      const pos = Math.floor(Math.random() * 16);
      if (!positions.includes(pos)) positions.push(pos);
    }
    
    setCorrectPositions(positions);
    setGridItems(positions);
    
    // Show for 2 seconds then hide
    timeoutRef.current = setTimeout(() => {
      setGridItems([]);
      stimulusStartRef.current = performance.now();
    }, 2000);
  };

  const handleGridClick = (pos) => {
    if (gridItems.length > 0) return; // Still showing pattern
    
    if (userSelections.includes(pos)) {
      setUserSelections(prev => prev.filter(p => p !== pos));
    } else {
      const newSelections = [...userSelections, pos];
      setUserSelections(newSelections);
      
      // Check if enough selections made
      if (newSelections.length >= correctPositions.length) {
        const correctCount = newSelections.filter(p => correctPositions.includes(p)).length;
        const accuracy = correctCount / correctPositions.length;
        const responseTime = performance.now() - stimulusStartRef.current;
        
        trialDataRef.current.push({ accuracy, responseTime, correctCount, total: correctPositions.length });
        
        setFeedback({ 
          type: accuracy >= 0.8 ? 'success' : 'error', 
          message: `${correctCount}/${correctPositions.length} richtig` 
        });
        
        setTimeout(() => {
          const nextTrial = trial + 1;
          setTrial(nextTrial);
          
          if (nextTrial >= TRIALS_PER_TEST) {
            finishSpatialTest();
          } else {
            runSpatialTrial();
          }
        }, 1500);
      }
    }
  };

  const finishSpatialTest = () => {
    const totalTrials = trialDataRef.current.length;
    const avgAccuracy = totalTrials > 0 
      ? trialDataRef.current.reduce((sum, t) => sum + t.accuracy, 0) / totalTrials 
      : 0;
    const normalizedScore = Math.max(0, Math.min(100, avgAccuracy * 100));
    
    setResults(prev => [...prev, {
      test_name: 'spatial_awareness',
      subcategory: 'Räumliches Arbeitsgedächtnis',
      raw_score: avgAccuracy * 100,
      normalized_score: normalizedScore,
      accuracy_percent: avgAccuracy * 100,
      trials_completed: TRIALS_PER_TEST,
      errors: Math.round((1 - avgAccuracy) * TRIALS_PER_TEST)
    }]);
    
    trialDataRef.current = [];
    setPhase('peripheral_intro');
  };

  // Peripheral Vision Test
  const startPeripheralTest = useCallback(() => {
    setPhase('peripheral');
    setTrial(0);
    trialDataRef.current = [];
    runPeripheralTrial();
  }, []);

  const runPeripheralTrial = () => {
    setFeedback(null);
    setShowPeripheral(false);
    setCentralTarget(Math.floor(Math.random() * 9) + 1); // 1-9
    
    const delay = 1000 + Math.random() * 2000;
    
    timeoutRef.current = setTimeout(() => {
      // Show peripheral target in random position
      const positions = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];
      setPeripheralTarget(positions[Math.floor(Math.random() * 4)]);
      setShowPeripheral(true);
      stimulusStartRef.current = performance.now();
      
      // Auto-hide after 300ms
      timeoutRef.current = setTimeout(() => {
        setShowPeripheral(false);
      }, 300);
    }, delay);
  };

  const handlePeripheralResponse = (position) => {
    const responseTime = performance.now() - stimulusStartRef.current;
    const correct = position === peripheralTarget;
    
    trialDataRef.current.push({ correct, responseTime });
    
    setFeedback({ 
      type: correct ? 'success' : 'error', 
      message: correct ? `${Math.round(responseTime)} ms` : 'Falsche Position!' 
    });
    
    const nextTrial = trial + 1;
    setTrial(nextTrial);
    
    if (nextTrial >= TRIALS_PER_TEST) {
      finishPeripheralTest();
    } else {
      setTimeout(runPeripheralTrial, 1500);
    }
  };

  const finishPeripheralTest = () => {
    const correctTrials = trialDataRef.current.filter(t => t.correct);
    const accuracy = correctTrials.length / TRIALS_PER_TEST;
    const avgRT = correctTrials.length > 0 
      ? correctTrials.reduce((sum, t) => sum + t.responseTime, 0) / correctTrials.length 
      : 1000;
    
    const rtScore = Math.max(0, Math.min(100, 100 - ((avgRT - 300) / 7)));
    const normalizedScore = (rtScore * 0.5) + (accuracy * 50);
    
    setResults(prev => [...prev, {
      test_name: 'peripheral_vision',
      subcategory: 'Periphere Wahrnehmung',
      raw_score: avgRT,
      normalized_score: normalizedScore,
      reaction_time_ms: avgRT,
      accuracy_percent: accuracy * 100,
      trials_completed: TRIALS_PER_TEST,
      errors: TRIALS_PER_TEST - correctTrials.length
    }]);
    
    setPhase('complete');
  };

  useEffect(() => {
    if (phase === 'complete') {
      // Complete after 2 seconds regardless of results count
      const timer = setTimeout(() => {
        onComplete(results.length > 0 ? results : [{
          test_name: 'perception_fallback',
          subcategory: 'Wahrnehmung',
          normalized_score: 50,
          trials_completed: 0
        }]);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [phase, results, onComplete]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between text-sm text-gray-500">
        <span>Wahrnehmung & Orientierung</span>
        <span>
          {phase === 'tracking' && `Objektverfolgung: ${trial}/${TRIALS_PER_TEST}`}
          {phase === 'spatial' && `Räumlich: ${trial}/${TRIALS_PER_TEST}`}
          {phase === 'peripheral' && `Peripher: ${trial}/${TRIALS_PER_TEST}`}
        </span>
      </div>

      {/* Intro */}
      {phase === 'intro' && (
        <div className="text-center py-8">
          <h3 className="text-2xl font-bold mb-6 text-white">Test 1: Visuelle Objektverfolgung</h3>
          
          <div className="bg-gray-800/50 rounded-2xl p-6 mb-6 max-w-lg mx-auto text-left">
            <h4 className="font-semibold text-provoid-400 mb-3 text-lg">So funktioniert der Test:</h4>
            <ol className="space-y-3 text-gray-300">
              <li className="flex gap-3">
                <span className="bg-provoid-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
                <span>Du siehst mehrere Bälle. <strong className="text-provoid-300">2 davon leuchten auf</strong> – merke dir diese!</span>
              </li>
              <li className="flex gap-3">
                <span className="bg-provoid-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
                <span>Alle Bälle beginnen sich zu bewegen. <strong className="text-provoid-300">Verfolge die Zielbälle mit den Augen</strong>.</span>
              </li>
              <li className="flex gap-3">
                <span className="bg-provoid-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>
                <span>Wenn die Bälle stoppen, <strong className="text-provoid-300">klicke auf die beiden Zielbälle</strong>.</span>
              </li>
            </ol>
          </div>
          
          <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl mb-6 max-w-lg mx-auto">
            <p className="text-sm text-blue-300">
              <strong>Neurowissenschaft:</strong> Multiple Object Tracking (MOT) aktiviert den 
              parietalen Kortex und testet deine Fähigkeit zur verteilten visuellen Aufmerksamkeit.
            </p>
          </div>
          
          <button onClick={startVisualTracking} className="px-8 py-4 bg-provoid-600 hover:bg-provoid-500 rounded-xl font-semibold text-lg transition-all hover:scale-105">
            Test starten
          </button>
        </div>
      )}

      {/* Visual Tracking */}
      {phase === 'tracking' && (
        <div className="space-y-4">
          <div className="relative w-full h-80 bg-gray-800 rounded-2xl overflow-hidden border-2 border-gray-700">
            {balls.map(ball => (
              <div
                key={ball.id}
                onClick={() => handleBallClick(ball.id)}
                className={`absolute w-10 h-10 rounded-full transition-all cursor-pointer transform -translate-x-1/2 -translate-y-1/2 shadow-lg ${
                  trackingPhase === 'show' && ball.isTarget 
                    ? 'bg-provoid-500 ring-4 ring-provoid-300 animate-pulse' 
                    : ball.selected
                    ? ball.wasCorrect ? 'bg-green-500 ring-2 ring-green-300' : 'bg-red-500 ring-2 ring-red-300'
                    : 'bg-blue-500 hover:scale-125 hover:bg-blue-400'
                }`}
                style={{ left: `${ball.x}%`, top: `${ball.y}%` }}
              />
            ))}
          </div>
          
          <div className="text-center py-3 bg-gray-800/50 rounded-xl">
            {trackingPhase === 'show' && (
              <p className="text-xl font-semibold text-provoid-400">👀 Merke dir die leuchtenden Bälle!</p>
            )}
            {trackingPhase === 'track' && (
              <p className="text-xl font-semibold text-yellow-400">🎯 Verfolge sie mit den Augen...</p>
            )}
            {trackingPhase === 'respond' && (
              <p className="text-xl font-semibold text-green-400">👆 Klicke auf {remainingTargets} Ziel-Ball{remainingTargets !== 1 ? 'e' : ''}!</p>
            )}
          </div>
        </div>
      )}

      {/* Spatial Intro */}
      {phase === 'spatial_intro' && (
        <div className="text-center py-8">
          <h3 className="text-2xl font-bold mb-6 text-white">Test 2: Räumliches Arbeitsgedächtnis</h3>
          
          <div className="bg-gray-800/50 rounded-2xl p-6 mb-6 max-w-lg mx-auto text-left">
            <h4 className="font-semibold text-provoid-400 mb-3 text-lg">So funktioniert der Test:</h4>
            <ol className="space-y-3 text-gray-300">
              <li className="flex gap-3">
                <span className="bg-provoid-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
                <span>Du siehst ein 4x4 Raster. <strong className="text-provoid-300">Einige Felder leuchten kurz auf</strong>.</span>
              </li>
              <li className="flex gap-3">
                <span className="bg-provoid-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
                <span><strong className="text-provoid-300">Merke dir die Positionen</strong> der aufleuchtenden Felder.</span>
              </li>
              <li className="flex gap-3">
                <span className="bg-provoid-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>
                <span>Wenn alle Felder wieder grau sind, <strong className="text-provoid-300">klicke auf die richtigen Positionen</strong>.</span>
              </li>
            </ol>
          </div>
          
          <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl mb-6 max-w-lg mx-auto">
            <p className="text-sm text-blue-300">
              <strong>Neurowissenschaft:</strong> Räumliches Arbeitsgedächtnis involviert den 
              dorsolateralen präfrontalen Kortex und den posterioren Parietalkortex.
            </p>
          </div>
          
          <button onClick={startSpatialTest} className="px-8 py-4 bg-provoid-600 hover:bg-provoid-500 rounded-xl font-semibold text-lg transition-all hover:scale-105">
            Test starten
          </button>
        </div>
      )}

      {/* Spatial Test */}
      {phase === 'spatial' && (
        <div className="flex flex-col items-center py-4">
          <div className="grid grid-cols-4 gap-3 mb-6 p-4 bg-gray-800/50 rounded-2xl">
            {Array.from({ length: 16 }, (_, i) => (
              <button
                key={i}
                onClick={() => handleGridClick(i)}
                className={`w-16 h-16 rounded-xl transition-all shadow-md ${
                  gridItems.includes(i)
                    ? 'bg-provoid-500 ring-2 ring-provoid-300 animate-pulse'
                    : userSelections.includes(i)
                    ? 'bg-blue-500 ring-2 ring-blue-300'
                    : 'bg-gray-700 hover:bg-gray-600 hover:scale-105'
                }`}
              />
            ))}
          </div>
          
          <div className="text-center py-3 bg-gray-800/50 rounded-xl px-6">
            {gridItems.length > 0 
              ? <p className="text-xl font-semibold text-provoid-400">👀 Merke dir die Positionen...</p>
              : <p className="text-xl font-semibold text-green-400">👆 Wähle {correctPositions.length} Felder ({userSelections.length}/{correctPositions.length})</p>
            }
          </div>
        </div>
      )}

      {/* Peripheral Intro */}
      {phase === 'peripheral_intro' && (
        <div className="text-center py-8">
          <h3 className="text-2xl font-bold mb-6 text-white">Test 3: Periphere Wahrnehmung</h3>
          
          <div className="bg-gray-800/50 rounded-2xl p-6 mb-6 max-w-lg mx-auto text-left">
            <h4 className="font-semibold text-provoid-400 mb-3 text-lg">So funktioniert der Test:</h4>
            <ol className="space-y-3 text-gray-300">
              <li className="flex gap-3">
                <span className="bg-provoid-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
                <span><strong className="text-provoid-300">Fixiere die Zahl in der Mitte</strong> des Bildschirms mit deinen Augen.</span>
              </li>
              <li className="flex gap-3">
                <span className="bg-provoid-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
                <span>Ein <strong className="text-yellow-400">gelber Punkt</strong> erscheint kurz in einer der vier Ecken.</span>
              </li>
              <li className="flex gap-3">
                <span className="bg-provoid-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>
                <span><strong className="text-provoid-300">Klicke sofort auf die Ecke</strong>, in der du den Punkt gesehen hast.</span>
              </li>
            </ol>
            <p className="mt-4 text-amber-400 text-sm">⚠️ Wichtig: Bewege nicht deine Augen – nutze dein peripheres Sehen!</p>
          </div>
          
          <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl mb-6 max-w-lg mx-auto">
            <p className="text-sm text-blue-300">
              <strong>Neurowissenschaft:</strong> Periphere Wahrnehmung testet die Funktion 
              des ventralen visuellen Stroms und deine periphere Retinotopie.
            </p>
          </div>
          
          <button onClick={startPeripheralTest} className="px-8 py-4 bg-provoid-600 hover:bg-provoid-500 rounded-xl font-semibold text-lg transition-all hover:scale-105">
            Test starten
          </button>
        </div>
      )}

      {/* Peripheral Test */}
      {phase === 'peripheral' && (
        <div className="space-y-4">
          <div className="relative w-full h-80 bg-gray-800 rounded-2xl border-2 border-gray-700">
            {/* Central fixation */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 bg-gray-700 rounded-xl flex items-center justify-center text-4xl font-bold border-2 border-provoid-500">
                {centralTarget}
              </div>
            </div>
            
            {/* Peripheral targets */}
            {showPeripheral && (
              <div className={`absolute w-10 h-10 bg-yellow-400 rounded-full shadow-lg shadow-yellow-400/50 animate-ping ${
                peripheralTarget === 'top-left' ? 'top-4 left-4' :
                peripheralTarget === 'top-right' ? 'top-4 right-4' :
                peripheralTarget === 'bottom-left' ? 'bottom-4 left-4' :
                'bottom-4 right-4'
              }`} />
            )}
            
            {/* Response buttons */}
            <button onClick={() => handlePeripheralResponse('top-left')} className="absolute top-2 left-2 w-14 h-14 bg-white/10 hover:bg-white/30 rounded-lg border border-white/20 transition-all hover:scale-110" />
            <button onClick={() => handlePeripheralResponse('top-right')} className="absolute top-2 right-2 w-14 h-14 bg-white/10 hover:bg-white/30 rounded-lg border border-white/20 transition-all hover:scale-110" />
            <button onClick={() => handlePeripheralResponse('bottom-left')} className="absolute bottom-2 left-2 w-14 h-14 bg-white/10 hover:bg-white/30 rounded-lg border border-white/20 transition-all hover:scale-110" />
            <button onClick={() => handlePeripheralResponse('bottom-right')} className="absolute bottom-2 right-2 w-14 h-14 bg-white/10 hover:bg-white/30 rounded-lg border border-white/20 transition-all hover:scale-110" />
          </div>
          
          <div className="text-center py-3 bg-gray-800/50 rounded-xl">
            <p className="text-xl font-semibold text-provoid-400">👁️ Fixiere die Zahl – warte auf den gelben Punkt!</p>
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

export default PerceptionTest;
