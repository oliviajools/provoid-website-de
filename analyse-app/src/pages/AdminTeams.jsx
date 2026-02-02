import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, Plus, Pencil, Trash2, ChevronRight, X } from 'lucide-react';
import { apiUrl } from '../config/api';

const AdminTeams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingTeam, setEditingTeam] = useState(null);
  const [formData, setFormData] = useState({ name: '', description: '' });

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const res = await fetch(apiUrl('/api/admin/teams'), { credentials: 'include' });
      if (!res.ok) {
        console.error('Error fetching teams:', res.status);
        setLoading(false);
        return;
      }
      const data = await res.json();
      setTeams(Array.isArray(data) ? data : []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching teams:', error);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingTeam 
        ? apiUrl(`/api/admin/teams/${editingTeam.id}`)
        : apiUrl('/api/admin/teams');
      
      const method = editingTeam ? 'PUT' : 'POST';
      
      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formData)
      });
      
      fetchTeams();
      closeModal();
    } catch (error) {
      console.error('Error saving team:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Team wirklich löschen? Spielerinnen werden nicht gelöscht, nur die Team-Zuordnung entfernt.')) return;
    
    try {
      await fetch(apiUrl(`/api/admin/teams/${id}`), { 
        method: 'DELETE',
        credentials: 'include'
      });
      fetchTeams();
    } catch (error) {
      console.error('Error deleting team:', error);
    }
  };

  const openEditModal = (team) => {
    setEditingTeam(team);
    setFormData({ name: team.name, description: team.description || '' });
    setShowModal(true);
  };

  const openCreateModal = () => {
    setEditingTeam(null);
    setFormData({ name: '', description: '' });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingTeam(null);
    setFormData({ name: '', description: '' });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-provoid-400"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Teams verwalten</h1>
        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 bg-provoid-500 hover:bg-provoid-600 px-4 py-2 rounded-lg transition-colors"
        >
          <Plus className="w-5 h-5" />
          Neues Team
        </button>
      </div>

      {teams.length === 0 ? (
        <div className="glass-card p-12 text-center">
          <Users className="w-16 h-16 mx-auto text-gray-500 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Noch keine Teams</h2>
          <p className="text-gray-400 mb-6">Erstelle dein erstes Team, um Spielerinnen zu organisieren.</p>
          <button
            onClick={openCreateModal}
            className="bg-provoid-500 hover:bg-provoid-600 px-6 py-3 rounded-lg transition-colors"
          >
            Erstes Team erstellen
          </button>
        </div>
      ) : (
        <div className="grid gap-4">
          {teams.map((team) => (
            <div key={team.id} className="glass-card p-4 hover:border-provoid-500/50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-provoid-500 to-blue-500 flex items-center justify-center">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{team.name}</h3>
                    {team.description && (
                      <p className="text-sm text-gray-400">{team.description}</p>
                    )}
                    <p className="text-sm text-gray-500 mt-1">
                      {team.player_count} {team.player_count === 1 ? 'Spielerin' : 'Spielerinnen'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openEditModal(team)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    title="Bearbeiten"
                  >
                    <Pencil className="w-5 h-5 text-gray-400" />
                  </button>
                  <button
                    onClick={() => handleDelete(team.id)}
                    className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
                    title="Löschen"
                  >
                    <Trash2 className="w-5 h-5 text-red-400" />
                  </button>
                  <Link
                    to={`/admin/teams/${team.id}`}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    title="Details anzeigen"
                  >
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="glass-card p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">
                {editingTeam ? 'Team bearbeiten' : 'Neues Team'}
              </h2>
              <button onClick={closeModal} className="p-2 hover:bg-white/10 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Teamname *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-provoid-500"
                  required
                  placeholder="z.B. U17 Mädchen"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Beschreibung</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-provoid-500"
                  rows={3}
                  placeholder="Optionale Beschreibung des Teams"
                />
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
                  {editingTeam ? 'Speichern' : 'Erstellen'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTeams;
