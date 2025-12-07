import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// 1. IMPORTY IKON (Zmień nazwę PieChart na IconPieChart, żeby nie gryzła się z wykresem)
import { 
  LayoutDashboard, Users, PieChart as IconPieChart, LogOut, Shield, 
  CheckCircle, VenetianMask, Lock, Activity, ArrowLeft, ChevronRight, 
  AlertTriangle, TrendingUp 
} from 'lucide-react';

// 2. IMPORTY WYKRESÓW (Recharts)
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell // Tu używamy oryginalnej nazwy PieChart z Recharts
} from 'recharts';

import logo from '../assets/logo.png';
import godlo from '../assets/godlo.png';

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

// Dane do wykresów
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

const FEEDBACK_DATA = [
  { id: 1, sentiment: 'negative', text: "Wprowadzenie obowiązkowych audytów zabije innowacyjność.", author: "Przedsiębiorca", sector: "IT", loc: "Mazowieckie" },
  { id: 2, sentiment: 'neutral', text: "Art. 15 jest niejasny. Czy to dotyczy startupów?", author: "Prawnik", sector: "Doradztwo", loc: "Małopolskie" },
  { id: 3, sentiment: 'positive', text: "Dobre wyłączenie dla sektora Edukacji.", author: "NGO", sector: "Edukacja", loc: "Pomorskie" },
];

