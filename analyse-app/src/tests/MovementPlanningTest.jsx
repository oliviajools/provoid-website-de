import React, { useState, useEffect, useRef, useCallback } from 'react';
import { AlertCircle } from 'lucide-react';

const MovementPlanningTest = ({ onComplete, onCancel }) => {
  const [phase, setPhase] = useState('intro'); // intro, simple_rt, choice_rt, sequence, complete
  const [trial, setTrial] = useState(0);
  const [results, setResults] = useState([]);
  const [showStimulus, setShowStimulus] = useState(false);
  const [stimulusStart, setStimulusStart] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [sequencePattern, setSequencePattern] = useState([]);
  const [userSequence, setUserSequence] = useState([]);
  const [isShowingSequence, setIsShowingSequence] = useState(false);
  const [activeButton, setActiveButton] = useState(null);
  
  const timeoutRef = useRef(null);
  const trialDataRef = useRef([]);

  const TRIALS_PER_TEST = 8;
  const SEQUENCE_LENGTH = 4;

  // Cleanup
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // Simple Reaction Time Test
  const startSimpleRT = useCallback(() => {
    setPhase('simple_rt');
    setTrial(0);
    trialDataRef.current = [];
    runSimpleTrial();
  }, []);

  const runSimpleTrial = () => {
    setShowStimulus(false);
    setFeedback(null);
    
    // Random delay 1-3 seconds
    const delay = 1000 + Math.random() * 2000;
    
    timeoutRef.current = setTimeout(() => {
      setShowStimulus(true);
      setStimulusStart(performance.now());
    }, delay);
  };

  const handleSimpleResponse = () => {
    if (!showStimulus) {
      // False start
      setFeedback({ type: 'error', message: 'Zu früh! Warte auf das Signal.' });
      setTimeout(() => setFeedback(null), 1000);
      return;
    }
    
    const rt = performance.now() - stimulusStart;
    trialDataRef.current.push({ rt, correct: true });
    
    setFeedback({ type: 'success', message: `${Math.round(rt)} ms` });
    setShowStimulus(false);
    
    const nextTrial = trial + 1;
    setTrial(nextTrial);
    
    if (nextTrial >= TRIALS_PER_TEST) {
      // Calculate results
      const validTrials = trialDataRef.current.filter(t => t.rt > 100 && t.rt < 1000);
      const avgRT = validTrials.reduce((sum, t) => sum + t.rt, 0) / validTrials.length;
      
      // Normalize: 200ms = 100%, 400ms = 50%, 600ms = 0%
      const normalizedScore = Math.max(0, Math.min(100, 100 - ((avgRT - 200) / 4)));
      
      setResults(prev => [...prev, {
        test_name: 'simple_reaction',
        subcategory: 'Einfache Reaktionszeit',
        raw_score: avgRT,
        normalized_score: normalizedScore,
        reaction_time_ms: avgRT,
        accuracy_percent: (validTrials.length / TRIALS_PER_TEST) * 100,
        trials_completed: validTrials.length,
        errors: TRIALS_PER_TEST - validTrials.length
      }]);
      
      setTimeout(() => setPhase('choice_intro'), 1500);
    } else {
      setTimeout(runSimpleTrial, 1500);
    }
  };

  // Choice Reaction Time Test
  const startChoiceRT = useCallback(() => {
    setPhase('choice_rt');
    setTrial(0);
    trialDataRef.current = [];
    runChoiceTrial();
  }, []);

  const [choiceTarget, setChoiceTarget] = useState(null);

  const runChoiceTrial = () => {
    setShowStimulus(false);
    setFeedback(null);
    setChoiceTarget(null);
    
    const delay = 1000 + Math.random() * 2000;
    
    timeoutRef.current = setTimeout(() => {
      // Random target: 0=left, 1=up, 2=right, 3=down
      const target = Math.floor(Math.random() * 4);
      setChoiceTarget(target);
      setShowStimulus(true);
      setStimulusStart(performance.now());
    }, delay);
  };

  const handleChoiceResponse = (response) => {
    if (!showStimulus) {
      setFeedback({ type: 'error', message: 'Zu früh!' });
      setTimeout(() => setFeedback(null), 1000);
      return;
    }
    
    const rt = performance.now() - stimulusStart;
    const correct = response === choiceTarget;
    
    trialDataRef.current.push({ rt, correct });
    
    setFeedback({ 
      type: correct ? 'success' : 'error', 
      message: correct ? `${Math.round(rt)} ms` : 'Falsche Richtung!' 
    });
    setShowStimulus(false);
    
    const nextTrial = trial + 1;
    setTrial(nextTrial);
    
    if (nextTrial >= TRIALS_PER_TEST) {
      const validTrials = trialDataRef.current.filter(t => t.correct && t.rt > 100 && t.rt < 2000);
      const avgRT = validTrials.length > 0 
        ? validTrials.reduce((sum, t) => sum + t.rt, 0) / validTrials.length 
        : 1000;
      const accuracy = trialDataRef.current.filter(t => t.correct).length / TRIALS_PER_TEST;
      
      // Normalize: 300ms = 100%, 600ms = 50%, 900ms = 0%
      const rtScore = Math.max(0, Math.min(100, 100 - ((avgRT - 300) / 6)));
      const normalizedScore = (rtScore * 0.7) + (accuracy * 100 * 0.3);
      
      setResults(prev => [...prev, {
        test_name: 'choice_reaction',
        subcategory: 'Wahlreaktionszeit',
        raw_score: avgRT,
        normalized_score: normalizedScore,
        reaction_time_ms: avgRT,
        accuracy_percent: accuracy * 100,
        trials_completed: TRIALS_PER_TEST,
        errors: trialDataRef.current.filter(t => !t.correct).length
      }]);
      
      setTimeout(() => setPhase('sequence_intro'), 1500);
    } else {
      setTimeout(runChoiceTrial, 1500);
    }
  };

  // Motor Sequencing Test
  const startSequence = useCallback(() => {
    setPhase('sequence');
    setTrial(0);
    trialDataRef.current = [];
    generateAndShowSequence();
  }, []);

  const generateAndShowSequence = () => {
    const length = SEQUENCE_LENGTH + Math.floor(trial / 2);
    const pattern = Array.from({ length }, () => Math.floor(Math.random() * 4));
    setSequencePattern(pattern);
    setUserSequence([]);
    setIsShowingSequence(true);
    setFeedback(null);
    
    // Show sequence
    let i = 0;
    const showNext = () => {
      if (i < pattern.length) {
        setActiveButton(pattern[i]);
        setTimeout(() => {
          setActiveButton(null);
          i++;
          setTimeout(showNext, 300);
        }, 500);
      } else {
        setIsShowingSequence(false);
        setStimulusStart(performance.now());
      }
    };
    
    setTimeout(showNext, 500);
  };

  const handleSequenceInput = (button) => {
    if (isShowingSequence) return;
    
    const newSequence = [...userSequence, button];
    setUserSequence(newSequence);
    setActiveButton(button);
    setTimeout(() => setActiveButton(null), 150);
    
    // Check if correct so far
    const isCorrectSoFar = newSequence.every((b, i) => b === sequencePattern[i]);
    
    if (!isCorrectSoFar) {
      setFeedback({ type: 'error', message: 'Falsche Reihenfolge!' });
      trialDataRef.current.push({ 
        correct: false, 
        sequenceLength: sequencePattern.length,
        completedSteps: newSequence.length - 1,
        time: performance.now() - stimulusStart
      });
      
      const nextTrial = trial + 1;
      setTrial(nextTrial);
      
      if (nextTrial >= TRIALS_PER_TEST) {
        finishSequenceTest();
      } else {
        setTimeout(generateAndShowSequence, 1500);
      }
      return;
    }
    
    // Complete sequence
    if (newSequence.length === sequencePattern.length) {
      const time = performance.now() - stimulusStart;
      setFeedback({ type: 'success', message: 'Perfekt!' });
      
      trialDataRef.current.push({ 
        correct: true, 
        sequenceLength: sequencePattern.length,
        completedSteps: sequencePattern.length,
        time
      });
      
      const nextTrial = trial + 1;
      setTrial(nextTrial);
      
      if (nextTrial >= TRIALS_PER_TEST) {
        finishSequenceTest();
      } else {
        setTimeout(generateAndShowSequence, 1500);
      }
    }
  };

  const finishSequenceTest = () => {
    const correctTrials = trialDataRef.current.filter(t => t.correct);
    const accuracy = correctTrials.length / TRIALS_PER_TEST;
    const avgCompletedSteps = trialDataRef.current.reduce((sum, t) => sum + t.completedSteps, 0) / TRIALS_PER_TEST;
    
    // Normalize based on accuracy and average completed steps
    const normalizedScore = (accuracy * 60) + (avgCompletedSteps / (SEQUENCE_LENGTH + 2)) * 40;
    
    setResults(prev => [...prev, {
      test_name: 'motor_sequencing',
      subcategory: 'Motorische Sequenzierung',
      raw_score: avgCompletedSteps,
      normalized_score: Math.min(100, normalizedScore),
      accuracy_percent: accuracy * 100,
      trials_completed: TRIALS_PER_TEST,
      errors: TRIALS_PER_TEST - correctTrials.length
    }]);
    
    setPhase('complete');
  };

  // Handle completion
  useEffect(() => {
    if (phase === 'complete' && results.length === 3) {
      setTimeout(() => onComplete(results), 2000);
    }
  }, [phase, results, onComplete]);

  const directions = ['←', '↑', '→', '↓'];
  const colors = ['bg-red-500', 'bg-green-500', 'bg-blue-500', 'bg-yellow-500'];

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div className="flex items-center justify-between text-sm text-gray-500">
        <span>Bewegungsplanung & -ausführung</span>
        <span>
          {phase === 'simple_rt' && `Einfache RT: ${trial}/${TRIALS_PER_TEST}`}
          {phase === 'choice_rt' && `Wahl-RT: ${trial}/${TRIALS_PER_TEST}`}
          {phase === 'sequence' && `Sequenz: ${trial}/${TRIALS_PER_TEST}`}
        </span>
      </div>

      {/* Intro */}
      {phase === 'intro' && (
        <div className="text-center py-8">
          <h3 className="text-xl font-semibold mb-4">Test 1: Einfache Reaktionszeit</h3>
          <p className="text-gray-500 mb-6 max-w-md mx-auto">
            Klicke so schnell wie möglich auf den Button, sobald der grüne Kreis erscheint.
            Warte auf das Signal – nicht zu früh klicken!
          </p>
          <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl mb-6 max-w-md mx-auto">
            <p className="text-sm text-blue-300">
              <strong>Neurowissenschaft:</strong> Dieser Test misst die basale Reaktionsgeschwindigkeit,
              die von der Integrität der kortikospinalen Bahnen abhängt.
            </p>
          </div>
          <button
            onClick={startSimpleRT}
            className="px-6 py-3 bg-provoid-600 hover:bg-cyan-700 rounded-xl font-semibold transition-colors"
          >
            Test starten
          </button>
        </div>
      )}

      {/* Simple RT Test */}
      {phase === 'simple_rt' && (
        <div className="flex flex-col items-center py-12">
          <div 
            className={`w-32 h-32 rounded-full flex items-center justify-center transition-all duration-100 cursor-pointer ${
              showStimulus ? 'bg-green-500 scale-110' : 'bg-gray-700'
            }`}
            onClick={handleSimpleResponse}
          >
            {showStimulus && <span className="text-4xl">👆</span>}
          </div>
          
          {feedback && (
            <div className={`mt-6 px-4 py-2 rounded-lg ${
              feedback.type === 'success' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
            }`}>
              {feedback.message}
            </div>
          )}
          
          <p className="mt-6 text-gray-500 text-sm">
            Klicke auf den Kreis, sobald er grün wird
          </p>
        </div>
      )}

      {/* Choice RT Intro */}
      {phase === 'choice_intro' && (
        <div className="text-center py-8">
          <h3 className="text-xl font-semibold mb-4">Test 2: Wahlreaktionszeit</h3>
          <p className="text-gray-500 mb-6 max-w-md mx-auto">
            Drücke die Pfeiltaste, die der angezeigten Richtung entspricht.
            So schnell und genau wie möglich!
          </p>
          <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl mb-6 max-w-md mx-auto">
            <p className="text-sm text-blue-300">
              <strong>Neurowissenschaft:</strong> Wahlreaktionen beanspruchen zusätzlich den 
              präfrontalen Kortex für die Entscheidungsfindung.
            </p>
          </div>
          <button
            onClick={startChoiceRT}
            className="px-6 py-3 bg-provoid-600 hover:bg-cyan-700 rounded-xl font-semibold transition-colors"
          >
            Weiter
          </button>
        </div>
      )}

      {/* Choice RT Test */}
      {phase === 'choice_rt' && (
        <div className="flex flex-col items-center py-8">
          <div className="relative w-48 h-48 mb-8">
            {/* Center stimulus */}
            <div className={`absolute inset-0 m-auto w-20 h-20 rounded-full flex items-center justify-center transition-all ${
              showStimulus ? 'bg-provoid-500 scale-110' : 'bg-gray-700'
            }`}>
              {showStimulus && (
                <span className="text-4xl">{directions[choiceTarget]}</span>
              )}
            </div>
          </div>
          
          {/* Direction buttons */}
          <div className="grid grid-cols-3 gap-2 mb-6">
            <div></div>
            <button
              onClick={() => handleChoiceResponse(1)}
              className="w-16 h-16 bg-gray-700 hover:bg-gray-600 rounded-xl text-2xl transition-colors"
            >
              ↑
            </button>
            <div></div>
            <button
              onClick={() => handleChoiceResponse(0)}
              className="w-16 h-16 bg-gray-700 hover:bg-gray-600 rounded-xl text-2xl transition-colors"
            >
              ←
            </button>
            <div className="w-16 h-16"></div>
            <button
              onClick={() => handleChoiceResponse(2)}
              className="w-16 h-16 bg-gray-700 hover:bg-gray-600 rounded-xl text-2xl transition-colors"
            >
              →
            </button>
            <div></div>
            <button
              onClick={() => handleChoiceResponse(3)}
              className="w-16 h-16 bg-gray-700 hover:bg-gray-600 rounded-xl text-2xl transition-colors"
            >
              ↓
            </button>
            <div></div>
          </div>
          
          {feedback && (
            <div className={`px-4 py-2 rounded-lg ${
              feedback.type === 'success' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
            }`}>
              {feedback.message}
            </div>
          )}
        </div>
      )}

      {/* Sequence Intro */}
      {phase === 'sequence_intro' && (
        <div className="text-center py-8">
          <h3 className="text-xl font-semibold mb-4">Test 3: Motorische Sequenzierung</h3>
          <p className="text-gray-500 mb-6 max-w-md mx-auto">
            Beobachte die Reihenfolge der aufleuchtenden Felder und wiederhole sie in der gleichen Reihenfolge.
          </p>
          <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl mb-6 max-w-md mx-auto">
            <p className="text-sm text-blue-300">
              <strong>Neurowissenschaft:</strong> Sequenzlernen involviert die Basalganglien und 
              das supplementär-motorische Areal (SMA).
            </p>
          </div>
          <button
            onClick={startSequence}
            className="px-6 py-3 bg-provoid-600 hover:bg-cyan-700 rounded-xl font-semibold transition-colors"
          >
            Weiter
          </button>
        </div>
      )}

      {/* Sequence Test */}
      {phase === 'sequence' && (
        <div className="flex flex-col items-center py-8">
          <div className="grid grid-cols-2 gap-4 mb-8">
            {[0, 1, 2, 3].map((i) => (
              <button
                key={i}
                onClick={() => handleSequenceInput(i)}
                disabled={isShowingSequence}
                className={`w-24 h-24 rounded-2xl transition-all duration-150 ${
                  activeButton === i 
                    ? `${colors[i]} scale-110 shadow-lg` 
                    : 'bg-gray-700 hover:bg-gray-600'
                } ${isShowingSequence ? 'cursor-not-allowed' : ''}`}
              >
                <span className="text-2xl">{['◀', '▲', '▶', '▼'][i]}</span>
              </button>
            ))}
          </div>
          
          <div className="text-center mb-4">
            {isShowingSequence ? (
              <p className="text-provoid-400">Beobachte die Sequenz...</p>
            ) : (
              <p className="text-gray-500">
                Wiederhole: {userSequence.length} / {sequencePattern.length}
              </p>
            )}
          </div>
          
          {feedback && (
            <div className={`px-4 py-2 rounded-lg ${
              feedback.type === 'success' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
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

      {/* Cancel button */}
      {phase !== 'complete' && (
        <div className="flex justify-center pt-4">
          <button
            onClick={onCancel}
            className="text-sm text-gray-500 hover:text-gray-600 transition-colors"
          >
            Test abbrechen
          </button>
        </div>
      )}
    </div>
  );
};

export default MovementPlanningTest;
