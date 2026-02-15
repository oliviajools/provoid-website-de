import React, { useState, useEffect, useRef, useCallback } from 'react';

const AttentionTest = ({ onComplete, onCancel }) => {
  const [phase, setPhase] = useState('intro');
  const [trial, setTrial] = useState(0);
  const [results, setResults] = useState([]);
  const [feedback, setFeedback] = useState(null);
  
  // Sustained attention (Vigilance/CPT-like)
  const [currentLetter, setCurrentLetter] = useState('');
  const [previousLetter, setPreviousLetter] = useState('');
  const [sustainedTrials, setSustainedTrials] = useState(0);
  
  // Selective attention (Stroop-like)
  const [stroopWord, setStroopWord] = useState('');
  const [stroopColor, setStroopColor] = useState('');
  const [colorOptions, setColorOptions] = useState([]);
  
  // Divided attention (Dual-task)
  const [numberSequence, setNumberSequence] = useState([]);
  const [shapePosition, setShapePosition] = useState(null);
  const [shapeType, setShapeType] = useState('');
  const [dualTaskPhase, setDualTaskPhase] = useState('show');
  
  const timeoutRef = useRef(null);
  const intervalRef = useRef(null);
  const trialDataRef = useRef([]);
  const stimulusStartRef = useRef(null);
  const sustainedResponseRef = useRef(false);
  const sustainedTrialCountRef = useRef(0);

  const TRIALS_SUSTAINED = 30;
  const TRIALS_PER_TEST = 8;

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // Sustained Attention Test (Continuous Performance Test variant)
  const startSustainedTest = useCallback(() => {
    setPhase('sustained');
    setTrial(0);
    setSustainedTrials(0);
    sustainedTrialCountRef.current = 0;
    trialDataRef.current = [];
    setPreviousLetter('');
    runSustainedTrial();
  }, []);

  const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'X'];
  
  const runSustainedTrial = () => {
    setFeedback(null);
    sustainedResponseRef.current = false;
    
    // 30% chance of target (X) - increased difficulty
    const isTarget = Math.random() < 0.3;
    const letter = isTarget ? 'X' : letters[Math.floor(Math.random() * (letters.length - 1))];
    
    setCurrentLetter(letter);
    stimulusStartRef.current = performance.now();
    
    // Letter shown for 1000ms, then blank for 500ms
    timeoutRef.current = setTimeout(() => {
      setCurrentLetter('');
      
      // Record if no response was made
      if (!sustainedResponseRef.current) {
        if (letter === 'X') {
          trialDataRef.current.push({ type: 'miss', letter });
        } else {
          trialDataRef.current.push({ type: 'correct_rejection', letter });
        }
      }
      
      timeoutRef.current = setTimeout(() => {
        sustainedTrialCountRef.current += 1;
        const nextTrialNum = sustainedTrialCountRef.current;
        setSustainedTrials(nextTrialNum);
        
        if (nextTrialNum >= TRIALS_SUSTAINED) {
          finishSustainedTest();
        } else {
          runSustainedTrial();
        }
      }, 500);
    }, 1000);
  };

  const handleSustainedResponse = () => {
    if (sustainedResponseRef.current || !currentLetter) return;
    sustainedResponseRef.current = true;
    
    const responseTime = performance.now() - stimulusStartRef.current;
    const isTarget = currentLetter === 'X';
    
    if (isTarget) {
      // Hit
      trialDataRef.current.push({ type: 'hit', responseTime, letter: currentLetter });
      setFeedback({ type: 'success', message: '✓' });
    } else {
      // False alarm
      trialDataRef.current.push({ type: 'false_alarm', responseTime, letter: currentLetter });
      setFeedback({ type: 'error', message: '✗' });
    }
  };

  const finishSustainedTest = () => {
    const hits = trialDataRef.current.filter(t => t.type === 'hit');
    const misses = trialDataRef.current.filter(t => t.type === 'miss');
    const falseAlarms = trialDataRef.current.filter(t => t.type === 'false_alarm');
    const correctRejections = trialDataRef.current.filter(t => t.type === 'correct_rejection');
    
    const totalTargets = hits.length + misses.length;
    const totalNonTargets = falseAlarms.length + correctRejections.length;
    
    const hitRate = totalTargets > 0 ? hits.length / totalTargets : 0;
    const falseAlarmRate = totalNonTargets > 0 ? falseAlarms.length / totalNonTargets : 0;
    
    // d' approximation (sensitivity)
    const dPrime = Math.min(3, Math.max(-3, hitRate - falseAlarmRate)) + 1.5;
    const normalizedScore = Math.max(0, Math.min(100, (dPrime / 3) * 100));
    
    const avgRT = hits.length > 0 
      ? hits.reduce((sum, t) => sum + t.responseTime, 0) / hits.length 
      : 500;
    
    setResults(prev => [...prev, {
      test_name: 'sustained_attention',
      subcategory: 'Daueraufmerksamkeit (CPT)',
      raw_score: hitRate * 100,
      normalized_score: normalizedScore,
      reaction_time_ms: avgRT,
      accuracy_percent: hitRate * 100,
      trials_completed: TRIALS_SUSTAINED,
      errors: misses.length + falseAlarms.length,
      metadata: { hitRate, falseAlarmRate, dPrime: dPrime - 1.5 }
    }]);
    
    trialDataRef.current = [];
    setPhase('selective_intro');
  };

  // Selective Attention Test (Stroop)
  const startSelectiveTest = useCallback(() => {
    setPhase('selective');
    setTrial(0);
    trialDataRef.current = [];
    runSelectiveTrial();
  }, []);

  const colorWords = [
    { word: 'ROT', colors: ['#ef4444', '#3b82f6', '#22c55e', '#eab308'] },
    { word: 'BLAU', colors: ['#3b82f6', '#ef4444', '#22c55e', '#eab308'] },
    { word: 'GRÜN', colors: ['#22c55e', '#ef4444', '#3b82f6', '#eab308'] },
    { word: 'GELB', colors: ['#eab308', '#ef4444', '#3b82f6', '#22c55e'] },
  ];
  
  const colorNames = {
    '#ef4444': 'ROT',
    '#3b82f6': 'BLAU', 
    '#22c55e': 'GRÜN',
    '#eab308': 'GELB'
  };

  const runSelectiveTrial = () => {
    setFeedback(null);
    
    const wordData = colorWords[Math.floor(Math.random() * colorWords.length)];
    const isCongruent = Math.random() < 0.3; // 30% congruent trials
    
    let inkColor;
    if (isCongruent) {
      inkColor = wordData.colors[0]; // Matching color
    } else {
      // Random non-matching color
      const otherColors = wordData.colors.slice(1);
      inkColor = otherColors[Math.floor(Math.random() * otherColors.length)];
    }
    
    setStroopWord(wordData.word);
    setStroopColor(inkColor);
    setColorOptions(['#ef4444', '#3b82f6', '#22c55e', '#eab308']);
    
    stimulusStartRef.current = performance.now();
  };

  const handleStroopResponse = (selectedColor) => {
    const responseTime = performance.now() - stimulusStartRef.current;
    const correct = selectedColor === stroopColor;
    
    trialDataRef.current.push({ 
      correct, 
      responseTime, 
      isCongruent: colorNames[stroopColor] === stroopWord 
    });
    
    setFeedback({ 
      type: correct ? 'success' : 'error', 
      message: correct ? `${Math.round(responseTime)} ms` : 'Falsch!' 
    });
    
    const nextTrial = trial + 1;
    setTrial(nextTrial);
    
    if (nextTrial >= TRIALS_PER_TEST) {
      setTimeout(finishSelectiveTest, 1000);
    } else {
      setTimeout(runSelectiveTrial, 1000);
    }
  };

  const finishSelectiveTest = () => {
    const correctTrials = trialDataRef.current.filter(t => t.correct);
    const accuracy = correctTrials.length / TRIALS_PER_TEST;
    
    const incongruentTrials = trialDataRef.current.filter(t => !t.isCongruent && t.correct);
    const congruentTrials = trialDataRef.current.filter(t => t.isCongruent && t.correct);
    
    const incongruentRT = incongruentTrials.length > 0 
      ? incongruentTrials.reduce((sum, t) => sum + t.responseTime, 0) / incongruentTrials.length 
      : 1000;
    const congruentRT = congruentTrials.length > 0
      ? congruentTrials.reduce((sum, t) => sum + t.responseTime, 0) / congruentTrials.length
      : 800;
    
    // Stroop effect (interference)
    const stroopEffect = incongruentRT - congruentRT;
    
    // Lower stroop effect = better inhibition
    const rtScore = Math.max(0, Math.min(50, 50 - (stroopEffect / 10)));
    const normalizedScore = (accuracy * 50) + rtScore;
    
    setResults(prev => [...prev, {
      test_name: 'selective_attention',
      subcategory: 'Selektive Aufmerksamkeit (Stroop)',
      raw_score: stroopEffect,
      normalized_score: normalizedScore,
      reaction_time_ms: (incongruentRT + congruentRT) / 2,
      accuracy_percent: accuracy * 100,
      trials_completed: TRIALS_PER_TEST,
      errors: TRIALS_PER_TEST - correctTrials.length,
      metadata: { stroopEffect, incongruentRT, congruentRT }
    }]);
    
    trialDataRef.current = [];
    setPhase('divided_intro');
  };

  // Divided Attention Test
  const startDividedTest = useCallback(() => {
    setPhase('divided');
    setTrial(0);
    trialDataRef.current = [];
    runDividedTrial();
  }, []);

  const runDividedTrial = () => {
    setFeedback(null);
    setDualTaskPhase('show');
    
    // Generate number sequence (3-5 numbers)
    const length = 3 + Math.floor(trial / 3);
    const sequence = Array.from({ length }, () => Math.floor(Math.random() * 9) + 1);
    setNumberSequence(sequence);
    
    // Generate shape info
    const shapes = ['circle', 'square', 'triangle'];
    const positions = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];
    setShapeType(shapes[Math.floor(Math.random() * shapes.length)]);
    setShapePosition(positions[Math.floor(Math.random() * positions.length)]);
    
    // Show for 3 seconds then ask
    timeoutRef.current = setTimeout(() => {
      setDualTaskPhase('respond');
      stimulusStartRef.current = performance.now();
    }, 3000);
  };

  const [numberAnswer, setNumberAnswer] = useState('');
  const [shapeAnswer, setShapeAnswer] = useState('');

  const handleDividedSubmit = () => {
    const responseTime = performance.now() - stimulusStartRef.current;
    
    // Check number sum
    const correctSum = numberSequence.reduce((a, b) => a + b, 0);
    const numberCorrect = parseInt(numberAnswer) === correctSum;
    
    // Check shape position
    const shapeCorrect = shapeAnswer === shapePosition;
    
    trialDataRef.current.push({ 
      numberCorrect, 
      shapeCorrect, 
      responseTime,
      bothCorrect: numberCorrect && shapeCorrect
    });
    
    setFeedback({ 
      type: numberCorrect && shapeCorrect ? 'success' : 'error', 
      message: `Summe: ${numberCorrect ? '✓' : '✗'} | Position: ${shapeCorrect ? '✓' : '✗'}` 
    });
    
    setNumberAnswer('');
    setShapeAnswer('');
    
    const nextTrial = trial + 1;
    setTrial(nextTrial);
    
    if (nextTrial >= TRIALS_PER_TEST) {
      setTimeout(finishDividedTest, 1500);
    } else {
      setTimeout(runDividedTrial, 1500);
    }
  };

  const finishDividedTest = () => {
    const bothCorrect = trialDataRef.current.filter(t => t.bothCorrect).length;
    const numberOnly = trialDataRef.current.filter(t => t.numberCorrect).length;
    const shapeOnly = trialDataRef.current.filter(t => t.shapeCorrect).length;
    
    const dualTaskScore = (bothCorrect / TRIALS_PER_TEST) * 100;
    const partialScore = ((numberOnly + shapeOnly) / (TRIALS_PER_TEST * 2)) * 100;
    
    const normalizedScore = (dualTaskScore * 0.7) + (partialScore * 0.3);
    
    const avgRT = trialDataRef.current.reduce((sum, t) => sum + t.responseTime, 0) / TRIALS_PER_TEST;
    
    setResults(prev => [...prev, {
      test_name: 'divided_attention',
      subcategory: 'Geteilte Aufmerksamkeit (Dual-Task)',
      raw_score: dualTaskScore,
      normalized_score: normalizedScore,
      reaction_time_ms: avgRT,
      accuracy_percent: dualTaskScore,
      trials_completed: TRIALS_PER_TEST,
      errors: TRIALS_PER_TEST - bothCorrect
    }]);
    
    setPhase('complete');
  };

  useEffect(() => {
    if (phase === 'complete') {
      const timer = setTimeout(() => {
        onComplete(results.length > 0 ? results : [{ test_name: 'attention_fallback', subcategory: 'Aufmerksamkeit', normalized_score: 50, trials_completed: 0 }]);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [phase, results, onComplete]);

  const shapeComponents = {
    circle: <div className="w-8 h-8 bg-yellow-400 rounded-full" />,
    square: <div className="w-8 h-8 bg-yellow-400" />,
    triangle: (
      <div className="w-0 h-0 border-l-[16px] border-r-[16px] border-b-[28px] border-l-transparent border-r-transparent border-b-yellow-400" />
    )
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between text-sm text-gray-500">
        <span>Aufmerksamkeit & Fokus</span>
        <span>
          {phase === 'sustained' && `Vigilanz: ${sustainedTrials}/${TRIALS_SUSTAINED}`}
          {phase === 'selective' && `Stroop: ${trial}/${TRIALS_PER_TEST}`}
          {phase === 'divided' && `Dual-Task: ${trial}/${TRIALS_PER_TEST}`}
        </span>
      </div>

      {/* Intro */}
      {phase === 'intro' && (
        <div className="text-center py-8">
          <h3 className="text-xl font-semibold mb-4">Test 1: Daueraufmerksamkeit</h3>
          <p className="text-gray-500 mb-6 max-w-md mx-auto">
            Drücke die Leertaste oder klicke, wenn du den Buchstaben "X" siehst. 
            Reagiere NICHT auf andere Buchstaben!
          </p>
          <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl mb-6 max-w-md mx-auto">
            <p className="text-sm text-blue-300">
              <strong>Neurowissenschaft:</strong> Continuous Performance Test (CPT) misst 
              die Vigilanzfunktion des rechten präfrontalen Kortex.
            </p>
          </div>
          <button onClick={startSustainedTest} className="px-6 py-3 bg-provoid-600 hover:bg-cyan-700 rounded-xl font-semibold">
            Test starten
          </button>
        </div>
      )}

      {/* Sustained Attention */}
      {phase === 'sustained' && (
        <div className="flex flex-col items-center py-8 select-none">
          <div className="w-32 h-32 bg-gray-800 rounded-2xl flex items-center justify-center mb-6">
            <span className="text-6xl font-bold text-white">{currentLetter}</span>
          </div>
          
          <button
            onClick={handleSustainedResponse}
            className="w-40 h-40 rounded-full bg-provoid-600 hover:bg-provoid-500 active:scale-95 transition-all shadow-lg shadow-provoid-500/30 flex items-center justify-center mb-4"
          >
            <span className="text-5xl font-bold text-white">X</span>
          </button>
          
          <p className="text-gray-400 text-sm">Drücke den Button nur bei "X"</p>
          
          {feedback && (
            <div className={`mt-4 text-4xl ${
              feedback.type === 'success' ? 'text-green-400' : 'text-red-400'
            }`}>
              {feedback.message}
            </div>
          )}
          
          <div className="mt-6 w-64 h-2 bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-provoid-500 transition-all duration-100"
              style={{ width: `${(sustainedTrials / TRIALS_SUSTAINED) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Selective Intro */}
      {phase === 'selective_intro' && (
        <div className="text-center py-8">
          <h3 className="text-xl font-semibold mb-4">Test 2: Selektive Aufmerksamkeit (Stroop)</h3>
          <p className="text-gray-500 mb-6 max-w-md mx-auto">
            Wähle die FARBE in der das Wort geschrieben ist, ignoriere die Bedeutung des Wortes!
          </p>
          <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl mb-6 max-w-md mx-auto">
            <p className="text-sm text-blue-300">
              <strong>Neurowissenschaft:</strong> Der Stroop-Effekt misst die kognitive 
              Kontrolle des anterioren cingulären Kortex über automatische Prozesse.
            </p>
          </div>
          <button onClick={startSelectiveTest} className="px-6 py-3 bg-provoid-600 hover:bg-cyan-700 rounded-xl font-semibold">
            Weiter
          </button>
        </div>
      )}

      {/* Selective Attention (Stroop) */}
      {phase === 'selective' && (
        <div className="flex flex-col items-center py-8">
          <p className="text-gray-500 mb-4">In welcher FARBE ist das Wort geschrieben?</p>
          
          <div className="w-48 h-24 bg-gray-800 rounded-2xl flex items-center justify-center mb-8">
            <span 
              className="text-4xl font-bold"
              style={{ color: stroopColor }}
            >
              {stroopWord}
            </span>
          </div>
          
          <div className="flex gap-4">
            {colorOptions.map((color) => (
              <button
                key={color}
                onClick={() => handleStroopResponse(color)}
                className="w-16 h-16 rounded-xl border-4 border-gray-600 hover:border-white transition-colors"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Divided Intro */}
      {phase === 'divided_intro' && (
        <div className="text-center py-8">
          <h3 className="text-xl font-semibold mb-4">Test 3: Geteilte Aufmerksamkeit</h3>
          <p className="text-gray-500 mb-6 max-w-md mx-auto">
            Merke dir gleichzeitig die Summe der Zahlen UND die Position der Form.
          </p>
          <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl mb-6 max-w-md mx-auto">
            <p className="text-sm text-blue-300">
              <strong>Neurowissenschaft:</strong> Dual-Task Performance testet die 
              exekutive Kontrolle und Arbeitsgedächtniskapazität.
            </p>
          </div>
          <button onClick={startDividedTest} className="px-6 py-3 bg-provoid-600 hover:bg-cyan-700 rounded-xl font-semibold">
            Weiter
          </button>
        </div>
      )}

      {/* Divided Attention */}
      {phase === 'divided' && (
        <div className="py-4">
          {dualTaskPhase === 'show' ? (
            <div className="relative">
              {/* Numbers */}
              <div className="flex justify-center gap-3 mb-8">
                {numberSequence.map((num, i) => (
                  <div key={i} className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center text-2xl font-bold">
                    {num}
                  </div>
                ))}
              </div>
              
              {/* Shape container */}
              <div className="relative w-full h-48 bg-gray-800 rounded-xl">
                <div className={`absolute ${
                  shapePosition === 'top-left' ? 'top-4 left-4' :
                  shapePosition === 'top-right' ? 'top-4 right-4' :
                  shapePosition === 'bottom-left' ? 'bottom-4 left-4' :
                  'bottom-4 right-4'
                }`}>
                  {shapeComponents[shapeType]}
                </div>
              </div>
              
              <p className="text-center mt-4 text-provoid-400">Merke dir Summe und Position...</p>
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <label className="block text-sm text-gray-500 mb-2">Summe der Zahlen:</label>
                <input
                  type="number"
                  value={numberAnswer}
                  onChange={(e) => setNumberAnswer(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl focus:outline-none focus:border-provoid-500 text-xl"
                  placeholder="?"
                  autoFocus
                />
              </div>
              
              <div>
                <label className="block text-sm text-gray-500 mb-2">Position der Form:</label>
                <div className="grid grid-cols-2 gap-2">
                  {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map((pos) => (
                    <button
                      key={pos}
                      onClick={() => setShapeAnswer(pos)}
                      className={`p-3 rounded-xl transition-colors ${
                        shapeAnswer === pos 
                        ? 'bg-provoid-500' 
                        : 'bg-gray-700 hover:bg-gray-600'
                      }`}
                    >
                      {pos === 'top-left' ? 'Oben Links' :
                       pos === 'top-right' ? 'Oben Rechts' :
                       pos === 'bottom-left' ? 'Unten Links' : 'Unten Rechts'}
                    </button>
                  ))}
                </div>
              </div>
              
              <button
                onClick={handleDividedSubmit}
                disabled={!numberAnswer || !shapeAnswer}
                className="w-full py-3 bg-green-500 hover:bg-green-600 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-xl font-semibold transition-colors"
              >
                Bestätigen
              </button>
            </div>
          )}
        </div>
      )}

      {/* Feedback */}
      {feedback && phase !== 'sustained' && (
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

export default AttentionTest;
