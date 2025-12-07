import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, ArrowLeft, Send, ShieldAlert, X,
  Bell, LayoutDashboard, FileBarChart, Lock, User, LogOut, Bird,
  Network, Zap, AlertTriangle, CheckCircle2, Server, Accessibility, 
  Type, Sun, Moon, Check
} from 'lucide-react';
import { Badge, HorizontalTrain } from './Shared';
import logo from '../assets/logo.png';

// --- DATA: SYMULACJA DANYCH Z GRAFU WIEDZY (NEO4J) ---
const GRAPH_NODES = [
  { id: 'core', x: 150, y: 100, label: 'USTAWA AI', type: 'root', r: 35 },
  { id: 'msp', x: 60, y: 60, label: 'MŚP', type: 'benefit', r: 25, impact: "Pozytywny", desc: "Wyłączenie z drogich audytów dla firm < 250 pracowników (Art. 15)." },
  { id: 'rodo', x: 240, y: 60, label: 'RODO', type: 'conflict', r: 25, impact: "Konflikt", desc: "Art. 4 ustawy stoi w sprzeczności z zasadą minimalizacji danych (Art. 5 RODO)." },
  { id: 'budget', x: 60, y: 140, label: 'KOSZTY', type: 'cost', r: 25, impact: "Wysoki", desc: "Szacowany koszt wdrożenia dla administracji: 200 mln PLN." },
  { id: 'innov', x: 240, y: 140, label: 'INNOWACJE', type: 'neutral', r: 25, impact: "Neutralny", desc: "Brak bezpośredniego wpływu na sandboxy regulacyjne." },
];

// --- KOMPONENT: WIZUALIZACJA GRAFU ---
const ImpactGraphViz = ({ activeNode, onNodeClick }) => {
  return (
    <div className="w-full h-full relative select-none">
      <svg className="w-full h-full" viewBox="0 0 300 200">
        <defs>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        {GRAPH_NODES.slice(1).map((node, i) => (
          <motion.path
            key={`edge-${i}`}
            d={`M 150 100 L ${node.x} ${node.y}`}
            stroke={node.type === 'conflict' ? '#f87171' : '#cbd5e1'}
            strokeWidth="2"
            strokeDasharray={node.type === 'neutral' ? "4 4" : "0"}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1, delay: i * 0.2 }}
          />
        ))}
        {GRAPH_NODES.map((node, i) => {
          const isActive = activeNode?.id === node.id;
          let fill = "#3b82f6"; 
          if (node.type === 'benefit') fill = "#10b981"; 
          if (node.type === 'conflict') fill = "#ef4444"; 
          if (node.type === 'cost') fill = "#f59e0b"; 
          if (node.type === 'root') fill = "#1e293b"; 

          return (
            <motion.g 
              key={node.id} 
              onClick={() => onNodeClick(node)}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: isActive ? 1.2 : 1, opacity: 1 }}
              whileHover={{ scale: 1.15, cursor: 'pointer' }}
              transition={{ type: "spring", stiffness: 200, delay: i * 0.1 }}
            >
              {isActive && (
                 <motion.circle 
                    cx={node.x} cy={node.y} r={node.r + 5} 
                    fill="none" stroke={fill} strokeWidth="2"
                    animate={{ r: [node.r, node.r + 15], opacity: [1, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                 />
              )}
              <circle 
                cx={node.x} cy={node.y} r={node.r} 
                fill={fill} stroke="white" strokeWidth="3" 
                filter={isActive ? "url(#glow)" : ""}
                className="shadow-xl"
              />
              <text 
                x={node.x} y={node.y + 4} 
                textAnchor="middle" 
                fill="white" 
                className="text-[10px] font-bold font-sans uppercase tracking-wider pointer-events-none"
              >
                {node.label}
              </text>
              {node.type === 'conflict' && (
                <circle cx={node.x + 12} cy={node.y - 12} r="8" fill="white" />
              )}
            </motion.g>
          );
        })}
        {GRAPH_NODES.map((node) => node.type === 'conflict' && (
           <g key={`icon-${node.id}`} transform={`translate(${node.x + 8}, ${node.y - 16})`}>
              <AlertTriangle size={12} className="text-red-600" />
           </g>
        ))}
      </svg>
    </div>
  );
};

