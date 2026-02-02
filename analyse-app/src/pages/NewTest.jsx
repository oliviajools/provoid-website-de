import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { UserPlus, ChevronRight, AlertCircle, Key, CheckCircle } from 'lucide-react';
import { apiUrl } from '../config/api';

const NewTest = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [step, setStep] = useState('code'); // 'code' | 'player' | 'form'
  const [teamCode, setTeamCode] = useState('');
  const [verifiedTeam, setVerifiedTeam] = useState(null);
  const [codeError, setCodeError] = useState('');
  const [verifyingCode, setVerifyingCode] = useState(false);
  const [players, setPlayers] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    birth_date: '',
    team: '',
    position: ''
  });

  useEffect(() => {
    if (location.state?.privacyAccepted) {
      setPrivacyAccepted(true);
    }
    if (location.state?.verifiedTeam) {
      setVerifiedTeam(location.state.verifiedTeam);
      setFormData(prev => ({ ...prev, team: location.state.verifiedTeam.team_name }));
      setStep('form');
    }
  }, [location]);

  useEffect(() => {
    if (step === 'player') {
      fetchPlayers();
    }
  }, [step]);

  const verifyCode = async () => {
    if (!teamCode.trim()) {
      setCodeError('Bitte gib einen Code ein');
      return;
    }
    
    setVerifyingCode(true);
    setCodeError('');
    
    try {
      const res = await fetch(apiUrl('/api/verify-code'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: teamCode.trim() })
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        setCodeError(data.error || 'Ungültiger Code');
        setVerifyingCode(false);
        return;
      }
      
      setVerifiedTeam(data);
      setFormData(prev => ({ ...prev, team: data.team_name }));
      setStep('form');
    } catch (error) {
      setCodeError('Verbindungsfehler');
    } finally {
      setVerifyingCode(false);
    }
  };

  const fetchPlayers = async () => {
    try {
      const res = await fetch(apiUrl('/api/players'));
      const data = await res.json();
      setPlayers(data);
    } catch (error) {
      console.error('Error fetching players:', error);
    }
  };

  const handleCreatePlayer = async (e) => {
    e.preventDefault();
    
    // Check if privacy consent was given first
    if (!privacyAccepted) {
      navigate('/privacy', { state: { returnTo: '/new-test', verifiedTeam } });
      return;
    }
    
    try {
      // Create the player
      const playerRes = await fetch(apiUrl('/api/players'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const newPlayer = await playerRes.json();
      
      // Immediately start a test session
      const sessionRes = await fetch(apiUrl('/api/sessions'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ player_id: newPlayer.id })
      });
      
      const session = await sessionRes.json();
      navigate(`/test/${session.id}`);
    } catch (error) {
      console.error('Error creating player or starting test:', error);
    }
  };

  const startTest = async () => {
    if (!selectedPlayer) return;
    
    // Check if privacy consent was given
    if (!privacyAccepted) {
      navigate('/privacy', { state: { returnTo: '/new-test' } });
      return;
    }
    
    try {
      const res = await fetch(apiUrl('/api/sessions'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ player_id: selectedPlayer.id })
      });
      
      const session = await res.json();
      navigate(`/test/${session.id}`);
    } catch (error) {
      console.error('Error starting test:', error);
    }
  };

  const calculateAge = (birthDate) => {
    if (!birthDate) return null;
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="glass-card p-8">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-4 bg-provoid-500/20 rounded-2xl">
            <img src="/analyse/provoid-logo.png" alt="PROVOID" className="h-10 w-auto object-contain" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Neue Neuroathletische Testung</h1>
            <p className="text-gray-500">
              {step === 'code' && 'Gib deinen Team-Code ein'}
              {step === 'player' && `Team: ${verifiedTeam?.team_name}`}
              {step === 'form' && 'Neue Spielerin anlegen'}
            </p>
          </div>
        </div>

        {/* Step 1: Code Entry */}
        {step === 'code' && (
          <div className="space-y-6">
            <div className="bg-provoid-50 border border-provoid-200 rounded-xl p-6">
              <div className="flex items-start gap-3">
                <Key className="w-6 h-6 text-provoid-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Team-Code eingeben</h3>
                  <p className="text-gray-600 text-sm">
                    Gib den Code ein, den deine Trainer:in deinem Team zugeordnet hat. 
                    Falls du keinen Code hast, kontaktiere bitte deine Trainer:in.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Team-Code</label>
              <input
                type="text"
                value={teamCode}
                onChange={(e) => setTeamCode(e.target.value.toUpperCase())}
                onKeyDown={(e) => e.key === 'Enter' && verifyCode()}
                placeholder="z.B. ABC123"
                className="w-full px-4 py-3 text-center text-2xl tracking-widest font-mono bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-provoid-400 focus:border-transparent text-gray-800 uppercase"
                maxLength={8}
              />
            </div>

            {codeError && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-red-500" />
                <span className="text-red-700">{codeError}</span>
              </div>
            )}

            <button
              onClick={verifyCode}
              disabled={verifyingCode}
              className="w-full py-3 bg-provoid-500 hover:bg-provoid-600 text-white rounded-xl font-semibold transition-colors disabled:opacity-50"
            >
              {verifyingCode ? 'Überprüfe...' : 'Code bestätigen'}
            </button>
          </div>
        )}

        {/* Step 2: New Player Form */}
        {step === 'form' && (
          <form onSubmit={handleCreatePlayer} className="space-y-4">
            <div className="mb-4 flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-xl">
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">Team: {verifiedTeam?.team_name}</span>
            </div>
            
            <h2 className="font-semibold mb-4">Deine Daten eingeben</h2>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-500 mb-1">Vorname *</label>
                <input
                  type="text"
                  required
                  value={formData.first_name}
                  onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                  className="w-full px-3 py-2 bg-provoid-400/10 border border-white/20 rounded-lg focus:outline-none focus:border-provoid-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-1">Nachname *</label>
                <input
                  type="text"
                  required
                  value={formData.last_name}
                  onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                  className="w-full px-3 py-2 bg-provoid-400/10 border border-white/20 rounded-lg focus:outline-none focus:border-provoid-500"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm text-gray-500 mb-1">Geburtsdatum</label>
              <input
                type="date"
                value={formData.birth_date}
                onChange={(e) => setFormData({ ...formData, birth_date: e.target.value })}
                className="w-full px-3 py-2 bg-provoid-400/10 border border-white/20 rounded-lg focus:outline-none focus:border-provoid-500"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-500 mb-1">Team</label>
                <input
                  type="text"
                  value={formData.team}
                  onChange={(e) => setFormData({ ...formData, team: e.target.value })}
                  className="w-full px-3 py-2 bg-provoid-400/10 border border-white/20 rounded-lg focus:outline-none focus:border-provoid-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-1">Position</label>
                <input
                  type="text"
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  className="w-full px-3 py-2 bg-provoid-400/10 border border-white/20 rounded-lg focus:outline-none focus:border-provoid-500"
                />
              </div>
            </div>
            
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={() => {
                  setStep('code');
                  setVerifiedTeam(null);
                  setTeamCode('');
                }}
                className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-gray-700"
              >
                Zurück
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-provoid-500 hover:bg-provoid-600 rounded-lg transition-colors text-white"
              >
                Testung starten
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Test Info */}
      <div className="mt-6 glass-card p-6">
        <h3 className="font-semibold mb-4">Testbatterie Übersicht</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-provoid-500/20 flex items-center justify-center text-provoid-400 flex-shrink-0">1</div>
            <div>
              <p className="font-medium">Bewegungsplanung & -ausführung</p>
              <p className="text-gray-500">Reaktionszeit, Motorische Sequenzierung</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400 flex-shrink-0">2</div>
            <div>
              <p className="font-medium">Wahrnehmung & Orientierung</p>
              <p className="text-gray-500">Visuelle Verfolgung, Räumliche Orientierung</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-400 flex-shrink-0">3</div>
            <div>
              <p className="font-medium">Situationsanalyse & Entscheidung</p>
              <p className="text-gray-500">Mustererkennung, Taktische Entscheidungen</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center text-green-400 flex-shrink-0">4</div>
            <div>
              <p className="font-medium">Aufmerksamkeit & Fokus</p>
              <p className="text-gray-500">Daueraufmerksamkeit, Selektive Aufmerksamkeit</p>
            </div>
          </div>
          <div className="flex items-start gap-3 md:col-span-2 md:max-w-[50%]">
            <div className="w-8 h-8 rounded-lg bg-pink-500/20 flex items-center justify-center text-pink-400 flex-shrink-0">5</div>
            <div>
              <p className="font-medium">Körperliche Selbstregulation</p>
              <p className="text-gray-500">Inhibitorische Kontrolle, Stressreaktion</p>
            </div>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-4">
          Geschätzte Dauer: 15-20 Minuten • Alle Tests sind für Jugendspielerinnen geeignet
        </p>
      </div>
    </div>
  );
};

export default NewTest;
