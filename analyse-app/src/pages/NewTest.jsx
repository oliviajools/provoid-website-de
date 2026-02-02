import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, Key, CheckCircle, User } from 'lucide-react';
import { apiUrl } from '../config/api';

const NewTest = () => {
  const navigate = useNavigate();
  const [playerCode, setPlayerCode] = useState('');
  const [codeError, setCodeError] = useState('');
  const [verifyingCode, setVerifyingCode] = useState(false);
  const [verifiedPlayer, setVerifiedPlayer] = useState(null);

  const verifyPlayerCode = async () => {
    if (!playerCode.trim()) {
      setCodeError('Bitte gib deinen Code ein');
      return;
    }
    
    setVerifyingCode(true);
    setCodeError('');
    
    try {
      const res = await fetch(apiUrl('/api/player-login'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: playerCode.trim().toUpperCase() })
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        setCodeError(data.error || 'Ungültiger Code');
        setVerifyingCode(false);
        return;
      }
      
      setVerifiedPlayer(data);
    } catch (error) {
      setCodeError('Verbindungsfehler');
    } finally {
      setVerifyingCode(false);
    }
  };

  const startTest = async () => {
    if (!verifiedPlayer) return;
    
    try {
      const res = await fetch(apiUrl('/api/sessions'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ player_id: verifiedPlayer.id })
      });
      
      const session = await res.json();
      navigate(`/test/${session.id}`);
    } catch (error) {
      console.error('Error starting test:', error);
    }
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
              {verifiedPlayer ? `Hallo, ${verifiedPlayer.first_name}!` : 'Gib deinen persönlichen Code ein'}
            </p>
          </div>
        </div>

        {!verifiedPlayer ? (
          <div className="space-y-6">
            <div className="bg-provoid-50 border border-provoid-200 rounded-xl p-6">
              <div className="flex items-start gap-3">
                <Key className="w-6 h-6 text-provoid-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Persönlichen Code eingeben</h3>
                  <p className="text-gray-600 text-sm">
                    Gib den 6-stelligen Code ein, den du von deiner Trainer:in erhalten hast.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Dein Code</label>
              <input
                type="text"
                value={playerCode}
                onChange={(e) => setPlayerCode(e.target.value.toUpperCase())}
                onKeyDown={(e) => e.key === 'Enter' && verifyPlayerCode()}
                placeholder="z.B. AB3K7X"
                className="w-full px-4 py-3 text-center text-2xl tracking-widest font-mono bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-provoid-400 focus:border-transparent text-gray-800 uppercase"
                maxLength={6}
              />
            </div>

            {codeError && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-red-500" />
                <span className="text-red-700">{codeError}</span>
              </div>
            )}

            <button
              onClick={verifyPlayerCode}
              disabled={verifyingCode}
              className="w-full py-3 bg-provoid-500 hover:bg-provoid-600 text-white rounded-xl font-semibold transition-colors disabled:opacity-50"
            >
              {verifyingCode ? 'Überprüfe...' : 'Code bestätigen'}
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-green-50 border border-green-200 rounded-xl p-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-provoid-500 to-blue-500 flex items-center justify-center text-white text-xl font-bold">
                  {verifiedPlayer.first_name[0]}{verifiedPlayer.last_name[0]}
                </div>
                <div>
                  <div className="flex items-center gap-2 text-green-600 mb-1">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-medium">Erfolgreich angemeldet</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">
                    {verifiedPlayer.first_name} {verifiedPlayer.last_name}
                  </h3>
                  {verifiedPlayer.team && (
                    <p className="text-gray-600">{verifiedPlayer.team}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setVerifiedPlayer(null);
                  setPlayerCode('');
                }}
                className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold transition-colors"
              >
                Anderer Code
              </button>
              <button
                onClick={startTest}
                className="flex-1 py-3 bg-provoid-500 hover:bg-provoid-600 text-white rounded-xl font-semibold transition-colors"
              >
                Testung starten
              </button>
            </div>
          </div>
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
