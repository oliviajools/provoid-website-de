import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, ArrowRight, AlertCircle } from 'lucide-react';

const PlayerLogin = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!code.trim()) {
      setError('Bitte gib deinen Code ein');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/player-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: code.trim() })
      });

      const data = await res.json();

      if (res.ok && data.success) {
        // Store player info in session
        sessionStorage.setItem('playerSession', JSON.stringify(data.player));
        
        // Navigate to privacy consent first, then test
        navigate('/privacy', { 
          state: { 
            playerId: data.player.id,
            playerName: `${data.player.first_name} ${data.player.last_name}`,
            fromPlayerLogin: true
          }
        });
      } else {
        setError(data.error || 'Ungültiger Code');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Verbindungsfehler. Bitte versuche es erneut.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12">
      <div className="glass-card p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-provoid-100 rounded-full mb-4">
            <User className="w-8 h-8 text-provoid-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Spielerin-Anmeldung</h1>
          <p className="text-gray-500 mt-2">
            Gib deinen persönlichen Code ein, um die Analyse zu starten
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Dein Code
            </label>
            <input
              type="text"
              value={code}
              onChange={(e) => {
                setCode(e.target.value.toUpperCase());
                setError('');
              }}
              placeholder="z.B. ANNA1234"
              className="w-full px-4 py-3 text-center text-xl font-mono font-bold tracking-wider bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-provoid-500/50 focus:border-provoid-500 uppercase"
              maxLength={8}
              disabled={loading}
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-50 text-red-600 rounded-xl">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !code.trim()}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-provoid-500 text-white font-semibold rounded-xl hover:bg-provoid-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                Anmelden
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </form>

        {/* Help text */}
        <div className="mt-6 pt-6 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-500">
            Du hast deinen Code von deinem Trainer oder Team erhalten.
            <br />
            Bei Fragen wende dich an dein Team.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PlayerLogin;
