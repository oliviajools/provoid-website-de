import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Key, RefreshCw, Copy, Check, Calendar, Trophy, Search } from 'lucide-react';

const AdminPlayers = () => {
  const navigate = useNavigate();
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchPlayers();
  }, []);

  const fetchPlayers = async () => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    try {
      const res = await fetch('/api/admin/players-overview', {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (res.ok) {
        const data = await res.json();
        setPlayers(data);
      } else if (res.status === 401) {
        navigate('/admin/login');
      }
    } catch (error) {
      console.error('Error fetching players:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateCode = async (playerId) => {
    const token = localStorage.getItem('adminToken');
    setGenerating(playerId);

    try {
      const res = await fetch(`/api/admin/players/${playerId}/generate-code`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (res.ok) {
        const data = await res.json();
        setPlayers(players.map(p => 
          p.id === playerId ? { ...p, player_code: data.player_code } : p
        ));
      }
    } catch (error) {
      console.error('Error generating code:', error);
    } finally {
      setGenerating(null);
    }
  };

  const generateAllCodes = async () => {
    const token = localStorage.getItem('adminToken');
    setGenerating('all');

    try {
      const res = await fetch('/api/admin/generate-all-codes', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (res.ok) {
        await fetchPlayers();
      }
    } catch (error) {
      console.error('Error generating codes:', error);
    } finally {
      setGenerating(null);
    }
  };

  const copyCode = (code, id) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '-';
    return new Date(dateStr).toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const filteredPlayers = players.filter(p => 
    `${p.first_name} ${p.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.team?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.player_code?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const playersWithoutCode = players.filter(p => !p.player_code).length;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <img src="/analyse/provoid-logo.png" alt="PROVOID" className="h-16 w-auto object-contain animate-pulse" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-provoid-400/20 rounded-xl">
              <Users className="w-8 h-8 text-provoid-500" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Spielerinnen-Übersicht</h1>
              <p className="text-gray-500">{players.length} Spielerinnen registriert</p>
            </div>
          </div>
          
          {playersWithoutCode > 0 && (
            <button
              onClick={generateAllCodes}
              disabled={generating === 'all'}
              className="flex items-center gap-2 px-4 py-2 bg-provoid-500 text-white rounded-xl hover:bg-provoid-600 transition-colors disabled:opacity-50"
            >
              <Key className={`w-5 h-5 ${generating === 'all' ? 'animate-spin' : ''}`} />
              Codes für alle ({playersWithoutCode}) generieren
            </button>
          )}
        </div>
      </div>

      {/* Search */}
      <div className="glass-card p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Suche nach Name, Team oder Code..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-provoid-500/50"
          />
        </div>
      </div>

      {/* Players Table */}
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Spielerin</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Team</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Login-Code</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Tests</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Letzter Score</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Letzter Test</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredPlayers.map((player) => (
                <tr key={player.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-800">
                      {player.first_name} {player.last_name}
                    </div>
                    {player.position && (
                      <div className="text-sm text-gray-500">{player.position}</div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-600">{player.team || '-'}</span>
                  </td>
                  <td className="px-6 py-4">
                    {player.player_code ? (
                      <div className="flex items-center gap-2">
                        <code className="px-3 py-1 bg-provoid-100 text-provoid-700 rounded-lg font-mono font-bold">
                          {player.player_code}
                        </code>
                        <button
                          onClick={() => copyCode(player.player_code, player.id)}
                          className="p-1 hover:bg-gray-100 rounded transition-colors"
                          title="Code kopieren"
                        >
                          {copiedId === player.id ? (
                            <Check className="w-4 h-4 text-green-500" />
                          ) : (
                            <Copy className="w-4 h-4 text-gray-400" />
                          )}
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => generateCode(player.id)}
                        disabled={generating === player.id}
                        className="flex items-center gap-1 px-3 py-1 text-sm bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 transition-colors disabled:opacity-50"
                      >
                        {generating === player.id ? (
                          <RefreshCw className="w-4 h-4 animate-spin" />
                        ) : (
                          <Key className="w-4 h-4" />
                        )}
                        Code generieren
                      </button>
                    )}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-2 py-1 rounded-full text-sm font-medium ${
                      player.completed_tests > 0 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-gray-100 text-gray-500'
                    }`}>
                      {player.completed_tests}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    {player.latest_score ? (
                      <div className="flex items-center justify-center gap-1">
                        <Trophy className="w-4 h-4 text-amber-500" />
                        <span className="font-semibold text-gray-800">
                          {player.latest_score.toFixed(0)}%
                        </span>
                      </div>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="w-4 h-4" />
                      {formatDate(player.latest_test_date)}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredPlayers.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            {searchTerm ? 'Keine Spielerinnen gefunden' : 'Noch keine Spielerinnen registriert'}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPlayers;
