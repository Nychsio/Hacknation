import React, { useState } from 'react';
import OnboardingScreen from './components/OnboardingScreen';
import RecommendationScreen from './components/RecommendationScreen';
import MainDashboard from './components/MainDashboard';

export default function App() {
  const [view, setView] = useState('onboarding'); // 'onboarding' -> 'list' -> 'dashboard'

  return (
    <>
      {view === 'onboarding' && (
        <OnboardingScreen onNext={() => setView('list')} />
      )}
      
      {view === 'list' && (
        <RecommendationScreen onSelectProject={() => setView('dashboard')} />
      )}
      
      {view === 'dashboard' && (
        <MainDashboard onBack={() => setView('list')} />
      )}
    </>
  );
}