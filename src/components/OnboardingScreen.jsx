import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, User, Briefcase, Check, Coins, FileText, ArrowUpRight } from 'lucide-react';

const OnboardingScreen = ({ onNext }) => {
  const [loading, setLoading] = useState(false);

  const handleStart = () => {
    setLoading(true);
    // Symulacja ładowania
    setTimeout(onNext, 2000); 
  };

  if (loading) {
    return (
      <div className="h-screen w-screen bg-slate-900 flex flex-col items-center justify-center text-white">
        <motion.div 
           animate={{ rotate: 360 }}
           transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
           className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mb-8"
        />
        <h2 className="text-2xl font-bold">Bielik analizuje Dziennik Ustaw...</h2>
        <p className="text-slate-400 mt-2">Dopasowywanie do profilu: IT / B2B</p>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen bg-slate-50 flex items-center justify-center font-sans p-4">
      <div className="max-w-4xl w-full grid grid-cols-2 bg-white rounded-3xl shadow-2xl overflow-hidden min-h-[600px]">
        {/* Lewa: Intro */}
        <div className="bg-slate-900 p-12 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10"><Shield size={200}/></div>
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-600 rounded flex items-center justify-center font-bold text-xl">L</div>
              <span className="font-bold text-xl tracking-tight">Legis <span className="text-blue-400">2.0</span></span>
            </div>
            <h1 className="text-4xl font-bold leading-tight mb-4">Prawo, które Cię rozumie.</h1>
            <p className="text-slate-400">Suwerenna sztuczna inteligencja filtruje legislację pod Twój biznes.</p>
          </div>
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 rounded-full bg-slate-700 border-2 border-blue-500 overflow-hidden">
                <div className="w-full h-full flex items-center justify-center bg-slate-600"><User/></div>
             </div>
             <div>
                <p className="font-bold">Witaj, Janie!</p>
                <p className="text-xs text-slate-400">Profil Zaufany: Zweryfikowano</p>
             </div>
          </div>
        </div>
        {/* Prawa: Formularz */}
        <div className="p-12 flex flex-col justify-center">
           <h2 className="text-2xl font-bold text-slate-800 mb-6">Potwierdź swój profil</h2>
           <div className="space-y-6">
              <div>
                 <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Twój Status</label>
                 <div className="p-4 border border-blue-200 bg-blue-50 rounded-xl flex items-center justify-between text-blue-900 font-bold">
                    <span className="flex items-center gap-2"><Briefcase size={18}/> Mikroprzedsiębiorca (B2B)</span>
                    <Check size={20} className="text-blue-600"/>
                 </div>
              </div>
              <div>
                 <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Kluczowe Zainteresowania</label>
                 <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 border-2 border-slate-900 bg-slate-800 text-white rounded-xl flex items-center gap-2 shadow-lg scale-105 transform">
                       <Coins size={18}/> <span>Kryptowaluty</span> <Check size={14} className="ml-auto"/>
                    </div>
                    <div className="p-3 border border-slate-200 rounded-xl flex items-center gap-2 text-slate-500">
                       <Shield size={18}/> <span>Obronność</span>
                    </div>
                    <div className="p-3 border border-slate-200 rounded-xl flex items-center gap-2 text-slate-500">
                       <FileText size={18}/> <span>Podatki</span>
                    </div>
                    <div className="p-3 border border-slate-200 rounded-xl flex items-center gap-2 text-slate-500 opacity-50">
                       <span>Rolnictwo</span>
                    </div>
                 </div>
              </div>
              <button onClick={handleStart} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-200 mt-4">
                 Analizuj Prawo pode mnie <ArrowUpRight/>
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingScreen;