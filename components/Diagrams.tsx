
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Book, FileText, MessageCircle, PenTool, CheckCircle, BarChart2, Server, Globe, Shield, Smartphone, DollarSign, Wrench, Link } from 'lucide-react';

// --- SAKAI MODULES DIAGRAM ---
export const SakaiModulesDiagram: React.FC = () => {
  const [activeModule, setActiveModule] = useState<number | null>(0);

  const modules = [
    { id: 0, title: "Lessons (Modüller)", icon: Book, desc: "Sakai'nin en güçlü aracı. İçerik, görevler ve araçları sıralı bir öğrenme yolunda birleştirir." },
    { id: 1, title: "Ödevler (Assignments)", icon: FileText, desc: "Turnitin entegrasyonu ile dosya yükleme ve çevrimdışı teslimatları destekler." },
    { id: 2, title: "Sınav (Tests & Quizzes)", icon: PenTool, desc: "Çoktan seçmeli, doğru/yanlış ve eşleştirme gibi geniş soru tipi desteği sunar." },
    { id: 3, title: "Forum & İletişim", icon: MessageCircle, desc: "Asenkron tartışma forumları ve anlık sohbet araçları içerir." },
    { id: 4, title: "Not Defteri", icon: CheckCircle, desc: "Ödev ve sınavlarla entegre çalışan güçlü puanlama sistemi." },
    { id: 5, title: "İstatistikler", icon: BarChart2, desc: "Öğrenci erişimi ve içerik etkileşim raporları." },
  ];

  return (
    <div className="flex flex-col items-center p-8 bg-white rounded-xl shadow-sm border border-slate-200 my-8">
      <h3 className="font-serif text-xl mb-4 text-slate-800">İnteraktif: Ders Araçları</h3>
      <p className="text-sm text-slate-500 mb-8 text-center max-w-md">
        Sakai araçlarını keşfetmek için ikonlara tıklayın.
      </p>
      
      <div className="grid grid-cols-3 gap-4 mb-8">
        {modules.map((m, idx) => {
            const Icon = m.icon;
            const isActive = activeModule === idx;
            return (
                <button
                    key={idx}
                    onClick={() => setActiveModule(idx)}
                    className={`w-20 h-20 rounded-xl flex flex-col items-center justify-center gap-2 transition-all duration-300 border-2 ${isActive ? 'border-sakai-blue bg-sakai-blue text-white shadow-lg scale-105' : 'border-slate-100 bg-slate-50 text-slate-400 hover:border-sakai-blue/30 hover:bg-white'}`}
                >
                    <Icon size={24} />
                </button>
            )
        })}
      </div>

      <div className="w-full h-32 p-4 bg-slate-50 rounded-lg border border-slate-100 flex flex-col items-center text-center justify-center relative overflow-hidden">
           <AnimatePresence mode="wait">
               {activeModule !== null && (
                   <motion.div 
                        key={activeModule}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute inset-0 p-4 flex flex-col items-center justify-center"
                   >
                       <h4 className="font-bold text-sakai-blue mb-2">{modules[activeModule].title}</h4>
                       <p className="text-sm text-slate-600">{modules[activeModule].desc}</p>
                   </motion.div>
               )}
           </AnimatePresence>
      </div>
    </div>
  );
};

// --- LTI INTEGRATION FLOW DIAGRAM ---
export const LTIIntegrationDiagram: React.FC = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
        setStep(s => (s + 1) % 4);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center p-8 bg-slate-800 rounded-xl border border-slate-700 my-8">
      <h3 className="font-serif text-xl mb-4 text-white">LTI Entegrasyon Akışı</h3>
      <p className="text-sm text-slate-400 mb-6 text-center max-w-md">
        Sakai'nin harici araçlarla (Zoom, Turnitin) güvenli veri alışverişi.
      </p>

      <div className="relative w-full max-w-lg h-48 bg-slate-900/50 rounded-lg shadow-inner overflow-hidden mb-6 border border-slate-700 flex items-center justify-center gap-8 p-4">
        
        {/* Sakai LMS */}
        <div className="flex flex-col items-center gap-2 z-10">
            <div className={`w-20 h-20 rounded-lg border-2 flex flex-col items-center justify-center transition-colors duration-500 bg-slate-800 ${step === 0 ? 'border-sakai-blue shadow-[0_0_15px_rgba(0,86,210,0.5)]' : 'border-slate-600'}`}>
                <Server size={28} className="text-white" />
                <span className="text-[10px] font-bold mt-1 text-white">SAKAI</span>
            </div>
        </div>

        {/* Connection Lines & Packets */}
        <div className="flex-1 h-[2px] bg-slate-700 relative">
            {step === 1 && (
                <motion.div 
                    className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-sakai-accent rounded-full shadow-[0_0_10px_#38bdf8]"
                    initial={{ left: '0%' }}
                    animate={{ left: '100%' }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                />
            )}
             {step === 3 && (
                <motion.div 
                    className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-green-400 rounded-full shadow-[0_0_10px_#4ade80]"
                    initial={{ left: '100%' }}
                    animate={{ left: '0%' }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                />
            )}
        </div>

        {/* External Tool */}
        <div className="flex flex-col items-center gap-2 z-10">
             <div className={`w-20 h-20 rounded-lg border-2 flex flex-col items-center justify-center gap-2 transition-colors duration-500 relative bg-slate-800 ${step === 2 ? 'border-green-500 shadow-[0_0_15px_rgba(74,222,128,0.5)]' : 'border-slate-600'}`}>
                <Globe size={28} className="text-white" />
                <span className="text-[10px] font-bold mt-1 text-white">ZOOM / TURNITIN</span>
             </div>
        </div>

      </div>

      <div className="flex gap-2 items-center">
          <span className="text-xs text-slate-500 uppercase tracking-widest font-bold">Status:</span>
          <div className="text-xs font-mono text-sakai-accent">
            {step === 0 && "User Authenticated"}
            {step === 1 && "Sending LTI Launch Request..."}
            {step === 2 && "Tool Processing..."}
            {step === 3 && "Returning Grades/Data..."}
          </div>
      </div>
    </div>
  );
};

// --- STRENGTHS & WEAKNESSES ---
export const StrengthsDiagram: React.FC = () => {
    const [view, setView] = useState<'pros' | 'cons'>('pros');
    
    const data = {
        pros: [
            { title: "Açık Kaynak & Lisanssız", val: 95, icon: CheckCircle },
            { title: "Akademik Odaklı Araçlar", val: 90, icon: Book },
            { title: "Tam Özelleştirme", val: 100, icon: Wrench },
            { title: "Veri Güvenliği (Yerel)", val: 95, icon: Shield },
        ],
        cons: [
            { title: "Kullanıcı Deneyimi (UX)", val: 60, icon: Smartphone },
            { title: "Toplam Sahip Olma Maliyeti (TCO)", val: 80, icon: DollarSign },
            { title: "Mobil Uygulama", val: 50, icon: Smartphone },
            { title: "Teknik Bakım Zorluğu", val: 75, icon: Server },
        ]
    };

    return (
        <div className="flex flex-col md:flex-row gap-8 items-center p-8 bg-white text-slate-800 rounded-xl my-8 border border-slate-200 shadow-lg">
            <div className="flex-1 min-w-[240px]">
                <h3 className="font-serif text-xl mb-2 text-sakai-blue">Karşılaştırmalı Analiz</h3>
                <p className="text-slate-500 text-sm mb-6 leading-relaxed">
                    Sakai'nin kurumsal ihtiyaçlara göre avantaj ve dezavantajları.
                </p>
                
                <div className="flex p-1 bg-slate-100 rounded-lg mb-6">
                    <button 
                        onClick={() => setView('pros')}
                        className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${view === 'pros' ? 'bg-white text-green-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                        GÜÇLÜ YÖNLER
                    </button>
                    <button 
                        onClick={() => setView('cons')}
                        className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${view === 'cons' ? 'bg-white text-red-500 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                        SINIRLILIKLAR
                    </button>
                </div>

                <div className="space-y-4">
                    {data[view].map((item, idx) => (
                        <div key={idx}>
                             <div className="flex justify-between text-xs font-bold uppercase text-slate-500 mb-1">
                                 <span className="flex items-center gap-2"><item.icon size={12}/> {item.title}</span>
                             </div>
                             <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                                 <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: `${item.val}%` }}
                                    transition={{ delay: idx * 0.1, duration: 0.8 }}
                                    className={`h-full rounded-full ${view === 'pros' ? 'bg-green-500' : 'bg-red-400'}`}
                                 />
                             </div>
                        </div>
                    ))}
                </div>
            </div>
            
            <div className="hidden md:flex w-64 h-64 bg-slate-50 rounded-full items-center justify-center relative border-4 border-white shadow-xl">
                <div className="text-center z-10">
                    <div className={`text-4xl font-bold mb-1 ${view === 'pros' ? 'text-green-600' : 'text-red-500'}`}>
                        {view === 'pros' ? 'A+' : 'B-'}
                    </div>
                    <div className="text-xs font-serif text-slate-400 uppercase tracking-widest">
                        {view === 'pros' ? 'Akademik Skor' : 'Kullanılabilirlik'}
                    </div>
                </div>
                {/* Decorative circles */}
                <div className={`absolute inset-0 border-4 rounded-full opacity-20 animate-pulse ${view === 'pros' ? 'border-green-500' : 'border-red-500'}`}></div>
                <div className={`absolute inset-4 border-4 rounded-full opacity-10 ${view === 'pros' ? 'border-green-500' : 'border-red-500'}`}></div>
            </div>
        </div>
    )
}
