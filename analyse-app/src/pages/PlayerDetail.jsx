import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, TrendingUp, ChevronRight } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar } from 'recharts';
import ScoreRing from '../components/ScoreRing';

const PlayerDetail = () => {
  const { id } = useParams();
  const [player, setPlayer] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlayerData();
  }, [id]);

  const fetchPlayerData = async () => {
    try {
      const [playerRes, sessionsRes, statsRes] = await Promise.all([
        fetch(`/api/players/${id}`),
        fetch(`/api/players/${id}/sessions`),
        fetch(`/api/stats/player/${id}`)
      ]);
      
      const playerData = await playerRes.json();
      const sessionsData = await sessionsRes.json();
      const statsData = await statsRes.json();
      
      setPlayer(playerData);
      setSessions(sessionsData);
      setStats(statsData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching player data:', error);
      setLoading(false);
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <img src="/provoid-logo.png" alt="PROVOID" className="h-16 w-auto object-contain animate-pulse" />
      </div>
    );
  }

  if (!player) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Spielerin nicht gefunden</p>
        <Link to="/players" className="text-provoid-400 hover:text-provoid-300 mt-4 inline-block">
          Zurück zur Übersicht
        </Link>
      </div>
    );
  }

  // Prepare chart data
  const chartData = stats.map(s => ({
    date: new Date(s.test_date).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit' }),
    Gesamt: Math.round(s.total_score || 0),
    Bewegung: Math.round(s.movement_score || 0),
    Wahrnehmung: Math.round(s.perception_score || 0),
    Entscheidung: Math.round(s.decision_score || 0),
    Aufmerksamkeit: Math.round(s.attention_score || 0),
    Regulation: Math.round(s.regulation_score || 0)
  })).reverse();

  // Latest session stats for radar
  const latestStats = stats[0];
  const radarData = latestStats ? [
    { subject: 'Bewegung', score: latestStats.movement_score || 0 },
    { subject: 'Wahrnehmung', score: latestStats.perception_score || 0 },
    { subject: 'Entscheidung', score: latestStats.decision_score || 0 },
    { subject: 'Aufmerksamkeit', score: latestStats.attention_score || 0 },
    { subject: 'Regulation', score: latestStats.regulation_score || 0 }
  ] : [];

  // Calculate averages and trends
  const avgScore = stats.length > 0 
    ? stats.reduce((sum, s) => sum + (s.total_score || 0), 0) / stats.length 
    : 0;
  
  const trend = stats.length >= 2 
    ? (stats[0].total_score || 0) - (stats[stats.length - 1].total_score || 0)
    : 0;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <Link to="/players" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-800 transition-colors">
        <ArrowLeft className="w-5 h-5" />
        Zurück zu Spielerinnen
      </Link>

      {/* Player Info Card */}
      <div className="glass-card p-6">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-provoid-500 to-blue-500 flex items-center justify-center">
            <span className="text-3xl font-bold">
              {player.first_name[0]}{player.last_name[0]}
            </span>
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-2xl font-bold">{player.first_name} {player.last_name}</h1>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-2 text-gray-500">
              {calculateAge(player.birth_date) && (
                <span>{calculateAge(player.birth_date)} Jahre</span>
              )}
              {player.team && <span>• {player.team}</span>}
              {player.position && <span>• {player.position}</span>}
            </div>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-2 text-sm text-gray-500">
              {player.dominant_hand && (
                <span>Hand: {player.dominant_hand === 'right' ? 'Rechts' : player.dominant_hand === 'left' ? 'Links' : 'Beidhändig'}</span>
              )}
              {player.dominant_foot && (
                <span>• Fuß: {player.dominant_foot === 'right' ? 'Rechts' : player.dominant_foot === 'left' ? 'Links' : 'Beidfüßig'}</span>
              )}
            </div>
          </div>
          
          <div className="flex gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-provoid-400">{sessions.filter(s => s.completed).length}</div>
              <div className="text-sm text-gray-500">Tests</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400">{Math.round(avgScore)}%</div>
              <div className="text-sm text-gray-500">Durchschnitt</div>
            </div>
            {trend !== 0 && (
              <div className="text-center">
                <div className={`text-3xl font-bold ${trend > 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {trend > 0 ? '+' : ''}{Math.round(trend)}
                </div>
                <div className="text-sm text-gray-500">Trend</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex gap-4">
        <Link 
          to="/new-test" 
          className="flex-1 glass-card p-4 hover:bg-provoid-400/15 transition-colors text-center"
        >
          <img src="/provoid-logo.png" alt="PROVOID" className="h-8 w-auto object-contain mx-auto mb-2" />
          <span className="font-medium">Neue Testung</span>
        </Link>
        {sessions.length > 0 && sessions[0].completed && (
          <Link 
            to={`/results/${sessions[0].id}`}
            className="flex-1 glass-card p-4 hover:bg-provoid-400/15 transition-colors text-center"
          >
            <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <span className="font-medium">Letztes Ergebnis</span>
          </Link>
        )}
      </div>

      {stats.length > 0 ? (
        <>
          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Progress Chart */}
            <div className="glass-card p-6">
              <h2 className="text-lg font-semibold mb-4">Entwicklungsverlauf</h2>
              {chartData.length > 1 ? (
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <XAxis dataKey="date" stroke="#6b7280" fontSize={12} />
                      <YAxis domain={[0, 100]} stroke="#6b7280" fontSize={12} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'rgba(30, 41, 59, 0.9)', 
                          border: '1px solid rgba(255,255,255,0.1)',
                          borderRadius: '8px'
                        }}
                      />
                      <Line type="monotone" dataKey="Gesamt" stroke="#a855f7" strokeWidth={2} dot={{ fill: '#a855f7' }} />
                      <Line type="monotone" dataKey="Bewegung" stroke="#3b82f6" strokeWidth={1} dot={false} strokeDasharray="5 5" />
                      <Line type="monotone" dataKey="Wahrnehmung" stroke="#22c55e" strokeWidth={1} dot={false} strokeDasharray="5 5" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="h-64 flex items-center justify-center text-gray-500">
                  Mindestens 2 Tests für Verlaufsdarstellung erforderlich
                </div>
              )}
            </div>

            {/* Current Profile Radar */}
            <div className="glass-card p-6">
              <h2 className="text-lg font-semibold mb-4">Aktuelles Profil</h2>
              {radarData.length > 0 ? (
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={radarData}>
                      <PolarGrid stroke="rgba(255,255,255,0.2)" />
                      <PolarAngleAxis dataKey="subject" tick={{ fill: '#9ca3af', fontSize: 11 }} />
                      <Radar
                        dataKey="score"
                        stroke="#a855f7"
                        fill="#a855f7"
                        fillOpacity={0.4}
                        strokeWidth={2}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="h-64 flex items-center justify-center text-gray-500">
                  Keine Daten vorhanden
                </div>
              )}
            </div>
          </div>

          {/* Category Progress */}
          <div className="glass-card p-6">
            <h2 className="text-lg font-semibold mb-4">Bereichsübersicht (letzte Testung)</h2>
            {latestStats && (
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {[
                  { label: 'Bewegung', score: latestStats.movement_score },
                  { label: 'Wahrnehmung', score: latestStats.perception_score },
                  { label: 'Entscheidung', score: latestStats.decision_score },
                  { label: 'Aufmerksamkeit', score: latestStats.attention_score },
                  { label: 'Regulation', score: latestStats.regulation_score }
                ].map(item => (
                  <div key={item.label} className="text-center">
                    <ScoreRing score={item.score || 0} size={80} strokeWidth={6} />
                    <p className="mt-2 text-sm text-gray-500">{item.label}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="glass-card p-12 text-center">
          <img src="/provoid-logo.png" alt="PROVOID" className="h-16 w-auto object-contain mx-auto mb-4 opacity-50" />
          <h3 className="text-xl font-semibold mb-2">Noch keine Testungen</h3>
          <p className="text-gray-500 mb-6">
            Starte die erste neuroathletische Testung für {player.first_name}
          </p>
          <Link 
            to="/new-test"
            className="inline-flex items-center gap-2 px-6 py-3 bg-provoid-500 hover:bg-provoid-600 rounded-xl font-semibold transition-colors"
          >
            Erste Testung starten
          </Link>
        </div>
      )}

      {/* Test History */}
      {sessions.length > 0 && (
        <div className="glass-card p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-provoid-400" />
            Testhistorie
          </h2>
          
          <div className="space-y-3">
            {sessions.map(session => (
              <Link
                key={session.id}
                to={session.completed ? `/results/${session.id}` : `/test/${session.id}`}
                className="flex items-center justify-between p-4 bg-provoid-400/5 hover:bg-provoid-400/10 rounded-xl transition-colors"
              >
                <div>
                  <p className="font-medium">
                    {new Date(session.test_date).toLocaleDateString('de-DE', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                  <p className="text-sm text-gray-500">
                    {session.completed ? 'Abgeschlossen' : 'In Bearbeitung'}
                  </p>
                </div>
                
                <div className="flex items-center gap-4">
                  {session.completed && session.total_score && (
                    <ScoreRing score={session.total_score} size={50} strokeWidth={4} />
                  )}
                  <ChevronRight className="w-5 h-5 text-gray-500" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PlayerDetail;
