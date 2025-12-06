import React from 'react';
import { motion } from 'framer-motion';
import { Train, CheckCircle, AlertCircle } from 'lucide-react';

export const Badge = ({ children, color = "blue" }) => {
  const styles = {
    yellow: "bg-yellow-100 text-yellow-800 border-yellow-300",
    green: "bg-green-100 text-green-800 border-green-300",
    red: "bg-red-100 text-red-800 border-red-300",
    blue: "bg-blue-50 text-blue-700 border-blue-200",
    gray: "bg-slate-100 text-slate-600 border-slate-200",
  };
  return (
    <span className={`px-2 py-1 rounded text-xs font-bold uppercase tracking-wider border ${styles[color] || styles.blue}`}>
      {children}
    </span>
  );
};

export const HorizontalTrain = () => {
  const steps = [
     { label: "Założenia", status: "done" },
     { label: "Pre-konsultacje", status: "current", userAction: true },
     { label: "Rząd", status: "wait" },
     { label: "Sejm", status: "wait" },
     { label: "Prezydent", status: "wait" }
   ];
 
   return (
     <div className="w-full bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-6">
       <div className="flex justify-between items-center mb-6">
         <h3 className="font-bold text-slate-800 flex items-center gap-2">
           <Train className="text-blue-600" size={20}/> Ścieżka Legislacyjna
         </h3>
         <Badge color="green">API Sejm: Live</Badge>
       </div>
       <div className="relative flex justify-between items-start px-4">
         <div className="absolute top-4 -translate-y-1/2 left-0 w-full h-1 bg-slate-200 -z-0 rounded"></div>
         <div className="absolute top-4 -translate-y-1/2 left-0 h-1 bg-blue-600 -z-0 rounded transition-all duration-1000" style={{ width: '25%' }}></div>
         {steps.map((step, index) => (
           <div key={index} className="relative z-10 flex flex-col items-center">
             <div className={`w-8 h-8 rounded-full flex items-center justify-center border-4 bg-white ${step.status === 'done' ? 'border-blue-600 text-blue-600' : step.status === 'current' ? 'border-blue-600 text-white bg-blue-600 scale-110' : 'border-slate-200 text-slate-300'}`}>
               {step.status === 'done' ? <CheckCircle size={14} /> : step.status === 'current' ? <div className="animate-pulse w-2 h-2 bg-white rounded-full"/> : <div className="w-2 h-2 bg-slate-300 rounded-full" />}
             </div>
             <span className={`mt-3 text-[10px] font-bold uppercase ${step.status === 'current' ? 'text-blue-900' : 'text-slate-400'}`}>{step.label}</span>
             {step.userAction && <div className="absolute -top-8 bg-yellow-100 text-yellow-900 text-[10px] px-2 py-1 rounded border border-yellow-300 font-bold">Twój wpływ!</div>}
           </div>
         ))}
       </div>
     </div>
   );
};