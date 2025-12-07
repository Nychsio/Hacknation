import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, User, Building2, ArrowRight, Lock, 
  Cpu, FileText, CheckCircle2, SwitchCamera 
} from 'lucide-react';
import logo from '../assets/logo.png'; // Upewnij się, że ścieżka jest poprawna

const OnboardingScreen = ({ onNext, onAdminLogin }) => {
  const [isOfficial, setIsOfficial] = useState(false); // false = Obywatel, true = Urzędnik
  const [loading, setLoading] = useState(false);

  // Funkcja logowania - symulacja
  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      if (isOfficial) {
        onAdminLogin(); // Przekierowanie do AdminDashboard
      } else {
        onNext(); // Przekierowanie do listy projektów (RecommendationScreen)
      }
    }, 1500);
  };

  // Ekran ładowania (Bielik AI)
  if (loading) {
    return (
      <div className={`h-screen w-screen flex flex-col items-center justify-center transition-colors duration-500 ${isOfficial ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-800'}`}>
        <motion.div 
           animate={{ rotate: 360 }}
           transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
           className={`w-16 h-16 border-4 border-t-transparent rounded-full mb-8 ${isOfficial ? 'border-indigo-500' : 'border-blue-500'}`}
        />
        <h2 className="text-2xl font-bold">
            {isOfficial ? 'Autoryzacja Domenowa...' : 'Pllum analizuje Dziennik Ustaw...'}
        </h2>
        <p className={`mt-2 ${isOfficial ? 'text-slate-500' : 'text-slate-400'}`}>
            {isOfficial ? 'Weryfikacja uprawnień legislacyjnych' : 'Dopasowywanie do profilu: IT / B2B'}
        </p>
      </div>
    );
  }

  return (
    <div className={`relative h-screen w-screen overflow-hidden flex items-center justify-center transition-colors duration-700 ${isOfficial ? 'bg-slate-950' : 'bg-slate-50'}`}>
      
      {/* TŁO ANIMOWANE */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ 
            background: isOfficial 
              ? 'radial-gradient(circle at 80% 20%, rgba(79, 70, 229, 0.15) 0%, transparent 50%)' // Indigo dla Admina
              : 'radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)'  // Blue dla Obywatela
          }}
          className="absolute inset-0 transition-all duration-700"
        />
      </div>

      {/* GŁÓWNA KARTA LOGOWANIA */}
      <motion.div 
        layout
        className={`relative z-10 w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 rounded-3xl overflow-hidden shadow-2xl min-h-[600px] transition-all duration-500 ${isOfficial ? 'bg-slate-900 border border-slate-800' : 'bg-white border border-slate-200'}`}
      >
        
        {/* LEWA KOLUMNA: WIZUALNA (DYNAMICZNA) */}
        <div className={`relative p-12 flex flex-col justify-between overflow-hidden text-white transition-colors duration-500 ${isOfficial ? 'bg-indigo-950' : 'bg-blue-600'}`}>
            {/* Tło dekoracyjne */}
            <div className="absolute top-0 right-0 p-8 opacity-10">
                {isOfficial ? <Building2 size={300} /> : <Shield size={300} />}
            </div>

            {/* Logo i Nagłówek */}
            <div>
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-3 mb-8"
                >
                    <img 
                        src={logo} 
                        alt="Legis Logo" 
                        className="w-12 h-12 rounded-lg" 
                        style={{ filter: "drop-shadow(0 0 8px rgba(255, 255, 255, 0.6))" }}
                    />
                    <span className="font-bold text-2xl tracking-tight">
                        Legis <span className={isOfficial ? "text-indigo-400" : "text-blue-200"}>2.0</span>
                    </span>
                </motion.div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={isOfficial ? 'official-text' : 'citizen-text'}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                            {isOfficial ? 'Centrum Zarządzania Legislacją.' : 'Prawo, które Cię rozumie.'}
                        </h1>
                        <p className={`text-lg leading-relaxed ${isOfficial ? 'text-indigo-200' : 'text-blue-100'}`}>
                            {isOfficial 
                                ? 'Monitoruj wpływ regulacji, analizuj OSR i zarządzaj procesem legislacyjnym w czasie rzeczywistym dzięki AI.' 
                                : 'Suwerenna sztuczna inteligencja tłumaczy przepisy na prosty język i chroni Twój biznes przed zmianami.'}
                        </p>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Badge na dole lewej kolumny */}
            <div className="flex items-center gap-4 mt-8">
                <div className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2 border ${isOfficial ? 'bg-indigo-900/50 border-indigo-400 text-indigo-200' : 'bg-blue-500/50 border-blue-300 text-blue-50'}`}>
                    {isOfficial ? <Cpu size={14} /> : <Lock size={14} />}
                    {isOfficial ? 'Pllum Lokalnie' : 'Privacy First'}
                </div>
            </div>
        </div>

        {/* PRAWA KOLUMNA: FORMULARZ */}
        <div className={`p-12 flex flex-col justify-center transition-colors duration-500 ${isOfficial ? 'text-slate-100' : 'text-slate-800'}`}>
            <AnimatePresence mode="wait">
                <motion.div
                    key={isOfficial ? 'official-form' : 'citizen-form'}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-8"
                >
                    <div>
                        <h2 className="text-3xl font-bold mb-2">
                            {isOfficial ? 'Panel Legislatora' : 'Witaj, Obywatelu'}
                        </h2>
                        <p className={isOfficial ? 'text-slate-400' : 'text-slate-500'}>
                            {isOfficial ? 'Zaloguj się domeną gov.pl' : 'Zaloguj się przez Węzeł Krajowy'}
                        </p>
                    </div>

                    {/* Symulacja pól formularza - tylko wygląd */}
                    <div className="space-y-4">
                        {isOfficial ? (
                            // Fields dla Urzędnika
                            <>
                                <div className="p-4 rounded-xl border border-slate-700 bg-slate-800 flex items-center gap-3 text-slate-300">
                                    <Building2 size={20} />
                                    <span>jan.kowalski@mc.gov.pl</span>
                                    <CheckCircle2 size={16} className="ml-auto text-green-500" />
                                </div>
                                <div className="p-4 rounded-xl border border-slate-700 bg-slate-800 flex items-center gap-3 text-slate-300">
                                    <Lock size={20} />
                                    <span>••••••••••••••</span>
                                </div>
                            </>
                        ) : (
                            // Fields dla Obywatela
                            <>
                                <div className="p-4 rounded-xl border border-blue-200 bg-blue-50 flex items-center gap-3 text-blue-900 font-bold">
                                    <User size={20} />
                                    <span>Jan Nowak (Profil Zaufany)</span>
                                    <CheckCircle2 size={20} className="ml-auto text-green-600" />
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="p-3 border border-slate-200 rounded-xl text-sm text-slate-500 bg-slate-50">
                                        Status: <strong>Mikroprzedsiębiorca</strong>
                                    </div>
                                    <div className="p-3 border border-slate-200 rounded-xl text-sm text-slate-500 bg-slate-50">
                                        Branża: <strong>IT / B2B</strong>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>

                    <button 
                        onClick={handleLogin}
                        className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-lg hover:scale-[1.02] active:scale-[0.98] ${
                            isOfficial 
                            ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-900/50' 
                            : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-200'
                        }`}
                    >
                        {isOfficial ? 'Uruchom System' : 'Analizuj Prawo'} 
                        <ArrowRight size={20} />
                    </button>
                </motion.div>
            </AnimatePresence>
        </div>

      </motion.div>

      {/* TOGGLE SWITCH - PRAWY DOLNY RÓG */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute bottom-8 right-8 z-50"
      >
        <button
            onClick={() => setIsOfficial(!isOfficial)}
            className={`group flex items-center gap-3 px-5 py-3 rounded-full backdrop-blur-md border transition-all duration-300 shadow-xl ${
                isOfficial 
                ? 'bg-slate-800/80 border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white' 
                : 'bg-white/80 border-white text-slate-600 hover:bg-white hover:text-blue-600'
            }`}
        >
            <div className="text-right mr-1">
                <p className="text-[10px] font-bold uppercase tracking-wider opacity-60">
                    Przełącz widok
                </p>
                <p className="text-sm font-bold leading-none">
                    {isOfficial ? 'Dla Obywatela' : 'Dla Urzędnika'}
                </p>
            </div>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${isOfficial ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-600 group-hover:bg-blue-100 group-hover:text-blue-600'}`}>
                <SwitchCamera size={20} />
            </div>
        </button>
      </motion.div>

    </div>
  );
};

export default OnboardingScreen;