import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Users, PlayCircle, BarChart3, Home } from 'lucide-react';

const Layout = ({ children }) => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', icon: Home, label: 'Dashboard' },
    { path: '/admin/teams', icon: Users, label: 'Spielerinnen' },
    { path: '/new-test', icon: PlayCircle, label: 'Neue Testung' },
  ];

  return (
    <div className="min-h-screen text-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <header className="glass-card mt-4 mb-6">
          <div className="flex items-center justify-between px-6 py-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="relative">
                <img src="/analyse/provoid-logo.png" alt="PROVOID" className="h-12 w-auto object-contain brain-pulse" />
                <div className="absolute inset-0 bg-provoid-500/30 blur-xl rounded-full"></div>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-provoid-400 to-provoid-300 bg-clip-text text-transparent">
                  PROVOID NeuroAthletic
                </h1>
                <p className="text-xs text-gray-500">Neuroathletische Leistungsdiagnostik</p>
              </div>
            </Link>
            
            <nav className="flex items-center gap-2">
              {navItems.map(({ path, icon: Icon, label }) => (
                <Link
                  key={path}
                  to={path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                    location.pathname === path
                      ? 'bg-provoid-500/20 text-provoid-300 border border-provoid-500/40'
                      : 'hover:bg-provoid-400/10 text-gray-600'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="hidden md:inline">{label}</span>
                </Link>
              ))}
            </nav>
          </div>
        </header>

        {/* Main Content */}
        <main className="pb-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
