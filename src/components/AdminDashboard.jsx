import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, Users, PieChart as IconPieChart, LogOut, Shield, 
  CheckCircle, VenetianMask, Lock, Activity, ArrowLeft, ChevronRight, 
  AlertTriangle, TrendingUp, Cpu, Info
} from 'lucide-react';

// Recharts do dużych wykresów
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell 
} from 'recharts';

import logo from '../assets/logo.png';
import godlo from '../assets/godlo.png';

// --- KOMPONENT: MINI DONUT (WYKRES KOŁOWY DLA TEMATU) ---
// Używamy CSS Conic Gradient dla idealnej płynności i wyglądu w małej skali
const TopicDonut = ({ pos, neu, neg }) => {
    // Obliczamy stopnie dla każdego koloru (360 stopni to całość)
    const posDeg = (pos / 100) * 360;
    const neuDeg = (neu / 100) * 360;
    // const negDeg = reszta;

    return (
        <div className="relative w-20 h-20 rounded-full flex items-center justify-center shadow-lg shadow-black/50">
            {/* Warstwa Wykresu */}
            <div 
                className="absolute inset-0 rounded-full"
                style={{
                    background: `conic-gradient(
                        #10b981 0deg ${posDeg}deg, 
                        #64748b ${posDeg}deg ${posDeg + neuDeg}deg, 
                        #f43f5e ${posDeg + neuDeg}deg 360deg
                    )`
                }}
            ></div>
            
            {/* Środek (Wycięcie Donuta) */}
            <div className="absolute inset-2 bg-slate-900 rounded-full flex flex-col items-center justify-center z-10">
                <span className="text-[10px] text-slate-400 font-bold uppercase">Neg</span>
                <span className="text-sm font-bold text-white">{neg}%</span>
            </div>
        </div>
    );
};

// --- DANE (MOCK DATA) ---
const PROJECTS = [
  { 
    id: 'UD234', 
    title: "Ustawa o transparentności systemów AI", 
    dept: "Dep. Prawny", 
    status: "active", 
    sentiment: "negative", 
    stats: { comments: 1248, risks: 65, verified: 100 }
  },
  { 
    id: 'UD442', 
    title: "Nowelizacja Kryptoaktywów (MiCA)", 
    dept: "Dep. Innowacji", 
    status: "review", 
    sentiment: "neutral",
    stats: { comments: 850, risks: 30, verified: 98 }
  },
  { 
    id: 'SEN-12', 
    title: "Wakacje Składkowe dla MŚP", 
    dept: "Min. Rozwoju", 
    status: "closed", 
    sentiment: "positive",
    stats: { comments: 3400, risks: 5, verified: 99 }
  },
];

const REPORT_ACTIVITY = [
  { name: 'Pn', uwagi: 400, ryzyka: 240 },
  { name: 'Wt', uwagi: 300, ryzyka: 139 },
  { name: 'Śr', uwagi: 900, ryzyka: 980 },
  { name: 'Cz', uwagi: 278, ryzyka: 390 },
  { name: 'Pt', uwagi: 189, ryzyka: 480 },
  { name: 'Sb', uwagi: 239, ryzyka: 380 },
  { name: 'Nd', uwagi: 349, ryzyka: 430 },
];

const REPORT_SENTIMENT = [
  { name: 'Pozytywne', value: 30, color: '#10b981' }, 
  { name: 'Neutralne', value: 45, color: '#64748b' }, 
  { name: 'Ryzyka', value: 25, color: '#ef4444' }, 
];

