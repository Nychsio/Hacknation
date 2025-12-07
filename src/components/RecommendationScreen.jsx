import React from 'react';
import { motion } from 'framer-motion';
import { User, ArrowUpRight, Calendar, ChevronRight, FileText, AlertCircle, LogOut } from 'lucide-react';
import { Badge } from './Shared';
import logo from '../assets/logo.png';

const RecommendationScreen = ({ onSelectProject, onLogout }) => {
  return (
    <div className="h-screen w-screen bg-slate-50 font-sans overflow-hidden flex flex-col text-slate-900">
       
       {/* HEADER: Czysty, biały, minimalistyczny (Styl Gov.pl) */}
       <header className="bg-white border-b border-slate-200 px-8 h-16 flex justify-between items-center shrink-0 z-10 shadow-sm">
          <div className="flex items-center gap-3">
             {/* Logo - Spokojne */}
             <img src={logo} alt="Logo" className="w-8 h-8 rounded" />
             <div className="flex flex-col">
                <span className="font-bold text-sm tracking-tight text-slate-800">Legis 2.0</span>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider">Serwis Rzeczypospolitej Polskiej</span>
             </div>
          </div>
          
          <div className="flex items-center gap-4">
             <div className="text-right hidden md:block">
                <p className="text-sm font-semibold text-slate-700">Jan Nowak</p>
                <p className="text-[10px] text-slate-400">Obywatel / Przedsiębiorca</p>
             </div>
             <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200 text-slate-500">
                <User size={18}/>
             </div>
             <button onClick={onLogout} className="text-slate-400 hover:text-slate-600 transition-colors ml-2" title="Wyloguj">
                <LogOut size={20} />
             </button>
          </div>
       </header>

       <div className="flex flex-1 overflow-hidden">
          
          {/* GŁÓWNA ZAWARTOŚĆ */}
          <div className="flex-1 overflow-y-auto p-8 lg:px-16">
             
             {/* Powitanie - Styl mObywatel Dashboard */}
             <div className="mb-8 mt-4">
                <h1 className="text-2xl font-bold text-slate-900 mb-1">Dzień dobry, Janie</h1>
                <p className="text-slate-500 text-sm">Przygotowaliśmy wykaz zmian prawnych dopasowanych do Twojego profilu (B2B / IT).</p>
             </div>

             {/* Zakładki - Subtelne */}
             <div className="flex gap-6 mb-8 border-b border-slate-200">
                <button className="pb-3 border-b-2 border-blue-700 font-bold text-blue-700 text-sm">Dla Ciebie (3)</button>
                <button className="pb-3 border-b-2 border-transparent font-medium text-slate-500 text-sm hover:text-slate-800 transition-colors">Wszystkie</button>
                <button className="pb-3 border-b-2 border-transparent font-medium text-slate-500 text-sm hover:text-slate-800 transition-colors">Terminy</button>
             </div>

             {/* SEKCJA NAJWAŻNIEJSZE (Hero Card) */}
             <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                Wymaga Twojej uwagi
             </h2>
             
             <motion.div 
               // ZMIANA: Bardzo subtelna animacja
               whileHover={{ y: -4, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.05)" }}
               transition={{ duration: 0.4, ease: "easeOut" }}
               onClick={onSelectProject}
               className="bg-white rounded-xl shadow-sm border border-slate-200 p-0 cursor-pointer group relative overflow-hidden mb-8"
             >
                {/* Pasek Statusu (Lewa krawędź) - Czysty styl */}
                <div className="absolute top-0 bottom-0 left-0 w-1.5 bg-blue-600"></div>

                <div className="flex flex-col md:flex-row">
                   <div className="p-6 md:p-8 flex-1">
                      <div className="flex items-center gap-3 mb-3">
                         {/* Badge w stylu Gov - mniej krzykliwe */}
                         <span className="bg-red-50 text-red-700 border border-red-100 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide">
                            Wysoki Priorytet
                         </span>
                         <span className="text-[10px] text-slate-400 font-medium ml-auto flex items-center gap-1">
                            <Calendar size={12}/> Ostatnia zmiana: Dzisiaj
                         </span>
                      </div>
                      
                      <h3 className="text-2xl font-bold text-slate-800 mb-3 group-hover:text-blue-700 transition-colors leading-tight">
                         Ustawa o transparentności systemów AI
                      </h3>
                      
                      <p className="text-slate-600 text-sm mb-6 leading-relaxed max-w-2xl">
                         Projekt nakłada obowiązki audytowe na twórców oprogramowania. <br/>
                         <strong>Uwaga:</strong> Wykryto potencjalne wyłączenie dla MŚP (Art. 15), które może Cię dotyczyć.
                      </p>

                      <div className="flex items-center gap-4">
                         <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                            <span className="w-2 h-2 rounded-full bg-green-500"></span>
                            Status: <span className="font-semibold text-slate-700">Pre-konsultacje (RCL)</span>
                         </div>
                      </div>
                   </div>

                   {/* Prawa strona Hero (Call to Action) */}
                   <div className="bg-slate-50 p-6 flex flex-col justify-center items-center border-l border-slate-100 w-full md:w-56 shrink-0 gap-3">
                      <div className="text-center">
                         <span className="block text-[10px] font-bold text-slate-400 uppercase">Koniec konsultacji</span>
                         <span className="block text-xl font-bold text-red-600">3 dni</span>
                      </div>
                      <button className="w-full bg-white border border-blue-200 text-blue-700 hover:bg-blue-50 px-4 py-2 rounded-lg font-bold text-xs transition-colors flex items-center justify-center gap-2 shadow-sm">
                         Zobacz szczegóły <ArrowUpRight size={14}/>
                      </button>
                   </div>
                </div>
             </motion.div>

             {/* POZOSTAŁE PROJEKTY (Lista w stylu tabelarycznym/kartowym) */}
             <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 mt-8">Pozostałe aktualizacje</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Karta 2 */}
                <motion.div 
                   whileHover={{ y: -2 }}
                   transition={{ duration: 0.4 }}
                   className="bg-white p-5 rounded-xl border border-slate-200 hover:border-blue-300 transition-colors cursor-pointer shadow-sm"
                >
                   <div className="flex justify-between items-start mb-3">
                      <span className="bg-slate-100 text-slate-600 border border-slate-200 px-2 py-0.5 rounded text-[10px] font-bold uppercase">Podatki</span>
                      <ChevronRight size={16} className="text-slate-300"/>
                   </div>
                   <h4 className="font-bold text-base text-slate-800 mb-1">Nowelizacja ustawy o Kryptoaktywach</h4>
                   <p className="text-xs text-slate-500 leading-relaxed mb-3">Zmiany w rozliczaniu strat z lat ubiegłych. Projekt wpłynął do Komisji Finansów.</p>
                   <div className="flex items-center gap-2 text-[10px] text-slate-400 font-medium">
                      <FileText size={12}/> Sygnatura: UD-442
                   </div>
                </motion.div>

                {/* Karta 3 */}
                <motion.div 
                   whileHover={{ y: -2 }}
                   transition={{ duration: 0.4 }}
                   className="bg-white p-5 rounded-xl border border-slate-200 hover:border-blue-300 transition-colors cursor-pointer shadow-sm"
                >
                   <div className="flex justify-between items-start mb-3">
                      <span className="bg-green-50 text-green-700 border border-green-200 px-2 py-0.5 rounded text-[10px] font-bold uppercase">Ułatwienia</span>
                      <ChevronRight size={16} className="text-slate-300"/>
                   </div>
                   <h4 className="font-bold text-base text-slate-800 mb-1">Wakacje Składkowe dla Ryczałtowców</h4>
                   <p className="text-xs text-slate-500 leading-relaxed mb-3">Możliwość zawieszenia płatności ZUS na 2 miesiące w roku. Etap Senatu.</p>
                   <div className="flex items-center gap-2 text-[10px] text-slate-400 font-medium">
                      <FileText size={12}/> Sygnatura: SEN-12
                   </div>
                </motion.div>

             </div>
          </div>

          {/* SIDEBAR (Styl Widgetów) */}
          <div className="w-80 bg-white border-l border-slate-200 p-6 hidden xl:block overflow-y-auto">
             
             {/* Widget Kalendarza */}
             <div className="mb-6">
                <h3 className="font-bold text-sm text-slate-800 mb-4 flex items-center gap-2">Terminarz</h3>
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 space-y-4">
                   <div className="flex gap-3 items-center">
                      <div className="bg-white text-slate-800 rounded border border-slate-200 w-10 h-10 flex flex-col items-center justify-center shrink-0 shadow-sm">
                         <span className="text-[8px] font-bold uppercase text-red-600">GRU</span>
                         <span className="text-sm font-bold">12</span>
                      </div>
                      <div>
                         <p className="text-xs font-bold text-slate-700">Koniec konsultacji AI</p>
                         <p className="text-[10px] text-slate-400">Termin zawity</p>
                      </div>
                   </div>
                   <div className="w-full h-px bg-slate-200"></div>
                   <div className="flex gap-3 items-center opacity-60">
                      <div className="bg-white text-slate-400 rounded border border-slate-200 w-10 h-10 flex flex-col items-center justify-center shrink-0">
                         <span className="text-[8px] font-bold uppercase">STY</span>
                         <span className="text-sm font-bold">01</span>
                      </div>
                      <div>
                         <p className="text-xs font-bold text-slate-700">Nowy Ład Podatkowy</p>
                         <p className="text-[10px] text-slate-400">Wejście w życie</p>
                      </div>
                   </div>
                </div>
             </div>

             {/* Widget Powiadomień */}
             <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                <div className="flex items-start gap-3">
                   <AlertCircle size={18} className="text-blue-600 mt-0.5"/>
                   <div>
                      <p className="text-xs font-bold text-blue-800 mb-1">Masz nowe powiadomienie</p>
                      <p className="text-[10px] text-blue-600 leading-relaxed">
                         Twoja uwaga do ustawy o OZE została przekazana do Ministerstwa Klimatu.
                      </p>
                   </div>
                </div>
             </div>
          </div>

       </div>
    </div>
  );
};

export default RecommendationScreen;