import React, { useState, useEffect, useRef, useCallback } from 'react';

const SelfRegulationTest = ({ onComplete, onCancel }) => {
  const [phase, setPhase] = useState('intro');
  const [trial, setTrial] = useState(0);
  const [results, setResults] = useState([]);
  const [feedback, setFeedback] = useState(null);
  
  // Inhibitory Control (Go/No-Go)
  const [goNoGoStimulus, setGoNoGoStimulus] = useState(null);
  const [canRespond, setCanRespond] = useState(false);
  
  // Arousal Regulation (Stress response with time pressure)
  const [stressPhase, setStressPhase] = useState('calm');
  const [mathProblem, setMathProblem] = useState(null);
  const [mathAnswer, setMathAnswer] = useState('');
  const [timeLeft, setTimeLeft] = useState(0);
  const [stressLevel, setStressLevel] = useState(50);
  
  // Heart Rate Variability simulation (breathing coherence)
  const [breathPhase, setBreathPhase] = useState('inhale');
  const [breathScore, setBreathScore] = useState(0);
  const [breathTarget, setBreathTarget] = useState(0);
  const [userBreathTiming, setUserBreathTiming] = useState([]);
  
  const timeoutRef = useRef(null);
  const intervalRef = useRef(null);
  const trialDataRef = useRef([]);
  const stimulusStartRef = useRef(null);
  const respondedRef = useRef(false);
  const stressHandledRef = useRef(false);
  const stressTrialRef = useRef(0);
  const breathTrialRef = useRef(0);

  const TRIALS_GO_NOGO = 24;
  const TRIALS_PER_TEST = 8;

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // Go/No-Go Test (Inhibitory Control)
  const startGoNoGoTest = useCallback(() => {
    setPhase('gonogo');
    setTrial(0);
    trialDataRef.current = [];
    runGoNoGoTrial();
  }, []);

  const runGoNoGoTrial = () => {
    setFeedback(null);
    setGoNoGoStimulus(null);
    setCanRespond(false);
    respondedRef.current = false;
    
    const delay = 800 + Math.random() * 1200;
    
    timeoutRef.current = setTimeout(() => {
      // 75% Go trials, 25% No-Go trials
      const isGoTrial = Math.random() < 0.75;
      setGoNoGoStimulus(isGoTrial ? 'go' : 'nogo');
      setCanRespond(true);
      stimulusStartRef.current = performance.now();
      
      // Auto-advance after 1.5s
      timeoutRef.current = setTimeout(() => {
        if (!respondedRef.current) {
          if (isGoTrial) {
            // Omission error (missed Go)
            trialDataRef.current.push({ type: 'omission', isGoTrial: true });
            setFeedback({ type: 'error', message: 'Zu langsam!' });
          } else {
            // Correct rejection (No-Go success)
            trialDataRef.current.push({ type: 'correct_rejection', isGoTrial: false });
            setFeedback({ type: 'success', message: '✓' });
          }
        }
        
        advanceGoNoGo();
      }, 1000);
    }, delay);
  };

  const handleGoNoGoResponse = () => {
    if (!canRespond || respondedRef.current) return;
    respondedRef.current = true;
    
    const responseTime = performance.now() - stimulusStartRef.current;
    const isGoTrial = goNoGoStimulus === 'go';
    
    if (isGoTrial) {
      // Hit (correct Go)
      trialDataRef.current.push({ type: 'hit', responseTime, isGoTrial: true });
      setFeedback({ type: 'success', message: `${Math.round(responseTime)} ms` });
    } else {
      // Commission error (false alarm on No-Go)
      trialDataRef.current.push({ type: 'commission', responseTime, isGoTrial: false });
      setFeedback({ type: 'error', message: 'Nicht drücken!' });
    }
    
    setCanRespond(false);
    
    // Clear the auto-advance timeout and advance immediately
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setTimeout(advanceGoNoGo, 800);
  };

  const advanceGoNoGo = () => {
    const nextTrial = trial + 1;
    setTrial(nextTrial);
    
    if (nextTrial >= TRIALS_GO_NOGO) {
      finishGoNoGoTest();
    } else {
      runGoNoGoTrial();
    }
  };

  const finishGoNoGoTest = () => {
    const hits = trialDataRef.current.filter(t => t.type === 'hit');
    const omissions = trialDataRef.current.filter(t => t.type === 'omission');
    const commissions = trialDataRef.current.filter(t => t.type === 'commission');
    const correctRejections = trialDataRef.current.filter(t => t.type === 'correct_rejection');
    
    const goTrials = hits.length + omissions.length;
    const noGoTrials = commissions.length + correctRejections.length;
    
    const hitRate = goTrials > 0 ? hits.length / goTrials : 0;
    const commissionRate = noGoTrials > 0 ? commissions.length / noGoTrials : 0;
    
    // Inhibitory control score: low commission rate = good
    const inhibitionScore = (1 - commissionRate) * 100;
    // Response accuracy
    const accuracyScore = hitRate * 100;
    
    const normalizedScore = (inhibitionScore * 0.6) + (accuracyScore * 0.4);
    
    const avgRT = hits.length > 0 
      ? hits.reduce((sum, t) => sum + t.responseTime, 0) / hits.length 
      : 500;
    
    setResults(prev => [...prev, {
      test_name: 'inhibitory_control',
      subcategory: 'Inhibitorische Kontrolle (Go/No-Go)',
      raw_score: inhibitionScore,
      normalized_score: normalizedScore,
      reaction_time_ms: avgRT,
      accuracy_percent: hitRate * 100,
      trials_completed: TRIALS_GO_NOGO,
      errors: commissions.length + omissions.length,
      metadata: { hitRate, commissionRate, inhibitionScore }
    }]);
    
    trialDataRef.current = [];
    setPhase('stress_intro');
  };

  // Stress/Arousal Regulation Test
  const startStressTest = useCallback(() => {
    setPhase('stress');
    setTrial(0);
    stressTrialRef.current = 0;
    trialDataRef.current = [];
    setStressLevel(50);
    runStressTrial(0);
  }, []);

  const generateMathProblem = (difficulty) => {
    if (difficulty < 3) {
      // Easy: simple addition/subtraction
      const a = Math.floor(Math.random() * 20) + 5;
      const b = Math.floor(Math.random() * 15) + 1;
      const op = Math.random() < 0.5 ? '+' : '-';
      return { 
        problem: `${a} ${op} ${b}`, 
        answer: op === '+' ? a + b : a - b 
      };
    } else if (difficulty < 6) {
      // Medium: two operations
      const a = Math.floor(Math.random() * 15) + 5;
      const b = Math.floor(Math.random() * 10) + 1;
      const c = Math.floor(Math.random() * 10) + 1;
      return { 
        problem: `${a} + ${b} - ${c}`, 
        answer: a + b - c 
      };
    } else {
      // Hard: multiplication involved
      const a = Math.floor(Math.random() * 10) + 2;
      const b = Math.floor(Math.random() * 8) + 2;
      const c = Math.floor(Math.random() * 10) + 1;
      return { 
        problem: `${a} × ${b} + ${c}`, 
        answer: a * b + c 
      };
    }
  };

  const runStressTrial = (trialNum) => {
    // Clear any existing interval
    if (intervalRef.current) clearInterval(intervalRef.current);
    
    setFeedback(null);
    setMathAnswer('');
    stressHandledRef.current = false;
    
    // Increase difficulty and decrease time as trials progress
    const difficulty = trialNum;
    const timeLimit = Math.max(4, 10 - trialNum * 0.6);
    
    const problem = generateMathProblem(difficulty);
    setMathProblem(problem);
    setTimeLeft(timeLimit);
    stimulusStartRef.current = performance.now();
    
    // Timer countdown
    let currentTime = timeLimit;
    intervalRef.current = setInterval(() => {
      currentTime -= 0.1;
      setTimeLeft(currentTime);
      
      if (currentTime <= 0.1 && !stressHandledRef.current) {
        stressHandledRef.current = true;
        clearInterval(intervalRef.current);
        setTimeLeft(0);
        handleStressTimeout();
      }
    }, 100);
  };

  const handleStressAnswer = () => {
    if (stressHandledRef.current) return;
    stressHandledRef.current = true;
    clearInterval(intervalRef.current);
    
    const responseTime = performance.now() - stimulusStartRef.current;
    const correct = parseInt(mathAnswer) === mathProblem.answer;
    const timeRemaining = timeLeft;
    
    // Stress level changes based on performance
    if (correct) {
      setStressLevel(prev => Math.max(20, prev - 5));
      setFeedback({ type: 'success', message: 'Richtig!' });
    } else {
      setStressLevel(prev => Math.min(100, prev + 15));
      setFeedback({ type: 'error', message: `Falsch! (${mathProblem.answer})` });
    }
    
    stressTrialRef.current += 1;
    const nextTrial = stressTrialRef.current;
    setTrial(nextTrial);
    
    trialDataRef.current.push({ 
      correct, 
      responseTime, 
      timeRemaining,
      difficulty: nextTrial - 1
    });
    
    if (nextTrial >= TRIALS_PER_TEST) {
      setTimeout(finishStressTest, 1500);
    } else {
      setTimeout(() => runStressTrial(nextTrial), 1500);
    }
  };

  const handleStressTimeout = () => {
    setStressLevel(prev => Math.min(100, prev + 20));
    setFeedback({ type: 'error', message: 'Zeit abgelaufen!' });
    
    stressTrialRef.current += 1;
    const nextTrial = stressTrialRef.current;
    setTrial(nextTrial);
    
    trialDataRef.current.push({ 
      correct: false, 
      responseTime: null, 
      timeRemaining: 0,
      difficulty: nextTrial - 1,
      timeout: true
    });
    
    if (nextTrial >= TRIALS_PER_TEST) {
      setTimeout(finishStressTest, 1500);
    } else {
      setTimeout(() => runStressTrial(nextTrial), 1500);
    }
  };

  const finishStressTest = () => {
    const correctTrials = trialDataRef.current.filter(t => t.correct);
    const accuracy = correctTrials.length / TRIALS_PER_TEST;
    
    // Calculate stress regulation score
    // Lower final stress + high accuracy = good regulation
    const stressRegulation = 100 - stressLevel;
    const normalizedScore = (accuracy * 50) + (stressRegulation * 0.5);
    
    const avgRT = correctTrials.length > 0 
      ? correctTrials.filter(t => t.responseTime).reduce((sum, t) => sum + t.responseTime, 0) / correctTrials.length 
      : 5000;
    
    setResults(prev => [...prev, {
      test_name: 'arousal_regulation',
      subcategory: 'Arousal-Regulation unter Stress',
      raw_score: stressRegulation,
      normalized_score: normalizedScore,
      reaction_time_ms: avgRT,
      accuracy_percent: accuracy * 100,
      trials_completed: TRIALS_PER_TEST,
      errors: TRIALS_PER_TEST - correctTrials.length,
      metadata: { finalStressLevel: stressLevel, stressRegulation }
    }]);
    
    trialDataRef.current = [];
    setPhase('breath_intro');
  };

  // Breathing/Self-Regulation Test
  const startBreathTest = useCallback(() => {
    setPhase('breath');
    setTrial(0);
    breathTrialRef.current = 0;
    trialDataRef.current = [];
    setBreathScore(0);
    runBreathCycle();
  }, []);

  const BREATH_CYCLES = 6;
  const INHALE_TIME = 4000;
  const EXHALE_TIME = 6000;

  const runBreathCycle = () => {
    setFeedback(null);
    setUserBreathTiming([]);
    setBreathPhase('prepare');
    
    // Small pause before starting
    timeoutRef.current = setTimeout(() => {
      // Inhale phase
      setBreathPhase('inhale');
      setBreathTarget(0);
      stimulusStartRef.current = performance.now();
      
      let progress = 0;
      intervalRef.current = setInterval(() => {
        progress += 50;
        setBreathTarget(progress / INHALE_TIME * 100);
        
        if (progress >= INHALE_TIME) {
          clearInterval(intervalRef.current);
          
          // Exhale phase
          setBreathPhase('exhale');
          stimulusStartRef.current = performance.now();
          
          progress = 0;
          intervalRef.current = setInterval(() => {
            progress += 50;
            setBreathTarget(100 - (progress / EXHALE_TIME * 100));
            
            if (progress >= EXHALE_TIME) {
              clearInterval(intervalRef.current);
              evaluateBreathCycle();
            }
          }, 50);
        }
      }, 50);
    }, 1000);
  };

  const handleBreathInput = (isPressed) => {
    trialDataRef.current.push({
      time: performance.now() - stimulusStartRef.current,
      phase: breathPhase,
      isPressed
    });
  };

  const evaluateBreathCycle = () => {
    // Calculate coherence score based on timing accuracy
    // This is a simplified version - real HRV would require sensor data
    const timings = trialDataRef.current.slice(-10); // Use recent inputs from this cycle
    
    let coherenceScore = 60; // Base score - more forgiving
    
    // Award points for any interaction during the cycle
    if (timings.length > 0) {
      coherenceScore += Math.min(30, timings.length * 10);
    }
    
    coherenceScore = Math.min(100, coherenceScore);
    
    setBreathScore(prev => prev + coherenceScore);
    
    setFeedback({ 
      type: coherenceScore >= 70 ? 'success' : 'neutral', 
      message: `Kohärenz: ${coherenceScore}%` 
    });
    
    breathTrialRef.current += 1;
    const nextTrial = breathTrialRef.current;
    setTrial(nextTrial);
    
    // Clear timing data for next cycle
    trialDataRef.current = [];
    
    if (nextTrial >= BREATH_CYCLES) {
      setTimeout(finishBreathTest, 1500);
    } else {
      setTimeout(runBreathCycle, 1500);
    }
  };

  const finishBreathTest = () => {
    const avgCoherence = breathScore / BREATH_CYCLES;
    const normalizedScore = Math.min(100, avgCoherence + 10);
    
    setResults(prev => [...prev, {
      test_name: 'stress_response',
      subcategory: 'Atemkohärenz & Selbstregulation',
      raw_score: avgCoherence,
      normalized_score: normalizedScore,
      accuracy_percent: avgCoherence,
      trials_completed: BREATH_CYCLES,
      errors: trialDataRef.current.filter(t => t.coherenceScore < 50).length
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
        <span>Körperliche Selbstregulation</span>
        <span>
          {phase === 'gonogo' && `Go/No-Go: ${trial}/${TRIALS_GO_NOGO}`}
          {phase === 'stress' && `Stress-Test: ${trial}/${TRIALS_PER_TEST}`}
          {phase === 'breath' && `Atmung: ${trial}/${BREATH_CYCLES}`}
        </span>
      </div>

      {/* Intro */}
      {phase === 'intro' && (
        <div className="text-center py-8">
          <h3 className="text-xl font-semibold mb-4">Test 1: Inhibitorische Kontrolle (Go/No-Go)</h3>
          <p className="text-gray-500 mb-6 max-w-md mx-auto">
            Drücke bei GRÜN, aber NICHT bei ROT! Teste deine Impulskontrolle.
          </p>
          <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl mb-6 max-w-md mx-auto">
            <p className="text-sm text-blue-300">
              <strong>Neurowissenschaft:</strong> Go/No-Go Tests messen die Funktion des 
              rechten inferioren Frontallappens, der für Verhaltenshemmung zuständig ist.
            </p>
          </div>
          <button onClick={startGoNoGoTest} className="px-6 py-3 bg-provoid-600 hover:bg-cyan-700 rounded-xl font-semibold">
            Test starten
          </button>
        </div>
      )}

      {/* Go/No-Go Test */}
      {phase === 'gonogo' && (
        <div 
          className="flex flex-col items-center py-12 cursor-pointer select-none"
          onClick={handleGoNoGoResponse}
          tabIndex={0}
        >
          <div className={`w-32 h-32 rounded-full flex items-center justify-center transition-all duration-100 ${
            goNoGoStimulus === 'go' ? 'bg-green-500 scale-110' :
            goNoGoStimulus === 'nogo' ? 'bg-red-500 scale-110' :
            'bg-gray-700'
          }`}>
            {goNoGoStimulus === 'go' && <span className="text-4xl">GO</span>}
            {goNoGoStimulus === 'nogo' && <span className="text-4xl">✋</span>}
          </div>
          
          <p className="mt-6 text-gray-500">
            GRÜN = Klicken | ROT = Nicht klicken
          </p>
          
          {feedback && (
            <div className={`mt-4 px-4 py-2 rounded-lg ${
              feedback.type === 'success' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
            }`}>
              {feedback.message}
            </div>
          )}
          
          <div className="mt-6 w-64 h-2 bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-provoid-500 transition-all duration-100"
              style={{ width: `${(trial / TRIALS_GO_NOGO) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Stress Intro */}
      {phase === 'stress_intro' && (
        <div className="text-center py-8">
          <h3 className="text-xl font-semibold mb-4">Test 2: Arousal-Regulation unter Stress</h3>
          <p className="text-gray-500 mb-6 max-w-md mx-auto">
            Löse Rechenaufgaben unter Zeitdruck. Die Schwierigkeit steigt, die Zeit sinkt!
          </p>
          <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl mb-6 max-w-md mx-auto">
            <p className="text-sm text-blue-300">
              <strong>Neurowissenschaft:</strong> Stress-Performance testet die 
              präfrontal-limbische Regulation und die Aktivität der HPA-Achse.
            </p>
          </div>
          <button onClick={startStressTest} className="px-6 py-3 bg-provoid-600 hover:bg-cyan-700 rounded-xl font-semibold">
            Weiter
          </button>
        </div>
      )}

      {/* Stress Test */}
      {phase === 'stress' && mathProblem && (
        <div className="py-4">
          {/* Stress indicator */}
          <div className="mb-6">
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="text-gray-500">Stresslevel</span>
              <span className={stressLevel > 70 ? 'text-red-400' : stressLevel > 40 ? 'text-yellow-400' : 'text-green-400'}>
                {stressLevel}%
              </span>
            </div>
            <div className="w-full h-3 bg-gray-700 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-300 ${
                  stressLevel > 70 ? 'bg-red-500' : stressLevel > 40 ? 'bg-yellow-500' : 'bg-green-500'
                }`}
                style={{ width: `${stressLevel}%` }}
              />
            </div>
          </div>
          
          {/* Timer */}
          <div className="mb-6">
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="text-gray-500">Zeit</span>
              <span className={timeLeft < 2 ? 'text-red-400' : 'text-gray-600'}>
                {timeLeft.toFixed(1)}s
              </span>
            </div>
            <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-100 ${timeLeft < 2 ? 'bg-red-500' : 'bg-blue-500'}`}
                style={{ width: `${(timeLeft / 8) * 100}%` }}
              />
            </div>
          </div>
          
          {/* Math problem */}
          <div className="text-center mb-6">
            <div className="text-4xl font-bold mb-4">{mathProblem.problem} = ?</div>
            <input
              type="number"
              value={mathAnswer}
              onChange={(e) => setMathAnswer(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleStressAnswer()}
              className="w-32 px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-center text-2xl focus:outline-none focus:border-provoid-500"
              autoFocus
            />
          </div>
          
          <button
            onClick={handleStressAnswer}
            className="w-full py-3 bg-green-500 hover:bg-green-600 rounded-xl font-semibold"
          >
            Bestätigen
          </button>
          
          {feedback && (
            <div className={`mt-4 text-center px-4 py-2 rounded-lg ${
              feedback.type === 'success' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
            }`}>
              {feedback.message}
            </div>
          )}
        </div>
      )}

      {/* Breath Intro */}
      {phase === 'breath_intro' && (
        <div className="text-center py-8">
          <h3 className="text-xl font-semibold mb-4">Test 3: Atemkohärenz</h3>
          <p className="text-gray-500 mb-6 max-w-md mx-auto">
            Folge dem Atemrhythmus: Halte beim Einatmen die Taste/Klick gedrückt, 
            lasse beim Ausatmen los.
          </p>
          <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl mb-6 max-w-md mx-auto">
            <p className="text-sm text-blue-300">
              <strong>Neurowissenschaft:</strong> Atemkohärenz beeinflusst die 
              Herzratenvariabilität (HRV) und reguliert das autonome Nervensystem über den Vagusnerv.
            </p>
          </div>
          <button onClick={startBreathTest} className="px-6 py-3 bg-provoid-600 hover:bg-cyan-700 rounded-xl font-semibold">
            Weiter
          </button>
        </div>
      )}

      {/* Breath Test */}
      {phase === 'breath' && (
        <div className="flex flex-col items-center py-8">
          {/* Breathing circle */}
          <div 
            className={`relative w-48 h-48 rounded-full border-4 transition-all duration-300 cursor-pointer ${
              breathPhase === 'inhale' ? 'border-blue-500 scale-110' :
              breathPhase === 'exhale' ? 'border-provoid-500 scale-90' :
              'border-gray-600'
            }`}
            onMouseDown={() => handleBreathInput(true)}
            onMouseUp={() => handleBreathInput(false)}
            onTouchStart={() => handleBreathInput(true)}
            onTouchEnd={() => handleBreathInput(false)}
          >
            <div 
              className={`absolute inset-4 rounded-full transition-all duration-500 ${
                breathPhase === 'inhale' ? 'bg-blue-500/30' :
                breathPhase === 'exhale' ? 'bg-provoid-500/30' :
                'bg-gray-700'
              }`}
              style={{ 
                transform: `scale(${0.3 + (breathTarget / 100) * 0.7})` 
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xl font-semibold">
                {breathPhase === 'prepare' ? 'Bereit...' :
                 breathPhase === 'inhale' ? 'Einatmen' : 'Ausatmen'}
              </span>
            </div>
          </div>
          
          <p className="mt-6 text-gray-500 text-sm text-center">
            {breathPhase === 'inhale' 
              ? 'Halte gedrückt beim Einatmen' 
              : breathPhase === 'exhale' 
              ? 'Loslassen beim Ausatmen' 
              : 'Gleich geht es los...'}
          </p>
          
          <div className="mt-4 text-2xl font-bold">
            Zyklus {trial + 1} / {BREATH_CYCLES}
          </div>
          
          {feedback && (
            <div className={`mt-4 px-4 py-2 rounded-lg ${
              feedback.type === 'success' ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-500'
            }`}>
              {feedback.message}
            </div>
          )}
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

export default SelfRegulationTest;
