import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, User, ArrowRight, CheckCircle2, Lock, 
  Smartphone, Fingerprint 
} from 'lucide-react';
import logo from '../assets/logo.png'; // Upewnij się, że masz logo w assets

const MobileOnboardingScreen = ({ onNext }) => {
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    // Symulacja logowania i analizy profilu
    setTimeout(() => {
      onNext();
    }, 1500);
  };

  // --- EKRAN ŁADOWANIA (BIELIK AI) ---
  if (loading) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-slate-50 text-slate-900 px-6 text-center">
        <motion.div 
           animate={{ rotate: 360 }}
           transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
           className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full mb-6"
        />
        <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xl font-bold mb-2"
        >
            Pllum analizuje Dziennik Ustaw...
        </motion.h2>
        <p className="text-sm text-slate-500">
            Dopasowywanie do profilu: <span className="font-bold text-slate-700">IT / B2B</span>
        </p>
        <div className="mt-8 flex items-center gap-2 text-xs text-blue-600 font-bold bg-blue-50 px-3 py-1 rounded-full">
            <Shield size={12}/> Privacy First: Dane przetwarzane lokalnie
        </div>
      </div>
    );
  }

  // --- EKRAN GŁÓWNY ---
  return (
    <div className="relative h-screen w-screen bg-slate-50 overflow-hidden flex flex-col font-sans">
      
      {/* 1. SEKCJA GÓRNA (BRANDING + HERO) - 45% Ekranu */}
      <div className="relative h-[45%] bg-blue-600 text-white flex flex-col items-center pt-12 px-6 overflow-hidden">
        
        {/* Tło animowane (Gradient) */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ repeat: Infinity, duration: 8 }}
          className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-blue-400/30 to-transparent pointer-events-none"
        />

        {/* Logo i Nagłówek */}
        <div className="relative z-10 flex flex-col items-center text-center">
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 mb-6 bg-blue-700/30 px-4 py-2 rounded-full backdrop-blur-sm border border-blue-500/30"
            >
                <img src={logo} alt="Logo" className="w-6 h-6 rounded shadow-sm" />
                <span className="font-bold text-sm tracking-wide text-blue-50">LEGIS 2.0</span>
            </motion.div>

            <motion.h1 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="text-3xl font-bold leading-tight mb-3"
            >
                Prawo, które<br/>Cię rozumie.
            </motion.h1>
            
            <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-blue-100 text-sm max-w-[260px] leading-relaxed"
            >
                Suwerenna AI tłumaczy przepisy i chroni Twój biznes przed zmianami.
            </motion.p>
        </div>

        {/* Ikona w tle (Visual Anchor) */}
        <div className="absolute bottom-[-20px] opacity-10 pointer-events-none">
            <Shield size={240} strokeWidth={1} />
        </div>
      </div>

      {/* 2. SEKCJA DOLNA (LOGOWANIE / SHEET) - 55% Ekranu */}
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.3 }}
        className="flex-1 bg-white rounded-t-[32px] -mt-6 relative z-20 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)] p-8 flex flex-col"
      >
        <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-8" /> {/* Uchwyt sheeta */}

        <div className="mb-6">
            <h2 className="text-xl font-bold text-slate-800 mb-1">Dzień dobry!</h2>
            <p className="text-sm text-slate-500">Zaloguj się bezpiecznie, aby kontynuować.</p>
        </div>

        {/* Karta Profilu Zaufanego (Mock) */}
        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 mb-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-2 opacity-5">
                <Lock size={80} />
            </div>
            
            <div className="flex items-center gap-4 mb-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border border-slate-200 text-blue-600 shadow-sm">
                    <User size={20} />
                </div>
                <div>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Tożsamość Cyfrowa</p>
                    <p className="text-sm font-bold text-slate-800">Jan Nowak</p>
                </div>
                <CheckCircle2 size={18} className="text-green-500 ml-auto" />
            </div>

            <div className="flex gap-2">
                <span className="text-[10px] bg-white border border-slate-200 px-2 py-1 rounded text-slate-500 font-medium">
                    Profil Zaufany
                </span>
                <span className="text-[10px] bg-blue-100 border border-blue-200 px-2 py-1 rounded text-blue-700 font-bold">
                    Weryfikacja OK
                </span>
            </div>
        </div>

        {/* Spacer wypychający przycisk na dół */}
        <div className="flex-1" />

        {/* Przycisk Główny */}
        <button 
            onClick={handleLogin}
            className="w-full bg-blue-600 active:bg-blue-700 text-white py-4 rounded-xl font-bold text-base flex items-center justify-center gap-3 shadow-lg shadow-blue-200 transition-transform active:scale-95"
        >
            <div className="bg-blue-500 p-1 rounded-full">
                <Fingerprint size={16} />
            </div>
            Zaloguj przez Węzeł Krajowy
            <ArrowRight size={18} />
        </button>

        <p className="text-[10px] text-center text-slate-400 mt-6 mx-auto max-w-[200px] leading-tight">
            Logując się akceptujesz <span className="underline decoration-slate-300">Regulamin</span> usługi Legis 2.0
        </p>

      </motion.div>
    </div>
  );
};

export default MobileOnboardingScreen;