const AdminDashboard = ({ onLogout }) => {
  const [view, setView] = useState('dashboard'); // 'dashboard' | 'reports' | 'detail'
  const [selectedProject, setSelectedProject] = useState(null);

  // Funkcja nawigacji
  const handleNav = (target) => {
    setView(target);
    setSelectedProject(null);
  };

  return (
    <div className="h-screen w-screen bg-slate-950 text-slate-100 font-sans flex overflow-hidden">
      
      {/* --- SIDEBAR --- */}
      {/* ZMIANA: Dodano z-50, aby sidebar był zawsze na wierzchu i przyciski działały */}
      <aside className="w-72 bg-black/40 border-r border-slate-800 p-6 flex flex-col backdrop-blur-xl shrink-0 z-50">
        <div className="flex items-center gap-3 mb-10 opacity-90">
           <img src={logo} alt="Legis Logo" className="w-10 h-10 rounded shadow-lg shadow-indigo-500/20" />
           <div>
              <p className="font-bold text-[10px] tracking-widest uppercase text-slate-500">Gov.pl</p>
              <p className="font-bold text-white tracking-tight text-lg">Legislator <span className="text-indigo-500">Pro</span></p>
           </div>
        </div>
        
        <nav className="space-y-2">
           <button 
              onClick={() => handleNav('dashboard')}
              className={`w-full text-left px-4 py-3 rounded-xl flex gap-3 font-medium transition-all border ${view === 'dashboard' ? 'bg-indigo-600/20 text-indigo-300 border-indigo-500/30' : 'text-slate-500 border-transparent hover:bg-slate-800 hover:text-white'}`}
           >
              <LayoutDashboard size={20}/> Przegląd Projektów
           </button>
           
           <button 
              onClick={() => handleNav('reports')}
              className={`w-full text-left px-4 py-3 rounded-xl flex gap-3 font-medium transition-all border ${view === 'reports' ? 'bg-indigo-600/20 text-indigo-300 border-indigo-500/30' : 'text-slate-500 border-transparent hover:bg-slate-800 hover:text-white'}`}
           >
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
           
           {/* PRZYCISK WYLOGUJ */}
           <button 
             onClick={onLogout} 
             className="w-full flex items-center gap-2 text-slate-400 hover:text-white text-sm font-bold transition-colors px-2 py-2 rounded hover:bg-slate-800 cursor-pointer z-50"
           >
              <LogOut size={16}/> Wyloguj
           </button>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 overflow-y-auto p-8 lg:p-12 relative">
         {/* Tło (Noise) - pointer-events-none jest kluczowe, żeby nie blokowało kliknięć */}
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none"></div>

         <AnimatePresence mode="wait">
            
            {/* WIDOK 1: DASHBOARD */}
            {view === 'dashboard' && (
               <motion.div 
                  key="dashboard"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
               >
                  <header className="flex justify-between items-center mb-10">
                     <div className="flex items-center gap-4">
                        {/* Godło z cieniem (glow) */}
                        <img 
                           src={godlo} 
                           alt="Godło" 
                           className="h-12 opacity-100 drop-shadow-[0_0_20px_rgba(255,255,255,0.5)]" 
                        />
                        <div>
                           <h1 className="text-3xl font-bold text-white">Aktywne Konsultacje</h1>
                           <p className="text-slate-400 text-sm">Panel Zarządzania Procesem Legislacyjnym</p>
                        </div>
                     </div>
                     <div className="bg-slate-900 border border-slate-800 px-4 py-2 rounded-lg flex gap-4 text-xs font-mono text-slate-400">
                        <span>ACTIVE: 12</span>
                        <span>PENDING: 4</span>
                     </div>
                  </header>

                  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                     {PROJECTS.map((project) => (
                        <div 
                           key={project.id}
                           onClick={() => { setSelectedProject(project); setView('detail'); }}
                           className="bg-slate-900/50 border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-800/80 p-6 rounded-2xl cursor-pointer transition-all group relative overflow-hidden"
                        >
                           <div className="flex justify-between items-start mb-4">
                              <span className="bg-slate-800 text-slate-300 px-2 py-1 rounded text-[10px] font-bold border border-slate-700 font-mono">
                                 {project.id}
                              </span>
                              <span className={`w-2 h-2 rounded-full ${project.status === 'active' ? 'bg-green-500 animate-pulse' : 'bg-slate-500'}`}></span>
                           </div>
                           <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors">
                              {project.title}
                           </h3>
                           <p className="text-xs text-slate-500 uppercase font-bold mb-6">{project.dept}</p>

                           <div className="grid grid-cols-3 gap-2 border-t border-slate-800 pt-4">
                              <div>
                                 <p className="text-2xl font-bold text-white">{project.stats.comments}</p>
                                 <p className="text-[10px] text-slate-500 uppercase">Uwag</p>
                              </div>
                              <div>
                                 <p className={`text-2xl font-bold ${project.sentiment === 'negative' ? 'text-red-400' : 'text-emerald-400'}`}>
                                    {project.sentiment === 'negative' ? '65%' : '15%'}
                                 </p>
                                 <p className="text-[10px] text-slate-500 uppercase">Ryzyko</p>
                              </div>
                              <div className="flex items-end justify-end">
                                 <ChevronRight className="text-slate-600 group-hover:text-indigo-400 transition-colors"/>
                              </div>
                           </div>
                        </div>
                     ))}
                  </div>
               </motion.div>
            )}

            {/* WIDOK 2: RAPORTY ZBIORCZE (FIXED RECHARTS) */}
            {view === 'reports' && (
                <motion.div 
                    key="reports"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                >
                     <header className="flex justify-between items-center mb-10">
                        <div className="flex items-center gap-4">
                           <img 
                              src={godlo} 
                              alt="Godło" 
                              className="h-12 opacity-100 drop-shadow-[0_0_20px_rgba(255,255,255,0.5)]" 
                           />
                            <div>
                                <h1 className="text-3xl font-bold text-white">Raporty Strategiczne</h1>
                                <p className="text-slate-400 text-sm">Analiza sentymentu i aktywności (Q4 2025)</p>
                            </div>
                        </div>
                     </header>

                     <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                        
                        {/* CHART 1: Area Chart */}
                        <div className="lg:col-span-2 bg-slate-900/50 p-6 rounded-2xl border border-slate-800 backdrop-blur-sm h-[350px]">
                            <h3 className="text-slate-300 font-bold mb-6 flex items-center gap-2">
                                <Activity size={18} className="text-indigo-500"/> Aktywność Obywatelska (7 dni)
                            </h3>
                            {/* WAŻNE: ResponsiveContainer musi mieć zdefiniowaną wysokość w rodzicu */}
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
                                        <Tooltip 
                                            contentStyle={{backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#fff'}} 
                                            itemStyle={{color: '#fff'}}
                                        />
                                        <Area type="monotone" dataKey="uwagi" stroke="#6366f1" fillOpacity={1} fill="url(#colorUwagi)" />
                                        <Area type="monotone" dataKey="ryzyka" stroke="#ef4444" fillOpacity={1} fill="url(#colorRyzyka)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* CHART 2: Pie Chart */}
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
                            {/* Legenda pod wykresem kołowym */}
                            <div className="flex justify-center gap-4 text-[10px] text-slate-400 mt-2">
                                <span className="flex items-center gap-1"><div className="w-2 h-2 bg-emerald-500 rounded-full"></div>Poz.</span>
                                <span className="flex items-center gap-1"><div className="w-2 h-2 bg-slate-500 rounded-full"></div>Neu.</span>
                                <span className="flex items-center gap-1"><div className="w-2 h-2 bg-red-500 rounded-full"></div>Ryz.</span>
                            </div>
                        </div>

                     </div>
                     
                     {/* Topic Modeling - Bar Chart symulowany */}
                     <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 backdrop-blur-sm">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-slate-300 font-bold flex items-center gap-2">
                                <TrendingUp size={18} className="text-blue-500"/> Trendy Tematyczne (AI Topic Modelling)
                            </h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {[
                                {label: "Koszty Pracodawcy", count: 1240, color: "bg-red-500"},
                                {label: "Ochrona Danych (RODO)", count: 980, color: "bg-blue-500"},
                                {label: "Ekologia / OZE", count: 850, color: "bg-green-500"},
                                {label: "Cyfryzacja Urzędów", count: 620, color: "bg-purple-500"},
                            ].map((topic, idx) => (
                                <div key={idx} className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                                    <p className="text-xs text-slate-500 uppercase font-bold mb-1">Temat #{idx+1}</p>
                                    <p className="text-lg font-bold text-white mb-2">{topic.label}</p>
                                    <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                                        <div className={`h-full ${topic.color}`} style={{width: `${(topic.count/1500)*100}%`}}></div>
                                    </div>
                                    <p className="text-right text-xs text-slate-400 mt-1">{topic.count} wzmianek</p>
                                </div>
                            ))}
                        </div>
                     </div>

                </motion.div>
            )}

            {/* WIDOK 3: SZCZEGÓŁY PROJEKTU */}
            {view === 'detail' && selectedProject && (
               <motion.div 
                  key="detail"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
               >
                  <button 
                     onClick={() => { setSelectedProject(null); setView('dashboard'); }}
                     className="flex items-center gap-2 text-slate-400 hover:text-white mb-6 text-sm font-bold transition-colors"
                  >
                     <ArrowLeft size={16}/> Powrót do listy
                  </button>

                  <header className="flex justify-between items-end mb-8">
                     <div className="flex items-start gap-4">
                        <img src={godlo} alt="Godło" className="h-14 opacity-100 drop-shadow-[0_0_20px_rgba(255,255,255,0.5)]" />
                        <div>
                           <h1 className="text-3xl font-bold text-white">{selectedProject.title}</h1>
                           <div className="flex items-center gap-3 mt-2">
                              <span className="bg-green-500/10 text-green-400 border border-green-500/20 px-2 py-1 rounded text-xs font-bold uppercase gap-2 flex items-center">
                                 <Shield size={12}/> Presidio: Active
                              </span>
                              <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-1 rounded text-xs font-bold uppercase gap-2 flex items-center">
                                 <Lock size={12}/> RODO
                              </span>
                           </div>
                        </div>
                     </div>
                  </header>

                  <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2 relative z-10">
                     <VenetianMask size={24} className="text-indigo-500"/>
                     Zanonimizowany Strumień Uwag (Live)
                  </h3>
                  
                  <div className="space-y-4 relative z-10 pb-10">
                     {FEEDBACK_DATA.map((item, i) => (
                        <div key={item.id} className="bg-slate-900/80 p-6 rounded-xl border border-slate-800 hover:border-indigo-500/30 transition-all">
                           <div className="flex justify-between items-start mb-2">
                              <div className="flex items-center gap-2">
                                 <p className="text-sm font-bold text-indigo-300">{item.author}</p>
                                 <span className="text-[10px] bg-slate-800 text-slate-500 px-1 rounded">ID: {2390 + i}</span>
                              </div>
                              <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase border ${
                                 item.sentiment === 'negative' ? 'text-red-400 border-red-500/20' : 
                                 item.sentiment === 'positive' ? 'text-green-400 border-green-500/20' : 
                                 'text-slate-400 border-slate-500/20'
                              }`}>
                                 {item.sentiment}
                              </span>
                           </div>
                           <p className="text-slate-300 text-sm opacity-90">"{item.text}"</p>
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