// --- PDF OVERLAY Z ORŁEM ---
const DesktopPDFOverlay = ({ onClose }) => (
  <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="absolute inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm p-8">
     <div className="bg-white w-full max-w-4xl h-full rounded-2xl flex flex-col relative overflow-hidden shadow-2xl">
        <div className="bg-slate-800 text-white p-4 flex justify-between items-center shrink-0">
           <div className="flex items-center gap-2"><FileText size={16}/><span className="text-sm font-bold">Projekt_Ustawy_AI_v4.pdf (RCL)</span></div>
           <button onClick={onClose} className="hover:bg-slate-700 p-2 rounded-full"><X size={20}/></button>
        </div>
        <div className="flex-1 overflow-auto p-12 flex justify-center bg-slate-100">
           <div className="bg-white w-[700px] min-h-[1200px] p-16 shadow-xl text-justify relative font-serif text-slate-900">
              <div className="text-center border-b-2 border-black pb-8 mb-12">
                         <span className="godlo-halo inline-block">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Herb_Polski.svg/509px-Herb_Polski.svg.png" className="h-20 mx-auto mb-6 godlo-img drop-shadow-[0_0_90px_rgba(255,255,255,0.98)]" style={{ filter: "drop-shadow(0 0 90px rgba(255,255,255,0.98))" }} alt="Godło Polski"/>
                         </span>
                 <h1 className="text-2xl font-bold mb-2 uppercase tracking-wide">Ustawa</h1>
                 <p className="text-lg">z dnia 12 grudnia 2025 r.</p>
                 <p className="font-bold text-xl mt-4">o transparentności systemów algorytmicznych</p>
              </div>
              <div className="space-y-6 text-slate-400 blur-[0.6px] select-none">
                 <p><strong>Art. 14.</strong> Podmioty publiczne wdrażające systemy AI są obowiązane do prowadzenia rejestru ryzyk.</p>
                 <p>2. Rejestr, o którym mowa w ust. 1, podlega udostępnieniu na wniosek.</p>
              </div>
              <div className="my-12 relative">
                 <motion.div initial={{x:-20, opacity:0}} animate={{x:0, opacity:1}} transition={{ delay: 0.5 }} className="absolute -left-12 top-2 text-blue-600">
                    <ArrowLeft size={32} strokeWidth={3} />
                 </motion.div>
                 <p className="font-bold text-black mb-3 text-lg">Art. 15. Wyłączenia dla MŚP</p>
                 <motion.div 
                    initial={{backgroundColor:"rgba(255,255,0,0)"}} 
                    animate={{backgroundColor:"rgba(250,204,21,0.3)"}} 
                    transition={{delay:0.8, duration:1}} 
                    className="p-4 -mx-4 rounded border-l-4 border-blue-600 pl-6 text-black leading-relaxed"
                 >
                    <strong>1. Przepisów niniejszego rozdziału nie stosuje się do mikroprzedsiębiorców oraz małych i średnich przedsiębiorstw (MŚP)</strong>, z wyłączeniem systemów krytycznych dla bezpieczeństwa publicznego.
                 </motion.div>
              </div>
              <div className="space-y-6 text-slate-400 blur-[0.6px] select-none">
                 <p><strong>Art. 16.</strong> Kto narusza przepisy ustawy, podlega karze administracyjnej do wysokości 2% rocznego obrotu.</p>
              </div>
           </div>
        </div>
     </div>
  </motion.div>
);

