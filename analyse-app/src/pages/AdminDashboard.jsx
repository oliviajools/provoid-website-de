import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Shield, LogOut, ChevronRight, Calendar, User, Activity, Key, Users } from 'lucide-react';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');

  useEffect(() => {
    verifyAndFetch();
  }, []);

  const verifyAndFetch = async () => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    try {
      const verifyRes = await fetch('/api/admin/verify', {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!verifyRes.ok) {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUsername');
        navigate('/admin/login');
        return;
      }

      const verifyData = await verifyRes.json();
      setUsername(verifyData.username);

      const sessionsRes = await fetch('/api/admin/all-sessions', {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (sessionsRes.ok) {
        const sessionsData = await sessionsRes.json();
        setSessions(sessionsData);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    const token = localStorage.getItem('adminToken');
    try {
      await fetch('/api/admin/logout', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
    } catch (error) {
      console.error('Logout error:', error);
    }
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUsername');
    navigate('/admin/login');
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
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
      {/* Admin Header */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-provoid-400/20 rounded-xl">
              <Shield className="w-8 h-8 text-provoid-500" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Admin-Bereich</h1>
              <p className="text-gray-500">Angemeldet als: {username}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Abmelden
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link
          to="/admin/players"
          className="glass-card p-6 hover:border-provoid-400 transition-colors group"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-provoid-400/20 rounded-xl">
              <Users className="w-6 h-6 text-provoid-500" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 group-hover:text-provoid-600">Spielerinnen & Codes</h3>
              <p className="text-sm text-gray-500">IDs verwalten und Ergebnisse sehen</p>
            </div>
          </div>
        </Link>
        <Link
          to="/admin/team-codes"
          className="glass-card p-6 hover:border-provoid-400 transition-colors group"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-400/20 rounded-xl">
              <Key className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 group-hover:text-green-600">Team-Codes</h3>
              <p className="text-sm text-gray-500">Codes für Teams erstellen</p>
            </div>
          </div>
        </Link>
        <Link
          to="/players"
          className="glass-card p-6 hover:border-provoid-400 transition-colors group"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-400/20 rounded-xl">
              <User className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 group-hover:text-blue-600">Spielerinnen-Datenbank</h3>
              <p className="text-sm text-gray-500">Daten bearbeiten</p>
            </div>
          </div>
        </Link>
      </div>

      {/* Recent Sessions */}
      <div className="glass-card p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-gray-800">
          <Activity className="w-6 h-6 text-provoid-500" />
          Alle Testungen
        </h2>

        {sessions.length === 0 ? (
          <p className="text-gray-500 text-center py-8">Noch keine Testungen vorhanden</p>
        ) : (
          <div className="space-y-3">
            {sessions.map((session) => (
              <Link
                key={session.id}
                to={session.completed ? `/results/${session.id}` : `/test/${session.id}`}
                className="flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-provoid-50 transition-colors group"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-provoid-100 rounded-lg">
                    <User className="w-5 h-5 text-provoid-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">
                      {session.first_name} {session.last_name}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar className="w-4 h-4" />
                      {formatDate(session.test_date)}
                      {session.team && <span className="text-provoid-500">• {session.team}</span>}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {session.completed ? (
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                      {session.total_score?.toFixed(0) || 0}%
                    </span>
                  ) : (
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">
                      In Bearbeitung
                    </span>
                  )}
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-provoid-500 transition-colors" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
