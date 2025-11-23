
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layout, Users, FileCheck, Plug, ChevronRight, Info, Shield, ExternalLink, CheckCircle } from 'lucide-react';

export const SakaiWalkthrough: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  const scenarios = [
    {
      id: 0,
      title: "1. Ders Tasarımı & İçerik",
      icon: Layout,
      description: "Sakai'nin 'Lessons' aracı ile yapılandırmacı öğrenme süreçleri tasarlanabilir. Sol menü ve içerik alanı tamamen yönetilebilir.",
      images: [
        { 
            label: "Ders Sayfası Görünümü", 
            src: "/images/slide-content.png", // Kullanıcı dosyası: TRADITIONAL APPROACHES...
            note: "Öğrenci görünümü: Sol menüden dersin akışını takip ederken, ana ekranda zengin içerik (slaytlar, metinler) görüntülenir."
        },
        { 
            label: "İçerik Ekleme Menüsü", 
            src: "/images/add-content.png", // Kullanıcı dosyası: Add Content modal
            note: "'Add Content' butonu; Alt sayfa (Subpage), Ödev, Test, Tartışma veya dış kaynakları tek bir menüden eklemeyi sağlar."
        }
      ]
    },
    {
      id: 1,
      title: "2. Grup Yönetimi",
      icon: Users,
      description: "Kalabalık sınıflar için hayat kurtarıcı özellikler. İster manuel, ister otomatik (random/kriter bazlı) gruplar oluşturulabilir.",
      images: [
        { 
            label: "Otomatik Grup Sihirbazı", 
            src: "/images/auto-groups.png", // Kullanıcı dosyası: Auto-generated Groups
            note: "Adım 1: Hangi rollerin (Öğrenci, Asistan vb.) gruba dahil edileceği seçilir. Sistem bunları rastgele dağıtabilir."
        },
        { 
            label: "Manuel Grup Oluşturma", 
            src: "/images/create-group.png", // Kullanıcı dosyası: Create New Group
            note: "Özel proje grupleri için grup başlığı, açıklaması ve üyeleri manuel olarak belirlenebilir."
        }
      ]
    },
    {
      id: 2,
      title: "3. Rol & Yetki Matrisi",
      icon: Shield,
      description: "Sakai'yi diğerlerinden ayıran en büyük güç: 'Permissions'. Her aracın yetkisi her rol için ayrı ayrı ayarlanabilir.",
      images: [
        { 
            label: "İzin Matrisi (Permissions)", 
            src: "/images/permissions.png", // Kullanıcı dosyası: Permissions table
            note: "Örneğin; 'Öğrenci podcast oluşturabilsin mi?', 'Kendi yorumunu silebilsin mi?' gibi yüzlerce ince ayar yapılabilir."
        }
      ]
    },
    {
      id: 3,
      title: "4. Sınav & Ölçme",
      icon: FileCheck,
      description: "Basit testlerden karmaşık sınavlara kadar geniş bir yelpaze. Hot Spot, Sesli Yanıt ve Hesaplamalı sorular desteklenir.",
      images: [
        { 
            label: "Soru Tipi Seçimi", 
            src: "/images/question-types.png", // Kullanıcı dosyası: Questions: 22 dropdown
            note: "Dropdown menüde görülen zengin seçenekler: Calculated Question, File Upload, Survey, Audio Response..."
        },
        { 
            label: "Soru Düzenleme Editörü", 
            src: "/images/edit-question.png", // Kullanıcı dosyası: Edit Question Section
            note: "Soru metni, şıklar, puan değeri ve geri bildirimler (feedback) tek ekrandan yönetilir."
        }
      ]
    },
    {
      id: 4,
      title: "5. Entegrasyon (LTI/SCORM)",
      icon: Plug,
      description: "Sakai bir hub görevi görür. Dış araçlar (LTI) ve hazır paketler (SCORM) sisteme gömülür.",
      images: [
        { 
            label: "Harici Araç Seçici (LTI)", 
            src: "/images/lti-tools.png", // Kullanıcı dosyası: External Tool Selector
            note: "Sistem yöneticisi tarafından eklenen araçlar (Turnitin, BigBlueButton, Xerte) buradan derslere dahil edilir."
        },
        { 
            label: "SCORM Paket Listesi", 
            src: "/images/scorm-list.png", // Kullanıcı dosyası: Longsight SCORM Player
            note: "Articulate veya Captivate ile hazırlanan 'Golf Explained' gibi interaktif ders paketleri yüklenmiş ve kullanıma hazır."
        }
      ]
    }
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-8 bg-white p-6 rounded-2xl shadow-sm border border-slate-200 h-auto lg:h-[700px]">
      
      {/* Left Sidebar: Navigation */}
      <div className="lg:w-1/3 flex flex-col gap-2">
        <div className="mb-6">
             <h3 className="font-serif text-2xl text-slate-900">Sakai Arayüz Simülasyonu</h3>
             <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg shadow-sm">
                <div className="flex items-start gap-2 mb-3">
                    <CheckCircle className="text-green-600 shrink-0" size={20} />
                    <p className="text-xs text-green-900 leading-relaxed">
                        <strong>Sunucu Durumu: Aktif</strong><br/>
                        Aşağıdaki canlı sunucu şu an aktiftir, simülasyon üzerinden tüm fonksiyonları inceleyebilirsiniz.
                    </p>
                </div>
                <a 
                    href="https://trysakai.longsight.com/portal/site/6bab8ed5-8859-40f4-8d8a-f50f9da06975" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-2.5 bg-green-600 hover:bg-green-700 text-white text-xs font-bold uppercase rounded transition-colors shadow-md shadow-green-200"
                >
                    <ExternalLink size={14} /> Cloud Server'a Git
                </a>
             </div>
        </div>
        
        <div className="flex-1 overflow-y-auto pr-2 space-y-2">
            {scenarios.map((item, idx) => (
            <button
                key={idx}
                onClick={() => setActiveTab(idx)}
                className={`flex items-center gap-4 p-4 rounded-xl transition-all text-left group relative w-full ${
                activeTab === idx 
                    ? 'bg-slate-900 text-white shadow-md' 
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
            >
                <div className={`p-2 rounded-lg shrink-0 ${activeTab === idx ? 'bg-white/20' : 'bg-white border border-slate-200'}`}>
                    <item.icon size={20} />
                </div>
                <div>
                    <div className="font-bold text-sm">{item.title}</div>
                </div>
                {activeTab === idx && <ChevronRight className="ml-auto opacity-50" size={16} />}
            </button>
            ))}
        </div>
      </div>

      {/* Right Content: Image Browser */}
      <div className="flex-1 bg-slate-100 rounded-xl p-4 border border-slate-200 flex flex-col relative overflow-hidden">
         
         {/* Browser Toolbar */}
         <div className="bg-white rounded-t-lg border-b border-slate-200 p-3 flex items-center gap-4 mb-0 shadow-sm z-10">
             <div className="flex gap-1.5">
                 <div className="w-3 h-3 rounded-full bg-red-400"></div>
                 <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                 <div className="w-3 h-3 rounded-full bg-green-400"></div>
             </div>
             <div className="flex-1 bg-slate-50 rounded px-3 py-1 text-xs text-slate-400 font-mono text-center truncate flex items-center justify-center gap-2">
                <Shield size={10} /> https://trysakai.longsight.com/portal/site/uze565-design-demo
             </div>
         </div>

         {/* Image Area - Scrollable */}
         <div className="flex-1 bg-white rounded-b-lg overflow-y-auto relative shadow-inner scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent">
            <AnimatePresence mode="wait">
                <motion.div 
                    key={activeTab}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="p-6 space-y-10"
                >
                    <div className="p-4 bg-blue-50 text-blue-900 text-sm rounded-lg border-l-4 border-blue-500 shadow-sm flex gap-3">
                        <Info className="shrink-0 text-blue-500" size={20}/>
                        <p className="leading-relaxed">{scenarios[activeTab].description}</p>
                    </div>

                    {scenarios[activeTab].images.map((img, imgIdx) => (
                        <div key={imgIdx} className="group">
                            <div className="mb-3 flex items-center gap-3 border-b border-slate-100 pb-2">
                                <span className="px-2 py-1 bg-slate-800 text-white text-[10px] font-bold uppercase rounded tracking-wider shadow-sm">
                                    ADIM {imgIdx + 1}
                                </span>
                                <span className="text-base font-bold text-slate-800">{img.label}</span>
                            </div>
                            
                            {/* Image Container */}
                            <div className="rounded-lg border-4 border-slate-100 overflow-hidden shadow-lg mb-4 bg-slate-200 relative min-h-[200px]">
                                <img 
                                    src={img.src} 
                                    alt={img.label}
                                    onError={(e) => {
                                        // Fallback if image not found
                                        (e.target as HTMLImageElement).src = `https://placehold.co/1200x800/f1f5f9/1e293b?text=${encodeURIComponent(img.label)}+Wait+for+Upload`;
                                    }}
                                    className="w-full h-auto object-cover hover:scale-[1.02] transition-transform duration-500 block"
                                />
                                <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/50 text-white text-[10px] rounded backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                                    Click to expand
                                </div>
                            </div>
                            
                            <p className="text-sm text-slate-600 italic border-l-2 border-sakai-blue pl-4 py-1">
                                {img.note}
                            </p>
                        </div>
                    ))}
                </motion.div>
            </AnimatePresence>
         </div>

      </div>
    </div>
  );
};
