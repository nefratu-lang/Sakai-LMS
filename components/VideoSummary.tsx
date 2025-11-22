
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Sparkles, Bot, FileText, Copy, Check, Terminal } from 'lucide-react';

export const VideoSummary: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState<string>('');
  const [copied, setCopied] = useState(false);

  const generateScript = async () => {
    setLoading(true);
    setContent('');
    
    try {
      // Use Gemini 2.5 Flash - Free Tier Compatible
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const prompt = `
      Sen bir üniversite öğrencisisin ve 'Sakai LMS' hakkında yaptığın sunumu bitiriyorsun.
      Aşağıdaki konuları içeren, etkileyici, havalı ve akılda kalıcı bir 'Kapanış Konuşması' (Speech Script) yaz.
      
      Konular:
      - Sakai'nin açık kaynak gücü (Apereo Vakfı)
      - Akademik özgürlük ve veri güvenliği
      - Rakiplerine (Canvas) göre zorlukları ama sağladığı kontrol
      - "Beni dinlediğiniz için teşekkürler" kapanışı.
      
      Ton: Profesyonel ama samimi, üniversite ortamına uygun. Türkçe olsun.
      Metni markdown formatında madde madde değil, akıcı bir konuşma paragrafı olarak ver.
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      const text = response.text || "Metin oluşturulamadı.";
      
      // Simple typewriter effect simulation
      const words = text.split(' ');
      for (let i = 0; i < words.length; i++) {
          setContent(prev => prev + (i === 0 ? '' : ' ') + words[i]);
          await new Promise(r => setTimeout(r, 30)); // typing speed
      }

    } catch (err) {
      console.error(err);
      setContent("Hata: Bağlantı kurulamadı. Lütfen internet bağlantınızı kontrol edin.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-1 rounded-2xl bg-gradient-to-br from-slate-200 to-white shadow-sm border border-slate-200">
       <div className="bg-white rounded-xl overflow-hidden p-8 relative">
           
           {/* Header */}
           <div className="text-center mb-8 relative z-10">
                <div className="inline-flex items-center justify-center px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold tracking-wide mb-4 border border-green-200">
                    <Sparkles size={14} className="mr-1" /> ÖĞRENCİ MODU (ÜCRETSİZ)
                </div>
                <h3 className="font-serif text-3xl text-slate-900 mb-3">AI Sunum Asistanı</h3>
                <p className="text-slate-600 max-w-xl mx-auto">
                  Paralı video modelleri yerine, sunumunu taçlandıracak mükemmel kapanış konuşmasını senin için ücretsiz hazırlayan yapay zeka asistanı.
                </p>
           </div>

           {/* Main Content Area */}
           <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch min-h-[300px]">
               
               {/* Left: Controls */}
               <div className="md:col-span-4 flex flex-col justify-center items-center p-6 bg-slate-50 rounded-xl border border-slate-100">
                   <div className="w-24 h-24 bg-white rounded-full shadow-sm flex items-center justify-center mb-6 relative">
                       <div className="absolute inset-0 rounded-full border-4 border-sakai-blue/10 animate-pulse"></div>
                       <Bot size={40} className="text-sakai-blue" />
                   </div>
                   
                   <button 
                        onClick={generateScript}
                        disabled={loading}
                        className="w-full py-3 px-6 bg-sakai-blue hover:bg-blue-700 text-white rounded-lg font-medium transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-sakai-blue/20"
                   >
                       {loading ? (
                           <span className="animate-pulse">Yazılıyor...</span>
                       ) : (
                           <>
                             <FileText size={18} />
                             <span>Metin Oluştur</span>
                           </>
                       )}
                   </button>
                   <p className="text-xs text-slate-400 mt-4 text-center">Gemini 2.5 Flash Modeli Kullanılıyor</p>
               </div>

               {/* Right: Terminal Output */}
               <div className="md:col-span-8 bg-slate-900 rounded-xl p-6 relative overflow-hidden flex flex-col shadow-inner">
                   {/* Decorative header */}
                   <div className="flex items-center gap-2 mb-4 pb-4 border-b border-slate-800">
                       <div className="flex gap-1.5">
                           <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                           <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                           <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                       </div>
                       <div className="text-xs text-slate-500 font-mono ml-auto flex items-center gap-2">
                           <Terminal size={12} /> SAKAI_AI_AGENT.sh
                       </div>
                   </div>

                   {/* Text Output */}
                   <div className="flex-1 font-mono text-sm leading-relaxed overflow-y-auto text-slate-300">
                       {content ? (
                           <div className="whitespace-pre-wrap animate-fade-in">
                               {content}
                               {loading && <span className="inline-block w-2 h-4 bg-sakai-accent ml-1 animate-pulse align-middle"></span>}
                           </div>
                       ) : (
                           <div className="h-full flex flex-col items-center justify-center text-slate-600 opacity-50">
                               <Bot size={32} className="mb-2" />
                               <p>Hazır olduğunda "Metin Oluştur"a bas.</p>
                           </div>
                       )}
                   </div>

                   {/* Copy Button Overlay */}
                   {content && !loading && (
                       <button 
                            onClick={copyToClipboard}
                            className="absolute top-4 right-4 p-2 bg-slate-800 hover:bg-slate-700 text-white rounded transition-colors border border-slate-700 group"
                            title="Kopyala"
                       >
                           {copied ? <Check size={16} className="text-green-400"/> : <Copy size={16} />}
                       </button>
                   )}
               </div>
           </div>
       </div>
    </div>
  );
};
