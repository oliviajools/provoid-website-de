import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Key, Plus, Trash2, Edit2, Copy, Check, ArrowLeft, ToggleLeft, ToggleRight } from 'lucide-react';
import { apiUrl } from '../config/api';

const AdminTeamCodes = () => {
  const navigate = useNavigate();
  const [codes, setCodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ team_name: '', description: '' });
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    verifyAndFetch();
  }, []);

  const getToken = () => localStorage.getItem('adminToken');

  const verifyAndFetch = async () => {
    const token = getToken();
    if (!token) {
      navigate('/admin/login');
      return;
    }

    try {
      const verifyRes = await fetch(apiUrl('/api/admin/verify'), {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!verifyRes.ok) {
        navigate('/admin/login');
        return;
      }

      fetchCodes();
    } catch (error) {
      navigate('/admin/login');
    }
  };

  const fetchCodes = async () => {
    try {
      const res = await fetch(apiUrl('/api/admin/team-codes'), {
        headers: { 'Authorization': `Bearer ${getToken()}` }
      });
      if (res.ok) {
        const data = await res.json();
        setCodes(data);
      }
    } catch (error) {
      console.error('Error fetching codes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(apiUrl('/api/admin/team-codes'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getToken()}`
        },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        setFormData({ team_name: '', description: '' });
        setShowForm(false);
        fetchCodes();
      }
    } catch (error) {
      console.error('Error creating code:', error);
    }
  };

  const toggleActive = async (id, currentState) => {
    try {
      await fetch(apiUrl(`/api/admin/team-codes/${id}`), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getToken()}`
        },
        body: JSON.stringify({ is_active: !currentState })
      });
      fetchCodes();
    } catch (error) {
      console.error('Error toggling code:', error);
    }
  };

  const deleteCode = async (id) => {
    if (!confirm('Code wirklich löschen?')) return;
    
    try {
      await fetch(apiUrl(`/api/admin/team-codes/${id}`), {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${getToken()}` }
      });
      fetchCodes();
    } catch (error) {
      console.error('Error deleting code:', error);
    }
  };

  const copyCode = (code, id) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

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
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/admin" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </Link>
            <div className="p-3 bg-provoid-400/20 rounded-xl">
              <Key className="w-8 h-8 text-provoid-500" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Team-Codes verwalten</h1>
              <p className="text-gray-500">Codes für Teams erstellen und verwalten</p>
            </div>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-provoid-500 text-white rounded-xl hover:bg-provoid-600 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Neuer Code
          </button>
        </div>
      </div>

      {/* Create Form */}
      {showForm && (
        <div className="glass-card p-6">
          <h2 className="font-semibold mb-4 text-gray-800">Neuen Team-Code erstellen</h2>
          <form onSubmit={handleCreate} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Team-Name *</label>
              <input
                type="text"
                required
                value={formData.team_name}
                onChange={(e) => setFormData({ ...formData, team_name: e.target.value })}
                placeholder="z.B. U15 Mädchen"
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-provoid-400 text-gray-800"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Beschreibung (optional)</label>
              <input
                type="text"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="z.B. Saison 2025/26"
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-provoid-400 text-gray-800"
              />
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
              >
                Abbrechen
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-provoid-500 text-white rounded-xl hover:bg-provoid-600 transition-colors"
              >
                Code erstellen
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Codes List */}
      <div className="glass-card p-6">
        <h2 className="font-semibold mb-4 text-gray-800">Aktive Codes ({codes.filter(c => c.is_active).length})</h2>
        
        {codes.length === 0 ? (
          <p className="text-gray-500 text-center py-8">Noch keine Codes erstellt</p>
        ) : (
          <div className="space-y-3">
            {codes.map((code) => (
              <div
                key={code.id}
                className={`flex items-center justify-between p-4 rounded-xl ${
                  code.is_active ? 'bg-gray-50' : 'bg-gray-100 opacity-60'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-provoid-100 rounded-lg">
                    <Key className="w-5 h-5 text-provoid-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xl font-bold text-provoid-600">{code.code}</span>
                      <button
                        onClick={() => copyCode(code.code, code.id)}
                        className="p-1 hover:bg-gray-200 rounded transition-colors"
                        title="Code kopieren"
                      >
                        {copiedId === code.id ? (
                          <Check className="w-4 h-4 text-green-500" />
                        ) : (
                          <Copy className="w-4 h-4 text-gray-400" />
                        )}
                      </button>
                    </div>
                    <p className="font-medium text-gray-800">{code.team_name}</p>
                    {code.description && (
                      <p className="text-sm text-gray-500">{code.description}</p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleActive(code.id, code.is_active)}
                    className={`p-2 rounded-lg transition-colors ${
                      code.is_active ? 'text-green-600 hover:bg-green-50' : 'text-gray-400 hover:bg-gray-200'
                    }`}
                    title={code.is_active ? 'Deaktivieren' : 'Aktivieren'}
                  >
                    {code.is_active ? <ToggleRight className="w-6 h-6" /> : <ToggleLeft className="w-6 h-6" />}
                  </button>
                  <button
                    onClick={() => deleteCode(code.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    title="Löschen"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminTeamCodes;
