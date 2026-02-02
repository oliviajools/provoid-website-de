import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, Activity, TrendingUp, PlayCircle, ChevronRight } from 'lucide-react';
import ScoreRing from '../components/ScoreRing';

const Dashboard = () => {
  const [stats, setStats] = useState({ players: 0, sessions: 0, avgScore: 0 });
  const [recentSessions, setRecentSessions] = useState([]);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [playersRes, sessionsRes] = await Promise.all([
        fetch('/api/players'),
        fetch('/api/sessions')
      ]);
      
      const players = await playersRes.json();
      const sessions = await sessionsRes.json();
      
      const completedSessions = sessions.filter(s => s.completed);
      const avgScore = completedSessions.length > 0
        ? completedSessions.reduce((sum, s) => sum + (s.total_score || 0), 0) / completedSessions.length
        : 0;
      
      setStats({
        players: players.length,
        sessions: completedSessions.length,
        avgScore: Math.round(avgScore)
      });
      
      setRecentSessions(sessions.slice(0, 5));
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const categories = [
    {
      name: 'Bewegungsplanung & -ausführung',
      description: 'Prämotorischer Kortex, Basalganglien, Kleinhirn',
      icon: '🧠',
      color: 'from-provoid-500 to-cyan-700'
    },
    {
      name: 'Wahrnehmung & Orientierung',
      description: 'Parietallappen, Visueller Kortex, Vestibuläres System',
      icon: '👁️',
      color: 'from-blue-500 to-blue-700'
    },
    {
      name: 'Situationsanalyse & Entscheidungsfindung',
      description: 'Präfrontaler Kortex, Anteriorer Cingulärer Kortex',
      icon: '⚡',
      color: 'from-amber-500 to-orange-600'
    },
    {
      name: 'Aufmerksamkeit & Fokus',
      description: 'Dorsales & Ventrales Aufmerksamkeitsnetzwerk',
      icon: '🎯',
      color: 'from-green-500 to-emerald-600'
    },
    {
      name: 'Körperliche Selbstregulation',
      description: 'Insula, Limbisches System, Autonomes Nervensystem',
      icon: '💪',
      color: 'from-pink-500 to-rose-600'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Hero Section */}
      <div className="glass-card p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-provoid-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-provoid-500/10 rounded-full blur-3xl"></div>
        
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2">
            Neuroathletische Leistungsdiagnostik
          </h1>
          <p className="text-gray-500 max-w-2xl mb-6">
            Wissenschaftlich fundierte Analyse kognitiver und sensomotorischer Fähigkeiten 
            für optimale sportliche Leistung. Basierend auf aktueller neurowissenschaftlicher Forschung.
          </p>
          
          <Link
            to="/new-test"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-provoid-500 to-provoid-500 rounded-xl font-semibold hover:opacity-90 transition-opacity"
          >
            <PlayCircle className="w-5 h-5" />
            Neue Testung starten
          </Link>
        </div>
      </div>


      {/* Test Categories */}
      <div className="glass-card p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <img src="/analyse/provoid-logo.png" alt="PROVOID" className="h-7 w-auto object-contain" />
          Testbereiche (Neurowissenschaftliche Grundlage)
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-provoid-400/5 hover:bg-provoid-400/10 transition-colors">
              <div className="flex items-start gap-3">
                <span className="text-2xl">{cat.icon}</span>
                <div>
                  <h3 className="font-medium text-gray-800">{cat.name}</h3>
                  <p className="text-xs text-gray-500 mt-1">{cat.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
