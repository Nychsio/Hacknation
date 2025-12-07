import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Smartphone, Monitor } from 'lucide-react';

// --- IMPORTY DESKTOP ---
import OnboardingScreen from './components/OnboardingScreen';
import RecommendationScreen from './components/RecommendationScreen';
import MainDashboard from './components/MainDashboard';
import AdminDashboard from './components/AdminDashboard';

// --- IMPORTY MOBILE ---
import MobileOnboardingScreen from './components/MobileOnboardingScreen';
import MobileDashboard from './components/MobileDashboard';
import MobileProjectDetail from './components/MobileProjectDetail';

export default function App() {
  // Stan deweloperski: Czy testujemy mobile?
  const [isMobileMode, setIsMobileMode] = useState(true);

  // Stan widoku DESKTOP
  const [view, setView] = useState(() => localStorage.getItem('app_view') || 'onboarding');

  // Stan widoku MOBILE
  const [mobileView, setMobileView] = useState('onboarding'); // 'onboarding', 'dashboard', 'detail'
  const [selectedMobileProject, setSelectedMobileProject] = useState(null);

  // Zapisywanie widoku desktop w localStorage
  useEffect(() => {
    localStorage.setItem('app_view', view);
  }, [view]);

  // Animacje dla Desktopu
  const transitions = {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -16 }
  };

  // --- LOGIKA WYŚWIETLANIA PRZEŁĄCZNIKA ---
  // Przełącznik widoczny TYLKO na ekranach startowych (Onboarding)
  const showDevToggle = (isMobileMode && mobileView === 'onboarding') || (!isMobileMode && view === 'onboarding');

  return (
    <div className="relative min-h-screen w-screen overflow-hidden">
      
      {/* --- PRZYCISK DEWELOPERSKI (Widoczny tylko na Onboardingu) --- */}
      {showDevToggle && (
        <div className="fixed top-4 right-4 z-[9999]">
            <button 
                onClick={() => setIsMobileMode(!isMobileMode)}
                className="flex items-center gap-2 bg-black/80 text-white px-4 py-2 rounded-full backdrop-blur shadow-xl hover:bg-black transition-all text-xs font-bold border border-white/20"
            >
                {isMobileMode ? <Monitor size={14}/> : <Smartphone size={14}/>}
                {isMobileMode ? 'Pokaż Desktop' : 'Pokaż Mobile'}
            </button>
        </div>
      )}

      {/* --- GŁÓWNY RENDERER --- */}
      
      {isMobileMode ? (
        /* ================= SCENARIUSZ 1: MOBILE ================= */
        <div className="bg-slate-50 min-h-screen relative">
            <AnimatePresence mode="wait">
                
                {/* 1. Onboarding Mobile */}
                {mobileView === 'onboarding' && (
                    <motion.div key="mob-onboard" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
                        <MobileOnboardingScreen onNext={() => setMobileView('dashboard')} />
                    </motion.div>
                )}

                {/* 2. Dashboard Mobile */}
                {mobileView === 'dashboard' && (
                    <motion.div key="mob-dash" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
                        <MobileDashboard 
                            onSelectProject={(project) => {
                                setSelectedMobileProject(project);
                                setMobileView('detail');
                            }} 
                        />
                    </motion.div>
                )}

                {/* 3. Detail Mobile (Z Tłumaczem i Formularzem) */}
                {mobileView === 'detail' && (
                    <motion.div key="mob-detail" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="absolute inset-0 z-50 bg-slate-50">
                        <MobileProjectDetail 
                            project={selectedMobileProject} 
                            onBack={() => setMobileView('dashboard')} 
                        />
                    </motion.div>
                )}

            </AnimatePresence>
        </div>

      ) : (
        /* ================= SCENARIUSZ 2: DESKTOP ================= */
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
                  onAdminLogin={() => setView('admin')} 
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

              {view === 'admin' && (
                 <AdminDashboard 
                    onLogout={() => setView('onboarding')} 
                 />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}