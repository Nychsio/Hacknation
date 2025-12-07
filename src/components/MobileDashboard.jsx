import React from 'react';
import { motion } from 'framer-motion';
import { 
    Bell, Search, Filter, ChevronRight, 
    FileText, Calendar, AlertCircle, Home, 
    Menu, User, ArrowLeft
} from 'lucide-react';

const MobileDashboard = ({ onSelectProject, onBack }) => {
  
  // DANE (MOCK DATA)
  const PROJECTS = [
    {
      id: 1,
      title: "Ustawa o transparentności AI",
      dept: "Min. Cyfryzacji",
      status: "Pre-konsultacje",
      stage: 2, // 1-5
      date: "3 dni do końca",
      priority: "high",
      desc: "Wymaga Twojej uwagi. Nowe obowiązki dla branży IT."
    },
    {
      id: 2,
      title: "Wakacje Składkowe (ZUS)",
      dept: "Min. Rozwoju",
      status: "Senat",
      stage: 4,
      date: "W procesie",
      priority: "medium",
      desc: "Możliwość zwolnienia z opłat. Etap poprawek."
    }
  ];

  // Komponent Mini-Pociągu (Timeline na karcie)
  const MiniTrain = ({ stage }) => (
    <div className="flex items-center gap-1 mt-3 mb-2 w-full">
        {[1, 2, 3, 4, 5].map((step) => (
            <div key={step} className="flex-1 flex items-center">
                <div 
                    className={`h-1.5 w-full rounded-full ${
                        step <= stage ? 'bg-blue-600' : 'bg-slate-200'
                    } ${step === stage ? 'relative overflow-visible' : ''}`}
                >
                    {step === stage && (
                        <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-blue-600 border-2 border-white rounded-full shadow-sm"></div>
                    )}
                </div>
            </div>
        ))}
    </div>
  );

  return (
    <div className="bg-slate-50 min-h-screen pb-20 font-sans text-slate-900">
      
      {/* 1. HEADER (Fixed Top) */}
      <div className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200 px-5 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
            <button onClick={() => onBack && onBack()} className="p-2 rounded-md hover:bg-slate-100">
                <ArrowLeft size={20} className="text-slate-600" />
            </button>
            <div className="flex flex-col">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Mój Pulpit</span>
                <span className="text-lg font-bold text-slate-800">Dzień dobry, Janie</span>
            </div>
        </div>
        <div className="relative">
            <Bell className="text-slate-600" size={24} />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
        </div>
      </div>

      {/* 2. SEARCH BAR */}
      <div className="px-5 py-4">
        <div className="relative">
            <Search className="absolute left-3 top-3 text-slate-400" size={18} />
            <input 
                type="text" 
                placeholder="Szukaj ustawy lub frazy..." 
                className="w-full bg-white border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-sm focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
            />
            <div className="absolute right-3 top-2.5 bg-slate-100 p-1 rounded-md border border-slate-200 text-slate-500">
                <Filter size={14} />
            </div>
        </div>
      </div>

      {/* 3. SCROLLABLE CONTENT */}
      <div className="px-5 space-y-6">
        
        {/* Sekcja: Wymaga uwagi */}
        <div>
            <div className="flex justify-between items-end mb-3">
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wide">Priorytetowe</h3>
                <span className="text-xs text-blue-600 font-bold">Zobacz wszystkie</span>
            </div>

            {/* KARTA GŁÓWNA (AI ACT) */}
            <motion.div 
                whileTap={{ scale: 0.98 }}
                onClick={() => onSelectProject(PROJECTS[0])}
                className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 relative overflow-hidden group"
            >
                {/* Pasek statusu boczny */}
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-red-500"></div>
                
                <div className="flex justify-between items-start mb-2 pl-2">
                    <span className="bg-red-50 text-red-700 text-[10px] px-2 py-0.5 rounded border border-red-100 font-bold uppercase tracking-wide flex items-center gap-1">
                        <AlertCircle size={10}/> Ważne
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">UD-234</span>
                </div>

                <h4 className="text-lg font-bold text-slate-800 mb-1 pl-2 leading-tight">
                    {PROJECTS[0].title}
                </h4>
                <p className="text-xs text-slate-500 mb-4 pl-2 leading-relaxed">
                    {PROJECTS[0].desc}
                </p>

                {/* MINI POCIĄG LEGISLACYJNY */}
                <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 ml-2">
                    <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase mb-1">
                        <span>Start</span>
                        <span className="text-blue-600">Pre-konsultacje</span>
                        <span>Finał</span>
                    </div>
                    <MiniTrain stage={2} />
                </div>

                <div className="mt-4 flex items-center justify-between pl-2 pt-2 border-t border-slate-100">
                    <div className="flex items-center gap-2 text-xs font-bold text-red-600">
                        <Calendar size={14}/> {PROJECTS[0].date}
                    </div>
                    <ChevronRight size={18} className="text-slate-300 group-hover:text-blue-500 transition-colors"/>
                </div>
            </motion.div>
        </div>

        {/* Sekcja: Pozostałe */}
        <div>
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wide mb-3">Ostatnie zmiany</h3>
            
            {/* KARTA MNIEJSZA (ZUS) */}
            <motion.div 
                whileTap={{ scale: 0.98 }}
                className="bg-white rounded-xl p-4 shadow-sm border border-slate-200 flex gap-4 items-center mb-3"
            >
                <div className="w-10 h-10 rounded-full bg-green-100 text-green-700 flex items-center justify-center shrink-0 border border-green-200">
                    <FileText size={18}/>
                </div>
                <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-slate-800 truncate">{PROJECTS[1].title}</h4>
                    <p className="text-[10px] text-slate-500 uppercase font-bold mt-0.5">{PROJECTS[1].dept} • {PROJECTS[1].status}</p>
                </div>
                <ChevronRight size={16} className="text-slate-300"/>
            </motion.div>

            {/* Placeholder kolejnej karty */}
            <motion.div 
                whileTap={{ scale: 0.98 }}
                className="bg-white rounded-xl p-4 shadow-sm border border-slate-200 flex gap-4 items-center opacity-60"
            >
                <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center shrink-0 border border-slate-200">
                    <FileText size={18}/>
                </div>
                <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-slate-800 truncate">Nowelizacja Kryptoaktywów</h4>
                    <p className="text-[10px] text-slate-500 uppercase font-bold mt-0.5">Min. Finansów • Komisja</p>
                </div>
            </motion.div>
        </div>
      </div>

      {/* 4. BOTTOM NAVIGATION (Fixed) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-6 py-3 flex justify-between items-center z-40 pb-6">
        <button className="flex flex-col items-center gap-1 text-blue-600">
            <Home size={22} strokeWidth={2.5} />
            <span className="text-[10px] font-bold">Pulpit</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-slate-400 hover:text-slate-600">
            <FileText size={22} />
            <span className="text-[10px] font-medium">Ustawy</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-slate-400 hover:text-slate-600">
            <User size={22} />
            <span className="text-[10px] font-medium">Profil</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-slate-400 hover:text-slate-600">
            <Menu size={22} />
            <span className="text-[10px] font-medium">Więcej</span>
        </button>
      </div>

    </div>
  );
};

export default MobileDashboard;