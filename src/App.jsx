import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import OnboardingScreen from './components/OnboardingScreen';
import RecommendationScreen from './components/RecommendationScreen';
import MainDashboard from './components/MainDashboard';
import AdminDashboard from './components/AdminDashboard'; // 1. Nowy import

export default function App() {
  const [view, setView] = useState(() => localStorage.getItem('app_view') || 'onboarding');

  useEffect(() => {
    localStorage.setItem('app_view', view);
  }, [view]);

  const transitions = {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -16 }
  };

  return (
    // 2. Dynamiczna klasa tła: Zmienia kolor 'pod spodem' na ciemny w trybie admina, 
    // żeby animacja wyglądała profesjonalnie (Light Mode -> Dark Mode transition)
    <div className={`relative min-h-screen w-screen overflow-hidden transition-colors duration-500 ${view === 'admin' ? 'bg-slate-950' : 'bg-slate-50'}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={view}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={transitions}
          transition={{ duration: 0.35, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          {view === 'onboarding' && (
            <OnboardingScreen 
              onNext={() => setView('list')} 
              onAdminLogin={() => setView('admin')} // 3. Obsługa wejścia do Admina
            />
          )}
          
          {view === 'list' && (
            <RecommendationScreen 
              onSelectProject={() => setView('dashboard')} 
              onLogout={() => setView('onboarding')}
            />
          )}
          
          {view === 'dashboard' && (
            <MainDashboard 
              onBack={() => setView('list')} 
              onLogout={() => setView('onboarding')}
            />
          )}

          {/* 4. Nowy widok Admina */}
          {view === 'admin' && (
             <AdminDashboard 
                onLogout={() => setView('onboarding')} 
             />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}