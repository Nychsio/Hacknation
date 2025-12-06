import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, ArrowLeft, Send, ShieldAlert, X,
  Bell, LayoutDashboard, FileBarChart, Lock, User
} from 'lucide-react';
import { Badge, HorizontalTrain } from './Shared';

// --- PDF OVERLAY Z ORŁEM ---
const DesktopPDFOverlay = ({ onClose }) => (
  <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="absolute inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm p-8">
     <div className="bg-white w-full max-w-4xl h-full rounded-2xl flex flex-col relative overflow-hidden shadow-2xl">
        {/* Header Okna */}
        <div className="bg-slate-800 text-white p-4 flex justify-between items-center shrink-0">
           <div className="flex items-center gap-2"><FileText size={16}/><span className="text-sm font-bold">Projekt_Ustawy_AI_v4.pdf (RCL)</span></div>
           <button onClick={onClose} className="hover:bg-slate-700 p-2 rounded-full"><X size={20}/></button>
        </div>
        
        {/* Treść Dokumentu */}
        <div className="flex-1 overflow-auto p-12 flex justify-center bg-slate-100">
           <div className="bg-white w-[700px] min-h-[1200px] p-16 shadow-xl text-justify relative font-serif text-slate-900">
              
              {/* --- TU JEST GODŁO --- */}
              <div className="text-center border-b-2 border-black pb-8 mb-12">
                 <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Herb_Polski.svg/509px-Herb_Polski.svg.png" className="h-20 mx-auto mb-6" alt="Godło Polski"/>
                 <h1 className="text-2xl font-bold mb-2 uppercase tracking-wide">Ustawa</h1>
                 <p className="text-lg">z dnia 12 grudnia 2025 r.</p>
                 <p className="font-bold text-xl mt-4">o transparentności systemów algorytmicznych</p>
              </div>

              {/* Treść Tła */}
              <div className="space-y-6 text-slate-400 blur-[0.6px] select-none">
                 <p><strong>Art. 14.</strong> Podmioty publiczne wdrażające systemy AI są obowiązane do prowadzenia rejestru ryzyk.</p>
                 <p>2. Rejestr, o którym mowa w ust. 1, podlega udostępnieniu na wniosek.</p>
              </div>

              {/* Podświetlony Artykuł 15 */}
              <div className="my-12 relative">
                 <motion.div initial={{x:-20, opacity:0}} animate={{x:0, opacity:1}} delay={0.5} className="absolute -left-12 top-2 text-blue-600">
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

const MainDashboard = ({ onBack }) => {
   const [showDoc, setShowDoc] = useState(false);
   
   return (
     <div className="flex h-screen w-screen bg-slate-100 font-sans overflow-hidden relative">
       {/* Sidebar */}
       <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col p-4 shrink-0">
         <div className="flex items-center gap-3 px-2 mb-10"><div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold">L</div><h1 className="text-xl font-bold text-white">Legis<span className="text-blue-500">2.0</span></h1></div>
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
             <div className="flex items-center gap-4"><Badge color="red">Wysokie Ryzyko</Badge><Bell className="text-slate-400"/></div>
          </header>
 
          <div className="flex-1 overflow-y-auto p-8 flex gap-6">
            <div className="flex-[2] min-w-0 flex flex-col">
               <div className="mb-6 flex items-end justify-between">
                 <div><span className="text-xs font-bold text-slate-500 uppercase mb-1">Wybrany Projekt</span><h2 className="text-3xl font-bold text-slate-800">Ustawa o transparentności AI</h2></div>
                 <div className="flex gap-2"><Badge color="blue">UD234</Badge><Badge color="yellow">Pre-konsultacje</Badge></div>
               </div>
               
               <HorizontalTrain />
 
               <div className="flex-1 grid grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                     <h4 className="font-bold text-slate-700 mb-4 flex items-center gap-2"><FileText size={18} className="text-blue-500"/> Założenia (Bielik AI)</h4>
                     <p className="text-sm text-slate-600 leading-relaxed">Projekt wprowadza obowiązek audytu systemów AI w administracji i sektorze prywatnym. <br/><br/><strong>Twoje uwagi:</strong> Termin mija 12.12.2025.</p>
                  </div>
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col relative overflow-hidden">
                     <h4 className="font-bold text-slate-700 mb-2 flex items-center gap-2"><ShieldAlert size={18} className="text-red-500"/> Impact Graph</h4>
                     <div className="flex-1 flex items-center justify-center relative">
                        <svg className="w-full h-full" viewBox="0 0 300 150" style={{ filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.05))' }}>
                           <defs>
                              <radialGradient id="simpleBlue" cx="50%" cy="50%" r="50%" fx="30%" fy="30%">
                                 <stop offset="0%" stopColor="#60a5fa" />
                                 <stop offset="100%" stopColor="#2563eb" />
                              </radialGradient>
                              <radialGradient id="simpleRed" cx="50%" cy="50%" r="50%" fx="30%" fy="30%">
                                 <stop offset="0%" stopColor="#f87171" />
                                 <stop offset="100%" stopColor="#dc2626" />
                              </radialGradient>
                              <radialGradient id="simpleGreen" cx="50%" cy="50%" r="50%" fx="30%" fy="30%">
                                 <stop offset="0%" stopColor="#34d399" />
                                 <stop offset="100%" stopColor="#059669" />
                              </radialGradient>
                           </defs>

                           {/* Edges - Gooey Style (Thick ends, thin middle) */}
                           <path d="M 153 69 Q 115 57.5 82 36 L 78 44 Q 115 57.5 147 81 Z" fill="#cbd5e1" />
                           <path d="M 147 81 Q 185 92.5 218 114 L 222 106 Q 185 92.5 153 69 Z" fill="#cbd5e1" />

                           {/* Node 1: Costs (Red) */}
                           <g transform="translate(80, 40)">
                              <circle r="14" fill="url(#simpleRed)" stroke="white" strokeWidth="2" />
                              <text y="28" textAnchor="middle" className="text-[10px] font-bold fill-slate-500 tracking-wider font-sans uppercase">Koszty</text>
                           </g>

                           {/* Node 2: Center (Blue) */}
                           <g transform="translate(150, 75)">
                              <circle r="20" fill="url(#simpleBlue)" stroke="white" strokeWidth="2" />
                              <text y="36" textAnchor="middle" className="text-[10px] font-bold fill-slate-500 tracking-wider font-sans uppercase">Projekt</text>
                           </g>

                           {/* Node 3: Benefit (Green) */}
                           <g transform="translate(220, 110)">
                              <circle r="14" fill="url(#simpleGreen)" stroke="white" strokeWidth="2" />
                              <text y="28" textAnchor="middle" className="text-[10px] font-bold fill-slate-500 tracking-wider font-sans uppercase">Ulga MŚP</text>
                           </g>
                        </svg>
                     </div>
                  </div>
               </div>
            </div>
 
            {/* Czat */}
            <div className="w-96 bg-white border-l border-slate-200 shadow-xl flex flex-col shrink-0 rounded-l-2xl overflow-hidden h-full">
               <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center gap-3">
                  <div className="w-10 h-10 bg-white border border-slate-200 rounded-full flex items-center justify-center shadow-sm">🦅</div>
                  <div><h3 className="font-bold text-slate-800 text-sm">Bielik Copilot</h3><div className="flex items-center gap-1 text-[10px] text-green-600 font-bold uppercase"><Lock size={8} /> On-Premise</div></div>
               </div>
               <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white">
                  <div className="flex justify-start">
                     <div className="bg-blue-50 border border-blue-100 p-4 rounded-2xl rounded-tl-none text-sm text-slate-700 w-full">
                        <p className="mb-2 font-bold text-blue-800">Alert dla Twojej branży</p>
                        <p className="mb-3">Janie, wykryłem ryzyko audytu, ale Art. 15 zwalnia MŚP.</p>
                        <button onClick={() => setShowDoc(true)} className="w-full flex items-center justify-between bg-white border border-blue-200 text-blue-700 px-3 py-2 rounded-lg hover:bg-blue-100 transition-colors shadow-sm text-xs font-bold">
                           <span className="flex items-center gap-2"><FileText size={14}/> Pokaż dowód (Art. 15)</span><ArrowLeft size={14}/>
                        </button>
                     </div>
                  </div>
               </div>
               <div className="p-4 border-t border-slate-100 bg-slate-50 relative">
                  <input type="text" placeholder="Dopytaj..." className="w-full bg-white border border-slate-200 rounded-xl pl-4 pr-10 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none shadow-sm" />
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