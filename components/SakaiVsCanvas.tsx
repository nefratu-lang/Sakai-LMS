
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Cloud, Code, Layout, DollarSign, Zap, Server, Smartphone } from 'lucide-react';

export const SakaiVsCanvas: React.FC = () => {
  const [hovered, setHovered] = useState<'sakai' | 'canvas' | null>(null);

  const comparisons = [
    {
      feature: "Dağıtım Modeli",
      sakai: { text: "Yerel / Kontrollü", icon: Server, score: 90 },
      canvas: { text: "SaaS / Bulut", icon: Cloud, score: 95 },
    },
    {
        feature: "Maliyet (TCO)",
        sakai: { text: "Yüksek İşletme Maliyeti", icon: DollarSign, score: 40 }, // Higher cost/effort to maintain
        canvas: { text: "Lisans Ücreti", icon: DollarSign, score: 60 },
    },
    {
      feature: "Özelleştirme",
      sakai: { text: "Tam Erişim (Kod)", icon: Code, score: 100 },
      canvas: { text: "Sınırlı (API)", icon: Zap, score: 60 },
    },
    {
      feature: "Mobil Deneyim",
      sakai: { text: "Web Duyarlı", icon: Smartphone, score: 60 },
      canvas: { text: "Native Uygulama", icon: Smartphone, score: 95 },
    },
  ];

  return (
    <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden flex flex-col md:flex-row h-auto md:h-[500px]">
      
      {/* SAKAI SIDE */}
      <div 
        className={`flex-1 p-8 transition-all duration-500 relative overflow-hidden cursor-pointer ${hovered === 'canvas' ? 'bg-slate-50 opacity-60' : 'bg-sakai-blue text-white'}`}
        onMouseEnter={() => setHovered('sakai')}
        onMouseLeave={() => setHovered(null)}
      >
        <div className="relative z-10">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm">
                <Shield size={32} className="text-white" />
            </div>
            <h3 className="font-serif text-4xl mb-2 font-bold">SAKAI</h3>
            <p className="text-white/80 mb-8 text-sm uppercase tracking-widest">Akademik Özgürlük</p>

            <div className="space-y-6">
                {comparisons.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                         <item.sakai.icon size={18} className="opacity-70" />
                         <div className="flex-1">
                             <div className="text-xs opacity-70 mb-1 uppercase">{item.feature}</div>
                             <div className="font-bold text-sm">{item.sakai.text}</div>
                         </div>
                         <div className="w-24 h-1 bg-black/20 rounded-full overflow-hidden">
                             <motion.div 
                                className="h-full bg-white"
                                initial={{ width: 0 }}
                                animate={{ width: hovered === 'sakai' ? `${item.sakai.score}%` : '0%' }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                             />
                         </div>
                    </div>
                ))}
            </div>
        </div>
        {/* Background Decoration */}
        <Shield className="absolute -bottom-12 -right-12 w-64 h-64 text-white opacity-5 rotate-12 pointer-events-none" />
      </div>

      {/* VS BADGE */}
      <div className="h-12 md:h-auto w-full md:w-16 bg-slate-100 flex items-center justify-center relative z-20 shadow-inner">
          <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-white font-bold font-serif text-sm border-4 border-white shadow-lg">
              VS
          </div>
      </div>

      {/* CANVAS SIDE */}
      <div 
        className={`flex-1 p-8 transition-all duration-500 relative overflow-hidden cursor-pointer ${hovered === 'sakai' ? 'bg-slate-50 opacity-60' : 'bg-orange-500 text-white'}`}
        onMouseEnter={() => setHovered('canvas')}
        onMouseLeave={() => setHovered(null)}
      >
         <div className="relative z-10">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm">
                <Layout size={32} className="text-white" />
            </div>
            <h3 className="font-serif text-4xl mb-2 font-bold">CANVAS</h3>
            <p className="text-white/80 mb-8 text-sm uppercase tracking-widest">Modern Deneyim</p>

            <div className="space-y-6">
                {comparisons.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-right flex-row-reverse">
                         <item.canvas.icon size={18} className="opacity-70" />
                         <div className="flex-1">
                             <div className="text-xs opacity-70 mb-1 uppercase">{item.feature}</div>
                             <div className="font-bold text-sm">{item.canvas.text}</div>
                         </div>
                         <div className="w-24 h-1 bg-black/20 rounded-full overflow-hidden">
                             <motion.div 
                                className="h-full bg-white"
                                initial={{ width: 0 }}
                                animate={{ width: hovered === 'canvas' ? `${item.canvas.score}%` : '0%' }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                             />
                         </div>
                    </div>
                ))}
            </div>
        </div>
        {/* Background Decoration */}
        <Cloud className="absolute -bottom-12 -left-12 w-64 h-64 text-white opacity-5 -rotate-12 pointer-events-none" />
      </div>
    </div>
  );
};
