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
  const [breathPhase, setBreathPhase] = useState('ready'); // ready, breathing, done
  const [breathScore, setBreathScore] = useState(0);
  const [isBreathing, setIsBreathing] = useState(false); // true = einatmen (gedrückt)
  const [breathCycles, setBreathCycles] = useState([]); // Array von {inhaleStart, inhaleEnd, exhaleEnd}
  const [breathTimeLeft, setBreathTimeLeft] = useState(45); // 45 Sekunden
  const [currentCycleStart, setCurrentCycleStart] = useState(null);
  const [currentInhaleEnd, setCurrentInhaleEnd] = useState(null);
  const [expectedPhase, setExpectedPhase] = useState('inhale');
  const [lastActionTime, setLastActionTime] = useState(null);
  const [activeButton, setActiveButton] = useState(null); // 'inhale' or 'exhale' when pressed
  const [pressStartTime, setPressStartTime] = useState(null);
  
  const timeoutRef = useRef(null);
  const intervalRef = useRef(null);
  const trialDataRef = useRef([]);
  const stimulusStartRef = useRef(null);
  const respondedRef = useRef(false);
  const stressHandledRef = useRef(false);
  const stressTrialRef = useRef(0);
  const breathTrialRef = useRef(0);
  const goNoGoTrialRef = useRef(0);

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
    goNoGoTrialRef.current = 0;
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
    goNoGoTrialRef.current += 1;
    const nextTrial = goNoGoTrialRef.current;
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
    // stressLevel ranges 20-100, so stressRegulation is 0-80
    // Scale stressRegulation to 0-50 range: (stressRegulation / 80) * 50
    const normalizedScore = Math.max(0, Math.min(100, (accuracy * 50) + (stressRegulation / 80 * 50)));
    
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
  const BREATH_DURATION = 45; // Sekunden
  
  // Ref to hold finishBreathTest to avoid stale closure
  const finishBreathTestRef = useRef(null);
  
  const startBreathTest = () => {
    setPhase('breath');
    setBreathPhase('breathing');
    setBreathCycles([]);
    setBreathTimeLeft(BREATH_DURATION);
    setIsBreathing(false);
    setCurrentCycleStart(null);
    setCurrentInhaleEnd(null);
    setExpectedPhase('inhale');
    setLastActionTime(null);
    setFeedback(null);
    
    // Start countdown
    intervalRef.current = setInterval(() => {
      setBreathTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          if (finishBreathTestRef.current) {
            finishBreathTestRef.current();
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleBreathStart = (buttonType) => {
    if (breathPhase !== 'breathing') return;
    if (activeButton) return; // Already pressing a button
    
    const now = performance.now();
    const isCorrect = buttonType === expectedPhase;
    
    if (isCorrect) {
      setActiveButton(buttonType);
      setPressStartTime(now);
      
      if (buttonType === 'inhale') {
        setIsBreathing(true);
        setCurrentCycleStart(now);
      }
      setFeedback({ type: 'success', message: buttonType === 'inhale' ? '⬆️ Einatmen...' : '⬇️ Ausatmen...' });
    } else {
      setFeedback({ type: 'error', message: '✗ Falsche Reihenfolge' });
      setTimeout(() => setFeedback(null), 500);
    }
  };
  
  const handleBreathEnd = (buttonType) => {
    if (breathPhase !== 'breathing') return;
    if (activeButton !== buttonType) return;
    
    const now = performance.now();
    const pressDuration = now - pressStartTime;
    
    if (buttonType === 'inhale') {
      // Einatmen beendet - speichere Dauer
      setCurrentInhaleEnd(now);
      setExpectedPhase('exhale');
      setFeedback({ type: 'success', message: `Einatmen: ${(pressDuration/1000).toFixed(1)}s` });
    } else {
      // Ausatmen beendet - Zyklus komplett
      setIsBreathing(false);
      setExpectedPhase('inhale');
      
      if (currentCycleStart && currentInhaleEnd) {
        const inhaleDuration = currentInhaleEnd - currentCycleStart;
        const exhaleDuration = pressDuration;
        const cycleDuration = now - currentCycleStart;
        
        setBreathCycles(prev => [...prev, {
          inhaleDuration,
          exhaleDuration,
          cycleDuration,
          timestamp: now
        }]);
        setFeedback({ type: 'success', message: `Ausatmen: ${(pressDuration/1000).toFixed(1)}s` });
      }
    }
    
    setActiveButton(null);
    setPressStartTime(null);
    setLastActionTime(now);
    setTimeout(() => setFeedback(null), 800);
  };

  const calculateCoherence = (cycles) => {
    if (cycles.length < 3) return 0;
    
    // Berechne die Standardabweichung der Zyklusdauern
    const cycleDurations = cycles.map(c => c.cycleDuration);
    const avgDuration = cycleDurations.reduce((a, b) => a + b, 0) / cycleDurations.length;
    
    // Zeitabstände zwischen Zyklen
    const intervals = [];
    for (let i = 1; i < cycles.length; i++) {
      intervals.push(cycles[i].timestamp - cycles[i-1].timestamp);
    }
    const avgInterval = intervals.length > 0 ? intervals.reduce((a, b) => a + b, 0) / intervals.length : 0;
    
    // Standardabweichung der Intervalle (niedrig = kohärent)
    const variance = intervals.length > 0 
      ? intervals.reduce((sum, int) => sum + Math.pow(int - avgInterval, 2), 0) / intervals.length 
      : 0;
    const stdDev = Math.sqrt(variance);
    
    // Kohärenz: Je niedriger die Standardabweichung relativ zum Durchschnitt, desto besser
    // Coefficient of Variation (CV) - niedriger ist besser
    const cv = avgInterval > 0 ? (stdDev / avgInterval) * 100 : 100;
    
    // Umrechnung in Score (0-100): CV von 0 = 100 Punkte, CV von 50+ = 0 Punkte
    const coherenceScore = Math.max(0, Math.min(100, 100 - (cv * 2)));
    
    // Bonus für optimale Atemfrequenz (4-7 Atemzüge pro Minute = ideal für HRV)
    const breathsPerMinute = (cycles.length / BREATH_DURATION) * 60;
    let frequencyBonus = 0;
    if (breathsPerMinute >= 4 && breathsPerMinute <= 7) {
      frequencyBonus = 15; // Optimaler Bereich
    } else if (breathsPerMinute >= 3 && breathsPerMinute <= 10) {
      frequencyBonus = 8; // Akzeptabler Bereich
    }
    
    return Math.min(100, coherenceScore + frequencyBonus);
  };

  const finishBreathTest = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    
    setBreathPhase('done');
    
    // Berechne Kohärenz basierend auf den aufgezeichneten Zyklen
    const coherenceScore = calculateCoherence(breathCycles);
    setBreathScore(coherenceScore);
    
    const breathsPerMinute = (breathCycles.length / BREATH_DURATION) * 60;
    
    setFeedback({
      type: coherenceScore >= 60 ? 'success' : 'neutral',
      message: `${breathCycles.length} Atemzüge • ${breathsPerMinute.toFixed(1)}/min • Kohärenz: ${Math.round(coherenceScore)}%`
    });
    
    setTimeout(() => {
      setResults(prev => [...prev, {
        test_name: 'breathing_coherence',
        subcategory: 'Atemkohärenz & Selbstregulation',
        raw_score: coherenceScore,
        normalized_score: Math.min(100, coherenceScore + 5),
        accuracy_percent: coherenceScore,
        trials_completed: breathCycles.length,
        metadata: { 
          breathsPerMinute: breathsPerMinute.toFixed(1),
          totalCycles: breathCycles.length
        }
      }]);
      
      setPhase('complete');
    }, 3000);
  };
  
  // Keep ref updated with latest finishBreathTest
  finishBreathTestRef.current = finishBreathTest;

  useEffect(() => {
    if (phase === 'complete') {
      const timer = setTimeout(() => {
        onComplete(results.length > 0 ? results : [{ test_name: 'regulation_fallback', subcategory: 'Selbstregulation', normalized_score: 50, trials_completed: 0 }]);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [phase, results, onComplete]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between text-sm text-gray-500">
        <span>Körperliche Selbstregulation</span>
        <span>
          {phase === 'gonogo' && `Go/No-Go: ${trial}/${TRIALS_GO_NOGO}`}
          {phase === 'stress' && `Stress-Test: ${trial}/${TRIALS_PER_TEST}`}
          {phase === 'breath' && `Atmung: ${breathCycles.length} Zyklen`}
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
          <h3 className="text-2xl font-bold mb-6 text-white">Test 3: Atemkohärenz</h3>
          
          <div className="bg-gray-800/50 rounded-2xl p-6 mb-6 max-w-lg mx-auto text-left">
            <h4 className="font-semibold text-provoid-400 mb-3 text-lg">So funktioniert der Test:</h4>
            <ol className="space-y-3 text-gray-300">
              <li className="flex gap-3">
                <span className="bg-provoid-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
                <span><strong className="text-blue-400">Halte ⬆️ Einatmen gedrückt</strong> während du einatmest.</span>
              </li>
              <li className="flex gap-3">
                <span className="bg-provoid-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
                <span><strong className="text-orange-400">Halte ⬇️ Ausatmen gedrückt</strong> während du ausatmest.</span>
              </li>
              <li className="flex gap-3">
                <span className="bg-provoid-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>
                <span>Atme <strong className="text-yellow-400">ruhig und gleichmäßig</strong> für 45 Sekunden.</span>
              </li>
            </ol>
            <p className="mt-4 text-amber-400 text-sm">🎯 Ziel: 4-7 Atemzüge pro Minute für optimale HRV-Kohärenz</p>
          </div>
          
          <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl mb-6 max-w-lg mx-auto">
            <p className="text-sm text-blue-300">
              <strong>Neurowissenschaft:</strong> Langsame, gleichmäßige Atmung aktiviert den 
              Parasympathikus und verbessert die Herzratenvariabilität (HRV) über den Vagusnerv.
            </p>
          </div>
          
          <button onClick={startBreathTest} className="px-8 py-4 bg-provoid-600 hover:bg-provoid-500 rounded-xl font-semibold text-lg transition-all hover:scale-105">
            Test starten
          </button>
        </div>
      )}

      {/* Breath Test */}
      {phase === 'breath' && (
        <div className="flex flex-col items-center py-8">
          {/* Timer */}
          <div className="mb-8 text-center">
            <div className="text-5xl font-bold mb-2 text-white">{breathTimeLeft}s</div>
            <div className="w-64 h-2 bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-provoid-500 transition-all duration-1000"
                style={{ width: `${(breathTimeLeft / BREATH_DURATION) * 100}%` }}
              />
            </div>
          </div>
          
          {/* Feedback indicator */}
          <div className="h-12 mb-4 flex items-center justify-center">
            {feedback && (
              <span className={`text-4xl ${
                feedback.type === 'success' ? 'text-green-400' : 'text-red-400'
              }`}>
                {feedback.message}
              </span>
            )}
          </div>
          
          {/* Current phase indicator */}
          <div className="mb-6 text-center">
            <p className="text-lg text-gray-400 mb-2">Drücke jetzt:</p>
            <p className={`text-2xl font-bold ${
              expectedPhase === 'inhale' ? 'text-blue-400' : 'text-orange-400'
            }`}>
              {expectedPhase === 'inhale' ? '⬆️ Einatmen' : '⬇️ Ausatmen'}
            </p>
          </div>
          
          {/* Two buttons for breathing - press and hold */}
          <div className="flex gap-6">
            <button
              onMouseDown={() => handleBreathStart('inhale')}
              onMouseUp={() => handleBreathEnd('inhale')}
              onMouseLeave={() => activeButton === 'inhale' && handleBreathEnd('inhale')}
              onTouchStart={() => handleBreathStart('inhale')}
              onTouchEnd={() => handleBreathEnd('inhale')}
              className={`w-36 h-36 rounded-2xl border-4 transition-all duration-200 flex flex-col items-center justify-center select-none ${
                activeButton === 'inhale'
                  ? 'border-blue-400 bg-blue-500/40 scale-110 shadow-xl shadow-blue-500/50'
                  : expectedPhase === 'inhale'
                    ? 'border-blue-500 bg-blue-500/20 scale-105 shadow-lg shadow-blue-500/30'
                    : 'border-gray-600 bg-gray-800/50 opacity-60'
              }`}
            >
              <span className="text-4xl mb-2">⬆️</span>
              <span className="text-lg font-semibold text-white">Einatmen</span>
              <span className="text-xs text-gray-400 mt-1">gedrückt halten</span>
            </button>
            
            <button
              onMouseDown={() => handleBreathStart('exhale')}
              onMouseUp={() => handleBreathEnd('exhale')}
              onMouseLeave={() => activeButton === 'exhale' && handleBreathEnd('exhale')}
              onTouchStart={() => handleBreathStart('exhale')}
              onTouchEnd={() => handleBreathEnd('exhale')}
              className={`w-36 h-36 rounded-2xl border-4 transition-all duration-200 flex flex-col items-center justify-center select-none ${
                activeButton === 'exhale'
                  ? 'border-orange-400 bg-orange-500/40 scale-110 shadow-xl shadow-orange-500/50'
                  : expectedPhase === 'exhale'
                    ? 'border-orange-500 bg-orange-500/20 scale-105 shadow-lg shadow-orange-500/30'
                    : 'border-gray-600 bg-gray-800/50 opacity-60'
              }`}
            >
              <span className="text-4xl mb-2">⬇️</span>
              <span className="text-lg font-semibold text-white">Ausatmen</span>
              <span className="text-xs text-gray-400 mt-1">gedrückt halten</span>
            </button>
          </div>
          
          <p className="mt-8 text-gray-500 text-center max-w-sm">
            Atme ruhig und gleichmäßig. Drücke den jeweiligen Button während du ein- bzw. ausatmest.
          </p>
          
          <div className="mt-4 text-lg">
            <span className="text-gray-500">Atemzyklen: </span>
            <span className="font-bold text-white">{breathCycles.length}</span>
          </div>
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
