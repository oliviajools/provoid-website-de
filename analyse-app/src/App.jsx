import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import AdminProtected from './components/AdminProtected';
import Dashboard from './pages/Dashboard';
import Players from './pages/Players';
import NewTest from './pages/NewTest';
import TestSession from './pages/TestSession';
import Results from './pages/Results';
import PlayerDetail from './pages/PlayerDetail';
import PrivacyConsent from './pages/PrivacyConsent';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminTeamCodes from './pages/AdminTeamCodes';

function App() {
  return (
    <Router basename="/analyse">
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/privacy" element={<PrivacyConsent />} />
          <Route path="/players" element={<AdminProtected><Players /></AdminProtected>} />
          <Route path="/players/:id" element={<AdminProtected><PlayerDetail /></AdminProtected>} />
          <Route path="/new-test" element={<NewTest />} />
          <Route path="/test/:sessionId" element={<TestSession />} />
          <Route path="/results/:sessionId" element={<Results />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/team-codes" element={<AdminTeamCodes />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