const MainDashboard = ({ onBack, onLogout }) => {
   const [showDoc, setShowDoc] = useState(false);
   const [activeNode, setActiveNode] = useState(GRAPH_NODES[0]);
   const [simpleMode, setSimpleMode] = useState(true); // Suwerenny Tłumacz
   const [mode, setMode] = useState('chat'); // 'chat' | 'form'
   const [formSent, setFormSent] = useState(false); 
   
   // --- STATE DLA DOSTĘPNOŚCI (WCAG) ---
   const [showA11yMenu, setShowA11yMenu] = useState(false);
   const [fontScale, setFontScale] = useState(1); // 1, 1.1, 1.2
   const [highContrast, setHighContrast] = useState(false);

   return (
     <div 
        className={`flex h-screen w-screen bg-slate-100 font-sans overflow-hidden relative transition-all duration-300 ${highContrast ? 'contrast-125 brightness-95' : ''}`}
        style={{ zoom: fontScale }} // Skalowanie interfejsu
     >
       {/* Sidebar */}
       <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col p-4 shrink-0">
         <div className="flex items-center gap-3 px-2 mb-10"><img src={logo} alt="Logo" className="w-8 h-8 rounded" /><h1 className="text-xl font-bold text-white">Legis <span className="text-blue-500">2.0</span></h1></div>
         <nav className="space-y-2">
            <div className="bg-blue-800 text-white px-4 py-3 rounded-lg flex gap-3 font-medium"><LayoutDashboard size={20}/> Pulpit</div>
            <div className="text-slate-400 px-4 py-3 flex gap-3"><FileBarChart size={20}/> Projekty</div>
         </nav>
         <div className="mt-auto border-t border-slate-800 pt-4 flex gap-3 items-center">
            <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-white"><User/></div>
            <div><p className="text-sm font-bold text-white">Jan Nowak</p><p className="text-xs text-slate-500">B2B / IT</p></div>
         </div>
       </aside>
 
       {/* Content */}
       <main className="flex-1 flex flex-col min-w-0 relative">
          <header className="h-16 bg-white border-b border-slate-200 flex justify-between items-center px-8 shrink-0 relative z-40">
             <div onClick={onBack} className="flex items-center gap-2 cursor-pointer hover:bg-slate-100 px-2 py-1 rounded transition-colors">
                <ArrowLeft className="text-slate-500"/> <span className="font-bold text-slate-700">Powrót do strony głównej</span>
             </div>
             <div className="flex items-center gap-4 relative">
                <div className="bg-slate-100 rounded-lg p-1 flex items-center gap-1">
                   <button onClick={() => setSimpleMode(false)} className={`px-3 py-1 text-xs font-bold rounded ${!simpleMode ? 'bg-white shadow text-blue-700' : 'text-slate-500 hover:text-slate-700'}`}>Prawniczy</button>
                   <button onClick={() => setSimpleMode(true)} className={`px-3 py-1 text-xs font-bold rounded flex items-center gap-1 ${simpleMode ? 'bg-white shadow text-green-700' : 'text-slate-500 hover:text-slate-700'}`}><Zap size={10}/> Prosty</button>
                </div>
                <div className="h-6 w-px bg-slate-200 mx-2"></div>
                
                {/* --- MENU DOSTĘPNOŚCI (WCAG) --- */}
                <div className="relative">
                    <button 
                       onClick={() => setShowA11yMenu(!showA11yMenu)}
                       className={`p-2 rounded-full transition-colors ${showA11yMenu || highContrast || fontScale > 1 ? 'bg-yellow-400 text-black shadow-md' : 'text-slate-400 hover:bg-slate-100'}`}
                       title="Ułatwienia dostępu"
                    >
                       <Accessibility size={20} />
                    </button>

                    <AnimatePresence>
                        {showA11yMenu && (
                            <motion.div 
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                className="absolute right-0 top-12 w-64 bg-white rounded-xl shadow-xl border border-slate-200 p-4 z-50 origin-top-right"
                            >
                                <div className="text-xs font-bold text-slate-400 uppercase mb-3">Rozmiar Tekstu</div>
                                <div className="flex gap-2 mb-4">
                                    <button onClick={() => setFontScale(1)} className={`flex-1 py-2 rounded border font-bold text-sm ${fontScale === 1 ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-700 border-slate-200'}`}>A</button>
                                    <button onClick={() => setFontScale(1.1)} className={`flex-1 py-2 rounded border font-bold text-base ${fontScale === 1.1 ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-700 border-slate-200'}`}>A+</button>
                                    <button onClick={() => setFontScale(1.2)} className={`flex-1 py-2 rounded border font-bold text-lg ${fontScale === 1.2 ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-700 border-slate-200'}`}>A++</button>
                                </div>

                                <div className="text-xs font-bold text-slate-400 uppercase mb-3">Kontrast</div>
                                <div className="flex flex-col gap-2">
                                    <button onClick={() => setHighContrast(false)} className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${!highContrast ? 'bg-slate-100 text-slate-900 font-bold' : 'text-slate-500 hover:bg-slate-50'}`}>
                                        <Sun size={16}/> Standardowy
                                    </button>
                                    <button onClick={() => setHighContrast(true)} className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${highContrast ? 'bg-yellow-400 text-black font-bold border border-black' : 'text-slate-500 hover:bg-slate-50'}`}>
                                        <Moon size={16}/> Wysoki Kontrast
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <Badge color="red">Wysokie Ryzyko</Badge>
                <Bell className="text-slate-400"/>
                <button onClick={onLogout} className="text-slate-400 hover:text-slate-600 transition-colors" title="Wyloguj">
                   <LogOut size={20} />
                </button>
             </div>
          </header>
 
          <div className="flex-1 overflow-y-auto p-8 flex gap-6">
            <div className="flex-[2] min-w-0 flex flex-col">
               <div className="mb-6 flex items-end justify-between">
                 <div><span className="text-xs font-bold text-slate-500 uppercase mb-1">Wybrany Projekt</span><h2 className="text-3xl font-bold text-slate-800">Ustawa o transparentności AI</h2></div>
                 <div className="flex gap-2"><Badge color="blue">UD234</Badge><Badge color="yellow">Pre-konsultacje</Badge></div>
               </div>
               
               <HorizontalTrain />
 
               <div className="flex-1 grid grid-cols-2 gap-6 min-h-[400px]">
                  
                  {/* LEWA KOLUMNA: ZAŁOŻENIA / TŁUMACZ */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
                     <h4 className="font-bold text-slate-700 mb-4 flex items-center gap-2">
                        <FileText size={18} className="text-blue-500"/> 
                        {simpleMode ? "Tłumaczenie (PLLuM AI)" : "Treść legislacyjna"}
                     </h4>
                     
                     <AnimatePresence mode="wait">
                        <motion.div 
                           key={simpleMode ? 'simple' : 'legal'}
                           initial={{ opacity: 0, y: 5 }}
                           animate={{ opacity: 1, y: 0 }}
                           exit={{ opacity: 0, y: -5 }}
                           className="flex-1"
                        >
                           {simpleMode ? (
                              <div className="space-y-4">
                                 <p className="text-sm text-slate-700 leading-relaxed font-medium">
                                    Projekt zmusza duże firmy do sprawdzania, czy ich AI jest bezpieczne. 
                                    <span className="bg-green-100 text-green-800 px-1 rounded ml-1 font-bold">Dobra wiadomość:</span>
                                    Jako mała firma (B2B), prawdopodobnie nie będziesz musiał robić drogich audytów, chyba że twoje oprogramowanie steruje np. ruchem ulicznym.
                                 </p>
                                 <div className="bg-blue-50 p-3 rounded-lg border border-blue-100 text-xs text-blue-800">
                                    <strong>Termin uwag:</strong> 12 grudnia. Warto potwierdzić, czy Twoje usługi nie są "krytyczne".
                                 </div>
                              </div>
                           ) : (
                              <div className="space-y-4 text-sm font-serif text-slate-600 bg-slate-50 p-4 rounded border border-slate-200 italic">
                                 <p>"Art 14. Podmioty (...) wdrażające systemy wysokiego ryzyka (...) zobowiązane są do przeprowadzenia oceny zgodności."</p>
                                 <p>"Art 15. Wyłączenie podmiotowe obejmuje MŚP w rozumieniu załącznika I do rozporządzenia Komisji (UE) nr 651/2014 (...)."</p>
                              </div>
                           )}
                        </motion.div>
                     </AnimatePresence>
                  </div>

                  {/* PRAWA KOLUMNA: IMPACT GRAPH */}
                  <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col relative overflow-hidden">
                     <div className="p-4 border-b border-slate-100 flex justify-between items-center z-10 bg-white/90 backdrop-blur-sm">
                        <h4 className="font-bold text-slate-700 flex items-center gap-2">
                           <Network size={18} className="text-blue-600"/> Analiza Wpływu (Graf)
                        </h4>
                        <div className="text-[10px] bg-slate-100 px-2 py-1 rounded text-slate-500 border border-slate-200 font-bold">Powered by Neo4j</div>
                     </div>
                     <div className="flex-1 relative bg-slate-50">
                        <ImpactGraphViz activeNode={activeNode} onNodeClick={setActiveNode} />
                        <AnimatePresence>
                           {activeNode && activeNode.id !== 'core' && (
                              <motion.div 
                                 initial={{ y: 100, opacity: 0 }}
                                 animate={{ y: 0, opacity: 1 }}
                                 exit={{ y: 100, opacity: 0 }}
                                 className="absolute bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md p-4 border-t border-slate-200 shadow-[0_-5px_20px_-5px_rgba(0,0,0,0.1)]"
                              >
                                 <div className="flex justify-between items-start mb-1">
                                    <span className={`text-xs font-bold uppercase px-2 py-0.5 rounded ${
                                       activeNode.type === 'conflict' ? 'bg-red-100 text-red-700 border border-red-200' : 
                                       activeNode.type === 'benefit' ? 'bg-green-100 text-green-700 border border-green-200' : 
                                       activeNode.type === 'cost' ? 'bg-orange-100 text-orange-800 border border-orange-200' : 'bg-slate-200 text-slate-600'
                                    }`}>
                                       {activeNode.impact}
                                    </span>
                                    <button onClick={() => setActiveNode(GRAPH_NODES[0])} className="text-slate-400 hover:text-slate-800"><X size={14}/></button>
                                 </div>
                                 <p className="text-sm font-bold text-slate-800 mb-1">{activeNode.label}</p>
                                 <p className="text-xs text-slate-600 leading-relaxed">{activeNode.desc}</p>
                              </motion.div>
                           )}
                        </AnimatePresence>
                     </div>
                  </div>
               </div>
            </div>
 
            {/* PANEL BOCZNY (INTERAKCJA) */}
            <div className="w-80 bg-white border-l border-slate-200 shadow-xl flex flex-col shrink-0 rounded-2xl overflow-hidden h-full z-20">
               
               {/* Nagłówek panelu */}
               <div className="p-4 border-b border-slate-100 bg-slate-50 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                     <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 border border-slate-200 rounded-full flex items-center justify-center shadow-sm transition-colors ${mode === 'chat' ? 'bg-white text-blue-600' : 'bg-slate-200 text-slate-500'}`}>
                           <Bird size={20} />
                        </div>
                        <div>
                           <h3 className="font-bold text-slate-800 text-sm">Centrum Dialogu</h3>
                           <div className="flex items-center gap-1 text-[10px] text-green-600 font-bold uppercase">
                              <Lock size={8} /> On-Premise
                           </div>
                        </div>
                     </div>
                  </div>

                  {/* Przełącznik trybów */}
                  <div className="bg-slate-200/50 p-1 rounded-lg flex relative">
                     <motion.div 
                        layoutId="activeTab"
                        className="absolute bg-white shadow-sm rounded-md h-[calc(100%-8px)] top-1"
                        initial={false}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        style={{ width: "50%", left: mode === 'chat' ? "4px" : "50%" }}
                     />
                     <button onClick={() => { setMode('chat'); setFormSent(false); }} className={`flex-1 flex items-center justify-center gap-2 text-xs font-bold py-1.5 relative z-10 transition-colors ${mode === 'chat' ? 'text-blue-700' : 'text-slate-500 hover:text-slate-700'}`}>
                        <Bird size={14}/> PLLuM AI
                     </button>
                     <button onClick={() => { setMode('form'); }} className={`flex-1 flex items-center justify-center gap-2 text-xs font-bold py-1.5 relative z-10 transition-colors ${mode === 'form' ? 'text-blue-700' : 'text-slate-500 hover:text-slate-700'}`}>
                        <Send size={14}/> Zgłoś Uwagę
                     </button>
                  </div>
               </div>

               {/* Treść panelu */}
               <div className="flex-1 overflow-y-auto bg-white relative">
                  <AnimatePresence mode="wait">
                     
                     {mode === 'chat' ? (
                        <motion.div key="chat-view" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="p-4 space-y-4 h-full flex flex-col">
                           <div className="flex justify-start">
                              <div className="bg-blue-50 border border-blue-100 p-4 rounded-2xl text-sm text-slate-700 w-full shadow-sm">
                                 <p className="mb-2 font-bold text-blue-800 flex items-center gap-2"><ShieldAlert size={14}/> Analiza Ryzyka</p>
                                 <p className="mb-3 leading-relaxed">Wykryłem konflikt z RODO (zobacz Graf). Czy chcesz zgłosić uwagę w tej sprawie?</p>
                                 <button onClick={() => setMode('form')} className="w-full bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-sm text-xs font-bold">Przejdź do formularza</button>
                              </div>
                           </div>
                           <div className="flex-1"></div>
                        </motion.div>
                     ) : (
                        <motion.div key="form-view" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="p-4 space-y-4 h-full flex flex-col">
                           {formSent ? (
                              <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="flex-1 flex flex-col items-center justify-center text-center p-4 space-y-4">
                                 <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-2"><CheckCircle2 size={40} /></div>
                                 <h3 className="text-xl font-bold text-slate-800">Wysłano pomyślnie!</h3>
                                 <p className="text-sm text-slate-500">Twoja uwaga została zabezpieczona i przekazana do Rządowego Centrum Legislacji (RCL).</p>
                                 <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs text-slate-600 mt-4 w-full text-left">
                                    <div><strong>ID:</strong> #REQ-2025-8821</div>
                                    <div className="text-slate-400 mt-1">Status: Oczekuje na weryfikację</div>
                                 </div>
                                 <button onClick={() => { setFormSent(false); setMode('chat'); }} className="text-blue-600 text-sm font-bold hover:underline mt-4">Wróć do asystenta</button>
                              </motion.div>
                           ) : (
                              <>
                                 <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 shrink-0">
                                    <div className="flex items-center gap-2 mb-2">
                                       <div className="relative"><div className="w-2 h-2 bg-green-500 rounded-full animate-pulse absolute top-0 right-0"></div><Server size={16} className="text-slate-600"/></div>
                                       <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Status Połączenia</span>
                                    </div>
                                    <div className="flex items-center justify-between bg-white border border-slate-200 rounded px-2 py-1.5">
                                       <span className="text-xs font-mono text-slate-600 truncate">api.gov.pl/internal/node_24b</span>
                                       <Badge color="green">Secure</Badge>
                                    </div>
                                 </div>
                                 <div className="space-y-3 flex-1 overflow-auto">
                                    <div><label className="text-xs font-bold text-slate-700 uppercase block mb-1">Rodzaj uwagi</label><select className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 outline-none"><option>Sprzeczność z prawem (RODO)</option><option>Koszty dla MŚP</option></select></div>
                                    <div><label className="text-xs font-bold text-slate-700 uppercase block mb-1">Treść uwagi</label><textarea className="w-full h-32 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 outline-none resize-none" defaultValue="Art. 4 ustawy stoi w sprzeczności z zasadą minimalizacji danych (Art. 5 RODO). Proponuję zmianę brzmienia na..."></textarea></div>
                                    <div className="bg-yellow-50 border border-yellow-100 p-3 rounded-lg flex gap-3 items-start"><div className="mt-0.5"><Bird size={16} className="text-yellow-600"/></div><div><p className="text-xs font-bold text-yellow-700 mb-0.5">Sugestia PLLuM</p><p className="text-[10px] text-yellow-800 leading-tight">Twoja uwaga jest merytoryczna. Dodaj szacowany koszt audytu.</p></div></div>
                                 </div>
                              </>
                           )}
                        </motion.div>
                     )}
                  </AnimatePresence>
               </div>
               <div className="p-4 border-t border-slate-100 bg-slate-50 relative shrink-0">
                  {mode === 'chat' ? (
                     <>
                        <input type="text" placeholder="Dopytaj o RODO..." className="w-full bg-white border border-slate-200 rounded-xl pl-4 pr-10 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none shadow-sm transition-all" />
                        <button className="absolute right-6 top-6 p-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-md transition-all hover:scale-105"><Send size={14}/></button>
                     </>
                  ) : (
                     !formSent && <button onClick={() => setFormSent(true)} className="w-full bg-green-600 text-white font-bold py-3 rounded-xl shadow-lg shadow-green-200 hover:bg-green-700 transition-all flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95"><Send size={16}/> Wyślij do RCL (Podpis Zaufany)</button>
                  )}
               </div>
            </div>
          </div>
          <AnimatePresence>{showDoc && <DesktopPDFOverlay onClose={() => setShowDoc(false)} />}</AnimatePresence>
       </main>
     </div>
   );
};

export default MainDashboard;