import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, ArrowLeft, Send, ShieldAlert, X,
  Bell, LayoutDashboard, FileBarChart, Lock, User, LogOut, Bird,
  Network, Zap, AlertTriangle, CheckCircle2, TrendingUp, RefreshCw
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

        {/* Krawędzie (Edges) */}
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

        {/* Węzły (Nodes) */}
        {GRAPH_NODES.map((node, i) => {
          const isActive = activeNode?.id === node.id;
          let fill = "#3b82f6"; // Default Blue
          if (node.type === 'benefit') fill = "#10b981"; // Green
          if (node.type === 'conflict') fill = "#ef4444"; // Red
          if (node.type === 'cost') fill = "#f59e0b"; // Orange
          if (node.type === 'root') fill = "#1e293b"; // Dark

          return (
            <motion.g 
              key={node.id} 
              onClick={() => onNodeClick(node)}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: isActive ? 1.2 : 1, opacity: 1 }}
              whileHover={{ scale: 1.15, cursor: 'pointer' }}
              transition={{ type: "spring", stiffness: 200, delay: i * 0.1 }}
            >
              {/* Pulsowanie dla aktywnego węzła */}
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
              
              {/* Ikonka statusu */}
              {node.type === 'conflict' && (
                <circle cx={node.x + 12} cy={node.y - 12} r="8" fill="white" />
              )}
            </motion.g>
          );
        })}
        
        {/* Ikonki alertów na wierzchu */}
        {GRAPH_NODES.map((node) => node.type === 'conflict' && (
           <g key={`icon-${node.id}`} transform={`translate(${node.x + 8}, ${node.y - 16})`}>
              <AlertTriangle size={12} className="text-red-600" />
           </g>
        ))}
      </svg>
    </div>
  );
};

// --- PDF OVERLAY Z ORŁEM (Bez zmian) ---
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
                 <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Herb_Polski.svg/509px-Herb_Polski.svg.png" className="h-20 mx-auto mb-6" alt="Godło Polski"/>
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
   
   return (
     <div className="flex h-screen w-screen bg-slate-100 font-sans overflow-hidden relative">
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
          <header className="h-16 bg-white border-b border-slate-200 flex justify-between items-center px-8 shrink-0">
             <div onClick={onBack} className="flex items-center gap-2 cursor-pointer hover:bg-slate-100 px-2 py-1 rounded transition-colors">
                <ArrowLeft className="text-slate-500"/> <span className="font-bold text-slate-700">Powrót do strony głównej</span>
             </div>
             <div className="flex items-center gap-4">
                <div className="bg-slate-100 rounded-lg p-1 flex items-center gap-1">
                   <button onClick={() => setSimpleMode(false)} className={`px-3 py-1 text-xs font-bold rounded ${!simpleMode ? 'bg-white shadow text-blue-700' : 'text-slate-500 hover:text-slate-700'}`}>Prawniczy</button>
                   <button onClick={() => setSimpleMode(true)} className={`px-3 py-1 text-xs font-bold rounded flex items-center gap-1 ${simpleMode ? 'bg-white shadow text-green-700' : 'text-slate-500 hover:text-slate-700'}`}><Zap size={10}/> Prosty</button>
                </div>
                <div className="h-6 w-px bg-slate-200 mx-2"></div>
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
                        {simpleMode ? "Tłumaczenie (Bielik AI)" : "Treść legislacyjna"}
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

                  {/* PRAWA KOLUMNA: IMPACT GRAPH (NEO4J) - WERSJA JASNA (LIGHT MODE) */}
<div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col relative overflow-hidden">
   {/* Header jasny */}
   <div className="p-4 border-b border-slate-100 flex justify-between items-center z-10 bg-white/90 backdrop-blur-sm">
      <h4 className="font-bold text-slate-700 flex items-center gap-2">
         <Network size={18} className="text-blue-600"/> Analiza Wpływu (Graf)
      </h4>
      <div className="text-[10px] bg-slate-100 px-2 py-1 rounded text-slate-500 border border-slate-200 font-bold">Powered by Neo4j</div>
   </div>
   
   {/* Tło jasne (slate-50 zamiast gradientu) */}
   <div className="flex-1 relative bg-slate-50">
      {/* THE GRAPH */}
      <ImpactGraphViz activeNode={activeNode} onNodeClick={setActiveNode} />

      {/* SZCZEGÓŁY WĘZŁA (SIDE PANEL) - Wersja jasna */}
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
 
            {/* Czat */}
            <div className="w-80 bg-white border-l border-slate-200 shadow-xl flex flex-col shrink-0 rounded-2xl overflow-hidden h-full">
               <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center gap-3">
                  <div className="w-10 h-10 bg-white border border-slate-200 rounded-full flex items-center justify-center shadow-sm text-blue-600">
                     <Bird size={20} />
                  </div>
                  <div><h3 className="font-bold text-slate-800 text-sm">Bielik Copilot</h3><div className="flex items-center gap-1 text-[10px] text-green-600 font-bold uppercase"><Lock size={8} /> On-Premise</div></div>
               </div>
               <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white">
                  <div className="flex justify-start">
                     <div className="bg-blue-50 border border-blue-100 p-4 rounded-2xl text-sm text-slate-700 w-full">
                        <p className="mb-2 font-bold text-blue-800">Analiza Ryzyka</p>
                        <p className="mb-3">Wykryłem konflikt z RODO (zobacz Graf). Czy chcesz zgłosić uwagę w tej sprawie?</p>
                        <button onClick={() => setShowDoc(true)} className="w-full flex items-center justify-between bg-white border border-blue-200 text-blue-700 px-3 py-2 rounded-lg hover:bg-blue-100 transition-colors shadow-sm text-xs font-bold mb-2">
                           <span className="flex items-center gap-2"><FileText size={14}/> Źródło (Art. 15)</span><ArrowLeft size={14}/>
                        </button>
                        <button className="w-full bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-sm text-xs font-bold">
                           Generuj treść uwagi
                        </button>
                     </div>
                  </div>
               </div>
               <div className="p-4 border-t border-slate-100 bg-slate-50 relative">
                  <input type="text" placeholder="Dopytaj o RODO..." className="w-full bg-white border border-slate-200 rounded-xl pl-4 pr-10 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none shadow-sm" />
                  <button className="absolute right-2 top-2 p-1.5 bg-blue-600 text-white rounded-lg"><Send size={14}/></button>
               </div>
            </div>
          </div>
          
          <AnimatePresence>
            {showDoc && <DesktopPDFOverlay onClose={() => setShowDoc(false)} />}
          </AnimatePresence>
       </main>
     </div>
   );
};

export default MainDashboard;