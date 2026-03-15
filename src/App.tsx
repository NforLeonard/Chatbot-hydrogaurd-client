import React, { useState } from 'react';
import { Dashboard } from './pages/Dashboard';
import { HomePage } from './pages/HomePage';
import { ChatbotPage } from './pages/ChatbotPage';
import { Navigation } from './components/Navigation';
import { Settings } from './pages/Settings';
import { AboutPage } from './pages/AboutPage';

export function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'dashboard' | 'chat' | 'settings' | 'about'>('home');

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {currentPage === 'home' && <HomePage
        currentPage={currentPage}
        onNavigate={setCurrentPage} />}
      {currentPage === 'dashboard' && (
        <Dashboard
          currentPage={currentPage}
          onNavigate={setCurrentPage}
        />
      )}
      {currentPage === 'chat' && <ChatbotPage />}
      {currentPage === 'settings' && <Settings />}
      {currentPage === 'about' && <AboutPage onNavigate={setCurrentPage} />}

      <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />
    </div>
  );
}