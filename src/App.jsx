import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import OnboardingScreen from './components/OnboardingScreen';
import RecommendationScreen from './components/RecommendationScreen';
import MainDashboard from './components/MainDashboard';

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
    <div className="relative min-h-screen w-screen overflow-hidden bg-slate-50">
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
            <OnboardingScreen onNext={() => setView('list')} />
          )}
          
          {view === 'list' && (
            <RecommendationScreen onSelectProject={() => setView('dashboard')} />
          )}
          
          {view === 'dashboard' && (
            <MainDashboard onBack={() => setView('list')} />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}