// DANE TEMATÓW - KAŻDY MA SWÓJ ROZKŁAD SENTYMENTU
const TOPICS = [
  { 
    id: 1, 
    title: "Koszty Pracodawcy", 
    count: 1240, 
    trend: "+12%", 
    // Specyficzny rozkład dla tego tematu (Dużo negatywów - czerwony)
    sentiment: { pos: 10, neu: 15, neg: 75 },
    desc: "Dominują obawy MŚP o płynność finansową.",
    isCritical: true 
  },
  { 
    id: 2, 
    title: "Ochrona Danych (RODO)", 
    count: 980, 
    trend: "+5%", 
    // Neutralny rozkład (Szary)
    sentiment: { pos: 20, neu: 60, neg: 20 },
    desc: "Dyskusja o art. 15 i prawie do bycia zapomnianym.",
    isCritical: false
  },
  { 
    id: 3, 
    title: "Ekologia / OZE", 
    count: 850, 
    trend: "-2%", 
    // Pozytywny rozkład (Zielony)
    sentiment: { pos: 70, neu: 20, neg: 10 },
    desc: "Pozytywny odbiór zachęt podatkowych dla OZE.",
    isCritical: false
  },
  { 
    id: 4, 
    title: "Cyfryzacja Urzędów", 
    count: 620, 
    trend: "+8%", 
    // Mieszany
    sentiment: { pos: 30, neu: 30, neg: 40 },
    desc: "Pytania o API i integrację z systemami lokalnymi.",
    isCritical: false
  },
];

const FEEDBACK_DATA = [
  { id: 1, sentiment: 'negative', text: "Wprowadzenie obowiązkowych audytów dla małych firm zabije innowacyjność. Koszty są zaporowe.", author: "Prezes Software House'u", sector: "IT", loc: "Mazowieckie" },
  { id: 2, sentiment: 'neutral', text: "Art. 15 jest niejasny w kontekście definicji 'systemu wysokiego ryzyka'. Czy chatbot obsługi klienta też się wlicza?", author: "Prawnik Wewnętrzny", sector: "Fintech", loc: "Małopolskie" },
  { id: 3, sentiment: 'positive', text: "Bardzo dobre wyłączenie dla sektora Edukacji. To pozwoli nam wdrażać narzędzia AI w szkołach bez zbędnej biurokracji.", author: "Dyrektor Szkoły", sector: "Edukacja", loc: "Pomorskie" },
  { id: 4, sentiment: 'negative', text: "Krótkie vacatio legis. Potrzebujemy minimum 12 miesięcy na dostosowanie systemów.", author: "Stowarzyszenie Banków", sector: "Finanse", loc: "Warszawa" },
];

