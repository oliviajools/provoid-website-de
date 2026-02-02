import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Users, Plus, Pencil, Trash2, X, Copy, Check } from 'lucide-react';
import { apiUrl } from '../config/api';

const AdminTeamDetail = () => {
  const { teamId } = useParams();
  const [team, setTeam] = useState(null);
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingPlayer, setEditingPlayer] = useState(null);
  const [copiedCode, setCopiedCode] = useState(null);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    birth_date: '',
    position: '',
    dominant_hand: 'right',
    dominant_foot: 'right'
  });

  useEffect(() => {
    fetchTeamData();
  }, [teamId]);

  const fetchTeamData = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const headers = { 'Authorization': `Bearer ${token}` };
      const [teamsRes, playersRes] = await Promise.all([
        fetch(apiUrl('/api/admin/teams'), { headers }),
        fetch(apiUrl(`/api/admin/teams/${teamId}/players`), { headers })
      ]);
      
      const teams = await teamsRes.json();
      const playersData = await playersRes.json();
      
      const currentTeam = teams.find(t => t.id === teamId);
      setTeam(currentTeam);
      setPlayers(playersData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching team data:', error);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const playerData = {
        ...formData,
        team_id: teamId,
        team: team?.name
      };
      
      const token = localStorage.getItem('adminToken');
      const url = editingPlayer 
        ? apiUrl(`/api/players/${editingPlayer.id}`)
        : apiUrl('/api/players');
      
      const method = editingPlayer ? 'PUT' : 'POST';
      
      await fetch(url, {
        method,
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(playerData)
      });
      
      fetchTeamData();
      closeModal();
    } catch (error) {
      console.error('Error saving player:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Spielerin und alle zugehörigen Testergebnisse löschen?')) return;
    
    try {
      const token = localStorage.getItem('adminToken');
      await fetch(apiUrl(`/api/players/${id}`), { 
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchTeamData();
    } catch (error) {
      console.error('Error deleting player:', error);
    }
  };

  const copyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const openEditModal = (player) => {
    setEditingPlayer(player);
    setFormData({
      first_name: player.first_name,
      last_name: player.last_name,
      birth_date: player.birth_date || '',
      position: player.position || '',
      dominant_hand: player.dominant_hand || 'right',
      dominant_foot: player.dominant_foot || 'right'
    });
    setShowModal(true);
  };

  const openCreateModal = () => {
    setEditingPlayer(null);
    setFormData({
      first_name: '',
      last_name: '',
      birth_date: '',
      position: '',
      dominant_hand: 'right',
      dominant_foot: 'right'
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingPlayer(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-provoid-400"></div>
      </div>
    );
  }

  if (!team) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">Team nicht gefunden</p>
        <Link to="/admin/teams" className="text-provoid-400 hover:underline mt-4 inline-block">
          Zurück zur Übersicht
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Link to="/admin/teams" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-300 transition-colors">
        <ArrowLeft className="w-5 h-5" />
        Zurück zu Teams
      </Link>

      {/* Team Header */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-provoid-500 to-blue-500 flex items-center justify-center">
            <Users className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{team.name}</h1>
            {team.description && (
              <p className="text-gray-400">{team.description}</p>
            )}
            <p className="text-sm text-gray-500 mt-1">
              {players.length} {players.length === 1 ? 'Spielerin' : 'Spielerinnen'}
            </p>
          </div>
        </div>
      </div>

      {/* Players Section */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Spielerinnen</h2>
        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 bg-provoid-500 hover:bg-provoid-600 px-4 py-2 rounded-lg transition-colors"
        >
          <Plus className="w-5 h-5" />
          Neue Spielerin
        </button>
      </div>

      {players.length === 0 ? (
        <div className="glass-card p-8 text-center">
          <Users className="w-12 h-12 mx-auto text-gray-500 mb-3" />
          <p className="text-gray-400 mb-4">Noch keine Spielerinnen in diesem Team</p>
          <button
            onClick={openCreateModal}
            className="bg-provoid-500 hover:bg-provoid-600 px-4 py-2 rounded-lg transition-colors"
          >
            Erste Spielerin hinzufügen
          </button>
        </div>
      ) : (
        <div className="glass-card overflow-hidden">
          <table className="w-full">
            <thead className="bg-white/5">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Name</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Code</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Position</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Tests</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-400">Aktionen</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {players.map((player) => (
                <tr key={player.id} className="hover:bg-white/5">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-provoid-500 to-blue-500 flex items-center justify-center text-xs font-bold">
                        {player.first_name[0]}{player.last_name[0]}
                      </div>
                      <span className="font-medium">{player.first_name} {player.last_name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    {player.player_code ? (
                      <button
                        onClick={() => copyCode(player.player_code)}
                        className="inline-flex items-center gap-1 font-mono text-sm bg-provoid-500/20 px-2 py-1 rounded hover:bg-provoid-500/30 transition-colors"
                      >
                        {player.player_code}
                        {copiedCode === player.player_code ? (
                          <Check className="w-3 h-3 text-green-400" />
                        ) : (
                          <Copy className="w-3 h-3 text-gray-400" />
                        )}
                      </button>
                    ) : (
                      <span className="text-gray-500 text-sm">-</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-gray-400">{player.position || '-'}</td>
                  <td className="px-4 py-3 text-gray-400">{player.test_count || 0}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-1">
                      <button
                        onClick={() => openEditModal(player)}
                        className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                      >
                        <Pencil className="w-4 h-4 text-gray-400" />
                      </button>
                      <button
                        onClick={() => handleDelete(player.id)}
                        className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-red-400" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="glass-card p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">
                {editingPlayer ? 'Spielerin bearbeiten' : 'Neue Spielerin'}
              </h2>
              <button onClick={closeModal} className="p-2 hover:bg-white/10 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Vorname *</label>
                  <input
                    type="text"
                    value={formData.first_name}
                    onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-provoid-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Nachname *</label>
                  <input
                    type="text"
                    value={formData.last_name}
                    onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-provoid-500"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Geburtsdatum</label>
                <input
                  type="date"
                  value={formData.birth_date}
                  onChange={(e) => setFormData({ ...formData, birth_date: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-provoid-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Position</label>
                <input
                  type="text"
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-provoid-500"
                  placeholder="z.B. Stürmerin, Torhüterin"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Starke Hand</label>
                  <select
                    value={formData.dominant_hand}
                    onChange={(e) => setFormData({ ...formData, dominant_hand: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-provoid-500"
                  >
                    <option value="right">Rechts</option>
                    <option value="left">Links</option>
                    <option value="both">Beidhändig</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Starker Fuß</label>
                  <select
                    value={formData.dominant_foot}
                    onChange={(e) => setFormData({ ...formData, dominant_foot: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-provoid-500"
                  >
                    <option value="right">Rechts</option>
                    <option value="left">Links</option>
                    <option value="both">Beidfüßig</option>
                  </select>
                </div>
              </div>
              
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 px-4 py-2 border border-white/20 rounded-lg hover:bg-white/5 transition-colors"
                >
                  Abbrechen
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-provoid-500 hover:bg-provoid-600 rounded-lg transition-colors"
                >
                  {editingPlayer ? 'Speichern' : 'Erstellen'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTeamDetail;
