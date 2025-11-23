
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Cloud, Code, Layout, DollarSign, Zap, Server, Smartphone, BookOpen, Users, LifeBuoy, Lock } from 'lucide-react';

export const SakaiVsCanvas: React.FC = () => {
  const [hovered, setHovered] = useState<'sakai' | 'canvas' | null>(null);
  const [activeDetail, setActiveDetail] = useState<number | null>(null);

  const comparisons = [
    {
      feature: "Dağıtım Modeli",
      sakai: { text: "Yerel / Kontrollü", icon: Server, score: 90 },
      canvas: { text: "SaaS / Bulut", icon: Cloud, score: 95 },
    },
    {
        feature: "Maliyet (TCO)",
        sakai: { text: "Sunucu & Bakım Eforu", icon: DollarSign, score: 40 }, // Higher cost/effort to maintain
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

  const details = [
      {
          title: "Öğrenme Eğrisi & Arayüz",
          icon: Layout,
          canvas: "Canvas, modern ve minimalist 'Kart' yapısıyla bilinir. Kullanıcı deneyimi (UX) çok yüksektir, eğitmenler ve öğrenciler neredeyse hiç eğitim almadan kullanabilir.",
          sakai: "Sakai daha geleneksel ve araç odaklı bir arayüze sahiptir. Menüler yoğundur. Başlangıçta öğrenmesi zaman alabilir ancak akademik araç çeşitliliği (Tool-heavy) daha fazladır."
      },
      {
          title: "Fiyatlandırma & Lisans",
          icon: DollarSign,
          canvas: "Kullanıcı başına (per-user) yıllık lisans ücreti alır. Kurum büyüdükçe maliyet doğrusal olarak artar. Ayrıca premium destek için ek ücret talep edilir.",
          sakai: "Yazılım %100 Ücretsizdir (Open Source). Lisans ücreti yoktur. Maliyet sadece sunucu donanımı ve onu yönetecek IT personelinin maaşıdır. Uzun vadede büyük üniversiteler için daha ekonomiktir."
      },
      {
          title: "Entegrasyon & LTI",
          icon: Zap,
          canvas: "Kendi 'App Center'ı vardır. Birçok araç tek tıkla eklenir ancak kapalı kaynak olduğu için çekirdek koduna müdahale edip özel bir entegrasyon yazmak zordur.",
          sakai: "LTI standardının öncülerindendir. Açık kaynak olduğu için kurumlar kendi ÖBS (SIS) sistemleriyle %100 uyumlu özel entegrasyonlar (Custom API) yazabilir."
      },
      {
          title: "Destek & Topluluk",
          icon: LifeBuoy,
          canvas: "Instructure firması tarafından 7/24 profesyonel destek sağlanır (Ücretli). Kurumsal bir muhatap vardır.",
          sakai: "Topluluk desteklidir. Google Groups, Slack ve JIRA üzerinden dünyanın diğer ucundaki üniversite geliştiricileriyle yardımlaşılır. Ticari destek için 'Longsight' gibi partnerler vardır."
      }
  ];

  return (
    <div className="flex flex-col gap-12 w-full max-w-6xl">
        
        {/* VISUAL BAR CHART COMPARISON */}
        <div className="w-full bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden flex flex-col md:flex-row h-auto md:h-[500px]">
        
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

        {/* DETAILED BREAKDOWN MATRIX */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {details.map((detail, idx) => (
                <div 
                    key={idx}
                    className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => setActiveDetail(activeDetail === idx ? null : idx)}
                >
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-slate-100 rounded-lg text-slate-600">
                            <detail.icon size={20} />
                        </div>
                        <h4 className="font-serif text-lg font-bold text-slate-800">{detail.title}</h4>
                    </div>
                    
                    <div className="space-y-4 text-sm">
                        <div className="pl-3 border-l-2 border-orange-500">
                            <span className="text-xs font-bold text-orange-600 uppercase block mb-1">Canvas</span>
                            <p className="text-slate-600 leading-relaxed">{detail.canvas}</p>
                        </div>
                        <div className="pl-3 border-l-2 border-sakai-blue">
                             <span className="text-xs font-bold text-sakai-blue uppercase block mb-1">Sakai</span>
                             <p className="text-slate-600 leading-relaxed">{detail.sakai}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
  );
};
