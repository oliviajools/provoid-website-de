import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserPlus, Search, ChevronRight, Trash2, Edit2 } from 'lucide-react';

const Players = () => {
  const [players, setPlayers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingPlayer, setEditingPlayer] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    birth_date: '',
    team: '',
    position: '',
    dominant_hand: 'right',
    dominant_foot: 'right'
  });

  useEffect(() => {
    fetchPlayers();
  }, []);

  const fetchPlayers = async () => {
    try {
      const res = await fetch('/api/players');
      const data = await res.json();
      setPlayers(data);
    } catch (error) {
      console.error('Error fetching players:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const url = editingPlayer 
        ? `/api/players/${editingPlayer.id}`
        : '/api/players';
      
      const method = editingPlayer ? 'PUT' : 'POST';
      
      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      fetchPlayers();
      closeModal();
    } catch (error) {
      console.error('Error saving player:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Spielerin und alle zugehörigen Testergebnisse löschen?')) return;
    
    try {
      await fetch(`/api/players/${id}`, { method: 'DELETE' });
      fetchPlayers();
    } catch (error) {
      console.error('Error deleting player:', error);
    }
  };

  const openEditModal = (player) => {
    setEditingPlayer(player);
    setFormData({
      first_name: player.first_name,
      last_name: player.last_name,
      birth_date: player.birth_date || '',
      team: player.team || '',
      position: player.position || '',
      dominant_hand: player.dominant_hand || 'right',
      dominant_foot: player.dominant_foot || 'right'
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingPlayer(null);
    setFormData({
      first_name: '',
      last_name: '',
      birth_date: '',
      team: '',
      position: '',
      dominant_hand: 'right',
      dominant_foot: 'right'
    });
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

  const filteredPlayers = players.filter(p => 
    `${p.first_name} ${p.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (p.team && p.team.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Spielerinnen</h1>
        
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-provoid-500 hover:bg-provoid-600 rounded-xl transition-colors"
        >
          <UserPlus className="w-5 h-5" />
          Neue Spielerin
        </button>
      </div>

      {/* Search */}
      <div className="glass-card p-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Spielerin suchen..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-provoid-400/10 border border-white/20 rounded-xl focus:outline-none focus:border-provoid-500"
          />
        </div>
      </div>

      {/* Players List */}
      <div className="glass-card divide-y divide-white/10">
        {filteredPlayers.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            {players.length === 0 
              ? 'Noch keine Spielerinnen angelegt'
              : 'Keine Spielerinnen gefunden'
            }
          </div>
        ) : (
          filteredPlayers.map((player) => (
            <div key={player.id} className="flex items-center justify-between p-4 hover:bg-provoid-400/5">
              <Link to={`/players/${player.id}`} className="flex items-center gap-4 flex-1">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-provoid-500 to-blue-500 flex items-center justify-center">
                  <span className="text-lg font-semibold">
                    {player.first_name[0]}{player.last_name[0]}
                  </span>
                </div>
                <div>
                  <p className="font-medium">{player.first_name} {player.last_name}</p>
                  <p className="text-sm text-gray-500">
                    {calculateAge(player.birth_date) && `${calculateAge(player.birth_date)} Jahre`}
                    {player.team && ` • ${player.team}`}
                    {player.position && ` • ${player.position}`}
                  </p>
                </div>
              </Link>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => openEditModal(player)}
                  className="p-2 hover:bg-provoid-400/10 rounded-lg transition-colors"
                >
                  <Edit2 className="w-4 h-4 text-gray-500" />
                </button>
                <button
                  onClick={() => handleDelete(player.id)}
                  className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4 text-red-400" />
                </button>
                <Link to={`/players/${player.id}`}>
                  <ChevronRight className="w-5 h-5 text-gray-500" />
                </Link>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="glass-card p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">
              {editingPlayer ? 'Spielerin bearbeiten' : 'Neue Spielerin'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
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
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-500 mb-1">Dominante Hand</label>
                  <select
                    value={formData.dominant_hand}
                    onChange={(e) => setFormData({ ...formData, dominant_hand: e.target.value })}
                    className="w-full px-3 py-2 bg-provoid-400/10 border border-white/20 rounded-lg focus:outline-none focus:border-provoid-500"
                  >
                    <option value="right">Rechts</option>
                    <option value="left">Links</option>
                    <option value="both">Beidhändig</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-500 mb-1">Dominanter Fuß</label>
                  <select
                    value={formData.dominant_foot}
                    onChange={(e) => setFormData({ ...formData, dominant_foot: e.target.value })}
                    className="w-full px-3 py-2 bg-provoid-400/10 border border-white/20 rounded-lg focus:outline-none focus:border-provoid-500"
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
                  className="flex-1 px-4 py-2 bg-provoid-400/10 hover:bg-white/20 rounded-lg transition-colors"
                >
                  Abbrechen
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-provoid-500 hover:bg-provoid-600 rounded-lg transition-colors"
                >
                  {editingPlayer ? 'Speichern' : 'Anlegen'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Players;