const AdminDashboard = ({ onLogout }) => {
  const [view, setView] = useState('dashboard'); 
  const [selectedProject, setSelectedProject] = useState(null);

  const handleNav = (target) => {
    setView(target);
    setSelectedProject(null);
  };

  return (
    <div className="h-screen w-screen bg-slate-950 text-slate-100 font-sans flex overflow-hidden">
      
      {/* SIDEBAR */}
      <aside className="w-72 bg-black/40 border-r border-slate-800 p-6 flex flex-col backdrop-blur-xl shrink-0 z-50">
        <div className="flex items-center gap-3 mb-10 opacity-90">
              {/* LOGO - reduced glow */}
              <img 
                  src={logo} 
                  alt="Legis Logo" 
                  className="w-10 h-10 rounded shadow-md" 
                  style={{ filter: "drop-shadow(0 0 6px rgba(255, 255, 255, 0.5))" }} 
              />
           <div>
              <p className="font-bold text-[10px] tracking-widest uppercase text-slate-500">Gov.pl</p>
              <p className="font-bold text-white tracking-tight text-lg">Legis <span className="text-indigo-500">2.0</span></p>
           </div>
        </div>
        
        <nav className="space-y-2">
           <button onClick={() => handleNav('dashboard')} className={`w-full text-left px-4 py-3 rounded-xl flex gap-3 font-medium transition-all border ${view === 'dashboard' ? 'bg-indigo-600/20 text-indigo-300 border-indigo-500/30' : 'text-slate-500 border-transparent hover:bg-slate-800 hover:text-white'}`}>
              <LayoutDashboard size={20}/> Przegląd Projektów
           </button>
           <button onClick={() => handleNav('reports')} className={`w-full text-left px-4 py-3 rounded-xl flex gap-3 font-medium transition-all border ${view === 'reports' ? 'bg-indigo-600/20 text-indigo-300 border-indigo-500/30' : 'text-slate-500 border-transparent hover:bg-slate-800 hover:text-white'}`}>
              <IconPieChart size={20}/> Raporty Zbiorcze
           </button>
           <button className="w-full text-left text-slate-500 hover:text-white hover:bg-slate-800/50 px-4 py-3 rounded-xl flex gap-3 transition-colors border border-transparent">
              <Users size={20}/> Baza Interesariuszy
           </button>
        </nav>

        <div className="mt-auto pt-6 border-t border-slate-800/50">
           <div className="flex items-center gap-3 mb-4 px-2 bg-slate-900/50 p-3 rounded-lg border border-slate-800">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <div>
                 <p className="text-[10px] text-slate-400 font-bold uppercase">System Status</p>
                 <p className="text-xs text-emerald-400 font-mono">SECURE / ENCRYPTED</p>
              </div>
           </div>
           <button onClick={onLogout} className="w-full flex items-center gap-2 text-slate-400 hover:text-white text-sm font-bold transition-colors px-2 py-2 rounded hover:bg-slate-800 cursor-pointer z-50">
              <LogOut size={16}/> Wyloguj
           </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-y-auto p-8 lg:p-12 relative">
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none"></div>

         <AnimatePresence mode="wait">
            
            {/* WIDOK 1: DASHBOARD */}
            {view === 'dashboard' && (
               <motion.div key="dashboard" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                  <header className="flex justify-between items-center mb-10">
                     <div className="flex items-center gap-4">
                                                <span className="godlo-halo inline-block">
                                                    <img src={godlo} alt="Godło" className="h-12 opacity-100 godlo-img drop-shadow-[0_0_90px_rgba(255,255,255,0.98)]" style={{ filter: "drop-shadow(0 0 90px rgba(255,255,255,0.98))" }} />
                                                </span>
                        <div>
                           <h1 className="text-3xl font-bold text-white">Aktywne Konsultacje</h1>
                           <p className="text-slate-400 text-sm">Panel Zarządzania Procesem Legislacyjnym</p>
                        </div>
                     </div>
                     <div className="bg-slate-900 border border-slate-800 px-4 py-2 rounded-lg flex gap-4 text-xs font-mono text-slate-400">
                        <span>Aktywnych: 12</span>
                        <span>oczekujące: 4</span>
                     </div>
                  </header>

                  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                     {PROJECTS.map((project) => (
                        <div key={project.id} onClick={() => { setSelectedProject(project); setView('detail'); }} className="bg-slate-900/50 border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-800/80 p-6 rounded-2xl cursor-pointer transition-all group relative overflow-hidden">
                           <div className="flex justify-between items-start mb-4">
                              <span className="bg-slate-800 text-slate-300 px-2 py-1 rounded text-[10px] font-bold border border-slate-700 font-mono">{project.id}</span>
                              <span className={`w-2 h-2 rounded-full ${project.status === 'active' ? 'bg-green-500 animate-pulse' : 'bg-slate-500'}`}></span>
                           </div>
                           <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors">{project.title}</h3>
                           <p className="text-xs text-slate-500 uppercase font-bold mb-6">{project.dept}</p>
                           <div className="grid grid-cols-3 gap-2 border-t border-slate-800 pt-4">
                              <div><p className="text-2xl font-bold text-white">{project.stats.comments}</p><p className="text-[10px] text-slate-500 uppercase">Uwag</p></div>
                              <div><p className={`text-2xl font-bold ${project.sentiment === 'negative' ? 'text-red-400' : 'text-emerald-400'}`}>{project.sentiment === 'negative' ? '65%' : '15%'}</p><p className="text-[10px] text-slate-500 uppercase">Ryzyko</p></div>
                              <div className="flex items-end justify-end"><ChevronRight className="text-slate-600 group-hover:text-indigo-400 transition-colors"/></div>
                           </div>
                        </div>
                     ))}
                  </div>
               </motion.div>
            )}

            {/* WIDOK 2: RAPORTY ZBIORCZE */}
            {view === 'reports' && (
                <motion.div key="reports" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }}>
                     <header className="flex justify-between items-center mb-10">
                        <div className="flex items-center gap-4">
                                                     <span className="godlo-halo inline-block">
                                                         <img src={godlo} alt="Godło" className="h-12 opacity-100 godlo-img drop-shadow-[0_0_90px_rgba(255,255,255,0.98)]" style={{ filter: "drop-shadow(0 0 90px rgba(255,255,255,0.98))" }} />
                                                     </span>
                            <div>
                                <h1 className="text-3xl font-bold text-white">Raporty Strategiczne</h1>
                                <p className="text-slate-400 text-sm">Analiza sentymentu i aktywności (PLLuM Core)</p>
                            </div>
                        </div>
                     </header>

                     <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                        {/* CHART 1: Area Chart */}
                        <div className="lg:col-span-2 bg-slate-900/50 p-6 rounded-2xl border border-slate-800 backdrop-blur-sm h-[350px]">
                            <h3 className="text-slate-300 font-bold mb-6 flex items-center gap-2">
                                <Activity size={18} className="text-indigo-500"/> Aktywność Obywatelska (7 dni)
                            </h3>
                            <div className="w-full h-[250px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={REPORT_ACTIVITY}>
                                        <defs>
                                            <linearGradient id="colorUwagi" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                                                <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                                            </linearGradient>
                                            <linearGradient id="colorRyzyka" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                                                <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                                        <XAxis dataKey="name" stroke="#64748b" />
                                        <YAxis stroke="#64748b" />
                                        <Tooltip contentStyle={{backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#fff'}} itemStyle={{color: '#fff'}} />
                                        <Area type="monotone" dataKey="uwagi" stroke="#6366f1" fillOpacity={1} fill="url(#colorUwagi)" />
                                        <Area type="monotone" dataKey="ryzyka" stroke="#ef4444" fillOpacity={1} fill="url(#colorRyzyka)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* CHART 2: PIE CHART (POWRÓT DO PIERWOTNEJ WERSJI, BO LEPSZA) */}
                        <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 backdrop-blur-sm h-[350px] flex flex-col">
                            <h3 className="text-slate-300 font-bold mb-2 flex items-center gap-2">
                                <IconPieChart size={18} className="text-emerald-500"/> Sentyment Ogólny
                            </h3>
                            <div className="flex-1 relative w-full h-[250px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={REPORT_SENTIMENT}
                                            innerRadius={60}
                                            outerRadius={80}
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            {REPORT_SENTIMENT.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                                            ))}
                                        </Pie>
                                        <Tooltip contentStyle={{backgroundColor: '#0f172a', borderColor: '#1e293b'}} />
                                    </PieChart>
                                </ResponsiveContainer>
                                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                    <span className="text-3xl font-bold text-white">4.2k</span>
                                    <span className="text-xs text-slate-500 uppercase">Opinii</span>
                                </div>
                            </div>
                            <div className="flex justify-center gap-4 text-[10px] text-slate-400 mt-2">
                                <span className="flex items-center gap-1"><div className="w-2 h-2 bg-emerald-500 rounded-full"></div>Poz.</span>
                                <span className="flex items-center gap-1"><div className="w-2 h-2 bg-slate-500 rounded-full"></div>Neu.</span>
                                <span className="flex items-center gap-1"><div className="w-2 h-2 bg-red-500 rounded-full"></div>Ryz.</span>
                            </div>
                        </div>
                     </div>
                     
                     {/* SEKCJA TEMATÓW - Z MINI WYKRESAMI KOŁOWYMI (DONUT PER TEMAT) */}
                     <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 backdrop-blur-sm">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-slate-300 font-bold flex items-center gap-2">
                                <TrendingUp size={18} className="text-blue-500"/> Trendy Tematyczne (PLLuM Topic Modelling)
                            </h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {TOPICS.map((topic) => (
                                <div key={topic.id} className={`p-5 rounded-xl border transition-all flex flex-col ${topic.isCritical ? 'bg-rose-950/20 border-rose-900/50' : 'bg-slate-900 border-slate-800'}`}>
                                    
                                    {/* Nagłówek */}
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <p className="text-xs text-slate-500 uppercase font-bold mb-1">Temat #{topic.id}</p>
                                            <p className="text-sm font-bold text-white truncate w-32" title={topic.title}>{topic.title}</p>
                                        </div>
                                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${topic.trend.startsWith('+') ? 'bg-slate-800 text-green-400' : 'bg-slate-800 text-slate-400'}`}>
                                            {topic.trend}
                                        </span>
                                    </div>
                                    
                                    {/* ŚRODEK: MINI DONUT CHART */}
                                    <div className="flex items-center gap-4 mb-4">
                                        <TopicDonut 
                                            pos={topic.sentiment.pos} 
                                            neu={topic.sentiment.neu} 
                                            neg={topic.sentiment.neg} 
                                        />
                                        <div className="flex flex-col gap-1">
                                            <div className="flex items-center gap-2 text-[10px] text-slate-400">
                                                <div className="w-2 h-2 rounded-full bg-emerald-500"></div> Poz: {topic.sentiment.pos}%
                                            </div>
                                            <div className="flex items-center gap-2 text-[10px] text-slate-400">
                                                <div className="w-2 h-2 rounded-full bg-slate-500"></div> Neu: {topic.sentiment.neu}%
                                            </div>
                                            <div className="flex items-center gap-2 text-[10px] text-slate-400">
                                                <div className="w-2 h-2 rounded-full bg-rose-500"></div> Neg: {topic.sentiment.neg}%
                                            </div>
                                        </div>
                                    </div>

                                    {/* Opis na dole */}
                                    <div className="mt-auto pt-3 border-t border-slate-800/50 flex items-start gap-1.5">
                                        <Info size={12} className="text-slate-500 mt-0.5 shrink-0"/>
                                        <p className="text-[10px] text-slate-400 leading-tight">
                                            {topic.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                     </div>
                </motion.div>
            )}

            {/* WIDOK 3: SZCZEGÓŁY PROJEKTU */}
            {view === 'detail' && selectedProject && (
               <motion.div key="detail" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <button onClick={() => { setSelectedProject(null); setView('dashboard'); }} className="flex items-center gap-2 text-slate-400 hover:text-white mb-6 text-sm font-bold transition-colors">
                     <ArrowLeft size={16}/> Powrót do listy
                  </button>
                  <header className="flex justify-between items-end mb-8">
                     <div className="flex items-start gap-4">
                                                <span className="godlo-halo inline-block">
                                                    <img src={godlo} alt="Godło" className="h-14 opacity-100 godlo-img drop-shadow-[0_0_110px_rgba(255,255,255,0.99)]" style={{ filter: "drop-shadow(0 0 110px rgba(255,255,255,0.99))" }} />
                                                </span>
                        <div>
                           <h1 className="text-3xl font-bold text-white">{selectedProject.title}</h1>
                           <div className="flex items-center gap-3 mt-2">
                              <span className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-1 rounded text-xs font-bold uppercase gap-2 flex items-center"><Cpu size={12}/> PLLuM Engine: Active</span>
                              <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-1 rounded text-xs font-bold uppercase gap-2 flex items-center"><Lock size={12}/> RODO Compliant</span>
                           </div>
                        </div>
                     </div>
                  </header>
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2 relative z-10"><VenetianMask size={24} className="text-indigo-500"/> Zanonimizowany Strumień Uwag (PLLuM Live Feed)</h3>
                  <div className="space-y-4 relative z-10 pb-10">
                     {FEEDBACK_DATA.map((item, i) => (
                        <div key={item.id} className="bg-slate-900/80 p-6 rounded-xl border border-slate-800 hover:border-indigo-500/30 transition-all">
                           <div className="flex justify-between items-start mb-2">
                              <div className="flex items-center gap-2"><p className="text-sm font-bold text-indigo-300">{item.author}</p><span className="text-[10px] bg-slate-800 text-slate-500 px-1 rounded flex items-center gap-1"><CheckCircle size={10}/> ID: {2390 + i}</span></div>
                              <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase border ${item.sentiment === 'negative' ? 'text-red-400 border-red-500/20' : item.sentiment === 'positive' ? 'text-green-400 border-green-500/20' : 'text-slate-400 border-slate-500/20'}`}>{item.sentiment}</span>
                           </div>
                           <p className="text-slate-300 text-sm opacity-90 leading-relaxed">"{item.text}"</p>
                           <div className="mt-3 pt-3 border-t border-slate-800/50 flex gap-4 text-[10px] text-slate-500 font-mono"><span>SEKTOR: {item.sector.toUpperCase()}</span><span>LOKALIZACJA: {item.loc.toUpperCase()}</span></div>
                        </div>
                     ))}
                  </div>
               </motion.div>
            )}
         </AnimatePresence>
      </main>
    </div>
  );
};

export default AdminDashboard;