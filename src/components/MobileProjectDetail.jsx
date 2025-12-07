import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, FileText, Zap, Send, CheckCircle2, 
  AlertTriangle, Info, BookOpen, Share2, BrainCircuit
} from 'lucide-react';

const MobileProjectDetail = ({ project, onBack }) => {
  const [activeTab, setActiveTab] = useState('analysis'); // 'analysis' | 'form'
  const [simpleMode, setSimpleMode] = useState(true); // Tłumacz: Prosty vs Prawniczy
  const [feedback, setFeedback] = useState('');
  const [isSent, setIsSent] = useState(false);

  // Domyślne dane, jeśli nie przekazano projektu (do testów)
  const data = project || {
      title: "Ustawa o transparentności AI",
      id: "UD-234"
  };

  // --- WIDOK 1: ANALIZA (Tłumacz PLLuM) ---
  const AnalysisView = () => (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-6 pb-24"
    >
        {/* Karta Ryzyka */}
        <div className="bg-red-50 border border-red-100 rounded-2xl p-4 flex gap-3 items-start shadow-sm">
            <div className="bg-white p-2 rounded-full text-red-600 shadow-sm shrink-0">
                <AlertTriangle size={20} />
            </div>
            <div>
                <h4 className="font-bold text-red-800 text-sm mb-1">Ryzyko dla Twojej branży</h4>
                <p className="text-xs text-red-600 leading-relaxed">
                    Projekt nakłada nowe obowiązki raportowania. Szacowany koszt wdrożenia: <strong className="font-bold">~2000 PLN / rok.</strong>
                </p>
            </div>
        </div>

        {/* SEKRETNA BROŃ: TŁUMACZ PLLuM */}
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
            {/* Header Tłumacza */}
            <div className="bg-slate-50 px-5 py-3 border-b border-slate-100 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <BrainCircuit size={16} className="text-blue-600"/>
                    <span className="text-xs font-bold text-slate-700 uppercase">Analiza PLLuM</span>
                </div>
                
                {/* Toggle Button */}
                <div className="bg-slate-200 p-0.5 rounded-lg flex">
                    <button 
                        onClick={() => setSimpleMode(false)}
                        className={`px-3 py-1 rounded-md text-[10px] font-bold transition-all ${!simpleMode ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500'}`}
                    >
                        Prawniczy
                    </button>
                    <button 
                        onClick={() => setSimpleMode(true)}
                        className={`px-3 py-1 rounded-md text-[10px] font-bold transition-all flex items-center gap-1 ${simpleMode ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-500'}`}
                    >
                        <Zap size={10} fill="currentColor" /> Prosty
                    </button>
                </div>
            </div>

            {/* Treść */}
            <div className="p-5">
                <AnimatePresence mode="wait">
                    {simpleMode ? (
                        <motion.div 
                            key="simple"
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="space-y-3"
                        >
                            <p className="text-sm text-slate-700 leading-relaxed">
                                <strong className="text-blue-700">W skrócie:</strong> Ustawa zmusza firmy tworzące oprogramowanie do oznaczania treści generowanych przez AI.
                            </p>
                            <p className="text-sm text-slate-700 leading-relaxed">
                                <strong className="text-green-700">Dobra wiadomość:</strong> Jako mała firma (MŚP), jesteś zwolniony z drogich audytów bezpieczeństwa (Art. 15). Dotyczy to tylko gigantów technologicznych.
                            </p>
                        </motion.div>
                    ) : (
                        <motion.div 
                            key="legal"
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="text-xs font-serif text-slate-600 leading-relaxed bg-slate-50 p-3 rounded border border-slate-200 italic"
                        >
                            "Art. 14. Podmioty wdrażające systemy wysokiego ryzyka (...) są obowiązane do prowadzenia rejestru. Ust. 2 nie stosuje się do mikroprzedsiębiorców w rozumieniu załącznika I do rozporządzenia Komisji (UE) nr 651/2014."
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            
            {/* Źródło */}
            <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
                <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-bold uppercase">
                    <BookOpen size={12}/> Źródło: RCL (str. 14)
                </div>
                <button className="text-blue-600 hover:text-blue-800"><Share2 size={16}/></button>
            </div>
        </div>

        {/* Call To Action */}
        <div className="bg-blue-600 text-white p-5 rounded-2xl shadow-lg shadow-blue-200 relative overflow-hidden">
            <div className="relative z-10">
                <h3 className="font-bold text-lg mb-1">Masz zdanie?</h3>
                <p className="text-blue-100 text-xs mb-4 max-w-[80%]">
                    To etap pre-konsultacji. Twój głos ma teraz największe znaczenie.
                </p>
                <button 
                    onClick={() => setActiveTab('form')}
                    className="bg-white text-blue-700 px-4 py-2 rounded-lg text-xs font-bold shadow-sm"
                >
                    Zgłoś uwagę
                </button>
            </div>
            {/* Ozdoba tła */}
            <FileText size={100} className="absolute -right-4 -bottom-4 text-blue-500 opacity-20 rotate-12"/>
        </div>
    </motion.div>
  );

  // --- WIDOK 2: FORMULARZ (AI Guardrails) ---
  const FormView = () => (
    <motion.div 
      initial={{ opacity: 0, x: 20 }} 
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="space-y-4 pb-24 h-full flex flex-col"
    >
        {isSent ? (
            <div className="flex flex-col items-center justify-center text-center py-10 space-y-4 bg-white rounded-2xl border border-green-100 shadow-sm p-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 animate-bounce">
                    <CheckCircle2 size={32} />
                </div>
                <h3 className="text-xl font-bold text-slate-800">Wysłano do RCL!</h3>
                <p className="text-sm text-slate-500">
                    Twój głos został zabezpieczony i przekazany urzędnikom. Dziękujemy za udział w demokracji.
                </p>
                <button onClick={() => { setIsSent(false); setActiveTab('analysis'); }} className="text-blue-600 font-bold text-sm mt-4">
                    Wróć do analizy
                </button>
            </div>
        ) : (
            <>
                <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 flex gap-3">
                    <Info size={20} className="text-blue-600 shrink-0 mt-0.5"/>
                    <div>
                        <p className="text-xs font-bold text-blue-800 mb-1">Inteligentny Asystent</p>
                        <p className="text-[10px] text-blue-600 leading-relaxed">
                            Pisz śmiało. PLLuM sprawdzi Twoją uwagę pod kątem formalnym i pomoże ją ulepszyć przed wysłaniem.
                        </p>
                    </div>
                </div>

                <div className="flex-1">
                    <label className="text-xs font-bold text-slate-500 uppercase ml-1 mb-2 block">Twoja uwaga</label>
                    <textarea 
                        className="w-full h-48 bg-white border border-slate-200 rounded-xl p-4 text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none shadow-sm"
                        placeholder="Napisz, co myślisz o art. 15..."
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                    ></textarea>
                </div>

                {/* AI GUARDRAILS - Feedback w czasie rzeczywistym */}
                {feedback.length > 10 && (
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                        className="bg-yellow-50 border border-yellow-100 p-3 rounded-xl flex gap-3 items-center"
                    >
                        <div className="bg-yellow-100 p-1.5 rounded-full text-yellow-700">
                            <Zap size={12} fill="currentColor"/>
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-yellow-800 uppercase">Sugestia PLLuM</p>
                            <p className="text-xs text-yellow-700">
                                Warto dodać konkretne wyliczenie kosztów dla Twojej firmy. To zwiększy szansę na zmianę przepisu.
                            </p>
                        </div>
                    </motion.div>
                )}
            </>
        )}
    </motion.div>
  );

  // --- GŁÓWNY RENDER ---
  return (
    <div className="bg-slate-50 min-h-screen font-sans text-slate-900 flex flex-col">
      
      {/* 1. TOP BAR */}
      <div className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200 px-4 py-3 flex items-center gap-4">
        <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <ArrowLeft size={20} className="text-slate-600"/>
        </button>
        <div className="flex-1 min-w-0">
            <h2 className="text-sm font-bold text-slate-800 truncate">{data.title}</h2>
            <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-slate-400">{data.id}</span>
                <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                <span className="text-[10px] text-green-600 font-bold uppercase">Konsultacje otwarte</span>
            </div>
        </div>
      </div>

      {/* 2. TABS */}
      <div className="px-5 pt-4 pb-2">
          <div className="bg-slate-200/50 p-1 rounded-xl flex">
              <button 
                onClick={() => setActiveTab('analysis')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${activeTab === 'analysis' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}
              >
                Analiza i Tłumacz
              </button>
              <button 
                onClick={() => setActiveTab('form')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${activeTab === 'form' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}
              >
                Zgłoś Uwagę
              </button>
          </div>
      </div>

      {/* 3. CONTENT AREA */}
      <div className="flex-1 p-5 overflow-y-auto">
         <AnimatePresence mode="wait">
            {activeTab === 'analysis' ? <AnalysisView key="view-analysis" /> : <FormView key="view-form" />}
         </AnimatePresence>
      </div>

      {/* 4. FOOTER BUTTON (Tylko w trybie formularza i gdy nie wysłano) */}
      {activeTab === 'form' && !isSent && (
          <div className="fixed bottom-0 left-0 right-0 p-5 bg-white border-t border-slate-200 z-40">
              <button 
                onClick={() => setIsSent(true)}
                disabled={feedback.length < 5}
                className="w-full bg-blue-600 disabled:bg-slate-300 disabled:cursor-not-allowed text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-200 transition-all active:scale-95"
              >
                  <Send size={18}/> Wyślij do RCL (Podpis Zaufany)
              </button>
          </div>
      )}

    </div>
  );
};

export default MobileProjectDetail;