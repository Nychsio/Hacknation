import React from 'react';
import { motion } from 'framer-motion';
import { User, ArrowUpRight, Calendar, Filter, Flame, ChevronRight } from 'lucide-react';
import { Badge } from './Shared';

const RecommendationScreen = ({ onSelectProject }) => {
  return (
    <div className="h-screen w-screen bg-slate-100 font-sans overflow-hidden flex flex-col">
       
       {/* HEADER PORTALU */}
       <header className="bg-white border-b border-slate-200 px-8 h-16 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-2">
             <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold text-lg">L</div>
             <span className="font-bold text-xl tracking-tight text-slate-800">Legis<span className="text-blue-500">2.0</span></span>
             <span className="ml-4 text-xs font-bold text-slate-400 border-l border-slate-200 pl-4 uppercase tracking-wider">Twój Feed Legislacyjny</span>
          </div>
          <div className="flex items-center gap-4">
             <div className="text-right hidden md:block">
                <p className="text-sm font-bold text-slate-800">Jan Nowak</p>
                <p className="text-[10px] text-slate-500">Profil: IT / B2B</p>
             </div>
             <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center border-2 border-white shadow-sm"><User size={20} className="text-slate-600"/></div>
          </div>
       </header>

       <div className="flex flex-1 overflow-hidden">
          
          {/* GŁÓWNA ZAWARTOŚĆ (SCROLLOWALNA) */}
          <div className="flex-1 overflow-y-auto p-8">
             
             {/* Sekcja Powitalna */}
             <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 mb-2">Dzień dobry, Janie! 👋</h1>
                <p className="text-slate-500">Bielik przeanalizował 142 nowe projekty. Wybraliśmy <span className="font-bold text-slate-800">3 kluczowe</span> dla Twojej branży.</p>
             </div>

             {/* Zakładki Kategorii (Fake) */}
             <div className="flex gap-4 mb-6 border-b border-slate-200 pb-1">
                <button className="pb-3 border-b-2 border-blue-600 font-bold text-blue-600 text-sm">Najważniejsze</button>
                <button className="pb-3 border-b-2 border-transparent font-medium text-slate-500 text-sm hover:text-slate-700">Podatki</button>
                <button className="pb-3 border-b-2 border-transparent font-medium text-slate-500 text-sm hover:text-slate-700">Gospodarka</button>
                <button className="pb-3 border-b-2 border-transparent font-medium text-slate-500 text-sm hover:text-slate-700">Lokalne</button>
             </div>

             {/* SEKCJA NAJWAŻNIEJSZE (HERO CARD) */}
             <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2"><Flame size={14} className="text-red-500"/> Krytyczne dla Ciebie</h2>
             
             <motion.div 
               whileHover={{ scale: 1.01 }}
               onClick={onSelectProject}
               className="bg-white rounded-2xl shadow-lg border border-blue-100 p-0 cursor-pointer group relative overflow-hidden mb-8"
             >
                {/* Pasek ozdobny po lewej */}
                <div className="absolute top-0 bottom-0 left-0 w-2 bg-gradient-to-b from-blue-500 to-blue-700"></div>

                <div className="flex flex-col md:flex-row">
                   <div className="p-8 flex-1">
                      <div className="flex items-center gap-3 mb-4">
                         <Badge color="red">Wysokie Ryzyko</Badge>
                         <Badge color="blue">IT / Software</Badge>
                         <span className="text-[10px] text-slate-400 font-bold uppercase ml-auto">Aktualizacja: 2h temu</span>
                      </div>
                      
                      <h3 className="text-3xl font-bold text-slate-800 mb-3 group-hover:text-blue-700 transition-colors">
                         Ustawa o transparentności AI
                      </h3>
                      
                      <p className="text-slate-600 mb-6 leading-relaxed">
                         Projekt wprowadza obowiązkowe audyty dla firm tworzących oprogramowanie. Dla mikroprzedsiębiorców (MŚP) przewidziano jednak kluczowe wyłączenia w Art. 15.
                      </p>

                      <div className="flex items-center gap-4">
                         <div className="flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-lg border border-slate-100">
                            <div className="w-5 h-5 rounded-full bg-white border border-slate-200 flex items-center justify-center text-[10px]">🦅</div>
                            <span className="text-xs font-bold text-slate-600">Bielik radzi:</span>
                            <span className="text-xs text-slate-500">"Warto sprawdzić definicję MŚP."</span>
                         </div>
                      </div>
                   </div>

                   {/* Prawa strona Hero (Call to Action) */}
                   <div className="bg-slate-50 p-8 flex flex-col justify-center items-center border-l border-slate-100 w-64 shrink-0">
                      <span className="text-xs font-bold text-slate-400 uppercase mb-2">Czas na reakcję</span>
                      <span className="text-2xl font-bold text-yellow-600 mb-4">3 dni</span>
                      <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-md shadow-blue-200 group-hover:bg-blue-700 transition-all flex items-center gap-2">
                         Analizuj <ArrowUpRight size={16}/>
                      </button>
                   </div>
                </div>
             </motion.div>

             {/* POZOSTAŁE PROJEKTY (GRID) */}
             <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 mt-8">Pozostałe rekomendacje</h2>
             <div className="grid grid-cols-2 gap-6">
                
                {/* Karta 2 */}
                <div className="bg-white p-6 rounded-xl border border-slate-200 hover:shadow-md transition-shadow cursor-pointer opacity-75 hover:opacity-100">
                   <div className="flex justify-between mb-4">
                      <Badge color="yellow">Średnie</Badge>
                      <span className="text-slate-400 text-xs">Sejm (I Czytanie)</span>
                   </div>
                   <h4 className="font-bold text-lg text-slate-800 mb-2">Podatek od Krypto v3</h4>
                   <p className="text-sm text-slate-500 mb-4">Zmiany w rozliczaniu strat z lat ubiegłych. Dotyczy Twoich aktywów cyfrowych.</p>
                   <div className="text-blue-600 text-xs font-bold flex items-center gap-1">Czytaj więcej <ChevronRight size={12}/></div>
                </div>

                {/* Karta 3 */}
                <div className="bg-white p-6 rounded-xl border border-slate-200 hover:shadow-md transition-shadow cursor-pointer opacity-75 hover:opacity-100">
                   <div className="flex justify-between mb-4">
                      <Badge color="green">Korzyść</Badge>
                      <span className="text-slate-400 text-xs">Senat</span>
                   </div>
                   <h4 className="font-bold text-lg text-slate-800 mb-2">Wakacje Składkowe 2.0</h4>
                   <p className="text-sm text-slate-500 mb-4">Możliwość zawieszenia ZUS na 2 miesiące dla ryczałtowców. Sprawdź warunki.</p>
                   <div className="text-blue-600 text-xs font-bold flex items-center gap-1">Czytaj więcej <ChevronRight size={12}/></div>
                </div>

             </div>
          </div>

          {/* SIDEBAR (WIDŻETY) */}
          <div className="w-80 bg-white border-l border-slate-200 p-6 hidden xl:block overflow-y-auto">
             <div className="mb-8">
                <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2"><Calendar size={18}/> Twój Kalendarz</h3>
                <div className="space-y-4">
                   <div className="flex gap-3">
                      <div className="bg-blue-100 text-blue-700 rounded-lg w-10 h-10 flex flex-col items-center justify-center shrink-0 border border-blue-200">
                         <span className="text-[8px] font-bold uppercase">GRU</span>
                         <span className="text-sm font-bold">12</span>
                      </div>
                      <div>
                         <p className="text-xs font-bold text-slate-700">Koniec pre-konsultacji AI</p>
                         <p className="text-[10px] text-slate-500">Krytyczny termin</p>
                      </div>
                   </div>
                   <div className="flex gap-3">
                      <div className="bg-slate-100 text-slate-500 rounded-lg w-10 h-10 flex flex-col items-center justify-center shrink-0">
                         <span className="text-[8px] font-bold uppercase">STY</span>
                         <span className="text-sm font-bold">01</span>
                      </div>
                      <div>
                         <p className="text-xs font-bold text-slate-700">Nowe stawki ryczałtu</p>
                         <p className="text-[10px] text-slate-500">Wejście w życie</p>
                      </div>
                   </div>
                </div>
             </div>

             <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <h3 className="font-bold text-xs text-slate-500 uppercase mb-3">Statystyki Tygodnia</h3>
                <div className="flex justify-between items-center mb-2">
                   <span className="text-sm text-slate-600">Nowe projekty</span>
                   <span className="font-bold text-slate-800">142</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                   <span className="text-sm text-slate-600">Dotyczy Ciebie</span>
                   <span className="font-bold text-blue-600">3</span>
                </div>
                <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden">
                   <div className="bg-blue-600 h-full w-[15%]"></div>
                </div>
             </div>
          </div>

       </div>
    </div>
  );
};

export default RecommendationScreen;