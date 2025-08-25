
import React, { useState, useCallback } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import ClientsPage from './components/ClientsPage';
import TrainingsPage from './components/TrainingsPage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = useCallback(() => {
    setIsAuthenticated(true);
  }, []);

  const handleLogout = useCallback(() => {
    setIsAuthenticated(false);
  }, []);

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <HashRouter>
      <Layout onLogout={handleLogout}>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/clients" element={<ClientsPage />} />
          <Route path="/trainings" element={<TrainingsPage />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
}

export default App;